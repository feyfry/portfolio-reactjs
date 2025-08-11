import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const TypeWriter = ({
    text = '',
    speed = 100,
    delay = 0,
    cursorChar = '|',
    cursorBlink = true,
    deleteSpeed = 50,
    deleteDelay = 1000,
    loop = false,
    showCursor = true,
    onComplete,
    onStart,
    className = '',
    japanese,
    multipleTexts = [],
    pauseBetween = 1000,
    randomSpeed = false,
    soundEffect = false,
    ...props
}) => {
    // All useState hooks at the top level
    const [displayText, setDisplayText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isWaiting, setIsWaiting] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)
    const [currentTextIndex, setCurrentTextIndex] = useState(0)

    // Determine current text to type
    const getCurrentText = useCallback(() => {
        if (multipleTexts.length > 0) {
            return multipleTexts[currentTextIndex] || ''
        }
        return text
    }, [multipleTexts, currentTextIndex, text])

    const currentText = getCurrentText()

    // Get random speed for more natural typing
    const getTypingSpeed = useCallback(() => {
        if (randomSpeed) {
            return speed + Math.random() * 50 - 25 // ±25ms variation
        }
        return speed
    }, [speed, randomSpeed])

    // Sound effect function (placeholder)
    const playTypingSound = useCallback(() => {
        if (soundEffect) {
            // Could implement Web Audio API here
            // For now, just a placeholder
        }
    }, [soundEffect])

    // Start typing after delay
    useEffect(() => {
        if (delay > 0 && !hasStarted) {
            const startTimer = setTimeout(() => {
                setHasStarted(true)
                setIsTyping(true)
                if (onStart) onStart()
            }, delay)
            return () => clearTimeout(startTimer)
        } else if (!hasStarted) {
            setHasStarted(true)
            setIsTyping(true)
            if (onStart) onStart()
        }
    }, [delay, hasStarted, onStart])

    // Main typing logic
    useEffect(() => {
        if (!hasStarted || isWaiting) return

        let timer

        if (isTyping && currentIndex < currentText.length) {
            // Typing forward
            timer = setTimeout(() => {
                setDisplayText(currentText.slice(0, currentIndex + 1))
                setCurrentIndex(prev => prev + 1)
                playTypingSound()
            }, getTypingSpeed())
        } else if (isTyping && currentIndex >= currentText.length) {
            // Finished typing current text
            if (multipleTexts.length > 1 || loop) {
                // Start delete process after pause
                timer = setTimeout(() => {
                    setIsTyping(false)
                    setIsDeleting(true)
                }, deleteDelay)
            } else {
                // Single text completed
                setIsTyping(false)
                if (onComplete) onComplete()
            }
        } else if (isDeleting && currentIndex > 0) {
            // Deleting
            timer = setTimeout(() => {
                setDisplayText(currentText.slice(0, currentIndex - 1))
                setCurrentIndex(prev => prev - 1)
            }, deleteSpeed)
        } else if (isDeleting && currentIndex === 0) {
            // Finished deleting, move to next text
            setIsDeleting(false)
            setIsWaiting(true)

            if (multipleTexts.length > 1) {
                setCurrentTextIndex(prev => (prev + 1) % multipleTexts.length)
            }

            timer = setTimeout(() => {
                setIsWaiting(false)
                setIsTyping(true)
            }, pauseBetween)
        }

        return () => clearTimeout(timer)
    }, [
        hasStarted,
        isTyping,
        isDeleting,
        isWaiting,
        currentIndex,
        currentText,
        getTypingSpeed,
        deleteSpeed,
        deleteDelay,
        pauseBetween,
        multipleTexts.length,
        loop,
        onComplete,
        playTypingSound
    ])

    // Cursor blink animation
    const cursorVariants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    }

    return (
        <div className={`inline-block ${className}`} {...props}>
            <div className="flex flex-col">
                {/* Main text */}
                <div className="flex items-center">
                    <span className="font-mono">
                        {displayText}
                    </span>

                    {/* Cursor */}
                    {showCursor && (
                        <motion.span
                            className="inline-block ml-1 font-mono"
                            animate={cursorBlink ? "visible" : "hidden"}
                            variants={cursorVariants}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            {cursorChar}
                        </motion.span>
                    )}
                </div>

                {/* Japanese translation */}
                {japanese && (
                    <motion.div
                        className="text-purple-400 font-japanese text-sm mt-2 opacity-75"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: displayText.length > 0 ? 1 : 0,
                            y: displayText.length > 0 ? 0 : 10
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {japanese}
                    </motion.div>
                )}
            </div>
        </div>
    )
}

TypeWriter.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number,
    delay: PropTypes.number,
    cursor: PropTypes.bool,
    cursorChar: PropTypes.string,
    cursorBlink: PropTypes.bool,
    deleteSpeed: PropTypes.number,
    deleteDelay: PropTypes.number,
    loop: PropTypes.bool,
    showCursor: PropTypes.bool,
    onComplete: PropTypes.func,
    onStart: PropTypes.func,
    className: PropTypes.string,
    japanese: PropTypes.string,
    multipleTexts: PropTypes.arrayOf(PropTypes.string),
    pauseBetween: PropTypes.number,
    randomSpeed: PropTypes.bool,
    soundEffect: PropTypes.bool
}

// Simple typewriter for single use
export const SimpleTypeWriter = ({
    text,
    speed = 100,
    className = '',
    japanese,
    ...props
}) => {
    const [displayText, setDisplayText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayText(text.slice(0, currentIndex + 1))
                setCurrentIndex(prev => prev + 1)
            }, speed)
            return () => clearTimeout(timer)
        }
    }, [currentIndex, text, speed])

    return (
        <div className={className} {...props}>
            <span className="font-mono">{displayText}</span>
            <motion.span
                className="inline-block ml-1 font-mono text-purple-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
            >
                |
            </motion.span>
            {japanese && displayText === text && (
                <motion.div
                    className="text-purple-400 font-japanese text-sm mt-2 opacity-75"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {japanese}
                </motion.div>
            )}
        </div>
    )
}

SimpleTypeWriter.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number,
    className: PropTypes.string,
    japanese: PropTypes.string
}

// Code typewriter with syntax highlighting simulation
export const CodeTypeWriter = ({
    code,
    language = 'javascript',
    speed = 50,
    showLineNumbers = true,
    className = '',
    ...props
}) => {
    const [displayCode, setDisplayCode] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (currentIndex < code.length) {
            const timer = setTimeout(() => {
                setDisplayCode(code.slice(0, currentIndex + 1))
                setCurrentIndex(prev => prev + 1)
            }, speed)
            return () => clearTimeout(timer)
        }
    }, [currentIndex, code, speed])

    const lines = displayCode.split('\n')

    return (
        <div className={`bg-slate-800 rounded-lg p-4 font-mono text-sm ${className}`} {...props}>
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-xs uppercase">{language}</span>
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
            </div>

            <div className="space-y-1">
                {lines.map((line, index) => (
                    <div key={index} className="flex">
                        {showLineNumbers && (
                            <span className="text-gray-500 mr-4 select-none w-8 text-right">
                                {index + 1}
                            </span>
                        )}
                        <span className="text-gray-100 flex-1">
                            {line}
                            {index === lines.length - 1 && (
                                <motion.span
                                    className="inline-block ml-1 bg-purple-400"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    style={{ width: '2px', height: '1em' }}
                                />
                            )}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

CodeTypeWriter.propTypes = {
    code: PropTypes.string.isRequired,
    language: PropTypes.string,
    speed: PropTypes.number,
    showLineNumbers: PropTypes.bool,
    className: PropTypes.string
}

// Terminal typewriter
export const TerminalTypeWriter = ({
    commands = [],
    prompt = '$',
    speed = 80,
    executeDelay = 1000,
    className = '',
    ...props
}) => {
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
    const [displayText, setDisplayText] = useState('')
    const [currentCharIndex, setCurrentCharIndex] = useState(0)
    const [isExecuting, setIsExecuting] = useState(false)
    const [history, setHistory] = useState([])

    const currentCommand = commands[currentCommandIndex]

    useEffect(() => {
        if (!currentCommand) return

        if (currentCharIndex < currentCommand.command.length && !isExecuting) {
            const timer = setTimeout(() => {
                setDisplayText(currentCommand.command.slice(0, currentCharIndex + 1))
                setCurrentCharIndex(prev => prev + 1)
            }, speed)
            return () => clearTimeout(timer)
        } else if (currentCharIndex >= currentCommand.command.length && !isExecuting) {
            // Command fully typed, start execution
            setIsExecuting(true)
            const executeTimer = setTimeout(() => {
                setHistory(prev => [...prev, {
                    command: currentCommand.command,
                    output: currentCommand.output || ''
                }])
                setDisplayText('')
                setCurrentCharIndex(0)
                setIsExecuting(false)
                setCurrentCommandIndex(prev => (prev + 1) % commands.length)
            }, executeDelay)
            return () => clearTimeout(executeTimer)
        }
    }, [currentCharIndex, currentCommand, speed, executeDelay, isExecuting, commands.length])

    return (
        <div className={`bg-black text-green-400 font-mono text-sm p-4 rounded-lg ${className}`} {...props}>
            {/* Command history */}
            {history.map((entry, index) => (
                <div key={index} className="mb-2">
                    <div className="flex">
                        <span className="text-green-400 mr-2">{prompt}</span>
                        <span>{entry.command}</span>
                    </div>
                    {entry.output && (
                        <div className="text-gray-300 ml-4 whitespace-pre-wrap">
                            {entry.output}
                        </div>
                    )}
                </div>
            ))}

            {/* Current command being typed */}
            {currentCommand && (
                <div className="flex">
                    <span className="text-green-400 mr-2">{prompt}</span>
                    <span>{displayText}</span>
                    <motion.span
                        className="inline-block bg-green-400"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{ width: '8px', height: '1em', marginLeft: '2px' }}
                    />
                </div>
            )}
        </div>
    )
}

TerminalTypeWriter.propTypes = {
    commands: PropTypes.arrayOf(PropTypes.shape({
        command: PropTypes.string.isRequired,
        output: PropTypes.string
    })),
    prompt: PropTypes.string,
    speed: PropTypes.number,
    executeDelay: PropTypes.number,
    className: PropTypes.string
}

// Text reveal typewriter (no cursor, just reveal)
export const TextReveal = ({
    text,
    speed = 100,
    delay = 0,
    className = '',
    japanese,
    ...props
}) => {
    const [visibleChars, setVisibleChars] = useState(0)

    useEffect(() => {
        const startTimer = setTimeout(() => {
            const revealTimer = setInterval(() => {
                setVisibleChars(prev => {
                    if (prev >= text.length) {
                        clearInterval(revealTimer)
                        return prev
                    }
                    return prev + 1
                })
            }, speed)
            return () => clearInterval(revealTimer)
        }, delay)

        return () => clearTimeout(startTimer)
    }, [text, speed, delay])

    return (
        <div className={className} {...props}>
            <span className="font-mono">
                {text.split('').map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index < visibleChars ? 1 : 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        {char}
                    </motion.span>
                ))}
            </span>

            {japanese && visibleChars >= text.length && (
                <motion.div
                    className="text-purple-400 font-japanese text-sm mt-2 opacity-75"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    {japanese}
                </motion.div>
            )}
        </div>
    )
}

TextReveal.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number,
    delay: PropTypes.number,
    className: PropTypes.string,
    japanese: PropTypes.string
}

export default TypeWriter