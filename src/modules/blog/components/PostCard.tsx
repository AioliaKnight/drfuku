'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { HiOutlineClock, HiOutlineTag, HiOutlineArrowRight, HiOutlineBookmark } from 'react-icons/hi2'
import Image from 'next/image'
import Link from 'next/link'
import { type Post } from '@/velite'
import { motion } from 'framer-motion'

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
  viewMode = 'grid'
}: PostCardProps) {
  const [imageError, setImageError] = useState(false)

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  // Grid 模式佈局
  if (viewMode === 'grid') {
  return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          y: -4,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        className={`group relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${
          featured ? 'ring-2 ring-brand-200 ring-opacity-50' : ''
        }`}
      >
        {/* 精選標記 */}
        {featured && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-1 bg-brand-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
              <HiOutlineBookmark className="h-3 w-3" />
              <span>推薦</span>
            </div>
          </div>
        )}

        <Link href={`/blog/${post.slug}`} className="block">
          {/* 圖片區域 */}
          <div className="relative h-48 bg-gray-100 overflow-hidden">
            {!imageError && post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-brand-200 rounded-full flex items-center justify-center">
                    <HiOutlineBookmark className="h-8 w-8 text-brand-600" />
                  </div>
                  <p className="text-sm text-brand-600 font-medium">醫療文章</p>
                </div>
              </div>
            )}

            {/* 分類標籤 */}
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-brand-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            {post.category}
          </span>
        </div>
          </div>

          {/* 內容區域 */}
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-700 transition-colors">
              {post.title}
          </h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {post.summary}
          </p>
        </div>

            {/* 標籤區域 */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md"
                  >
                    <HiOutlineTag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* 底部資訊 */}
            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
            <HiOutlineClock className="h-4 w-4" />
                  <span>{post.readingTime || 5} 分鐘</span>
                </div>
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'yyyy/MM/dd', { locale: zhTW })}
                </time>
              </div>
              <div className="flex items-center gap-1 text-brand-600 group-hover:text-brand-700 transition-colors">
                <span className="text-xs font-medium">閱讀更多</span>
                <HiOutlineArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  // List 模式佈局
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 ${
        featured ? 'ring-2 ring-brand-200 ring-opacity-50' : ''
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex gap-6 p-6">
          {/* 圖片區域 */}
          <div className="relative w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            {!imageError && post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError}
                sizes="128px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
                <HiOutlineBookmark className="h-6 w-6 text-brand-600" />
              </div>
            )}
          </div>

          {/* 內容區域 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center bg-brand-50 text-brand-700 px-2 py-1 rounded text-xs font-medium">
                  {post.category}
                </span>
                {featured && (
                  <div className="flex items-center gap-1 bg-brand-600 text-white px-2 py-1 rounded text-xs font-medium">
                    <HiOutlineBookmark className="h-3 w-3" />
                    <span>推薦</span>
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-brand-700 transition-colors">
              {post.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
              {post.summary}
            </p>

            {/* 標籤區域 */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                    className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
              >
                    <HiOutlineTag className="h-3 w-3" />
                {tag}
              </span>
            ))}
                {post.tags.length > 4 && (
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    +{post.tags.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* 底部資訊 */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <HiOutlineClock className="h-4 w-4" />
                  <span>{post.readingTime || 5} 分鐘</span>
                </div>
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'yyyy/MM/dd', { locale: zhTW })}
                </time>
              </div>
              <div className="flex items-center gap-1 text-brand-600 group-hover:text-brand-700 transition-colors">
                <span className="text-xs font-medium">閱讀更多</span>
                <HiOutlineArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
