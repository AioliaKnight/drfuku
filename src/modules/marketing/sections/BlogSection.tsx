'use client'

import Link from 'next/link'
import { memo } from 'react'
import { compareDesc } from 'date-fns'
import { posts as allPosts } from '@/velite'
import { useEventTracking } from '@/shared/hooks/useEventTracking'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/shared/hooks/useAnimation'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import { buttonVariants } from '@/shared/ui/primitives'
import { cn } from '@/shared/lib/cn'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import PostCard from '@/modules/blog/components/PostCard'

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
                <PostCard post={post} index={index} />
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
