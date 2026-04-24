/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        azul: { escuro: '#0D3B8C', medio: '#1A56C4', claro: '#E8F0FD' },
        amarelo: { DEFAULT: '#F5C518', escuro: '#C9A000' },
        cinza: { fundo: '#F4F6FA', borda: '#DDE3EF' },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
