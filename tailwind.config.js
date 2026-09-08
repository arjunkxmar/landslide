/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#070b14',
          card: '#0e172a',
          lighter: '#16223d'
        },
        risk: {
          low: '#10b981',      // Emerald Green
          moderate: '#f59e0b', // Amber Yellow
          high: '#f97316',     // Orange
          critical: '#ef4444'  // Crimson Red
        },
        accent: {
          blue: '#3b82f6',
          cyan: '#06b6d4',
          teal: '#14b8a6',
          purple: '#8b5cf6'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radar 4s linear infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(239, 68, 68, 0.4)' },
          '100%': { boxShadow: '0 0 25px rgba(239, 68, 68, 0.8)' }
        }
      }
    },
  },
  plugins: [],
}
