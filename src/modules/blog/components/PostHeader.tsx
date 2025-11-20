import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { HiOutlineClock, HiOutlineTag, HiOutlineUser } from 'react-icons/hi2'

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
    <div className="relative z-10 -mt-64 sm:-mt-72 md:-mt-80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* 背景卡片 */}
          <div className="rounded-3xl bg-white/95 backdrop-blur-lg p-8 shadow-2xl ring-1 ring-black/5 sm:p-12 md:p-16">
            {/* 分類標籤 */}
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-800">
                {category}
              </span>
            </div>

            {/* 標題 */}
            <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
            </h1>

            {/* 元數據 */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 border-t border-gray-200 pt-8">
              <div className="flex items-center gap-3">
                <HiOutlineUser className="h-5 w-5 text-brand-600" />
                <span className="text-base font-medium md:text-lg">{author}</span>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlineClock className="h-5 w-5 text-brand-600" />
                <time dateTime={publishedAt} className="text-base md:text-lg">
                  {format(new Date(publishedAt), 'PPP', { locale: zhTW })}
                </time>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlineClock className="h-5 w-5 text-brand-600" />
                <span className="text-base md:text-lg">
                  閱讀時間約 {readingTime} 分鐘
                </span>
              </div>
            </div>

            {/* 標籤 */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <HiOutlineTag className="h-4 w-4 text-gray-500" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

