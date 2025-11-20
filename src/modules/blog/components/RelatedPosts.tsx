import PostCard from './PostCard'
import { type Post } from '@/velite'

interface RelatedPostsProps {
  currentPost: Post
  allPosts: Post[]
}

export default function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  const relatedPosts = allPosts
    .filter(post =>
      !post.draft &&
      post.slug !== currentPost.slug &&
      (post.category === currentPost.category ||
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  return (
    <div className="mx-auto mt-16 max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          相關文章
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          您可能也會對這些文章感興趣
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {relatedPosts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  )
}

