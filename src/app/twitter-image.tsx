import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const revalidate = false
export const alt = '痔瘡醫生'
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
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        痔瘡醫生
      </div>
    ),
    {
      ...size,
    }
  )
}
