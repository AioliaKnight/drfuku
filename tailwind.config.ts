import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.8',
            letterSpacing: '0.02em',
            'h1, h2, h3, h4, h5, h6': {
              color: '#111827',
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            p: {
              marginBottom: '1.5rem',
              textAlign: 'justify',
              lineHeight: '2',
              letterSpacing: '0.05em',
            },
            a: {
              color: '#0284c7',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#0369a1',
                textDecoration: 'underline',
              },
            },
            strong: {
              color: '#111827',
              fontWeight: '700',
            },
            code: {
              color: '#0284c7',
              backgroundColor: '#f0f9ff',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.9em',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              overflow: 'auto',
            },
            blockquote: {
              borderLeftColor: '#0ea5e9',
              borderLeftWidth: '4px',
              backgroundColor: 'rgba(240, 249, 255, 0.5)',
              padding: '1rem 1.5rem',
              margin: '2rem 0',
              fontStyle: 'italic',
              borderRadius: '0 0.5rem 0.5rem 0',
            },
            'ul, ol': {
              margin: '1.5rem 0',
            },
            li: {
              marginBottom: '0.75rem',
              lineHeight: '1.8',
            },
            img: {
              borderRadius: '1rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              margin: '2rem auto',
            },
            table: {
              fontSize: '0.95rem',
              lineHeight: '1.6',
            },
            th: {
              backgroundColor: '#f9fafb',
              color: '#111827',
              fontWeight: '600',
              padding: '1rem 1.5rem',
              textAlign: 'left',
            },
            td: {
              color: '#374151',
              padding: '1rem 1.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
