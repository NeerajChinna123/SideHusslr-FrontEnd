/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'bgBlackBlur':'rgba(0,0,0,3)'
      },
    },      
    fontFamily: {
      poppins: ["Poppins"],
      montserrat: ["Montserrat"],
      ubuntu: ["Ubuntu"],
    },
  },
  plugins:[require('tailwind-scrollbar')({ nocompatible: true })],
}
