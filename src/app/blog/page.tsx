import { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import PostCard from '@/components/blog/PostCard'

export const metadata: Metadata = {
  title: '醫療部落格',
  description: '專業醫療知識分享，提供痔瘡預防、治療和保健等相關資訊。',
  openGraph: {
    title: '醫療部落格 | 痔瘡醫生',
    description: '專業醫療知識分享，提供痔瘡預防、治療和保健等相關資訊。',
  },
}

export default function BlogPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
  )

  return (
    <main className="bg-gradient-to-b from-neutral-50 via-white to-neutral-50">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-neutral-900 md:text-5xl">
            醫療部落格
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            專業醫療知識分享，幫助您更了解痔瘡的預防、治療和保健方法。
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  )
} 