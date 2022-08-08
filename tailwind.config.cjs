/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui:{
    themes: [
      {
        mytheme : {
          primary: "#8362F2",
          secondary: "#8DD4CC",
          accent: "#37cdbe",
          neutral: "#525252",
          "base-100": "#fff",
        }
      }
    ],
  }
}
