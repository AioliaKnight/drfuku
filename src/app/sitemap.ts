import { MetadataRoute } from 'next'
import { posts as allPosts } from '@/velite'
import { SITE } from '@/config/constants'
import { buildCanonicalUrl } from '@/shared/lib/page-metadata'

export const dynamic = 'force-static'
export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedPosts = allPosts.filter((post) => !post.draft)

  // 取最新文章更新時間作為全站內容基準，避免無意義變動
  const latestPostTimestamp = publishedPosts.reduce((latest, post) => {
    const t = new Date(post.updatedAt || post.publishedAt).getTime()
    return t > latest ? t : latest
  }, new Date('2026-08-09').getTime())
  const latestSiteDate = new Date(latestPostTimestamp).toISOString()

  const staticRoutes: Array<{
    path: string
    priority: number
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  }> = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' },
    { path: '/hemorrhoid-surgery/', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/services/', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/blog/', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/faq/', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/about/', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/consultation/', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/testimonials/', priority: 0.7, changeFrequency: 'monthly' },
  ]

  const routes = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: buildCanonicalUrl(path),
    lastModified: latestSiteDate,
    changeFrequency,
    priority,
  }))

  // 部落格文章：確保結尾斜線與 trailingSlash: true 完全一致
  const blogPosts = publishedPosts.map((post) => ({
    url: buildCanonicalUrl(post.seo?.canonical || `${SITE.url}/blog/${post.slug}/`),
    lastModified: new Date(post.updatedAt || post.publishedAt).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...blogPosts]
}

