/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Extended to include more file types
  ],
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',   // Custom primary color
        secondary: '#9333EA', // Custom secondary color
        accent: '#F59E0B',    // Accent color
        background: '#F3F4F6', // Background color
        darkBg: '#1A1A2E',     // Dark mode background
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom sans font
        serif: ['Merriweather', 'serif'], // Custom serif font
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
    screens: {
      'xs': '480px', // Custom breakpoint for extra small devices
      ...require('tailwindcss/defaultTheme').screens, // Default Tailwind breakpoints
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Adds form styling utilities
    require('@tailwindcss/typography'), // Adds typography utilities
    require('@tailwindcss/aspect-ratio'), // Aspect ratio utilities
  ],
}
