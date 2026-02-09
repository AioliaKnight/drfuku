'use client'

import Image from 'next/image'
import LineButton from '@/shared/components/common/LineButton'
import Link from 'next/link'
import { buttonVariants } from '@/shared/ui/primitives'
import { cn } from '@/shared/lib/cn'
import { motion, type Transition } from 'framer-motion'
import { HiOutlineUserCircle, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineClipboardDocument } from 'react-icons/hi2'
import { useScrollAnimation, type AnimationVariants as AnimationVariantsType } from '@/shared/hooks/useAnimation'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import { memo, ReactElement } from 'react'
import { baseTransition, getTransition } from '@/shared/animation'

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
  getTransition: (delay: number) => Transition
}

// 將靜態數據移到組件外部
const experience: Experience[] = [
  {
    icon: <HiOutlineAcademicCap className="h-6 w-6 text-brand-600" aria-hidden="true" />,
    title: '學歷',
    items: [
      '中國醫藥大學中西醫雙學士'
    ]
  },
  {
    icon: <HiOutlineBriefcase className="h-6 w-6 text-brand-600" aria-hidden="true" />,
    title: '經歷',
    items: [
      '大腸直腸外科專科醫師 ■ 直專醫字第324號',
      '外科專科醫師 ■ 外專醫字第006107號',
      '中華民國醫師高等考試及格',
      '台灣外科醫學會專科醫師',
      '中華民國醫師公會聯合會會員',
      '中華民國大腸直腸外科醫學會專科醫師',
      '彰化基督教醫院外科部住院醫師',
      '彰化基督教醫院大腸直腸外科研究醫師',
      '草屯佑民醫院大腸直腸外科主治醫師',
      '賦真妍特約痔瘡專科醫師',
      '秘境美學診所特約痔瘡專科醫師',
      '禾馨內湖民權婦幼診所大腸直腸外科主治醫師'
    ]
  },
  {
    icon: <HiOutlineClipboardDocument className="h-6 w-6 text-brand-600" aria-hidden="true" />,
    title: '主治項目',
    items: [
      '微創痔瘡手術（包含雷射痔瘡手術、冷凝刀痔瘡手術、組織凝集儀痔瘡手術等）',
      '微創肛門手術',
      '肛門濕疹（菜花）治療',
      '肛門膿瘍、肛門瘻管',
      '肛門皮膚疾患',
      '肛周疾患（肛裂、肛門搔癢）',
      '發炎性腸道疾病',
      '腸躁症、便秘'
    ]
  }
]

// 優化子組件
const ExperienceCard = memo<ExperienceCardProps>(({ category, index, isInView, variants, getTransition }) => (
  <motion.div
    variants={variants.fadeIn}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    transition={getTransition(index * 0.1)}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.98 }}
    className="group rounded-2xl bg-white/85 backdrop-blur-sm p-6 shadow-md ring-1 ring-white/70 transition-all hover:-translate-y-1 hover:shadow-xl"
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
      {category.items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-base text-neutral-600 md:text-lg"
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
  const { ref, isInView, variants } = useScrollAnimation()
  const getCardTransition = (delay: number): Transition => getTransition(delay)

  return (
    <Section
      ref={ref}
      id="about"
      aria-label="關於阿福醫師"
      className="overflow-hidden bg-linear-to-b from-brand-50/60 via-white to-neutral-50/80"
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
            transition={baseTransition}
            className="mb-6 flex justify-center"
            aria-hidden="true"
          >
            <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-linear-to-br from-brand-500/20 to-brand-600/20">
              <HiOutlineUserCircle className="h-6 w-6 md:h-8 md:w-8 text-brand-600" />
            </div>
          </motion.div>
          <motion.div
            variants={variants.fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={getTransition(0.2)}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              認識阿福醫師（徐彥勳）
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-base leading-7 text-neutral-600 [text-wrap:balance] md:text-lg md:leading-8">
              擁有中西醫雙學位與 15 年臨床經驗，徐醫師善於結合微創技術與貼心照護，
              針對每位病患的生活型態與需求，提供客製化治療與完整術後追蹤。
            </p>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-12 md:mt-20 md:flex-row md:items-start md:gap-16 lg:gap-20">
          {/* 醫師照片 */}
          <motion.div
            variants={variants.slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={baseTransition}
            className="w-full space-y-8 md:w-1/2 lg:w-2/5"
          >
            <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-2xl transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute -right-6 -top-6 h-full w-full rounded-3xl bg-linear-to-br from-neutral-100 to-white/80" aria-hidden="true" />
              <div className="absolute -left-6 -bottom-6 h-full w-full rounded-3xl bg-linear-to-br from-brand-600 to-brand-500/90" aria-hidden="true" />
              <div className="relative h-full w-full overflow-hidden rounded-3xl" style={{ position: 'relative', minHeight: '400px' }}>
                <Image
                  src="/doctor-profile3.jpg"
                  alt="阿福醫師（徐彥勳）- 大腸直腸外科專科醫師，擁有豐富的臨床經驗，專注於提供高品質的醫療服務"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 500px"
                  priority
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900/30 to-transparent" aria-hidden="true" />
              </div>
            </div>
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute -right-4 -top-4 h-full w-full rounded-2xl bg-linear-to-br from-neutral-50 to-white/80" aria-hidden="true" />
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src="/徐彥勳醫師-直外科學會醫師證書.webp"
                  alt="徐彥勳醫師 大腸直腸外科學會專科醫師證書"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  loading="lazy"
                  className="object-contain object-center p-4 transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </motion.div>

          {/* 經歷與專長 */}
          <motion.div
            variants={variants.slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={baseTransition}
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
                getTransition={getCardTransition}
              />
            ))}

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <LineButton
                text="預約醫師評估"
                analyticsData={{ text: 'about_cta', location: 'about', destination: 'line' }}
              />
              <Link
                href="/services"
                className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'rounded-full px-6')}
              >
                了解診療服務
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
