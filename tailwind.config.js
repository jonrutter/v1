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
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
