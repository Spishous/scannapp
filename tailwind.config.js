/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "ciel-bleu": {
        100: "#E4EBF2",
        200: "#BACBD9",
        300: "#6CAFD9",
        400: "#3B8DBF",
        500: "#2E78A6",
      },
      "neutral":{
        0: "#ffffff",
        500: "#aaaaaa",
        700: "#555555",
        900: "#000000",
      }
      // ...
    },
  },
  plugins: [],
};
