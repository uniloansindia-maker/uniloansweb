/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#003366',
          light: '#004d99',
          dark: '#002244',
          50: '#e6eef7',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#f0d97a',
          dark: '#b8960c',
          50: '#fdf8e7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        tamil: ['"Noto Sans Tamil"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #003366 0%, #004d99 50%, #003366 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #f0d97a 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
