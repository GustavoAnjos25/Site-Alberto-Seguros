/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a4b8c',
          dark: '#0f2d56',
          light: '#2a6bc4',
        },
        accent: '#2563eb',
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'card': '0 10px 40px -10px rgba(0,0,0,0.1)',
        'glow': '0 0 60px rgba(26, 75, 140, 0.15)',
      }
    },
  },
  plugins: [],
}
