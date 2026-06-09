/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50:  '#e8edf5',
          100: '#c5d0e6',
          200: '#9fb1d5',
          300: '#7892c4',
          400: '#5a79b8',
          500: '#3b61ac',
          600: '#2d5399',
          700: '#1e3a5f',
          800: '#152c4a',
          900: '#0a1628',
        },
        azure: {
          50:  '#e6f4ff',
          100: '#bde3ff',
          200: '#90cfff',
          300: '#5cbaff',
          400: '#36aaff',
          500: '#0a9aff',
          600: '#0080e0',
          700: '#0062b0',
          800: '#004580',
          900: '#002950',
        },
        orange: {
          50:  '#fff5e6',
          100: '#ffe3b8',
          200: '#ffcc85',
          300: '#ffb550',
          400: '#ffa02a',
          500: '#ff8c00',
          600: '#f07b00',
          700: '#d96500',
          800: '#b84f00',
          900: '#8a3800',
        },
        gold: {
          50:  '#fdf8ed',
          100: '#f9edc8',
          200: '#f5e09e',
          300: '#f0d26e',
          400: '#ecc64a',
          500: '#e8b825',
          600: '#c9a020',
          700: '#a6811a',
          800: '#856513',
          900: '#634b0c',
        },
      },
      boxShadow: {
        'soft':  '0 4px 30px rgba(14, 32, 68, 0.08)',
        'float': '0 10px 40px rgba(14, 32, 68, 0.14)',
        'glow-orange': '0 0 24px rgba(255, 140, 0, 0.3)',
        'glow-azure':  '0 0 24px rgba(10, 154, 255, 0.25)',
        'glow-navy':   '0 0 24px rgba(30, 58, 95, 0.2)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(160deg, #0a1628 0%, #1e3a5f 45%, #0e2044 100%)',
        'card-gradient': 'linear-gradient(135deg, #ffffff 0%, #f0f6ff 100%)',
        'gold-gradient': 'linear-gradient(90deg, #e8b825, #f5e09e, #e8b825)',
        'orange-gradient': 'linear-gradient(90deg, #ff8c00, #ffa02a)',
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease-out',
        'fade-in':    'fadeIn 0.3s ease-out',
        'slide-in-r': 'slideInRight 0.4s ease-out',
        'float':      'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.7' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
