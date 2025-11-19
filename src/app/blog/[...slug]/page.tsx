import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { HiOutlineClock, HiOutlineTag, HiOutlineUser } from 'react-icons/hi2'
import { posts as allPosts, type Post } from '@/velite'
import { ArticleContent, BackToTop, PostCard, ScrollProgress, ShareButtons } from '@/modules/blog'

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

// 文章封面組件
function PostCover({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative h-[60vh] min-h-[500px] overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
    </div>
  )
}

// 文章標題組件
function PostHeader({ title, author, publishedAt, readingTime, category, tags }: {
  title: string
  author: string
  publishedAt: string
  readingTime: number
  category: string
  tags: string[]
}) {
  return (
    <div className="relative z-10 -mt-64 sm:-mt-72 md:-mt-80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* 背景卡片 */}
          <div className="rounded-3xl bg-white/95 backdrop-blur-lg p-8 shadow-2xl ring-1 ring-black/5 sm:p-12 md:p-16">
            {/* 分類標籤 */}
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-800">
                {category}
              </span>
            </div>

            {/* 標題 */}
            <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
            </h1>

            {/* 元數據 */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 border-t border-gray-200 pt-8">
              <div className="flex items-center gap-3">
                <HiOutlineUser className="h-5 w-5 text-brand-600" />
                <span className="text-base font-medium md:text-lg">{author}</span>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlineClock className="h-5 w-5 text-brand-600" />
                <time dateTime={publishedAt} className="text-base md:text-lg">
                  {format(new Date(publishedAt), 'PPP', { locale: zhTW })}
                </time>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlineClock className="h-5 w-5 text-brand-600" />
                <span className="text-base md:text-lg">
                  閱讀時間約 {readingTime} 分鐘
                </span>
              </div>
            </div>

            {/* 標籤 */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <HiOutlineTag className="h-4 w-4 text-gray-500" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 作者資訊組件
function AuthorInfo({ author }: { author: string }) {
  return (
    <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-white to-brand-50/50 p-3 shadow-xl ring-1 ring-brand-100/50">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50/50 to-white p-8 md:p-12">
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4">
          <div className="h-72 w-72 rounded-full bg-brand-100/30 blur-3xl" />
        </div>
        <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
          <div className="relative h-32 w-32 overflow-hidden rounded-full bg-white shadow-lg ring-8 ring-brand-50 transition-all duration-500 hover:scale-105 hover:shadow-xl sm:h-40 sm:w-40">
            <Image
              src="/doctor-profile.jpg"
              alt={author}
              fill
              sizes="(max-width: 640px) 128px, 160px"
              className="object-cover object-center"
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-brand-900 md:text-3xl lg:text-4xl">
              {author}
            </h3>
            <p className="text-lg leading-relaxed text-brand-800 md:text-xl lg:text-2xl">
              專業痔瘡診療與保健醫師
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl">
              擁有超過15年的臨床經驗，專注於痔瘡的預防、診斷和治療，致力於為患者提供最佳的醫療服務。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 相關文章組件
function RelatedPosts({ currentPost }: { currentPost: Post }) {
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
              <div className="prose prose-xl prose-slate mx-auto
                prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight
                prose-headings:transition-colors prose-headings:duration-200

                prose-h1:text-4xl prose-h1:text-brand-900 prose-h1:mb-8 prose-h1:mt-12 prose-h1:leading-tight
                prose-h1:font-black prose-h1:border-b-4 prose-h1:border-brand-200 prose-h1:pb-4
                prose-h1:bg-gradient-to-r prose-h1:from-brand-900 prose-h1:to-brand-700
                prose-h1:bg-clip-text prose-h1:text-transparent

                prose-h2:text-3xl prose-h2:text-brand-800 prose-h2:mb-6 prose-h2:mt-10 prose-h2:leading-tight
                prose-h2:font-extrabold prose-h2:border-l-4 prose-h2:border-brand-400 prose-h2:pl-4
                prose-h2:bg-brand-50/30 prose-h2:py-2 prose-h2:rounded-r-lg

                prose-h3:text-2xl prose-h3:text-brand-700 prose-h3:mb-5 prose-h3:mt-8 prose-h3:leading-tight
                prose-h3:font-bold prose-h3:relative prose-h3:pl-6
                prose-h3:before:content-['▶'] prose-h3:before:absolute prose-h3:before:left-0
                prose-h3:before:text-brand-500 prose-h3:before:font-normal

                prose-h4:text-xl prose-h4:text-brand-600 prose-h4:mb-4 prose-h4:mt-6 prose-h4:leading-tight
                prose-h4:font-bold prose-h4:relative prose-h4:pl-4
                prose-h4:before:content-['●'] prose-h4:before:absolute prose-h4:before:left-0
                prose-h4:before:text-brand-400 prose-h4:before:text-sm prose-h4:before:top-1

                prose-h5:text-lg prose-h5:text-gray-800 prose-h5:mb-3 prose-h5:mt-5 prose-h5:leading-tight
                prose-h5:font-semibold prose-h5:italic prose-h5:text-gray-700
                prose-h5:border-b prose-h5:border-gray-300 prose-h5:border-dotted prose-h5:pb-1

                prose-h6:text-base prose-h6:text-gray-600 prose-h6:mb-3 prose-h6:mt-4 prose-h6:leading-tight
                prose-h6:font-medium prose-h6:uppercase prose-h6:tracking-wider prose-h6:text-sm
                prose-h6:text-gray-500 prose-h6:bg-gray-100 prose-h6:px-3 prose-h6:py-1 prose-h6:rounded-full
                prose-h6:inline-block

                prose-p:text-gray-700 prose-p:leading-8 prose-p:mb-6 prose-p:text-lg prose-p:font-normal
                prose-p:tracking-normal prose-p:text-justify

                prose-a:text-brand-600 prose-a:font-medium prose-a:no-underline prose-a:transition-colors
                hover:prose-a:text-brand-700 hover:prose-a:underline prose-a:underline-offset-4

                prose-strong:text-gray-900 prose-strong:font-bold
                prose-em:text-gray-700 prose-em:italic

                prose-ul:text-gray-700 prose-ul:mb-6 prose-ul:space-y-2
                prose-ol:text-gray-700 prose-ol:mb-6 prose-ol:space-y-2
                prose-li:text-lg prose-li:leading-7 prose-li:marker:text-brand-500
                prose-li:pl-2 prose-li:mb-2

                prose-blockquote:border-l-4 prose-blockquote:border-brand-500
                prose-blockquote:bg-gradient-to-r prose-blockquote:from-brand-50/50 prose-blockquote:to-transparent
                prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-4 prose-blockquote:my-8
                prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:rounded-r-lg
                prose-blockquote:shadow-sm prose-blockquote:relative

                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl
                prose-pre:p-6 prose-pre:my-8 prose-pre:overflow-x-auto prose-pre:shadow-lg
                prose-pre:border prose-pre:border-gray-200

                prose-code:text-brand-600 prose-code:bg-brand-50 prose-code:px-2 prose-code:py-1
                prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:font-medium
                prose-code:before:content-none prose-code:after:content-none

                prose-table:my-8 prose-table:border-collapse prose-table:w-full
                prose-table:shadow-lg prose-table:rounded-lg prose-table:overflow-hidden
                prose-table:bg-white prose-table:border prose-table:border-gray-200
                prose-th:bg-gradient-to-r prose-th:from-gray-50 prose-th:to-gray-100
                prose-th:text-gray-900 prose-th:font-semibold prose-th:text-sm prose-th:uppercase
                prose-th:tracking-wide prose-th:px-4 prose-th:py-3 prose-th:text-left
                prose-th:border-b-2 prose-th:border-gray-200
                prose-td:text-gray-700 prose-td:px-4 prose-td:py-3 prose-td:border-b
                prose-td:border-gray-100 prose-td:align-top
                prose-tbody:prose-tr:transition-colors hover:prose-tbody:prose-tr:bg-gray-50
                prose-tbody:prose-tr:last-child:prose-td:border-b-0

                prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-8 prose-img:mx-auto
                prose-img:border prose-img:border-gray-200

                prose-hr:border-gray-200 prose-hr:my-12 prose-hr:border-t-2

                first:prose-p:mt-0 last:prose-p:mb-0
                prose-headings:first:mt-0
              ">
                              <ArticleContent content={post.body} />
              </div>
            </article>

            {/* 作者資訊 */}
            <AuthorInfo author={post.author} />

            {/* 相關文章 */}
            <RelatedPosts currentPost={post} />
          </div>
        </div>

        {/* 回到頂部按鈕 */}
        <BackToTop />
      </main>
    </>
  )
}
