/**
 * Blog 文章內文 Tailwind Typography prose 樣式
 *
 * 這是文章結構樣式的唯一控制層（Single Source of Truth）。
 * - tailwind.config.ts → 只定義色彩 CSS 變數
 * - globals.css → 只處理 pseudo-elements 和複雜選擇器
 * - 此檔案 → 控制所有結構性樣式（間距、字級、色彩覆蓋）
 */

export const proseStyles = [
  // 基礎 prose
  'prose',
  'prose-lg',
  'md:prose-xl',
  'prose-slate',
  'mx-auto',
  'max-w-none',

  // --- 段落 ---
  'prose-p:text-gray-700',
  'prose-p:leading-[1.9]',
  'prose-p:tracking-wide',
  'prose-p:mb-6',

  // --- 標題通用 ---
  'prose-headings:scroll-mt-24',
  'prose-headings:font-bold',
  'prose-headings:tracking-tight',

  // H1
  'prose-h1:text-3xl',
  'md:prose-h1:text-4xl',
  'prose-h1:text-brand-900',
  'prose-h1:border-b-4',
  'prose-h1:border-brand-100',
  'prose-h1:pb-4',
  'prose-h1:mb-8',

  // H2
  'prose-h2:text-2xl',
  'md:prose-h2:text-3xl',
  'prose-h2:text-brand-800',
  'prose-h2:mt-14',
  'prose-h2:mb-6',
  'prose-h2:pl-4',
  'prose-h2:border-l-4',
  'prose-h2:border-brand-400',

  // H3
  'prose-h3:text-xl',
  'md:prose-h3:text-2xl',
  'prose-h3:text-brand-700',
  'prose-h3:mt-10',
  'prose-h3:mb-4',

  // H4
  'prose-h4:text-lg',
  'md:prose-h4:text-xl',
  'prose-h4:text-brand-600',
  'prose-h4:mt-8',
  'prose-h4:mb-3',

  // --- 連結 ---
  'prose-a:text-brand-600',
  'prose-a:no-underline',
  'prose-a:border-b',
  'prose-a:border-brand-200',
  'prose-a:transition-colors',
  'prose-a:duration-200',
  'hover:prose-a:text-brand-700',
  'hover:prose-a:border-brand-500',

  // --- 粗體 ---
  'prose-strong:text-brand-900',
  'prose-strong:font-semibold',

  // --- 引言 ---
  'prose-blockquote:border-l-4',
  'prose-blockquote:border-brand-400',
  'prose-blockquote:bg-brand-50/40',
  'prose-blockquote:not-italic',
  'prose-blockquote:rounded-r-xl',
  'prose-blockquote:py-4',
  'prose-blockquote:px-6',
  'prose-blockquote:my-8',
  'prose-blockquote:text-gray-700',
  'prose-blockquote:shadow-sm',

  // --- 列表 ---
  'prose-li:text-gray-700',
  'prose-li:leading-relaxed',
  'prose-li:my-1',

  // --- 表格 ---
  'prose-table:shadow-md',
  'prose-table:rounded-xl',
  'prose-table:overflow-hidden',
  'prose-thead:bg-brand-50',
  'prose-th:text-brand-900',
  'prose-th:font-semibold',
  'prose-th:px-4',
  'prose-th:py-3',
  'prose-td:px-4',
  'prose-td:py-3',
  'prose-td:border-b',
  'prose-td:border-gray-100',

  // --- 程式碼 ---
  'prose-code:bg-brand-50',
  'prose-code:px-1.5',
  'prose-code:py-0.5',
  'prose-code:rounded',
  'prose-code:text-brand-700',
  'prose-code:text-sm',
  'prose-code:font-medium',

  // --- 分隔線 ---
  'prose-hr:border-gray-200',
  'prose-hr:my-12',

  // --- 圖片 ---
  'prose-img:rounded-2xl',
  'prose-img:shadow-lg',
  'prose-img:my-8',
].join(' ')

/**
 * 文章容器佈局樣式
 */
export const articleContainerStyles = [
  'relative',
  'z-10',
  'pb-24',
  'pt-8',
  'md:pt-12',
].join(' ')

/**
 * 文章內容區域外框樣式
 */
export const articleWrapperStyles = [
  'mx-auto',
  'max-w-4xl',
  'px-4',
  'sm:px-6',
  'lg:px-0',
].join(' ')
