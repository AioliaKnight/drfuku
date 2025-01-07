'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiOutlineShieldCheck, HiOutlineUserGroup, HiOutlineHeart, HiOutlineMapPin, HiOutlineArrowTopRightOnSquare, HiChevronRight } from 'react-icons/hi2'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const features = [
    {
      icon: <HiOutlineShieldCheck className="h-5 w-5" />,
      text: '隱私保護・安心就醫'
    },
    {
      icon: <HiOutlineUserGroup className="h-5 w-5" />,
      text: '專業團隊・細心照護'
    },
    {
      icon: <HiOutlineHeart className="h-5 w-5" />,
      text: '以人為本・溫暖服務'
    }
  ]

  const achievements = [
    {
      icon: <HiOutlineUserGroup className="h-8 w-8 text-brand-600" />,
      title: '專業資格',
      description: '大腸直腸外科專科醫師',
      stats: '中西醫雙學位'
    },
    {
      icon: <HiOutlineHeart className="h-8 w-8 text-brand-600" />,
      title: '臨床經驗',
      description: '豐富診療經驗',
      stats: '5000+ 成功案例'
    },
    {
      icon: <HiOutlineShieldCheck className="h-8 w-8 text-brand-600" />,
      title: '醫療團隊',
      description: '專業醫護照護',
      stats: '98% 手術成功率'
    }
  ]

  const locations = [
    {
      name: '禾馨台中安和婦幼診所',
      address: '台中市西屯區安和路118-18號',
      link: 'https://maps.app.goo.gl/44N7BPKayB43GcPx8'
    },
    {
      name: '禾馨內湖民權婦幼診所',
      address: '台北市內湖區民權東路六段42號',
      link: 'https://maps.app.goo.gl/KfcLKTevaovLt8r97'
    },
    {
      name: '佑民醫院（草屯）',
      address: '南投縣草屯鎮太平路一段200號',
      link: 'https://maps.app.goo.gl/X4S4WEJbC8msm4qr6'
    }
  ]

  return (
    <section 
      ref={containerRef}
      aria-label="首頁主視覺"
      className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-neutral-50"
    >
      {/* 無障礙跳過導航 */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-brand-600 focus:rounded-md focus:shadow-lg"
      >
        跳到主要內容
      </a>

      {/* 動態背景 */}
      <motion.div 
        style={{ opacity }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-brand-50/30 to-brand-100/30 blur-3xl will-change-transform"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-brand-50/40 to-brand-100/40 blur-3xl will-change-transform"
        />
      </motion.div>

      <div id="main-content" className="container relative mx-auto flex min-h-[calc(100vh-4rem)] flex-col justify-center px-4 py-12 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* 主標題區塊 */}
          <div className="relative mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-brand-50 blur-2xl md:h-32 md:w-32"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-brand-50 blur-2xl md:h-32 md:w-32"
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <span className="mb-4 inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600 ring-1 ring-brand-100 md:text-base">
                台灣痔瘡治療專家
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 [text-wrap:balance] sm:text-5xl md:text-6xl">
                專業、安心、保密
                <br className="hidden sm:inline" />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                    痔瘡治療
                  </span>
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute -inset-1 -z-10 block rounded-lg bg-brand-50"
                  />
                </span>
                <br className="hidden sm:inline" />
                專科醫療
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
                由徐彥勳醫師親自主診，提供專業、溫暖且保密的診療服務，
                讓您重拾健康生活品質。
              </p>
            </motion.div>
          </div>

          {/* 特色列表 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex flex-wrap justify-center gap-4 text-neutral-600"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-4 ring-brand-50/50 md:h-12 md:w-12">
                  {feature.icon}
                </div>
                <span className="text-sm font-medium md:text-base">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* 行動按鈕 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="#services"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 active:translate-y-0.5 md:text-lg"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="relative z-10">了解診療服務</span>
              <HiChevronRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-700 to-brand-600 opacity-0 transition-all group-hover:opacity-100" />
            </Link>
            <Link
              href="https://line.me/ti/p/~@772pable"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#06C755] px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#06C755] focus:ring-offset-2 active:translate-y-0.5 md:text-lg"
            >
              <Image
                src="/line-icon.svg"
                alt="LINE"
                width={22}
                height={22}
                className="relative z-10 transition-transform group-hover:scale-110"
              />
              <span className="relative z-10">加入 LINE 好友</span>
              <div className="absolute inset-0 bg-black/10 opacity-0 transition-all group-hover:opacity-100" />
            </Link>
          </motion.div>
        </div>

        {/* 成就卡片 */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-12 md:mt-16"
        >
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-neutral-50 p-6 text-center shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-md will-change-transform"
                tabIndex={0}
                role="article"
                aria-label={`${achievement.title}: ${achievement.description}`}
              >
                <div className="mb-3 flex justify-center">{achievement.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-neutral-900 group-hover:text-brand-600">
                  {achievement.title}
                </h3>
                <p className="mb-3 text-sm text-neutral-600">{achievement.description}</p>
                <p className="text-base font-semibold text-brand-600">{achievement.stats}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 診所位置 */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="mt-12 md:mt-16"
        >
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
              className="overflow-hidden rounded-2xl bg-gradient-to-br from-white to-neutral-50 p-6 shadow-sm ring-1 ring-neutral-100"
            >
              <h3 className="mb-4 text-center text-lg font-bold text-neutral-900">
                診療據點
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {locations.map((location, index) => (
                  <Link
                    key={index}
                    href={location.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
                    aria-label={`前往 ${location.name} 的 Google 地圖`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="mb-2 font-bold text-neutral-900 group-hover:text-brand-600">
                        {location.name}
                      </h4>
                      <HiOutlineArrowTopRightOnSquare className="h-5 w-5 text-gray-400 group-hover:text-brand-600 transition-colors" aria-hidden="true" />
                    </div>
                    <div className="space-y-2 text-sm text-neutral-600">
                      <div className="flex items-start gap-2">
                        <HiOutlineMapPin className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-brand-600 transition-colors" aria-hidden="true" />
                        <span className="group-hover:text-brand-600 transition-colors">{location.address}</span>
                      </div>
                    </div>
                    <div className="mt-3 inline-flex items-center text-sm font-medium text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      前往 Google Maps
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 