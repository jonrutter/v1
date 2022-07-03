const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    transitionDuration: {
      DEFAULT: '300ms',
    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        heading: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        'site-sm': '36rem',
        'site-md': '42rem',
        'site-lg': '64rem',
        'site-full': '80rem',
      },
      colors: {
        sea: {
          50: '#f0fcff',
          100: '#e0f8ff',
          200: '#b8f0ff',
          300: '#7ae2ff',
          400: '#33d3ff',
          500: '#00c0f5',
          600: '#00a0cc',
          700: '#047e9f',
          800: '#076883',
          900: '#0c596e',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
