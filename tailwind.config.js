/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        dm: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        accent: '#0ea5e9',
        accent2: '#38bdf8',
        ink: '#0f172a',
        muted: '#64748b',
        faint: '#94a3b8',
      },
    },
  },
  plugins: [],
}
