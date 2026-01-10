import { Locale, getDictionary } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { I18nProvider } from '@/contexts/I18nContext'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'en' }]
}

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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mabaconsulting.com'

  return {
    title: `${dictionary.terms.title} | ${dictionary.seo.siteName}`,
    description: dictionary.terms.introduction,
    alternates: {
      canonical: `${baseUrl}/${lang}/terms-of-service`,
      languages: {
        'it': `${baseUrl}/it/terms-of-service`,
        'en': `${baseUrl}/en/terms-of-service`,
      },
    },
  }
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params

  if (!['it', 'en'].includes(lang)) {
    notFound()
  }

  const dictionary = getDictionary(lang)
  const terms = dictionary.terms

  return (
    <I18nProvider initialLocale={lang}>
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            {/* Title */}
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tighter font-sans">
                <span className="gradient-text">{terms.title}</span>
              </h1>
              <p className="text-sm text-text-secondary font-mono">
                {terms.lastUpdated} {new Date().toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg text-zinc-400 leading-relaxed font-sans">
                {terms.introduction}
              </p>
            </div>

            {/* Acceptance */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {terms.acceptance.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {terms.acceptance.content}
                </p>
              </div>
            </section>

            {/* Services */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {terms.services.title}
                </h2>
                <p className="text-zinc-400 mb-4 leading-relaxed font-sans">
                  {terms.services.content}
                </p>
                <ul className="space-y-3 text-zinc-400 list-disc list-inside mb-4 font-sans">
                  {terms.services.list.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {terms.services.note}
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {terms.intellectualProperty.title}
                </h2>
                <p className="text-zinc-400 mb-4 leading-relaxed font-sans">
                  {terms.intellectualProperty.content}
                </p>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {terms.intellectualProperty.usage}
                </p>
              </div>
            </section>

            {/* Liability */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {terms.liability.title}
                </h2>
                <p className="text-zinc-400 mb-4 leading-relaxed font-sans">
                  {terms.liability.content}
                </p>
                <p className="text-zinc-400 mb-4 leading-relaxed font-sans">
                  {terms.liability.disclaimer}
                </p>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {terms.liability.accuracy}
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {terms.governingLaw.title}
                </h2>
                <p className="text-zinc-400 mb-4 leading-relaxed font-sans">
                  {terms.governingLaw.content}
                </p>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {terms.governingLaw.jurisdiction}
                </p>
              </div>
            </section>

            {/* Changes */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {terms.changes.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {terms.changes.content}
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {terms.contact.title}
                </h2>
                <p className="text-zinc-400 mb-4 leading-relaxed font-sans">
                  {terms.contact.content}
                </p>
                <div className="space-y-2 text-zinc-400 font-mono">
                  <p className="font-semibold text-white">{terms.contact.company}</p>
                  <p>{terms.contact.address}</p>
                </div>
                <a
                  href={`mailto:${terms.contact.email}`}
                  className="text-primary hover:text-primary-cyan transition-colors font-mono mt-4 inline-block"
                >
                  {terms.contact.email}
                </a>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </main>
    </I18nProvider>
  )
}

