export const proseStyles = [
  // 基礎設定
  'prose prose-lg md:prose-xl prose-slate mx-auto',
  'max-w-none',
  
  // 標題設定
  'prose-headings:font-bold',
  'prose-headings:tracking-tight',
  'prose-headings:text-brand-900',
  'prose-headings:scroll-mt-24',

  // H1 主標題
  'prose-h1:text-3xl md:prose-h1:text-4xl lg:prose-h1:text-5xl',
  'prose-h1:font-black',
  'prose-h1:mb-8 md:prose-h1:mb-12',
  'prose-h1:pb-4',
  'prose-h1:border-b-4 prose-h1:border-brand-100',
  
  // H2 次標題
  'prose-h2:text-2xl md:prose-h2:text-3xl',
  'prose-h2:font-extrabold',
  'prose-h2:text-brand-800',
  'prose-h2:mt-12 md:prose-h2:mt-16',
  'prose-h2:mb-6',
  'prose-h2:pl-4 prose-h2:border-l-4 prose-h2:border-brand-400',
  'prose-h2:bg-gradient-to-r prose-h2:from-brand-50/50 prose-h2:to-transparent',
  'prose-h2:py-2 prose-h2:rounded-r-lg',
  
  // H3 小標題
  'prose-h3:text-xl md:prose-h3:text-2xl',
  'prose-h3:font-bold',
  'prose-h3:text-brand-700',
  'prose-h3:mt-8 md:prose-h3:mt-10',
  'prose-h3:flex prose-h3:items-center prose-h3:gap-3',
  
  // H4 & H5
  'prose-h4:text-lg md:prose-h4:text-xl prose-h4:font-bold prose-h4:text-brand-600',
  'prose-h5:text-base md:prose-h5:text-lg prose-h5:font-semibold prose-h5:text-brand-500',

  // 段落設定
  'prose-p:text-gray-700',
  'prose-p:leading-relaxed md:prose-p:leading-loose',
  'prose-p:mb-6',
  'prose-p:text-justify',
  
  // 列表設定
  'prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6',
  'prose-li:text-gray-700 prose-li:mb-2',
  'prose-li:marker:text-brand-400 prose-li:marker:font-bold',
  
  'prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6',
  'prose-ol:marker:text-brand-500 prose-ol:marker:font-bold',

  // 連結設定
  'prose-a:text-brand-600 prose-a:no-underline prose-a:border-b prose-a:border-brand-200',
  'hover:prose-a:text-brand-700 hover:prose-a:border-brand-500 hover:prose-a:bg-brand-50',
  'prose-a:transition-colors prose-a:duration-200',

  // 引用區塊
  'prose-blockquote:border-l-4 prose-blockquote:border-brand-400',
  'prose-blockquote:bg-brand-50/30',
  'prose-blockquote:py-4 prose-blockquote:px-6',
  'prose-blockquote:rounded-r-xl',
  'prose-blockquote:not-italic',
  'prose-blockquote:text-gray-700',
  
  // 圖片與多媒體
  'prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8',
  
  // 表格
  'prose-table:w-full prose-table:my-8 prose-table:border-collapse',
  'prose-th:bg-brand-50 prose-th:p-4 prose-th:text-left prose-th:text-brand-900',
  'prose-td:p-4 prose-td:border-b prose-td:border-gray-100',
  
  // 程式碼
  'prose-code:text-brand-600 prose-code:bg-brand-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none',
  'prose-pre:bg-gray-900 prose-pre:text-gray-50 prose-pre:rounded-2xl prose-pre:p-6',
  
  // 分隔線
  'prose-hr:border-gray-200 prose-hr:my-12',
].join(' ')
