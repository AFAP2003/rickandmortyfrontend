import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'background-active': 'var(--background-active)',
        'background-inactive': 'var(--background-inactive)',
        'dark-primary': 'var(--dark-primary)',
        'light-background': 'var(--light-background)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        'dashboard-header': '0 1px 2px 0 rgba(0, 0, 0, 0.17)',
        default: '0 2px 6px 0 rgba(28, 29, 29, 0.25)'
      }
    }
  },
  safelist: [
    // Status colors - background
    'bg-green-500',
    'bg-red-500',
    'bg-gray-500',
    // Status colors - text
    'text-green-400',
    'text-red-400',
    'text-gray-400',
    // Status colors - shadows
    'shadow-[0_0_8px_rgba(34,197,94,1)]',
    'shadow-[0_0_8px_rgba(239,68,68,1)]',
    'shadow-[0_0_8px_rgba(156,163,175,1)]',
  ],
  plugins: [
    require('tailwindcss-animate'),
    require('daisyui'),
    require('flowbite/plugin')
  ]
} satisfies Config