'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2'

export default function CTASection() {
  return (
    <section className="section-padding relative w-full overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-neutral-50">
      {/* 背景裝飾 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[300px] w-[300px] rounded-full bg-brand-50/40 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-50/30 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20">
              <HiOutlineChatBubbleBottomCenterText className="h-6 w-6 md:h-8 md:w-8 text-brand-600" />
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
              安心預約諮詢
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-600 [text-wrap:balance] md:text-lg">
              您的健康與隱私，都是我們最關心的事。
              如果您正在困擾著相關疾病問題，
              歡迎透過保密的諮詢管道與我們聯繫，
              讓專業的醫療團隊為您提供協助。
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 md:mt-16"
        >
          <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-brand-600 to-brand-500 p-1 shadow-2xl">
            <div className="rounded-[1.25rem] bg-white p-8 md:p-12">
              <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
                <div className="relative h-48 w-48 flex-shrink-0">
                  <Image
                    src="/line-qr.png"
                    alt="LINE QR Code"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="mb-4 text-xl font-bold text-neutral-900 md:text-2xl">
                    安全預約諮詢
                  </h3>
                  <p className="mb-6 text-base text-neutral-600 md:text-lg">
                    透過加密的LINE諮詢服務，
                    我們將保護您的隱私，
                    提供專業的醫療建議，
                    為您安排合適的診療時間。
                  </p>
                  <Link
                    href="https://line.me/ti/p/~@772pable"
                    target="_blank"
                    className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-[#06C755] px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0.5 md:text-lg"
                  >
                    <Image
                      src="/line-icon.svg"
                      alt="LINE諮詢服務"
                      width={22}
                      height={22}
                      className="relative z-10 transition-transform group-hover:scale-110"
                    />
                    <span className="relative z-10">立即加入好友</span>
                    <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 