'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { HiOutlineMenu, HiX } from 'react-icons/hi'
import { FaLine, FaFacebook, FaInstagram } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '@/shared/hooks/useAnimation'
import { trackEvent } from '@/shared/lib/analytics'
import { CLINIC } from '@/config/constants'
import { cn } from '@/shared/lib/cn'

// 導航連結組件
const NavLink = memo(function NavLink({
  href,
  isActive,
  onClick,
  children
}: {
  href: string
  isActive: boolean
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "px-3 py-2 text-sm font-medium transition-all rounded-full whitespace-nowrap",
        isActive
          ? 'text-brand-600 bg-brand-50 shadow-xs ring-1 ring-brand-100/50'
          : 'text-neutral-600 hover:text-brand-600 hover:bg-neutral-50'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
})

// 社交媒體連結組件
const SocialLink = memo(function SocialLink({
  name,
  href,
  icon: Icon,
  bgClass,
  onClick,
  className
}: {
  name: string
  href: string
  icon: React.ComponentType<{ className: string }>
  bgClass: string
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className?: string
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full text-white transition-all hover:scale-110 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-brand-500",
        bgClass,
        className
      )}
      aria-label={name}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </Link>
  )
})

// 主要組件
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentHash, setCurrentHash] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const { variants, transitions } = useScrollAnimation({ once: false })

  // 防止手機版選單開啟時捲動
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // 處理滾動事件 - 使用防抖
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 10)
      }, 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  // 處理 hash 變更
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // 當路徑改變時關閉選單
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { name: '首頁', href: '/' },
    { name: '關於醫師', href: '/#about' },
    { name: '診療服務', href: '/#services' },
    { name: '痔瘡手術', href: '/hemorrhoid-surgery' },
    { name: '部落格', href: '/blog' },
    { name: '常見問題', href: '/#faq' }
  ]

  const socialLinks = [
    {
      name: 'LINE諮詢',
      href: CLINIC.lineUrl,
      icon: FaLine,
      bgClass: 'bg-[#06C755] hover:bg-[#05b34c]'
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/dr.hsu.care',
      icon: FaFacebook,
      bgClass: 'bg-[#1877F2] hover:bg-[#0c63d4]'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/drfuku',
      icon: FaInstagram,
      bgClass: 'bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]'
    }
  ]

  const handleNavigation = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // 如果是外部連結，不攔截預設行為
    if (href.startsWith('http')) {
      trackEvent('external_link_click', { label: href, location: 'header' })
      setIsMenuOpen(false)
      return
    }

    e.preventDefault()

    // 追蹤導航事件
    trackEvent('navigation_click', {
      category: 'navigation',
      label: href,
      location: 'header'
    })

    // 處理首頁導航
    if (href === '/') {
      router.push(href)
      setIsMenuOpen(false)
      return
    }

    // 處理錨點連結
    if (href.startsWith('/#')) {
      // 如果當前在首頁
      if (pathname === '/') {
        const id = href.substring(2)
        const element = document.getElementById(id)
        if (element) {
          const headerHeight = 80 // md:h-20
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      } else {
        // 如果不在首頁，先導航到首頁
        router.push(href)
      }
      setIsMenuOpen(false)
      return
    }

    // 處理其他連結
    router.push(href)
    setIsMenuOpen(false)
  }, [pathname, router])

  const isActive = useCallback((href: string) => {
    if (href === '/') {
      return pathname === '/' && !currentHash
    }
    if (href.startsWith('/#') && pathname === '/') {
      return currentHash === `#${href.substring(2)}`
    }
    if (href === '/blog') {
      return pathname === '/blog' || pathname.startsWith('/blog/')
    }
    if (href === '/hemorrhoid-surgery') {
      return pathname === '/hemorrhoid-surgery'
    }
    return false
  }, [pathname, currentHash])

  return (
    <>
      <motion.header
        variants={variants.slideInDown}
        initial="hidden"
        animate="visible"
        transition={{ ...transitions.default, duration: 0.4 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          "h-[var(--header-height)] md:h-[var(--header-height-md)]",
          (isScrolled || pathname !== '/' || isMenuOpen)
            ? 'border-b border-neutral-200/50 bg-white/95 shadow-sm backdrop-blur-md'
            : 'bg-transparent'
        )}
        role="banner"
      >
        <nav className="container-app h-full" role="navigation" aria-label="主導航">
          <div className="flex h-full items-center justify-between">
            <Link
              href="/"
              className="group flex items-center gap-2.5 transition-all hover:opacity-90 focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-xl p-1"
              onClick={(e) => handleNavigation(e, '/')}
              aria-label="回到首頁"
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-brand-50 ring-1 ring-brand-100/50 transition-transform group-hover:scale-105 md:h-11 md:w-11">
                <Image
                  src="/logo.png"
                  alt="阿福醫師-大腸直腸外科徐彥勳"
                  fill
                  className="object-cover p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-neutral-900 md:text-base lg:text-lg">
                  阿福醫師
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 md:text-xs">
                  大腸直腸外科
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-0.5" role="menubar">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    href={link.href}
                    isActive={isActive(link.href)}
                    onClick={(e) => handleNavigation(e, link.href)}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
              <div className="ml-4 h-6 w-px bg-neutral-200" aria-hidden="true" />
              <div className="ml-4 flex items-center gap-2.5" role="menubar" aria-label="社群媒體連結">
                {socialLinks.map((link) => (
                  <SocialLink
                    key={link.name}
                    {...link}
                    onClick={(e) => handleNavigation(e, link.href)}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen)
                trackEvent('menu_toggle', {
                  category: 'navigation',
                  label: isMenuOpen ? 'close' : 'open',
                  location: 'header'
                })
              }}
              className="flex md:hidden items-center justify-center p-2 text-neutral-600 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 active:scale-90"
              aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative h-6 w-6">
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiX className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiOutlineMenu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-xs md:hidden"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80%] max-w-[320px] bg-white shadow-2xl md:hidden flex flex-col"
              role="menu"
            >
              <div className="flex h-16 items-center justify-between px-6 border-b border-neutral-100">
                <span className="text-sm font-bold uppercase tracking-widest text-neutral-400">選單</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 -mr-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <HiX className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4">
                <div className="flex flex-col gap-1.5" role="none">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavigation(e, link.href)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3.5 text-base font-semibold rounded-2xl transition-all active:scale-[0.98]",
                        isActive(link.href)
                          ? 'text-brand-600 bg-brand-50 shadow-xs ring-1 ring-brand-100/50'
                          : 'text-neutral-700 hover:text-brand-600 hover:bg-neutral-50'
                      )}
                      role="menuitem"
                      aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                      <span>{link.name}</span>
                      {isActive(link.href) && (
                        <motion.div
                          layoutId="active-indicator"
                          className="h-1.5 w-1.5 rounded-full bg-brand-600"
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-neutral-50 border-t border-neutral-100">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-400">追蹤醫師</p>
                <div className="flex items-center gap-4">
                  {socialLinks.map((link) => (
                    <SocialLink
                      key={link.name}
                      {...link}
                      className="h-11 w-11"
                      onClick={(e) => handleNavigation(e, link.href)}
                    />
                  ))}
                </div>
                <Link
                  href={CLINIC.lineUrl}
                  target="_blank"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#06C755] py-4 text-white font-bold shadow-lg shadow-[#06C755]/20 active:scale-95 transition-transform"
                >
                  <FaLine className="h-6 w-6" />
                  <span>立即 LINE 諮詢</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
