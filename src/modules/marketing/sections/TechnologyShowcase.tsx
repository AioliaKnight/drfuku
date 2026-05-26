'use client'

import { motion } from 'framer-motion'
import { HiOutlineBolt, HiOutlineBeaker, HiOutlineVariable } from 'react-icons/hi2'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import { getTransition } from '@/shared/animation'
import JsonLd from '@/shared/components/common/JsonLd'

const technologies = [
  {
    title: 'LHP® 雷射痔瘡消融技術',
    subtitle: '德國雙波長高階雷射系統',
    desc: '利用 1470nm 特殊波長雷射，透過極微小針孔進入痔瘡組織進行消融。核心優勢在於「不切除皮膚與黏膜」，能有效保護肛門括約肌功能，術後疼痛感極低且無需拆線。',
    features: ['針孔級微創傷口', '保留肛門襯墊', '出血量極少'],
    icon: <HiOutlineBolt className="h-8 w-8 text-brand-600" />
  },
  {
    title: 'LigaSure™ 組織凝集刀',
    subtitle: '智慧型能量反饋系統',
    desc: '運用精準的雙極電能與壓力，在切割的同時完成血管封合（Seal）。相較於傳統電燒，其熱擴散效應極低，能顯著減少周邊組織的二次損傷，大幅縮短術後傷口的癒合時間。',
    features: ['術中幾近零出血', '熱損傷半徑小', '癒合品質優異'],
    icon: <HiOutlineBeaker className="h-8 w-8 text-brand-600" />
  },
  {
    title: '複合式微創技術',
    subtitle: '量身打造的整合方案',
    desc: '並非每一種痔瘡都適合單一技術。阿福醫師會根據內外痔的分級，彈性組合雷射消融與組織凝集刀，在「徹底清除病灶」與「極致減痛」之間取得最佳平衡點。',
    features: ['分級客製化', '同步處理內外痔', '縮短 50% 恢復期'],
    icon: <HiOutlineVariable className="h-8 w-8 text-brand-600" />
  }
]

export default function TechnologyShowcase() {
  return (
    <Section className="bg-white">
      <JsonLd
        type="MedicalProcedure"
        data={{
          '@type': 'MedicalProcedure' as const,
          name: 'LHP® 雷射痔瘡消融技術',
          description: '利用 1470nm 特殊波長雷射消融痔瘡組織，不切除皮膚與黏膜，有效保留肛門功能決。',
          relevantSpecialty: { '@type': 'MedicalSpecialty' as const, name: 'Colorectal Surgery' },
          procedureType: 'Minimally Invasive'
        }}
      />
      <JsonLd
        type="MedicalProcedure"
        data={{
          '@type': 'MedicalProcedure' as const,
          name: 'LigaSure™ 組織凝集刀',
          description: '智慧型能量反饋系統封合血管，降低熱擴散損傷，縮短術後癒合時間。',
          relevantSpecialty: { '@type': 'MedicalSpecialty' as const, name: 'Colorectal Surgery' },
          procedureType: 'Minimally Invasive'
        }}
      />
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block rounded-lg bg-care-50 px-3 py-1 text-xs font-bold tracking-widest text-care-600 uppercase ring-1 ring-care-100/50 mb-4">
              Advanced Technology
            </span>
            <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl font-serif">
              同步國際的微創設備
            </h2>
            <p className="mt-6 text-neutral-600 text-lg leading-relaxed">
              工欲善其事，必先利其器。阿福醫師堅持引進與醫學中心同等級的能量器械，結合精細的手法，讓「痔瘡手術不痛苦」成為現實。
            </p>
          </div>
        </div>

        <div className="space-y-12 md:space-y-20">
          {technologies.map((tech, idx) => (
            <motion.div
              key={tech.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, x: idx % 2 === 0 ? -30 : 30 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={getTransition(0.2)}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-center`}
            >
              <div className="flex-1 w-full">
                <div className="surface-card p-8 md:p-12 relative overflow-hidden bg-warm-50/50 border-none ring-1 ring-neutral-200/40 shadow-warm-lg">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    {tech.icon}
                  </div>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center shadow-warm-sm text-brand-600">
                      {tech.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 font-serif">{tech.title}</h3>
                      <p className="text-sm font-medium text-brand-600 uppercase tracking-wider mt-1">{tech.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-lg leading-loose text-neutral-600 mb-8">
                    {tech.desc}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {tech.features.map(f => (
                      <span key={f} className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-neutral-700 shadow-warm-sm ring-1 ring-neutral-200/50">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full hidden md:block">
                {/* 這裡可以預留放置設備真實照片的區塊 */}
                <div className="aspect-video w-full rounded-[3rem] bg-linear-to-br from-brand-100/30 to-care-100/20 ring-1 ring-neutral-200/30 flex items-center justify-center p-12">
                   <div className="text-center">
                      <p className="text-brand-600/40 font-serif italic text-xl">Advanced Surgical Instrumentation</p>
                      <div className="mt-4 h-px w-24 mx-auto bg-brand-200/50" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
