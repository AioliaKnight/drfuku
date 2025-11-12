'use client'

import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import { compareDesc } from 'date-fns'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { posts as allPosts, type Post } from '@/velite'
import { useEventTracking } from '@/shared/hooks/useEventTracking'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/shared/hooks/useAnimation'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import { buttonVariants } from '@/shared/ui/primitives'
import { cn } from '@/shared/lib/cn'
import { HiOutlineClock, HiOutlineTag, HiOutlineArrowRight } from 'react-icons/hi2'

// 文章卡片組件
const BlogCard = memo(function BlogCard({ post, index = 0 }: { post: Post; index?: number }) {
  const { trackEvent } = useEventTracking()

  const handlePostClick = () => {
    trackEvent('blog_card_click', {
      title: post.title,
      category: post.category,
      location: 'home_page'
    })
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:ring-gray-300/50"
      onClick={handlePostClick}
      role="article"
      aria-labelledby={`article-${post.slug}`}
    >
      {/* 封面圖片 */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 sm:aspect-[2/1] lg:aspect-[3/2]">
        <Link
          href={`/blog/${post.slug}`}
          aria-label={`閱讀文章: ${post.title}`}
          className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-t-2xl"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            loading="lazy"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          {/* 漸變遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* 分類徽章 */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-sm font-semibold text-brand-600 shadow-sm ring-1 ring-brand-100">
            {post.category}
          </span>
        </div>

        {/* 閱讀時間徽章 */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white">
            <HiOutlineClock className="h-4 w-4" />
            {post.readingTime}分鐘
          </span>
        </div>
      </div>

      {/* 文章內容 */}
      <div className="flex flex-1 flex-col justify-between p-6 lg:p-8">
        {/* 日期 */}
        <div className="mb-4">
          <time dateTime={post.publishedAt} className="text-sm text-gray-500 font-medium">
            {format(new Date(post.publishedAt), 'PPP', { locale: zhTW })}
          </time>
        </div>

        {/* 標題和摘要 */}
        <div className="flex-1">
          <Link href={`/blog/${post.slug}`} className="group/title">
            <h3
              id={`article-${post.slug}`}
              className="text-xl font-bold leading-tight text-gray-900 group-hover/title:text-brand-600 transition-colors duration-200 mb-3 line-clamp-2"
            >
              {post.title}
            </h3>
          </Link>
          <p className="text-gray-600 leading-relaxed line-clamp-3 mb-6">
            {post.summary}
          </p>
        </div>

        {/* 標籤 */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <HiOutlineTag className="h-3 w-3" />
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-500">
                +{post.tags.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* 作者和閱讀按鈕 */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{post.author}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="group/button inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors duration-200"
          >
            閱讀全文
            <HiOutlineArrowRight className="h-4 w-4 transform group-hover/button:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
})

// 加載中的骨架屏組件
const BlogCardSkeleton = memo(function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg animate-pulse">
      <div className="aspect-[16/9] bg-gray-200 sm:aspect-[2/1] lg:aspect-[3/2]" />
      <div className="p-6 lg:p-8">
        <div className="mb-4 h-4 w-20 bg-gray-200 rounded" />
        <div className="mb-3 h-6 w-3/4 bg-gray-200 rounded" />
        <div className="mb-6 space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
        </div>
        <div className="flex gap-2 mb-6">
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
})

export default function BlogSection() {
  const { variants } = useScrollAnimation({ once: true })
  const { trackEvent } = useEventTracking()

  const posts = allPosts
    .filter((post) => !post.draft && post.featured)
    .sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
    .slice(0, 3)

  const handleViewMoreClick = () => {
    trackEvent('view_more_blog_click', {
      location: 'home_page'
    })
  }

  return (
    <Section id="blog" aria-label="部落格文章區塊">
      <Container>
        <motion.div
          variants={variants.slideInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            醫療知識分享
          </h2>
          <p className="text-lg leading-7 text-neutral-600 sm:text-xl sm:leading-8">
            專業醫療知識分享，幫助您了解痔瘡預防與治療
          </p>
        </motion.div>

        <motion.div
          variants={variants.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <motion.div
                key={post.slug}
                variants={variants.slideInUp}
              >
                <BlogCard post={post} index={index} />
              </motion.div>
            ))
          ) : (
            Array.from({ length: 3 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          )}
        </motion.div>

        <motion.div
          variants={variants.slideInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/blog"
            onClick={handleViewMoreClick}
            className={cn(
              buttonVariants({ variant: 'primaryGradient', size: 'lg' }),
              'group gap-3 shadow-lg hover:-translate-y-1 transition-transform duration-300'
            )}
            aria-label="查看更多部落格文章"
          >
            查看更多文章
            <HiOutlineArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  )
}
