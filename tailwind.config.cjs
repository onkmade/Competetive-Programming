/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js}'
  ],
  // If you generate class names dynamically, add them to the safelist.
  safelist: [
    'bg-amber-400',
    'bg-blue-500'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
