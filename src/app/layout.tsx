import './globals.css'
import { Inter, Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

const inter = Inter({ subsets: ['latin'] })

const notoSansTC = Noto_Sans_TC({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-tc',
  display: 'swap',
})

const notoSerifTC = Noto_Serif_TC({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-serif-tc',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | 痔瘡醫生',
    default: '痔瘡醫生 - 專業醫療資訊平台',
  },
  description: '專業痔瘡診療與保健資訊，提供完整的痔瘡治療建議和預防方法。',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hemorrhoid-doctor.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    siteName: '痔瘡醫生',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '痔瘡醫生 - 專業醫療資訊平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className={`${notoSansTC.variable} ${notoSerifTC.variable}`}>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  )
}
