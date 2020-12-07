const defaultConfig = require('tailwindcss/defaultConfig')

module.exports = {
  purge: [
    './src/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ['hover']
    },
  },
  plugins: [],
}
