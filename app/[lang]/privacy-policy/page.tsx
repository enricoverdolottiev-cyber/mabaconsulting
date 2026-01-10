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
    title: `${dictionary.privacy.title} | ${dictionary.seo.siteName}`,
    description: dictionary.privacy.introduction,
    alternates: {
      canonical: `${baseUrl}/${lang}/privacy-policy`,
      languages: {
        'it': `${baseUrl}/it/privacy-policy`,
        'en': `${baseUrl}/en/privacy-policy`,
      },
    },
  }
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params

  if (!['it', 'en'].includes(lang)) {
    notFound()
  }

  const dictionary = getDictionary(lang)
  const privacy = dictionary.privacy

  return (
    <I18nProvider initialLocale={lang}>
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            {/* Title */}
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tighter font-sans">
                <span className="gradient-text">{privacy.title}</span>
              </h1>
              <p className="text-sm text-text-secondary font-mono">
                {privacy.lastUpdated} {new Date().toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg text-zinc-400 leading-relaxed font-sans">
                {privacy.introduction}
              </p>
            </div>

            {/* Data Controller */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {privacy.controller.title}
                </h2>
                <p className="text-zinc-400 mb-4 leading-relaxed font-sans">
                  {privacy.controller.content}
                </p>
                <div className="space-y-2 text-zinc-400 font-mono">
                  <p className="font-semibold text-white">{privacy.controller.company}</p>
                  <p>{privacy.controller.address}</p>
                  <p>{privacy.controller.vat}</p>
                  <p>{privacy.controller.registry}</p>
                </div>
                <p className="text-zinc-400 mt-6 leading-relaxed font-sans">
                  {privacy.controller.contact}
                </p>
                <a
                  href={`mailto:${privacy.controller.email}`}
                  className="text-primary hover:text-primary-cyan transition-colors font-mono"
                >
                  {privacy.controller.email}
                </a>
              </div>
            </section>

            {/* Data Types */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                {privacy.dataTypes.title}
              </h2>
              
              <div className="space-y-6">
                <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-3 font-sans">
                    {privacy.dataTypes.navigation.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed font-sans">
                    {privacy.dataTypes.navigation.content}
                  </p>
                </div>

                <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-3 font-sans">
                    {privacy.dataTypes.contact.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed font-sans">
                    {privacy.dataTypes.contact.content}
                  </p>
                </div>
              </div>
            </section>

            {/* Purpose */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                {privacy.purpose.title}
              </h2>
              
              <div className="space-y-6">
                <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-3 font-sans">
                    {privacy.purpose.response.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed font-sans">
                    {privacy.purpose.response.content}
                  </p>
                </div>

                <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-3 font-sans">
                    {privacy.purpose.legal.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed font-sans">
                    {privacy.purpose.legal.content}
                  </p>
                </div>

                <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-3 font-sans">
                    {privacy.purpose.navigation.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed font-sans">
                    {privacy.purpose.navigation.content}
                  </p>
                </div>
              </div>
            </section>

            {/* Legal Basis */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {privacy.legalBasis.title}
                </h2>
                <p className="text-zinc-400 mb-4 leading-relaxed font-sans">
                  {privacy.legalBasis.content}
                </p>
                <ul className="space-y-3 text-zinc-400 list-disc list-inside font-sans">
                  <li>{privacy.legalBasis.consent}</li>
                  <li>{privacy.legalBasis.legitimate}</li>
                  <li>{privacy.legalBasis.legal}</li>
                </ul>
              </div>
            </section>

            {/* Retention */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {privacy.retention.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {privacy.retention.content}
                </p>
              </div>
            </section>

            {/* Rights */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {privacy.rights.title}
                </h2>
                <p className="text-zinc-400 mb-4 leading-relaxed font-sans">
                  {privacy.rights.content}
                </p>
                <ul className="space-y-3 text-zinc-400 list-disc list-inside mb-6 font-sans">
                  <li>{privacy.rights.access}</li>
                  <li>{privacy.rights.rectification}</li>
                  <li>{privacy.rights.erasure}</li>
                  <li>{privacy.rights.restriction}</li>
                  <li>{privacy.rights.portability}</li>
                  <li>{privacy.rights.objection}</li>
                  <li>{privacy.rights.withdraw}</li>
                  <li>{privacy.rights.complaint}</li>
                </ul>
                <p className="text-zinc-400 mb-2 leading-relaxed font-sans">
                  {privacy.rights.contact}
                </p>
                <a
                  href={`mailto:${privacy.controller.email}`}
                  className="text-primary hover:text-primary-cyan transition-colors font-mono"
                >
                  {privacy.controller.email}
                </a>
              </div>
            </section>

            {/* Security */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {privacy.security.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {privacy.security.content}
                </p>
              </div>
            </section>

            {/* Changes */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {privacy.changes.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {privacy.changes.content}
                </p>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </main>
    </I18nProvider>
  )
}

