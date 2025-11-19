/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://drfuku.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'out',
  exclude: [
    '/404',
    '/500',
    '/offline',
    '/_*',
    '/manifest.*',
    '/robots.txt',
    '/sitemap*.xml',
    '/icon.png',
    '/*.webmanifest'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://drfuku.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // 移除尾部斜線
    const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;

    // 首頁
    if (cleanPath === '') {
      return {
        loc: 'https://drfuku.com/',
        lastmod: new Date().toISOString(),
      }
    }

    // 部落格文章
    if (cleanPath.startsWith('/blog')) {
      return {
        loc: `https://drfuku.com${cleanPath}`,
        lastmod: new Date().toISOString(),
      }
    }

    // 其他頁面
    return {
      loc: `https://drfuku.com${cleanPath}`,
      lastmod: new Date().toISOString(),
    }
  },
}
