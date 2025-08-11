import {
    useState,
    useEffect,
    useRef,
    useCallback
} from 'react'

/**
 * Custom hook for Intersection Observer API
 * @param {Object} options - Intersection Observer options
 * @returns {[function, boolean, Object]} - [ref, isIntersecting, entry]
 */
export const useIntersectionObserver = (options = {}) => {
    const {
        threshold = 0.1,
            root = null,
            rootMargin = '0px',
            freezeOnceVisible = false,
            initialIsIntersecting = false
    } = options

    const [isIntersecting, setIsIntersecting] = useState(initialIsIntersecting)
    const [entry, setEntry] = useState(null)
    const elementRef = useRef(null)
    const observer = useRef(null)

    const ref = useCallback((node) => {
        if (elementRef.current) {
            // Disconnect previous observer
            if (observer.current) {
                observer.current.disconnect()
            }
        }

        elementRef.current = node

        if (!node || typeof window === 'undefined') return

        // Create new observer
        observer.current = new IntersectionObserver(
            ([entry]) => {
                const isElementIntersecting = entry.isIntersecting

                if (!freezeOnceVisible || !isIntersecting) {
                    setIsIntersecting(isElementIntersecting)
                }

                setEntry(entry)
            }, {
                threshold,
                root,
                rootMargin
            }
        )

        if (node) {
            observer.current.observe(node)
        }
    }, [threshold, root, rootMargin, freezeOnceVisible, isIntersecting])

    useEffect(() => {
        return () => {
            if (observer.current) {
                observer.current.disconnect()
            }
        }
    }, [])

    return [ref, isIntersecting, entry]
}

/**
 * Hook for observing multiple elements
 * @param {Array} elements - Array of element refs or selectors
 * @param {Object} options - Intersection Observer options
 * @returns {Map} - Map of element visibility states
 */
export const useMultipleIntersectionObserver = (elements = [], options = {}) => {
    const {
        threshold = 0.1,
            root = null,
            rootMargin = '0px'
    } = options

    const [visibilityMap, setVisibilityMap] = useState(new Map())
    const observer = useRef(null)

    useEffect(() => {
        if (typeof window === 'undefined' || elements.length === 0) return

        const observerCallback = (entries) => {
            setVisibilityMap(prevMap => {
                const newMap = new Map(prevMap)
                entries.forEach(entry => {
                    const key = entry.target.id || entry.target.className || entry.target
                    newMap.set(key, {
                        isIntersecting: entry.isIntersecting,
                        intersectionRatio: entry.intersectionRatio,
                        entry
                    })
                })
                return newMap
            })
        }

        observer.current = new IntersectionObserver(observerCallback, {
            threshold,
            root,
            rootMargin
        })

        elements.forEach(element => {
            let target

            if (typeof element === 'string') {
                target = document.querySelector(element)
            } else if (element?.current) {
                target = element.current
            } else {
                target = element
            }

            if (target) {
                observer.current.observe(target)
            }
        })

        return () => {
            if (observer.current) {
                observer.current.disconnect()
            }
        }
    }, [elements, threshold, root, rootMargin])

    return visibilityMap
}

/**
 * Hook for lazy loading images or components
 * @param {Object} options - Configuration options
 * @returns {[function, boolean, function]} - [ref, isVisible, reset]
 */
export const useLazyLoad = (options = {}) => {
    const {
        threshold = 0.1,
            rootMargin = '50px',
            triggerOnce = true
    } = options

    const [isVisible, setIsVisible] = useState(false)
    const [hasTriggered, setHasTriggered] = useState(false)
    const elementRef = useRef(null)
    const observer = useRef(null)

    const ref = useCallback((node) => {
        if (elementRef.current && observer.current) {
            observer.current.disconnect()
        }

        elementRef.current = node

        if (!node || typeof window === 'undefined') return
        if (triggerOnce && hasTriggered) return

        observer.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    if (triggerOnce) {
                        setHasTriggered(true)
                        observer.current.disconnect()
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false)
                }
            }, {
                threshold,
                rootMargin
            }
        )

        observer.current.observe(node)
    }, [threshold, rootMargin, triggerOnce, hasTriggered])

    const reset = useCallback(() => {
        setIsVisible(false)
        setHasTriggered(false)
    }, [])

    useEffect(() => {
        return () => {
            if (observer.current) {
                observer.current.disconnect()
            }
        }
    }, [])

    return [ref, isVisible, reset]
}

/**
 * Hook for detecting element visibility with custom callbacks
 * @param {Object} callbacks - Callback functions
 * @param {Object} options - Intersection Observer options
 * @returns {function} - Ref function
 */
export const useVisibilityChange = (callbacks = {}, options = {}) => {
    const {
        onEnter,
        onLeave,
        onIntersecting,
        onNotIntersecting
    } = callbacks

    const {
        threshold = 0.1,
            root = null,
            rootMargin = '0px'
    } = options

    const elementRef = useRef(null)
    const observer = useRef(null)
    const wasIntersecting = useRef(false)

    const ref = useCallback((node) => {
        if (elementRef.current && observer.current) {
            observer.current.disconnect()
        }

        elementRef.current = node

        if (!node || typeof window === 'undefined') return

        observer.current = new IntersectionObserver(
            ([entry]) => {
                const isCurrentlyIntersecting = entry.isIntersecting
                const wasCurrentlyIntersecting = wasIntersecting.current

                if (isCurrentlyIntersecting && !wasCurrentlyIntersecting) {
                    // Element entered viewport
                    onEnter?.(entry)
                    onIntersecting?.(entry)
                } else if (!isCurrentlyIntersecting && wasCurrentlyIntersecting) {
                    // Element left viewport
                    onLeave?.(entry)
                    onNotIntersecting?.(entry)
                } else if (isCurrentlyIntersecting) {
                    // Element is still intersecting
                    onIntersecting?.(entry)
                } else {
                    // Element is still not intersecting
                    onNotIntersecting?.(entry)
                }

                wasIntersecting.current = isCurrentlyIntersecting
            }, {
                threshold,
                root,
                rootMargin
            }
        )

        observer.current.observe(node)
    }, [threshold, root, rootMargin, onEnter, onLeave, onIntersecting, onNotIntersecting])

    useEffect(() => {
        return () => {
            if (observer.current) {
                observer.current.disconnect()
            }
        }
    }, [])

    return ref
}

/**
 * Hook for scroll-triggered animations
 * @param {Object} options - Animation options
 * @returns {[function, Object]} - [ref, animationState]
 */
export const useScrollAnimation = (options = {}) => {
    const {
        threshold = 0.1,
            rootMargin = '0px',
            triggerOnce = true,
            delay = 0,
            animationClass = 'animate-in'
    } = options

    const [animationState, setAnimationState] = useState({
        hasAnimated: false,
        isVisible: false,
        shouldAnimate: false
    })

    const timeoutRef = useRef(null)

    const [ref, isIntersecting] = useIntersectionObserver({
        threshold,
        rootMargin,
        freezeOnceVisible: triggerOnce
    })

    useEffect(() => {
        if (isIntersecting && (!triggerOnce || !animationState.hasAnimated)) {
            if (delay > 0) {
                timeoutRef.current = setTimeout(() => {
                    setAnimationState(prev => ({
                        ...prev,
                        isVisible: true,
                        shouldAnimate: true,
                        hasAnimated: true
                    }))
                }, delay)
            } else {
                setAnimationState(prev => ({
                    ...prev,
                    isVisible: true,
                    shouldAnimate: true,
                    hasAnimated: true
                }))
            }
        } else if (!isIntersecting && !triggerOnce) {
            setAnimationState(prev => ({
                ...prev,
                isVisible: false,
                shouldAnimate: false
            }))
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [isIntersecting, triggerOnce, delay, animationState.hasAnimated])

    const className = animationState.shouldAnimate ? animationClass : ''

    return [
        ref,
        {
            ...animationState,
            className,
            style: {
                transitionDelay: `${delay}ms`
            }
        }
    ]
}

/**
 * Hook for infinite scrolling / pagination
 * @param {function} loadMore - Function to load more content
 * @param {Object} options - Configuration options
 * @returns {[function, boolean]} - [ref, isLoading]
 */
export const useInfiniteScroll = (loadMore, options = {}) => {
    const {
        hasNextPage = true,
            threshold = 1.0,
            rootMargin = '100px'
    } = options

    const [isLoading, setIsLoading] = useState(false)

    const [ref, isIntersecting] = useIntersectionObserver({
        threshold,
        rootMargin
    })

    useEffect(() => {
        if (isIntersecting && hasNextPage && !isLoading) {
            setIsLoading(true)

            Promise.resolve(loadMore())
                .then(() => {
                    setIsLoading(false)
                })
                .catch(() => {
                    setIsLoading(false)
                })
        }
    }, [isIntersecting, hasNextPage, isLoading, loadMore])

    return [ref, isLoading]
}

/**
 * Hook for measuring element size when it becomes visible
 * @param {Object} options - Configuration options
 * @returns {[function, Object]} - [ref, measurements]
 */
export const useVisibleMeasure = (options = {}) => {
    const {
        threshold = 0.1
    } = options
    const [measurements, setMeasurements] = useState({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    })

    const elementRef = useRef(null)

    const [ref, isIntersecting] = useIntersectionObserver({
        threshold
    })

    useEffect(() => {
        if (isIntersecting && elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect()
            setMeasurements({
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left,
                bottom: rect.bottom,
                right: rect.right
            })
        }
    }, [isIntersecting])

    const combinedRef = useCallback((node) => {
        elementRef.current = node
        ref(node)
    }, [ref])

    return [combinedRef, measurements]
}

export default useIntersectionObserver