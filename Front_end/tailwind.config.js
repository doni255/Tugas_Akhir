/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
  plugins: [require("@tailwindcss/forms")],
};
