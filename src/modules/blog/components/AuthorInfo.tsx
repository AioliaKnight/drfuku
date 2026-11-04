import Image from 'next/image'
import Link from 'next/link'
import { DOCTOR, ASSETS, CLINIC } from '@/config/constants'
import {
  HiOutlineAcademicCap,
  HiOutlineArrowRight,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineShieldCheck,
} from 'react-icons/hi2'

interface AuthorInfoProps {
  author: string
  expertise?: {
    credentials?: string
    certifications?: string[]
    experience?: string
  }
}

export default function AuthorInfo({ author, expertise }: AuthorInfoProps) {
  const certifications = expertise?.certifications ?? [
    '大腸直腸外科專科醫師 (直專醫字第324號)',
    '外科專科醫師 (外專醫字第006107號)',
    '中國醫藥大學中西醫雙學士',
  ]

  return (
    <aside
      aria-label="作者與專科諮詢資訊"
      className="mx-auto mt-16 max-w-4xl space-y-6"
    >
      {/* 專科醫師 E-E-A-T 卡片 */}
      <div className="overflow-hidden rounded-2xl bg-linear-to-br from-brand-50/60 to-white border border-brand-100/60 shadow-lg">
        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
            {/* 醫師照片 */}
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-white shadow-md ring-4 ring-brand-100 sm:h-32 sm:w-32">
              <Image
                src={ASSETS.doctorPhoto}
                alt={author}
                fill
                sizes="(max-width: 640px) 112px, 128px"
                className="object-cover object-center"
              />
            </div>

            {/* 文字內容 */}
            <div className="flex-1 text-center sm:text-left">
              <div className="mb-1 flex items-center justify-center gap-2 sm:justify-start">
                <HiOutlineAcademicCap className="h-5 w-5 text-brand-500" />
                <span className="text-sm font-medium text-brand-600">
                  本文主筆與醫學審閱
                </span>
              </div>

              <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                {author || DOCTOR.name}（阿福醫師）
              </h3>

              <p className="text-sm font-semibold text-brand-700 sm:text-base">
                {DOCTOR.title}｜20年臨床經驗・中西醫雙學士
              </p>

              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {expertise?.experience || DOCTOR.description}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                {certifications.map((cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-brand-800 ring-1 ring-brand-200/60"
                  >
                    <HiOutlineShieldCheck className="h-3.5 w-3.5 text-brand-600" />
                    {cert}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                <a
                  href={CLINIC.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#06C755] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <HiOutlineChatBubbleBottomCenterText className="h-5 w-5" />
                  LINE 一對一隱私諮詢 (@772pable)
                </a>
                <Link
                  href="/hemorrhoid-surgery/"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  LHP 雷射與微創手術解析
                  <HiOutlineArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about/"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  認識阿福醫師與 5 大門診據點
                  <HiOutlineArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

