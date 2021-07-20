module.exports = {
  purge: {
    enabled: process.env.WEBPACK_DEV_SERVER === 'true' && process.argv.join(' ').indexOf('build') !== -1,
    content: [
      "./src/**/*.{html,ts}",
      "./projects/**/*.{html,ts}"
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      '8': '2rem',
      '16': '4rem',
      '32': '8rem'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
