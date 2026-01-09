import { Locale, getDictionary, locales } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import HtmlLangSetter from '@/components/HtmlLangSetter'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'en' }]
}

// Funzione per ottenere l'URL base del sito
function getBaseUrl() {
  // In produzione, usa la variabile d'ambiente o il dominio reale
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  // Fallback per sviluppo locale
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'https://mabaconsulting.com'
}

// Genera metadata dinamici per ogni lingua
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  
  if (!['it', 'en'].includes(lang)) {
    notFound()
  }

  const dictionary = getDictionary(lang)
  const baseUrl = getBaseUrl()
  const seo = dictionary.seo

  // Genera alternates per hreflang
  const alternates: Metadata['alternates'] = {
    canonical: `${baseUrl}/${lang}`,
    languages: {
      'it': `${baseUrl}/it`,
      'en': `${baseUrl}/en`,
      'x-default': `${baseUrl}/it`, // Default alla versione italiana
    },
  }

  // Immagine Open Graph (placeholder - da sostituire con immagine reale)
  const ogImage = `${baseUrl}/og-image.jpg` // Assicurati di avere questa immagine in public/

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: seo.defaultTitle,
      template: `%s | ${seo.siteName}`,
    },
    description: seo.defaultDescription,
    keywords: seo.keywords,
    authors: [{ name: 'MaBaconsulting' }],
    creator: 'MaBaconsulting',
    publisher: 'MaBaconsulting',
    alternates,
    openGraph: {
      type: 'website',
      locale: lang === 'it' ? 'it_IT' : 'en_US',
      url: `${baseUrl}/${lang}`,
      siteName: seo.siteName,
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seo.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      images: [ogImage],
      creator: '@mabaconsulting', // Aggiorna con il tuo handle Twitter se disponibile
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Aggiungi i codici di verifica quando disponibili
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params

  if (!['it', 'en'].includes(lang)) {
    notFound()
  }

  const dictionary = getDictionary(lang)
  const baseUrl = getBaseUrl()

  // JSON-LD Structured Data (Schema.org)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: dictionary.seo.siteName,
    description: dictionary.seo.defaultDescription,
    url: `${baseUrl}/${lang}`,
    logo: `${baseUrl}/logo.png`, // Assicurati di avere il logo in public/
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Giulia, 16',
      addressLocality: 'Roma',
      postalCode: '00186',
      addressCountry: 'IT',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+39-335-7431423',
      contactType: 'customer service',
      email: 'info@mabaconsulting.com',
      availableLanguage: ['Italian', 'English'],
    },
    sameAs: [
      // Aggiungi i link ai social media quando disponibili
      // 'https://www.linkedin.com/company/mabaconsulting',
      // 'https://twitter.com/mabaconsulting',
    ],
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    serviceType: [
      'Aerospace Engineering Consulting',
      'Defense Systems Consulting',
      'Technical Support',
      'Program Management',
      'Business Development',
    ],
    foundingDate: '2015',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HtmlLangSetter lang={lang} />
      {children}
    </>
  )
}

