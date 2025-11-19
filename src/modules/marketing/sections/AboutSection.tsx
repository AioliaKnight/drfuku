'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HiOutlineUserCircle, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineClipboardDocument } from 'react-icons/hi2'
import { useScrollAnimation, type AnimationVariants as AnimationVariantsType, type AnimationTransitions } from '@/shared/hooks/useAnimation'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import { memo, ReactElement } from 'react'

// 定義類型
interface Experience {
  icon: ReactElement
  title: string
  items: string[]
}

interface ExperienceCardProps {
  category: Experience
  index: number
  isInView: boolean
  variants: AnimationVariantsType
  transitions: AnimationTransitions
}

// 將靜態數據移到組件外部
const experience: Experience[] = [
  {
    icon: <HiOutlineAcademicCap className="h-6 w-6 text-brand-600" aria-hidden="true" />,
    title: '專業資格與認證',
    items: [
      '中華民國外科醫學會專科醫師',
      '中華民國大腸直腸外科醫學會專科醫師',
      '中國醫藥大學中西醫雙學士學位',
      '台灣微創手術醫學會會員',
      '亞洲大腸直腸外科醫學會會員',
      '中華民國醫師高等考試及格'
    ]
  },
  {
    icon: <HiOutlineBriefcase className="h-6 w-6 text-brand-600" aria-hidden="true" />,
    title: '學經歷與專業訓練',
    items: [
      '中國醫藥大學醫學系畢業（中西醫雙學位）',
      '彰化基督教醫院外科部住院醫師',
      '彰化基督教醫院大腸直腸外科研究醫師',
      '禾馨台中安和婦幼診所大腸直腸外科主治醫師',
      '禾馨內湖民權婦幼診所大腸直腸外科主治醫師',
      '佑民醫院（草屯）大腸直腸外科主治醫師',
      '賦真妍診所特約痔瘡專科醫師',
      '秘境美學診所特約痔瘡專科醫師'
    ]
  },
  {
    icon: <HiOutlineClipboardDocument className="h-6 w-6 text-brand-600" aria-hidden="true" />,
    title: '專精診療項目',
    items: [
      '痔瘡微創治療：採用最新微創技術，傷口小、恢復快、疼痛少',
      '肛門裂隙治療：個人化治療方案，有效改善疼痛與出血',
      '肛門廔管治療：精準手術技術，降低復發率',
      '大腸直腸疾病診治：完整評估與治療計畫',
      '術前詳細評估：全方位健康檢查與風險評估',
      '術後專業照護：一對一追蹤關懷，確保最佳恢復效果'
    ]
  }
]

// 優化子組件
const ExperienceCard = memo<ExperienceCardProps>(({ category, index, isInView, variants, transitions }) => (
  <motion.div
    variants={variants.fadeIn}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    transition={transitions.withDelay(index * 0.1)}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.98 }}
    className="group rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-sm ring-1 ring-neutral-100/80 transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white"
    role="article"
    aria-labelledby={`category-${index}`}
  >
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50/80 backdrop-blur-sm" aria-hidden="true">
        {category.icon}
      </div>
      <h3 id={`category-${index}`} className="text-xl font-bold text-neutral-900">
        {category.title}
      </h3>
    </div>
    <ul className="space-y-3" role="list">
      {category.items.map((item, itemIndex) => (
        <li
          key={itemIndex}
          className="flex items-center gap-3 text-base text-neutral-600 md:text-lg"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
))

ExperienceCard.displayName = 'ExperienceCard'

export default function AboutSection() {
  const { ref, isInView, variants, transitions } = useScrollAnimation()

  return (
    <Section
      ref={ref}
      id="about"
      aria-label="關於徐醫師"
      className="overflow-hidden bg-gradient-to-b from-brand-50 via-white to-brand-100/60"
    >
      {/* 背景裝飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-brand-50/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-neutral-50/80 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 h-[300px] w-[300px] rounded-full bg-brand-50/30 blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[250px] w-[250px] rounded-full bg-brand-50/20 blur-2xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <motion.div
            variants={variants.scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={transitions.default}
            className="mb-6 flex justify-center"
            aria-hidden="true"
          >
            <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20">
              <HiOutlineUserCircle className="h-6 w-6 md:h-8 md:w-8 text-brand-600" />
            </div>
          </motion.div>
          <motion.div
            variants={variants.fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={transitions.withDelay(0.2)}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              認識徐彥勳醫師
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-base leading-7 text-neutral-600 [text-wrap:balance] md:text-lg md:leading-8">
              擁有中西醫雙學位與 15 年臨床經驗，徐醫師善於結合微創技術與貼心照護，
              針對每位病患的生活型態與需求，提供客製化治療與完整術後追蹤。
            </p>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 text-sm md:grid-cols-3">
              {[
                { label: '成功治療案例', value: '5000+' },
                { label: '患者滿意度', value: '98%' },
                { label: '年臨床經驗', value: '15+' }
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white/70 p-5 text-center shadow-sm backdrop-blur">
                  <div className="text-2xl font-semibold text-brand-600 md:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-12 md:mt-20 md:flex-row md:items-start md:gap-16 lg:gap-20">
          {/* 醫師照片 */}
          <motion.div
            variants={variants.slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={transitions.default}
            className="w-full md:w-1/2 lg:w-2/5"
          >
            <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-2xl transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute -right-6 -top-6 h-full w-full rounded-3xl bg-gradient-to-br from-neutral-100 to-white/80" aria-hidden="true" />
              <div className="absolute -left-6 -bottom-6 h-full w-full rounded-3xl bg-gradient-to-br from-brand-600 to-brand-500/90" aria-hidden="true" />
              <div className="relative h-full w-full overflow-hidden rounded-3xl" style={{ position: 'relative', minHeight: '400px' }}>
                <Image
                  src="/doctor-profile2.jpg"
                  alt="徐彥勳醫師 - 專業的大腸直腸外科醫師，擁有豐富的臨床經驗，專注於提供高品質的醫療服務"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 500px"
                  priority
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" aria-hidden="true" />
              </div>
            </div>
          </motion.div>

          {/* 經歷與專長 */}
          <motion.div
            variants={variants.slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={transitions.default}
            className="w-full space-y-8 md:w-1/2 lg:w-3/5"
          >
            <div className="prose-custom">
              <p className="mb-8 text-base leading-7 text-neutral-600 md:text-lg md:leading-8">
                累積多年的臨床經驗，深知每位病患的困擾與期待。
                秉持以病患為中心的服務理念，提供專業且溫暖的醫療照護，
                讓您在就醫過程中感受到安心與信賴。
                持續精進醫療技術，致力於提供最優質的診療服務。
              </p>
            </div>

            {experience.map((category, index) => (
              <ExperienceCard
                key={index}
                category={category}
                index={index}
                isInView={isInView}
                variants={variants}
                transitions={transitions}
              />
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
