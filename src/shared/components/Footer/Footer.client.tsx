'use client'

import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineInformationCircle
} from 'react-icons/hi2'
import { RiInstagramLine } from 'react-icons/ri'
import { FaFacebook } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/shared/hooks/useAnimation'
import { getTransition } from '@/shared/animation'
import { useEventTracking } from '@/shared/hooks/useEventTracking'
import { CLINIC } from '@/config/constants'
import {
  DOCTOR_COPY,
  PRACTICE_LOCATIONS,
  getPracticeRoleLabel,
  toTelHref,
} from '@/config/site-content'
import { cn } from '@/shared/lib/cn'

// 將靜態數據移到組件外部
const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/doctorfuku/',
    icon: <FaFacebook className="h-5 w-5" />,
    hoverColor: 'hover:text-[#1877F2]',
    ariaLabel: '前往Facebook粉絲專頁'
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/drfuku',
    icon: <RiInstagramLine className="h-5 w-5" />,
    hoverColor: 'hover:text-[#E4405F]',
    ariaLabel: '前往Instagram帳號'
  }
]

const clinics = PRACTICE_LOCATIONS.map((loc) => ({
  name: loc.name,
  address: loc.address ?? '',
  telephone: loc.telephone ?? '',
  mapUrl: loc.mapUrl ?? '',
  websiteUrl: loc.websiteUrl ?? '',
  serviceAreaNote: loc.serviceAreaNote ?? '',
  type: getPracticeRoleLabel(loc.role),
}))

const quickLinks = [
  { name: '關於醫師', id: 'about', ariaLabel: '前往關於醫師區塊' },
  { name: '診療服務', id: 'services', ariaLabel: '前往診療服務區塊' },
  { name: '痔瘡手術', href: '/hemorrhoid-surgery', ariaLabel: '前往痔瘡手術頁' },
  { name: '病患評價', id: 'testimonials', ariaLabel: '前往病患評價區塊' },
  { name: '常見問題', id: 'faq', ariaLabel: '前往常見問題區塊' },
  { name: '部落格', href: '/blog', ariaLabel: '前往部落格頁面' }
]

// 優化子組件
const SocialLink = memo(function SocialLink({ link }: { link: typeof socialLinks[0] }) {
  const { trackEvent } = useEventTracking()

  return (
    <Link
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.ariaLabel}
      onClick={() => trackEvent('social_link_click', { name: link.name })}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200/60 transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-hidden focus:ring-2 focus:ring-brand-600 focus:ring-offset-2",
        link.hoverColor
      )}
    >
      {link.icon}
      <span>{link.name}</span>
    </Link>
  )
})

const ClinicCard = memo(function ClinicCard({ clinic, index }: { clinic: typeof clinics[0], index: number }) {
  const { variants } = useScrollAnimation({ once: true })
  const isSpecialClinic = clinic.type === '特約痔瘡專科門診'

  return (
    <motion.div
      variants={variants.slideInUp}
      transition={getTransition(index * 0.05)}
      className={cn(
        "surface-card-interactive group/card flex flex-col p-4 focus-within:ring-2 focus-within:ring-brand-600",
        isSpecialClinic ? 'bg-brand-50/30 ring-brand-100/50' : 'bg-white/80'
      )}
      role="region"
      aria-label={`${clinic.name}資訊`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold text-neutral-900 group-hover/card:text-brand-700 transition-colors line-clamp-2">
          {clinic.name}
        </h4>
        <span className={cn(
          "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
          isSpecialClinic
            ? 'bg-brand-100 text-brand-700'
            : 'bg-neutral-100 text-neutral-600'
        )}>
          {clinic.type.replace('醫師', '')}
        </span>
      </div>

      <div className="mt-auto space-y-2.5">
        {clinic.address && (
          <div className="flex items-start gap-2 text-xs leading-relaxed text-neutral-600">
            <HiOutlineMapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden="true" />
            {clinic.mapUrl ? (
              <a
                href={clinic.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600 hover:underline decoration-brand-200 underline-offset-2"
              >
                {clinic.address}
              </a>
            ) : (
              <span>{clinic.address}</span>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {clinic.telephone && (
            <div className="flex items-center gap-1.5 text-xs text-neutral-600">
              <HiOutlinePhone className="h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden="true" />
              <a href={toTelHref(clinic.telephone)} className="font-semibold text-brand-600 hover:text-brand-700 hover:underline decoration-brand-200">
                {clinic.telephone}
              </a>
            </div>
          )}

          {clinic.websiteUrl && (
            <div className="flex items-center gap-1.5 text-xs text-neutral-600">
              <HiOutlineArrowTopRightOnSquare className="h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden="true" />
              <a
                href={clinic.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-600 hover:text-brand-700 hover:underline decoration-brand-200"
              >
                官網
              </a>
            </div>
          )}
        </div>

        {clinic.serviceAreaNote && (
          <div className="flex items-start gap-1.5 rounded-lg bg-neutral-50/80 p-2 ring-1 ring-neutral-100/50">
            <HiOutlineInformationCircle className="mt-0.5 h-3 w-3 shrink-0 text-neutral-400" aria-hidden="true" />
            <p className="text-[10px] leading-normal text-neutral-500">{clinic.serviceAreaNote}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
})

const QuickLink = memo(function QuickLink({ link }: { link: typeof quickLinks[0] }) {
  const { trackEvent } = useEventTracking()
  const href = 'href' in link ? link.href : `#${link.id}`

  return (
    <Link
      href={href}
      aria-label={link.ariaLabel}
      onClick={() => trackEvent('quick_link_click', { name: link.name })}
      className="group flex items-center gap-2 rounded-lg py-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-brand-600 focus:outline-hidden focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
    >
      <div className="h-1 w-1 rounded-full bg-brand-400 opacity-0 transition-all group-hover:w-2 group-hover:opacity-100" aria-hidden="true" />
      <span>{link.name}</span>
    </Link>
  )
})

export default function Footer() {
  const { variants } = useScrollAnimation({ once: true })
  const { trackEvent } = useEventTracking()

  return (
    <footer className="relative w-full overflow-hidden border-t border-neutral-200/60 bg-white" role="contentinfo" aria-label="頁尾區域">
      {/* 背景裝飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-brand-50/40 blur-3xl opacity-60" />
        <div className="absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-brand-50/30 blur-2xl opacity-40" />
      </div>

      <div className="relative">
        {/* 主要資訊區 */}
        <div className="py-16 lg:py-24">
          <div className="container-app">
            <motion.div
              variants={variants.stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-5"
            >
              {/* 1. 品牌與醫師介紹 (佔比 2/5) */}
              <motion.div
                variants={variants.slideInUp}
                className="lg:col-span-2 space-y-8"
              >
                <Link
                  href="/"
                  className="group inline-flex items-center gap-4 rounded-2xl bg-white/90 p-2 pr-6 shadow-sm ring-1 ring-neutral-200/60 transition-all hover:shadow-md hover:ring-brand-100"
                  aria-label="回到首頁"
                  onClick={() => trackEvent('logo_click')}
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-brand-50">
                    <Image
                      src="/logo.png"
                      alt={DOCTOR_COPY.displayName}
                      fill
                      className="object-cover p-1 transition-transform duration-500 group-hover:scale-110"
                      priority
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-brand-700 transition-colors">
                      {DOCTOR_COPY.displayName}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                      大腸直腸外科醫師
                    </span>
                  </div>
                </Link>

                <div className="max-w-md space-y-6">
                  <p className="text-base leading-relaxed text-neutral-600">
                    {DOCTOR_COPY.footerBlurb}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={CLINIC.lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="透過LINE諮詢預約"
                      onClick={() => trackEvent('line_click')}
                      className="group relative inline-flex items-center gap-2 rounded-xl bg-[#06C755] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#06C755]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#06C755]/30 focus:outline-hidden focus:ring-2 focus:ring-[#06C755] focus:ring-offset-2"
                    >
                      <HiOutlineChatBubbleOvalLeft className="h-5 w-5" aria-hidden="true" />
                      <span>LINE 諮詢預約</span>
                    </Link>
                    {socialLinks.map((social) => (
                      <SocialLink key={social.name} link={social} />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 2. 門診據點 (佔比 2/5) */}
              <motion.div variants={variants.slideInUp} className="lg:col-span-2">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-1 w-8 rounded-full bg-brand-500" />
                  <h3 className="text-lg font-bold text-neutral-900">門診據點</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {clinics.map((clinic, index) => (
                    <ClinicCard key={clinic.name} clinic={clinic} index={index} />
                  ))}
                </div>
              </motion.div>

              {/* 3. 快速連結 (佔比 1/5) */}
              <motion.div variants={variants.slideInUp} className="lg:col-span-1">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-1 w-8 rounded-full bg-brand-500" />
                  <h3 className="text-lg font-bold text-neutral-900">快速導覽</h3>
                </div>
                <nav className="flex flex-col gap-1" aria-label="頁尾導航">
                  {quickLinks.map((link) => (
                    <QuickLink key={link.name} link={link} />
                  ))}
                </nav>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* 底部警語與版權區 */}
        <div className="border-t border-neutral-100 bg-neutral-50/50 py-12">
          <div className="container-app">
            <motion.div
              variants={variants.fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center gap-10"
            >
              {/* 醫療警語 */}
              <div
                className="surface-card flex max-w-4xl items-start gap-4 p-5 text-sm text-neutral-500 ring-1 ring-neutral-200/40"
                role="alert"
                aria-label="醫療警語"
              >
                <HiOutlineInformationCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" aria-hidden="true" />
                <div className="space-y-1.5 leading-relaxed">
                  <p>本網站內容僅供醫療衛教參考，實際診療建議請務必親自諮詢專業醫師。</p>
                  <p>相關資訊遵循中華民國醫療法規（醫療法、醫療廣告管理辦法）及臺灣地區執業規範。</p>
                </div>
              </div>

              {/* 版權與版本 */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-medium text-neutral-400">
                  © {new Date().getFullYear()} {DOCTOR_COPY.displayName} - 大腸直腸外科. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                  <span>Version 2.0</span>
                  <span className="h-3 w-px bg-neutral-200" />
                  <span>Medical Excellence</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
