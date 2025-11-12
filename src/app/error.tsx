'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { handleComponentError } from '@/shared/lib/error-tracking'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 報告錯誤到我們的錯誤追蹤系統
    handleComponentError(error, 'Global Error Boundary', {
      digest: error.digest,
      location: window.location.href
    })
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 text-center">
      <div className="rounded-full bg-red-100 p-3">
        <HiOutlineExclamationTriangle className="h-6 w-6 text-red-600" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900">
        很抱歉，發生了一些錯誤
      </h1>

      <p className="max-w-md text-gray-600">
        我們已經記錄了這個問題，並會盡快修復。
        您可以嘗試重新載入頁面，或返回首頁。
      </p>

      {error.digest && (
        <p className="text-sm text-gray-500">
          錯誤代碼：{error.digest}
        </p>
      )}

      <div className="flex space-x-4">
        <button
          onClick={reset}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          重試
        </button>

        <Link
          href="/"
          className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          返回首頁
        </Link>
      </div>
    </div>
  )
}
