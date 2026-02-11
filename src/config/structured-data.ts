import { SITE, DOCTOR, CLINIC, DISEASE } from './constants'
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
      telephone: CLINIC.telephone,
      description: '大腸直腸外科專科診療，提供痔瘡微創手術、大腸直腸與肛門疾病診治及完整術後照護。',
      medicalSpecialty: 'Colorectal Surgery',
      address: clinicAddress,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.0579,
        longitude: 121.5234,
      },
      areaServed: CLINIC.areaServed.map(city => ({
        '@type': 'City',
        name: city,
      })),
      availableService: CLINIC.services.map(service => ({
        '@type': 'MedicalProcedure',
        name: service.name,
        description: service.description,
      })),
      priceRange: '$$',
      currenciesAccepted: 'TWD',
      paymentAccepted: '健保, 現金, 信用卡',
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
      medicalSpecialty: 'Colorectal Surgery',
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'board certification',
          name: '中華民國大腸直腸外科專科醫師',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'board certification',
          name: '中華民國外科醫學會專科醫師',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: '中國醫藥大學中西醫雙學士',
        },
      ],
      worksFor: {
        '@type': 'MedicalClinic',
        name: CLINIC.name,
        url: SITE.url,
      },
    }
  },
  medicalPage: {
    type: 'MedicalWebPage',
    data: {
      '@type': 'MedicalWebPage',
      name: '大腸直腸外科診療資訊',
      description: '提供大腸直腸外科專業診療資訊、痔瘡治療方案與預防建議。',
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
  telephone: CLINIC.telephone,
  url: SITE.url,
}

/** 共用的 author 資料（用於 Article schema） */
export const articleAuthor = {
  '@type': 'Physician' as const,
  name: DOCTOR.name,
  jobTitle: DOCTOR.title,
  image: DOCTOR.image,
  url: DOCTOR.url,
  medicalSpecialty: 'Colorectal Surgery',
}
