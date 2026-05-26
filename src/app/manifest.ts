import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = false

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '阿福醫師-大腸直腸外科徐彥勳',
    short_name: '阿福醫師',
    description: '大腸直腸外科專科醫師徐彥勳（阿福醫師）專精痔瘡微創手術、肛門與大腸直腸疾病診療，在台北、台中提供專業診療服務。採用先進微創技術，免開刀、恢復快、術後不復發。重視隱私、專業保密。',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0ea5e9',
    categories: ['medical', 'health', 'healthcare', 'doctor', 'clinic'],
    orientation: 'portrait',
    prefer_related_applications: false,
    lang: 'zh-TW',
    dir: 'ltr',
    scope: '/',
    id: '/',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
