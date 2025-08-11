import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PropTypes from 'prop-types'
import {
    Briefcase,
    GraduationCap,
    MapPin,
    Calendar,
    Award,
    TrendingUp,
    Users,
    Star,
    ChevronDown,
    Building,
    BookOpen,
    Trophy,
    Target,
    Zap
} from 'lucide-react'
import experienceData from '../../data/experience.json'

// ✅ Extract TimelineItem as separate component with PropTypes
const TimelineItem = ({
    item,
    index,
    type,
    isExpanded,
    isActive,
    onItemClick,
    formatDate,
    calculateDuration
}) => {
    const isWork = type === 'work'

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            {/* Timeline Line */}
            <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 opacity-30" />

            {/* Timeline Dot */}
            <motion.div
                className={`absolute left-4 top-8 w-4 h-4 rounded-full border-2 ${isActive
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-white shadow-lg'
                    : 'bg-slate-800 border-slate-600'
                    } transition-all duration-300`}
                whileHover={{ scale: 1.2 }}
            />

            {/* Content Card */}
            <motion.div
                className={`ml-12 mb-8 bg-slate-800/50 backdrop-blur-lg rounded-2xl border transition-all duration-300 cursor-pointer ${isActive
                    ? 'border-purple-500/50 shadow-xl shadow-purple-500/10'
                    : 'border-slate-700/50 hover:border-slate-600/50'
                    }`}
                onClick={onItemClick}
                whileHover={{ scale: 1.02, y: -2 }}
                layout
            >
                {/* Header */}
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">
                                {isWork ? item.position : item.degree}
                            </h3>
                            <div className="flex items-center space-x-2 text-purple-400 font-medium mb-2">
                                <Building size={16} />
                                <span>{isWork ? item.company : item.institution}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center space-x-1">
                                    <MapPin size={14} />
                                    <span>{item.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Calendar size={14} />
                                    <span>
                                        {formatDate(item.startDate)} - {formatDate(item.endDate)}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <TrendingUp size={14} />
                                    <span>{calculateDuration(item.startDate, item.endDate)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex flex-col items-end space-y-2">
                            {item.endDate === 'Present' && (
                                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30">
                                    Current
                                </span>
                            )}
                            {item.gpa && (
                                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                                    GPA: {item.gpa}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        {item.description}
                    </p>

                    {/* Technologies/Courses */}
                    {item.technologies && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {item.technologies.map((tech, techIndex) => (
                                <span
                                    key={techIndex}
                                    className="bg-slate-700/50 text-purple-400 px-2 py-1 rounded text-xs font-medium border border-slate-600/50"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Expand Button */}
                    <motion.button
                        className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                    >
                        <span className="text-sm">
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </span>
                        <ChevronDown size={16} />
                    </motion.button>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            className="border-t border-slate-700/50 p-6"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Achievements */}
                            {item.achievements && (
                                <div className="mb-6">
                                    <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                                        <Trophy size={16} className="text-yellow-400" />
                                        <span>Key Achievements</span>
                                    </h4>
                                    <ul className="space-y-2">
                                        {item.achievements.map((achievement, achievementIndex) => (
                                            <motion.li
                                                key={achievementIndex}
                                                className="flex items-start space-x-2 text-gray-300"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: achievementIndex * 0.1 }}
                                            >
                                                <Star size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                                                <span>{achievement}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Relevant Courses */}
                            {item.relevant_courses && (
                                <div>
                                    <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                                        <BookOpen size={16} className="text-blue-400" />
                                        <span>Relevant Coursework</span>
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {item.relevant_courses.map((course, courseIndex) => (
                                            <motion.div
                                                key={courseIndex}
                                                className="bg-slate-700/30 rounded-lg p-2 text-sm text-gray-300"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: courseIndex * 0.05 }}
                                            >
                                                {course}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}

TimelineItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        position: PropTypes.string,
        degree: PropTypes.string,
        company: PropTypes.string,
        institution: PropTypes.string,
        location: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        technologies: PropTypes.arrayOf(PropTypes.string),
        achievements: PropTypes.arrayOf(PropTypes.string),
        relevant_courses: PropTypes.arrayOf(PropTypes.string),
        gpa: PropTypes.string
    }).isRequired,
    index: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['work', 'education']).isRequired,
    isExpanded: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func.isRequired,
    formatDate: PropTypes.func.isRequired,
    calculateDuration: PropTypes.func.isRequired
}

// ✅ Fixed StatCard component - using the icon prop correctly
const StatCard = ({ icon: IconComponent, label, value, color, japanese }) => (
    <motion.div
        className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 text-center"
        whileHover={{ scale: 1.05, y: -2 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
    >
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
            <IconComponent size={24} className="text-white" />
        </div>
        <div className="text-2xl font-bold text-white mb-2">{value}</div>
        <div className="text-gray-400 font-medium">{label}</div>
        <div className="text-xs text-purple-400 font-japanese">{japanese}</div>
    </motion.div>
)

StatCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    japanese: PropTypes.string.isRequired
}

const Experience = () => {
    const [activeTab, setActiveTab] = useState('work')
    const [expandedItem, setExpandedItem] = useState(null)
    const [selectedExperience, setSelectedExperience] = useState(null)

    const tabs = [
        {
            id: 'work',
            label: 'Work Experience',
            icon: Briefcase,
            japanese: '職歴',
            data: experienceData.work
        },
        {
            id: 'education',
            label: 'Education',
            icon: GraduationCap,
            japanese: '学歴',
            data: experienceData.education
        }
    ]

    const formatDate = (dateString) => {
        if (dateString === 'Present') return 'Present'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        })
    }

    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = endDate === 'Present' ? new Date() : new Date(endDate)
        const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth())

        if (diffInMonths < 12) {
            return `${diffInMonths} months`
        } else {
            const years = Math.floor(diffInMonths / 12)
            const months = diffInMonths % 12
            return months > 0 ? `${years} yr ${months} mo` : `${years} yr`
        }
    }

    const handleItemClick = (item) => {
        const itemKey = `${activeTab}-${item.id}`
        const isCurrentlyExpanded = expandedItem === itemKey
        const isCurrentlyActive = selectedExperience?.id === item.id

        setSelectedExperience(isCurrentlyActive ? null : item)
        setExpandedItem(isCurrentlyExpanded ? null : itemKey)
    }

    return (
        <section id="experience" className="py-20 bg-slate-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
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
                        <Target size={20} className="text-purple-400" />
                        <span className="text-purple-400 font-medium">Professional Journey</span>
                        <span className="text-purple-400 font-japanese text-sm">キャリア</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Experience & <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Education</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        My professional journey, educational background, and the milestones that shaped my career
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <StatCard
                        icon={Briefcase}
                        label="Experience"
                        value="3+ Years"
                        color="from-blue-500 to-cyan-500"
                        japanese="経験年数"
                    />
                    <StatCard
                        icon={Building}
                        label="Companies"
                        value="2+"
                        color="from-green-500 to-emerald-500"
                        japanese="会社数"
                    />
                    <StatCard
                        icon={Users}
                        label="Projects Led"
                        value="10+"
                        color="from-purple-500 to-pink-500"
                        japanese="プロジェクト"
                    />
                    <StatCard
                        icon={Award}
                        label="Certifications"
                        value="5+"
                        color="from-orange-500 to-red-500"
                        japanese="認定"
                    />
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    className="flex justify-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-slate-800/50 backdrop-blur-lg rounded-full p-2 border border-slate-700/50">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <motion.button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white'
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
                    </div>
                </motion.div>

                {/* Timeline Content */}
                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {tabs.find(tab => tab.id === activeTab)?.data.map((item, index) => (
                                <TimelineItem
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    type={activeTab}
                                    isExpanded={expandedItem === `${activeTab}-${item.id}`}
                                    isActive={selectedExperience?.id === item.id}
                                    onItemClick={() => handleItemClick(item)}
                                    formatDate={formatDate}
                                    calculateDuration={calculateDuration}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Skills Highlight */}
                <motion.div
                    className="mt-16 bg-slate-800/30 backdrop-blur-lg rounded-2xl p-12 border border-slate-700/50"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Core Competencies
                        </h3>
                        <p className="text-gray-400">
                            Key skills developed throughout my professional journey
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { skill: 'Leadership', level: 85, icon: '👑' },
                            { skill: 'Problem Solving', level: 95, icon: '🧩' },
                            { skill: 'Communication', level: 90, icon: '💬' },
                            { skill: 'Innovation', level: 88, icon: '💡' }
                        ].map((competency, index) => (
                            <motion.div
                                key={competency.skill}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl mb-3">{competency.icon}</div>
                                <h4 className="text-white font-semibold mb-2">{competency.skill}</h4>
                                <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${competency.level}%` }}
                                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                        viewport={{ once: true }}
                                    />
                                </div>
                                <span className="text-gray-400 text-sm">{competency.level}%</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-300 mb-6 text-lg">
                        Ready to add value to your team?
                    </p>
                    <motion.button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Zap size={20} />
                        <span>Let's Work Together</span>
                        <span className="font-japanese">一緒に働きましょう</span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}

export default Experience