// src/components/ui/Modal.jsx
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'

const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    subtitle,
    japanese,
    size = 'medium',
    variant = 'default',
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    className = '',
    overlayClassName = '',
    ...props
}) => {
    // Size variants
    const sizes = {
        small: 'max-w-md',
        medium: 'max-w-2xl',
        large: 'max-w-4xl',
        xlarge: 'max-w-6xl',
        fullscreen: 'max-w-none w-full h-full'
    }

    // Variant styles
    const variants = {
        default: 'bg-slate-800 border-slate-700',
        glass: 'bg-slate-900/90 backdrop-blur-lg border-slate-700/50',
        dark: 'bg-slate-900 border-slate-800',
        gradient: 'bg-gradient-to-br from-slate-800 to-purple-900/20 border-slate-700'
    }

    // Handle ESC key
    useEffect(() => {
        if (!closeOnEsc || !isOpen) return

        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscKey)
        return () => document.removeEventListener('keydown', handleEscKey)
    }, [closeOnEsc, isOpen, onClose])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Handle overlay click
    const handleOverlayClick = (e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleOverlayClick}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className={`
              relative w-full ${sizes[size]} max-h-[90vh] overflow-hidden
              rounded-2xl border shadow-2xl
              ${variants[variant]}
              ${className}
            `}
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        {...props}
                    >
                        {/* Header */}
                        {(title || showCloseButton) && (
                            <div className="flex items-start justify-between p-6 border-b border-slate-700">
                                <div className="flex-1 pr-4">
                                    {title && (
                                        <h2 className="text-xl font-bold text-white mb-1">
                                            {title}
                                        </h2>
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

                                {showCloseButton && (
                                    <motion.button
                                        onClick={onClose}
                                        className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <X size={16} />
                                    </motion.button>
                                )}
                            </div>
                        )}

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    japanese: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'fullscreen']),
    variant: PropTypes.oneOf(['default', 'glass', 'dark', 'gradient']),
    showCloseButton: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    closeOnEsc: PropTypes.bool,
    className: PropTypes.string,
    overlayClassName: PropTypes.string
}

// Confirmation Modal
export const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message,
    japanese,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    loading = false,
    ...props
}) => {
    const variantStyles = {
        danger: {
            icon: AlertTriangle,
            iconColor: 'text-red-400',
            confirmButton: 'bg-gradient-to-r from-red-500 to-pink-500'
        },
        warning: {
            icon: AlertCircle,
            iconColor: 'text-yellow-400',
            confirmButton: 'bg-gradient-to-r from-yellow-500 to-orange-500'
        },
        info: {
            icon: Info,
            iconColor: 'text-blue-400',
            confirmButton: 'bg-gradient-to-r from-blue-500 to-cyan-500'
        },
        success: {
            icon: CheckCircle,
            iconColor: 'text-green-400',
            confirmButton: 'bg-gradient-to-r from-green-500 to-emerald-500'
        }
    }

    const config = variantStyles[variant]
    const Icon = config.icon

    const handleConfirm = async () => {
        if (onConfirm) {
            await onConfirm()
        }
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="small"
            variant="glass"
            {...props}
        >
            <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center ${config.iconColor}`}>
                        <Icon size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                            {title}
                        </h3>
                        {japanese && (
                            <p className="text-purple-400 text-sm font-japanese">
                                {japanese}
                            </p>
                        )}
                    </div>
                </div>

                {message && (
                    <p className="text-gray-300 mb-6 leading-relaxed">
                        {message}
                    </p>
                )}

                <div className="flex space-x-3">
                    <motion.button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                        {cancelText}
                    </motion.button>

                    <motion.button
                        onClick={handleConfirm}
                        disabled={loading}
                        className={`
              flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors duration-200 
              disabled:opacity-50 flex items-center justify-center space-x-2
              ${config.confirmButton}
            `}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                        {loading && (
                            <motion.div
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        )}
                        <span>{confirmText}</span>
                    </motion.button>
                </div>
            </div>
        </Modal>
    )
}

ConfirmModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    japanese: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    variant: PropTypes.oneOf(['danger', 'warning', 'info', 'success']),
    loading: PropTypes.bool
}

// Image Modal
export const ImageModal = ({
    isOpen,
    onClose,
    src,
    alt = '',
    title,
    description,
    japanese,
    ...props
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="xlarge"
            variant="dark"
            className="bg-black/95"
            {...props}
        >
            <div className="relative">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto max-h-[80vh] object-contain"
                />

                {(title || description || japanese) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        {title && (
                            <h3 className="text-xl font-bold text-white mb-2">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="text-gray-300 mb-2">
                                {description}
                            </p>
                        )}
                        {japanese && (
                            <p className="text-purple-400 text-sm font-japanese">
                                {japanese}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    )
}

ImageModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    japanese: PropTypes.string
}

// Drawer Modal (slides from side)
export const DrawerModal = ({
    isOpen,
    onClose,
    children,
    position = 'right',
    size = 'medium',
    title,
    japanese,
    ...props
}) => {
    const positions = {
        left: {
            initial: { x: '-100%' },
            animate: { x: 0 },
            exit: { x: '-100%' }
        },
        right: {
            initial: { x: '100%' },
            animate: { x: 0 },
            exit: { x: '100%' }
        },
        top: {
            initial: { y: '-100%' },
            animate: { y: 0 },
            exit: { y: '-100%' }
        },
        bottom: {
            initial: { y: '100%' },
            animate: { y: 0 },
            exit: { y: '100%' }
        }
    }

    const sizes = {
        small: position === 'left' || position === 'right' ? 'w-80' : 'h-80',
        medium: position === 'left' || position === 'right' ? 'w-96' : 'h-96',
        large: position === 'left' || position === 'right' ? 'w-1/2' : 'h-1/2'
    }

    const positionClasses = {
        left: 'left-0 top-0 h-full',
        right: 'right-0 top-0 h-full',
        top: 'top-0 left-0 w-full',
        bottom: 'bottom-0 left-0 w-full'
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Drawer */}
                    <motion.div
                        className={`
              absolute ${positionClasses[position]} ${sizes[size]}
              bg-slate-800 border-slate-700 shadow-2xl
              ${position === 'left' ? 'border-r' : ''}
              ${position === 'right' ? 'border-l' : ''}
              ${position === 'top' ? 'border-b rounded-b-2xl' : ''}
              ${position === 'bottom' ? 'border-t rounded-t-2xl' : ''}
            `}
                        initial={positions[position].initial}
                        animate={positions[position].animate}
                        exit={positions[position].exit}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        {...props}
                    >
                        {/* Header */}
                        {title && (
                            <div className="flex items-center justify-between p-6 border-b border-slate-700">
                                <div>
                                    <h2 className="text-lg font-bold text-white">
                                        {title}
                                    </h2>
                                    {japanese && (
                                        <p className="text-purple-400 text-sm font-japanese mt-1">
                                            {japanese}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

DrawerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    title: PropTypes.string,
    japanese: PropTypes.string
}

export default Modal