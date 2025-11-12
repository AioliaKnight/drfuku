'use client'

import { useEffect, useRef } from 'react'

interface ArticleContentProps {
  content: string
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      // 自動包裝表格
      const tables = contentRef.current.querySelectorAll('table')
      tables.forEach(table => {
        if (!table.parentElement?.classList.contains('table-wrapper')) {
          const wrapper = document.createElement('div')
          wrapper.className = 'table-wrapper'
          table.parentNode?.insertBefore(wrapper, table)
          wrapper.appendChild(table)
        }
      })
    }
  }, [content])

  return (
    <div
      ref={contentRef}
      className="article-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
