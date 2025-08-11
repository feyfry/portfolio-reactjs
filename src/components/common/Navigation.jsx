// src/components/common/Navigation.jsx
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
    Home,
    User,
    Code,
    Briefcase,
    FileText,
    Mail,
    Settings,
    Moon,
    Sun
} from 'lucide-react'

const navigationItems = [
    {
        id: 'home',
        label: 'Home',
        icon: Home,
        href: '#home',
        japanese: 'ホーム'
    },
    {
        id: 'about',
        label: 'About',
        icon: User,
        href: '#about',
        japanese: '私について'
    },
    {
        id: 'skills',
        label: 'Skills',
        icon: Code,
        href: '#skills',
        japanese: 'スキル'
    },
    {
        id: 'projects',
        label: 'Projects',
        icon: Briefcase,
        href: '#projects',
        japanese: 'プロジェクト'
    },
    {
        id: 'experience',
        label: 'Experience',
        icon: FileText,
        href: '#experience',
        japanese: '経験'
    },
    {
        id: 'contact',
        label: 'Contact',
        icon: Mail,
        href: '#contact',
        japanese: '連絡先'
    }
]

const Navigation = () => {
    const [activeSection, setActiveSection] = useState('home')
    const [isExpanded, setIsExpanded] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(true)

    // Track active section based on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = navigationItems.map(item => item.id)
            const scrollPosition = window.scrollY + 200

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const offsetTop = element.offsetTop
                    const offsetBottom = offsetTop + element.offsetHeight

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check initial position

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Handle navigation click
    const handleNavigation = (href) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle('dark')
    }

    return (
        <>
            {/* Desktop Side Navigation */}
            <motion.nav
                className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'
                    }`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                <div className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-700/50">
                        <motion.div
                            className="flex items-center space-x-3"
                            layout
                        >
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm">P</span>
                            </div>
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.span
                                        className="text-white font-semibold"
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Portfolio
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Navigation Items */}
                    <div className="py-2">
                        {navigationItems.map((item, index) => {
                            const Icon = item.icon
                            const isActive = activeSection === item.id

                            return (
                                <motion.button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.href)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-300 relative group ${isActive
                                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400'
                                            : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                                        }`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    whileHover={{ x: 4 }}
                                >
                                    {/* Active Indicator */}
                                    {isActive && (
                                        <motion.div
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500"
                                            layoutId="activeIndicator"
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}

                                    <Icon size={20} className="flex-shrink-0" />

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                className="flex flex-col items-start overflow-hidden"
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <span className="font-medium">{item.label}</span>
                                                <span className="text-xs text-gray-500 font-japanese">
                                                    {item.japanese}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Arrow indicator for hover */}
                                    <AnimatePresence>
                                        {!isExpanded && (
                                            <motion.div
                                                className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap pointer-events-none"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                            >
                                                {item.label}
                                                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            )
                        })}
                    </div>

                    {/* Footer Controls */}
                    <div className="border-t border-slate-700/50 p-4">
                        <motion.button
                            onClick={toggleDarkMode}
                            className={`w-full flex items-center space-x-3 px-2 py-2 rounded-lg transition-all duration-300 ${isDarkMode ? 'text-yellow-400' : 'text-gray-400'
                                } hover:bg-slate-800/50`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.span
                                        className="font-medium"
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Bottom Navigation */}
            <motion.nav
                className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <div className="flex items-center justify-around py-2">
                    {navigationItems.slice(0, 5).map((item, index) => {
                        const Icon = item.icon
                        const isActive = activeSection === item.id

                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => handleNavigation(item.href)}
                                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-300 ${isActive
                                        ? 'text-purple-400'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icon size={20} />
                                <span className="text-xs font-medium">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        className="w-1 h-1 bg-purple-400 rounded-full"
                                        layoutId="mobileActiveIndicator"
                                    />
                                )}
                            </motion.button>
                        )
                    })}

                    {/* More/Settings Button */}
                    <motion.button
                        className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-gray-400 hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Settings size={20} />
                        <span className="text-xs font-medium">More</span>
                    </motion.button>
                </div>
            </motion.nav>

            {/* Floating Action Button (Mobile) */}
            <motion.button
                onClick={() => handleNavigation('#contact')}
                className="fixed bottom-20 right-4 lg:hidden w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg z-20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Mail size={24} className="text-white" />
            </motion.button>
        </>
    )
}

export default Navigation