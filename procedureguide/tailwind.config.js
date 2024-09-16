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
      spacing: {
        'indent': '1.5rem',  // Adjust this value as needed
      },
    },
  },
  plugins: [],
}
