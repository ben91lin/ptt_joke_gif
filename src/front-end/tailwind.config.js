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
    fontFamily: {
      'sans': ['Noto Sans TC'],
      'serif': ['Noto Serif TC'],
      },
    minHeight: {
      '8': '2rem',
      '16': '4rem',
      '32': '8rem'
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#F9FAF4',
      'secondary': '#4A6163',
      'pastel-orange': '#FFC94B'
    }),
    textColor: theme => ({
      ...theme('colors'),
      'primary': '#F9FAF4',
      'secondary': '#4A6163',
      'sandy-brown': '#F9A66C',
      'pastel-orange': '#FFC94B',
      'light-coral': '#F17A7E'
    }),
    gradientColorStops: theme => ({
      ...theme('colors'),
      'sandy-brown': '#F9A66C',
      'pastel-orange': '#FFC94B',
      'light-coral': '#F17A7E',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
