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
        '/*.xml$',
      ],
    },
    sitemap: 'https://hsucliniccare.com/sitemap.xml',
    host: 'https://hsucliniccare.com'
  }
}
