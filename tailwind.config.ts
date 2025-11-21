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
          950: '#082f49',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray.700'),
            '--tw-prose-headings': theme('colors.brand.900'),
            '--tw-prose-lead': theme('colors.gray.600'),
            '--tw-prose-links': theme('colors.brand.600'),
            '--tw-prose-bold': theme('colors.brand.900'),
            '--tw-prose-counters': theme('colors.brand.500'),
            '--tw-prose-bullets': theme('colors.brand.400'),
            '--tw-prose-hr': theme('colors.gray.200'),
            '--tw-prose-quotes': theme('colors.gray.700'),
            '--tw-prose-quote-borders': theme('colors.brand.400'),
            '--tw-prose-captions': theme('colors.gray.500'),
            '--tw-prose-code': theme('colors.brand.700'),
            '--tw-prose-pre-code': theme('colors.gray.100'),
            '--tw-prose-pre-bg': theme('colors.gray.900'),
            '--tw-prose-th-borders': theme('colors.brand.100'),
            '--tw-prose-td-borders': theme('colors.gray.100'),

            maxWidth: 'none',
            lineHeight: '1.8',
            
            // 段落
            p: {
              marginBottom: '1.5rem',
              textAlign: 'justify',
              letterSpacing: '0.025em',
            },

            // 標題
            'h1, h2, h3, h4, h5, h6': {
              fontWeight: '700',
              letterSpacing: '-0.025em',
              scrollMarginTop: '6rem',
            },
            h1: {
              fontSize: '2.25rem',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: `4px solid ${theme('colors.brand.100')}`,
              background: `linear-gradient(to right, ${theme('colors.brand.900')}, ${theme('colors.brand.700')})`,
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent',
            },
            h2: {
              marginTop: '3rem',
              marginBottom: '1.5rem',
              paddingLeft: '1rem',
              borderLeft: `4px solid ${theme('colors.brand.400')}`,
              background: `linear-gradient(to right, ${theme('colors.brand.50')} 0%, transparent 100%)`,
              padding: '0.5rem 1rem',
              borderRadius: '0 0.5rem 0.5rem 0',
            },
            h3: {
              marginTop: '2rem',
              marginBottom: '1rem',
              color: theme('colors.brand.700'),
              display: 'flex',
              alignItems: 'center',
              '&::before': {
                content: '"▶"',
                marginRight: '0.75rem',
                color: theme('colors.brand.500'),
                fontSize: '1rem',
              },
            },
            
            // 連結
            a: {
              textDecoration: 'none',
              borderBottom: `1px solid ${theme('colors.brand.200')}`,
              transition: 'all 0.2s ease',
              '&:hover': {
                color: theme('colors.brand.700'),
                borderBottomColor: theme('colors.brand.500'),
                backgroundColor: theme('colors.brand.50'),
              },
            },

            // 列表
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.75rem',
            },
            'ul > li::marker': {
              color: 'transparent', // 隱藏預設標記
            },
            'ul > li::before': {
              content: '"✓"',
              position: 'absolute',
              left: '0',
              top: '0',
              color: theme('colors.brand.500'),
              fontWeight: 'bold',
            },

            // 引用
            blockquote: {
              fontStyle: 'normal',
              borderLeftWidth: '4px',
              backgroundColor: 'rgba(240, 249, 255, 0.3)',
              padding: '1.5rem 2rem',
              borderRadius: '0 1rem 1rem 0',
              position: 'relative',
              '&::before': {
                content: '"“"',
                position: 'absolute',
                top: '-0.5rem',
                left: '0.5rem',
                fontSize: '4rem',
                color: theme('colors.brand.200'),
                fontFamily: 'serif',
                opacity: '0.4',
                lineHeight: '1',
              },
            },

            // 表格
            table: {
              width: '100%',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderCollapse: 'collapse',
              backgroundColor: 'white',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              borderRadius: '0.5rem',
              overflow: 'hidden',
            },
            thead: {
              backgroundColor: theme('colors.brand.50'),
            },
            th: {
              color: theme('colors.brand.900'),
              fontWeight: '600',
              padding: '1rem',
              textAlign: 'left',
            },
            td: {
              padding: '1rem',
              borderBottom: `1px solid ${theme('colors.gray.100')}`,
            },

            // 程式碼
            code: {
              backgroundColor: theme('colors.brand.50'),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
              '&::before': { content: 'none' },
              '&::after': { content: 'none' },
            },
            img: {
              borderRadius: '1rem',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
