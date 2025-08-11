import {
    useState,
    useEffect,
    useCallback,
    useRef
} from 'react'

/**
 * Custom hook for tracking scroll position
 * @param {Object} options - Configuration options
 * @returns {Object} - Scroll position data and utilities
 */
export const useScrollPosition = (options = {}) => {
    const {
        throttleMs = 100,
            element = null, // null means window
            useWindow = true,
            wait = false
    } = options

    const [scrollPosition, setScrollPosition] = useState({
        x: 0,
        y: 0,
        scrollTop: 0,
        scrollLeft: 0,
        scrollHeight: 0,
        scrollWidth: 0,
        clientHeight: 0,
        clientWidth: 0
    })

    const throttleTimeout = useRef(null)

    const updateScrollPosition = useCallback(() => {
        if (wait) return

        const target = element || (useWindow ? window : null)
        if (!target) return

        let scrollData

        if (target === window) {
            scrollData = {
                x: window.pageXOffset,
                y: window.pageYOffset,
                scrollTop: window.pageYOffset,
                scrollLeft: window.pageXOffset,
                scrollHeight: document.documentElement.scrollHeight,
                scrollWidth: document.documentElement.scrollWidth,
                clientHeight: window.innerHeight,
                clientWidth: window.innerWidth
            }
        } else {
            scrollData = {
                x: target.scrollLeft,
                y: target.scrollTop,
                scrollTop: target.scrollTop,
                scrollLeft: target.scrollLeft,
                scrollHeight: target.scrollHeight,
                scrollWidth: target.scrollWidth,
                clientHeight: target.clientHeight,
                clientWidth: target.clientWidth
            }
        }

        setScrollPosition(scrollData)
    }, [element, useWindow, wait])

    const throttledUpdateScrollPosition = useCallback(() => {
        if (throttleTimeout.current) {
            clearTimeout(throttleTimeout.current)
        }

        throttleTimeout.current = setTimeout(() => {
            updateScrollPosition()
        }, throttleMs)
    }, [updateScrollPosition, throttleMs])

    useEffect(() => {
        if (typeof window === 'undefined') return

        const target = element || window
        updateScrollPosition() // Initial call

        target.addEventListener('scroll', throttledUpdateScrollPosition, {
            passive: true
        })
        window.addEventListener('resize', updateScrollPosition, {
            passive: true
        })

        return () => {
            target.removeEventListener('scroll', throttledUpdateScrollPosition)
            window.removeEventListener('resize', updateScrollPosition)
            if (throttleTimeout.current) {
                clearTimeout(throttleTimeout.current)
            }
        }
    }, [element, throttledUpdateScrollPosition, updateScrollPosition])

    return scrollPosition
}

/**
 * Hook for detecting scroll direction
 * @param {Object} options - Configuration options
 * @returns {Object} - Scroll direction and position data
 */
export const useScrollDirection = (options = {}) => {
    const {
        threshold = 10, throttleMs = 100
    } = options
    const [scrollDirection, setScrollDirection] = useState('up')
    const [isScrolling, setIsScrolling] = useState(false)
    const lastScrollY = useRef(0)
    const scrollTimeout = useRef(null)

    const scrollPosition = useScrollPosition({
        throttleMs
    })

    useEffect(() => {
        const currentScrollY = scrollPosition.y

        if (Math.abs(currentScrollY - lastScrollY.current) > threshold) {
            const direction = currentScrollY > lastScrollY.current ? 'down' : 'up'
            setScrollDirection(direction)
            lastScrollY.current = currentScrollY
        }

        setIsScrolling(true)

        // Clear existing timeout
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current)
        }

        // Set isScrolling to false after scrolling stops
        scrollTimeout.current = setTimeout(() => {
            setIsScrolling(false)
        }, 150)

        return () => {
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current)
            }
        }
    }, [scrollPosition.y, threshold])

    return {
        scrollDirection,
        isScrolling,
        scrollPosition
    }
}

/**
 * Hook for scroll-based progress calculation
 * @param {Object} options - Configuration options
 * @returns {Object} - Progress data
 */
export const useScrollProgress = (options = {}) => {
    const {
        element = null
    } = options
    const scrollPosition = useScrollPosition({
        element
    })

    const progress = scrollPosition.scrollHeight > scrollPosition.clientHeight ?
        Math.min(
            (scrollPosition.scrollTop /
                (scrollPosition.scrollHeight - scrollPosition.clientHeight)) * 100,
            100
        ) :
        0

    return {
        progress,
        scrollPosition,
        isAtTop: scrollPosition.scrollTop === 0,
        isAtBottom: scrollPosition.scrollTop + scrollPosition.clientHeight >= scrollPosition.scrollHeight - 1
    }
}

/**
 * Hook for detecting when elements enter/leave viewport
 * @param {Array} sections - Array of section IDs to track
 * @param {Object} options - Configuration options
 * @returns {Object} - Active section and visibility data
 */
export const useScrollSpy = (sections = [], options = {}) => {
    const {
        offset = 100,
            throttleMs = 100,
            rootMargin = '0px'
    } = options

    const [activeSection, setActiveSection] = useState('')
    const [visibleSections, setVisibleSections] = useState(new Set())
    const observers = useRef(new Map())

    useEffect(() => {
        if (typeof window === 'undefined' || sections.length === 0) return

        // Clean up existing observers
        observers.current.forEach(observer => observer.disconnect())
        observers.current.clear()

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id

                setVisibleSections(prev => {
                    const newSet = new Set(prev)
                    if (entry.isIntersecting) {
                        newSet.add(sectionId)
                    } else {
                        newSet.delete(sectionId)
                    }
                    return newSet
                })

                // Set active section based on which is most visible
                if (entry.isIntersecting) {
                    setActiveSection(sectionId)
                }
            })
        }

        const observerOptions = {
            root: null,
            rootMargin,
            threshold: [0.1, 0.5, 0.9]
        }

        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId)
            if (element) {
                const observer = new IntersectionObserver(observerCallback, observerOptions)
                observer.observe(element)
                observers.current.set(sectionId, observer)
            }
        })

        return () => {
            observers.current.forEach(observer => observer.disconnect())
            observers.current.clear()
        }
    }, [sections, rootMargin])

    return {
        activeSection,
        visibleSections: Array.from(visibleSections),
        isVisible: (sectionId) => visibleSections.has(sectionId)
    }
}

/**
 * Hook for smooth scrolling to elements
 * @returns {function} - Smooth scroll function
 */
export const useSmoothScroll = () => {
    const scrollToElement = useCallback((elementId, options = {}) => {
        const {
            offset = 0,
                behavior = 'smooth',
                block = 'start',
                inline = 'nearest'
        } = options

        const element = document.getElementById(elementId)
        if (!element) {
            console.warn(`Element with id "${elementId}" not found`)
            return
        }

        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - offset

        window.scrollTo({
            top: offsetPosition,
            behavior
        })
    }, [])

    const scrollToTop = useCallback((options = {}) => {
        const {
            behavior = 'smooth'
        } = options

        window.scrollTo({
            top: 0,
            behavior
        })
    }, [])

    const scrollToBottom = useCallback((options = {}) => {
        const {
            behavior = 'smooth'
        } = options

        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior
        })
    }, [])

    return {
        scrollToElement,
        scrollToTop,
        scrollToBottom
    }
}

/**
 * Hook for hiding/showing elements based on scroll
 * @param {Object} options - Configuration options
 * @returns {Object} - Visibility states
 */
export const useScrollHide = (options = {}) => {
    const {
        hideOnScrollDown = true,
            showOnScrollUp = true,
            hideThreshold = 100,
            showThreshold = 50
    } = options

    const [isVisible, setIsVisible] = useState(true)
    const {
        scrollDirection,
        scrollPosition
    } = useScrollDirection()

    useEffect(() => {
        if (hideOnScrollDown && scrollDirection === 'down' && scrollPosition.y > hideThreshold) {
            setIsVisible(false)
        } else if (showOnScrollUp && scrollDirection === 'up' && scrollPosition.y > showThreshold) {
            setIsVisible(true)
        } else if (scrollPosition.y <= showThreshold) {
            setIsVisible(true)
        }
    }, [
        scrollDirection,
        scrollPosition.y,
        hideOnScrollDown,
        showOnScrollUp,
        hideThreshold,
        showThreshold
    ])

    return {
        isVisible,
        scrollDirection,
        scrollPosition
    }
}

/**
 * Hook for parallax scrolling effects
 * @param {number} speed - Parallax speed multiplier (0-1)
 * @param {Object} options - Configuration options
 * @returns {Object} - Transform values for parallax effect
 */
export const useParallax = (speed = 0.5, options = {}) => {
    const {
        direction = 'vertical', offset = 0
    } = options
    const scrollPosition = useScrollPosition()

    const transform = {
        vertical: {
            translateY: `${(scrollPosition.y - offset) * speed}px`
        },
        horizontal: {
            translateX: `${(scrollPosition.x - offset) * speed}px`
        },
        both: {
            translateX: `${(scrollPosition.x - offset) * speed}px`,
            translateY: `${(scrollPosition.y - offset) * speed}px`
        }
    }

    return {
        transform: transform[direction] || transform.vertical,
        scrollPosition
    }
}

export default useScrollPosition