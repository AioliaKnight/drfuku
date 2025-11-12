import './globals.css'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google'

import ErrorFallback from '@/shared/components/common/ErrorFallback'
import Monitoring from '@/shared/components/common/Monitoring'
import StructuredData from '@/shared/components/common/StructuredData'
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
          <Suspense>
            <Monitoring />
          </Suspense>
          <Header />
          <main>{children}</main>
          <Footer />
          <StructuredData />
        </ErrorBoundary>
      </body>
    </html>
  )
}
