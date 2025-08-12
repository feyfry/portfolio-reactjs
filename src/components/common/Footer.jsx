import { Heart, ArrowUp, Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import SocialLinks from './SocialLinks'
import personalData from '../../data/personal.json'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const quickLinks = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Experience', href: '#experience' },
        { label: 'Contact', href: '#contact' }
    ]

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: personalData.email,
            href: `mailto:${personalData.email}`
        },
        {
            icon: Phone,
            label: 'Phone',
            value: personalData.phone,
            href: `tel:${personalData.phone}`
        },
        {
            icon: MapPin,
            label: 'Location',
            value: personalData.location,
            href: '#'
        }
    ]

    const handleLinkClick = (href) => {
        if (href.startsWith('#')) {
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    return (
        <footer className="bg-slate-950 border-t border-slate-800">
            {/* Main Footer Content */}
            <div className="container-content relative z-10 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">P</span>
                            </div>
                            <span className="text-white font-bold text-xl">Portfolio</span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            {personalData.bio}
                        </p>
                        <SocialLinks />
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <motion.li
                                    key={link.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <button
                                        onClick={() => handleLinkClick(link.href)}
                                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </button>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-white font-semibold text-lg mb-6">Contact Info</h3>
                        <ul className="space-y-4">
                            {contactInfo.map((contact, index) => {
                                const Icon = contact.icon
                                return (
                                    <motion.li
                                        key={contact.label}
                                        className="flex items-start space-x-3"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="bg-slate-800 p-2 rounded-lg">
                                            <Icon size={16} className="text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">{contact.label}</p>
                                            {contact.href.startsWith('mailto:') || contact.href.startsWith('tel:') ? (
                                                <a
                                                    href={contact.href}
                                                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                                                >
                                                    {contact.value}
                                                </a>
                                            ) : (
                                                <span className="text-gray-300">{contact.value}</span>
                                            )}
                                        </div>
                                    </motion.li>
                                )
                            })}
                        </ul>
                    </motion.div>

                    {/* Newsletter/CTA Section */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-white font-semibold text-lg mb-6">Let's Connect</h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Interested in working together? Let's discuss your next project.
                        </p>
                        <motion.a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault()
                                handleLinkClick('#contact')
                            }}
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Mail size={18} />
                            <span>Get In Touch</span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-slate-800 py-6">
                <div className="container-content relative z-10 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <motion.div
                            className="flex items-center space-x-2 text-gray-400"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <span>© {currentYear} {personalData.name}. Made with</span>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                            >
                                <Heart size={16} className="text-red-500 fill-current" />
                            </motion.div>
                            <span>in Jakarta</span>
                        </motion.div>

                        {/* Additional Links */}
                        <motion.div
                            className="flex items-center space-x-6 text-sm text-gray-400"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <a
                                href="/privacy"
                                className="hover:text-purple-400 transition-colors duration-300"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/terms"
                                className="hover:text-purple-400 transition-colors duration-300"
                            >
                                Terms of Service
                            </a>
                            <button
                                onClick={scrollToTop}
                                className="flex items-center space-x-1 hover:text-purple-400 transition-colors duration-300"
                            >
                                <span>Back to Top</span>
                                <ArrowUp size={14} />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Japanese Text (Optional) */}
            <motion.div
                className="text-center py-2 bg-slate-900"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <p className="text-gray-300 text-xs font-japanese">
                    ありがとうございます (Thank you for visiting)
                </p>
            </motion.div>
        </footer>
    )
}

export default Footer