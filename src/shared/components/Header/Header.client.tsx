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
      className={`px-3 py-2 text-sm transition-colors rounded-full whitespace-nowrap ${
        isActive
          ? 'text-brand-600 bg-brand-50'
          : 'text-neutral-700 hover:text-brand-600 hover:bg-neutral-50'
      }`}
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
  onClick
}: {
  name: string
  href: string
  icon: React.ComponentType<{ className: string }>
  bgClass: string
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-full ${bgClass} text-white transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500`}
      aria-label={name}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
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

  // 處理滾動事件 - 使用防抖
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 0)
      }, 100)
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
    { name: '諮詢服務', href: '/#services' },
    { name: '部落格', href: '/blog' },
    { name: '病患分享', href: '/#testimonials' },
    { name: '常見問題', href: '/#faq' }
  ]

  const socialLinks = [
    {
      name: 'LINE諮詢',
      href: 'https://line.me/ti/p/~@736usrpi',
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
      bgClass: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]'
    }
  ]

  const handleNavigation = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    // 追蹤導航事件
    trackEvent('navigation_click', {
      category: 'navigation',
      label: href,
      location: 'header'
    })

    // 處理外部連結
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer')
      setIsMenuOpen(false)
      return
    }

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
        const element = document.querySelector(href.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
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
      return currentHash === href.substring(1)
    }
    if (href === '/blog') {
      return pathname === '/blog' || pathname.startsWith('/blog/')
    }
    return false
  }, [pathname, currentHash])

  return (
    <motion.header
      variants={variants.slideInDown}
      initial="hidden"
      animate="visible"
      transition={transitions.default}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || pathname !== '/'
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="container-fluid" role="navigation" aria-label="主導航">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-lg"
            onClick={(e) => handleNavigation(e, '/')}
            aria-label="回到首頁"
          >
            <Image
              src="/logo.png"
              alt="徐彥勳大腸直腸專科"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10"
              priority
            />
            <span className="text-base md:text-lg font-medium text-neutral-900 whitespace-nowrap">
              徐彥勳大腸直腸專科
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1" role="menubar">
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
            <div className="ml-4 flex items-center gap-2" role="menubar" aria-label="社群媒體連結">
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
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <HiX className="h-6 w-6" aria-hidden="true" />
            ) : (
              <HiOutlineMenu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              variants={variants.slideInDown}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={transitions.default}
              className="md:hidden py-4 border-t border-neutral-100 bg-white/95 backdrop-blur-sm"
              role="menu"
            >
              <div className="flex flex-col gap-2" role="none">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    className={`px-4 py-2 text-sm transition-colors rounded-lg ${
                      isActive(link.href)
                        ? 'text-brand-600 bg-brand-50'
                        : 'text-neutral-700 hover:text-brand-600 hover:bg-neutral-50'
                    }`}
                    role="menuitem"
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="mt-4 px-4 flex items-center gap-2" role="menu" aria-label="社群媒體連結">
                {socialLinks.map((link) => (
                  <SocialLink
                    key={link.name}
                    {...link}
                    onClick={(e) => handleNavigation(e, link.href)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
