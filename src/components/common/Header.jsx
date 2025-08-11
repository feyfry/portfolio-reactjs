import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Menu, X, Home, User, Code, Briefcase, Mail, FileText } from 'lucide-react'

const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'skills', label: 'Skills', icon: Code, href: '#skills' },
    { id: 'projects', label: 'Projects', icon: Briefcase, href: '#projects' },
    { id: 'experience', label: 'Experience', icon: FileText, href: '#experience' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' }
]

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            setIsScrolled(scrollTop > 50)

            // Update active section based on scroll position
            const sections = navigationItems.map(item => item.id)
            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Handle smooth scroll to section
    const handleNavClick = (href) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        setIsMobileMenuOpen(false)
    }

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
                setIsMobileMenuOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isMobileMenuOpen])

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
                    ? 'bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 shadow-lg'
                    : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <nav className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <span className="text-white font-bold text-xl hidden sm:block">Portfolio</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navigationItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <motion.button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.href)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${activeSection === item.id
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                            : 'text-gray-300 hover:text-white hover:bg-slate-800'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon size={18} />
                                    <span className="font-medium">{item.label}</span>
                                </motion.button>
                            )
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="lg:hidden p-2 rounded-lg bg-slate-800 text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={24} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={24} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="mobile-menu-container lg:hidden absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur-lg border-b border-slate-700/50 shadow-xl"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-6 py-4 space-y-2">
                                {navigationItems.map((item, index) => {
                                    const Icon = item.icon
                                    return (
                                        <motion.button
                                            key={item.id}
                                            onClick={() => handleNavClick(item.href)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeSection === item.id
                                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                                    : 'text-gray-300 hover:text-white hover:bg-slate-800'
                                                }`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Icon size={20} />
                                            <span className="font-medium">{item.label}</span>
                                        </motion.button>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                style={{
                    width: `${((window.scrollY || 0) / (document.documentElement.scrollHeight - window.innerHeight || 1)) * 100}%`
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
            />
        </motion.header>
    )
}

export default Header