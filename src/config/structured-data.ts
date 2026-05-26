import { SITE, DOCTOR, CLINIC, DISEASE } from './constants'
import { DOCTOR_CREDENTIALS, PRACTICE_LOCATIONS, SERVICE_AREAS } from './site-content'
import { testimonials } from '@/modules/marketing/data/testimonials'
import type { StructuredData } from './types'

/** 共用地址結構化資料 */
const clinicAddress = {
  '@type': 'PostalAddress' as const,
  name: `${CLINIC.address.addressLocality}${CLINIC.address.addressRegion}${CLINIC.address.streetAddress}`,
  streetAddress: CLINIC.address.streetAddress,
  addressLocality: CLINIC.address.addressLocality,
  addressRegion: CLINIC.address.addressRegion,
  postalCode: CLINIC.address.postalCode,
  addressCountry: CLINIC.address.addressCountry,
}

/** 共用 logo ImageObject（Google 要求 publisher.logo 為 ImageObject 格式） */
const clinicLogoObject = {
  '@type': 'ImageObject' as const,
  url: CLINIC.logo,
  width: 512,
  height: 512,
}

/** 進階醫療程序定義 */
export const MEDICAL_PROCEDURES = {
  lhp: {
    '@type': 'MedicalProcedure' as const,
    name: 'LHP® 雷射痔瘡消融術',
    description: '利用 1470nm 雷射能量使痔核萎縮，無大傷口且能保留肛門襯墊功能。',
    relevantSpecialty: { '@type': 'MedicalSpecialty' as const, name: 'Colorectal Surgery' },
    preparation: '需由專科醫師評估，部分患者需配合清腸。',
    procedureType: 'Minimally Invasive'
  },
  ligasure: {
    '@type': 'MedicalProcedure' as const,
    name: 'LigaSure™ 組織凝集微創手術',
    description: '智慧型能量反饋系統，精準封合血管並切割，大幅降低熱損傷與術後疼痛。',
    relevantSpecialty: { '@type': 'MedicalSpecialty' as const, name: 'Colorectal Surgery' },
    procedureType: 'Minimally Invasive'
  }
}

// 結構化數據配置
export const structuredData: Record<string, StructuredData> = {
  website: {
    type: 'WebSite',
    data: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      inLanguage: 'zh-TW',
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE.url,
      },
    }
  },
  organization: {
    type: 'Organization',
    data: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: clinicLogoObject,
      telephone: CLINIC.telephone,
      address: clinicAddress,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: CLINIC.telephone,
        contactType: 'customer service',
        availableLanguage: ['zh-TW'],
      },
    }
  },
  clinic: {
    type: 'MedicalClinic',
    data: {
      '@type': 'MedicalClinic',
      name: CLINIC.name,
      alternateName: CLINIC.alternateName,
      url: SITE.url,
      logo: clinicLogoObject,
      image: DOCTOR.image,
      telephone: CLINIC.telephone,
      description: '阿福醫師（徐彥勳）提供專業大腸直腸外科診療，專精 LHP 雷射痔瘡微創手術與 LigaSure 組織凝集儀手術。',
      medicalSpecialty: 'http://www.nlm.nih.gov/mesh/D003107',
      address: clinicAddress,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.1541,
        longitude: 120.6508,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '21:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '12:00'
        }
      ],
      areaServed: SERVICE_AREAS.map((city) => ({
        '@type': 'AdministrativeArea',
        name: city,
      })),
      availableService: [
        ...CLINIC.services.map(service => ({
          '@type': 'MedicalProcedure' as const,
          name: service.name,
          description: service.description,
        })),
        MEDICAL_PROCEDURES.lhp,
        MEDICAL_PROCEDURES.ligasure
      ],
      priceRange: '$$',
      currenciesAccepted: 'TWD',
      paymentAccepted: '健保, 現金, 信用卡, LINE Pay',
      isAcceptingNewPatients: true,
    }
  },
  doctor: {
    type: 'Person',
    data: {
      '@type': 'Physician',
      name: DOCTOR.name,
      givenName: DOCTOR.givenName,
      familyName: DOCTOR.familyName,
      alternateName: DOCTOR.alternateName,
      jobTitle: DOCTOR.title,
      description: DOCTOR.description,
      image: DOCTOR.image,
      url: DOCTOR.url,
      sameAs: DOCTOR.sameAs,
      medicalSpecialty: 'http://www.nlm.nih.gov/mesh/D003107',
      knowsAbout: [
        'Hemorrhoids',
        'Proctology',
        'Minimally Invasive Surgery',
        'Laser Surgery',
        'Colorectal Cancer Screening'
      ],
      hasCredential: DOCTOR_CREDENTIALS.map((name, index) => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: index === DOCTOR_CREDENTIALS.length - 1 ? 'degree' : 'board certification',
        name,
      })),
      worksFor: [
        {
          '@type': 'MedicalClinic',
          name: CLINIC.name,
          address: clinicAddress,
          telephone: CLINIC.telephone,
        },
        ...PRACTICE_LOCATIONS.map((loc) => ({
          '@type': 'MedicalOrganization',
          name: loc.name,
          ...(loc.address
            ? {
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: loc.address,
                  addressLocality: loc.region,
                  addressCountry: 'TW',
                },
              }
            : {}),
          ...(loc.mapUrl ? { url: loc.mapUrl } : {}),
          ...(loc.telephone ? { telephone: loc.telephone } : {}),
        }))
      ],
      review: testimonials.map(t => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: t.author },
        reviewRating: { '@type': 'Rating', ratingValue: t.rating },
        reviewBody: t.content.main,
        datePublished: '2024-12-20',
      }))
    }
  },
  medicalPage: {
    type: 'MedicalWebPage',
    data: {
      '@type': 'MedicalWebPage',
      name: '大腸直腸外科診療資訊 | 阿福醫師',
      description: '提供大腸直腸外科專業診療資訊、痔瘡治療方案與預防建議。',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首頁', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: '診療項目', item: `${SITE.url}/services` }
        ]
      },
      lastReviewed: new Date().toISOString().slice(0, 10),
      medicalAudience: {
        '@type': 'MedicalAudience',
        audienceType: 'Patient',
      },
      about: {
        '@type': 'MedicalCondition',
        name: DISEASE.name,
        alternateName: DISEASE.alternateName,
        description: DISEASE.description,
        relevantSpecialty: {
          '@type': 'MedicalSpecialty',
          name: 'Colorectal Surgery'
        },
        possibleTreatment: DISEASE.treatments.map(treatment => ({
          '@type': 'MedicalTherapy',
          name: treatment.name,
          description: treatment.description,
        })),
      }
    }
  }
}

/** 共用的 publisher 資料（用於 Article schema） */
export const articlePublisher = {
  '@type': 'MedicalClinic' as const,
  name: CLINIC.name,
  logo: clinicLogoObject,
  image: DOCTOR.image,
  telephone: CLINIC.telephone,
  address: clinicAddress,
  url: SITE.url,
}

/** 共用的 author 資料（用於 Article schema） */
export const articleAuthor = {
  '@type': 'Physician' as const,
  name: DOCTOR.name,
  givenName: DOCTOR.givenName,
  familyName: DOCTOR.familyName,
  jobTitle: DOCTOR.title,
  image: DOCTOR.image,
  url: DOCTOR.url,
  medicalSpecialty: 'http://www.nlm.nih.gov/mesh/D003107',
  sameAs: DOCTOR.sameAs,
}
