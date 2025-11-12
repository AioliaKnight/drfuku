'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { trackPageView } from '@/shared/lib/analytics'
import { config } from '@/config'

const GTM_ID = config.gtm.id

export default function GoogleTagManager() {
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    const title = document.title || pathname.split('/').pop() || '痔瘡醫生'
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''

    trackPageView({
      title,
      description,
      url
    })
  }, [pathname, searchParams, isMounted])

  if (!isMounted || !GTM_ID) return null

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
