import { Inter, Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google'

// 思源黑體
export const notoSansTC = Noto_Sans_TC({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true
})

// 思源宋體
export const notoSerifTC = Noto_Serif_TC({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-serif',
  preload: true,
  fallback: ['georgia', 'times new roman'],
  adjustFontFallback: true
})

// Inter 字體
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true
})

// 字體變量類名
export const fontVariables = `${notoSansTC.variable} ${notoSerifTC.variable} ${inter.variable}`
