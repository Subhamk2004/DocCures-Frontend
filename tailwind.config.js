/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softGray: '#F2F2F2',
        darkGray: '#D6D6D6',
        primary: '#597cff',
        secondary:'#e4eaff',
        textp:'#494949'
      },
    },
  },
  plugins: [],
}
