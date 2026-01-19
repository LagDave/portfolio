/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans Pro"', 'sans-serif'],
        display: ['"Polysans Bulky"', 'sans-serif'],
        heading: ['"Polysans Bulky"', 'sans-serif'],
      },
      boxShadow: {
        'modern': '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
        'modern-dark': '0 20px 40px -15px rgba(255, 255, 255, 0.05)',
        'glow': '0 0 20px rgba(255, 255, 255, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    }
  },
  plugins: [],
}
