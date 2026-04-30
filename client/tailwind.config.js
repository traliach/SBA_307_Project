/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#faf9f7',
        ink: '#111111',
        muted: '#64625d',
        line: '#e4e2dd',
        accent: {
          DEFAULT: '#b45309',
          deep: '#92400e',
          soft: '#fef3c7',
        },
        warm: {
          DEFAULT: '#d97706',
          soft: '#fef9ee',
        },
        surface: {
          DEFAULT: '#ffffff',
          raised: 'rgba(255,255,255,0.92)',
          tinted: '#f5f4f1',
        },
      },
      boxShadow: {
        panel:
          '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -4px rgba(0,0,0,0.06), 0 24px 64px -12px rgba(0,0,0,0.08)',
        soft: '0 1px 3px rgba(0,0,0,0.04), 0 6px 16px -4px rgba(0,0,0,0.06)',
        glow: '0 0 0 1px rgba(67,56,202,0.08), 0 8px 32px -8px rgba(67,56,202,0.12)',
        card: '0 1px 2px rgba(0,0,0,0.03), 0 4px 12px -2px rgba(0,0,0,0.05)',
        'card-hover':
          '0 1px 2px rgba(0,0,0,0.04), 0 12px 32px -6px rgba(0,0,0,0.1), 0 32px 64px -12px rgba(0,0,0,0.08)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', '"Times New Roman"', 'serif'],
        mono: ['"JetBrains Mono"', '"Cascadia Code"', 'monospace'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
