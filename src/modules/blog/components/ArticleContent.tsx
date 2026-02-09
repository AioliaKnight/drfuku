'use client'

import { useEffect, useRef } from 'react'

interface ArticleContentProps {
  content: string
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const root = contentRef.current

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

      if (href.startsWith('http') && !href.includes('drfuku.com')) {
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
        })
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
    enhanceFAQSection(root)
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
 * HTML 結構：
 *   <h2>常見問題 FAQ</h2>
 *   <p><strong>Q：...？</strong><br>**A：**...</p>
 *   <p><strong>Q：...？</strong><br>**A：**...</p>
 */
function enhanceFAQSection(root: HTMLDivElement) {
  // 找到 FAQ 標題
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

  // 收集 FAQ 標題之後的所有 Q&A <p> 元素（直到下一個 h2）
  const qaParagraphs: HTMLParagraphElement[] = []
  let sibling = faqHeading.nextElementSibling

  while (sibling) {
    // 遇到下一個 h2 就停止
    if (sibling.tagName === 'H2') break

    if (sibling.tagName === 'P') {
      const text = sibling.textContent || ''
      // 偵測是否包含 Q&A 模式
      if (text.includes('Q：') || text.includes('Q:')) {
        qaParagraphs.push(sibling as HTMLParagraphElement)
      }
    }

    sibling = sibling.nextElementSibling
  }

  const firstQA = qaParagraphs[0]
  if (!firstQA) return

  // 建立 FAQ 容器
  const faqContainer = document.createElement('div')
  faqContainer.className = 'faq-container'
  faqContainer.setAttribute('role', 'list')
  faqContainer.setAttribute('aria-label', '常見問題')

  // 在第一個 Q&A 段落前插入容器
  firstQA.parentNode?.insertBefore(faqContainer, firstQA)

  qaParagraphs.forEach((p, index) => {
    const html = p.innerHTML
    // 解析 Q 和 A
    const { question, answer } = parseQA(html)

    if (!question) return

    // 建立 Q&A 卡片
    const card = document.createElement('div')
    card.className = 'faq-item'
    card.setAttribute('role', 'listitem')

    // 問題按鈕
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

    // 答案區塊
    const answerDiv = document.createElement('div')
    answerDiv.className = 'faq-answer'
    answerDiv.setAttribute('id', answerId)
    answerDiv.setAttribute('role', 'region')
    answerDiv.setAttribute('aria-labelledby', questionId)

    if (index === 0) {
      answerDiv.classList.add('faq-answer--open')
    }

    const answerInner = document.createElement('div')
    answerInner.className = 'faq-answer-inner'
    answerInner.innerHTML = answer
      ? `<p>${answer}</p>`
      : ''
    answerDiv.appendChild(answerInner)

    // 點擊事件 - accordion 效果
    questionBtn.addEventListener('click', () => {
      const isOpen = questionBtn.getAttribute('aria-expanded') === 'true'
      questionBtn.setAttribute('aria-expanded', String(!isOpen))
      answerDiv.classList.toggle('faq-answer--open')
    })

    card.appendChild(questionBtn)
    card.appendChild(answerDiv)
    faqContainer.appendChild(card)

    // 移除原始段落
    p.remove()
  })
}

/**
 * 解析 Q&A 的 HTML 內容
 *
 * 支援三種格式：
 * 1. <strong>Q：問題？</strong><br>**A：**回答。       (有 <br>，A 為 literal markdown)
 * 2. <strong>Q：問題？</strong><br><strong>A：</strong>回答。 (有 <br>，A 為正確 HTML)
 * 3. <strong>Q：問題？</strong>\n**A：**回答。          (無 <br>，Q 和 A 以換行分隔)
 */
function parseQA(html: string): { question: string; answer: string } {
  let question = ''
  let answer = ''

  // 提取問題 - <strong>Q：...？</strong>
  const qMatch = html.match(/<strong>Q[：:]\s*(.*?)<\/strong>/s)
  if (qMatch?.[1]) {
    question = qMatch[1].trim()
  }

  // 提取答案 - 優先用 <br> 切分，其次用 </strong> 後的內容
  const brSplit = html.split(/<br\s*\/?>/)
  let answerHtml = ''

  if (brSplit.length > 1) {
    // Format 1 & 2：有 <br> 分隔
    answerHtml = brSplit.slice(1).join('<br>')
  } else {
    // Format 3：無 <br>，取 </strong> 後的所有內容
    const strongEnd = html.indexOf('</strong>')
    if (strongEnd > -1) {
      answerHtml = html.substring(strongEnd + '</strong>'.length)
    }
  }

  // 清理 **A：** 的各種渲染形式
  answer = answerHtml
    .replace(/^\s*\*\*A[：:]\*\*\s*/s, '')         // 原始 markdown 文字 **A：**
    .replace(/<strong>A[：:]\s*<\/strong>\s*/s, '')  // 正確渲染的 HTML <strong>A：</strong>
    .replace(/^\s*A[：:]\s*/s, '')                   // 純文字 A：
    .replace(/^\s*\n\s*/s, '')                       // 清理開頭換行
    .trim()

  return { question, answer }
}
