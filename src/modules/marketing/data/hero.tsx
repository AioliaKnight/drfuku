import {
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineHeart,
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

export const locations = [
  {
    name: '禾馨內湖民權婦幼診所',
    address: '台北市內湖區民權東路六段42號',
    link: 'https://maps.app.goo.gl/KfcLKTevaovLt8r97'
  },
  {
    name: '顧芳瑜泌尿科診所 大安分院',
    address: '106臺北市大安區信義路三段192-1號4樓',
    link: 'https://maps.app.goo.gl/1FsNbydSNMxLC9ci8'
  },
  {
    name: '佑民醫院（草屯）',
    address: '南投縣草屯鎮太平路一段200號',
    link: 'https://maps.app.goo.gl/X4S4WEJbC8msm4qr6'
  }
] as const

