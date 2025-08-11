import {
    useState,
    useEffect,
    useRef,
    useCallback
} from 'react'

/**
 * Custom hook for typewriter/typing effect
 * @param {string|Array} text - Text to type or array of texts
 * @param {Object} options - Configuration options
 * @returns {Object} - Typing state and controls
 */
export const useTypingEffect = (text, options = {}) => {
    const {
        speed = 100,
            deleteSpeed = 50,
            delayBetweenTexts = 1000,
            deleteDelay = 1000,
            loop = false,
            startDelay = 0,
            cursor = true,
            cursorChar = '|',
            cursorBlinkSpeed = 500,
            randomSpeed = false,
            onComplete,
            onStart,
            onTextComplete,
            onTextStart
    } = options

    // All useState hooks at top level
    const [displayText, setDisplayText] = useState('')
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isWaiting, setIsWaiting] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [showCursor, setShowCursor] = useState(cursor)

    // Refs for cleanup
    const timeoutRef = useRef(null)
    const cursorIntervalRef = useRef(null)

    // Normalize text to array
    const textArray = Array.isArray(text) ? text : [text]
    const currentText = textArray[currentTextIndex] || ''

    // Get typing speed with randomness
    const getTypingSpeed = useCallback(() => {
        if (randomSpeed) {
            const variance = speed * 0.3 // 30% variance
            return speed + (Math.random() - 0.5) * variance
        }
        return speed
    }, [speed, randomSpeed])

    // Start typing after initial delay
    useEffect(() => {
        if (!hasStarted && startDelay > 0) {
            timeoutRef.current = setTimeout(() => {
                setHasStarted(true)
                setIsTyping(true)
                onStart?.()
            }, startDelay)
        } else if (!hasStarted) {
            setHasStarted(true)
            setIsTyping(true)
            onStart?.()
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [hasStarted, startDelay, onStart])

    // Main typing logic
    useEffect(() => {
        if (!hasStarted || isWaiting || isComplete) return

        const currentDisplayLength = displayText.length
        const targetText = currentText

        if (isTyping && currentDisplayLength < targetText.length) {
            // Continue typing
            timeoutRef.current = setTimeout(() => {
                setDisplayText(targetText.slice(0, currentDisplayLength + 1))
            }, getTypingSpeed())
        } else if (isTyping && currentDisplayLength >= targetText.length) {
            // Finished typing current text
            onTextComplete?.(targetText, currentTextIndex)

            if (textArray.length > 1 || loop) {
                // Start delete process after delay
                setIsWaiting(true)
                timeoutRef.current = setTimeout(() => {
                    setIsWaiting(false)
                    setIsTyping(false)
                    setIsDeleting(true)
                }, deleteDelay)
            } else {
                // Single text completed
                setIsTyping(false)
                setIsComplete(true)
                onComplete?.()
            }
        } else if (isDeleting && currentDisplayLength > 0) {
            // Continue deleting
            timeoutRef.current = setTimeout(() => {
                setDisplayText(targetText.slice(0, currentDisplayLength - 1))
            }, deleteSpeed)
        } else if (isDeleting && currentDisplayLength === 0) {
            // Finished deleting, move to next text
            setIsDeleting(false)
            setIsWaiting(true)

            const nextIndex = (currentTextIndex + 1) % textArray.length

            // Check if we should stop (no loop and reached end)
            if (!loop && nextIndex === 0 && currentTextIndex === textArray.length - 1) {
                setIsComplete(true)
                onComplete?.()
                return
            }

            setCurrentTextIndex(nextIndex)
            onTextStart?.(textArray[nextIndex], nextIndex)

            timeoutRef.current = setTimeout(() => {
                setIsWaiting(false)
                setIsTyping(true)
            }, delayBetweenTexts)
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [
        hasStarted,
        isTyping,
        isDeleting,
        isWaiting,
        isComplete,
        displayText,
        currentText,
        currentTextIndex,
        textArray,
        loop,
        getTypingSpeed,
        deleteSpeed,
        deleteDelay,
        delayBetweenTexts,
        onComplete,
        onTextComplete,
        onTextStart
    ])

    // Cursor blinking effect
    useEffect(() => {
        if (!cursor) return

        cursorIntervalRef.current = setInterval(() => {
            setShowCursor(prev => !prev)
        }, cursorBlinkSpeed)

        return () => {
            if (cursorIntervalRef.current) {
                clearInterval(cursorIntervalRef.current)
            }
        }
    }, [cursor, cursorBlinkSpeed])

    // Control functions
    const pause = useCallback(() => {
        setIsWaiting(true)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    const resume = useCallback(() => {
        setIsWaiting(false)
    }, [])

    const reset = useCallback(() => {
        setDisplayText('')
        setCurrentTextIndex(0)
        setIsTyping(false)
        setIsDeleting(false)
        setIsWaiting(false)
        setHasStarted(false)
        setIsComplete(false)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    const skip = useCallback(() => {
        if (isTyping) {
            setDisplayText(currentText)
            setIsTyping(false)
        } else if (isDeleting) {
            setDisplayText('')
            setIsDeleting(false)
        }
    }, [isTyping, isDeleting, currentText])

    return {
        displayText,
        currentTextIndex,
        isTyping,
        isDeleting,
        isWaiting,
        isComplete,
        cursor: showCursor ? cursorChar : '',
        controls: {
            pause,
            resume,
            reset,
            skip
        }
    }
}

/**
 * Simple typing effect hook for single text
 * @param {string} text - Text to type
 * @param {Object} options - Configuration options
 * @returns {Object} - Typing state
 */
export const useSimpleTyping = (text, options = {}) => {
    const {
        speed = 100, startDelay = 0, onComplete
    } = options
    const [displayText, setDisplayText] = useState('')
    const [isComplete, setIsComplete] = useState(false)
    const indexRef = useRef(0)
    const timeoutRef = useRef(null)

    useEffect(() => {
        const startTyping = () => {
            if (indexRef.current < text.length) {
                setDisplayText(text.slice(0, indexRef.current + 1))
                indexRef.current += 1
                timeoutRef.current = setTimeout(startTyping, speed)
            } else {
                setIsComplete(true)
                onComplete?.()
            }
        }

        const initialTimeout = setTimeout(startTyping, startDelay)

        return () => {
            clearTimeout(initialTimeout)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [text, speed, startDelay, onComplete])

    return {
        displayText,
        isComplete
    }
}

/**
 * Hook for character-by-character reveal effect
 * @param {string} text - Text to reveal
 * @param {Object} options - Configuration options
 * @returns {Object} - Reveal state
 */
export const useTextReveal = (text, options = {}) => {
    const {
        speed = 50,
            startDelay = 0,
            direction = 'forward', // 'forward' or 'random'
            onComplete
    } = options

    const [revealedIndices, setRevealedIndices] = useState(new Set())
    const [isComplete, setIsComplete] = useState(false)
    const timeoutRef = useRef(null)

    useEffect(() => {
        if (text.length === 0) return

        const characters = text.split('')
        let indices = [...Array(characters.length).keys()]

        if (direction === 'random') {
            // Shuffle indices for random reveal
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]]
            }
        }

        let currentIndex = 0

        const revealNext = () => {
            if (currentIndex < indices.length) {
                setRevealedIndices(prev => new Set([...prev, indices[currentIndex]]))
                currentIndex += 1
                timeoutRef.current = setTimeout(revealNext, speed)
            } else {
                setIsComplete(true)
                onComplete?.()
            }
        }

        const startTimeout = setTimeout(revealNext, startDelay)

        return () => {
            clearTimeout(startTimeout)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [text, speed, startDelay, direction, onComplete])

    const displayText = text
        .split('')
        .map((char, index) => ({
            char,
            isVisible: revealedIndices.has(index),
            index
        }))

    return {
        displayText,
        isComplete,
        revealedCount: revealedIndices.size
    }
}

/**
 * Hook for word-by-word typing effect
 * @param {string} text - Text to type
 * @param {Object} options - Configuration options
 * @returns {Object} - Word typing state
 */
export const useWordTyping = (text, options = {}) => {
    const {
        speed = 300,
            startDelay = 0,
            preserveSpaces = true,
            onComplete
    } = options

    const [displayedWords, setDisplayedWords] = useState([])
    const [isComplete, setIsComplete] = useState(false)
    const timeoutRef = useRef(null)

    useEffect(() => {
        const words = text.split(' ')
        let currentWordIndex = 0

        const typeNextWord = () => {
            if (currentWordIndex < words.length) {
                setDisplayedWords(words.slice(0, currentWordIndex + 1))
                currentWordIndex += 1
                timeoutRef.current = setTimeout(typeNextWord, speed)
            } else {
                setIsComplete(true)
                onComplete?.()
            }
        }

        const startTimeout = setTimeout(typeNextWord, startDelay)

        return () => {
            clearTimeout(startTimeout)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [text, speed, startDelay, onComplete])

    const displayText = preserveSpaces ?
        displayedWords.join(' ') :
        displayedWords.join('')

    return {
        displayText,
        displayedWords,
        isComplete
    }
}

/**
 * Hook for scrambled text effect (like hacker/matrix style)
 * @param {string} finalText - Final text to reveal
 * @param {Object} options - Configuration options
 * @returns {Object} - Scramble effect state
 */
export const useScrambleText = (finalText, options = {}) => {
    const {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*',
            speed = 50,
            scrambleTime = 1000,
            revealDelay = 100,
            startDelay = 0,
            onComplete
    } = options

    const [displayText, setDisplayText] = useState('')
    const [isComplete, setIsComplete] = useState(false)
    const [revealedIndex, setRevealedIndex] = useState(-1)
    const intervalRef = useRef(null)
    const timeoutRef = useRef(null)

    useEffect(() => {
        if (!finalText) return

        const startScramble = () => {
            // Initial scramble phase
            intervalRef.current = setInterval(() => {
                const scrambled = finalText
                    .split('')
                    .map((char, index) => {
                        if (index <= revealedIndex) {
                            return char // Already revealed
                        }
                        if (char === ' ') {
                            return ' ' // Preserve spaces
                        }
                        return characters[Math.floor(Math.random() * characters.length)]
                    })
                    .join('')

                setDisplayText(scrambled)
            }, speed)

            // Start revealing characters
            let currentRevealIndex = -1
            const revealNext = () => {
                currentRevealIndex += 1
                setRevealedIndex(currentRevealIndex)

                if (currentRevealIndex >= finalText.length - 1) {
                    clearInterval(intervalRef.current)
                    setDisplayText(finalText)
                    setIsComplete(true)
                    onComplete?.()
                } else {
                    timeoutRef.current = setTimeout(revealNext, revealDelay)
                }
            }

            setTimeout(revealNext, scrambleTime)
        }

        const initialTimeout = setTimeout(startScramble, startDelay)

        return () => {
            clearTimeout(initialTimeout)
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [
        finalText,
        characters,
        speed,
        scrambleTime,
        revealDelay,
        startDelay,
        revealedIndex,
        onComplete
    ])

    return {
        displayText,
        isComplete,
        revealedIndex
    }
}

/**
 * Hook for typewriter effect with multiple lines
 * @param {Array} lines - Array of text lines
 * @param {Object} options - Configuration options
 * @returns {Object} - Multi-line typing state
 */
export const useMultiLineTyping = (lines, options = {}) => {
    const {
        speed = 100,
            lineDelay = 500,
            startDelay = 0,
            onLineComplete,
            onComplete
    } = options

    const [displayedLines, setDisplayedLines] = useState([])
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [currentCharIndex, setCurrentCharIndex] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const timeoutRef = useRef(null)

    useEffect(() => {
        if (!lines || lines.length === 0) return

        const typeNextCharacter = () => {
            const currentLine = lines[currentLineIndex]

            if (currentCharIndex < currentLine.length) {
                // Continue typing current line
                setDisplayedLines(prev => {
                    const newLines = [...prev]
                    newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1)
                    return newLines
                })
                setCurrentCharIndex(prev => prev + 1)
                timeoutRef.current = setTimeout(typeNextCharacter, speed)
            } else {
                // Finished current line
                onLineComplete?.(currentLine, currentLineIndex)

                if (currentLineIndex < lines.length - 1) {
                    // Move to next line
                    setCurrentLineIndex(prev => prev + 1)
                    setCurrentCharIndex(0)
                    setDisplayedLines(prev => [...prev, '']) // Add empty line
                    timeoutRef.current = setTimeout(typeNextCharacter, lineDelay)
                } else {
                    // All lines completed
                    setIsComplete(true)
                    onComplete?.()
                }
            }
        }

        const startTimeout = setTimeout(() => {
            setDisplayedLines(['']) // Initialize with first empty line
            typeNextCharacter()
        }, startDelay)

        return () => {
            clearTimeout(startTimeout)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [
        lines,
        speed,
        lineDelay,
        startDelay,
        currentLineIndex,
        currentCharIndex,
        onLineComplete,
        onComplete
    ])

    return {
        displayedLines,
        currentLineIndex,
        isComplete
    }
}

export default useTypingEffect