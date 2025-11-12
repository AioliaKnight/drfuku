'use client'

import Script from 'next/script'
import type { JsonLdType, StructuredDataTypeMap, Thing } from '@/config/types'

type JsonLdProps = {
  type: JsonLdType
  data: StructuredDataTypeMap[JsonLdType]
}

/**
 * 驗證結構化數據是否符合基本要求
 * @param data 結構化數據
 * @returns 是否有效
 */
function isValidStructuredData(data: Thing): boolean {
  return (
    typeof data === 'object' &&
    data !== null &&
    '@type' in data &&
    typeof data['@type'] === 'string' &&
    'name' in data &&
    typeof data.name === 'string'
  )
}

/**
 * JSON-LD 結構化數據組件
 * 用於向頁面添加結構化數據，以提升搜索引擎對網站內容的理解
 * @see https://schema.org/
 * @see https://developers.google.com/search/docs/advanced/structured-data
 */
export default function JsonLd({ type, data }: JsonLdProps) {
  // 在開發環境下進行數據驗證
  if (process.env.NODE_ENV === 'development') {
    if (!isValidStructuredData(data)) {
      console.warn(
        `[JsonLd] 結構化數據驗證失敗：缺少必要屬性 (@type 或 name)`,
        { type, data }
      )
    }
  }

  return (
    <Script
      id={`jsonld-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          ...data
        })
      }}
      strategy="afterInteractive"
    />
  )
}
