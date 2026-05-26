import { defineConfig, defineCollection, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const CATEGORIES = [
  '預防保健',
  '治療方法',
  '術後照護',
  '飲食保健',
  '疾病衛教',
  '疾病警訊',
  '居家照護',
  '特殊照護',
  '疾病治療',
  '中醫治療',
] as const

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.{md,mdx}',
  schema: s
    .object({
      title: s.string(),
      summary: s.string(),
      publishedAt: s.isodate(),
      updatedAt: s.isodate().optional(),
      image: s.string(),
      author: s.string().default('徐彥勳醫師'),
      category: s.enum(CATEGORIES),
      tags: s.array(s.string()),
      featured: s.boolean().default(false),
      draft: s.boolean().default(false),
      seo: s.object({
        keywords: s.array(s.string()).optional(),
        canonical: s.string().optional(),
      }).optional(),
      content: s.mdx(),
      body: s.markdown(),
    })
    .transform((data, { meta }) => {
      // 正確處理 Windows 路徑分隔符
      const slug = (meta.path as string)
        .replace(/\\/g, '/') // 將 Windows 反斜線轉為正斜線
        .replace(/^.*\/blog\//, '')
        .replace(/\.(md|mdx)$/, '')

      // 計算閱讀時間（中文按字數，英文按單詞數）
      const content = meta.content as string
      const chineseChars = (content.match(/[\u4e00-\u9fff]/g) || []).length
      const englishWords = content.replace(/[\u4e00-\u9fff]/g, '').split(/\s+/).filter(word => word.length > 0).length
      const readingTime = Math.ceil((chineseChars / 300) + (englishWords / 200))

      return {
        ...data,
        slug,
        url: `/blog/${slug}`,
        readingTime: Math.max(1, readingTime), // 至少1分鐘
        wordCount: chineseChars + englishWords,
      }
    }),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkGfm],
  },
})
