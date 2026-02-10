import { Metadata } from 'next'
import { Suspense } from 'react'
import { BlogPageContent } from '@/modules/blog'
import { SITE, ASSETS, KEYWORDS, DOCTOR } from '@/config/constants'
import JsonLd from '@/shared/components/common/JsonLd'

// Server component for metadata
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: '醫療知識部落格 | 痔瘡治療與保健資訊',
  description: '探索痔瘡治療、術後照護及預防保健的最新資訊與專業見解。專業醫師分享實用的醫療知識，幫助您維護健康。',
  keywords: [
    ...KEYWORDS.primary.slice(0, 4),
    ...KEYWORDS.prevention.slice(0, 4),
    ...KEYWORDS.treatments.slice(0, 4)
  ],
  authors: [{ name: DOCTOR.alternateName, url: DOCTOR.url }],
  openGraph: {
    title: '醫療知識部落格 | 痔瘡治療與保健資訊',
    description: '探索痔瘡治療、術後照護及預防保健的最新資訊與專業見解。專業醫師分享實用的醫療知識，幫助您維護健康。',
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
    title: '醫療知識部落格 | 痔瘡治療與保健資訊',
    description: '探索痔瘡治療、術後照護及預防保健的最新資訊與專業見解。專業醫師分享實用的醫療知識，幫助您維護健康。',
    images: [new URL(ASSETS.ogImage, SITE.url).toString()]
  },
  alternates: {
    canonical: `${SITE.url}/blog`,
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
  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: SITE.url },
    { '@type': 'ListItem' as const, position: 2, name: '部落格', item: `${SITE.url}/blog` }
  ]

  return (
    <>
      <JsonLd
        type="BreadcrumbList"
        data={{
          '@type': 'BreadcrumbList',
          name: '部落格',
          itemListElement: breadcrumbItems
        }}
      />
      <Suspense fallback={<div className="min-h-screen bg-linear-to-b from-gray-50 to-white" />}>
        <BlogPageContent />
      </Suspense>
    </>
  )
}
