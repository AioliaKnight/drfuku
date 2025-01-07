import { Metadata } from 'next'
import Image from 'next/image'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: `${post.title} | 痔瘡醫生`,
      description: post.summary,
      type: 'article',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

const components = {
  Image: (props: any) => (
    <div className="relative my-8 aspect-video w-full overflow-hidden rounded-xl">
      <Image {...props} fill className="object-cover" />
    </div>
  ),
}

export default function PostPage({ params }: Props) {
  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) notFound()

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <main className="bg-gradient-to-b from-neutral-50 via-white to-neutral-50">
      <div className="container mx-auto px-4 py-12 md:py-24">
        {/* 文章標題區 */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-4 text-sm text-neutral-600">
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), 'PPP', { locale: zhTW })}
            </time>
            <span>・</span>
            <span>{post.readingTime} 分鐘閱讀</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold text-neutral-900 md:text-5xl">
            {post.title}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-600">
            {post.summary}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
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

        {/* 特色圖片 */}
        <div className="relative mx-auto mb-12 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 文章內容 */}
        <article className="prose prose-lg mx-auto max-w-4xl prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-600">
          <MDXContent components={components} />
        </article>
      </div>
    </main>
  )
} 