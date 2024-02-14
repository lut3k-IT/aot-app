/** @type {import('tailwindcss').Config} */

const BASE = 16;
const rem = (px, key = px) => ({ [key]: `${px / BASE}rem` });

module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '425px',
      '2sm': '560px',
      md: '768px',
      '2md': '834px',
      lg: '1024px',
      '2lg': '1280px',
      xl: '1440px',
      '2xl': '2560px'
    },
    container: {
      center: true,
      padding: '2rem'
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        muted2: {
          DEFAULT: 'hsl(var(--muted2))',
          foreground: 'hsl(var(--muted2-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        }
      },
      spacing: {
        ...rem(52, '13'),
        ...rem(108, '27'),
        ...rem(16, 'page-mobile'),
        ...rem(24, 'page-desktop'),
        ...rem(84, 'body-start'),
        ...rem(102, 'body-pad-start'),
        ...rem(64, 'body-end'),
        ...rem(80, 'body-pad-end')
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      boxShadow: {
        'panel-bottom-bg': '0px 0px 6px 6px hsl(var(--background))',
        'panel-bottom-card': '0px 0px 6px 6px hsl(var(--card))'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
