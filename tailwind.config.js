/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'oxford-blue': '#000814',
        'dark-blue': '#001d3d',
        'prussian-blue': '#003566',
        'orange-web': '#ffc300',
        'sunglow': '#ffd60a',
      },
    },
  },
  plugins: [],
}
