/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d7a4f',      // Vert principal
        secondary: '#8b2942',   // Rouge bordeaux
        accent: '#00a0e4',      // Bleu
        background: '#f9f9f9',  // Fond gris clair
        border: '#e5e5e5',      // Bordures
      },
    },
  },
  plugins: [],
}
