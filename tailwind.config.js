/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'white': '#fff',
      'light_Grey':"#878787",
      'black': {
        200:'#212121'
      },
      'blue': {
        900: '#646ea6',
        DEFAULT: '#06b6d4',
        dark: '#0e7490',
      },
    },
    extend: {},
  },
  plugins: [],
}