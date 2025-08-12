import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PropTypes from 'prop-types'
import {
    Code,
    Database,
    Palette,
    Server,
    Smartphone,
    Cloud,
    GitBranch,
    Zap,
    Star,
    Award,
    TrendingUp,
    CheckCircle
} from 'lucide-react'
import skillsData from '../../data/skills.json'

// ✅ Extract SkillBar as separate component with PropTypes
const SkillBar = ({
    skill,
    index,
    isInView,
    hoveredSkill,
    setHoveredSkill,
    getProficiencyLevel
}) => {
    const proficiency = getProficiencyLevel(skill.level)

    return (
        <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: index * 0.1 }}
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
        >
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:bg-slate-800/70">
                {/* Skill Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            {skill.icon ? (
                                <span className="text-xl">{skill.icon}</span>
                            ) : (
                                <Code size={20} className="text-white" />
                            )}
                        </div>
                        <div>
                            <h4 className="text-white font-semibold">{skill.name}</h4>
                            <p className={`text-sm ${proficiency.color} font-medium`}>
                                {proficiency.label}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-white">{skill.level}%</span>
                        <p className="text-xs text-purple-400 font-japanese">
                            {proficiency.japanese}
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                        >
                            <div className="absolute right-0 top-0 w-2 h-full bg-white/30 blur-sm" />
                        </motion.div>
                    </div>

                    {/* Glow effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"
                        style={{ width: `${skill.level}%` }}
                    />
                </div>

                {/* Hover details */}
                {hoveredSkill === skill.name && (
                    <motion.div
                        className="absolute -top-2 -right-2 bg-slate-900 border border-purple-500/50 rounded-lg p-3 shadow-xl z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center space-x-2">
                            <TrendingUp size={16} className="text-purple-400" />
                            <span className="text-sm text-white font-medium">
                                {skill.level >= 85 ? 'Mastery Level' : 'Growing'}
                            </span>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

SkillBar.propTypes = {
    skill: PropTypes.shape({
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        icon: PropTypes.string
    }).isRequired,
    index: PropTypes.number.isRequired,
    isInView: PropTypes.bool.isRequired,
    hoveredSkill: PropTypes.string,
    setHoveredSkill: PropTypes.func.isRequired,
    getProficiencyLevel: PropTypes.func.isRequired
}

const Skills = () => {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [hoveredSkill, setHoveredSkill] = useState(null)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    // Skill categories with icons and colors
    const skillCategories = {
        all: { icon: Star, label: 'All Skills', color: 'from-purple-500 to-pink-500', japanese: 'すべて' },
        frontend: { icon: Code, label: 'Frontend', color: 'from-blue-500 to-cyan-500', japanese: 'フロントエンド' },
        backend: { icon: Server, label: 'Backend', color: 'from-green-500 to-emerald-500', japanese: 'バックエンド' },
        database: { icon: Database, label: 'Database', color: 'from-orange-500 to-red-500', japanese: 'データベース' },
        mobile: { icon: Smartphone, label: 'Mobile', color: 'from-purple-500 to-indigo-500', japanese: 'モバイル' },
        design: { icon: Palette, label: 'Design', color: 'from-pink-500 to-rose-500', japanese: 'デザイン' },
        devops: { icon: Cloud, label: 'DevOps', color: 'from-gray-600 to-slate-600', japanese: 'DevOps' },
        tools: { icon: GitBranch, label: 'Tools', color: 'from-yellow-500 to-amber-500', japanese: 'ツール' }
    }

    // Filter skills based on selected category
    const getFilteredSkills = () => {
        if (selectedCategory === 'all') {
            return skillsData.technical.flatMap(category =>
                category.skills.map(skill => ({
                    ...skill,
                    category: category.category.toLowerCase()
                }))
            )
        }

        const categoryData = skillsData.technical.find(
            cat => cat.category.toLowerCase() === selectedCategory
        )

        return categoryData ? categoryData.skills.map(skill => ({
            ...skill,
            category: selectedCategory
        })) : []
    }

    const filteredSkills = getFilteredSkills()

    // Skill proficiency levels
    const getProficiencyLevel = (level) => {
        if (level >= 90) return { label: 'Expert', color: 'text-green-400', japanese: 'エキスパート' }
        if (level >= 75) return { label: 'Advanced', color: 'text-blue-400', japanese: '上級' }
        if (level >= 60) return { label: 'Intermediate', color: 'text-yellow-400', japanese: '中級' }
        return { label: 'Beginner', color: 'text-orange-400', japanese: '初級' }
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
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

    return (
        <section id="skills" className="py-20 bg-slate-900 relative overflow-hidden" ref={ref}>
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
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
                        <span className="text-purple-400 font-medium">Skills & Expertise</span>
                        <span className="text-purple-400 font-japanese text-sm">スキル</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Technical <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Arsenal</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Technologies and tools I use to bring ideas to life with precision and creativity
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {Object.entries(skillCategories).map(([key, category]) => {
                        const Icon = category.icon
                        return (
                            <motion.button
                                key={key}
                                onClick={() => setSelectedCategory(key)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border ${selectedCategory === key
                                    ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg`
                                    : 'bg-slate-800/50 text-gray-400 border-slate-700/50 hover:bg-slate-700/50 hover:text-white hover:border-slate-600'
                                    }`}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Icon size={18} />
                                <span>{category.label}</span>
                                <span className="text-xs font-japanese">({category.japanese})</span>
                            </motion.button>
                        )
                    })}
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    key={selectedCategory}
                >
                    {filteredSkills.map((skill, index) => (
                        <SkillBar
                            key={`${skill.name}-${selectedCategory}`}
                            skill={skill}
                            index={index}
                            isInView={isInView}
                            hoveredSkill={hoveredSkill}
                            setHoveredSkill={setHoveredSkill}
                            getProficiencyLevel={getProficiencyLevel}
                        />
                    ))}
                </motion.div>

                {/* Soft Skills */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-white mb-8">
                        Soft Skills
                        <span className="block text-sm text-purple-400 font-japanese mt-1">
                            ソフトスキル
                        </span>
                    </h3>

                    <div className="flex flex-wrap justify-center gap-4">
                        {skillsData.soft.map((skill, index) => (
                            <motion.div
                                key={skill}
                                className="group relative bg-slate-800/50 backdrop-blur-lg rounded-full px-6 py-3 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -2 }}
                            >
                                <div className="flex items-center space-x-2">
                                    <CheckCircle size={16} className="text-purple-400" />
                                    <span className="text-white font-medium">{skill}</span>
                                </div>

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Skills Summary */}
                <motion.div
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {[
                        { icon: Code, label: 'Languages', count: '8+', japanese: '言語' },
                        { icon: Database, label: 'Frameworks', count: '12+', japanese: 'フレームワーク' },
                        { icon: Cloud, label: 'Tools', count: '15+', japanese: 'ツール' },
                        { icon: Award, label: 'Certifications', count: '5+', japanese: '認定' }
                    ].map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <motion.div
                                key={stat.label}
                                className="text-center bg-slate-800/30 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Icon size={24} className="text-white" />
                                </div>
                                <div className="text-2xl font-bold text-white mb-2">{stat.count}</div>
                                <div className="text-gray-400 font-medium">{stat.label}</div>
                                <div className="text-xs text-purple-400 font-japanese">{stat.japanese}</div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}

export default Skills