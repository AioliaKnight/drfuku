/**
 * Blog 文章內文 Tailwind Typography prose 樣式
 *
 * 三層架構分工：
 * ┌──────────────────────┬─────────────────────────────────────────────┐
 * │ tailwind.config.ts   │ Typography 外掛色彩 CSS 變數（唯一色彩來源）  │
 * │ prose.ts（此檔案）     │ 結構性樣式（間距、字級、邊框、字重）          │
 * │                      │ + 單一 CSS 變數無法表達的逐級標題色彩          │
 * │ globals.css          │ pseudo-elements、複雜選擇器、動態 DOM 樣式    │
 * └──────────────────────┴─────────────────────────────────────────────┘
 *
 * 色彩已在 tailwind.config.ts 透過 CSS 變數統一控制，此檔案僅保留：
 * - 結構樣式（不含色彩 → 由 CSS 變數處理）
 * - 逐級標題色彩（H1~H4 各不同 → CSS 變數只能設單一 headings 色）
 * - 互動狀態色彩（hover → CSS 變數無法表達）
 */

export const proseStyles = [
  // 基礎 prose（不使用 prose-slate，色彩由 CSS 變數控制）
  'prose',
  'prose-lg',
  'md:prose-xl',
  'mx-auto',

  // --- 段落 ---
  'prose-p:leading-[1.9]',
  'prose-p:tracking-wide',
  'prose-p:mb-6',

  // --- 標題通用 ---
  'prose-headings:scroll-mt-24',
  'prose-headings:font-bold',
  'prose-headings:tracking-tight',

  // H1（文章內文 H1 由 globals.css 隱藏，PostHeader 已顯示標題）
  'prose-h1:text-3xl',
  'md:prose-h1:text-4xl',
  'prose-h1:text-brand-900',
  'prose-h1:border-b-4',
  'prose-h1:border-brand-100',
  'prose-h1:pb-4',
  'prose-h1:mb-8',

  // H2（逐級色彩 → CSS 變數 --tw-prose-headings 只能設單色，此處覆蓋）
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

  // --- 連結（互動狀態必須用 utility） ---
  'prose-a:no-underline',
  'prose-a:border-b',
  'prose-a:border-brand-200',
  'prose-a:transition-colors',
  'prose-a:duration-200',
  'hover:prose-a:text-brand-700',
  'hover:prose-a:border-brand-500',

  // --- 粗體 ---
  'prose-strong:font-semibold',

  // --- 引言 ---
  'prose-blockquote:border-l-4',
  'prose-blockquote:bg-brand-50/40',
  'prose-blockquote:not-italic',
  'prose-blockquote:rounded-r-xl',
  'prose-blockquote:py-4',
  'prose-blockquote:px-6',
  'prose-blockquote:my-8',
  'prose-blockquote:shadow-sm',

  // --- 列表 ---
  'prose-li:leading-relaxed',
  'prose-li:my-2',

  // --- 表格（結構樣式由 .table-wrapper 處理，僅保留表頭/儲存格間距） ---
  'prose-thead:bg-brand-50',
  'prose-th:font-semibold',
  'prose-th:px-4',
  'prose-th:py-3',
  'prose-td:px-4',
  'prose-td:py-3',
  'prose-td:border-b',
  'prose-td:border-gray-100',

  // --- 程式碼（inline code） ---
  'prose-code:bg-brand-50',
  'prose-code:px-1.5',
  'prose-code:py-0.5',
  'prose-code:rounded',
  'prose-code:text-sm',
  'prose-code:font-medium',

  // --- 分隔線（漸層效果由 globals.css 處理，此處僅控制間距） ---
  'prose-hr:my-12',

  // --- 圖片 ---
  'prose-img:rounded-2xl',
  'prose-img:shadow-lg',
  'prose-img:my-8',
].join(' ')
