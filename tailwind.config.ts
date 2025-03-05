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
        'lime-green-300': '#81c784',
        'lime-green-500': '#4caf50',
        'lime-green-700': '#2e7d32',
        'lime-green-900': '#1b5e20',
        'native-gray-600': '#9e9e9e',
        'steel-blue-600': '#3a4c6b',
        'off-white-500': '#f5f5f5',
        'dim-gray-600': '#444444',
        'github-gray': '#333333',
        'google-blue': '#4285f4',
      },
    },
  },
  plugins: [],
}
export default config
