/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                'mono': ['JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
                'japanese': ['Noto Sans JP', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Meiryo', 'sans-serif']
            },
            colors: {
                // Enhanced color palette
                primary: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                    700: '#7c3aed',
                    800: '#6b21a8',
                    900: '#581c87',
                    950: '#3b0764'
                },
                secondary: {
                    50: '#fdf2f8',
                    100: '#fce7f3',
                    200: '#fbcfe8',
                    300: '#f9a8d4',
                    400: '#f472b6',
                    500: '#ec4899',
                    600: '#db2777',
                    700: '#be185d',
                    800: '#9d174d',
                    900: '#831843',
                    950: '#500724'
                },
                dark: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617'
                }
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
                '144': '36rem'
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
                '10xl': '104rem'
            },
            fontSize: {
                '2xs': ['0.625rem', {
                    lineHeight: '0.75rem'
                }],
                '3xs': ['0.5rem', {
                    lineHeight: '0.625rem'
                }],
                '4xl': ['2.25rem', {
                    lineHeight: '2.5rem'
                }],
                '5xl': ['3rem', {
                    lineHeight: '1.1'
                }],
                '6xl': ['3.75rem', {
                    lineHeight: '1.1'
                }],
                '7xl': ['4.5rem', {
                    lineHeight: '1.1'
                }],
                '8xl': ['6rem', {
                    lineHeight: '1.1'
                }],
                '9xl': ['8rem', {
                    lineHeight: '1.1'
                }]
            },
            lineHeight: {
                'relaxed': '1.625',
                'loose': '2',
                'tight': '1.25',
                'snug': '1.375'
            },
            letterSpacing: {
                'tighter': '-0.05em',
                'tight': '-0.025em',
                'normal': '0em',
                'wide': '0.025em',
                'wider': '0.05em',
                'widest': '0.1em'
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
                '6xl': '3rem'
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'slide-left': 'slideLeft 0.5s ease-out',
                'slide-right': 'slideRight 0.5s ease-out',
                'bounce-slow': 'bounce 2s infinite',
                'pulse-slow': 'pulse 3s infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'gradient': 'gradient 15s ease infinite',
                'shimmer': 'shimmer 2s infinite',
                'spin-slow': 'spin 3s linear infinite',
                'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                'scale-in': 'scaleIn 0.5s ease-out',
                'scale-out': 'scaleOut 0.5s ease-in'
            },
            keyframes: {
                fadeIn: {
                    '0%': {
                        opacity: '0'
                    },
                    '100%': {
                        opacity: '1'
                    }
                },
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(30px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                slideUp: {
                    '0%': {
                        transform: 'translateY(100%)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: '1'
                    }
                },
                slideDown: {
                    '0%': {
                        transform: 'translateY(-100%)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: '1'
                    }
                },
                slideLeft: {
                    '0%': {
                        transform: 'translateX(100%)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateX(0)',
                        opacity: '1'
                    }
                },
                slideRight: {
                    '0%': {
                        transform: 'translateX(-100%)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateX(0)',
                        opacity: '1'
                    }
                },
                float: {
                    '0%, 100%': {
                        transform: 'translateY(0px)'
                    },
                    '50%': {
                        transform: 'translateY(-20px)'
                    }
                },
                glow: {
                    'from': {
                        boxShadow: '0 0 20px rgb(168 85 247 / 0.3)'
                    },
                    'to': {
                        boxShadow: '0 0 30px rgb(168 85 247 / 0.6)'
                    }
                },
                gradient: {
                    '0%': {
                        backgroundPosition: '0% 50%'
                    },
                    '50%': {
                        backgroundPosition: '100% 50%'
                    },
                    '100%': {
                        backgroundPosition: '0% 50%'
                    }
                },
                shimmer: {
                    '100%': {
                        transform: 'translateX(100%)'
                    }
                },
                scaleIn: {
                    '0%': {
                        transform: 'scale(0.8)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'scale(1)',
                        opacity: '1'
                    }
                },
                scaleOut: {
                    '0%': {
                        transform: 'scale(1)',
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'scale(0.8)',
                        opacity: '0'
                    }
                }
            },
            boxShadow: {
                'glow': '0 0 20px rgb(168 85 247 / 0.3)',
                'glow-lg': '0 0 40px rgb(168 85 247 / 0.4)',
                'glow-xl': '0 0 60px rgb(168 85 247 / 0.5)',
                'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.2)',
                'inner-xl': 'inset 0 4px 6px -1px rgb(0 0 0 / 0.2)',
                'soft': '0 2px 15px 0 rgb(0 0 0 / 0.1)',
                'soft-lg': '0 4px 20px 0 rgb(0 0 0 / 0.15)'
            },
            backdropBlur: {
                'xs': '2px',
                'sm': '4px',
                'md': '8px',
                'lg': '12px',
                'xl': '16px',
                '2xl': '24px',
                '3xl': '40px'
            },
            backgroundSize: {
                'auto': 'auto',
                'cover': 'cover',
                'contain': 'contain',
                '50%': '50%',
                '16': '4rem'
            },
            transitionTimingFunction: {
                'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
                'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
                'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
                'in-quad': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
                'out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                'in-out-quad': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
                'in-quart': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
                'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                'in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)'
            },
            transitionDuration: {
                '0': '0ms',
                '2000': '2000ms',
                '3000': '3000ms',
                '4000': '4000ms',
                '5000': '5000ms'
            },
            scale: {
                '25': '.25',
                '65': '.65',
                '85': '.85',
                '115': '1.15',
                '125': '1.25',
                '135': '1.35'
            },
            rotate: {
                '15': '15deg',
                '30': '30deg',
                '60': '60deg',
                '120': '120deg',
                '135': '135deg',
                '270': '270deg'
            },
            skew: {
                '15': '15deg',
                '30': '30deg'
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100'
            },
            aspectRatio: {
                auto: 'auto',
                square: '1 / 1',
                video: '16 / 9',
                portrait: '3 / 4',
                landscape: '4 / 3',
                ultrawide: '21 / 9',
                golden: '1.618 / 1'
            },
            content: {
                'empty': '""'
            },
            aria: {
                'asc': 'sort="ascending"',
                'desc': 'sort="descending"'
            },
            gridTemplateColumns: {
                'auto-fit-xs': 'repeat(auto-fit, minmax(200px, 1fr))',
                'auto-fit-sm': 'repeat(auto-fit, minmax(250px, 1fr))',
                'auto-fit-md': 'repeat(auto-fit, minmax(300px, 1fr))',
                'auto-fit-lg': 'repeat(auto-fit, minmax(350px, 1fr))',
                'auto-fit-xl': 'repeat(auto-fit, minmax(400px, 1fr))',
                'auto-fill-xs': 'repeat(auto-fill, minmax(200px, 1fr))',
                'auto-fill-sm': 'repeat(auto-fill, minmax(250px, 1fr))',
                'auto-fill-md': 'repeat(auto-fill, minmax(300px, 1fr))',
                'auto-fill-lg': 'repeat(auto-fill, minmax(350px, 1fr))',
                'auto-fill-xl': 'repeat(auto-fill, minmax(400px, 1fr))'
            },
            screens: {
                'xs': '475px',
                '3xl': '1600px',
                '4xl': '1920px'
            }
        },
    },
    plugins: [typography],
    darkMode: 'class'
}