/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      display: ["focus-group"],
      transitionDuration:{
        '2000': '2000ms',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
