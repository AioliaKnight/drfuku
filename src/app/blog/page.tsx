import { Metadata } from 'next'
import { Suspense } from 'react'
import { posts as allPosts } from '@/velite'
import { BlogPageContent } from '@/modules/blog'
import { SITE, KEYWORDS } from '@/config/constants'
import JsonLd from '@/shared/components/common/JsonLd'
import { createPageMetadata } from '@/shared/lib/page-metadata'

export const metadata: Metadata = createPageMetadata({
  title: '醫療知識部落格 | 痔瘡治療與保健資訊',
  description:
    '探索痔瘡治療、術後照護及預防保健的最新資訊與專業見解。20年大腸直腸外科專科徐彥勳醫師（阿福醫師）分享實證醫療知識，幫助您維護腸道健康。',
  path: '/blog/',
  keywords: [
    ...KEYWORDS.primary.slice(0, 4),
    ...KEYWORDS.prevention.slice(0, 4),
    ...KEYWORDS.treatments.slice(0, 4),
  ],
})

export default function BlogPage() {
  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: `${SITE.url}/` },
    { '@type': 'ListItem' as const, position: 2, name: '部落格', item: `${SITE.url}/blog/` }
  ]

  // ItemList 結構化資料：讓 Google 以 Carousel 呈現文章列表
  const publishedPosts = allPosts
    .filter(post => !post.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  const itemListElements = publishedPosts.map((post, index) => ({
    '@type': 'ListItem' as const,
    position: index + 1,
    name: post.title,
    url: `${SITE.url}/blog/${post.slug}/`,
  }))

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
      {itemListElements.length > 0 && (
        <JsonLd
          type="ItemList"
          data={{
            '@type': 'ItemList',
            name: '醫療知識部落格',
            description: '阿福醫師（徐彥勳）的專業醫療衛教文章',
            numberOfItems: itemListElements.length,
            itemListElement: itemListElements,
          }}
        />
      )}
      <Suspense fallback={<div className="min-h-screen bg-linear-to-b from-gray-50 to-white" />}>
        <BlogPageContent />
      </Suspense>
    </>
  )
}

