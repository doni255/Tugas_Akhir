/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        accent: "#179957",
        accentDark: "#184D47",
      },
      container: {
        center: true,
        padding: "15px",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-focus"],
      transitionDuration: {
        2000: "2000ms",
      },
    },
  },
  darkMode: "class",
  // plugins: [nextui()],
  plugins: [require("@tailwindcss/forms")],
};
