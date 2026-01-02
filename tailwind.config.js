/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'socrates': {
          'navy': '#1e3a5f',
          'blue': '#3b82f6',
          'light': '#60a5fa',
          'gold': '#fbbf24',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
