/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 👈 this enables dark mode via a `dark` class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust if your files are elsewhere
  ],
  theme: {
    extend: {
      colors: {
        "off-white": "#F4F3F2",
        "light-green": "#9AC77A",
        "dark-green": "#125343",
      },
    },
  },
  plugins: [],
};
