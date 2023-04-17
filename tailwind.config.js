/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#0F252F",
        primary: "#337086",
        background: "#F5F5F5",
        black: "#232932",
        dark: "#051e2b",
        gray: "#666666",
        link: "#149cb8",
        attention: "#eaf3f5",
        selected: "#c7cbcc",
        accent: "#007992",
        lightGray: "#cccccc",
        red: "#8a0026",
        thinGray: "#f7f7f7",
        gold: "#A49C6D",
      },
      fontFamily: {
        outfit: ["Outfit"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
