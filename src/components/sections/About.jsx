import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    User,
    MapPin,
    Calendar,
    Coffee,
    Code,
    Heart,
    Award,
    Volume2,
    VolumeX
} from 'lucide-react'
import personalData from '../../data/personal.json'

const About = () => {
    const [activeTab, setActiveTab] = useState('story')
    const [isAudioPlaying, setIsAudioPlaying] = useState(false)

    const tabs = [
        { id: 'story', label: 'My Story', japanese: '私の物語', icon: User },
        { id: 'passion', label: 'Passion', japanese: '情熱', icon: Heart },
        { id: 'journey', label: 'Journey', japanese: '旅路', icon: MapPin },
        { id: 'values', label: 'Values', japanese: '価値観', icon: Award }
    ]

    const personalFacts = [
        {
            icon: MapPin,
            label: 'Location',
            value: personalData.location,
            japanese: '場所'
        },
        {
            icon: Code,
            label: 'Experience',
            value: '3+ Years',
            japanese: '経験'
        },
        {
            icon: Coffee,
            label: 'Coffee Consumed',
            value: '∞ Cups',
            japanese: 'コーヒー'
        },
        {
            icon: Calendar,
            label: 'Availability',
            value: 'Open to Work',
            japanese: '空き状況'
        }
    ]

    const interests = [
        { name: 'Photography', emoji: '📸', japanese: '写真' },
        { name: 'Music', emoji: '🎵', japanese: '音楽' },
        { name: 'Gaming', emoji: '🎮', japanese: 'ゲーム' },
        { name: 'Cooking', emoji: '🍳', japanese: '料理' },
        { name: 'Reading', emoji: '📚', japanese: '読書' }
    ]

    const achievements = [
        { title: '30+ Successful Projects', icon: '🚀' },
        { title: 'React Expert Certification', icon: '⚛️' },
        { title: 'Open Source Contributor', icon: '🌟' },
        { title: 'Hackathon Winner', icon: '🏆' }
    ]

    const handleAudioToggle = () => {
        setIsAudioPlaying(!isAudioPlaying)
        // Implement audio functionality here
    }

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div className="relative overflow-hidden bg-slate-900">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container-content relative z-10">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                        About <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Me</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                        Get to know the person behind the code
                    </p>
                    <p className="text-sm md:text-base text-purple-400 font-japanese mt-2">
                        私について知ってください
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
                    {/* Left Column - Image & Facts */}
                    <motion.div
                        className="lg:col-span-1"
                        {...fadeInUp}
                        viewport={{ once: true }}
                    >
                        {/* Profile Image */}
                        <div className="relative mb-8">
                            <motion.div
                                className="relative overflow-hidden rounded-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={personalData.avatar}
                                    alt={personalData.name}
                                    className="w-full aspect-[4/5] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                                {/* Audio Control */}
                                <motion.button
                                    onClick={handleAudioToggle}
                                    className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {isAudioPlaying ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
                                </motion.button>
                            </motion.div>
                        </div>

                        {/* Personal Facts */}
                        <motion.div
                            className="card card-hover"
                            variants={stagger}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            <h3 className="text-white font-semibold text-lg mb-6 text-center">
                                Quick Facts
                                <span className="block text-sm text-purple-400 font-japanese mt-1">基本情報</span>
                            </h3>

                            <div className="space-y-4">
                                {personalFacts.map((fact, index) => {
                                    const Icon = fact.icon
                                    return (
                                        <motion.div
                                            key={fact.label}
                                            className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300"
                                            variants={fadeInUp}
                                            custom={index}
                                        >
                                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Icon size={18} className="text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-gray-300 text-sm">{fact.label}</p>
                                                <p className="text-white font-medium">{fact.value}</p>
                                                <p className="text-purple-400 text-xs font-japanese">{fact.japanese}</p>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Content */}
                    <div className="lg:col-span-2 content-spacing">
                        {/* Tab Navigation */}
                        <motion.div
                            className="flex flex-wrap gap-2 mb-8 lg:mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            {tabs.map((tab) => {
                                const Icon = tab.icon
                                return (
                                    <motion.button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 px-4 md:px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                            : 'bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon size={18} />
                                        <span>{tab.label}</span>
                                        <span className="text-xs font-japanese">({tab.japanese})</span>
                                    </motion.button>
                                )
                            })}
                        </motion.div>

                        {/* Tab Content */}
                        <motion.div
                            className="min-h-[400px]"
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {activeTab === 'story' && (
                                <div className="content-spacing-sm">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">My Story</h3>
                                    <div className="prose prose-lg text-gray-300 max-w-none content-spacing-sm">
                                        <p>
                                            Hello! I'm {personalData.name}, a passionate {personalData.title} based in {personalData.location}.
                                            My journey into the world of technology began during my university years when I discovered
                                            the magic of turning ideas into interactive digital experiences.
                                        </p>
                                        <p>
                                            What started as curiosity about how websites work evolved into a deep passion for creating
                                            beautiful, functional, and user-centered applications. I believe that great code is not just
                                            about functionality—it's about crafting experiences that make people's lives better.
                                        </p>
                                        <p className="text-purple-400 font-japanese text-sm">
                                            私は技術を通じて人々の生活をより良くすることに情熱を注いでいます。
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'passion' && (
                                <div className="content-spacing-sm">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">What Drives Me</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="card">
                                            <h4 className="text-white font-semibold mb-3">Innovation</h4>
                                            <p className="text-gray-300">
                                                I'm constantly exploring new technologies and pushing the boundaries
                                                of what's possible in web development.
                                            </p>
                                        </div>
                                        <div className="card">
                                            <h4 className="text-white font-semibold mb-3">User Experience</h4>
                                            <p className="text-gray-300">
                                                Creating intuitive, accessible, and delightful experiences that users love
                                                is at the heart of everything I do.
                                            </p>
                                        </div>
                                        <div className="card">
                                            <h4 className="text-white font-semibold mb-3">Continuous Learning</h4>
                                            <p className="text-gray-300">
                                                The tech world evolves rapidly, and I embrace that change by constantly
                                                learning and adapting to new trends and technologies.
                                            </p>
                                        </div>
                                        <div className="card">
                                            <h4 className="text-white font-semibold mb-3">Collaboration</h4>
                                            <p className="text-gray-300">
                                                I believe the best solutions come from diverse teams working together
                                                towards a common goal.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'journey' && (
                                <div className="content-spacing-sm">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">My Journey</h3>
                                    <div className="space-y-6">
                                        {achievements.map((achievement, index) => (
                                            <motion.div
                                                key={achievement.title}
                                                className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <div className="text-3xl">{achievement.icon}</div>
                                                <div>
                                                    <h4 className="text-white font-semibold">{achievement.title}</h4>
                                                    <p className="text-gray-400 text-sm">Milestone achieved</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'values' && (
                                <div className="content-spacing-sm">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Core Values</h3>
                                    <div className="grid gap-4">
                                        {[
                                            { title: 'Quality First', description: 'I believe in delivering excellence in every line of code.' },
                                            { title: 'Transparency', description: 'Open communication and honest feedback build trust.' },
                                            { title: 'Inclusivity', description: 'Technology should be accessible to everyone.' },
                                            { title: 'Sustainability', description: 'Writing clean, maintainable code for the long term.' }
                                        ].map((value, index) => (
                                            <motion.div
                                                key={value.title}
                                                className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl border border-slate-600/30"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <h4 className="text-white font-semibold mb-2">{value.title}</h4>
                                                <p className="text-gray-300">{value.description}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Interests Section */}
                <motion.div
                    className="mt-16 lg:mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                        When I'm Not Coding
                        <span className="block text-sm text-purple-400 font-japanese mt-2">
                            コーディング以外の時間
                        </span>
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                        {interests.map((interest, index) => (
                            <motion.div
                                key={interest.name}
                                className="card card-hover text-center group cursor-pointer"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                    {interest.emoji}
                                </div>
                                <p className="text-white font-medium text-sm md:text-base">{interest.name}</p>
                                <p className="text-purple-400 text-xs font-japanese">{interest.japanese}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-16 lg:mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-300 mb-6 text-lg md:text-xl">
                        Ready to bring your ideas to life?
                    </p>
                    <motion.button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn btn-primary text-lg"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>Let's Connect</span>
                        <span className="font-japanese ml-2">つながりましょう</span>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}

export default About