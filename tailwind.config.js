/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        dm: ['var(--font-dm)'],
      },
      colors: {
        green: { DEFAULT: '#2d6a4f', light: '#40916c', dark: '#1b4332' },
        brown: { DEFAULT: '#bc6c25', light: '#dda15e' },
        cream: '#fefae0',
      },
    },
  },
  plugins: [],
};