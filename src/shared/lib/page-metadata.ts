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
 * 產生各行銷頁一致的 Metadata（canonical、OG、Twitter）
 */
export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  openGraphType = 'website',
}: PageMetadataInput): Metadata {
  const canonical = `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
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
  }
}
