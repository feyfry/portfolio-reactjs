import PropTypes from 'prop-types'

const FadeIn = ({
    children,
    direction = 'up',
    distance = 20,
    duration = 0.6,
    delay = 0,
    cascade = false,
    cascadeDelay = 0.1,
    triggerOnce = true,
    threshold = 0.1,
    className = '',
    ...props
}) => {
    // Direction variants
    const directionVariants = {
        up: { y: distance, opacity: 0 },
        down: { y: -distance, opacity: 0 },
        left: { x: distance, opacity: 0 },
        right: { x: -distance, opacity: 0 },
        scale: { scale: 0.8, opacity: 0 },
        'scale-up': { scale: 1.2, opacity: 0 },
        none: { opacity: 0 }
    }

    const visible = {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1
    }

    // Animation variants
    const variants = {
        hidden: directionVariants[direction],
        visible: {
            ...visible,
            transition: {
                duration,
                delay,
                ease: "easeOut"
            }
        }
    }

    // Cascade variants for multiple children
    const cascadeVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: cascadeDelay,
                delayChildren: delay
            }
        }
    }

    const cascadeItemVariants = {
        hidden: directionVariants[direction],
        visible: {
            ...visible,
            transition: {
                duration,
                ease: "easeOut"
            }
        }
    }

    // If cascade is enabled and children is an array
    if (cascade && Array.isArray(children)) {
        return (
            <motion.div
                className={className}
                variants={cascadeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: triggerOnce, amount: threshold }}
                {...props}
            >
                {children.map((child, index) => (
                    <motion.div
                        key={index}
                        variants={cascadeItemVariants}
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

FadeIn.propTypes = {
    children: PropTypes.node.isRequired,
    direction: PropTypes.oneOf(['up', 'down', 'left', 'right', 'scale', 'scale-up', 'none']),
    distance: PropTypes.number,
    duration: PropTypes.number,
    delay: PropTypes.number,
    once: PropTypes.bool,
    cascade: PropTypes.bool,
    cascadeDelay: PropTypes.number,
    triggerOnce: PropTypes.bool,
    threshold: PropTypes.number,
    className: PropTypes.string
}

// Preset fade animations
export const FadeInUp = ({ children, ...props }) => (
    <FadeIn direction="up" {...props}>
        {children}
    </FadeIn>
)

FadeInUp.propTypes = {
    children: PropTypes.node.isRequired
}

export const FadeInDown = ({ children, ...props }) => (
    <FadeIn direction="down" {...props}>
        {children}
    </FadeIn>
)

FadeInDown.propTypes = {
    children: PropTypes.node.isRequired
}

export const FadeInLeft = ({ children, ...props }) => (
    <FadeIn direction="left" {...props}>
        {children}
    </FadeIn>
)

FadeInLeft.propTypes = {
    children: PropTypes.node.isRequired
}

export const FadeInRight = ({ children, ...props }) => (
    <FadeIn direction="right" {...props}>
        {children}
    </FadeIn>
)

FadeInRight.propTypes = {
    children: PropTypes.node.isRequired
}

export const FadeInScale = ({ children, ...props }) => (
    <FadeIn direction="scale" {...props}>
        {children}
    </FadeIn>
)

FadeInScale.propTypes = {
    children: PropTypes.node.isRequired
}

// Advanced fade animations
export const FadeInStagger = ({
    children,
    staggerDelay = 0.1,
    direction = 'up',
    className = '',
    ...props
}) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
            x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
            scale: direction === 'scale' ? 0.8 : 1
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

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
                children.map((child, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        {child}
                    </motion.div>
                ))
            ) : (
                <motion.div variants={itemVariants}>
                    {children}
                </motion.div>
            )}
        </motion.div>
    )
}

FadeInStagger.propTypes = {
    children: PropTypes.node.isRequired,
    staggerDelay: PropTypes.number,
    direction: PropTypes.oneOf(['up', 'down', 'left', 'right', 'scale']),
    className: PropTypes.string
}

// Fade in with blur effect
export const FadeInBlur = ({
    children,
    direction = 'up',
    distance = 20,
    duration = 0.8,
    delay = 0,
    className = '',
    ...props
}) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
            x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
            filter: 'blur(10px)'
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            filter: 'blur(0px)',
            transition: {
                duration,
                delay,
                ease: "easeOut"
            }
        }
    }

    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            {...props}
        >
            {children}
        </motion.div>
    )
}

FadeInBlur.propTypes = {
    children: PropTypes.node.isRequired,
    direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
    distance: PropTypes.number,
    duration: PropTypes.number,
    delay: PropTypes.number,
    className: PropTypes.string
}

// Text reveal animation
export const TextFadeIn = ({
    text,
    japanese,
    delay = 0,
    duration = 0.8,
    className = '',
    splitBy = 'word', // 'word', 'char', 'line'
    staggerDelay = 0.1,
    ...props
}) => {
    const splitText = (text, type) => {
        switch (type) {
            case 'char':
                return text.split('')
            case 'word':
                return text.split(' ')
            case 'line':
                return text.split('\n')
            default:
                return [text]
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration,
                ease: "easeOut"
            }
        }
    }

    const textParts = splitText(text, splitBy)

    return (
        <div className={className} {...props}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={splitBy === 'word' ? 'flex flex-wrap gap-1' : ''}
            >
                {textParts.map((part, index) => (
                    <motion.span
                        key={index}
                        variants={itemVariants}
                        className={splitBy === 'char' ? 'inline-block' : ''}
                    >
                        {part}
                        {splitBy === 'word' && index < textParts.length - 1 && ' '}
                    </motion.span>
                ))}
            </motion.div>

            {japanese && (
                <motion.p
                    className="text-purple-400 font-japanese text-sm mt-2 opacity-75"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: delay + textParts.length * staggerDelay + 0.2 }}
                    viewport={{ once: true }}
                >
                    {japanese}
                </motion.p>
            )}
        </div>
    )
}

TextFadeIn.propTypes = {
    text: PropTypes.string.isRequired,
    japanese: PropTypes.string,
    delay: PropTypes.number,
    duration: PropTypes.number,
    className: PropTypes.string,
    splitBy: PropTypes.oneOf(['word', 'char', 'line']),
    staggerDelay: PropTypes.number
}

// Page transition fade
export const PageFadeIn = ({
    children,
    duration = 0.5,
    className = '',
    ...props
}) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration, ease: "easeInOut" }}
            {...props}
        >
            {children}
        </motion.div>
    )
}

PageFadeIn.propTypes = {
    children: PropTypes.node.isRequired,
    duration: PropTypes.number,
    className: PropTypes.string
}

// Conditional fade in
export const ConditionalFadeIn = ({
    children,
    condition,
    fallback = null,
    duration = 0.6,
    ...props
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: condition ? 1 : 0,
                scale: condition ? 1 : 0.8
            }}
            transition={{ duration }}
            {...props}
        >
            {condition ? children : fallback}
        </motion.div>
    )
}

ConditionalFadeIn.propTypes = {
    children: PropTypes.node.isRequired,
    condition: PropTypes.bool.isRequired,
    fallback: PropTypes.node,
    duration: PropTypes.number
}

export default FadeIn