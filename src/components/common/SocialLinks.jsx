import { motion } from 'framer-motion'
import {
    Github,
    Linkedin,
    Twitter,
    Mail,
    Instagram,
    Youtube,
    ExternalLink,
    MessageCircle
} from 'lucide-react'
import socialData from '../../data/social.json'

const SocialLinks = ({ orientation = 'horizontal', size = 'medium', showLabels = false }) => {
    // Icon mapping
    const iconMap = {
        github: Github,
        linkedin: Linkedin,
        twitter: Twitter,
        email: Mail,
        mail: Mail,
        instagram: Instagram,
        youtube: Youtube,
        whatsapp: MessageCircle
    }

    // Size configurations
    const sizeConfig = {
        small: {
            iconSize: 16,
            containerSize: 'w-8 h-8',
            textSize: 'text-xs'
        },
        medium: {
            iconSize: 20,
            containerSize: 'w-10 h-10',
            textSize: 'text-sm'
        },
        large: {
            iconSize: 24,
            containerSize: 'w-12 h-12',
            textSize: 'text-base'
        }
    }

    const config = sizeConfig[size]

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    }

    const handleSocialClick = (link) => {
        if (link.url.startsWith('mailto:') || link.url.startsWith('tel:')) {
            window.location.href = link.url
        } else {
            window.open(link.url, '_blank', 'noopener noreferrer')
        }
    }

    return (
        <motion.div
            className={`flex ${orientation === 'vertical'
                    ? 'flex-col space-y-3'
                    : 'flex-row space-x-3'
                } ${orientation === 'horizontal' ? 'flex-wrap gap-3' : ''}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {socialData.links.map((link) => {
                const IconComponent = iconMap[link.icon.toLowerCase()] || ExternalLink

                return (
                    <motion.button
                        key={link.name}
                        onClick={() => handleSocialClick(link)}
                        className={`group relative ${config.containerSize} bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-slate-600 shadow-lg hover:shadow-xl`}
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.1,
                            backgroundColor: link.color,
                            borderColor: link.color
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            '--hover-color': link.color
                        }}
                    >
                        {/* Icon */}
                        <IconComponent
                            size={config.iconSize}
                            className="text-gray-300 group-hover:text-white transition-colors duration-300"
                        />

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="bg-slate-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap shadow-lg">
                                {link.name}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
                            </div>
                        </div>

                        {/* Animated background */}
                        <motion.div
                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                            style={{ backgroundColor: link.color }}
                        />
                    </motion.button>
                )
            })}

            {/* Labels for horizontal layout */}
            {showLabels && orientation === 'horizontal' && (
                <motion.div
                    className="flex flex-wrap gap-2 mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {socialData.links.map((link, index) => (
                        <motion.span
                            key={`${link.name}-label`}
                            className={`${config.textSize} text-gray-400 px-2 py-1 bg-slate-800 rounded-md`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                        >
                            {link.name}
                        </motion.span>
                    ))}
                </motion.div>
            )}
        </motion.div>
    )
}

// Alternative: Card-style social links
export const SocialLinksCard = ({ className = '' }) => {
    const iconMap = {
        github: Github,
        linkedin: Linkedin,
        twitter: Twitter,
        email: Mail,
        mail: Mail,
        instagram: Instagram,
        youtube: Youtube,
        whatsapp: MessageCircle
    }

    return (
        <motion.div
            className={`bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h3 className="text-white font-semibold text-lg mb-4 text-center">
                Connect With Me
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {socialData.links.map((link, index) => {
                    const IconComponent = iconMap[link.icon.toLowerCase()] || ExternalLink

                    return (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all duration-300 group"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${link.color}20` }}
                            >
                                <IconComponent
                                    size={16}
                                    style={{ color: link.color }}
                                />
                            </div>
                            <div>
                                <p className="text-white font-medium text-sm">{link.name}</p>
                                <p className="text-gray-400 text-xs">Connect</p>
                            </div>
                        </motion.a>
                    )
                })}
            </div>
        </motion.div>
    )
}

// Alternative: Floating social links
export const FloatingSocialLinks = () => {
    const iconMap = {
        github: Github,
        linkedin: Linkedin,
        twitter: Twitter,
        email: Mail,
        mail: Mail,
        instagram: Instagram,
        youtube: Youtube,
        whatsapp: MessageCircle
    }

    return (
        <motion.div
            className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden xl:block"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
        >
            <div className="flex flex-col space-y-4">
                {socialData.links.map((link, index) => {
                    const IconComponent = iconMap[link.icon.toLowerCase()] || ExternalLink

                    return (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-full flex items-center justify-center group hover:border-slate-600 transition-all duration-300 shadow-lg"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: link.color,
                                borderColor: link.color
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <IconComponent
                                size={20}
                                className="text-gray-300 group-hover:text-white transition-colors duration-300"
                            />

                            {/* Label */}
                            <div className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="bg-slate-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap shadow-lg">
                                    {link.name}
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45 -ml-1" />
                                </div>
                            </div>
                        </motion.a>
                    )
                })}
            </div>
        </motion.div>
    )
}

export default SocialLinks