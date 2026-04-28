/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { 50: '#f0f4f8', 100: '#d9e2ec', 300: '#829ab1', 400: '#627d98', 500: '#486581', 600: '#334e68', 700: '#243b53', 800: '#102a43', 900: '#0b1d2e', 950: '#07131e' },
        gold: { 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706' }
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}