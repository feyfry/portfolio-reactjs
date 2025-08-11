import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const Card = ({
    children,
    variant = 'default',
    hover = true,
    padding = 'normal',
    className = '',
    onClick,
    gradient = false,
    glow = false,
    border = true,
    japanese,
    title,
    subtitle,
    icon,
    actions,
    image,
    ...props
}) => {
    // Card variants
    const variants = {
        default: 'bg-slate-800/50 backdrop-blur-lg',
        glass: 'bg-white/10 backdrop-blur-lg',
        solid: 'bg-slate-800',
        dark: 'bg-slate-900/90 backdrop-blur-lg',
        gradient: 'bg-gradient-to-br from-slate-800/80 to-purple-900/20 backdrop-blur-lg',
        elevated: 'bg-slate-800/50 backdrop-blur-lg shadow-2xl'
    }

    // Padding variants
    const paddings = {
        none: 'p-0',
        small: 'p-4',
        normal: 'p-6',
        large: 'p-8'
    }

    // Base classes
    const baseClasses = `
    relative rounded-2xl transition-all duration-300 overflow-hidden
    ${variants[gradient ? 'gradient' : variant]}
    ${paddings[padding]}
    ${border ? 'border border-slate-700/50' : ''}
    ${hover ? 'hover:border-purple-500/50 hover:shadow-xl' : ''}
    ${glow ? 'shadow-lg shadow-purple-500/10' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `

    // Motion variants
    const motionVariants = {
        whileHover: hover && onClick ? { scale: 1.02, y: -2 } : {},
        whileTap: onClick ? { scale: 0.98 } : {},
        transition: { type: "spring", stiffness: 400, damping: 17 }
    }

    return (
        <motion.div
            className={baseClasses}
            onClick={onClick}
            {...motionVariants}
            {...props}
        >
            {/* Glow effect */}
            {glow && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
            )}

            {/* Header Image */}
            {image && (
                <div className="relative -m-6 mb-6 h-48 overflow-hidden rounded-t-2xl">
                    {typeof image === 'string' ? (
                        <img
                            src={image}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                    ) : (
                        image
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800/60 to-transparent" />
                </div>
            )}

            {/* Card Header */}
            {(title || subtitle || icon || japanese) && (
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3 flex-1">
                        {icon && (
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                {icon}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            {title && (
                                <h3 className="text-lg font-semibold text-white mb-1 truncate">
                                    {title}
                                </h3>
                            )}
                            {subtitle && (
                                <p className="text-gray-400 text-sm">
                                    {subtitle}
                                </p>
                            )}
                            {japanese && (
                                <p className="text-purple-400 text-xs font-japanese mt-1">
                                    {japanese}
                                </p>
                            )}
                        </div>
                    </div>
                    {actions && (
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            {actions}
                        </div>
                    )}
                </div>
            )}

            {/* Card Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    )
}

Card.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf(['default', 'glass', 'solid', 'dark', 'gradient', 'elevated']),
    hover: PropTypes.bool,
    padding: PropTypes.oneOf(['none', 'small', 'normal', 'large']),
    className: PropTypes.string,
    onClick: PropTypes.func,
    gradient: PropTypes.bool,
    glow: PropTypes.bool,
    border: PropTypes.bool,
    japanese: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    icon: PropTypes.node,
    actions: PropTypes.node,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

// Grid Card Layout
export const CardGrid = ({
    children,
    columns = 'auto',
    gap = 'gap-6',
    className = '',
    ...props
}) => {
    const columnClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }

    return (
        <div
            className={`grid ${columnClasses[columns]} ${gap} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

CardGrid.propTypes = {
    children: PropTypes.node.isRequired,
    columns: PropTypes.oneOf([1, 2, 3, 4, 'auto']),
    gap: PropTypes.string,
    className: PropTypes.string
}

// Feature Card
export const FeatureCard = ({
    icon,
    title,
    description,
    japanese,
    color = 'from-purple-500 to-pink-500',
    className = '',
    ...props
}) => {
    return (
        <Card
            className={`text-center group ${className}`}
            hover
            glow
            {...props}
        >
            <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                {title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
                {description}
            </p>
            {japanese && (
                <p className="text-purple-400 text-sm font-japanese mt-3 opacity-75">
                    {japanese}
                </p>
            )}
        </Card>
    )
}

FeatureCard.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    japanese: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string
}

// Stat Card
export const StatCard = ({
    icon,
    label,
    value,
    change,
    changeType = 'positive',
    japanese,
    color = 'from-purple-500 to-pink-500',
    className = '',
    ...props
}) => {
    const changeColors = {
        positive: 'text-green-400',
        negative: 'text-red-400',
        neutral: 'text-gray-400'
    }

    return (
        <Card
            className={`text-center ${className}`}
            hover
            {...props}
        >
            <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                {icon}
            </div>
            <div className="text-2xl font-bold text-white mb-2">
                {value}
            </div>
            <div className="text-gray-400 font-medium mb-1">
                {label}
            </div>
            {japanese && (
                <div className="text-xs text-purple-400 font-japanese mb-2">
                    {japanese}
                </div>
            )}
            {change && (
                <div className={`text-sm font-medium ${changeColors[changeType]}`}>
                    {changeType === 'positive' ? '↗' : changeType === 'negative' ? '↘' : '→'} {change}
                </div>
            )}
        </Card>
    )
}

StatCard.propTypes = {
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    change: PropTypes.string,
    changeType: PropTypes.oneOf(['positive', 'negative', 'neutral']),
    japanese: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string
}

// Profile Card
export const ProfileCard = ({
    image,
    name,
    title,
    bio,
    japanese,
    actions,
    socials,
    className = '',
    ...props
}) => {
    return (
        <Card
            className={`text-center ${className}`}
            padding="large"
            glow
            {...props}
        >
            {/* Profile Image */}
            <div className="relative inline-block mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500/30 mx-auto">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-800" />
            </div>

            {/* Profile Info */}
            <h3 className="text-xl font-bold text-white mb-1">
                {name}
            </h3>
            <p className="text-purple-400 font-medium mb-3">
                {title}
            </p>
            {japanese && (
                <p className="text-purple-400 text-sm font-japanese mb-4 opacity-75">
                    {japanese}
                </p>
            )}
            {bio && (
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {bio}
                </p>
            )}

            {/* Social Links */}
            {socials && (
                <div className="flex justify-center space-x-3 mb-6">
                    {socials}
                </div>
            )}

            {/* Actions */}
            {actions && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {actions}
                </div>
            )}
        </Card>
    )
}

ProfileCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    bio: PropTypes.string,
    japanese: PropTypes.string,
    actions: PropTypes.node,
    socials: PropTypes.node,
    className: PropTypes.string
}

// Testimonial Card
export const TestimonialCard = ({
    content,
    author,
    role,
    company,
    avatar,
    rating,
    japanese,
    className = '',
    ...props
}) => {
    return (
        <Card
            className={`relative ${className}`}
            padding="large"
            {...props}
        >
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 text-purple-500/20 text-4xl font-serif">
                "
            </div>

            {/* Rating */}
            {rating && (
                <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, index) => (
                        <span
                            key={index}
                            className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-600'
                                }`}
                        >
                            ★
                        </span>
                    ))}
                </div>
            )}

            {/* Content */}
            <blockquote className="text-gray-300 leading-relaxed mb-6 italic">
                "{content}"
            </blockquote>

            {japanese && (
                <p className="text-purple-400 text-sm font-japanese mb-4 opacity-75 italic">
                    "{japanese}"
                </p>
            )}

            {/* Author */}
            <div className="flex items-center space-x-3">
                {avatar && (
                    <img
                        src={avatar}
                        alt={author}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                )}
                <div>
                    <div className="text-white font-semibold">{author}</div>
                    <div className="text-gray-400 text-sm">
                        {role}{company && ` at ${company}`}
                    </div>
                </div>
            </div>
        </Card>
    )
}

TestimonialCard.propTypes = {
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    company: PropTypes.string,
    avatar: PropTypes.string,
    rating: PropTypes.number,
    japanese: PropTypes.string,
    className: PropTypes.string
}

export default Card