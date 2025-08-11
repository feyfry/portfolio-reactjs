import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
    ExternalLink,
    Github,
    Search,
    Calendar,
    Eye,
    Star,
    Play,
    ChevronRight,
    Layers,
    Zap
} from 'lucide-react'
import projectsData from '../../data/projects.json'

const Projects = () => {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [viewMode, setViewMode] = useState('grid') // grid or list
    const [hoveredProject, setHoveredProject] = useState(null)
    const [selectedProject, setSelectedProject] = useState(null)

    // Combine all projects
    const allProjects = [...projectsData.featured, ...projectsData.other]

    // Get unique categories
    const categories = ['all', ...new Set(allProjects.map(project => project.category.toLowerCase()))]

    // Filter projects
    const filteredProjects = allProjects.filter(project => {
        const matchesCategory = selectedCategory === 'all' ||
            project.category.toLowerCase() === selectedCategory
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))

        return matchesCategory && matchesSearch
    })

    // Category colors
    const categoryColors = {
        'web application': 'from-blue-500 to-cyan-500',
        'mobile app': 'from-green-500 to-emerald-500',
        'desktop app': 'from-purple-500 to-indigo-500',
        'api': 'from-orange-500 to-red-500',
        'library': 'from-pink-500 to-rose-500',
        'tool': 'from-yellow-500 to-amber-500'
    }

    const ProjectCard = ({ project, index }) => {
        const categoryColor = categoryColors[project.category.toLowerCase()] || 'from-gray-500 to-slate-500'
        const isFeatured = projectsData.featured.some(p => p.id === project.id)

        return (
            <motion.div
                className="group relative bg-slate-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
            >
                {/* Featured Badge */}
                {isFeatured && (
                    <div className="absolute top-4 left-4 z-10">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                            <Star size={12} />
                            <span>Featured</span>
                        </div>
                    </div>
                )}

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                    {/* Overlay on Hover */}
                    <AnimatePresence>
                        {hoveredProject === project.id && (
                            <motion.div
                                className="absolute inset-0 bg-slate-900/90 flex items-center justify-center space-x-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:scale-110 transition-transform duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Play size={20} />
                                </motion.a>
                                <motion.a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-slate-700 text-white p-3 rounded-full hover:scale-110 transition-transform duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Github size={20} />
                                </motion.a>
                                <motion.button
                                    onClick={() => setSelectedProject(project)}
                                    className="bg-slate-700 text-white p-3 rounded-full hover:scale-110 transition-transform duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Eye size={20} />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'Completed'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                            {project.status}
                        </span>
                    </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                    {/* Category & Year */}
                    <div className="flex items-center justify-between mb-3">
                        <span className={`inline-block bg-gradient-to-r ${categoryColor} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                            {project.category}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-400 text-sm">
                            <Calendar size={14} />
                            <span>{project.year}</span>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="bg-slate-700/50 text-purple-400 px-2 py-1 rounded text-xs font-medium border border-slate-600/50"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="text-gray-400 text-xs">
                                +{project.technologies.length - 3} more
                            </span>
                        )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                            >
                                <ExternalLink size={18} />
                            </a>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                <Github size={18} />
                            </a>
                        </div>
                        <button
                            onClick={() => setSelectedProject(project)}
                            className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center space-x-1 text-sm"
                        >
                            <span>Details</span>
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </motion.div>
        )
    }

    const ProjectModal = ({ project, onClose }) => {
        if (!project) return null

        return (
            <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent" />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 bg-slate-900/50 backdrop-blur-lg text-white p-2 rounded-full hover:bg-slate-900/70 transition-colors duration-300"
                        >
                            ×
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
                        <p className="text-gray-300 mb-6 text-lg leading-relaxed">{project.description}</p>

                        {/* Technologies */}
                        <div className="mb-6">
                            <h3 className="text-white font-semibold mb-3">Technologies Used</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Project Details */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <h4 className="text-white font-semibold mb-2">Category</h4>
                                <p className="text-gray-400">{project.category}</p>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-2">Year</h4>
                                <p className="text-gray-400">{project.year}</p>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-2">Status</h4>
                                <p className="text-gray-400">{project.status}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                            >
                                <ExternalLink size={18} />
                                <span>View Live Demo</span>
                            </a>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-slate-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-600 transition-all duration-300 flex items-center space-x-2"
                            >
                                <Github size={18} />
                                <span>View Code</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    }

    return (
        <section id="projects" className="py-20 bg-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
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
                        <Layers size={20} className="text-purple-400" />
                        <span className="text-purple-400 font-medium">Portfolio</span>
                        <span className="text-purple-400 font-japanese text-sm">ポートフォリオ</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Featured <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Projects</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        A collection of work that showcases my skills, creativity, and passion for development
                    </p>
                </motion.div>

                {/* Controls */}
                <motion.div
                    className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-full pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                        : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50 hover:text-white'
                                    }`}
                            >
                                {category === 'all' ? 'All' : category.replace(/\b\w/g, l => l.toUpperCase())}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-slate-800/50 backdrop-blur-lg rounded-full p-2 border border-slate-700/50">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${viewMode === 'grid'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Grid View
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${viewMode === 'list'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            List View
                        </button>
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    className={`${viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                            : 'flex flex-col gap-6'
                        } mb-16`}
                    layout
                >
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                viewMode={viewMode}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Projects Found</h3>
                        <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                    </motion.div>
                )}

                {/* CTA Section */}
                <motion.div
                    className="text-center bg-slate-800/30 backdrop-blur-lg rounded-2xl p-12 border border-slate-700/50"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Like What You See?
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        I'm always excited to work on new projects and bring innovative ideas to life.
                        Let's discuss how we can collaborate on your next venture.
                    </p>
                    <motion.button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Zap size={20} />
                        <span>Start a Project</span>
                        <span className="font-japanese">プロジェクトを始める</span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

export default Projects