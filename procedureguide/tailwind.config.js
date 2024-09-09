/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      borderWidth: {
        '10': '10px',  // Add custom border width
        '16': '16px',  // Add more if needed
        // You can add more custom values here
      },
    },
  },
  plugins: [],
}
