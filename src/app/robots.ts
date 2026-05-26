import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = false

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
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
        '/_next/',
        '/*.json$',
        // 保留 sitemap.xml 供搜尋引擎讀取，不再全域封鎖 xml
      ],
    },
    sitemap: 'https://drfuku.com/sitemap.xml',
    host: 'https://drfuku.com'
  }
}
