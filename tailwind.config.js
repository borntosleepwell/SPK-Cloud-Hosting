/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        warm: {
          white: '#fff8f0',
          taupe: '#e1d9cb',
          ink: '#1a1a1a',
          muted: '#706a61',
          coral: '#c9694f',
          sand: '#f3eadf',
        },
      },
    },
  },
  plugins: [],
}
