'use client'

import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import { HiOutlineChatBubbleOvalLeft, HiOutlineMapPin } from 'react-icons/hi2'
import { RiInstagramLine } from 'react-icons/ri'
import { FaFacebook } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/shared/hooks/useAnimation'
import { useEventTracking } from '@/shared/hooks/useEventTracking'

// 將靜態數據移到組件外部
const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/dr.hsu.care',
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

const clinics = [
  {
    name: '禾馨台中安和婦幼診所',
    address: '台中市西屯區安和路118-18號',
    type: '主治醫師'
  },
  {
    name: '禾馨民權婦幼診所',
    address: '台北市內湖區民權東路六段42號',
    type: '主治醫師'
  },
  {
    name: '佑民醫院',
    address: '南投縣草屯鎮太平路一段200號',
    type: '主治醫師'
  },
  {
    name: '賦真妍診所',
    address: '',
    type: '特約痔瘡專科門診'
  },
  {
    name: '秘境美學診所',
    address: '',
    type: '特約痔瘡專科門診'
  }
]

const quickLinks = [
  { name: '關於醫師', id: 'about', ariaLabel: '前往關於醫師區塊' },
  { name: '診療服務', id: 'services', ariaLabel: '前往診療服務區塊' },
  { name: '病患評價', id: 'testimonials', ariaLabel: '前往病患評價區塊' },
  { name: '常見問題', id: 'faq', ariaLabel: '前往常見問題區塊' }
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
      className={`inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 ${link.hoverColor}`}
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
      transition={{ delay: index * 0.1 }}
      className={`group rounded-xl p-4 shadow-sm ring-1 transition-all hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-brand-600 ${
        isSpecialClinic
          ? 'bg-gradient-to-r from-white to-brand-50/30 ring-brand-100'
          : 'bg-white ring-neutral-100'
      }`}
      tabIndex={0}
      role="region"
      aria-label={`${clinic.name}資訊`}
    >
      <div className="flex items-center gap-2 mb-3">
        <h4 className="font-medium text-neutral-900">{clinic.name}</h4>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
          isSpecialClinic
            ? 'bg-brand-100 text-brand-700'
            : 'bg-neutral-100 text-neutral-600'
        }`}>
          {clinic.type}
        </span>
      </div>
      {clinic.address && (
        <div className="flex items-start gap-2 text-sm text-neutral-600">
          <HiOutlineMapPin className="mt-1 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{clinic.address}</span>
        </div>
      )}
    </motion.div>
  )
})

const QuickLink = memo(function QuickLink({ link }: { link: typeof quickLinks[0] }) {
  const { trackEvent } = useEventTracking()

  return (
    <Link
      href={`#${link.id}`}
      aria-label={link.ariaLabel}
      onClick={() => trackEvent('quick_link_click', { name: link.name })}
      className="group flex items-center gap-2 text-neutral-600 transition-colors hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 rounded-lg p-2"
    >
      <div className="h-1.5 w-1.5 rounded-full bg-brand-600 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
      <span>{link.name}</span>
    </Link>
  )
})

export default function Footer() {
  const { variants, transitions } = useScrollAnimation({ once: true })
  const { trackEvent } = useEventTracking()

  return (
    <footer className="relative w-full overflow-hidden border-t border-neutral-100" role="contentinfo" aria-label="頁尾區域">
      {/* 背景裝飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-brand-50/30 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-brand-50/20 blur-2xl" />
      </div>

      {/* 主要內容 */}
      <div className="relative">
        {/* 上方區域 */}
        <div className="border-b border-neutral-100 bg-gradient-to-b from-white to-neutral-50/80 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              variants={variants.stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
            >
              {/* Logo 和醫師簡介 */}
              <motion.div
                variants={variants.slideInUp}
                className="lg:col-span-2"
              >
                <Link
                  href="/"
                  className="group relative mb-6 inline-flex items-center gap-3 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
                  aria-label="回到首頁"
                  onClick={() => trackEvent('logo_click')}
                >
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand-600/20 to-brand-400/20 blur transition-all group-hover:inset-0 group-hover:blur-md" aria-hidden="true" />
                    <Image
                      src="/logo.png"
                      alt="徐彥勳大腸直腸專科"
                      width={48}
                      height={48}
                      className="relative h-12 w-12 rounded-full transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>
                  <div className="flex flex-col pr-2">
                    <span className="text-xl font-bold text-neutral-900">
                      徐彥勳
                    </span>
                    <span className="text-sm font-medium text-neutral-500">
                      大腸直腸專科醫師
                    </span>
                  </div>
                </Link>
                <div className="space-y-4">
                  <p className="text-base leading-relaxed text-neutral-600">
                    專精於大腸直腸疾病診療，致力於提供專業且溫暖的醫療服務。
                    在禾馨診所服務，為您打造安心的就醫體驗。
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="https://line.me/ti/p/~@772pable"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="透過LINE諮詢預約"
                      onClick={() => trackEvent('line_click')}
                      className="group relative inline-flex items-center gap-2 rounded-xl bg-[#06C755] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#06C755] focus:ring-offset-2"
                    >
                      <HiOutlineChatBubbleOvalLeft className="h-5 w-5" aria-hidden="true" />
                      <span>LINE 諮詢預約</span>
                      <div className="absolute inset-0 rounded-xl bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </Link>
                    {socialLinks.map((social) => (
                      <SocialLink key={social.name} link={social} />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 門診據點 */}
              <motion.div variants={variants.slideInUp}>
                <h3 className="mb-6 text-lg font-bold text-neutral-900">門診據點</h3>
                <div className="space-y-6">
                  {clinics.map((clinic, index) => (
                    <ClinicCard key={clinic.name} clinic={clinic} index={index} />
                  ))}
                </div>
              </motion.div>

              {/* 快速連結 */}
              <motion.div variants={variants.slideInUp}>
                <h3 className="mb-6 text-lg font-bold text-neutral-900">快速連結</h3>
                <div className="grid gap-3">
                  {quickLinks.map((link) => (
                    <QuickLink key={link.name} link={link} />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* 下方區域 */}
        <div className="bg-gradient-to-b from-neutral-50/80 to-white py-8">
          <div className="container mx-auto px-4">
            <motion.div
              variants={variants.slideInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={transitions.withDelay(0.4)}
              className="space-y-6 text-center"
            >
              {/* 醫療警語 */}
              <div
                className="mx-auto max-w-3xl space-y-2 rounded-2xl bg-white p-6 text-sm text-neutral-500 shadow-sm ring-1 ring-neutral-100"
                role="alert"
                aria-label="醫療警語"
              >
                <p>本網站內容僅供參考，實際診療建議請依據醫師親診結果為準。</p>
                <p>網站資訊為臺灣地區所使用，其他地區使用者應遵循當地醫療法規。</p>
                <p>本網站遵循中華民國醫療法規範，嚴格遵守醫療廣告管理辦法。</p>
              </div>

              {/* 版權聲明 */}
              <p className="text-sm text-neutral-400">
                © {new Date().getFullYear()} 徐彥勳醫師 - 大腸直腸專科. All rights reserved.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
