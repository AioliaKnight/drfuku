import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import Link from 'next/link'
import {
  HiOutlineClock,
  HiOutlineTag,
  HiOutlineUser,
  HiOutlineChevronRight,
  HiOutlineCalendarDays,
} from 'react-icons/hi2'

interface PostHeaderProps {
  title: string
  author: string
  publishedAt: string
  readingTime: number
  category: string
  tags: string[]
}

export default function PostHeader({
  title,
  author,
  publishedAt,
  readingTime,
  category,
  tags,
}: PostHeaderProps) {
  return (
    <div className="relative z-10 -mt-48 sm:-mt-56 md:-mt-64">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* 背景卡片 */}
          <div className="rounded-2xl bg-white/95 backdrop-blur-lg p-6 shadow-xl ring-1 ring-black/5 sm:p-8 md:p-10 lg:p-12">
            {/* 麵包屑導航 */}
            <nav
              aria-label="breadcrumb"
              className="mb-5 flex items-center gap-1.5 text-sm text-gray-400"
            >
              <Link
                href="/"
                className="transition-colors hover:text-brand-600"
              >
                首頁
              </Link>
              <HiOutlineChevronRight className="h-3.5 w-3.5" />
              <Link
                href="/blog"
                className="transition-colors hover:text-brand-600"
              >
                部落格
              </Link>
              <HiOutlineChevronRight className="h-3.5 w-3.5" />
              <span className="text-brand-600 font-medium truncate max-w-[200px]">
                {category}
              </span>
            </nav>

            {/* 分類標籤 */}
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-brand-100/80 px-3 py-1.5 text-sm font-semibold text-brand-800">
                {category}
              </span>
            </div>

            {/* 標題 */}
            <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {title}
            </h1>

            {/* 元數據 */}
            <div className="flex flex-wrap items-center gap-4 text-gray-500 border-t border-gray-100 pt-6 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <HiOutlineUser className="h-4 w-4 text-brand-500" />
                <span className="font-medium text-gray-700">{author}</span>
              </div>

              <span className="hidden sm:inline text-gray-300">|</span>

              <div className="flex items-center gap-2">
                <HiOutlineCalendarDays className="h-4 w-4 text-brand-500" />
                <time dateTime={publishedAt}>
                  {format(new Date(publishedAt), 'yyyy 年 M 月 d 日', { locale: zhTW })}
                </time>
              </div>

              <span className="hidden sm:inline text-gray-300">|</span>

              <div className="flex items-center gap-2">
                <HiOutlineClock className="h-4 w-4 text-brand-500" />
                <span>閱讀約 {readingTime} 分鐘</span>
              </div>
            </div>

            {/* 標籤 */}
            {tags.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200 transition-colors hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200"
                  >
                    <HiOutlineTag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
