import type { Config } from 'tailwindcss'
import tailwindcssAnime from 'tailwindcss-animate'
const config: Config = {
  darkMode: 'class', 
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssAnime],
}
export default config;
