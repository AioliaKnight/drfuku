import Image from 'next/image'

interface AuthorInfoProps {
  author: string
}

export default function AuthorInfo({ author }: AuthorInfoProps) {
  return (
    <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-white to-brand-50/50 p-3 shadow-xl ring-1 ring-brand-100/50">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50/50 to-white p-8 md:p-12">
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4">
          <div className="h-72 w-72 rounded-full bg-brand-100/30 blur-3xl" />
        </div>
        <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
          <div className="relative h-32 w-32 overflow-hidden rounded-full bg-white shadow-lg ring-8 ring-brand-50 transition-all duration-500 hover:scale-105 hover:shadow-xl sm:h-40 sm:w-40">
            <Image
              src="/doctor-profile.jpg"
              alt={author}
              fill
              sizes="(max-width: 640px) 128px, 160px"
              className="object-cover object-center"
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-brand-900 md:text-3xl lg:text-4xl">
              {author}
            </h3>
            <p className="text-lg leading-relaxed text-brand-800 md:text-xl lg:text-2xl">
              專業痔瘡診療與保健醫師
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl">
              擁有超過15年的臨床經驗，專注於痔瘡的預防、診斷和治療，致力於為患者提供最佳的醫療服務。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

