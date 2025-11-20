export const proseStyles = `
  /* 基礎排版設定 */
  prose prose-lg md:prose-xl prose-slate mx-auto
  max-w-none
  
  /* 標題通用設定 */
  prose-headings:scroll-mt-24 
  prose-headings:font-bold 
  prose-headings:tracking-tight
  prose-headings:text-brand-900
  
  /* H1 - 主標題 */
  prose-h1:text-3xl md:prose-h1:text-4xl lg:prose-h1:text-5xl
  prose-h1:leading-tight 
  prose-h1:font-black 
  prose-h1:mb-8 md:prose-h1:mb-12
  prose-h1:pb-4 md:prose-h1:pb-6
  prose-h1:border-b-4 prose-h1:border-brand-100
  
  /* H2 - 次標題 */
  prose-h2:text-2xl md:prose-h2:text-3xl
  prose-h2:leading-snug
  prose-h2:font-extrabold
  prose-h2:text-brand-800
  prose-h2:mt-12 md:prose-h2:mt-16 
  prose-h2:mb-6 md:prose-h2:mb-8
  prose-h2:pl-4 md:prose-h2:pl-6
  prose-h2:border-l-4 prose-h2:border-brand-400
  prose-h2:rounded-r-lg
  prose-h2:bg-gradient-to-r prose-h2:from-brand-50 prose-h2:to-transparent
  prose-h2:py-2
  
  /* H3 - 小標題 */
  prose-h3:text-xl md:prose-h3:text-2xl
  prose-h3:font-bold
  prose-h3:text-brand-700
  prose-h3:mt-8 md:prose-h3:mt-10
  prose-h3:mb-4
  prose-h3:flex prose-h3:items-center prose-h3:gap-2
  prose-h3:before:content-[''] prose-h3:before:w-2 prose-h3:before:h-2 prose-h3:before:rounded-full prose-h3:before:bg-brand-500 prose-h3:before:inline-block
  
  /* H4 & H5 - 細節標題 */
  prose-h4:text-lg md:prose-h4:text-xl prose-h4:font-bold prose-h4:text-brand-600 prose-h4:mt-6 prose-h4:mb-3
  prose-h5:text-base md:prose-h5:text-lg prose-h5:font-semibold prose-h5:text-brand-500 prose-h5:mt-4 prose-h5:mb-2
  
  /* 內文設定 */
  prose-p:text-base md:prose-p:text-lg
  prose-p:leading-relaxed md:prose-p:leading-loose
  prose-p:text-gray-700
  prose-p:mb-6 md:prose-p:mb-8
  prose-p:tracking-wide
  prose-p:text-justify
  
  /* 連結設定 */
  prose-a:text-brand-600 
  prose-a:font-medium 
  prose-a:no-underline 
  prose-a:border-b prose-a:border-brand-200
  prose-a:transition-all prose-a:duration-200
  hover:prose-a:text-brand-700 
  hover:prose-a:border-brand-500
  hover:prose-a:bg-brand-50
  
  /* 強調文字 */
  prose-strong:text-brand-900 prose-strong:font-bold
  prose-em:text-gray-600 prose-em:italic
  
  /* 列表設定 */
  prose-ul:my-6 md:prose-ul:my-8 
  prose-ul:list-none 
  prose-ul:pl-0
  
  prose-li:relative 
  prose-li:pl-6 
  prose-li:mb-3
  prose-li:text-base md:prose-li:text-lg
  prose-li:leading-relaxed
  prose-li:text-gray-700
  prose-li:before:content-['•'] 
  prose-li:before:absolute 
  prose-li:before:left-0 
  prose-li:before:text-brand-400 
  prose-li:before:font-bold
  
  /* 數字列表 */
  prose-ol:my-6 md:prose-ol:my-8
  prose-ol:pl-6
  prose-ol:text-base md:prose-ol:text-lg
  prose-ol:text-gray-700
  marker:prose-ol:text-brand-500 marker:prose-ol:font-bold
  
  /* 引用區塊 */
  prose-blockquote:my-8 md:prose-blockquote:my-12
  prose-blockquote:border-l-4 prose-blockquote:border-brand-400
  prose-blockquote:bg-brand-50/30
  prose-blockquote:py-6 prose-blockquote:px-8
  prose-blockquote:rounded-r-xl
  prose-blockquote:not-italic
  prose-blockquote:text-gray-700
  prose-blockquote:shadow-sm
  prose-blockquote:relative
  prose-blockquote:before:content-['"'] prose-blockquote:before:text-6xl prose-blockquote:before:text-brand-200 prose-blockquote:before:absolute prose-blockquote:before:-top-4 prose-blockquote:before:left-4 prose-blockquote:before:font-serif prose-blockquote:before:opacity-50
  
  /* 程式碼區塊 */
  prose-pre:bg-gray-900 
  prose-pre:text-gray-50 
  prose-pre:rounded-2xl 
  prose-pre:shadow-xl 
  prose-pre:p-6 
  prose-pre:my-8
  prose-pre:overflow-x-auto
  
  prose-code:text-brand-600 
  prose-code:bg-brand-50 
  prose-code:px-1.5 prose-code:py-0.5 
  prose-code:rounded-md 
  prose-code:text-sm 
  prose-code:font-mono
  prose-code:before:content-none prose-code:after:content-none
  
  /* 圖片 */
  prose-img:rounded-2xl 
  prose-img:shadow-lg 
  prose-img:my-10 md:prose-img:my-12
  prose-img:w-full 
  prose-img:object-cover
  
  /* 表格 */
  prose-table:my-8 
  prose-table:w-full 
  prose-table:border-collapse 
  prose-table:shadow-md 
  prose-table:rounded-lg 
  prose-table:overflow-hidden
  
  prose-th:bg-brand-50 
  prose-th:text-brand-900 
  prose-th:p-4 
  prose-th:text-left 
  prose-th:font-bold
  
  prose-td:p-4 
  prose-td:border-b prose-td:border-gray-100 
  prose-td:text-gray-600
  
  /* 分隔線 */
  prose-hr:border-gray-200 prose-hr:my-12 prose-hr:border-t-2
  
  /* 首尾元素間距調整 */
  first:prose-p:mt-0 last:prose-p:mb-0
  prose-headings:first:mt-0
`
