export const proseStyles = [
  // 基礎設定
  'prose prose-lg md:prose-xl prose-slate mx-auto',
  'max-w-none',
  
  // 標題設定
  'prose-headings:font-bold',
  'prose-headings:tracking-tight',
  'prose-headings:text-brand-900',
  'prose-headings:scroll-mt-24',

  // H1 主標題 - 漸層文字與裝飾底線
  'prose-h1:text-3xl md:prose-h1:text-4xl lg:prose-h1:text-5xl',
  'prose-h1:font-black',
  'prose-h1:mb-10 md:prose-h1:mb-14',
  'prose-h1:pb-6',
  'prose-h1:border-b-4 prose-h1:border-brand-100',
  'prose-h1:bg-gradient-to-r prose-h1:from-brand-900 prose-h1:via-brand-700 prose-h1:to-brand-900',
  'prose-h1:bg-clip-text prose-h1:text-transparent',
  
  // H2 次標題 - 側邊強調與背景區塊
  'prose-h2:text-2xl md:prose-h2:text-3xl',
  'prose-h2:font-extrabold',
  'prose-h2:text-brand-800',
  'prose-h2:mt-14 md:prose-h2:mt-20',
  'prose-h2:mb-8',
  'prose-h2:pl-6 prose-h2:py-3',
  'prose-h2:border-l-[6px] prose-h2:border-brand-500',
  'prose-h2:bg-gradient-to-r prose-h2:from-brand-50 prose-h2:to-transparent',
  'prose-h2:rounded-r-xl',
  
  // H3 小標題 - 圖標裝飾
  'prose-h3:text-xl md:prose-h3:text-2xl',
  'prose-h3:font-bold',
  'prose-h3:text-brand-700',
  'prose-h3:mt-10 md:prose-h3:mt-12',
  'prose-h3:mb-5',
  'prose-h3:flex prose-h3:items-center',
  'prose-h3:before:content-["▶"] prose-h3:before:mr-3 prose-h3:before:text-brand-500 prose-h3:before:text-base',
  
  // H4 & H5 - 簡約層級
  'prose-h4:text-lg md:prose-h4:text-xl prose-h4:font-bold prose-h4:text-brand-600',
  'prose-h4:mt-8 prose-h4:mb-4',
  'prose-h4:flex prose-h4:items-center',
  'prose-h4:before:content-["●"] prose-h4:before:mr-2 prose-h4:before:text-brand-400 prose-h4:before:text-xs',
  
  'prose-h5:text-base md:prose-h5:text-lg prose-h5:font-semibold prose-h5:text-brand-500',
  'prose-h5:border-b prose-h5:border-dashed prose-h5:border-brand-200 prose-h5:pb-1 prose-h5:inline-block',

  // 內文設定 - 優化中文閱讀體驗
  'prose-p:text-gray-700',
  'prose-p:leading-8 md:prose-p:leading-9', // 增加行高
  'prose-p:mb-8',
  'prose-p:text-justify',
  'prose-p:tracking-wide', // 增加字距
  
  // 列表設定
  'prose-ul:my-8 prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-3',
  'prose-li:text-gray-700 prose-li:pl-8 prose-li:relative',
  'prose-li:before:content-["✓"] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-0 prose-li:before:text-brand-500 prose-li:before:font-bold',
  
  'prose-ol:my-8 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-3',
  'prose-ol:marker:text-brand-600 prose-ol:marker:font-bold prose-ol:marker:text-lg',

  // 連結設定
  'prose-a:text-brand-600 prose-a:no-underline prose-a:border-b prose-a:border-brand-200',
  'prose-a:font-medium',
  'hover:prose-a:text-brand-700 hover:prose-a:border-brand-500 hover:prose-a:bg-brand-50',
  'prose-a:transition-all prose-a:duration-200',

  // 引用區塊 - 更精緻的設計
  'prose-blockquote:my-10 md:prose-blockquote:my-14',
  'prose-blockquote:border-l-4 prose-blockquote:border-brand-400',
  'prose-blockquote:bg-gradient-to-br prose-blockquote:from-brand-50/80 prose-blockquote:to-white',
  'prose-blockquote:py-6 prose-blockquote:px-8',
  'prose-blockquote:rounded-r-2xl prose-blockquote:rounded-bl-2xl',
  'prose-blockquote:not-italic',
  'prose-blockquote:text-gray-700 prose-blockquote:text-lg prose-blockquote:leading-relaxed',
  'prose-blockquote:shadow-sm prose-blockquote:border prose-blockquote:border-brand-100/50',
  'prose-blockquote:relative',
  'prose-blockquote:before:content-["“"] prose-blockquote:before:text-6xl prose-blockquote:before:text-brand-200 prose-blockquote:before:absolute prose-blockquote:before:-top-4 prose-blockquote:before:left-4 prose-blockquote:before:font-serif prose-blockquote:before:opacity-40',
  
  // 圖片與多媒體
  'prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-10 prose-img:border prose-img:border-gray-100',
  
  // 表格 (配合 globals.css 中的 table-wrapper)
  'prose-table:w-full prose-table:my-10 prose-table:border-collapse',
  'prose-th:bg-brand-50/80 prose-th:p-4 prose-th:text-left prose-th:text-brand-900 prose-th:font-bold prose-th:border-b-2 prose-th:border-brand-100',
  'prose-td:p-4 prose-td:border-b prose-td:border-gray-100 prose-td:text-gray-700 prose-td:align-top',
  'prose-tr:hover:bg-brand-50/30 prose-tr:transition-colors',
  
  // 程式碼
  'prose-code:text-brand-700 prose-code:bg-brand-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:border prose-code:border-brand-100',
  'prose-code:before:content-none prose-code:after:content-none',
  'prose-pre:bg-gray-900 prose-pre:text-gray-50 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:shadow-xl',
  
  // 分隔線
  'prose-hr:border-gray-200 prose-hr:my-12 prose-hr:border-t-2 prose-hr:border-dashed',
  
  // 強調
  'prose-strong:text-brand-900 prose-strong:font-bold prose-strong:bg-brand-50/50 prose-strong:px-1 prose-strong:rounded',
].join(' ')
