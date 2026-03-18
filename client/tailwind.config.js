/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#eef3f7',
        ink: '#0f172a',
        muted: '#526070',
        line: '#d5dde7',
        accent: {
          DEFAULT: '#1f4f84',
          deep: '#16385d',
          soft: '#e7eef6',
        },
      },
      boxShadow: {
        panel: '0 32px 90px -54px rgba(15, 23, 42, 0.34)',
        soft: '0 18px 40px -30px rgba(15, 23, 42, 0.2)',
      },
      fontFamily: {
        sans: ['"Manrope"', '"Segoe UI"', 'sans-serif'],
        display: ['"Space Grotesk"', '"Manrope"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Cascadia Code"', 'monospace'],
      },
    },
  },
  plugins: [],
}
