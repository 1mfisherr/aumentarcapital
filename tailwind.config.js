/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        // Primary (Brand Blue) - Deep Sapphire #1E3A8A: Use for headings, buttons, and accents
        // Primary Light (Accent) - Sky Blue #3B82F6: Use for hover effects, links, highlights
        primary: {
          DEFAULT: '#1E3A8A', // Deep Sapphire - Brand Blue
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6', // Sky Blue - Primary Light/Accent
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A', // Deep Sapphire - Brand Blue
        },
        // Secondary (Neutral Contrast) - Slate Gray #64748B: For subheadings, icons, or UI elements
        secondary: {
          DEFAULT: '#64748B', // Slate Gray - Neutral Contrast
        },
        // Background (Light Mode) - Off White #F9FAFB: Softer than pure white, reduces eye strain
        background: {
          DEFAULT: '#F9FAFB', // Off White - Background
          subtle: '#F3F4F6',
        },
        surface: '#FFFFFF', // White - Surface/Cards
        // Text (Primary) - Charcoal #111827: Almost-black for perfect readability
        // Muted Text - Cool Gray #6B7280: For meta info (dates, tags, category text)
        foreground: {
          DEFAULT: '#111827', // Charcoal - Primary Text
          muted: '#6B7280', // Cool Gray - Muted Text
        },
        muted: '#6B7280', // Cool Gray - Muted Text
        // Accent (Highlight) - Emerald #10B981: For positive numbers, success buttons, key callouts
        accent: {
          DEFAULT: '#10B981', // Emerald - Highlight/Success
          soft: '#D1FAE5',
        },
        success: '#10B981', // Emerald - Success
        // Error / Warning - Soft Red #EF4444: For alerts, warnings, or error messages
        error: '#EF4444', // Soft Red - Error/Warning
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['var(--font-poppins)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.7' }],
        'xl': ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 12px 30px -4px rgba(0, 0, 0, 0.06)',
        'strong': '0 10px 40px -5px rgba(0, 0, 0, 0.12), 0 20px 50px -8px rgba(0, 0, 0, 0.10)',
        'lifted': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
      scale: {
        '95': '0.95',
        '97': '0.97',
        '98': '0.98',
        '99': '0.99',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
