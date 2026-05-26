'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineCheckCircle, HiOutlineExclamationTriangle, HiOutlineChatBubbleLeftRight, HiArrowPath } from 'react-icons/hi2'
import LineButton from '@/shared/components/common/LineButton'
import { cn } from '@/shared/lib/cn'

interface Question {
  id: number
  text: string
  options: { label: string; score: number }[]
}

const questions: Question[] = [
  {
    id: 1,
    text: '排便時是否會發現鮮紅色的出血？',
    options: [
      { label: '從未發生', score: 0 },
      { label: '偶爾（紙擦拭有血）', score: 1 },
      { label: '經常（滴血或噴濺）', score: 3 }
    ]
  },
  {
    id: 2,
    text: '排便時是否有腫塊脫出的感覺？',
    options: [
      { label: '無脫出感', score: 0 },
      { label: '有，但排便後會自動縮回', score: 2 },
      { label: '有，且需用手推回或無法推回', score: 4 }
    ]
  },
  {
    id: 3,
    text: '肛門部位是否有持續性的腫脹或疼痛？',
    options: [
      { label: '完全無痛', score: 0 },
      { label: '微脹、偶爾搔癢', score: 1 },
      { label: '劇烈疼痛、坐立難安', score: 4 }
    ]
  }
]

export default function HemorrhoidAssessment() {
  const [currentStep, setCurrentStep] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const handleOptionSelect = (score: number) => {
    const nextScore = totalScore + score
    if (currentStep < questions.length - 1) {
      setTotalScore(nextScore)
      setCurrentStep(currentStep + 1)
    } else {
      setTotalScore(nextScore)
      setIsFinished(true)
    }
  }

  const reset = () => {
    setCurrentStep(0)
    setTotalScore(0)
    setIsFinished(false)
  }

  const getResult = () => {
    if (totalScore >= 7) return {
      title: '建議儘速就醫評估',
      desc: '您的症狀可能屬於較嚴重的痔瘡分級或急性血栓。建議尋求大腸直腸外科專科醫師診斷，評估微創手術的必要性。',
      icon: <HiOutlineExclamationTriangle className="h-12 w-12 text-red-500" />,
      color: 'text-red-600'
    }
    if (totalScore >= 3) return {
      title: '建議安排門診諮詢',
      desc: '您的症狀顯示已有初步的痔瘡困擾。建議先透過生活習慣調整與藥物控制，並安排門診進行肛門鏡檢查。',
      icon: <HiOutlineChatBubbleLeftRight className="h-12 w-12 text-amber-500" />,
      color: 'text-amber-600'
    }
    return {
      title: '目前狀況穩定',
      desc: '您的症狀尚輕。建議維持高纖飲食、多喝水並避免久坐，持續觀察即可。',
      icon: <HiOutlineCheckCircle className="h-12 w-12 text-green-500" />,
      color: 'text-green-600'
    }
  }

  const result = getResult()

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-neutral-200">
      <div className="bg-linear-to-r from-brand-600 to-brand-500 px-8 py-6 text-white text-center">
        <h3 className="text-xl font-bold">痔瘡嚴重度自我快速檢測</h3>
        <p className="mt-1 text-sm opacity-90">僅需 30 秒，初步了解您的臨床狀況</p>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-neutral-400">
                <span>問題 {currentStep + 1} / {questions.length}</span>
                <div className="h-1 w-24 rounded-full bg-neutral-100">
                  <div 
                    className="h-full rounded-full bg-brand-500 transition-all duration-300" 
                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
              
              <h4 className="text-lg font-bold text-neutral-900 leading-relaxed">
                {questions[currentStep].text}
              </h4>

              <div className="grid gap-3">
                {questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option.score)}
                    className="group flex items-center justify-between rounded-2xl border-2 border-neutral-100 p-4 text-left font-medium text-neutral-700 transition-all hover:border-brand-200 hover:bg-brand-50/50 active:scale-[0.98]"
                  >
                    <span>{option.label}</span>
                    <div className="h-5 w-5 rounded-full border-2 border-neutral-200 group-hover:border-brand-500" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="mb-4 flex justify-center">{result.icon}</div>
              <h4 className={cn("text-2xl font-bold mb-4", result.color)}>{result.title}</h4>
              <p className="text-neutral-600 leading-relaxed mb-8">
                {result.desc}
              </p>

              <div className="flex flex-col gap-4">
                <LineButton text="諮詢專科醫師建議" analyticsData={{ text: 'assessment_result_cta', location: 'assessment', destination: 'line' }} />
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 text-sm font-bold text-neutral-400 hover:text-brand-600 transition-colors"
                >
                  <HiArrowPath className="h-4 w-4" />
                  重新檢測
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-neutral-50 px-8 py-4 text-center">
        <p className="text-[10px] text-neutral-400 leading-relaxed">
          ※ 此檢測結果僅供初步參考，不能取代專業醫師的親自診斷。若有出血或劇烈疼痛，請務必諮詢專科醫師。
        </p>
      </div>
    </div>
  )
}
