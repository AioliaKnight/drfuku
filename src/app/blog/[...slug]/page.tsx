import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { posts as allPosts } from '@/velite'
import {
  ArticleContent,
  BackToTop,
  ScrollProgress,
  ShareButtons,
  PostCover,
  PostHeader,
  AuthorInfo,
  RelatedPosts
} from '@/modules/blog'
import { proseStyles } from '@/modules/blog/styles/prose'

export const dynamic = 'force-static'
export const revalidate = false

interface Props {
  params: Promise<{
    slug: string[]
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// 生成靜態路徑
export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug.split('/'),
  }))
}

// 生成 Meta 數據
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  const post = allPosts.find((post) => post.slug === slug && !post.draft)

  if (!post) return {}

  const { title, summary, image } = post
  const fullTitle = `${title} | 痔瘡醫生`

  return {
    metadataBase: new URL('https://drfuku.com'),
    title: fullTitle,
    description: summary,
    openGraph: {
      title: fullTitle,
      description: summary,
      type: 'article',
      images: [{ url: image, width: 1200, height: 630, alt: title }]
    },
    alternates: {
      canonical: `https://drfuku.com/blog/${slug}`
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  }
}

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  const post = allPosts.find((post) => post.slug === slug && !post.draft)

  if (!post) notFound()

  return (
    <>
      {/* 閱讀進度指示器 */}
      <ScrollProgress />

      <main className="relative min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* 封面區域 */}
        <PostCover image={post.image} title={post.title} />

        {/* 標題區域 */}
        <PostHeader
          title={post.title}
          author={post.author}
          publishedAt={post.publishedAt}
          readingTime={post.readingTime}
          category={post.category}
          tags={post.tags}
        />

        {/* 內容區域 */}
        <div className="relative z-10 mt-16 pb-24 pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* 分享按鈕 */}
            <div className="mb-8">
              <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
            </div>

            {/* 文章內容 */}
            <article className="mx-auto max-w-4xl">
              <div className={proseStyles}>
                <ArticleContent content={post.body} />
              </div>
            </article>

            {/* 作者資訊 */}
            <AuthorInfo author={post.author} />

            {/* 相關文章 */}
            <RelatedPosts currentPost={post} allPosts={allPosts} />
          </div>
        </div>

        {/* 回到頂部按鈕 */}
        <BackToTop />
      </main>
    </>
  )
}
