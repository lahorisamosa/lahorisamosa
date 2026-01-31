/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emerald: {
          50: 'oklch(.97 .02 160)',
          100: 'oklch(.94 .05 160)',
          200: 'oklch(.88 .09 160)',
          300: 'oklch(.80 .12 160)',
          400: 'oklch(.70 .15 160)',
          500: 'oklch(.60 .18 160)',
          600: 'oklch(.48 .19 160)', // Primary Brand
          700: 'oklch(.38 .14 160)',
          800: 'oklch(.28 .10 160)', // Deep Backgrounds
          900: 'oklch(.18 .06 160)', // Darkest
          950: 'oklch(.10 .04 160)',
        },
        amber: {
          50: 'oklch(.99 .02 85)',
          100: 'oklch(.96 .06 85)',
          200: 'oklch(.90 .12 85)',
          300: 'oklch(.82 .16 85)',
          400: 'oklch(.72 .19 85)', // Accent Gold
          500: 'oklch(.64 .20 85)',
          600: 'oklch(.55 .18 85)',
          700: 'oklch(.46 .15 85)',
          800: 'oklch(.38 .12 85)',
        },
      },
      fontFamily: {
        'brand': ['"Playfair Display"', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
