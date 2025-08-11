import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const Loading = ({
    variant = 'spinner',
    size = 'medium',
    color = 'purple',
    text,
    japanese,
    fullscreen = false,
    overlay = false,
    className = '',
    ...props
}) => {
    // Size configurations
    const sizes = {
        small: {
            spinner: 'w-4 h-4',
            dots: 'w-2 h-2',
            pulse: 'w-8 h-8',
            text: 'text-sm'
        },
        medium: {
            spinner: 'w-8 h-8',
            dots: 'w-3 h-3',
            pulse: 'w-12 h-12',
            text: 'text-base'
        },
        large: {
            spinner: 'w-12 h-12',
            dots: 'w-4 h-4',
            pulse: 'w-16 h-16',
            text: 'text-lg'
        },
        xlarge: {
            spinner: 'w-16 h-16',
            dots: 'w-5 h-5',
            pulse: 'w-20 h-20',
            text: 'text-xl'
        }
    }

    // Color configurations
    const colors = {
        purple: {
            primary: 'border-purple-500',
            secondary: 'border-purple-200',
            gradient: 'from-purple-500 to-pink-500',
            text: 'text-purple-400'
        },
        blue: {
            primary: 'border-blue-500',
            secondary: 'border-blue-200',
            gradient: 'from-blue-500 to-cyan-500',
            text: 'text-blue-400'
        },
        green: {
            primary: 'border-green-500',
            secondary: 'border-green-200',
            gradient: 'from-green-500 to-emerald-500',
            text: 'text-green-400'
        },
        white: {
            primary: 'border-white',
            secondary: 'border-gray-300',
            gradient: 'from-white to-gray-200',
            text: 'text-white'
        }
    }

    const config = {
        size: sizes[size],
        color: colors[color]
    }

    // Spinner Component
    const Spinner = () => (
        <motion.div
            className={`
        ${config.size.spinner} border-2 ${config.color.secondary} border-t-transparent rounded-full
      `}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
    )

    // Dots Component
    const Dots = () => (
        <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className={`${config.size.dots} bg-gradient-to-r ${config.color.gradient} rounded-full`}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2
                    }}
                />
            ))}
        </div>
    )

    // Pulse Component
    const Pulse = () => (
        <motion.div
            className={`${config.size.pulse} bg-gradient-to-r ${config.color.gradient} rounded-full`}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    )

    // Bars Component
    const Bars = () => (
        <div className="flex space-x-1 items-end">
            {[0, 1, 2, 3, 4].map((index) => (
                <motion.div
                    key={index}
                    className={`w-1 bg-gradient-to-t ${config.color.gradient} rounded-full`}
                    animate={{
                        height: ['10px', '20px', '10px']
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.1
                    }}
                />
            ))}
        </div>
    )

    // Wave Component
    const Wave = () => (
        <div className="flex space-x-1 items-center">
            {[0, 1, 2, 3, 4].map((index) => (
                <motion.div
                    key={index}
                    className={`${config.size.dots} bg-gradient-to-r ${config.color.gradient} rounded-full`}
                    animate={{
                        y: [0, -10, 0]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: index * 0.1
                    }}
                />
            ))}
        </div>
    )

    // Orbit Component
    const Orbit = () => (
        <div className={`relative ${config.size.pulse}`}>
            <motion.div
                className="absolute inset-0 border-2 border-dashed border-purple-300 rounded-full opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute top-0 left-1/2 w-2 h-2 bg-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: '50% 40px' }}
            />
        </div>
    )

    // Progressive Loading
    const Progress = ({ progress = 0 }) => (
        <div className="w-32 space-y-2">
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                    className={`h-full bg-gradient-to-r ${config.color.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
            <div className="text-center">
                <span className={`${config.size.text} ${config.color.text} font-medium`}>
                    {Math.round(progress)}%
                </span>
            </div>
        </div>
    )

    // Japanese Loading Animation
    const JapaneseKanji = () => {
        const kanji = ['読', '込', '中']

        return (
            <div className="flex space-x-2">
                {kanji.map((char, index) => (
                    <motion.span
                        key={char}
                        className={`${config.size.text} ${config.color.text} font-japanese font-bold`}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: index * 0.2
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
        )
    }

    // Component mapping
    const components = {
        spinner: Spinner,
        dots: Dots,
        pulse: Pulse,
        bars: Bars,
        wave: Wave,
        orbit: Orbit,
        progress: Progress,
        kanji: JapaneseKanji
    }

    const LoadingComponent = components[variant] || Spinner

    // Content wrapper
    const LoadingContent = () => (
        <div className={`flex flex-col items-center space-y-4 ${className}`} {...props}>
            <LoadingComponent />

            {text && (
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className={`${config.size.text} ${config.color.text} font-medium`}>
                        {text}
                    </p>
                    {japanese && (
                        <p className={`text-sm ${config.color.text} font-japanese mt-1 opacity-75`}>
                            {japanese}
                        </p>
                    )}
                </motion.div>
            )}
        </div>
    )

    // Fullscreen loading
    if (fullscreen) {
        return (
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <LoadingContent />
            </motion.div>
        )
    }

    // Overlay loading
    if (overlay) {
        return (
            <motion.div
                className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="bg-slate-800/90 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
                    <LoadingContent />
                </div>
            </motion.div>
        )
    }

    // Regular loading
    return <LoadingContent />
}

Loading.propTypes = {
    variant: PropTypes.oneOf(['spinner', 'dots', 'pulse', 'bars', 'wave', 'orbit', 'progress', 'kanji']),
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    color: PropTypes.oneOf(['purple', 'blue', 'green', 'white']),
    text: PropTypes.string,
    japanese: PropTypes.string,
    fullscreen: PropTypes.bool,
    overlay: PropTypes.bool,
    className: PropTypes.string,
    progress: PropTypes.number
}

// Skeleton Loading
export const Skeleton = ({
    variant = 'text',
    width = 'w-full',
    height = 'h-4',
    className = '',
    animate = true,
    ...props
}) => {
    const variants = {
        text: `${height} ${width} rounded`,
        circle: 'rounded-full',
        rectangular: `${height} ${width} rounded-lg`,
        avatar: 'w-12 h-12 rounded-full',
        card: 'w-full h-48 rounded-xl'
    }

    const baseClass = `bg-slate-700 ${variants[variant]} ${className}`

    if (animate) {
        return (
            <motion.div
                className={baseClass}
                animate={{
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                {...props}
            />
        )
    }

    return <div className={baseClass} {...props} />
}

Skeleton.propTypes = {
    variant: PropTypes.oneOf(['text', 'circle', 'rectangular', 'avatar', 'card']),
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    animate: PropTypes.bool
}

// Loading Button
export const LoadingButton = ({
    loading = false,
    children,
    loadingText = 'Loading...',
    japanese,
    disabled,
    className = '',
    ...props
}) => {
    return (
        <motion.button
            disabled={disabled || loading}
            className={`
        relative px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white 
        rounded-full font-semibold transition-all duration-300 disabled:opacity-50
        ${className}
      `}
            whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
            {...props}
        >
            <div className="flex items-center justify-center space-x-2">
                {loading && (
                    <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                )}
                <span className="flex flex-col items-center">
                    <span>{loading ? loadingText : children}</span>
                    {japanese && (
                        <span className="text-xs opacity-75 font-japanese">
                            {japanese}
                        </span>
                    )}
                </span>
            </div>
        </motion.button>
    )
}

LoadingButton.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.node.isRequired,
    loadingText: PropTypes.string,
    japanese: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string
}

// Page Loading Transition
export const PageLoading = ({
    isLoading,
    children,
    loadingComponent,
    className = ''
}) => {
    return (
        <motion.div className={className}>
            <motion.div
                key={isLoading ? 'loading' : 'content'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {isLoading ? (
                    loadingComponent || (
                        <div className="flex items-center justify-center py-20">
                            <Loading variant="kanji" size="large" text="Loading content..." japanese="コンテンツを読み込み中..." />
                        </div>
                    )
                ) : (
                    children
                )}
            </motion.div>
        </motion.div>
    )
}

PageLoading.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    loadingComponent: PropTypes.node,
    className: PropTypes.string
}

export default Loading