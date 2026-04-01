/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
        'dark-glass-gradient': 'linear-gradient(135deg, rgba(5, 8, 22, 0.8), rgba(5, 8, 22, 0.4))',
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 245, 255, 0.3), 0 0 30px rgba(0, 245, 255, 0.1)',
        'neon-violet': '0 0 15px rgba(124, 58, 237, 0.3), 0 0 30px rgba(124, 58, 237, 0.1)',
        'neon-gold': '0 0 15px rgba(245, 158, 11, 0.3), 0 0 30px rgba(245, 158, 11, 0.1)',
        'neon-green': '0 0 15px rgba(34, 197, 94, 0.3), 0 0 30px rgba(34, 197, 94, 0.1)',
        'neon-red': '0 0 15px rgba(239, 68, 68, 0.3), 0 0 30px rgba(239, 68, 68, 0.1)',
      },
      animation: {
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 245, 255, 0.3), 0 0 30px rgba(0, 245, 255, 0.1)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 245, 255, 0.5), 0 0 50px rgba(0, 245, 255, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      }
    },
  },
  plugins: [],
}
