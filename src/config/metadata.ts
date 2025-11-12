import type { Metadata } from 'next'
import { SITE, DOCTOR, ENV, KEYWORDS } from './constants'

// 網站元數據
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: `%s | ${SITE.name}`,
    default: `${SITE.name} | 專業痔瘡治療・安心舒適就醫`
  },
  description: SITE.description,
  keywords: [
    ...KEYWORDS.primary,
    ...KEYWORDS.symptoms.slice(0, 5),
    ...KEYWORDS.treatments.slice(0, 5),
    ...KEYWORDS.clinic.slice(0, 3)
  ],
  authors: [{ name: DOCTOR.alternateName, url: DOCTOR.url }],
  creator: DOCTOR.alternateName,
  publisher: SITE.name,
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true
  },
  alternates: {
    canonical: SITE.url
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    title: `${SITE.name} | 專業痔瘡治療・安心舒適就醫`,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: `${SITE.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | 專業痔瘡治療・安心舒適就醫`,
    description: SITE.description,
    images: [`${SITE.url}/og-image.jpg`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: ENV.googleSiteVerification,
    other: {
      'facebook-domain-verification': ENV.fbDomainVerification
    }
  }
}
