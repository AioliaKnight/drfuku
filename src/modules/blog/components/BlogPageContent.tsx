'use client'

import { useState, useMemo, useEffect } from 'react'
import { posts as allPosts } from '@/velite'
import { compareDesc } from 'date-fns'
import PostCard from './PostCard'
import ErrorMessage from '@/shared/components/common/ErrorMessage'
import {
  HiMagnifyingGlass,
  HiAdjustmentsHorizontal,
  HiDocumentText,
  HiClock,
  HiFolder,
  HiViewColumns,
  HiListBullet,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2'
import { motion, AnimatePresence } from 'framer-motion'

const POSTS_PER_PAGE = 9

export default function BlogPageContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'reading'>('date')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)

  const publishedPosts = allPosts.filter((post) => !post.draft)

  // 統計資訊
  const stats = useMemo(() => {
    const categories = [...new Set(publishedPosts.map((p) => p.category))]
    const allTags = [...new Set(publishedPosts.flatMap((p) => p.tags))]
    const totalReadingTime = publishedPosts.reduce(
      (sum, p) => sum + (p.readingTime || 5),
      0
    )
    return {
      totalPosts: publishedPosts.length,
      totalCategories: categories.length,
      totalReadingTime,
      categories,
      allTags,
    }
  }, [publishedPosts])

  // 排序
  const sortedPosts = useMemo(() => {
    return [...publishedPosts].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'reading')
        return (a.readingTime || 5) - (b.readingTime || 5)
      return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
    })
  }, [publishedPosts, sortBy])

  // 篩選
  const filteredPosts = useMemo(() => {
    return sortedPosts.filter((post) => {
      const q = searchTerm.toLowerCase()
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
      const matchesCategory =
        selectedCategory === 'all' || post.category === selectedCategory
      const matchesTag =
        selectedTag === 'all' || post.tags.includes(selectedTag)
      return matchesSearch && matchesCategory && matchesTag
    })
  }, [sortedPosts, searchTerm, selectedCategory, selectedTag])

  // 分頁
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE
    return filteredPosts.slice(start, start + POSTS_PER_PAGE)
  }, [filteredPosts, currentPage])

  // 條件改變時重置分頁
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedTag])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedTag('all')
    setCurrentPage(1)
  }

  const hasActiveFilters =
    searchTerm || selectedCategory !== 'all' || selectedTag !== 'all'

  if (publishedPosts.length === 0) {
    return <ErrorMessage title="沒有文章" message="目前沒有文章" show={true} />
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <section className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* ===== 頁頭 ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-600">
            Medical Knowledge
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            醫療知識庫
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-500">
            專業醫療資訊與臨床經驗分享，提供實證醫學支持的健康指導
          </p>

          {/* 統計 */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4">
            {[
              {
                icon: HiDocumentText,
                value: stats.totalPosts,
                label: '篇文章',
              },
              {
                icon: HiFolder,
                value: stats.totalCategories,
                label: '個分類',
              },
              {
                icon: HiClock,
                value: `${stats.totalReadingTime}+`,
                label: '分鐘內容',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <item.icon className="mx-auto mb-2 h-6 w-6 text-brand-500" />
                <div className="text-2xl font-bold text-gray-900">
                  {item.value}
                </div>
                <div className="text-xs text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== 搜尋 & 篩選 ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            {/* 搜尋列 */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <HiMagnifyingGlass className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜尋文章、症狀、治療方法..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-900 outline-hidden transition-all placeholder:text-gray-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </div>
              {/* 檢視模式 */}
              <div className="flex items-center gap-1 rounded-xl border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded-lg p-2.5 transition-all ${
                    viewMode === 'grid'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                  aria-label="Grid 模式"
                >
                  <HiViewColumns className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded-lg p-2.5 transition-all ${
                    viewMode === 'list'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                  aria-label="List 模式"
                >
                  <HiListBullet className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* 篩選列 */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <HiAdjustmentsHorizontal className="h-4 w-4" />
                <span className="font-medium">篩選</span>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-hidden focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              >
                <option value="all">所有分類</option>
                {stats.categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-hidden focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              >
                <option value="all">所有標籤</option>
                {stats.allTags.slice(0, 20).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'date' | 'title' | 'reading')
                }
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-hidden focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              >
                <option value="date">依發布日期</option>
                <option value="title">依文章標題</option>
                <option value="reading">依閱讀時間</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                >
                  清除篩選
                </button>
              )}
            </div>

            {/* 結果統計 */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4 text-xs text-gray-400">
              <span>
                共{' '}
                <span className="font-semibold text-brand-600">
                  {filteredPosts.length}
                </span>{' '}
                篇文章
                {filteredPosts.length !== publishedPosts.length &&
                  `（全部 ${publishedPosts.length} 篇）`}
              </span>
              {totalPages > 1 && (
                <span>
                  第 {currentPage} / {totalPages} 頁
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* ===== 文章列表 ===== */}
        <AnimatePresence mode="wait">
          {paginatedPosts.length > 0 ? (
            <motion.div
              key={`${viewMode}-${currentPage}-${selectedCategory}-${selectedTag}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
                  : 'space-y-4'
              }
            >
              {paginatedPosts.map((post, i) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  index={i}
                  viewMode={viewMode}
                  featured={post.featured}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <div className="mx-auto max-w-sm">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <HiMagnifyingGlass className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  未找到相關文章
                </h3>
                <p className="mb-6 text-sm text-gray-500">
                  請嘗試調整搜尋關鍵字或篩選條件
                </p>
                <button
                  onClick={clearFilters}
                  className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  重置篩選
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== 分頁 ===== */}
        {totalPages > 1 && (
          <nav
            aria-label="分頁"
            className="mt-14 flex items-center justify-center"
          >
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-200 p-2.5 text-gray-500 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="上一頁"
              >
                <HiChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  if (totalPages <= 7) return true
                  if (page === 1 || page === totalPages) return true
                  return Math.abs(page - currentPage) <= 1
                })
                .map((page, idx, arr) => {
                  const prev = arr[idx - 1]
                  const showDots = idx > 0 && prev !== undefined && page - prev > 1
                  return (
                    <div key={page} className="flex items-center">
                      {showDots && (
                        <span className="px-2 text-gray-300">…</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-all ${
                          currentPage === page
                            ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  )
                })}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-200 p-2.5 text-gray-500 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="下一頁"
              >
                <HiChevronRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        )}
      </section>
    </div>
  )
}
