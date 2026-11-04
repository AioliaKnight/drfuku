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
 * JSON-LD 結構化數據組件（Server-First 原生輸出）
 * 直接在靜態 HTML 中輸出標準 <script type="application/ld+json">，
 * 確保 Googlebot、Bingbot、AI 搜尋爬蟲（GPTBot / PerplexityBot / ClaudeBot）無需執行客戶端 JS 即可完整解析。
 * @see https://nextjs.org/docs/app/guides/json-ld
 */
export default function JsonLd({ type, data }: JsonLdProps) {
  if (process.env.NODE_ENV === 'development') {
    if (!isValidStructuredData(data)) {
      console.warn(
        `[JsonLd] 結構化數據驗證失敗：缺少必要屬性 (@type 或 name)`,
        { type, data }
      )
    }
  }

  const jsonString = JSON.stringify({
    '@context': 'https://schema.org',
    ...data,
  }).replace(/</g, '\\u003c')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  )
}

