import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { posts as allPosts } from '@/velite'
import JsonLd from '@/shared/components/common/JsonLd'
import { SITE, DOCTOR, CLINIC, ASSETS } from '@/config/constants'
import {
  ArticleContent,
  BackToTop,
  ScrollProgress,
  ShareButtons,
  PostCover,
  PostHeader,
  AuthorInfo,
  RelatedPosts,
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
  const fullTitle = `${title} | 阿福醫師 大腸直腸外科`
  const ogImage = image || new URL(ASSETS.ogImage, SITE.url).toString()
  const publishedTime = new Date(post.publishedAt).toISOString()
  const modifiedTime = new Date(post.updatedAt || post.publishedAt).toISOString()

  return {
    metadataBase: new URL(SITE.url),
    title: fullTitle,
    description: summary,
    keywords: post.seo?.keywords || post.tags,
    authors: [{ name: post.author || DOCTOR.alternateName, url: DOCTOR.url }],
    openGraph: {
      title: fullTitle,
      description: summary,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      publishedTime,
      modifiedTime,
      authors: [DOCTOR.url],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: summary,
      images: [ogImage],
    },
    alternates: {
      canonical: `${SITE.url}/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  const post = allPosts.find((post) => post.slug === slug && !post.draft)

  if (!post) notFound()

  const articleSchema = {
    '@type': 'Article' as const,
    name: post.title,
    headline: post.title,
    description: post.summary,
    image: post.image
      ? [post.image]
      : [new URL(ASSETS.ogImage, SITE.url).toString()],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    articleSection: post.category,
    articleTag: post.tags,
    url: `${SITE.url}/blog/${post.slug}`,
    inLanguage: SITE.locale,
    wordCount: post.wordCount,
    author: {
      '@type': 'Person' as const,
      name: DOCTOR.name,
      jobTitle: DOCTOR.title,
      image: DOCTOR.image,
      url: DOCTOR.url,
    },
    publisher: {
      '@type': 'MedicalClinic' as const,
      name: CLINIC.name,
      logo: CLINIC.logo,
      telephone: CLINIC.telephone,
      url: SITE.url,
    },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  }

  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: SITE.url },
    { '@type': 'ListItem' as const, position: 2, name: '部落格', item: `${SITE.url}/blog` },
    {
      '@type': 'ListItem' as const,
      position: 3,
      name: post.title,
      item: `${SITE.url}/blog/${post.slug}`,
    },
  ]

  return (
    <>
      <JsonLd
        type="BreadcrumbList"
        data={{
          '@type': 'BreadcrumbList',
          name: post.title,
          itemListElement: breadcrumbItems,
        }}
      />
      <JsonLd type="Article" data={articleSchema} />

      {/* 閱讀進度指示器 */}
      <ScrollProgress />

      <main className="relative min-h-screen bg-white">
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

        {/* 文章內容區域 */}
        <div className="relative z-10 mt-10 pb-24 sm:mt-12 md:mt-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* 分享按鈕 */}
            <div className="mb-10">
              <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
            </div>

            {/* 文章本文 */}
            <article className="mx-auto">
              <div className={proseStyles}>
                <ArticleContent content={post.body} />
              </div>
            </article>

            {/* 文章底部分享 */}
            <div className="mt-12 border-t border-gray-100 pt-8">
              <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
            </div>
          </div>

          {/* 作者資訊 */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AuthorInfo author={post.author} />
          </div>

          {/* 相關文章 */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <RelatedPosts currentPost={post} allPosts={allPosts} />
          </div>
        </div>

        {/* 回到頂部按鈕 */}
        <BackToTop />
      </main>
    </>
  )
}
