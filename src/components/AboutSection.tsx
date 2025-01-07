'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HiOutlineUserCircle, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineClipboardDocument } from 'react-icons/hi2'

export default function AboutSection() {
  const experience = [
    {
      icon: <HiOutlineAcademicCap className="h-6 w-6 text-brand-600" />,
      title: '專業資格',
      items: [
        '中華民國外科醫學會專科醫師',
        '中華民國大腸直腸外科醫學會專科醫師',
        '中國醫藥大學中西醫雙學士',
        '台灣微創手術醫學會會員',
        '亞洲大腸直腸外科醫學會會員'
      ]
    },
    {
      icon: <HiOutlineBriefcase className="h-6 w-6 text-brand-600" />,
      title: '學經歷',
      items: [
        '彰化基督教醫院外科部住院醫師',
        '彰化基督教醫院大腸直腸外科研究醫師',
        '禾馨台中安和婦幼診所直腸外科主治醫師',
        '禾馨內湖民權婦幼診所直腸外科主治醫師',
        '佑民醫院（草屯）直腸外科主治醫師',
      ]
    },
    {
      icon: <HiOutlineClipboardDocument className="h-6 w-6 text-brand-600" />,
      title: '診療項目',
      items: [
        '專業痔瘡治療：採用先進微創技術，傷口小、恢復快',
        '肛門裂隙治療：根據病情客製化治療方案，有效改善不適',
        '肛門廔管治療：運用精準手術技術，預防復發',
        '大腸直腸疾病：全方位診療照護，守護腸道健康',
        '術前評估與術後照護：專業團隊一對一諮詢與追蹤'
      ]
    }
  ]

  const publications = [
    {
      title: 'Laparoscopic Primary Repair of Iatrogenic Colon Perforation',
      journal: 'Journal of the Society of Colon and Rectal Surgeons (Taiwan)',
      year: '2010',
      authors: 'Yen-Shin Hsu, Hong-Chang Chen, et al.'
    }
  ]

  return (
    <section 
      id="about"
      className="section-padding relative w-full overflow-hidden bg-gradient-to-b from-brand-50 via-white to-brand-50">
      {/* 背景裝飾 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-brand-50/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-neutral-50/80 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 h-[300px] w-[300px] rounded-full bg-brand-50/30 blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[250px] w-[250px] rounded-full bg-brand-50/20 blur-2xl" />
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
              <HiOutlineUserCircle className="h-6 w-6 md:h-8 md:w-8 text-brand-600" />
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
              認識徐醫師
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-600 [text-wrap:balance] md:text-lg">
              擁有中西醫雙學位的專業背景，結合現代醫學與傳統智慧，
              以細膩的專業態度，為每位病患提供最適切的診療方案。
            </p>
          </motion.div>
        </div>

        <div className="mt-12 md:mt-16 flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16 lg:gap-20">
          {/* 醫師照片 */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 lg:w-2/5"
          >
            <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-2xl transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute -right-6 -top-6 h-full w-full rounded-3xl bg-gradient-to-br from-neutral-100 to-white/80" />
              <div className="absolute -left-6 -bottom-6 h-full w-full rounded-3xl bg-gradient-to-br from-brand-600 to-brand-500/90" />
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                <Image
                  src="/doctor-profile2.jpg"
                  alt="徐彥勳醫師 - 大腸直腸外科專科醫師"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* 經歷與專長 */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full space-y-8 md:w-1/2 lg:w-3/5"
          >
            <div className="prose-custom">
              <p className="mb-8 text-base leading-relaxed text-neutral-600 md:text-lg">
                累積多年的臨床經驗，深知每位病患的困擾與期待。
                秉持以病患為中心的服務理念，提供專業且溫暖的醫療照護，
                讓您在就醫過程中感受到安心與信賴。
                持續精進醫療技術，致力於提供最優質的診療服務。
              </p>
            </div>
            
            {experience.map((category, index) => (
              <motion.div 
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-sm ring-1 ring-neutral-100/80 transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50/80 backdrop-blur-sm">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="flex items-center gap-3 text-base text-neutral-600 md:text-lg"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            
            {/* 學術著作 */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-sm ring-1 ring-neutral-100/80"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50/80 backdrop-blur-sm">
                  <HiOutlineAcademicCap className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">
                  學術著作
                </h3>
              </div>
              {publications.map((pub, index) => (
                <div key={index} className="rounded-xl bg-neutral-50/80 backdrop-blur-sm p-4">
                  <h4 className="mb-2 font-bold text-neutral-900">{pub.title}</h4>
                  <p className="text-sm text-neutral-600">
                    {pub.authors}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {pub.journal}, {pub.year}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 