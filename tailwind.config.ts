import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        progress: 'progress 30s linear',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        progress: {
          '0%': { transform: 'scale(0.0001, 1)' },
          '100%': { transform: 'scale(1, 1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config

