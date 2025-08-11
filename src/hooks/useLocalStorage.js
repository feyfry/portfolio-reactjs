import {
    useState,
    useEffect
} from 'react'

/**
 * Custom hook for managing localStorage with React state synchronization
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @returns {[*, function]} - [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue
        }

        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key)
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            // If error also return initialValue
            console.error(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have the same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value

            // Save state
            setStoredValue(valueToStore)

            // Save to local storage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore))
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.error(`Error setting localStorage key "${key}":`, error)
        }
    }

    return [storedValue, setValue]
}

/**
 * Hook for managing localStorage with expiration
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @param {number} ttl - Time to live in milliseconds
 * @returns {[*, function, function]} - [storedValue, setValue, clearValue]
 */
export const useLocalStorageWithExpiry = (key, initialValue, ttl = 24 * 60 * 60 * 1000) => {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue
        }

        try {
            const item = window.localStorage.getItem(key)
            if (!item) {
                return initialValue
            }

            const parsedItem = JSON.parse(item)
            const now = new Date()

            // Check if item has expired
            if (parsedItem.expiry && now.getTime() > parsedItem.expiry) {
                window.localStorage.removeItem(key)
                return initialValue
            }

            return parsedItem.value || initialValue
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            const now = new Date()

            const item = {
                value: valueToStore,
                expiry: now.getTime() + ttl
            }

            setStoredValue(valueToStore)

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(item))
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error)
        }
    }

    const clearValue = () => {
        try {
            setStoredValue(initialValue)
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key)
            }
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error)
        }
    }

    return [storedValue, setValue, clearValue]
}

/**
 * Hook for managing multiple localStorage keys as an object
 * @param {Object} initialState - Object with key-value pairs
 * @param {string} namespace - Optional namespace for keys
 * @returns {[Object, function, function]} - [state, updateState, clearState]
 */
export const useLocalStorageState = (initialState, namespace = '') => {
    const prefix = namespace ? `${namespace}_` : ''

    const [state, setState] = useState(() => {
        if (typeof window === 'undefined') {
            return initialState
        }

        const savedState = {}

        Object.keys(initialState).forEach(key => {
            try {
                const storageKey = `${prefix}${key}`
                const item = window.localStorage.getItem(storageKey)
                savedState[key] = item ? JSON.parse(item) : initialState[key]
            } catch (error) {
                console.error(`Error reading localStorage key "${prefix}${key}":`, error)
                savedState[key] = initialState[key]
            }
        })

        return savedState
    })

    const updateState = (updates) => {
        setState(prevState => {
            const newState = {
                ...prevState,
                ...updates
            }

            // Save each updated key to localStorage
            Object.keys(updates).forEach(key => {
                try {
                    const storageKey = `${prefix}${key}`
                    if (typeof window !== 'undefined') {
                        window.localStorage.setItem(storageKey, JSON.stringify(newState[key]))
                    }
                } catch (error) {
                    console.error(`Error setting localStorage key "${prefix}${key}":`, error)
                }
            })

            return newState
        })
    }

    const clearState = () => {
        setState(initialState)

        Object.keys(initialState).forEach(key => {
            try {
                const storageKey = `${prefix}${key}`
                if (typeof window !== 'undefined') {
                    window.localStorage.removeItem(storageKey)
                }
            } catch (error) {
                console.error(`Error removing localStorage key "${prefix}${key}":`, error)
            }
        })
    }

    return [state, updateState, clearState]
}

/**
 * Hook for detecting localStorage changes from other tabs/windows
 * @param {string} key - The localStorage key to watch
 * @param {*} initialValue - Initial value
 * @returns {*} - Current value that syncs across tabs
 */
export const useLocalStorageSync = (key, initialValue) => {
    const [storedValue, setStoredValue] = useLocalStorage(key, initialValue)

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    const newValue = JSON.parse(e.newValue)
                    setStoredValue(newValue)
                } catch (error) {
                    console.error(`Error parsing localStorage value for key "${key}":`, error)
                }
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [key, setStoredValue])

    return [storedValue, setStoredValue]
}

/**
 * Hook for managing localStorage with validation
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Initial value
 * @param {function} validator - Function to validate the value
 * @returns {[*, function, boolean]} - [storedValue, setValue, isValid]
 */
export const useLocalStorageWithValidation = (key, initialValue, validator) => {
    const [storedValue, setStoredValue] = useLocalStorage(key, initialValue)
    const [isValid, setIsValid] = useState(true)

    const setValidatedValue = (value) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value

        if (validator && typeof validator === 'function') {
            const validationResult = validator(valueToStore)
            setIsValid(validationResult)

            if (validationResult) {
                setStoredValue(valueToStore)
            }
        } else {
            setStoredValue(valueToStore)
        }
    }

    return [storedValue, setValidatedValue, isValid]
}

export default useLocalStorage