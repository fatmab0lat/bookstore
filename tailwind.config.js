/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        title: "#ED7D31",
        navbar: "#241468",
        signUpback: "#282D4F",
      },
    },
  },
  plugins: [],
};
