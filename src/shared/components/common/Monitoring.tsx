'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { initPerformanceMonitoring, getPerformanceMonitoringScript } from '@/shared/lib/performance'
import { initErrorTracking } from '@/shared/lib/error-tracking'
import GoogleTagManager from '@/shared/components/analytics/GoogleTagManager'

export default function Monitoring() {
  useEffect(() => {
    initPerformanceMonitoring()
    initErrorTracking()
  }, [])

  return (
    <>
      <GoogleTagManager />
      <Script
        id="performance-monitoring"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getPerformanceMonitoringScript()
        }}
      />
    </>
  )
}
