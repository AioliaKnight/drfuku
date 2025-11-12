import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-max">
          <div className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-brand-600 sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-neutral-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
                  找不到頁面
                </h1>
                <p className="mt-4 text-base text-neutral-500">
                  很抱歉，您要找的頁面不存在或已被移除。
                </p>
              </div>
              <div className="mt-8 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  返回首頁
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center rounded-md bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-100"
                >
                  瀏覽文章
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
