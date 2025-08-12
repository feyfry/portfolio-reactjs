import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    CheckCircle,
    AlertCircle,
    Heart,
    Coffee,
    Zap,
    Download
} from 'lucide-react'
import SocialLinks from '../common/SocialLinks'
import personalData from '../../data/personal.json'
import PropTypes from 'prop-types'

// FormField component defined before the main component
const FormField = ({ label, name, type = 'text', required = false, options, children, japanese, formData, handleInputChange }) => (
    <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <label className="flex items-center justify-between text-white font-medium">
            <span>{label}</span>
            {japanese && <span className="text-xs text-purple-400 font-japanese">{japanese}</span>}
            {required && <span className="text-red-400">*</span>}
        </label>
        {children || (
            type === 'select' ? (
                <select
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    required={required}
                    className="w-full bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                >
                    <option value="">Select an option</option>
                    {options && options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            ) : type === 'textarea' ? (
                <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    required={required}
                    rows={5}
                    className="w-full bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300 resize-none"
                    placeholder={`Enter your ${label.toLowerCase()}...`}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    required={required}
                    className="w-full bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                    placeholder={`Enter your ${label.toLowerCase()}...`}
                />
            )
        )}
    </motion.div>
)

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node,
    japanese: PropTypes.string,
    formData: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired
}

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        budget: '',
        timeline: '',
        projectType: ''
    })
    const [formStatus, setFormStatus] = useState({
        isSubmitting: false,
        isSubmitted: false,
        error: null
    })
    const [selectedContactMethod, setSelectedContactMethod] = useState('form')

    const contactMethods = [
        {
            id: 'form',
            label: 'Contact Form',
            icon: MessageSquare,
            japanese: 'お問い合わせフォーム',
            description: 'Send me a detailed message'
        },
        {
            id: 'email',
            label: 'Direct Email',
            icon: Mail,
            japanese: 'メール',
            description: 'Reach out via email'
        },
    ]

    const projectTypes = [
        'Web Development',
        'Mobile App',
        'UI/UX Design',
        'Consultation',
        'Maintenance',
        'Other'
    ]

    const budgetRanges = [
        '$1,000 - $5,000',
        '$5,000 - $10,000',
        '$10,000 - $25,000',
        '$25,000+',
        'To be discussed'
    ]

    const timelineOptions = [
        'ASAP',
        '1-2 weeks',
        '1-2 months',
        '3-6 months',
        'Flexible'
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormStatus({ isSubmitting: true, isSubmitted: false, error: null })

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Here you would integrate with your form handling service
            // e.g., EmailJS, Netlify Forms, or your own backend

            setFormStatus({ isSubmitting: false, isSubmitted: true, error: null })
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                budget: '',
                timeline: '',
                projectType: ''
            })
        } catch (error) {
            setFormStatus({
                isSubmitting: false,
                isSubmitted: false,
                error: 'Failed to send message. Please try again.'
            })
        }
    }

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: personalData.email,
            href: `mailto:${personalData.email}`,
            description: 'Send me an email',
            japanese: 'メールを送る'
        },
        {
            icon: Phone,
            label: 'Phone',
            value: personalData.phone,
            href: `tel:${personalData.phone}`,
            description: 'Give me a call',
            japanese: '電話をかける'
        },
        {
            icon: MapPin,
            label: 'Location',
            value: personalData.location,
            href: '#',
            description: 'Based in Japan',
            japanese: '日本在住'
        }
    ]

    return (
        <section id="contact" className="py-20 bg-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-slate-900/5 opacity-40" />
            </div>

            <div className="container-content relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-lg rounded-full px-6 py-3 border border-slate-700/50 mb-6"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Zap size={20} className="text-purple-400" />
                        <span className="text-purple-400 font-medium">Let's Connect</span>
                        <span className="text-purple-400 font-japanese text-sm">連絡しましょう</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Get In <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Touch</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Ready to bring your ideas to life? I'd love to hear about your project and discuss how we can work together.
                    </p>
                    <p className="text-sm text-purple-400 font-japanese mt-2">
                        あなたのアイデアを実現しましょう
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column - Contact Info & Quick Actions */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {/* Contact Methods */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white mb-6">
                                How to Reach Me
                                <span className="block text-sm text-purple-400 font-japanese mt-1">
                                    連絡方法
                                </span>
                            </h3>

                            {contactInfo.map((contact, index) => {
                                const Icon = contact.icon
                                return (
                                    <motion.a
                                        key={contact.label}
                                        href={contact.href}
                                        className="group flex items-center space-x-4 p-4 bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                            <Icon size={20} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white font-medium group-hover:text-purple-400 transition-colors duration-300">
                                                {contact.label}
                                            </h4>
                                            <p className="text-gray-400 text-sm">{contact.description}</p>
                                            <p className="text-purple-400 text-xs font-japanese">{contact.japanese}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-medium">{contact.value}</p>
                                        </div>
                                    </motion.a>
                                )
                            })}
                        </div>

                        {/* Quick Stats */}
                        <motion.div
                            className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-white font-semibold mb-4 text-center">
                                Response Time
                                <span className="block text-sm text-purple-400 font-japanese mt-1">
                                    レスポンス時間
                                </span>
                            </h4>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-green-400 mb-1">1hr</div>
                                    <div className="text-xs text-gray-400">Email</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-400 mb-1">24hr</div>
                                    <div className="text-xs text-gray-400">Consultation</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-purple-400 mb-1">48hr</div>
                                    <div className="text-xs text-gray-400">Proposal</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-white font-semibold mb-4">
                                Connect on Social Media
                                <span className="block text-sm text-purple-400 font-japanese mt-1">
                                    ソーシャルメディア
                                </span>
                            </h4>
                            <SocialLinks size="large" />
                        </motion.div>

                        {/* Download Resume */}
                        <motion.a
                            href={personalData.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-slate-700 to-slate-600 text-white py-4 rounded-xl font-semibold hover:from-slate-600 hover:to-slate-500 transition-all duration-300 border border-slate-600"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Download size={20} />
                            <span>Download Resume</span>
                            <span className="text-sm font-japanese">履歴書</span>
                        </motion.a>
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {/* Contact Method Selector */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {contactMethods.map((method) => {
                                const Icon = method.icon
                                return (
                                    <motion.button
                                        key={method.id}
                                        onClick={() => setSelectedContactMethod(method.id)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedContactMethod === method.id
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                            : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50 hover:text-white'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon size={16} />
                                        <span>{method.label}</span>
                                    </motion.button>
                                )
                            })}
                        </div>

                        {/* Contact Form */}
                        <AnimatePresence mode="wait">
                            {selectedContactMethod === 'form' && (
                                <motion.div
                                    key="form"
                                    className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormField
                                                label="Name"
                                                name="name"
                                                required
                                                japanese="お名前"
                                                formData={formData}
                                                handleInputChange={handleInputChange}
                                            />
                                            <FormField
                                                label="Email"
                                                name="email"
                                                type="email"
                                                required
                                                japanese="メールアドレス"
                                                formData={formData}
                                                handleInputChange={handleInputChange}
                                            />
                                        </div>

                                        <FormField
                                            label="Subject"
                                            name="subject"
                                            required
                                            japanese="件名"
                                            formData={formData}
                                            handleInputChange={handleInputChange}
                                        />

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormField
                                                label="Project Type"
                                                name="projectType"
                                                type="select"
                                                options={projectTypes}
                                                japanese="プロジェクトタイプ"
                                                formData={formData}
                                                handleInputChange={handleInputChange}
                                            />
                                            <FormField
                                                label="Budget Range"
                                                name="budget"
                                                type="select"
                                                options={budgetRanges}
                                                japanese="予算"
                                                formData={formData}
                                                handleInputChange={handleInputChange}
                                            />
                                        </div>

                                        <FormField
                                            label="Timeline"
                                            name="timeline"
                                            type="select"
                                            options={timelineOptions}
                                            japanese="スケジュール"
                                            formData={formData}
                                            handleInputChange={handleInputChange}
                                        />

                                        <FormField
                                            label="Message"
                                            name="message"
                                            type="textarea"
                                            required
                                            japanese="メッセージ"
                                            formData={formData}
                                            handleInputChange={handleInputChange}
                                        />

                                        {/* Form Status */}
                                        <AnimatePresence>
                                            {formStatus.error && (
                                                <motion.div
                                                    className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                >
                                                    <AlertCircle size={16} />
                                                    <span>{formStatus.error}</span>
                                                </motion.div>
                                            )}

                                            {formStatus.isSubmitted && (
                                                <motion.div
                                                    className="flex items-center space-x-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-3"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                >
                                                    <CheckCircle size={16} />
                                                    <span>Message sent successfully! I'll get back to you soon.</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Submit Button */}
                                        <motion.button
                                            type="submit"
                                            disabled={formStatus.isSubmitting}
                                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                            whileHover={{ scale: formStatus.isSubmitting ? 1 : 1.02 }}
                                            whileTap={{ scale: formStatus.isSubmitting ? 1 : 0.98 }}
                                        >
                                            {formStatus.isSubmitting ? (
                                                <>
                                                    <motion.div
                                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    />
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={20} />
                                                    <span>Send Message</span>
                                                    <span className="font-japanese">送信</span>
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                </motion.div>
                            )}

                            {selectedContactMethod === 'email' && (
                                <motion.div
                                    key="email"
                                    className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Mail size={48} className="text-purple-400 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold text-white mb-4">Send Direct Email</h3>
                                    <p className="text-gray-400 mb-6">
                                        Prefer to use your own email client? Click below to compose an email directly.
                                    </p>
                                    <motion.a
                                        href={`mailto:${personalData.email}?subject=Project Inquiry&body=Hi, I'd like to discuss a project with you.`}
                                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Mail size={20} />
                                        <span>Open Email Client</span>
                                    </motion.a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16 bg-slate-800/20 backdrop-blur-lg rounded-2xl p-12 border border-slate-700/30"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Coffee size={24} className="text-purple-400" />
                        <Heart size={24} className="text-red-400" />
                        <Coffee size={24} className="text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Let's Grab a Virtual Tea!
                    </h3>
                    <p className="text-gray-400 text-lg mb-6">
                        I believe the best projects start with great conversations.
                        Whether it's a quick chat or a detailed project discussion, I'm here to help.
                    </p>
                    <p className="text-purple-400 font-japanese">
                        一緒にプロジェクトを成功させましょう！
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact