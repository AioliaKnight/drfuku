import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const revalidate = false
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000',
          borderRadius: '22%',
        }}
      >
        痔
      </div>
    ),
    {
      ...size,
    }
  )
}
