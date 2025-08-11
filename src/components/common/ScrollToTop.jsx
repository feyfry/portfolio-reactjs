import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, ChevronUp, Rocket } from 'lucide-react'
import PropTypes from 'prop-types'

const ScrollToTop = ({
    showAt = 300,
    variant = 'default',
    position = 'bottom-right',
    icon = 'arrow'
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)

    // Icon selection
    const iconMap = {
        arrow: ArrowUp,
        chevron: ChevronUp,
        rocket: Rocket
    }

    const IconComponent = iconMap[icon] || ArrowUp

    // Position classes
    const positionClasses = {
        'bottom-right': 'bottom-6 right-6',
        'bottom-left': 'bottom-6 left-6',
        'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2',
        'top-right': 'top-6 right-6',
        'top-left': 'top-6 left-6'
    }

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPercent = (scrollTop / docHeight) * 100

            setScrollProgress(scrollPercent)
            setIsVisible(scrollTop > showAt)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [showAt])

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    // Default variant
    if (variant === 'default') {
        return (
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        onClick={scrollToTop}
                        className={`fixed ${positionClasses[position]} z-50 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group`}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0, rotate: 180 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <IconComponent
                            size={20}
                            className="text-white group-hover:animate-bounce"
                        />
                    </motion.button>
                )}
            </AnimatePresence>
        )
    }

    // Progress variant with circular progress
    if (variant === 'progress') {
        const circumference = 2 * Math.PI * 20
        const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

        return (
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className={`fixed ${positionClasses[position]} z-50`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={scrollToTop}
                            className="relative w-14 h-14 bg-slate-800/90 backdrop-blur-lg rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group border border-slate-700"
                        >
                            {/* Progress Circle */}
                            <svg
                                className="absolute inset-0 w-full h-full transform -rotate-90"
                                viewBox="0 0 44 44"
                            >
                                <circle
                                    cx="22"
                                    cy="22"
                                    r="20"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    className="text-slate-600"
                                />
                                <motion.circle
                                    cx="22"
                                    cy="22"
                                    r="20"
                                    stroke="url(#gradient)"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    transition={{ duration: 0.1 }}
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#a855f7" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Icon */}
                            <IconComponent
                                size={18}
                                className="text-gray-300 group-hover:text-white transition-colors duration-300 group-hover:animate-bounce"
                            />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    }

    // Minimal variant
    if (variant === 'minimal') {
        return (
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        onClick={scrollToTop}
                        className={`fixed ${positionClasses[position]} z-50 w-10 h-10 bg-white/10 backdrop-blur-lg rounded-lg flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <IconComponent size={16} className="text-white" />
                    </motion.button>
                )}
            </AnimatePresence>
        )
    }

    // Floating variant with text
    if (variant === 'floating') {
        return (
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        onClick={scrollToTop}
                        className={`fixed ${positionClasses[position]} z-50 bg-slate-800/90 backdrop-blur-lg rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg border border-slate-700 hover:border-purple-500 transition-all duration-300 group`}
                        initial={{ opacity: 0, x: position.includes('right') ? 100 : -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: position.includes('right') ? 100 : -100 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <IconComponent
                            size={16}
                            className="text-gray-300 group-hover:text-purple-400 transition-colors duration-300"
                        />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                            Top
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>
        )
    }

    // Japanese variant
    if (variant === 'japanese') {
        return (
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        onClick={scrollToTop}
                        className={`fixed ${positionClasses[position]} z-50 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg px-3 py-2 flex flex-col items-center shadow-lg hover:shadow-xl transition-all duration-300 group min-w-[60px]`}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0, rotate: 180 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <IconComponent
                            size={18}
                            className="text-white group-hover:animate-bounce mb-1"
                        />
                        <span className="text-xs text-white font-japanese leading-none">
                            トップ
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>
        )
    }

    // Multi-action variant
    if (variant === 'multi-action') {

        const actions = [
            {
                icon: ArrowUp,
                label: 'Top',
                action: scrollToTop,
                color: 'from-purple-500 to-pink-500'
            },
            {
                icon: ChevronUp,
                label: 'Home',
                action: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }),
                color: 'from-blue-500 to-cyan-500'
            }
        ]

        return (
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className={`fixed ${positionClasses[position]} z-50 flex flex-col space-y-2`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        {/* Additional Actions */}
                        <AnimatePresence>
                            {isExpanded && actions.slice(1).map((action, index) => {
                                const ActionIcon = action.icon
                                return (
                                    <motion.button
                                        key={action.label}
                                        onClick={action.action}
                                        className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}
                                        initial={{ opacity: 0, scale: 0, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0, y: 20 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <ActionIcon size={20} className="text-white" />
                                    </motion.button>
                                )
                            })}
                        </AnimatePresence>

                        {/* Main Button */}
                        <motion.button
                            onClick={() => {
                                if (isExpanded) {
                                    actions[0].action()
                                }
                                setIsExpanded(!isExpanded)
                            }}
                            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <motion.div
                                animate={{ rotate: isExpanded ? 45 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <IconComponent size={20} className="text-white" />
                            </motion.div>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    }

    return null
}

ScrollToTop.propTypes = {
    showAt: PropTypes.number,
    variant: PropTypes.oneOf(['default', 'progress', 'minimal', 'floating', 'japanese', 'multi-action']),
    position: PropTypes.oneOf(['bottom-right', 'bottom-left', 'bottom-center', 'top-right', 'top-left']),
    icon: PropTypes.oneOf(['arrow', 'chevron', 'rocket'])
}

export default ScrollToTop