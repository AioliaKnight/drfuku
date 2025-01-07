'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  HiOutlineShieldCheck, 
  HiOutlineClock, 
  HiOutlineClipboardDocument, 
  HiOutlineBuildingOffice2, 
  HiOutlineUserGroup, 
  HiOutlineCurrencyDollar 
} from 'react-icons/hi2'

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const services = [
    {
      icon: <HiOutlineShieldCheck className="h-6 w-6 text-brand-600" />,
      title: '微創手術治療',
      description: '採用先進微創技術，傷口小、恢復快',
      features: [
        '手術時間約15-30分鐘',
        '傷口小巧、美觀',
        '恢復期較短',
        '可日間手術出院'
      ]
    },
    {
      icon: <HiOutlineClipboardDocument className="h-6 w-6 text-brand-600" />,
      title: '專業術前評估',
      description: '詳細的術前檢查與評估，制定個人化治療方案',
      features: [
        '完整身體檢查',
        '個人化治療建議',
        '手術風險評估',
        '術後照護規劃'
      ]
    },
    {
      icon: <HiOutlineClock className="h-6 w-6 text-brand-600" />,
      title: '全程專業照護',
      description: '從術前評估到術後追蹤的完整醫療服務',
      features: [
        '專業醫護團隊',
        '術後即時關懷',
        '定期追蹤檢查',
        '完整恢復建議'
      ]
    }
  ]

  const additionalFeatures = [
    {
      icon: <HiOutlineBuildingOffice2 className="h-6 w-6 text-brand-600" />,
      title: '舒適診療環境',
      description: '獨立診間與手術室，確保就醫品質',
      features: [
        '獨立諮詢空間',
        '專業手術環境',
        '個人休息區域',
        '完善動線規劃'
      ]
    },
    {
      icon: <HiOutlineUserGroup className="h-6 w-6 text-brand-600" />,
      title: '資深醫護團隊',
      description: '經驗豐富的醫護人員，專業細心照護',
      features: [
        '專科醫師診療',
        '專業護理照護',
        '專人術後關懷',
        '即時諮詢服務'
      ]
    },
    {
      icon: <HiOutlineCurrencyDollar className="h-6 w-6 text-brand-600" />,
      title: '透明收費標準',
      description: '清楚的費用說明，無隱藏收費',
      features: [
        '術前費用說明',
        '健保給付說明',
        '分期付款方案',
        '保險理賠協助'
      ]
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="relative overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white py-16 sm:py-24"
      aria-label="專業診療服務"
    >
      {/* 背景效果 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 bg-gradient-to-b from-brand-50/50 to-transparent blur-3xl will-change-transform" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              專業診療服務
            </h2>
            <p className="text-lg leading-8 text-neutral-600">
              提供完整的痔瘡治療服務，從術前評估到術後照護，專業醫療團隊守護您的健康
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-xl will-change-transform"
              tabIndex={0}
              role="article"
              aria-label={`${service.title}: ${service.description}`}
            >
              <div className="mb-5" aria-hidden="true">{service.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-neutral-900 group-hover:text-brand-600">
                {service.title}
              </h3>
              <p className="mb-6 text-neutral-600">{service.description}</p>
              <ul className="space-y-3" role="list">
                {service.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex} 
                    className="flex items-center gap-3 text-sm text-neutral-600"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div 
                className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" 
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="mx-auto mt-20 max-w-2xl text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              以病患為中心的照護
            </h2>
            <p className="text-lg leading-8 text-neutral-600">
              重視每位病患的需求，提供最適切的醫療服務與照護
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-3"
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-xl will-change-transform"
              tabIndex={0}
              role="article"
              aria-label={`${feature.title}: ${feature.description}`}
            >
              <div className="mb-5" aria-hidden="true">{feature.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-neutral-900 group-hover:text-brand-600">
                {feature.title}
              </h3>
              <p className="mb-6 text-neutral-600">{feature.description}</p>
              <ul className="space-y-3" role="list">
                {feature.features.map((item, featureIndex) => (
                  <li 
                    key={featureIndex} 
                    className="flex items-center gap-3 text-sm text-neutral-600"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div 
                className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" 
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 