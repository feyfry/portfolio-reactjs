import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    disabled = false,
    loading = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    href,
    target,
    className = '',
    type = 'button',
    japanese,
    ...props
}) => {
    // Button variants
    const variants = {
        primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl border-transparent',
        secondary: 'border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent',
        outline: 'border-2 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white bg-transparent',
        ghost: 'text-gray-400 hover:text-white hover:bg-slate-800 bg-transparent border-transparent',
        danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl border-transparent',
        success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl border-transparent',
        glass: 'bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20'
    }

    // Button sizes
    const sizes = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg',
        icon: 'p-3'
    }

    // Base classes
    const baseClasses = `
    inline-flex items-center justify-center space-x-2 
    font-semibold rounded-full transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
    `

    // Loading spinner component
    const LoadingSpinner = () => (
        <motion.div
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
    )

    // Button content
    const ButtonContent = () => (
        <>
            {loading && <LoadingSpinner />}
            {!loading && icon && iconPosition === 'left' && (
                <span className="flex-shrink-0">{icon}</span>
            )}
            <span className="flex flex-col items-center">
                <span>{children}</span>
                {japanese && (
                    <span className="text-xs opacity-75 font-japanese">{japanese}</span>
                )}
            </span>
            {!loading && icon && iconPosition === 'right' && (
                <span className="flex-shrink-0">{icon}</span>
            )}
        </>
    )

    // Motion variants for animations
    const motionVariants = {
        whileHover: { scale: disabled || loading ? 1 : 1.05, y: disabled || loading ? 0 : -2 },
        whileTap: { scale: disabled || loading ? 1 : 0.95 },
        transition: { type: "spring", stiffness: 400, damping: 17 }
    }

    // Render as link if href is provided
    if (href) {
        return (
            <motion.a
                href={href}
                target={target}
                className={baseClasses}
                {...motionVariants}
                {...props}
            >
                <ButtonContent />
            </motion.a>
        )
    }

    // Render as button
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={baseClasses}
            {...motionVariants}
            {...props}
        >
            <ButtonContent />
        </motion.button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf([
        'primary',
        'secondary',
        'outline',
        'ghost',
        'danger',
        'success',
        'glass'
    ]),
    size: PropTypes.oneOf(['small', 'medium', 'large', 'icon']),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    fullWidth: PropTypes.bool,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    href: PropTypes.string,
    target: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    japanese: PropTypes.string
}

// Icon Button variant
export const IconButton = ({
    icon,
    size = 'icon',
    variant = 'ghost',
    tooltip,
    ...props
}) => {
    return (
        <div className="relative group">
            <Button
                size={size}
                variant={variant}
                icon={icon}
                {...props}
            />
            {tooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-slate-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap shadow-lg">
                        {tooltip}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
                    </div>
                </div>
            )}
        </div>
    )
}

IconButton.propTypes = {
    icon: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'icon']),
    variant: PropTypes.oneOf([
        'primary',
        'secondary',
        'outline',
        'ghost',
        'danger',
        'success',
        'glass'
    ]),
    tooltip: PropTypes.string
}

// Button Group component
export const ButtonGroup = ({ children, spacing = 'gap-2', className = '' }) => {
    return (
        <div className={`flex items-center ${spacing} ${className}`}>
            {children}
        </div>
    )
}

ButtonGroup.propTypes = {
    children: PropTypes.node.isRequired,
    spacing: PropTypes.string,
    className: PropTypes.string
}

// Floating Action Button
export const FloatingButton = ({
    icon,
    onClick,
    position = 'bottom-right',
    variant = 'primary',
    className = '',
    tooltip,
    ...props
}) => {
    const positions = {
        'bottom-right': 'fixed bottom-6 right-6',
        'bottom-left': 'fixed bottom-6 left-6',
        'top-right': 'fixed top-6 right-6',
        'top-left': 'fixed top-6 left-6'
    }

    return (
        <div className={`${positions[position]} z-50`}>
            <div className="relative group">
                <motion.button
                    onClick={onClick}
                    className={`
            w-14 h-14 rounded-full shadow-lg flex items-center justify-center
            ${variant === 'primary' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''}
            ${variant === 'glass' ? 'bg-white/10 backdrop-blur-lg border border-white/20 text-white' : ''}
            ${className}
          `}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    {...props}
                >
                    {icon}
                </motion.button>

                {tooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-slate-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap shadow-lg">
                            {tooltip}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

FloatingButton.propTypes = {
    icon: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    position: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']),
    variant: PropTypes.oneOf(['primary', 'glass']),
    className: PropTypes.string,
    tooltip: PropTypes.string
}

export default Button