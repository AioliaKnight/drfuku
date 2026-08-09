import './globals.css'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google'

import ErrorFallback from '@/shared/components/common/ErrorFallback'
import Monitoring from '@/shared/components/common/Monitoring'
import StructuredData from '@/shared/components/common/StructuredData'
import StickyMobileBottomBar from '@/shared/components/common/StickyMobileBottomBar'
import Footer from '@/shared/components/Footer'
import Header from '@/shared/components/Header'
import { metadata as metadataConfig } from '@/config/metadata'

// 配置字體
const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
})

const notoSerifTC = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  ...metadataConfig,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className={`${notoSansTC.variable} ${notoSerifTC.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/png"
        />
      </head>
      <body className={notoSansTC.className}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {/* Skip-to-content: 鍵盤用戶可快速跳至主要內容 */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-9999 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
          >
            跳至主要內容
          </a>
          <Suspense>
            <Monitoring />
          </Suspense>
          <Header />
          <main id="main-content" className="pt-[var(--header-height)] md:pt-[var(--header-height-md)] pb-16 md:pb-0">
            {children}
          </main>
          <Footer />
          <StickyMobileBottomBar />
          <StructuredData />
        </ErrorBoundary>
      </body>
    </html>
  )
}
