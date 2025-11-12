'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { handleComponentError } from '@/shared/lib/error-tracking'

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function BlogError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 統一錯誤回報
    handleComponentError(error, 'Blog Error Boundary', {
      location: window.location.href
    })
    console.error('Blog Error:', error)
  }, [error])

  return (
    <main className="relative min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-max">
          <div className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-brand-600 sm:text-5xl">文章載入錯誤</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-neutral-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
                  無法載入文章內容
                </h1>
                <p className="mt-4 text-base text-neutral-500">
                  很抱歉，在載入文章時發生了問題。這可能是暫時性的錯誤，請稍後再試。
                </p>
              </div>
              <div className="mt-8 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <button
                  onClick={reset}
                  className="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  重新載入
                </button>
                <Link
                  href="/blog"
                  className="inline-flex items-center rounded-md bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-100"
                >
                  返回文章列表
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
