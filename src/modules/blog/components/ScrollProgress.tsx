'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setIsVisible(latest > 0.1)
    })
    return unsubscribe
  }, [scrollYProgress])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-brand-600 origin-left"
      style={{ scaleX: scrollYProgress }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  )
}
