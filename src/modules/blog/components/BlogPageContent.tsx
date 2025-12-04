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
  HiChevronRight
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
    const totalPosts = publishedPosts.length
    const categories = [...new Set(publishedPosts.map(post => post.category))]
    const totalTags = [...new Set(publishedPosts.flatMap(post => post.tags))]
    const totalReadingTime = publishedPosts.reduce((total, post) =>
      total + (post.readingTime || 5), 0
    )

    return {
      totalPosts,
      totalCategories: categories.length,
      totalTags: totalTags.length,
      totalReadingTime,
      categories,
      allTags: totalTags
    }
  }, [publishedPosts])

  // 排序文章
  const sortedPosts = useMemo(() => {
    return [...publishedPosts].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
        case 'title':
          return a.title.localeCompare(b.title)
        case 'reading':
          return (a.readingTime || 5) - (b.readingTime || 5)
        default:
          return 0
      }
    })
  }, [publishedPosts, sortBy])

  // 篩選文章
  const filteredPosts = useMemo(() => {
    return sortedPosts.filter(post => {
      const matchesSearch = searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag)

      return matchesSearch && matchesCategory && matchesTag
    })
  }, [sortedPosts, searchTerm, selectedCategory, selectedTag])

  // 分頁邏輯
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)
  }, [filteredPosts, currentPage])

  // 重置分頁當篩選條件改變
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedTag])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedTag('all')
    setCurrentPage(1)
  }

  if (publishedPosts.length === 0) {
    return <ErrorMessage title="沒有文章" message="目前沒有文章" show={true} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50">
      <section className="container-padding section-spacing">
        {/* 頭部標題區域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-brand-700 via-brand-600 to-brand-800 bg-clip-text text-transparent sm:text-6xl mb-6">
            醫療知識庫
          </h1>
          <p className="text-xl leading-8 text-gray-600 max-w-3xl mx-auto mb-12">
            專業醫療資訊與臨床經驗分享，提供實證醫學支持的健康指導
          </p>

          {/* 統計資訊 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <HiDocumentText className="h-7 w-7 text-brand-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalPosts}</div>
              <div className="text-sm text-gray-600 font-medium">醫療文章</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <HiFolder className="h-7 w-7 text-brand-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalCategories}</div>
              <div className="text-sm text-gray-600 font-medium">專科分類</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <HiClock className="h-7 w-7 text-brand-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalReadingTime}</div>
              <div className="text-sm text-gray-600 font-medium">分鐘內容</div>
            </div>
          </div>
        </motion.div>

        {/* 搜尋和篩選區域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {/* 主要搜尋列 */}
            <div className="flex flex-col lg:flex-row gap-4 items-center mb-8">
              {/* 搜尋框 */}
              <div className="relative flex-1 w-full">
                <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜尋醫療文章、症狀、治療方法..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* 檢視模式切換 */}
              <div className="flex items-center gap-1 border border-gray-300 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <HiViewColumns className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <HiListBullet className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* 進階篩選 */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-3">
                <HiAdjustmentsHorizontal className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">篩選條件</span>
              </div>

              {/* 分類篩選 */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-gray-900"
              >
                <option value="all">所有分類</option>
                {stats.categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* 標籤篩選 */}
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-gray-900"
              >
                <option value="all">所有標籤</option>
                {stats.allTags.slice(0, 20).map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>

              {/* 排序 */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'reading')}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-gray-900"
              >
                <option value="date">依發布日期</option>
                <option value="title">依文章標題</option>
                <option value="reading">依閱讀時間</option>
              </select>

              {/* 清除篩選按鈕 */}
              {(searchTerm || selectedCategory !== 'all' || selectedTag !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
                >
                  清除篩選
                </button>
              )}
            </div>

            {/* 篩選結果統計 */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
              <div>
                共找到 <span className="font-semibold text-brand-600">{filteredPosts.length}</span> 篇文章
                {filteredPosts.length !== publishedPosts.length && (
                  <span className="text-gray-500"> （總計 {publishedPosts.length} 篇）</span>
                )}
              </div>
              {totalPages > 1 && (
                <div className="text-gray-500">
                  第 {currentPage} 頁 / 共 {totalPages} 頁
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* 文章列表區域 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {paginatedPosts.length > 0 ? (
              <motion.div
                key={`${viewMode}-${currentPage}-${selectedCategory}-${selectedTag}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3'
                    : 'space-y-6'
                }
              >
                {paginatedPosts.map((post, index) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    index={index}
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <HiMagnifyingGlass className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">未找到相關文章</h3>
                  <p className="text-gray-600 mb-8">
                    請嘗試調整搜尋關鍵字或篩選條件
                  </p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
                  >
                    重置篩選條件
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 分頁導航 */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex items-center justify-center"
          >
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <HiChevronLeft className="h-5 w-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  if (totalPages <= 7) return true
                  if (page === 1 || page === totalPages) return true
                  if (Math.abs(page - currentPage) <= 1) return true
                  return false
                })
                .map((page, index, array) => {
                  const prevPage = array[index - 1]
                  const showEllipsis = index > 0 && prevPage !== undefined && page - prevPage > 1
                  return (
                    <div key={page} className="flex items-center">
                      {showEllipsis && (
                        <span className="px-3 text-gray-400">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-3 rounded-xl border transition-all font-medium ${
                          currentPage === page
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  )
                })}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <HiChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </motion.div>
        )}
      </section>
    </div>
  )
}
