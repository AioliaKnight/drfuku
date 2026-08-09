'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import {
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineDocumentText,
  HiStar
} from 'react-icons/hi2'
import Image from 'next/image'
import Link from 'next/link'
import { type Post } from '@/velite'
import { motion } from 'framer-motion'
import { baseTransition, warmHoverAnimation } from '@/shared/animation'

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

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...baseTransition, delay: index * 0.05 },
    },
  }

  // ========== Grid 模式 ==========
  if (viewMode === 'grid') {
    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        {...warmHoverAnimation}
        className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-neutral-200/60 transition-shadow duration-500 hover:shadow-xl ${
          featured ? 'ring-2 ring-warm-100' : ''
        }`}
      >
        {/* 精選標記 */}
        {featured && (
          <div className="absolute right-4 top-4 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-warm-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-warm-500/20">
              <HiStar className="h-3 w-3" />
              精選推薦
            </span>
          </div>
        )}

        <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
          {/* 圖片區域 */}
          <div className="relative h-52 overflow-hidden bg-neutral-50">
            {!imageError && post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-brand-50 to-warm-50/50">
                <HiOutlineDocumentText className="mb-2 h-12 w-12 text-brand-200" />
              </div>
            )}
            {/* 分類 badge */}
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center rounded-xl bg-white/95 px-3 py-1.5 text-xs font-bold text-brand-700 shadow-lg ring-1 ring-white/60 backdrop-blur-md">
                {post.category}
              </span>
            </div>
          </div>

          {/* 內容區域 */}
          <div className="flex flex-1 flex-col p-6">
            {/* 標題 */}
            <h3 className="mb-3 line-clamp-2 text-lg font-bold text-neutral-900 transition-colors group-hover:text-brand-600">
              {post.title}
            </h3>

            {/* 摘要 */}
            <p className="mb-6 line-clamp-2 flex-1 text-sm leading-relaxed text-neutral-500">
              {post.summary}
            </p>

            {/* 標籤 */}
            {post.tags.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-lg bg-neutral-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 ring-1 ring-neutral-200/50 transition-colors group-hover:bg-warm-50 group-hover:text-warm-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* 底部 meta */}
            <div className="flex items-center justify-between border-t border-neutral-50 pt-5 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <HiOutlineClock className="h-3.5 w-3.5 text-brand-400" />
                  <span>{post.readingTime || 5} MIN</span>
                </div>
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'yyyy.MM.dd', {
                    locale: zhTW,
                  })}
                </time>
              </div>
              <span className="flex items-center gap-1 text-brand-600 transition-colors group-hover:text-brand-700">
                READ
                <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
