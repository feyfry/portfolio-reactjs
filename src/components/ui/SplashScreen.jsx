import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'

const SplashScreen = ({
    onComplete,
    duration = 3000,
    showProgress = true,
    progressSpeed = 50,
    title = 'ポートフォリオ',
    subtitle = '読み込み中...',
    englishTitle = 'Portfolio',
    englishSubtitle = 'Loading...',
    theme = 'dark',
    logo,
    backgroundElements = true,
    particles = true,
    className = '',
    ...props
}) => {
    const [progress, setProgress] = useState(0)
    const [currentPhase, setCurrentPhase] = useState('loading') // loading, complete, exiting
    const [isVisible, setIsVisible] = useState(true)

    // Theme configurations
    const themes = {
        dark: {
            background: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
            text: 'text-white',
            subtitle: 'text-gray-300',
            accent: 'text-purple-400',
            progress: 'from-purple-500 to-pink-500',
            progressBg: 'bg-gray-700'
        },
        light: {
            background: 'bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50',
            text: 'text-slate-900',
            subtitle: 'text-slate-600',
            accent: 'text-purple-600',
            progress: 'from-purple-500 to-pink-500',
            progressBg: 'bg-gray-300'
        },
        minimal: {
            background: 'bg-slate-900',
            text: 'text-white',
            subtitle: 'text-gray-400',
            accent: 'text-purple-400',
            progress: 'from-purple-500 to-pink-500',
            progressBg: 'bg-slate-800'
        }
    }

    const themeConfig = themes[theme]

    // Japanese kanji for animation
    const kanjiArray = ['創', '造', '技', '術'] // Create, Make, Technology, Art

    // Progress logic
    useEffect(() => {
        if (currentPhase !== 'loading') return

        const increment = 100 / (duration / progressSpeed)
        const timer = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + increment
                if (newProgress >= 100) {
                    clearInterval(timer)
                    setCurrentPhase('complete')
                    return 100
                }
                return newProgress
            })
        }, progressSpeed)

        return () => clearInterval(timer)
    }, [duration, progressSpeed, currentPhase])

    // Complete and exit logic
    useEffect(() => {
        if (currentPhase === 'complete') {
            const exitTimer = setTimeout(() => {
                setCurrentPhase('exiting')
                setTimeout(() => {
                    setIsVisible(false)
                    if (onComplete) {
                        onComplete()
                    }
                }, 800) // Exit animation duration
            }, 500) // Pause before exit

            return () => clearTimeout(exitTimer)
        }
    }, [currentPhase, onComplete])

    // Particle component
    const Particle = ({ delay = 0, duration = 3 }) => (
        <motion.div
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
            }}
            animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
            }}
            transition={{
                duration: duration + Math.random() * 2,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
        />
    )

    // Background orbs
    const BackgroundOrb = ({ size, position, color, delay = 0 }) => (
        <motion.div
            className={`absolute ${size} ${color} rounded-full blur-3xl`}
            style={position}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay
            }}
        />
    )

    if (!isVisible) return null

    return (
        <AnimatePresence>
            <motion.div
                className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden ${themeConfig.background} ${className}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                {...props}
            >
                {/* Background Elements */}
                {backgroundElements && (
                    <>
                        {/* Gradient Orbs */}
                        <BackgroundOrb
                            size="w-96 h-96"
                            position={{ top: '25%', left: '25%' }}
                            color="bg-purple-500/10"
                            delay={0}
                        />
                        <BackgroundOrb
                            size="w-96 h-96"
                            position={{ bottom: '25%', right: '25%' }}
                            color="bg-pink-500/10"
                            delay={4}
                        />

                        {/* Grid Pattern */}
                        <div
                            className="absolute inset-0 opacity-40"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                            }}
                        />
                    </>
                )}

                {/* Floating Particles */}
                {particles && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <Particle
                                key={i}
                                delay={Math.random() * 3}
                                duration={3 + Math.random() * 2}
                            />
                        ))}
                    </div>
                )}

                {/* Main Content */}
                <motion.div
                    className="text-center relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Logo */}
                    {logo && (
                        <motion.div
                            className="mb-8"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3,
                                type: "spring",
                                stiffness: 100
                            }}
                        >
                            {typeof logo === 'string' ? (
                                <img src={logo} alt="Logo" className="w-24 h-24 mx-auto" />
                            ) : (
                                logo
                            )}
                        </motion.div>
                    )}

                    {/* Japanese Title */}
                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h1 className={`text-4xl md:text-6xl font-light ${themeConfig.text} font-japanese mb-4`}>
                            {title}
                        </h1>
                        <p className={`text-lg md:text-xl ${themeConfig.subtitle} font-japanese`}>
                            {subtitle}
                        </p>
                    </motion.div>

                    {/* English Translation */}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <p className={`text-sm ${themeConfig.accent} uppercase tracking-wider`}>
                            {englishTitle}
                        </p>
                        <p className={`text-xs ${themeConfig.accent} mt-1`}>
                            {englishSubtitle}
                        </p>
                    </motion.div>

                    {/* Animated Kanji */}
                    <motion.div
                        className="flex justify-center space-x-4 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                    >
                        {kanjiArray.map((kanji, index) => (
                            <motion.span
                                key={kanji}
                                className={`text-3xl md:text-4xl ${themeConfig.accent} font-japanese`}
                                initial={{ rotateY: 180, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                transition={{
                                    delay: 1 + index * 0.2,
                                    duration: 0.6,
                                    type: "spring",
                                    stiffness: 100
                                }}
                            >
                                {kanji}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Progress Bar */}
                    {showProgress && (
                        <motion.div
                            className="w-64 md:w-80 mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                        >
                            <div className={`w-full h-1 ${themeConfig.progressBg} rounded-full overflow-hidden mb-4`}>
                                <motion.div
                                    className={`h-full bg-gradient-to-r ${themeConfig.progress} rounded-full`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>

                            {/* Progress Text */}
                            <motion.div
                                className="flex justify-between items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }}
                            >
                                <span className={`${themeConfig.accent} text-sm font-mono`}>
                                    {Math.round(progress)}%
                                </span>
                                <span className={`${themeConfig.accent} text-sm font-japanese`}>
                                    {currentPhase === 'complete' ? '完了' : '処理中'}
                                </span>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Completion Message */}
                    <AnimatePresence>
                        {currentPhase === 'complete' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5 }}
                                className={`mt-6 ${themeConfig.accent}`}
                            >
                                <p className="text-lg font-japanese">準備完了！</p>
                                <p className="text-sm">Ready to begin</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Exit Animation Overlay */}
                <AnimatePresence>
                    {currentPhase === 'exiting' && (
                        <motion.div
                            className="absolute inset-0 bg-black"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    )
}

SplashScreen.propTypes = {
    onComplete: PropTypes.func,
    duration: PropTypes.number,
    showProgress: PropTypes.bool,
    progressSpeed: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    englishTitle: PropTypes.string,
    englishSubtitle: PropTypes.string,
    theme: PropTypes.oneOf(['dark', 'light', 'minimal']),
    logo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    backgroundElements: PropTypes.bool,
    particles: PropTypes.bool,
    className: PropTypes.string
}

// Simple Loading Splash
export const SimpleSplash = ({
    onComplete,
    title = 'Loading...',
    japanese = '読み込み中...',
    duration = 2000,
    ...props
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onComplete])

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            <div className="text-center">
                <motion.div
                    className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <h2 className="text-xl text-white mb-2">{title}</h2>
                <p className="text-purple-400 font-japanese">{japanese}</p>
            </div>
        </motion.div>
    )
}

SimpleSplash.propTypes = {
    onComplete: PropTypes.func,
    title: PropTypes.string,
    japanese: PropTypes.string,
    duration: PropTypes.number
}

// Brand Splash
export const BrandSplash = ({
    onComplete,
    logo,
    brandName,
    tagline,
    japanese,
    ...props
}) => {
    const [phase, setPhase] = useState('logo') // logo, brand, tagline, exit

    useEffect(() => {
        const phases = [
            { name: 'logo', duration: 800 },
            { name: 'brand', duration: 800 },
            { name: 'tagline', duration: 800 },
            { name: 'exit', duration: 600 }
        ]

        let currentTime = 0
        phases.forEach(({ name, duration: phaseDuration }) => {
            setTimeout(() => {
                setPhase(name)
                if (name === 'exit' && onComplete) {
                    setTimeout(onComplete, phaseDuration)
                }
            }, currentTime)
            currentTime += phaseDuration
        })
    }, [onComplete])

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            <div className="text-center">
                <AnimatePresence mode="wait">
                    {phase === 'logo' && logo && (
                        <motion.div
                            key="logo"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.2, opacity: 0 }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className="mb-8"
                        >
                            {typeof logo === 'string' ? (
                                <img src={logo} alt="Logo" className="w-32 h-32 mx-auto" />
                            ) : (
                                logo
                            )}
                        </motion.div>
                    )}

                    {phase === 'brand' && brandName && (
                        <motion.h1
                            key="brand"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-bold text-white"
                        >
                            {brandName}
                        </motion.h1>
                    )}

                    {phase === 'tagline' && (
                        <motion.div
                            key="tagline"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            {tagline && (
                                <p className="text-xl text-gray-300 mb-2">{tagline}</p>
                            )}
                            {japanese && (
                                <p className="text-purple-400 font-japanese">{japanese}</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

BrandSplash.propTypes = {
    onComplete: PropTypes.func,
    logo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    brandName: PropTypes.string,
    tagline: PropTypes.string,
    japanese: PropTypes.string,
    duration: PropTypes.number
}

export default SplashScreen