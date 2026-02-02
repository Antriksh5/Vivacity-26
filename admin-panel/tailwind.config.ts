import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'yt-bg': '#0f0f0f',
        'yt-card': '#272727',
        'yt-hover': '#3f3f3f',
        'yt-chip': '#272727',
        'yt-chip-active': '#ffffff',
        'yt-red': '#ff0000',
        'yt-text': '#f1f1f1',
        'yt-text-secondary': '#aaaaaa',
        'yt-border': '#303030',
        'yt-search': '#121212',
        'yt-search-border': '#303030',
      },
    },
  },
  plugins: [],
}
export default config
