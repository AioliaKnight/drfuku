import PostCard from './PostCard'
import { type Post } from '@/velite'

interface RelatedPostsProps {
  currentPost: Post
  allPosts: Post[]
}

export default function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  // 改善相關文章算法：依照關聯度排序（使用 Set 做 O(1) 標籤查詢）
  const currentTagSet = new Set(currentPost.tags)
  const scoredPosts = allPosts
    .filter((post) => !post.draft && post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0
      // 同分類 +3
      if (post.category === currentPost.category) score += 3
      // 共同標籤每個 +2
      const commonTagCount = post.tags.filter((tag: string) =>
        currentTagSet.has(tag)
      ).length
      score += commonTagCount * 2
      // 精選文章 +1
      if (post.featured) score += 1
      return { post, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  if (scoredPosts.length === 0) return null

  return (
    <section
      aria-label="相關文章"
      className="mx-auto mt-20 max-w-7xl"
    >
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
          延伸閱讀
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          相關文章推薦
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-gray-500">
          根據本文主題，為您精選的相關醫療知識
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {scoredPosts.map(({ post }, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </section>
  )
}
