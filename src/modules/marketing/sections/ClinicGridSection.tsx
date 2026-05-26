'use client'

import { motion } from 'framer-motion'
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineArrowTopRightOnSquare, HiOutlineClock } from 'react-icons/hi2'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import { PRACTICE_LOCATIONS, toTelHref, getPracticeRoleLabel } from '@/config/site-content'
import { getTransition } from '@/shared/animation'

export default function ClinicGridSection() {
  return (
    <Section className="bg-warm-50">
      <Container>
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-block rounded-lg bg-brand-50 px-3 py-1 text-xs font-bold tracking-widest text-brand-700 uppercase ring-1 ring-brand-100 mb-4">
            Practice Locations
          </span>
          <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl font-serif">
            全台多點專業服務
          </h2>
          <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
            阿福醫師於台北、台中及南投多家知名醫療機構駐診，提供具備高度隱私且環境舒適的專業大腸直腸外科門診。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRACTICE_LOCATIONS.map((loc, idx) => (
            <motion.div
              key={loc.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
              }}
              transition={getTransition(idx * 0.1)}
              className="surface-card-interactive p-8 flex flex-col h-full bg-white group border-none ring-1 ring-neutral-200/40"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shadow-warm-sm group-hover:scale-110 transition-transform">
                  <HiOutlineMapPin className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  {loc.region}
                </span>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 font-serif mb-1 group-hover:text-brand-700 transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-sm font-medium text-brand-600 bg-brand-50/50 inline-block px-2 py-0.5 rounded-md">
                    {getPracticeRoleLabel(loc.role)}
                  </p>
                </div>

                <div className="space-y-3">
                  {loc.address && (
                    <div className="flex items-start gap-2 text-sm text-neutral-600 leading-relaxed">
                      <HiOutlineMapPin className="h-4 w-4 mt-1 shrink-0 text-neutral-400" />
                      <span>{loc.address}</span>
                    </div>
                  )}
                  {loc.telephone && (
                    <a
                      href={toTelHref(loc.telephone)}
                      className="flex items-center gap-2 text-sm font-bold text-neutral-700 hover:text-brand-600 transition-colors"
                    >
                      <HiOutlinePhone className="h-4 w-4 shrink-0 text-neutral-400" />
                      {loc.telephone}
                    </a>
                  )}
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <HiOutlineClock className="h-4 w-4 shrink-0 text-neutral-400" />
                    <span>門診時段請洽 LINE 諮詢</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 flex gap-3">
                {loc.mapUrl && (
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-neutral-50 px-4 py-3 text-sm font-bold text-neutral-700 hover:bg-brand-50 hover:text-brand-700 transition-all border border-neutral-200/50"
                  >
                    <span>Google 地圖</span>
                    <HiOutlineArrowTopRightOnSquare className="h-4 w-4" />
                  </a>
                )}
                {loc.websiteUrl && (
                  <a
                    href={loc.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-brand-600 ring-1 ring-brand-200 hover:bg-brand-50 transition-all shadow-warm-sm"
                  >
                    <span>診所官網</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
