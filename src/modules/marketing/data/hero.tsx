import {
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from 'react-icons/hi2'

import { HERO_PRACTICE_LOCATIONS } from '@/config/site-content'

export const features = [
  {
    icon: <HiOutlineShieldCheck className="h-5 w-5" />,
    text: '隱私保護・安心就醫',
  },
  {
    icon: <HiOutlineUserGroup className="h-5 w-5" />,
    text: '專業團隊・細心照護',
  },
  {
    icon: <HiOutlineHeart className="h-5 w-5" />,
    text: '以人為本・溫暖服務',
  },
] as const

/** 首頁診所位置（由 site-content 衍生） */
export const locations = HERO_PRACTICE_LOCATIONS.map((loc) => ({
  name: loc.name,
  address: loc.address ?? '',
  telephone: loc.telephone ?? '',
  serviceAreaNote: loc.serviceAreaNote ?? '',
  link: loc.mapUrl ?? '',
}))
