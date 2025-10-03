/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'raisin-black': '#141423',
        'air-superiority-blue': '#74A4BC',
        'ash-gray': '#B6D6CC', 
        'ivory': '#F1FEC6',
        'scarlet': '#FF3A20',
        // Additional semantic colors
        primary: {
          50: '#fff7ed',
          100: '#ffedd5', 
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF3A20', // scarlet
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        background: {
          DEFAULT: '#141423', // raisin-black
          secondary: '#1a1a2e',
        },
        text: {
          DEFAULT: '#F1FEC6', // ivory
          secondary: '#B6D6CC', // ash-gray
          muted: '#74A4BC', // air-superiority-blue
        },
        accent: {
          DEFAULT: '#FF3A20', // scarlet
          hover: '#e6341c',
        },
        card: {
          DEFAULT: 'rgba(20, 20, 35, 0.8)',
          border: 'rgba(241, 254, 198, 0.2)',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 58, 32, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 58, 32, 0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['Frutiger', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Frutiger', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
