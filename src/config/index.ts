// fonts.ts 不透過 barrel re-export（Next.js font loader 限制）
// 字體直接在 layout.tsx 中定義使用
export * from './metadata'
export * from './structured-data'
export * from './constants'
export * from './types'

// 從常量文件導入配置
import {
  SITE,
  DOCTOR,
  CLINIC,
  DISEASE,
  ENV,
  KEYWORDS,
  ASSETS
} from './constants'

// 導出配置對象
export const config = {
  site: SITE,
  doctor: DOCTOR,
  clinic: CLINIC,
  disease: DISEASE,
  env: ENV,
  keywords: KEYWORDS,
  assets: ASSETS,
  gtm: {
    id: ENV.gtmId
  }
} as const
