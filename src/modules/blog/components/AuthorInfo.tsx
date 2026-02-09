import Image from 'next/image'
import Link from 'next/link'
import { DOCTOR, ASSETS } from '@/config/constants'
import { HiOutlineAcademicCap, HiOutlineArrowRight } from 'react-icons/hi2'

interface AuthorInfoProps {
  author: string
}

export default function AuthorInfo({ author }: AuthorInfoProps) {
  return (
    <aside
      aria-label="作者資訊"
      className="mx-auto mt-16 max-w-4xl"
    >
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50/60 to-white border border-brand-100/60 shadow-lg">
        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
            {/* 醫師照片 */}
            <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full bg-white shadow-md ring-4 ring-brand-100 sm:h-32 sm:w-32">
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
                  本文作者
                </span>
              </div>

              <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                {author || DOCTOR.name}
              </h3>

              <p className="text-sm font-medium text-brand-700 sm:text-base">
                {DOCTOR.title}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {DOCTOR.description}
              </p>

              <Link
                href="/about"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
              >
                了解更多
                <HiOutlineArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
