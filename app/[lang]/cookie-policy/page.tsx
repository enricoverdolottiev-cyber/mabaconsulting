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
    title: `${dictionary.cookies.title} | ${dictionary.seo.siteName}`,
    description: dictionary.cookies.introduction,
    alternates: {
      canonical: `${baseUrl}/${lang}/cookie-policy`,
      languages: {
        'it': `${baseUrl}/it/cookie-policy`,
        'en': `${baseUrl}/en/cookie-policy`,
      },
    },
  }
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params

  if (!['it', 'en'].includes(lang)) {
    notFound()
  }

  const dictionary = getDictionary(lang)
  const cookies = dictionary.cookies

  return (
    <I18nProvider initialLocale={lang}>
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            {/* Title */}
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tighter font-sans">
                <span className="gradient-text">{cookies.title}</span>
              </h1>
              <p className="text-sm text-text-secondary font-mono">
                {cookies.lastUpdated} {new Date().toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg text-zinc-400 leading-relaxed font-sans">
                {cookies.introduction}
              </p>
            </div>

            {/* What are Cookies */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {cookies.whatAreCookies.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {cookies.whatAreCookies.content}
                </p>
              </div>
            </section>

            {/* Types of Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                {cookies.types.title}
              </h2>
              
              <div className="space-y-6">
                {/* Technical Cookies */}
                <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-4 font-sans">
                    {cookies.types.technical.title}
                  </h3>
                  <p className="text-zinc-400 mb-4 leading-relaxed font-sans">
                    {cookies.types.technical.content}
                  </p>
                  <ul className="space-y-2 text-zinc-400 list-disc list-inside mb-4 font-sans">
                    {cookies.types.technical.list.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-zinc-400 leading-relaxed font-sans">
                    {cookies.types.technical.note}
                  </p>
                </div>

                {/* Analytical Cookies */}
                <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-4 font-sans">
                    {cookies.types.analytical.title}
                  </h3>
                  <p className="text-zinc-400 mb-4 leading-relaxed font-sans">
                    {cookies.types.analytical.content}
                  </p>
                  <ul className="space-y-2 text-zinc-400 list-disc list-inside mb-4 font-sans">
                    {cookies.types.analytical.list.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-zinc-400 leading-relaxed font-sans">
                    {cookies.types.analytical.note}
                  </p>
                </div>

                {/* Profiling Cookies */}
                <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-4 font-sans">
                    {cookies.types.profiling.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed font-sans">
                    {cookies.types.profiling.content}
                  </p>
                </div>
              </div>
            </section>

            {/* Consent Management */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {cookies.consent.title}
                </h2>
                <p className="text-zinc-400 mb-4 leading-relaxed font-sans">
                  {cookies.consent.content}
                </p>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {cookies.consent.withdraw}
                </p>
              </div>
            </section>

            {/* How to Disable Cookies */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {cookies.disable.title}
                </h2>
                <p className="text-zinc-400 mb-6 leading-relaxed font-sans">
                  {cookies.disable.content}
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 font-sans">
                    {cookies.disable.browsers.title}
                  </h3>
                  <ul className="space-y-2 text-zinc-400 font-mono">
                    <li>• {cookies.disable.browsers.chrome}</li>
                    <li>• {cookies.disable.browsers.firefox}</li>
                    <li>• {cookies.disable.browsers.safari}</li>
                    <li>• {cookies.disable.browsers.edge}</li>
                  </ul>
                  <p className="text-zinc-400 mt-4 text-sm leading-relaxed font-sans">
                    {cookies.disable.browsers.note}
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {cookies.thirdParty.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {cookies.thirdParty.content}
                </p>
              </div>
            </section>

            {/* Updates */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {cookies.updates.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {cookies.updates.content}
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 font-sans">
                  {cookies.contact.title}
                </h2>
                <p className="text-zinc-400 mb-4 leading-relaxed font-sans">
                  {cookies.contact.content}
                </p>
                <div className="space-y-2 text-zinc-400 font-mono">
                  <p className="font-semibold text-white">{cookies.contact.company}</p>
                </div>
                <a
                  href={`mailto:${cookies.contact.email}`}
                  className="text-primary hover:text-primary-cyan transition-colors font-mono mt-4 inline-block"
                >
                  {cookies.contact.email}
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

