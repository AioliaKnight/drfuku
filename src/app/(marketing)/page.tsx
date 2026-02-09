import type { Metadata } from 'next'

import {
  HeroSection as Hero,
  AboutSection,
  ServicesSection,
  BlogSection,
  FAQSection,
  CTASection,
  TestimonialsSection
} from '@/modules/marketing'
import { SITE, ASSETS } from '@/config/constants'

export const dynamic = 'force-static'
export const revalidate = false

export const metadata: Metadata = {
  metadataBase: new URL('https://drfuku.com'),
  title: '阿福醫師-大腸直腸外科徐彥勳 | 台北台中大腸直腸外科・痔瘡治療',
  description: '大腸直腸外科專科醫師徐彥勳（阿福醫師）專精痔瘡微創手術、肛門與大腸直腸疾病診療，在台北、台中提供專業診療服務。採用先進微創技術，免開刀、恢復快、術後不復發。重視隱私、專業保密。',
  keywords: [
    '痔瘡醫生推薦',
    '痔瘡權威醫師',
    '台北痔瘡診所',
    '台中痔瘡醫院',
    '痔瘡手術推薦',
    '痔瘡開刀費用',
    '痔瘡手術價格',
    '痔瘡治療方法',
    '痔瘡手術權威',
    '痔瘡醫生評價',
    '痔瘡手術後遺症',
    '痔瘡手術恢復期',
    '痔瘡手術推薦醫師',
    '痔瘡手術診所推薦',
    '台北痔瘡醫生推薦',
    '台中痔瘡醫生推薦',
    '內痔治療',
    '外痔治療',
    '混合痔治療',
    '血栓痔瘡',
    '肛裂治療',
    '肛瘻治療',
    '微創痔瘡手術',
    '無痛痔瘡手術',
    '免開刀痔瘡治療',
    '痔瘡術後照護',
    '痔瘡手術費用',
    '痔瘡保險給付',
    '痔瘡醫師諮詢'
  ].join(', '),
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: '阿福醫師-大腸直腸外科徐彥勳 | 台北台中大腸直腸外科・痔瘡治療',
    description: '大腸直腸外科專科醫師徐彥勳（阿福醫師）專精痔瘡微創手術、肛門與大腸直腸疾病診療，在台北、台中提供專業診療服務。採用先進微創技術，免開刀、恢復快、術後不復發。',
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: 'website',
    images: [
      {
        url: new URL(ASSETS.ogImage, SITE.url).toString(),
        width: 1200,
        height: 630,
        alt: SITE.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '阿福醫師-大腸直腸外科徐彥勳 | 台北台中大腸直腸外科・痔瘡治療',
    description: '大腸直腸外科專科醫師徐彥勳（阿福醫師）專精痔瘡微創手術與大腸直腸疾病診療，台北、台中地區專業診療服務。',
    images: [new URL(ASSETS.twitterImage, SITE.url).toString()]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  other: {
    'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION || '',
  },
}

export default function Home() {
  return (
    <main className="relative bg-white">
      {/* Hero Section */}
      <div className="relative bg-linear-to-b from-brand-100 via-brand-50 to-white">
        <Hero />
      </div>

      {/* About Section */}
      <div className="relative bg-linear-to-b from-white via-neutral-50 to-neutral-100">
        <AboutSection />
      </div>

      {/* Services Section */}
      <div className="relative bg-linear-to-b from-neutral-100 via-brand-50 to-brand-100">
        <ServicesSection />
      </div>

      {/* Blog Section */}
      <div className="relative bg-linear-to-b from-brand-100 via-neutral-50 to-white">
        <BlogSection />
      </div>

      {/* Testimonials Section */}
      <div className="relative bg-linear-to-b from-white via-neutral-50 to-neutral-100">
        <TestimonialsSection />
      </div>

      {/* FAQ Section */}
      <div className="relative bg-linear-to-b from-neutral-100 via-brand-50 to-brand-100">
        <FAQSection />
      </div>

      {/* CTA Section */}
      <div className="relative bg-linear-to-b from-brand-100 via-brand-50 to-white">
        <CTASection />
      </div>
    </main>
  )
}
