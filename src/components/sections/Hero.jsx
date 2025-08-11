import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Download, Mail, Play, Pause } from 'lucide-react'
import personalData from '../../data/personal.json'

const Hero = () => {
    const [currentRole, setCurrentRole] = useState(0)
    const [isTyping, setIsTyping] = useState(true)
    const [displayText, setDisplayText] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)

    const roles = [
        personalData.title,
        'React Developer',
        'UI/UX Designer',
        'Full Stack Engineer',
        'フロントエンド開発者' // Japanese: Frontend Developer
    ]

    // Typewriter effect for roles
    useEffect(() => {
        let timeout
        const currentRoleText = roles[currentRole]

        if (isTyping) {
            if (displayText.length < currentRoleText.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentRoleText.slice(0, displayText.length + 1))
                }, 100)
            } else {
                timeout = setTimeout(() => {
                    setIsTyping(false)
                }, 2000)
            }
        } else {
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1))
                }, 50)
            } else {
                setCurrentRole((prev) => (prev + 1) % roles.length)
                setIsTyping(true)
            }
        }

        return () => clearTimeout(timeout)
    }, [displayText, isTyping, currentRole, roles])

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleContactClick = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    const handlePlayDemo = () => {
        setIsPlaying(!isPlaying)
        // Implement demo video/animation logic here
    }

    // Floating animation variants
    const floatingVariants = {
        initial: { scale: 0, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            y: [0, -20, 0],
            transition: {
                scale: { duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 },
                opacity: { duration: 0.8, delay: 0.2 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }
        }
    }

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-slate-900/5 opacity-40" />

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
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
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}

                {/* Gradient Orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 4
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Japanese Greeting */}
                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-purple-400 font-japanese text-lg">
                            こんにちは！ (Hello!)
                        </span>
                    </motion.div>

                    {/* Profile Avatar Placeholder */}
                    <motion.div
                        className="mb-8"
                        variants={floatingVariants}
                        initial="initial"
                        animate="animate"
                    >
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse opacity-75" />
                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-white/20 shadow-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                <span className="text-white text-4xl md:text-5xl font-bold">
                                    {personalData.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 animate-pulse" />
                        </div>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <span className="bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                            {personalData.name}
                        </span>
                    </motion.h1>

                    {/* Typing Animation for Role */}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <div className="text-xl md:text-2xl lg:text-3xl text-purple-300 font-medium min-h-[2.5rem] flex items-center justify-center">
                            <span className="mr-2">I'm a</span>
                            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                                {displayText}
                            </span>
                            <motion.span
                                className="inline-block w-0.5 h-8 bg-purple-400 ml-1"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>

                    {/* Bio */}
                    <motion.p
                        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        {personalData.bio}
                    </motion.p>

                    {/* Call to Action Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        <motion.button
                            onClick={handleContactClick}
                            className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Mail size={20} />
                            <span>Let's Work Together</span>
                        </motion.button>

                        <motion.a
                            href={personalData.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group border-2 border-purple-400 text-purple-400 px-8 py-4 rounded-full font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300 flex items-center space-x-2"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download size={20} />
                            <span>Download Resume</span>
                        </motion.a>

                        <motion.button
                            onClick={handlePlayDemo}
                            className="group border-2 border-slate-500 text-slate-400 px-6 py-4 rounded-full font-semibold hover:bg-slate-500 hover:text-white transition-all duration-300 flex items-center space-x-2"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            <span>Watch Demo</span>
                        </motion.button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        {[
                            { number: '50+', label: 'Projects', japanese: 'プロジェクト' },
                            { number: '3+', label: 'Years', japanese: '年間' },
                            { number: '100%', label: 'Satisfied', japanese: '満足度' },
                            { number: '24/7', label: 'Support', japanese: 'サポート' }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                            >
                                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-400 font-medium">{stat.label}</div>
                                <div className="text-xs text-purple-400 font-japanese">
                                    {stat.japanese}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    onClick={scrollToAbout}
                >
                    <motion.div
                        className="flex flex-col items-center space-y-2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-sm font-medium">Scroll Down</span>
                        <span className="text-xs font-japanese">下にスクロール</span>
                        <ChevronDown size={24} />
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Video/Canvas (Optional) */}
            {isPlaying && (
                <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setIsPlaying(false)}
                >
                    <motion.div
                        className="bg-white rounded-lg p-4 max-w-2xl mx-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-600">Demo Video Placeholder</span>
                        </div>
                        <button
                            onClick={() => setIsPlaying(false)}
                            className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </section>
    )
}

export default Hero