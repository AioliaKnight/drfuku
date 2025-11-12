'use client'

import { FallbackProps } from 'react-error-boundary'

export default function ErrorFallback({ error }: FallbackProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-xl font-bold text-red-500">
        很抱歉，發生了一些錯誤
      </h2>
      <p className="text-center text-gray-600">
        我們已經記錄了這個問題，並會盡快修復。
        <br />
        請稍後再試。
      </p>
      {process.env.NODE_ENV === 'development' && (
        <pre className="mt-4 max-w-full overflow-auto rounded bg-gray-100 p-4 text-sm">
          {error.message}
        </pre>
      )}
    </div>
  )
}
