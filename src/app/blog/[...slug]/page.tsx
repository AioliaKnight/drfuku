import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { posts as allPosts } from '@/velite'
import JsonLd from '@/shared/components/common/JsonLd'
import { SITE, DOCTOR, ASSETS } from '@/config/constants'
import { articlePublisher, articleAuthor } from '@/config/structured-data'
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
  const canonical = post.seo?.canonical || `${SITE.url}/blog/${slug}`

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
      locale: SITE.locale,
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
      canonical,
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

/**
 * 從 HTML 內容中擷取 FAQ 結構化資料
 * 解析 **Q：question** / **A：**answer 格式
 */
function extractFAQs(html: string): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = []

  // 模式 1: <h3> / <h4> 標題標註之 Q&A
  const headingMatches = html.matchAll(/<h[34][^>]*>(?:Q[0-9]*[：:]|問[：:]|\*\*Q[0-9]*[：:]\*\*)\s*(.*?)<\/h[34]>\s*<p>(?:<strong>)?(?:A[：:]|答[：:]|阿福醫師解答[：:])?\s*(.*?)<\/p>/gi)
  
  for (const match of headingMatches) {
    const qRaw = match[1] || ""
    const aRaw = match[2] || ""
    const question = qRaw.replace(/<[^>]*>/g, "").replace(/\*\*/g, "").trim()
    const answer = aRaw.replace(/<[^>]*>/g, "").replace(/\*\*/g, "").trim()
    if (question && answer) {
      faqs.push({ question, answer })
    }
  }

  // 模式 2: <p> 段落標註之 Q&A
  const pMatches = html.matchAll(/(?:<p>|<li>)(?:<strong>)?(?:Q[0-9]*[：:]|問[：:])\s*(.*?)(?:<\/strong>|<br\s*\/?>)\s*(?:A[：:]|答[：:]|阿福醫師解答[：:])?\s*(.*?)(?:<\/p>|<\/li>)/gi)
  for (const match of pMatches) {
    const qRaw = match[1] || ""
    const aRaw = match[2] || ""
    const question = qRaw.replace(/<[^>]*>/g, "").replace(/\*\*/g, "").trim()
    const answer = aRaw.replace(/<[^>]*>/g, "").replace(/\*\*/g, "").trim()
    if (question && answer && !faqs.some(f => f.question === question)) {
      faqs.push({ question, answer })
    }
  }

  return faqs
}

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  const post = allPosts.find((post) => post.slug === slug && !post.draft)

  if (!post) notFound()

  const canonicalUrl = post.seo?.canonical || `${SITE.url}/blog/${post.slug}`

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
    url: canonicalUrl,
    inLanguage: 'zh-TW',
    wordCount: post.wordCount,
    author: articleAuthor,
    publisher: articlePublisher,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
    },
  }

  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: SITE.url },
    { '@type': 'ListItem' as const, position: 2, name: '部落格', item: `${SITE.url}/blog` },
    {
      '@type': 'ListItem' as const,
      position: 3,
      name: post.title,
      item: canonicalUrl,
    },
  ]

  // 從文章 HTML 擷取 FAQ 結構化資料
  const faqs = extractFAQs(post.body)

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
      <JsonLd
        type="MedicalWebPage"
        data={{
          "@type": "MedicalWebPage",
          name: post.title,
          description: post.summary,
          url: canonicalUrl,
          inLanguage: "zh-TW",
          lastReviewed: post.updatedAt || post.publishedAt,
          medicalAudience: {
            "@type": "MedicalAudience",
            audienceType: "Patient",
          },
          author: articleAuthor,
          reviewedBy: articleAuthor,
        }}
      />
      {faqs.length > 0 && (
        <JsonLd
          type="FAQPage"
          data={{
            '@type': 'FAQPage',
            name: `${post.title} - 常見問題`,
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question' as const,
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer' as const,
                name: faq.question,
                text: faq.answer,
              },
            })),
          }}
        />
      )}

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
