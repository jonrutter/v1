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
      spacing: {
        underline: 'calc(50% - 0.75rem)',
      },
      fontFamily: {
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        heading: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        'site-small': '36rem',
        'site-med': '64rem',
        'site-full': '80rem',
      },
    },
  },
  plugins: [],
};
