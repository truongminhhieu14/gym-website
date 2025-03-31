/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1400px"
    },
    fontFamily: {
      oswald: 'var(--font-oswald)',
      roboto: 'var(--font-roboto)',
    },
    backgroundImage: {
      hero: 'url(/assets/assets/img/hero/bg2.jpg)',
      membership: 'url(/assets/assets/img/membership/bg1.jpg)'
    },

    extend: {
      colors: {
        primary: {
          DEFAULT: '#333',
          100: '#484848',
          200: '#151515',
          300: '#111',
        },
        accent: '#d4000d'
      }
    },
  },
  plugins: [],
}

