import { MetadataRoute } from 'next'
import { SITE } from '@/config/constants'

export const dynamic = 'force-static'
export const revalidate = false

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/', '/_next/image/'],
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/dashboard/',
          '/login/',
          '/logout/',
          '/register/',
          '/reset-password/',
          '/verify-email/',
          '/404/',
          '/500/',
          '/_next/data/',
        ],
      },
      {
        // 允許 AI 搜尋引擎與生成式引擎 (GEO: Generative Engine Optimization) 索引衛教與醫師權威資訊
        userAgent: [
          'Googlebot',
          'Google-Extended',
          'Bingbot',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Applebot',
        ],
        allow: ['/', '/_next/static/', '/_next/image/'],
        disallow: ['/api/', '/admin/', '/private/'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}

