// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   // plugins: [react(), tailwindcss("./tailwindConfig.config.js")],
//   plugins: [react()],
//   css: {
//     postcss: {
//       plugins: [
//         require('tailwindcss'), // Ensure Tailwind CSS is imported via require
//         require('autoprefixer'),
//       ],
//     },
//   },

// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss'; // Import Tailwind CSS
import autoprefixer from 'autoprefixer'; // Import Autoprefixer

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // Use imported tailwindcss
        autoprefixer(), // Use imported autoprefixer
      ],
    },
  },
});
