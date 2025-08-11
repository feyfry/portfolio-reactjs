
// API URLs and Endpoints
export const API_URLS = {
    GITHUB: 'https://api.github.com',
    CONTACT_FORM: '/api/contact',
    ANALYTICS: '/api/analytics',
    NEWSLETTER: '/api/newsletter'
}

// Social Media URLs
export const SOCIAL_URLS = {
    GITHUB: 'https://github.com/alextanaka',
    LINKEDIN: 'https://linkedin.com/in/alex-tanaka-dev',
    TWITTER: 'https://twitter.com/alextanaka_dev',
    EMAIL: 'mailto:alex.tanaka@example.com',
    INSTAGRAM: 'https://instagram.com/alextanaka.codes',
    YOUTUBE: 'https://youtube.com/@alextanaka-dev'
}

// Application Routes
export const ROUTES = {
    HOME: '/',
    ABOUT: '/#about',
    SKILLS: '/#skills',
    PROJECTS: '/#projects',
    EXPERIENCE: '/#experience',
    CONTACT: '/#contact',
    BLOG: '/blog',
    RESUME: '/resume'
}

// Section IDs for navigation
export const SECTION_IDS = [
    'home',
    'about',
    'skills',
    'projects',
    'experience',
    'contact'
]

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536
}

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 800,
    SPLASH_SCREEN: 3000,
    PAGE_TRANSITION: 600
}

// Animation Delays
export const ANIMATION_DELAY = {
    NONE: 0,
    SHORT: 100,
    MEDIUM: 200,
    LONG: 500,
    STAGGER: 100
}

// Color Palette
export const COLORS = {
    PRIMARY: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7c3aed',
        800: '#6b21a8',
        900: '#581c87'
    },
    SECONDARY: {
        50: '#fdf2f8',
        100: '#fce7f3',
        200: '#fbcfe8',
        300: '#f9a8d4',
        400: '#f472b6',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
        800: '#9d174d',
        900: '#831843'
    },
    DARK: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a'
    }
}

// Typography
export const TYPOGRAPHY = {
    FONT_FAMILY: {
        SANS: ['Inter', 'system-ui', 'sans-serif'],
        MONO: ['JetBrains Mono', 'monospace'],
        JAPANESE: ['Noto Sans JP', 'sans-serif']
    },
    FONT_SIZES: {
        XS: '0.75rem',
        SM: '0.875rem',
        BASE: '1rem',
        LG: '1.125rem',
        XL: '1.25rem',
        '2XL': '1.5rem',
        '3XL': '1.875rem',
        '4XL': '2.25rem',
        '5XL': '3rem',
        '6XL': '3.75rem'
    }
}

// Form Configuration
export const FORM_CONFIG = {
    CONTACT: {
        MAX_NAME_LENGTH: 100,
        MAX_EMAIL_LENGTH: 255,
        MAX_SUBJECT_LENGTH: 200,
        MAX_MESSAGE_LENGTH: 2000,
        MIN_MESSAGE_LENGTH: 10
    },
    NEWSLETTER: {
        MAX_EMAIL_LENGTH: 255
    }
}

// File Upload Limits
export const FILE_LIMITS = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    MAX_FILES: 3
}

// Local Storage Keys
export const STORAGE_KEYS = {
    THEME: 'portfolio_theme',
    LANGUAGE: 'portfolio_language',
    PREFERENCES: 'portfolio_preferences',
    CONTACT_FORM: 'portfolio_contact_form',
    VISITED_SECTIONS: 'portfolio_visited_sections',
    ANIMATION_PREFERENCES: 'portfolio_animation_preferences'
}

// Theme Configuration
export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system'
}

// Language Configuration
export const LANGUAGES = {
    EN: 'en',
    JA: 'ja',
    ES: 'es'
}

// Japanese Text Constants
export const JAPANESE_TEXT = {
    LOADING: '読み込み中...',
    COMPLETE: '完了',
    PROCESSING: '処理中',
    ERROR: 'エラー',
    SUCCESS: '成功',
    SENDING: '送信中',
    SENT: '送信完了',
    CONTACT: 'お問い合わせ',
    ABOUT: '私について',
    SKILLS: 'スキル',
    PROJECTS: 'プロジェクト',
    EXPERIENCE: '経験',
    HOME: 'ホーム',
    WELCOME: 'ようこそ',
    THANK_YOU: 'ありがとうございます',
    PORTFOLIO: 'ポートフォリオ',
    DEVELOPER: '開発者',
    DESIGNER: 'デザイナー'
}

// Skills Categories
export const SKILL_CATEGORIES = {
    FRONTEND: 'frontend',
    BACKEND: 'backend',
    MOBILE: 'mobile',
    DATABASE: 'database',
    DEVOPS: 'devops',
    DESIGN: 'design',
    TOOLS: 'tools'
}

// Project Categories
export const PROJECT_CATEGORIES = {
    WEB_APP: 'Web Application',
    MOBILE_APP: 'Mobile App',
    DESKTOP_APP: 'Desktop App',
    API: 'API',
    LIBRARY: 'Library',
    TOOL: 'Tool',
    GAME: 'Game',
    OTHER: 'Other'
}

// Project Status
export const PROJECT_STATUS = {
    COMPLETED: 'Completed',
    IN_PROGRESS: 'In Progress',
    PLANNED: 'Planned',
    ON_HOLD: 'On Hold',
    CANCELLED: 'Cancelled'
}

// Experience Types
export const EXPERIENCE_TYPES = {
    WORK: 'work',
    EDUCATION: 'education',
    FREELANCE: 'freelance',
    VOLUNTEER: 'volunteer'
}

// Skill Levels
export const SKILL_LEVELS = {
    BEGINNER: {
        min: 0,
        max: 40,
        label: 'Beginner',
        color: 'text-orange-400',
        japanese: '初級'
    },
    INTERMEDIATE: {
        min: 41,
        max: 70,
        label: 'Intermediate',
        color: 'text-yellow-400',
        japanese: '中級'
    },
    ADVANCED: {
        min: 71,
        max: 89,
        label: 'Advanced',
        color: 'text-blue-400',
        japanese: '上級'
    },
    EXPERT: {
        min: 90,
        max: 100,
        label: 'Expert',
        color: 'text-green-400',
        japanese: 'エキスパート'
    }
}

// Contact Form Types
export const CONTACT_TYPES = {
    GENERAL: 'General Inquiry',
    WORK: 'Work Opportunity',
    COLLABORATION: 'Collaboration',
    CONSULTATION: 'Consultation',
    SUPPORT: 'Support',
    OTHER: 'Other'
}

// Budget Ranges
export const BUDGET_RANGES = [
    'Under $1,000',
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
    'To be discussed'
]

// Timeline Options
export const TIMELINE_OPTIONS = [
    'ASAP',
    '1-2 weeks',
    '1 month',
    '2-3 months',
    '3-6 months',
    '6+ months',
    'Flexible'
]

// Error Messages
export const ERROR_MESSAGES = {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    MIN_LENGTH: 'Minimum length is {min} characters',
    MAX_LENGTH: 'Maximum length is {max} characters',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_URL: 'Please enter a valid URL',
    FILE_TOO_LARGE: 'File size must be less than {size}MB',
    INVALID_FILE_TYPE: 'Invalid file type. Allowed types: {types}',
    NETWORK_ERROR: 'Network error. Please try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    FORM_SUBMISSION_ERROR: 'Failed to submit form. Please try again.',
    JAPANESE: {
        REQUIRED: 'この項目は必須です',
        INVALID_EMAIL: '有効なメールアドレスを入力してください',
        MIN_LENGTH: '最小文字数は{min}文字です',
        MAX_LENGTH: '最大文字数は{max}文字です',
        NETWORK_ERROR: 'ネットワークエラーです。もう一度お試しください。',
        SERVER_ERROR: 'サーバーエラーです。しばらくしてからお試しください。',
        FORM_SUBMISSION_ERROR: 'フォームの送信に失敗しました。もう一度お試しください。'
    }
}

// Success Messages
export const SUCCESS_MESSAGES = {
    FORM_SUBMITTED: 'Form submitted successfully!',
    EMAIL_SENT: 'Email sent successfully!',
    SUBSCRIBED: 'Successfully subscribed to newsletter!',
    SAVED: 'Settings saved successfully!',
    JAPANESE: {
        FORM_SUBMITTED: 'フォームが正常に送信されました！',
        EMAIL_SENT: 'メールが正常に送信されました！',
        SUBSCRIBED: 'ニュースレターに正常に登録されました！',
        SAVED: '設定が正常に保存されました！'
    }
}

// SEO Constants
export const SEO = {
    DEFAULT_TITLE: 'Alex Tanaka - Full Stack Developer Portfolio',
    DEFAULT_DESCRIPTION: 'Passionate full stack developer specializing in React, Node.js, and modern web technologies. View my projects and get in touch.',
    DEFAULT_KEYWORDS: 'full stack developer, react developer, node.js, javascript, web development, portfolio',
    SITE_URL: 'https://alextanaka.dev',
    TWITTER_HANDLE: '@alextanaka_dev',
    AUTHOR: 'Alex Tanaka'
}

// Performance Metrics
export const PERFORMANCE = {
    SCROLL_THROTTLE: 16, // ~60fps
    RESIZE_DEBOUNCE: 300,
    SEARCH_DEBOUNCE: 500,
    ANIMATION_FRAME_RATE: 60,
    LAZY_LOAD_THRESHOLD: 0.1,
    LAZY_LOAD_ROOT_MARGIN: '50px'
}

// Feature Flags
export const FEATURES = {
    ANALYTICS: true,
    DARK_MODE: true,
    LANGUAGE_SWITCH: true,
    CONTACT_FORM: true,
    NEWSLETTER: true,
    BLOG: false,
    COMMENTS: false,
    LIVE_CHAT: false
}

// Environment Variables
export const ENV = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    GA_TRACKING_ID: process.env.REACT_APP_GA_TRACKING_ID,
    EMAILJS_SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
}

// Regex Patterns
export const REGEX = {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PHONE: /^[+]?[\d\s\-()]{10,}$/,
    URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    JAPANESE: /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/,
    ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
}

// Default Values
export const DEFAULTS = {
    THEME: THEMES.DARK,
    LANGUAGE: LANGUAGES.EN,
    ANIMATION_DURATION: ANIMATION_DURATION.NORMAL,
    SCROLL_OFFSET: 80,
    PAGINATION_SIZE: 10,
    DEBOUNCE_DELAY: 300,
    THROTTLE_DELAY: 100
}

export default {
    API_URLS,
    SOCIAL_URLS,
    ROUTES,
    SECTION_IDS,
    BREAKPOINTS,
    ANIMATION_DURATION,
    ANIMATION_DELAY,
    COLORS,
    TYPOGRAPHY,
    FORM_CONFIG,
    STORAGE_KEYS,
    THEMES,
    LANGUAGES,
    JAPANESE_TEXT,
    SKILL_CATEGORIES,
    PROJECT_CATEGORIES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    SEO,
    PERFORMANCE,
    FEATURES,
    DEFAULTS
}