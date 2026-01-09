import { MetadataRoute } from 'next'
import { Locale, getDictionary, locales } from '@/lib/i18n'

// Funzione per ottenere l'URL base del sito
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'https://mabaconsulting.com'
}

// Mapping degli ID servizi tra italiano e inglese
const serviceIdMap: Record<string, Record<Locale, string>> = {
  'supporto-su-misura': { it: 'supporto-su-misura', en: 'tailored-support' },
  'tailored-support': { it: 'supporto-su-misura', en: 'tailored-support' },
  'supporto-tecnico': { it: 'supporto-tecnico', en: 'technical-support' },
  'technical-support': { it: 'supporto-tecnico', en: 'technical-support' },
  'supporto-gestionale-organizzativo': { it: 'supporto-gestionale-organizzativo', en: 'management-organizational-support' },
  'management-organizational-support': { it: 'supporto-gestionale-organizzativo', en: 'management-organizational-support' },
  'supporto-commerciale-marketing': { it: 'supporto-commerciale-marketing', en: 'commercial-marketing-support' },
  'commercial-marketing-support': { it: 'supporto-commerciale-marketing', en: 'commercial-marketing-support' },
  'supporto-formativo': { it: 'supporto-formativo', en: 'training-support' },
  'training-support': { it: 'supporto-formativo', en: 'training-support' },
}

// Funzione helper per ottenere l'ID tradotto del servizio
function getTranslatedServiceId(serviceId: string, targetLang: Locale): string {
  return serviceIdMap[serviceId]?.[targetLang] || serviceId
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Aggiungi le pagine principali per ogni lingua
  locales.forEach((lang) => {
    sitemapEntries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          it: `${baseUrl}/it`,
          en: `${baseUrl}/en`,
        },
      },
    })
  })

  // Aggiungi le pagine servizi per ogni lingua
  locales.forEach((lang) => {
    const dictionary = getDictionary(lang)
    const services = dictionary.services?.list || []

    services.forEach((service: any) => {
      const itServiceId = getTranslatedServiceId(service.id, 'it')
      const enServiceId = getTranslatedServiceId(service.id, 'en')

      sitemapEntries.push({
        url: `${baseUrl}/${lang}/services/${service.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            it: `${baseUrl}/it/services/${itServiceId}`,
            en: `${baseUrl}/en/services/${enServiceId}`,
          },
        },
      })
    })
  })

  // Aggiungi le pagine team per ogni lingua
  const teamMembers = ['mauro-balduccini', 'livia-balduccini']
  locales.forEach((lang) => {
    teamMembers.forEach((member) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/team/${member}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            it: `${baseUrl}/it/team/${member}`,
            en: `${baseUrl}/en/team/${member}`,
          },
        },
      })
    })
  })

  return sitemapEntries
}

