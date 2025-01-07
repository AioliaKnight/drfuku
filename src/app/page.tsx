import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'
import BlogSection from '@/components/BlogSection'

export const metadata: Metadata = {
  title: '徐彥勳大腸直腸外科 | 台北台中痔瘡治療權威醫師',
  description: '徐彥勳醫師專精於痔瘡微創手術、肛門疾病治療，在台北、台中提供專業診療服務。採用先進微創技術，免開刀、恢復快、術後不復發。提供內痔、外痔、混合痔、血栓痔、肛裂、肛瘻等治療，重視隱私、專業保密。',
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
    canonical: 'https://hsucliniccare.com/',
  },
  openGraph: {
    title: '徐彥勳大腸直腸外科 | 台北台中痔瘡治療權威醫師',
    description: '徐彥勳醫師專精於痔瘡微創手術、肛門疾病治療，在台北、台中提供專業診療服務。採用先進微創技術，免開刀、恢復快、術後不復發。提供內痔、外痔、混合痔、血栓痔、肛裂、肛瘻等治療，重視隱私、專業保密。',
    url: 'https://hsucliniccare.com/',
    siteName: '徐彥勳大腸直腸外科',
    locale: 'zh_TW',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '徐彥勳醫師 - 台北台中痔瘡治療權威醫師',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '徐彥勳大腸直腸外科 | 台北台中痔瘡治療權威醫師',
    description: '徐彥勳醫師專精於痔瘡微創手術、肛門疾病治療，提供台北、台中地區專業的痔瘡與肛門疾病診療服務。採用微創技術，術後恢復快、不復發。',
    images: ['/opengraph-image.png'],
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
      <div className="relative bg-gradient-to-b from-brand-100 via-brand-50 to-white">
        <Hero />
      </div>

      {/* About Section */}
      <div className="relative bg-gradient-to-b from-white via-neutral-50 to-neutral-100">
        <AboutSection />
      </div>

      {/* Services Section */}
      <div className="relative bg-gradient-to-b from-neutral-100 via-medical-50 to-medical-100">
        <ServicesSection />
      </div>

      {/* Blog Section */}
      <div className="relative bg-gradient-to-b from-medical-100 via-neutral-50 to-white">
        <BlogSection />
      </div>

      {/* Testimonials Section */}
      <div className="relative bg-gradient-to-b from-white via-neutral-50 to-neutral-100">
        <TestimonialsSection />
      </div>

      {/* FAQ Section */}
      <div className="relative bg-gradient-to-b from-neutral-100 via-brand-50 to-brand-100">
        <FAQSection />
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-b from-brand-100 via-brand-50 to-white">
        <CTASection />
      </div>
    </main>
  )
}
