'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { FaLine, FaPhone } from "react-icons/fa"
import { HiOutlineMapPin } from "react-icons/hi2"
import { motion, AnimatePresence } from "framer-motion"
import { CLINIC } from "@/config/constants"
import { trackEvent } from "@/shared/lib/analytics"

export default function StickyMobileBottomBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // 滾動超過 100px 後，向下滾動隱私條以保持視野，向上滾動自動出現
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setIsVisible(false)
        } else if (lastScrollY - currentScrollY > 10) {
          setIsVisible(true)
        }
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 block md:hidden p-3 bg-white/90 backdrop-blur-md border-t border-neutral-200/60 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-safe"
        >
          <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
            {/* 門診據點按鈕 */}
            <Link
              href="/consultation"
              onClick={() => trackEvent("mobile_bar_click", { destination: "consultation" })}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-neutral-100 text-neutral-800 font-bold text-xs hover:bg-neutral-200 transition-colors active:scale-95 ring-1 ring-neutral-200/50"
            >
              <HiOutlineMapPin className="h-4 w-4 text-brand-600 shrink-0" />
              <span>門診據點</span>
            </Link>

            {/* 電話預約按鈕 */}
            <a
              href={`tel:${CLINIC.telephone}`}
              onClick={() => trackEvent("mobile_bar_click", { destination: "tel" })}
              className="flex items-center justify-center p-2.5 rounded-xl bg-neutral-100 text-neutral-800 font-bold text-xs hover:bg-neutral-200 transition-colors active:scale-95 ring-1 ring-neutral-200/50"
              aria-label="電話撥打諮詢"
            >
              <FaPhone className="h-4 w-4 text-brand-600 shrink-0" />
            </a>

            {/* LINE 專人諮詢主按鈕 */}
            <a
              href={CLINIC.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("mobile_bar_click", { destination: "line" })}
              className="flex-[2] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#06C755] text-white font-bold text-sm shadow-md shadow-[#06C755]/20 active:scale-95 transition-transform"
            >
              <FaLine className="h-5 w-5 shrink-0" />
              <span>LINE 隱私諮詢</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
