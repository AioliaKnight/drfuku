'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import {
  HiOutlineClock,
  HiOutlineTag,
  HiOutlineArrowRight,
  HiOutlineDocumentText,
} from 'react-icons/hi2'
import Image from 'next/image'
import Link from 'next/link'
import { type Post } from '@/velite'
import { motion, easeOut, type Transition } from 'framer-motion'
import { baseTransition } from '@/shared/animation'

interface PostCardProps {
  post: Post
  index?: number
  featured?: boolean
  viewMode?: 'grid' | 'list'
}

export default function PostCard({
  post,
  index = 0,
  featured = false,
  viewMode = 'grid',
}: PostCardProps) {
  const [imageError, setImageError] = useState(false)

  const hoverTransition: Transition = { duration: 0.2, ease: easeOut }
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { ...baseTransition, duration: 0.5, delay: index * 0.08 },
    },
  }

  // ========== Grid 模式 ==========
  if (viewMode === 'grid') {
    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -6, transition: hoverTransition }}
        className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 transition-shadow duration-300 hover:shadow-xl ${
          featured ? 'ring-2 ring-brand-200' : ''
        }`}
      >
        {/* 精選標記 */}
        {featured && (
          <div className="absolute right-3 top-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              推薦
            </span>
          </div>
        )}

        <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
          {/* 圖片區域 */}
          <div className="relative h-48 overflow-hidden bg-gray-50">
            {!imageError && post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-brand-50 to-brand-100/60">
                <HiOutlineDocumentText className="mb-2 h-10 w-10 text-brand-300" />
                <p className="text-xs font-medium text-brand-400">
                  醫療文章
                </p>
              </div>
            )}
            {/* 分類 badge */}
            <div className="absolute bottom-3 left-3">
              <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-white/60 backdrop-blur-xs">
                {post.category}
              </span>
            </div>
          </div>

          {/* 內容區域 */}
          <div className="flex flex-1 flex-col p-5">
            {/* 標題 */}
            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-brand-700">
              {post.title}
            </h3>

            {/* 摘要 */}
            <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500">
              {post.summary}
            </p>

            {/* 標籤 */}
            {post.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-0.5 text-xs text-gray-500 inset-ring inset-ring-gray-100"
                  >
                    <HiOutlineTag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="rounded-md bg-gray-50 px-2 py-0.5 text-xs text-gray-400">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* 底部 meta */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-4 text-xs text-gray-400">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <HiOutlineClock className="h-3.5 w-3.5" />
                  <span>{post.readingTime || 5} 分鐘</span>
                </div>
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'yyyy/MM/dd', {
                    locale: zhTW,
                  })}
                </time>
              </div>
              <span className="flex items-center gap-1 font-medium text-brand-600 transition-colors group-hover:text-brand-700">
                閱讀
                <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  // ========== List 模式 ==========
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-md ${
        featured ? 'ring-2 ring-brand-200' : ''
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex gap-5 p-5">
          {/* 縮圖 */}
          <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-50">
            {!imageError && post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
                sizes="128px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-brand-50 to-brand-100/60">
                <HiOutlineDocumentText className="h-6 w-6 text-brand-300" />
              </div>
            )}
          </div>

          {/* 內容 */}
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center rounded bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">
                {post.category}
              </span>
              {featured && (
                <span className="rounded bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">
                  推薦
                </span>
              )}
            </div>

            <h3 className="mb-1.5 line-clamp-1 text-base font-bold text-gray-900 transition-colors group-hover:text-brand-700">
              {post.title}
            </h3>

            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-500">
              {post.summary}
            </p>

            {/* 底部 meta */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <HiOutlineClock className="h-3.5 w-3.5" />
                  <span>{post.readingTime || 5} 分鐘</span>
                </div>
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'yyyy/MM/dd', {
                    locale: zhTW,
                  })}
                </time>
              </div>
              <span className="flex items-center gap-1 font-medium text-brand-600 transition-colors group-hover:text-brand-700">
                閱讀
                <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
