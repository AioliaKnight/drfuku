'use client'

import { useState, useMemo } from 'react'
import { HiOutlineListBullet, HiChevronDown } from 'react-icons/hi2'

interface TOCItem {
  id: string
  text: string
  level: 2 | 3
}

interface TableOfContentsProps {
  html: string
}

/**
 * 從 Velite 產出的 HTML 提取 H2 與非 Q&A 的 H3 標題，建立文章目錄導覽
 */
function extractHeadings(html: string): TOCItem[] {
  const items: TOCItem[] = []
  const regex = /<h([23])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi

  for (const match of html.matchAll(regex)) {
    const level = Number(match[1]) as 2 | 3
    const id = match[2] || ''
    const rawText = (match[3] || '')
      .replace(/<[^>]*>/g, '')
      .replace(/\*\*/g, '')
      .trim()

    if (!id || !rawText) continue
    // 略過 FAQ 單題 H3（只保留 FAQ 的 H2 主標題，避免目錄過長）
    if (level === 3 && (/^Q[0-9]*[：:]/i.test(rawText) || /^問[：:]/.test(rawText))) {
      continue
    }

    items.push({ id, text: rawText, level })
  }

  return items
}

export default function TableOfContents({ html }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true)
  const headings = useMemo(() => extractHeadings(html), [html])

  if (headings.length < 2) return null

  const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <nav
      aria-label="文章目錄導覽"
      className="my-8 overflow-hidden rounded-2xl border border-brand-100 bg-brand-50/40 shadow-warm-sm"
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-brand-50/80"
      >
        <span className="flex items-center gap-2.5 text-base font-bold text-brand-900 font-serif">
          <HiOutlineListBullet className="h-5 w-5 text-brand-600 shrink-0" />
          <span>本文臨床重點目錄（點擊快速跳轉）</span>
        </span>
        <HiChevronDown
          className={`h-5 w-5 text-brand-600 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-brand-100/80 px-6 py-4">
          <ol className="space-y-2 text-sm">
            {headings.map((item) => (
              <li
                key={item.id}
                className={item.level === 3 ? 'pl-5 text-neutral-600' : 'font-semibold text-neutral-800'}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleJump(e, item.id)}
                  className="inline-flex items-baseline gap-2 py-0.5 transition-colors hover:text-brand-600"
                >
                  <span className="text-brand-400 select-none">
                    {item.level === 2 ? '▪' : '◦'}
                  </span>
                  <span>{item.text}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </nav>
  )
}
