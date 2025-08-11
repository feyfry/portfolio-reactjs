import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const SlideIn = ({
    children,
    direction = 'left',
    distance = 100,
    duration = 0.6,
    delay = 0,
    bounce = false,
    stagger = false,
    staggerDelay = 0.1,
    triggerOnce = true,
    threshold = 0.1,
    className = '',
    ...props
}) => {
    // Direction configurations
    const getInitialPosition = (direction, distance) => {
        switch (direction) {
            case 'left':
                return { x: -distance, opacity: 0 }
            case 'right':
                return { x: distance, opacity: 0 }
            case 'up':
                return { y: -distance, opacity: 0 }
            case 'down':
                return { y: distance, opacity: 0 }
            case 'up-left':
                return { x: -distance / 2, y: -distance / 2, opacity: 0 }
            case 'up-right':
                return { x: distance / 2, y: -distance / 2, opacity: 0 }
            case 'down-left':
                return { x: -distance / 2, y: distance / 2, opacity: 0 }
            case 'down-right':
                return { x: distance / 2, y: distance / 2, opacity: 0 }
            default:
                return { x: -distance, opacity: 0 }
        }
    }

    const visible = {
        x: 0,
        y: 0,
        opacity: 1
    }

    // Animation configuration
    const getTransition = () => {
        const baseTransition = {
            duration,
            delay,
            ease: bounce ? "easeOut" : "easeInOut"
        }

        if (bounce) {
            return {
                ...baseTransition,
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }

        return baseTransition
    }

    // Single element animation
    const variants = {
        hidden: getInitialPosition(direction, distance),
        visible: {
            ...visible,
            transition: getTransition()
        }
    }

    // Stagger animation for multiple children
    const staggerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay
            }
        }
    }

    const staggerItemVariants = {
        hidden: getInitialPosition(direction, distance),
        visible: {
            ...visible,
            transition: getTransition()
        }
    }

    // Stagger mode for multiple children
    if (stagger && Array.isArray(children)) {
        return (
            <motion.div
                className={className}
                variants={staggerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: triggerOnce, amount: threshold }}
                {...props}
            >
                {children.map((child, index) => (
                    <motion.div
                        key={index}
                        variants={staggerItemVariants}
                    >
                        {child}
                    </motion.div>
                ))}
            </motion.div>
        )
    }

    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: triggerOnce, amount: threshold }}
            {...props}
        >
            {children}
        </motion.div>
    )
}

SlideIn.propTypes = {
    children: PropTypes.node.isRequired,
    direction: PropTypes.oneOf([
        'left', 'right', 'up', 'down',
        'up-left', 'up-right', 'down-left', 'down-right'
    ]),
    distance: PropTypes.number,
    duration: PropTypes.number,
    delay: PropTypes.number,
    bounce: PropTypes.bool,
    stagger: PropTypes.bool,
    staggerDelay: PropTypes.number,
    triggerOnce: PropTypes.bool,
    threshold: PropTypes.number,
    className: PropTypes.string
}

// Preset slide animations
export const SlideInLeft = ({ children, ...props }) => (
    <SlideIn direction="left" {...props}>
        {children}
    </SlideIn>
)

SlideInLeft.propTypes = {
    children: PropTypes.node.isRequired
}

export const SlideInRight = ({ children, ...props }) => (
    <SlideIn direction="right" {...props}>
        {children}
    </SlideIn>
)

SlideInRight.propTypes = {
    children: PropTypes.node.isRequired
}

export const SlideInUp = ({ children, ...props }) => (
    <SlideIn direction="up" {...props}>
        {children}
    </SlideIn>
)

SlideInUp.propTypes = {
    children: PropTypes.node.isRequired
}

export const SlideInDown = ({ children, ...props }) => (
    <SlideIn direction="down" {...props}>
        {children}
    </SlideIn>
)

SlideInDown.propTypes = {
    children: PropTypes.node.isRequired
}

// Advanced slide animations
export const SlideInBounce = ({ children, direction = 'left', ...props }) => (
    <SlideIn direction={direction} bounce={true} {...props}>
        {children}
    </SlideIn>
)

SlideInBounce.propTypes = {
    children: PropTypes.node.isRequired,
    direction: PropTypes.oneOf([
        'left', 'right', 'up', 'down',
        'up-left', 'up-right', 'down-left', 'down-right'
    ])
}

// Slide reveal with mask effect
export const SlideReveal = ({
    children,
    direction = 'left',
    duration = 0.8,
    delay = 0,
    className = '',
    ...props
}) => {
    const maskDirection = {
        left: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
        right: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        up: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        down: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
    }

    const maskVisible = {
        left: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        right: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        up: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        down: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
    }

    return (
        <motion.div
            className={className}
            initial={{
                clipPath: maskDirection[direction]
            }}
            whileInView={{
                clipPath: maskVisible[direction]
            }}
            transition={{
                duration,
                delay,
                ease: "easeInOut"
            }}
            viewport={{ once: true, amount: 0.1 }}
            {...props}
        >
            {children}
        </motion.div>
    )
}

SlideReveal.propTypes = {
    children: PropTypes.node.isRequired,
    direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
    duration: PropTypes.number,
    delay: PropTypes.number,
    className: PropTypes.string
}

// Slide in from multiple directions (carousel-like)
export const MultiDirectionSlide = ({
    children,
    directions = ['left', 'right'],
    interval = 2000,
    autoPlay = true,
    className = '',
    ...props
}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentDirection, setCurrentDirection] = useState(directions[0])

    useEffect(() => {
        if (!autoPlay || !Array.isArray(children)) return

        const timer = setInterval(() => {
            setCurrentIndex((prev) => {
                const newIndex = (prev + 1) % children.length
                setCurrentDirection(directions[newIndex % directions.length])
                return newIndex
            })
        }, interval)

        return () => clearInterval(timer)
    }, [autoPlay, children, directions, interval])

    if (!Array.isArray(children)) {
        return (
            <SlideIn direction={currentDirection} className={className} {...props}>
                {children}
            </SlideIn>
        )
    }

    return (
        <div className={`relative overflow-hidden ${className}`} {...props}>
            <motion.div
                key={currentIndex}
                initial={{
                    x: currentDirection === 'left' ? -100 : currentDirection === 'right' ? 100 : 0,
                    y: currentDirection === 'up' ? -100 : currentDirection === 'down' ? 100 : 0,
                    opacity: 0
                }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                exit={{
                    x: currentDirection === 'left' ? 100 : currentDirection === 'right' ? -100 : 0,
                    y: currentDirection === 'up' ? 100 : currentDirection === 'down' ? -100 : 0,
                    opacity: 0
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {children[currentIndex]}
            </motion.div>
        </div>
    )
}

MultiDirectionSlide.propTypes = {
    children: PropTypes.node.isRequired,
    directions: PropTypes.arrayOf(PropTypes.oneOf(['left', 'right', 'up', 'down'])),
    interval: PropTypes.number,
    autoPlay: PropTypes.bool,
    className: PropTypes.string
}

// Japanese-style slide in (like traditional screens)
export const JapaneseSlideIn = ({
    children,
    text,
    japanese,
    direction = 'right',
    duration = 1.2,
    delay = 0,
    className = '',
    ...props
}) => {

    const variants = {
        hidden: {
            x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
            y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0,
            opacity: 0
        },
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth Japanese feel
            }
        }
    }

    return (
        <motion.div
            className={`relative ${className}`}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            {...props}
        >
            {/* Decorative border */}
            <motion.div
                className="absolute inset-0 border-2 border-purple-400/20 rounded-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: delay + 0.3 }}
                viewport={{ once: true }}
            />

            {/* Content */}
            <div className="relative z-10 p-6">
                {text && (
                    <motion.h3
                        className="text-xl font-bold text-white mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: delay + 0.5 }}
                        viewport={{ once: true }}
                    >
                        {text}
                    </motion.h3>
                )}

                {japanese && (
                    <motion.p
                        className="text-purple-400 font-japanese text-sm mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: delay + 0.7 }}
                        viewport={{ once: true }}
                    >
                        {japanese}
                    </motion.p>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: delay + 0.9 }}
                    viewport={{ once: true }}
                >
                    {children}
                </motion.div>
            </div>

            {/* Traditional corner decorations */}
            <motion.div
                className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-purple-400/40"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: delay + 1.1 }}
                viewport={{ once: true }}
            />
            <motion.div
                className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-400/40"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: delay + 1.2 }}
                viewport={{ once: true }}
            />
            <motion.div
                className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-400/40"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: delay + 1.3 }}
                viewport={{ once: true }}
            />
            <motion.div
                className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-purple-400/40"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: delay + 1.4 }}
                viewport={{ once: true }}
            />
        </motion.div>
    )
}

JapaneseSlideIn.propTypes = {
    children: PropTypes.node.isRequired,
    text: PropTypes.string,
    japanese: PropTypes.string,
    direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
    duration: PropTypes.number,
    delay: PropTypes.number,
    className: PropTypes.string
}

// Slide sequence animation
export const SlideSequence = ({
    children,
    sequence = ['left', 'right', 'up', 'down'],
    duration = 0.6,
    staggerDelay = 0.2,
    className = '',
    ...props
}) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay
            }
        }
    }

    const createItemVariants = (direction) => ({
        hidden: {
            x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
            y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0,
            opacity: 0
        },
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                duration,
                ease: "easeOut"
            }
        }
    })

    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            {...props}
        >
            {Array.isArray(children) ? (
                children.map((child, index) => {
                    const direction = sequence[index % sequence.length]
                    return (
                        <motion.div
                            key={index}
                            variants={createItemVariants(direction)}
                        >
                            {child}
                        </motion.div>
                    )
                })
            ) : (
                <motion.div variants={createItemVariants(sequence[0])}>
                    {children}
                </motion.div>
            )}
        </motion.div>
    )
}

SlideSequence.propTypes = {
    children: PropTypes.node.isRequired,
    sequence: PropTypes.arrayOf(PropTypes.oneOf(['left', 'right', 'up', 'down'])),
    duration: PropTypes.number,
    staggerDelay: PropTypes.number,
    className: PropTypes.string
}

export default SlideIn