/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // Dark mode ko system preference ke bajay manually control karne ke liye
  darkMode: "class",

  theme: {
    extend: {},
  },

  plugins: [],
}