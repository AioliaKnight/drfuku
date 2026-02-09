'use client'

import { useState } from 'react'
import Image from 'next/image'
import { HiOutlineDocumentText } from 'react-icons/hi2'

interface PostCoverProps {
  image: string
  title: string
}

export default function PostCover({ image, title }: PostCoverProps) {
  const [hasError, setHasError] = useState(false)

  // 無圖或載入失敗 → 顯示漸層背景 fallback
  if (!image || hasError) {
    return (
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden bg-linear-to-br from-brand-600 via-brand-700 to-brand-900">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80">
          <HiOutlineDocumentText className="mb-4 h-16 w-16 opacity-40" />
          <p className="text-lg font-medium opacity-60">醫療知識文章</p>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      </div>
    )
  }

  return (
    <div className="relative h-[50vh] min-h-[380px] max-h-[560px] overflow-hidden bg-gray-100">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        onError={() => setHasError(true)}
      />
      {/* 下方漸層遮罩，讓 PostHeader 卡片更好融合 */}
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
    </div>
  )
}
