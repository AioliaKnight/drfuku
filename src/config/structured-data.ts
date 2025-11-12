import { SITE, DOCTOR, CLINIC, DISEASE } from './constants'
import type { StructuredData } from './types'

// 結構化數據配置
export const structuredData: Record<string, StructuredData> = {
  website: {
    type: 'WebSite',
    data: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
        name: '網站搜索'
      }
    }
  },
  clinic: {
    type: 'MedicalClinic',
    data: {
      '@type': 'MedicalClinic',
      name: CLINIC.name,
      alternateName: CLINIC.alternateName,
      url: SITE.url,
      logo: CLINIC.logo,
      telephone: CLINIC.telephone,
      description: '專業的痔瘡診療中心，提供微創手術和完整的術後照護。',
      address: {
        '@type': 'PostalAddress',
        streetAddress: CLINIC.address.street,
        addressLocality: CLINIC.address.district,
        addressRegion: CLINIC.address.city,
        postalCode: CLINIC.address.postalCode,
        addressCountry: CLINIC.address.country,
        name: `${CLINIC.name}地址`
      },
      areaServed: CLINIC.areaServed.map(city => ({
        '@type': 'City',
        name: city
      })),
      availableService: CLINIC.services.map(service => ({
        '@type': 'MedicalProcedure',
        name: service.name,
        description: service.description
      }))
    }
  },
  doctor: {
    type: 'Person',
    data: {
      '@type': 'Person',
      name: DOCTOR.name,
      givenName: DOCTOR.givenName,
      familyName: DOCTOR.familyName,
      alternateName: DOCTOR.alternateName,
      jobTitle: DOCTOR.title,
      description: DOCTOR.description,
      image: DOCTOR.image,
      url: DOCTOR.url
    }
  },
  medicalPage: {
    type: 'MedicalWebPage',
    data: {
      '@type': 'MedicalWebPage',
      name: '痔瘡診療資訊',
      description: '提供專業的痔瘡診療資訊、治療方案和預防建議。',
      about: {
        '@type': 'MedicalCondition',
        name: DISEASE.name,
        alternateName: DISEASE.alternateName,
        description: DISEASE.description,
        possibleTreatment: DISEASE.treatments.map(treatment => ({
          '@type': 'MedicalTherapy',
          name: treatment.name,
          description: treatment.description
        }))
      }
    }
  }
}
