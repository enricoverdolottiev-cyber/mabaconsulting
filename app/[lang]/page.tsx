import { Locale } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeatureGrid from '@/components/FeatureGrid'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import TeamSection from '@/components/TeamSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { I18nProvider } from '@/contexts/I18nContext'

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params

  return (
    <I18nProvider initialLocale={lang}>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <AboutSection />
        <FeatureGrid />
        <ServicesSection />
        <TeamSection />
        <ContactSection />
        <Footer />
      </main>
    </I18nProvider>
  )
}

