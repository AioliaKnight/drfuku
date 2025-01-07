'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { HiOutlineMenu, HiX } from 'react-icons/hi'
import { FaLine, FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentHash, setCurrentHash] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  // 處理滾動事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    
    // 初始化滾動狀態
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 處理 hash 變更
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }
    
    // 初始化 hash 狀態
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
      href: 'https://www.instagram.com/dr.hsu.care/',
      icon: FaInstagram,
      bgClass: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]'
    }
  ]

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

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
  }

  const isActive = (href: string) => {
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
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || pathname !== '/' 
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            onClick={(e) => handleNavigation(e, '/')}
          >
            <Image
              src="/logo.png"
              alt="徐彥勳大腸直腸專科"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10"
              priority
            />
            <span className="text-base md:text-lg font-medium text-neutral-900">
              徐彥勳大腸直腸專科
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className={`px-3 py-2 text-sm transition-colors rounded-full ${
                    isActive(link.href)
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-neutral-700 hover:text-brand-600 hover:bg-neutral-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="ml-4 flex items-center gap-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${link.bgClass} text-white transition-transform hover:scale-110`}
                  aria-label={link.name}
                >
                  <link.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <HiX className="h-6 w-6" aria-hidden="true" />
            ) : (
              <HiOutlineMenu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-100">
            <div className="flex flex-col gap-2">
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
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-4 px-4 flex items-center gap-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${link.bgClass} text-white transition-transform hover:scale-110`}
                  aria-label={link.name}
                >
                  <link.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 