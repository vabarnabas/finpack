module.exports = {
  content: ["./src/**/*.{js,jsx}",],
  theme: {
    extend: {
      colors: {
        primaryText: '#363636',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
