import type { Metadata } from 'next'

import { ASSETS, DOCTOR, KEYWORDS, SITE } from '@/config/constants'

type PageMetadataInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  openGraphType?: 'website' | 'profile' | 'article'
}

/**
 * 將網站路徑或網址正規化為與 next.config.mjs (trailingSlash: true) 一致的標準網址
 */
export function buildCanonicalUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl.endsWith('/') ? pathOrUrl : `${pathOrUrl}/`
  }
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  const normalizedPath = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`
  return `${SITE.url}${normalizedPath}`
}

/**
 * 產生各頁面一致的 Metadata（canonical、OG、Twitter、Robots）
 */
export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  openGraphType = 'website',
}: PageMetadataInput): Metadata {
  const canonical = buildCanonicalUrl(path)
  const resolvedKeywords = keywords ?? [
    ...KEYWORDS.primary.slice(0, 6),
    ...KEYWORDS.clinic.slice(0, 4),
  ]

  const ogImage = {
    url: new URL(ASSETS.ogImage, SITE.url).toString(),
    width: 1200,
    height: 630,
    alt: SITE.name,
  }

  const twitterImage = new URL(ASSETS.twitterImage, SITE.url).toString()

  return {
    title,
    description,
    keywords: resolvedKeywords,
    authors: [{ name: DOCTOR.alternateName, url: DOCTOR.url }],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: openGraphType,
      url: canonical,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [twitterImage],
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
}

