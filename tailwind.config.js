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
        night: {
          0: '#242933',
          1: '#2E3440',
          2: '#3B4252',
          3: '#434C5E',
          4: '#4C566A',
        },
        snow: {
          0: '#D8DEE9',
          1: '#E5E9F0',
          2: '#ECEFF4',
          3: '#F2F4F8',
          4: '#F4F6F9',
          5: '#F7F9FB',
          6: '#FBFBFC',
          7: '#FFFFFF',
        },
        frost: {
          0: '#5376A2',
          1: '#5E81AC',
          2: '#81A1C1',
          3: '#88C0D0',
          4: '#8FBCBB',
        },
        aurora: {
          0: '#BF616A',
          1: '#D08770',
          2: '#EBCB8B',
          3: '#A3BE8C',
          4: '#B48EAD',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
