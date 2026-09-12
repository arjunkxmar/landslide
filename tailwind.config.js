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
        dark: {
          950: '#050505',
          900: '#080808',
          850: '#0D0D0D',
          card: '#111111',
          cardHover: '#151515',
          cardBorder: '#1A1A1A',
          borderSubtle: '#262626',
          borderMuted: '#333333'
        },
        surface: {
          base: '#050505',
          raised: '#080808',
          card: '#111111',
          panel: '#151515',
          border: '#1A1A1A'
        },
        risk: {
          low: '#10B981',      // Low Risk (Green)
          moderate: '#F59E0B', // Moderate Risk (Yellow/Amber)
          high: '#F97316',     // High Risk (Orange)
          critical: '#EF4444'  // Critical Risk (Red)
        },
        accent: {
          cyan: '#06B6D4',
          sky: '#38BDF8',
          blue: '#3B82F6',
          teal: '#14B8A6',
          purple: '#8B5CF6'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radar 4s linear infinite',
        'glow-pulse': 'glow 2.5s ease-in-out infinite alternate',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(239, 68, 68, 0.7)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      }
    },
  },
  plugins: [],
}

