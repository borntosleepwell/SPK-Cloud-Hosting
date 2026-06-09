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
        cloud: {
          bg: '#f6f8fb',
          panel: '#ffffff',
          line: '#d8e1ea',
          ink: '#16202a',
          muted: '#617080',
          primary: '#1f6f8b',
          accent: '#e0643a',
          soft: '#eaf4f8',
        },
      },
    },
  },
  plugins: [],
}
