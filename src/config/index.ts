export * from './fonts'
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
