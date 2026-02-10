'use client'

import { useEffect, useRef } from 'react'
import { SITE } from '@/config/constants'

interface ArticleContentProps {
  content: string
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const root = contentRef.current

    // AbortController 用於統一清理所有 event listeners
    const controller = new AbortController()
    const { signal } = controller

    // 從 SITE.url 取得域名（移除 protocol）
    const siteDomain = new URL(SITE.url).hostname

    // 1. 自動包裝表格（響應式水平捲動）
    const tables = root.querySelectorAll('table')
    tables.forEach((table) => {
      if (table.parentElement?.classList.contains('table-wrapper')) return
      const wrapper = document.createElement('div')
      wrapper.className = 'table-wrapper'
      table.parentNode?.insertBefore(wrapper, table)
      wrapper.appendChild(table)

      // 為偶數列添加斑馬紋
      const rows = table.querySelectorAll('tbody tr')
      rows.forEach((row, i) => {
        if (i % 2 === 1) {
          ;(row as HTMLElement).style.backgroundColor = 'rgba(240, 249, 255, 0.5)'
        }
      })
    })

    // 2. 外部連結處理（新分頁開啟 + 圖示標記）
    const links = root.querySelectorAll('a[href]')
    links.forEach((link) => {
      const href = link.getAttribute('href')
      if (!href) return

      if (href.startsWith('http') && !href.includes(siteDomain)) {
        link.setAttribute('target', '_blank')
        link.setAttribute('rel', 'noopener noreferrer')
        if (!link.querySelector('.external-icon')) {
          const icon = document.createElement('span')
          icon.className = 'external-icon'
          icon.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="display:inline;width:0.85em;height:0.85em;margin-left:0.15em;vertical-align:-0.1em;opacity:0.5"><path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.563a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.06l-6.22 6.22a.75.75 0 11-1.06-1.06L13.94 5h-2.44a.75.75 0 01-.75-.75z" clip-rule="evenodd" /></svg>'
          link.appendChild(icon)
        }
      }

      if (href.startsWith('#')) {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          const target = document.getElementById(href.slice(1))
          target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, { signal })
      }
    })

    // 3. 為 heading 添加 hover anchor link
    const headings = root.querySelectorAll('h2[id], h3[id], h4[id]')
    headings.forEach((heading) => {
      const id = heading.getAttribute('id')
      if (!id || heading.querySelector('.heading-anchor')) return

      const anchor = document.createElement('a')
      anchor.className = 'heading-anchor'
      anchor.href = `#${id}`
      anchor.setAttribute('aria-hidden', 'true')
      anchor.innerHTML = '#'
      heading.appendChild(anchor)
    })

    // 4. 圖片增強
    const images = root.querySelectorAll('img')
    images.forEach((img) => {
      img.setAttribute('loading', 'lazy')
      img.setAttribute('decoding', 'async')
      const alt = img.getAttribute('alt')
      if (alt && alt.length > 5 && !img.parentElement?.classList.contains('image-figure')) {
        const figure = document.createElement('figure')
        figure.className = 'image-figure'
        const caption = document.createElement('figcaption')
        caption.className = 'image-caption'
        caption.textContent = alt
        img.parentNode?.insertBefore(figure, img)
        figure.appendChild(img)
        figure.appendChild(caption)
      }
    })

    // 5. FAQ Q&A 區塊增強
    enhanceFAQSection(root, signal)

    // Cleanup：移除所有透過 signal 註冊的 event listeners
    return () => {
      controller.abort()
    }
  }, [content])

  return (
    <div
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

/**
 * 偵測並增強 FAQ 區塊的 Q&A 呈現
 */
function enhanceFAQSection(root: HTMLDivElement, signal: AbortSignal) {
  const allH2 = root.querySelectorAll('h2')
  let faqHeading: HTMLElement | null = null

  for (const h2 of allH2) {
    const text = h2.textContent || ''
    if (text.includes('常見問題') || text.includes('FAQ')) {
      faqHeading = h2 as HTMLElement
      break
    }
  }

  if (!faqHeading) return

  const qaParagraphs: HTMLParagraphElement[] = []
  let sibling = faqHeading.nextElementSibling

  while (sibling) {
    if (sibling.tagName === 'H2') break
    if (sibling.tagName === 'P') {
      const text = sibling.textContent || ''
      if (text.includes('Q：') || text.includes('Q:')) {
        qaParagraphs.push(sibling as HTMLParagraphElement)
      }
    }
    sibling = sibling.nextElementSibling
  }

  const firstQA = qaParagraphs[0]
  if (!firstQA) return

  const faqContainer = document.createElement('div')
  faqContainer.className = 'faq-container'
  faqContainer.setAttribute('role', 'list')
  faqContainer.setAttribute('aria-label', '常見問題')

  firstQA.parentNode?.insertBefore(faqContainer, firstQA)

  qaParagraphs.forEach((p, index) => {
    const html = p.innerHTML
    const { question, answer } = parseQA(html)

    if (!question) return

    const card = document.createElement('div')
    card.className = 'faq-item'
    card.setAttribute('role', 'listitem')

    const questionBtn = document.createElement('button')
    questionBtn.className = 'faq-question'
    questionBtn.setAttribute('type', 'button')
    questionBtn.setAttribute('aria-expanded', index === 0 ? 'true' : 'false')
    const questionId = `faq-q-${index}`
    const answerId = `faq-a-${index}`
    questionBtn.setAttribute('id', questionId)
    questionBtn.setAttribute('aria-controls', answerId)
    questionBtn.innerHTML = `
      <span class="faq-question-text">${question}</span>
      <span class="faq-chevron" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 8l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    `

    const answerDiv = document.createElement('div')
    answerDiv.className = 'faq-answer'
    answerDiv.setAttribute('id', answerId)
    answerDiv.setAttribute('role', 'region')
    answerDiv.setAttribute('aria-labelledby', questionId)

    // 第一個 FAQ 預設展開，其餘收合
    if (index === 0) {
      answerDiv.classList.add('faq-answer--open')
      answerDiv.setAttribute('aria-hidden', 'false')
    } else {
      answerDiv.setAttribute('aria-hidden', 'true')
    }

    const answerInner = document.createElement('div')
    answerInner.className = 'faq-answer-inner'
    answerInner.innerHTML = answer
      ? `<p>${answer}</p>`
      : ''
    answerDiv.appendChild(answerInner)

    // 使用 signal 註冊事件，確保 cleanup 時自動移除
    questionBtn.addEventListener('click', () => {
      const isOpen = questionBtn.getAttribute('aria-expanded') === 'true'
      const willOpen = !isOpen
      questionBtn.setAttribute('aria-expanded', String(willOpen))
      answerDiv.classList.toggle('faq-answer--open')
      answerDiv.setAttribute('aria-hidden', String(!willOpen))
    }, { signal })

    card.appendChild(questionBtn)
    card.appendChild(answerDiv)
    faqContainer.appendChild(card)

    p.remove()
  })
}

/**
 * 解析 Q&A 的 HTML 內容
 */
function parseQA(html: string): { question: string; answer: string } {
  let question = ''
  let answer = ''

  const qMatch = html.match(/<strong>Q[：:]\s*(.*?)<\/strong>/s)
  if (qMatch?.[1]) {
    question = qMatch[1].trim()
  }

  const brSplit = html.split(/<br\s*\/?>/)
  let answerHtml = ''

  if (brSplit.length > 1) {
    answerHtml = brSplit.slice(1).join('<br>')
  } else {
    const strongEnd = html.indexOf('</strong>')
    if (strongEnd > -1) {
      answerHtml = html.substring(strongEnd + '</strong>'.length)
    }
  }

  answer = answerHtml
    .replace(/^\s*\*\*A[：:]\*\*\s*/s, '')
    .replace(/<strong>A[：:]\s*<\/strong>\s*/s, '')
    .replace(/^\s*A[：:]\s*/s, '')
    .replace(/^\s*\n\s*/s, '')
    .trim()

  return { question, answer }
}
