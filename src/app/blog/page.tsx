import { Metadata } from 'next'
import { BlogPageContent } from '@/modules/blog'

// Server component for metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://hsucliniccare.com'),
  title: '醫療知識部落格 | 痔瘡治療與保健資訊',
  description: '探索痔瘡治療、術後照護及預防保健的最新資訊與專業見解。專業醫師分享實用的醫療知識，幫助您維護健康。',
  openGraph: {
    title: '醫療知識部落格 | 痔瘡治療與保健資訊',
    description: '探索痔瘡治療、術後照護及預防保健的最新資訊與專業見解。專業醫師分享實用的醫療知識，幫助您維護健康。',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
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
}

export default function BlogPage() {
  return <BlogPageContent />
}
