/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        azul: {
          900: '#051D5F', 800: '#0D3B8C', 700: '#1246A8',
          600: '#1A56C4', 500: '#2563EB', 100: '#DBEAFE', 50: '#EFF6FF',
        },
        amarelo: { 500: '#F5C518', 400: '#FACC15', 600: '#C9A000', 50: '#FEFCE8' },
        cinza: {
          950: '#0A0F1E', 900: '#111827', 800: '#1F2937', 700: '#374151',
          200: '#E5E7EB', 100: '#F3F4F6', 50: '#F9FAFB',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-azul': 'linear-gradient(135deg, #051D5F 0%, #1A56C4 100%)',
        'gradient-amarelo': 'linear-gradient(135deg, #F5C518 0%, #C9A000 100%)',
        'gradient-dark': 'linear-gradient(180deg, rgba(5,29,95,0.85) 0%, rgba(5,29,95,0.6) 100%)',
      },
      boxShadow: {
        card: '0 4px 24px rgba(13,59,140,0.10)',
        'card-hover': '0 12px 40px rgba(13,59,140,0.20)',
        amarelo: '0 4px 24px rgba(245,197,24,0.35)',
        azul: '0 4px 24px rgba(13,59,140,0.35)',
      },
      keyframes: {
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        pulse2: { '0%, 100%': { boxShadow: '0 0 0 0 rgba(34,197,94,0.5)' }, '50%': { boxShadow: '0 0 0 12px rgba(34,197,94,0)' } },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
        'fade-in-up': 'fadeInUp 0.5s ease forwards',
        'scale-in': 'scaleIn 0.3s ease forwards',
        'pulse2': 'pulse2 2s infinite',
      },
    },
  },
  plugins: [],
}
