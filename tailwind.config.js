/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0052FF',
          hover: '#0046DB',
          light: '#E8EFFF',
        },
        navy: {
          DEFAULT: '#0F172A',
          dark: '#1A202C',
        },
        gray: {
          label: '#64748B',
          border: '#D1D5DB',
          muted: '#94A3B8',
          hint: '#9CA3AF',
        },
        surface: {
          DEFAULT: '#F8F9FB',
          card: '#FFFFFF',
          summary: '#F3F4F6',
        },
        success: {
          DEFAULT: '#16A34A',
          light: '#DCFCE7',
        },
        error: '#EF4444',
        accent: '#FF6B4A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(15, 23, 42, 0.08)',
        modal: '0 20px 60px rgba(15, 23, 42, 0.15)',
      },
      borderRadius: {
        card: '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
