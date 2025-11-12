'use client'

import JsonLd from './JsonLd'
import { structuredData } from '@/config'

/**
 * 結構化數據組件
 * 用於渲染網站的所有結構化數據
 */
export default function StructuredData() {
  return (
    <>
      {Object.values(structuredData).map((data, index) => (
        <JsonLd
          key={index}
          type={data.type}
          data={data.data}
        />
      ))}
    </>
  )
}
