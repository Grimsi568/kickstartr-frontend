import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f6f4',
          100: '#e9ece7',
          200: '#d2d6cd',
          300: '#b5bbad',
          400: '#8f9584',
          500: '#71695B', // requested palette anchor from memory
          600: '#5e574b',
          700: '#4b463c',
          800: '#3a372f',
          900: '#2f2c27'
        }
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.06)'
      },
      borderRadius: {
        '2xl': '1.25rem'
      }
    }
  },
  plugins: []
} satisfies Config
