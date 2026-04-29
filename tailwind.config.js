/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        brand: '#2E6DA4',
        'text-primary': '#282B2F',
        'text-secondary': '#545D66',
        'label-default': '#7E8A92',
        'label-filled': '#545D66',
        'label-active': '#2E6DA4',
        'input-border': '#A9B2B7',
        divider: '#E4E7E9',
        'progress-fill': '#006ECE',
        'page-bg': '#F9FAFB',
      },
      boxShadow: {
        'elev-1': '0px 1px 4px rgba(22,29,37,0.05)',
        'elev-1-rev': '0px -1px 4px rgba(22,29,37,0.05)',
      },
    },
  },
  plugins: [],
}
