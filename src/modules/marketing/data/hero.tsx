import {
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineMapPin,
  HiOutlineArrowTopRightOnSquare,
} from 'react-icons/hi2'

export const features = [
  {
    icon: <HiOutlineShieldCheck className="h-5 w-5" />,
    text: '隱私保護・安心就醫'
  },
  {
    icon: <HiOutlineUserGroup className="h-5 w-5" />,
    text: '專業團隊・細心照護'
  },
  {
    icon: <HiOutlineHeart className="h-5 w-5" />,
    text: '以人為本・溫暖服務'
  }
] as const

export const achievements = [
  {
    icon: <HiOutlineUserGroup className="h-8 w-8 text-brand-600" />,
    title: '專業資格',
    description: '大腸直腸外科專科醫師',
    stats: '中西醫雙學位'
  },
  {
    icon: <HiOutlineHeart className="h-8 w-8 text-brand-600" />,
    title: '臨床經驗',
    description: '豐富診療經驗',
    stats: '5000+ 成功案例'
  },
  {
    icon: <HiOutlineShieldCheck className="h-8 w-8 text-brand-600" />,
    title: '醫療團隊',
    description: '專業醫護照護',
    stats: '98% 手術成功率'
  }
] as const

export const locations = [
  {
    name: '禾馨台中安和婦幼診所',
    address: '台中市西屯區安和路118-18號',
    link: 'https://maps.app.goo.gl/44N7BPKayB43GcPx8'
  },
  {
    name: '禾馨內湖民權婦幼診所',
    address: '台北市內湖區民權東路六段42號',
    link: 'https://maps.app.goo.gl/KfcLKTevaovLt8r97'
  },
  {
    name: '佑民醫院（草屯）',
    address: '南投縣草屯鎮太平路一段200號',
    link: 'https://maps.app.goo.gl/X4S4WEJbC8msm4qr6'
  }
] as const

