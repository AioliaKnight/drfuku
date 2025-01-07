import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineChatBubbleOvalLeft, HiOutlineMapPin } from 'react-icons/hi2'
import { RiInstagramLine } from 'react-icons/ri'
import { FaFacebook } from 'react-icons/fa'

export default function Footer() {
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/dr.hsu.care',
      icon: <FaFacebook className="h-5 w-5" />,
      hoverColor: 'hover:text-[#1877F2]'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/dr.hsu.care/',
      icon: <RiInstagramLine className="h-5 w-5" />,
      hoverColor: 'hover:text-[#E4405F]'
    }
  ]

  const clinics = [
    {
      name: '禾馨台中安和婦幼診所',
      address: '台中市西屯區安和路118-18號',
    },
    {
      name: '禾馨民權婦幼診所',
      address: '台北市內湖區民權東路六段42號',
    },
    {
      name: '佑民醫院',
      address: '南投縣草屯鎮太平路一段200號',
    }
  ]

  const quickLinks = [
    { name: '關於醫師', id: 'about' },
    { name: '診療服務', id: 'services' },
    { name: '病患評價', id: 'testimonials' },
    { name: '常見問題', id: 'faq' }
  ]

  return (
    <footer className="relative w-full overflow-hidden border-t border-neutral-100">
      {/* 背景裝飾 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-brand-50/30 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-brand-50/20 blur-2xl" />
      </div>

      {/* 主要內容 */}
      <div className="relative">
        {/* 上方區域 */}
        <div className="border-b border-neutral-100 bg-gradient-to-b from-white to-neutral-50/80 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {/* Logo 和醫師簡介 */}
              <div className="lg:col-span-2">
                <Link 
                  href="/" 
                  className="group relative mb-6 inline-flex items-center gap-3 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand-600/20 to-brand-400/20 blur transition-all group-hover:inset-0 group-hover:blur-md" />
                    <Image
                      src="/logo.png"
                      alt="徐彥勳大腸直腸專科"
                      width={48}
                      height={48}
                      className="relative h-12 w-12 rounded-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col pr-2">
                    <span className="text-xl font-bold text-neutral-900">
                      徐彥勳
                    </span>
                    <span className="text-sm font-medium text-neutral-500">
                      大腸直腸專科醫師
                    </span>
                  </div>
                </Link>
                <div className="space-y-4">
                  <p className="text-base leading-relaxed text-neutral-600">
                    專精於大腸直腸疾病診療，致力於提供專業且溫暖的醫療服務。
                    在禾馨診所服務，為您打造安心的就醫體驗。
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="https://line.me/ti/p/~@772pable"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-2 rounded-xl bg-[#06C755] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <HiOutlineChatBubbleOvalLeft className="h-5 w-5" />
                      <span>LINE 諮詢預約</span>
                      <div className="absolute inset-0 rounded-xl bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                    {socialLinks.map((social) => (
                      <Link
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-0.5 hover:shadow-md ${social.hoverColor}`}
                      >
                        {social.icon}
                        <span>{social.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* 門診據點 */}
              <div>
                <h3 className="mb-6 text-lg font-bold text-neutral-900">門診據點</h3>
                <div className="space-y-6">
                  {clinics.map((clinic) => (
                    <div 
                      key={clinic.name}
                      className="group rounded-xl bg-white p-4 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <h4 className="mb-3 font-medium text-neutral-900">{clinic.name}</h4>
                      <div className="flex items-start gap-2 text-sm text-neutral-600">
                        <HiOutlineMapPin className="mt-1 h-4 w-4 flex-shrink-0" />
                        <span>{clinic.address}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 快速連結 */}
              <div>
                <h3 className="mb-6 text-lg font-bold text-neutral-900">快速連結</h3>
                <div className="grid gap-3">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={`#${link.id}`}
                      className="group flex items-center gap-2 text-neutral-600 transition-colors hover:text-brand-600"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-600 opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 下方區域 */}
        <div className="bg-gradient-to-b from-neutral-50/80 to-white py-8">
          <div className="container mx-auto px-4">
            <div className="space-y-6 text-center">
              {/* 醫療警語 */}
              <div className="mx-auto max-w-3xl space-y-2 rounded-2xl bg-white p-6 text-sm text-neutral-500 shadow-sm ring-1 ring-neutral-100">
                <p>本網站內容僅供參考，實際診療建議請依據醫師親診結果為準。</p>
                <p>網站資訊為臺灣地區所使用，其他地區使用者應遵循當地醫療法規。</p>
                <p>本網站遵循中華民國醫療法規範，嚴格遵守醫療廣告管理辦法。</p>
              </div>
              
              {/* 版權聲明 */}
              <p className="text-sm text-neutral-400">
                © {new Date().getFullYear()} 徐彥勳醫師 - 大腸直腸專科. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 