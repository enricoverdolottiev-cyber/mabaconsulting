import { Locale, getDictionary } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { I18nProvider } from '@/contexts/I18nContext'

export const dynamicParams = false

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

export function generateStaticParams() {
  const params: Array<{ lang: Locale; id: string }> = []
  
  // Genera parametri per ogni lingua e ogni servizio
  ;['it', 'en'].forEach((lang) => {
    const dictionary = getDictionary(lang as Locale)
    const services = dictionary.services.list || []
    services.forEach((service: any) => {
      params.push({ lang: lang as Locale, id: service.id })
    })
  })
  
  return params
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; id: string }>
}) {
  const { lang, id } = await params

  if (!['it', 'en'].includes(lang)) {
    notFound()
  }

  const dictionary = getDictionary(lang)
  const services = dictionary.services.list || []
  
  // Trova il servizio corrispondente all'ID
  let service = services.find((s: any) => s.id === id)
  
  // Se non trovato, prova a tradurre l'ID
  if (!service) {
    const mappedId = serviceIdMap[id]?.[lang]
    if (mappedId) {
      service = services.find((s: any) => s.id === mappedId)
    }
  }
  
  if (!service) {
    notFound()
  }

  return (
    <I18nProvider initialLocale={lang}>
      <main className="min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 lg:px-8 border-b border-white/10">
          <div className="container mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <Link
              href={`/${lang}#services`}
              className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8 group"
              scroll={true}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{dictionary.services.detail.backToServices}</span>
            </Link>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tighter font-sans">
              <span className="gradient-text">{service.title}</span>
            </h1>
            
            {/* Subtitle */}
            {service.content?.subtitle && (
              <p className="text-2xl text-text-secondary max-w-3xl leading-relaxed font-sans">
                {service.content.subtitle}
              </p>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="relative py-20 px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="glass rounded-2xl p-8 md:p-12">
              {/* Description */}
              {service.content?.description && (
                <div className="mb-12">
                  <p className="text-lg text-text-secondary leading-relaxed font-sans whitespace-pre-line">
                    {service.content.description}
                  </p>
                </div>
              )}

              {/* Features Section */}
              {service.content?.features && service.content.features.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8 tracking-tight font-sans">
                    {dictionary.services.detail.detailsTitle}
                  </h2>
                  <div className="space-y-4">
                    {service.content.features.map((feature: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/5 hover:border-primary/30 transition-colors"
                      >
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <p className="text-text-secondary leading-relaxed font-sans flex-1">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="glass rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight font-sans">
                  {dictionary.services.detail.ctaTitle}
                </h2>
                <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto font-sans">
                  {dictionary.services.detail.ctaDescription}
                </p>
                <Link
                  href={`/${lang}#contact`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-cyan text-white font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(0,112,255,0.5)] transition-all duration-300 transform hover:scale-105 font-sans"
                  scroll={true}
                >
                  {dictionary.services.detail.ctaButton}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </I18nProvider>
  )
}

