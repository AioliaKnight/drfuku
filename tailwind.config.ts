import type { Config } from 'tailwindcss'

/**
 * Tailwind CSS v4 配置
 *
 * v4 架構分層：
 * - globals.css @theme   → 色彩、字體等設計 token
 * - globals.css @plugin  → 載入 typography 外掛
 * - 此檔案              → 僅用於 typography 外掛 CSS 變數覆寫（無法在 CSS 中表達）
 * - prose.ts             → 文章結構性樣式（Tailwind utilities）
 *
 * v4 自動偵測 content，不需要手動指定。
 */
const config: Config = {
  theme: {
    extend: {
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            // Typography 外掛色彩變數覆寫
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

            // 移除 code 前後引號（typography 預設行為）
            code: {
              '&::before': { content: 'none' },
              '&::after': { content: 'none' },
            },
          },
        },
      }),
    },
  },
}

export default config
