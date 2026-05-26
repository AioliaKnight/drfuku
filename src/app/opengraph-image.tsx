import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const revalidate = false
export const alt = '阿福醫師-大腸直腸外科徐彥勳 | 痔瘡微創手術・專業安心'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 30%, #bae6fd 60%, #7dd3fc 100%)',
          fontFamily: '"Noto Sans TC", sans-serif',
          position: 'relative',
        }}
      >
        {/* 裝飾背景 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #0ea5e9, #38bdf8, #0ea5e9)',
          }}
        />

        {/* 主要內容 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* 醫師名稱 */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#0c4a6e',
              letterSpacing: '-0.02em',
            }}
          >
            阿福醫師
          </div>

          {/* 副標題 */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: '#0369a1',
            }}
          >
            大腸直腸外科 徐彥勳醫師
          </div>

          {/* 分隔線 */}
          <div
            style={{
              width: '120px',
              height: '3px',
              background: '#0ea5e9',
              borderRadius: '2px',
              margin: '8px 0',
            }}
          />

          {/* 標語 */}
          <div
            style={{
              fontSize: 28,
              color: '#475569',
              fontWeight: 400,
            }}
          >
            痔瘡微創手術 ・ 專業診療 ・ 安心就醫
          </div>

          {/* 網站 */}
          <div
            style={{
              fontSize: 20,
              color: '#94a3b8',
              marginTop: '12px',
            }}
          >
            drfuku.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
