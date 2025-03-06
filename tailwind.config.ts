import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'soft-blue': {
          200: '#b2d3e2',
          400: '#8bb8d8',
          600: '#6b8fbe',
          800: '#486ba7',
          900: '#3B4F80',
        },
        mint: {
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#81E6D9',
          400: '#4FD1C5',
          500: '#34D399',
          600: '#2BB28B',
          700: '#169D73',
          800: '#0F7F5F',
          900: '#0B5A47',
        },
        'soft-violet': {
          400: '#9b59b6',
        },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '50%': { transform: 'translateX(4px)' },
          '75%': { transform: 'translateX(-4px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
