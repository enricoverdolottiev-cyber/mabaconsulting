import { Locale, getDictionary } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'en' }]
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

  return <>{children}</>
}

