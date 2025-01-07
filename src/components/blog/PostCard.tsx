import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { Post } from 'contentlayer/generated'

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center gap-2 text-sm text-neutral-600">
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), 'PPP', { locale: zhTW })}
            </time>
            <span>・</span>
            <span>{post.readingTime} 分鐘閱讀</span>
          </div>
          <h2 className="mb-2 text-xl font-bold text-neutral-900 group-hover:text-brand-600">
            {post.title}
          </h2>
          <p className="text-neutral-600">{post.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
} 