/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
        },
        screens: {
          default: '1280px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
        },
      },
      colors: {
        primary: '#1E1E1E',
        secondary: '#C1DCDC',
        dot_bg: '#D9D9D9',

      },
      fontSize: {
        '26': ['26px', '24px'],
        '22': ['22px', '32px'],
        '27': ['27px', '32px'],
        '32': ['32px', '48px'],
        '44': ['44px', '100%'],
        '64': ['64px', '64px'],
      },
      padding: {
        '120': '120px',
        '14px': '14px',
      },
      borderRadius: {
        '18': '18px',
      },

    },
  },
  plugins: [],
}