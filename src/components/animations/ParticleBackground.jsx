import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const ParticleBackground = ({
    particleCount = 50,
    particleSize = 2,
    particleColor = '#a855f7',
    speed = 1,
    direction = 'up',
    interactive = false,
    connectLines = false,
    connectionDistance = 100,
    fadeEdges = true,
    autoPlay = true,
    density = 'medium',
    shape = 'circle',
    variant = 'floating',
    className = '',
    style = {},
    ...props
}) => {
    // All state hooks at top level
    const [particles, setParticles] = useState([])
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    const containerRef = useRef(null)
    const animationRef = useRef(null)

    // Density configuration
    const densityConfig = {
        low: 0.5,
        medium: 1,
        high: 1.5,
        ultra: 2
    }

    const actualParticleCount = Math.floor(particleCount * densityConfig[density])

    // Initialize particles
    const createParticle = useCallback((index) => {
        const { width, height } = dimensions
        if (width === 0 || height === 0) return null

        return {
            id: index,
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
            size: particleSize + Math.random() * 2,
            opacity: 0.3 + Math.random() * 0.7,
            color: particleColor,
            angle: Math.random() * Math.PI * 2,
            angularVelocity: (Math.random() - 0.5) * 0.02
        }
    }, [dimensions, speed, particleSize, particleColor])

    // Update container dimensions
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setDimensions({
                    width: rect.width || window.innerWidth,
                    height: rect.height || window.innerHeight
                })
            }
        }

        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    // Initialize particles when dimensions are available
    useEffect(() => {
        if (dimensions.width > 0 && dimensions.height > 0) {
            const newParticles = Array.from({ length: actualParticleCount }, (_, index) =>
                createParticle(index)
            ).filter(Boolean)
            setParticles(newParticles)
        }
    }, [actualParticleCount, createParticle, dimensions])

    // Mouse interaction
    useEffect(() => {
        if (!interactive) return

        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                })
            }
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener('mousemove', handleMouseMove)
            return () => container.removeEventListener('mousemove', handleMouseMove)
        }
    }, [interactive])

    // Animation loop
    useEffect(() => {
        if (!isPlaying || particles.length === 0) return

        const animate = () => {
            setParticles(prevParticles =>
                prevParticles.map(particle => {
                    let { x, y, vx, vy, angle } = particle
                    const { width, height } = dimensions

                    // Update position based on direction
                    switch (direction) {
                        case 'up':
                            y += vy * speed
                            x += vx * speed * 0.3
                            break
                        case 'down':
                            y -= vy * speed
                            x += vx * speed * 0.3
                            break
                        case 'left':
                            x += vx * speed
                            y += vy * speed * 0.3
                            break
                        case 'right':
                            x -= vx * speed
                            y += vy * speed * 0.3
                            break
                        case 'random':
                        default:
                            x += vx * speed
                            y += vy * speed
                            break
                    }

                    // Interactive mouse effect
                    if (interactive) {
                        const dx = mousePosition.x - x
                        const dy = mousePosition.y - y
                        const distance = Math.sqrt(dx * dx + dy * dy)

                        if (distance < 100) {
                            const force = (100 - distance) / 100
                            x -= (dx / distance) * force * 2
                            y -= (dy / distance) * force * 2
                        }
                    }

                    // Update rotation
                    angle += particle.angularVelocity

                    // Boundary handling
                    if (x < 0) x = width
                    if (x > width) x = 0
                    if (y < 0) y = height
                    if (y > height) y = 0

                    return {
                        ...particle,
                        x,
                        y,
                        angle
                    }
                })
            )

            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isPlaying, particles.length, direction, speed, interactive, mousePosition, dimensions])

    // Calculate connections between particles
    const getConnections = useCallback(() => {
        if (!connectLines) return []

        const connections = []
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x
                const dy = particles[i].y - particles[j].y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < connectionDistance) {
                    connections.push({
                        x1: particles[i].x,
                        y1: particles[i].y,
                        x2: particles[j].x,
                        y2: particles[j].y,
                        opacity: 1 - (distance / connectionDistance)
                    })
                }
            }
        }
        return connections
    }, [particles, connectLines, connectionDistance])

    const connections = getConnections()

    // Render particle based on shape
    const renderParticle = (particle) => {
        const baseStyle = {
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            transform: `translate(-50%, -50%) rotate(${particle.angle}rad)`,
            pointerEvents: 'none'
        }

        switch (shape) {
            case 'square':
                return (
                    <div
                        key={particle.id}
                        style={{
                            ...baseStyle,
                            backgroundColor: particle.color,
                            borderRadius: '2px'
                        }}
                    />
                )
            case 'triangle':
                return (
                    <div
                        key={particle.id}
                        style={{
                            ...baseStyle,
                            width: 0,
                            height: 0,
                            borderLeft: `${particle.size / 2}px solid transparent`,
                            borderRight: `${particle.size / 2}px solid transparent`,
                            borderBottom: `${particle.size}px solid ${particle.color}`,
                            backgroundColor: 'transparent'
                        }}
                    />
                )
            case 'star':
                return (
                    <div
                        key={particle.id}
                        style={{
                            ...baseStyle,
                            color: particle.color,
                            fontSize: particle.size,
                            lineHeight: 1
                        }}
                    >
                        ★
                    </div>
                )
            case 'circle':
            default:
                return (
                    <div
                        key={particle.id}
                        style={{
                            ...baseStyle,
                            backgroundColor: particle.color,
                            borderRadius: '50%'
                        }}
                    />
                )
        }
    }

    // Variant-specific rendering
    const renderVariant = () => {
        switch (variant) {
            case 'matrix':
                return (
                    <div className="font-mono text-green-400 text-xs">
                        {particles.map(particle => (
                            <div
                                key={particle.id}
                                style={{
                                    position: 'absolute',
                                    left: particle.x,
                                    top: particle.y,
                                    opacity: particle.opacity,
                                    transform: 'translate(-50%, -50%)',
                                    pointerEvents: 'none'
                                }}
                            >
                                {Math.random() > 0.5 ? '1' : '0'}
                            </div>
                        ))}
                    </div>
                )
            case 'snow':
                return (
                    <div>
                        {particles.map(particle => (
                            <div
                                key={particle.id}
                                style={{
                                    position: 'absolute',
                                    left: particle.x,
                                    top: particle.y,
                                    opacity: particle.opacity,
                                    transform: 'translate(-50%, -50%)',
                                    pointerEvents: 'none',
                                    color: 'white',
                                    fontSize: particle.size * 2
                                }}
                            >
                                ❄
                            </div>
                        ))}
                    </div>
                )
            case 'bubbles':
                return (
                    <div>
                        {particles.map(particle => (
                            <motion.div
                                key={particle.id}
                                style={{
                                    position: 'absolute',
                                    left: particle.x,
                                    top: particle.y,
                                    width: particle.size * 3,
                                    height: particle.size * 3,
                                    borderRadius: '50%',
                                    border: `1px solid ${particle.color}`,
                                    opacity: particle.opacity * 0.5,
                                    transform: 'translate(-50%, -50%)',
                                    pointerEvents: 'none'
                                }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                )
            case 'floating':
            default:
                return (
                    <div>
                        {particles.map(renderParticle)}
                    </div>
                )
        }
    }

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            style={{ ...style }}
            {...props}
        >
            {/* Fade edges effect */}
            {fadeEdges && (
                <>
                    <div
                        className="absolute inset-x-0 top-0 h-20 pointer-events-none z-10"
                        style={{
                            background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.8), transparent)'
                        }}
                    />
                    <div
                        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none z-10"
                        style={{
                            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)'
                        }}
                    />
                    <div
                        className="absolute inset-y-0 left-0 w-20 pointer-events-none z-10"
                        style={{
                            background: 'linear-gradient(to right, rgba(15, 23, 42, 0.8), transparent)'
                        }}
                    />
                    <div
                        className="absolute inset-y-0 right-0 w-20 pointer-events-none z-10"
                        style={{
                            background: 'linear-gradient(to left, rgba(15, 23, 42, 0.8), transparent)'
                        }}
                    />
                </>
            )}

            {/* Connection lines */}
            {connectLines && connections.length > 0 && (
                <svg
                    className="absolute inset-0 pointer-events-none"
                    width="100%"
                    height="100%"
                >
                    {connections.map((connection, index) => (
                        <line
                            key={index}
                            x1={connection.x1}
                            y1={connection.y1}
                            x2={connection.x2}
                            y2={connection.y2}
                            stroke={particleColor}
                            strokeWidth="1"
                            opacity={connection.opacity * 0.3}
                        />
                    ))}
                </svg>
            )}

            {/* Particles */}
            <div className="absolute inset-0">
                {renderVariant()}
            </div>

            {/* Interactive cursor effect */}
            {interactive && (
                <motion.div
                    className="absolute pointer-events-none"
                    style={{
                        left: mousePosition.x,
                        top: mousePosition.y,
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        transform: 'translate(-50%, -50%)'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

            {/* Controls (optional) */}
            {!autoPlay && (
                <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors duration-200"
                    >
                        {isPlaying ? '⏸️' : '▶️'}
                    </button>
                </div>
            )}
        </div>
    )
}

ParticleBackground.propTypes = {
    particleCount: PropTypes.number,
    particleSize: PropTypes.number,
    particleColor: PropTypes.string,
    speed: PropTypes.number,
    direction: PropTypes.oneOf(['up', 'down', 'left', 'right', 'random']),
    interactive: PropTypes.bool,
    connectLines: PropTypes.bool,
    connectionDistance: PropTypes.number,
    fadeEdges: PropTypes.bool,
    autoPlay: PropTypes.bool,
    density: PropTypes.oneOf(['low', 'medium', 'high', 'ultra']),
    shape: PropTypes.oneOf(['circle', 'square', 'triangle', 'star']),
    variant: PropTypes.oneOf(['floating', 'matrix', 'snow', 'bubbles']),
    className: PropTypes.string,
    style: PropTypes.object
}

// Preset particle backgrounds
export const MatrixBackground = ({ className = '', ...props }) => (
    <ParticleBackground
        variant="matrix"
        particleCount={100}
        speed={2}
        direction="down"
        particleColor="#00ff41"
        shape="square"
        className={className}
        {...props}
    />
)

MatrixBackground.propTypes = {
    className: PropTypes.string
}

export const SnowBackground = ({ className = '', ...props }) => (
    <ParticleBackground
        variant="snow"
        particleCount={30}
        speed={0.5}
        direction="down"
        particleColor="#ffffff"
        className={className}
        {...props}
    />
)

SnowBackground.propTypes = {
    className: PropTypes.string
}

export const BubbleBackground = ({ className = '', ...props }) => (
    <ParticleBackground
        variant="bubbles"
        particleCount={20}
        speed={1}
        direction="up"
        particleColor="#a855f7"
        interactive={true}
        className={className}
        {...props}
    />
)

BubbleBackground.propTypes = {
    className: PropTypes.string
}

export const FloatingParticles = ({ className = '', ...props }) => (
    <ParticleBackground
        variant="floating"
        particleCount={50}
        speed={0.8}
        direction="random"
        particleColor="#a855f7"
        connectLines={true}
        interactive={true}
        className={className}
        {...props}
    />
)

FloatingParticles.propTypes = {
    className: PropTypes.string
}

// Japanese-themed particle background
export const JapaneseParticles = ({ className = '', ...props }) => {
    const [particles, setParticles] = useState([])
    const containerRef = useRef(null)

    useEffect(() => {
        const japaneseChars = ['桜', '雪', '星', '月', '花', '雲', '風', '水']
        const newParticles = Array.from({ length: 20 }, (_, index) => ({
            id: index,
            char: japaneseChars[Math.floor(Math.random() * japaneseChars.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5
        }))
        setParticles(newParticles)
    }, [])

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`} {...props}>
            {particles.map(particle => (
                <motion.div
                    key={particle.id}
                    className="absolute text-purple-400/20 font-japanese text-2xl pointer-events-none"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                    animate={{
                        y: [0, -50, 0],
                        opacity: [0.2, 0.6, 0.2],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut"
                    }}
                >
                    {particle.char}
                </motion.div>
            ))}
        </div>
    )
}

JapaneseParticles.propTypes = {
    className: PropTypes.string
}

export default ParticleBackground