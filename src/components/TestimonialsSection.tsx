'use client'

import { useState, useEffect } from 'react'
import { HiOutlineStar, HiStar, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function TestimonialsSection() {
  const testimonials = [
    {
      content: {
        main: '原本擔心手術會很痛，但徐醫師採用的微創手術真的讓我很放心。術後恢復期間，醫護團隊的照護非常細心，讓我感受到專業又溫暖的醫療服務。',
        detail: '從諮詢、手術到術後追蹤，醫師都很仔細地解說每個環節，讓我完全了解治療過程。診所環境舒適，醫護人員親切有耐心，整體感受很好。',
        pros: ['微創手術', '恢復迅速', '醫護專業', '解說詳細']
      },
      author: '王小姐',
      age: '32歲',
      title: '痔瘡微創手術',
      date: '術後3個月',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
      content: {
        main: '長期被痔瘡困擾，在徐醫師這裡得到很好的治療建議。醫師不只處理症狀，還教導我如何改善生活習慣，預防復發。現在生活品質提升很多。',
        detail: '很感謝醫師細心診療，並提供實用的保健建議。特別是飲食和運動的部分，讓我學會如何照顧自己。診所的衛教資訊也很完整。',
        pros: ['專業諮詢', '保健指導', '耐心解說', '追蹤完整']
      },
      author: '林先生',
      age: '45歲',
      title: '痔瘡治療諮詢',
      date: '治療後1個月',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
      content: {
        main: '在懷孕期間發生痔瘡問題，一開始很擔心。經過徐醫師的治療和照護建議後，症狀獲得很好的改善，讓我能安心地度過孕期。',
        detail: '醫師很了解孕婦的特殊需求，提供的照護方式既安全又有效。產後回診時也持續追蹤，讓我感受到醫療團隊的用心。',
        pros: ['孕期照護', '安全治療', '持續關懷', '效果顯著']
      },
      author: '陳小姐',
      age: '28歲',
      title: '孕期痔瘡照護',
      date: '產後2個月',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
      content: {
        main: '工作常久坐，痔瘡問題困擾多年。在徐醫師這裡接受治療後，不只改善症狀，還學會許多預防方法。醫師的專業態度讓人很安心。',
        detail: '診所提供完整的衛教資訊，醫護人員也很有耐心解答問題。特別感謝醫師針對我的工作型態提供的保健建議，讓我能更好地預防問題。',
        pros: ['完整諮詢', '預防指導', '問題改善', '貼心服務']
      },
      author: '張先生',
      age: '38歲',
      title: '痔瘡治療與諮詢',
      date: '治療後6個月',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
      content: {
        main: '因為工作壓力大，長期便秘導致痔瘡問題。徐醫師不僅治療症狀，還幫我找出根本原因，提供全方位的照護建議。',
        detail: '醫師建議的飲食調整和生活作息改善方案非常實用。現在不只痔瘡問題改善，整體健康狀況也變好了。感謝醫療團隊的專業協助。',
        pros: ['全方位照護', '生活指導', '壓力管理', '健康促進']
      },
      author: '李小姐',
      age: '35歲',
      title: '痔瘡綜合治療',
      date: '治療後2個月',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
      content: {
        main: '年紀大了，痔瘡問題一直不敢就醫。但在家人推薦下來找徐醫師，沒想到治療過程這麼溫和，讓我很放心。',
        detail: '醫師特別注意到老年人的需求，治療方式非常溫和，也提供了許多居家照護的建議。護理人員的照顧也很細心，讓我感到很窩心。',
        pros: ['溫和治療', '老年照護', '貼心服務', '居家指導']
      },
      author: '周奶奶',
      age: '68歲',
      title: '老年痔瘡照護',
      date: '治療後1個月',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1442458370899-ae20e367c5d8?q=80&w=200&h=200&auto=format&fit=crop'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        index < rating ? (
          <HiStar key={index} className="h-4 w-4 md:h-5 md:w-5 text-amber-400" />
        ) : (
          <HiOutlineStar key={index} className="h-4 w-4 md:h-5 md:w-5 text-amber-400" />
        )
      ))}
    </div>
  )

  return (
    <section 
      id="testimonials"
      className="relative w-full overflow-hidden bg-gradient-to-b from-white to-neutral-50 py-12 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-4 top-1/4 h-48 w-48 rounded-full bg-brand-100/50 blur-3xl" />
        <div className="absolute -right-4 top-3/4 h-48 w-48 rounded-full bg-brand-100/50 blur-3xl" />
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
              <HiOutlineChatBubbleLeftRight className="h-6 w-6 md:h-8 md:w-8 text-brand-600" />
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
              病患心得分享
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-600 [text-wrap:balance] md:text-lg">
              聽聽我們的病患分享他們的治療經驗，
              每一個成功案例都是我們持續精進的動力。
              透過真實的經驗分享，
              了解我們如何幫助病患重拾健康。
            </p>
          </motion.div>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-2 md:px-4"
                >
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group rounded-2xl bg-white p-6 md:p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 md:h-16 md:w-16 overflow-hidden rounded-full ring-4 ring-brand-50 transition-transform group-hover:scale-105">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base md:text-lg font-medium text-neutral-900">
                              {testimonial.author}
                            </h3>
                            <span className="text-sm text-neutral-500">
                              {testimonial.age}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-500">{testimonial.title}</p>
                          <div className="mt-1">
                            <RatingStars rating={testimonial.rating} />
                          </div>
                        </div>
                      </div>
                      <span className="ml-0 md:ml-auto rounded-full bg-brand-50 px-3 py-1 text-xs md:text-sm text-brand-600">
                        {testimonial.date}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <p className="text-base md:text-lg text-neutral-600 leading-relaxed tracking-wide">
                        {testimonial.content.main}
                      </p>
                      <p className="text-sm md:text-base text-neutral-600 leading-relaxed tracking-wide">
                        {testimonial.content.detail}
                      </p>
                      <div className="mt-6">
                        <h4 className="mb-3 text-sm md:text-base font-medium text-neutral-900">治療特色：</h4>
                        <div className="flex flex-wrap gap-2">
                          {testimonial.content.pros.map((pro, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-brand-50 px-3 py-1 text-xs md:text-sm text-brand-600"
                            >
                              {pro}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 md:h-2.5 w-8 md:w-10 rounded-full transition-all ${
                  currentIndex === index
                    ? 'bg-brand-600'
                    : 'bg-brand-200 hover:bg-brand-300'
                }`}
                aria-label={`切換到第 ${index + 1} 則評價`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 