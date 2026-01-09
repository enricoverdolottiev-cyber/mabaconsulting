import type { Metadata } from 'next'
import { Space_Grotesk, Roboto_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// Metadata di default - verranno sovrascritti dal layout [lang]
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
    'https://mabaconsulting.com'
  ),
  title: {
    default: 'MaBaconsulting | Consulenza Aerospazio e Difesa',
    template: '%s | MaBaconsulting',
  },
  description: 'Consulenza specialistica nel settore Aerospazio e Difesa. Servizi di ingegneria strategica, trasformazione digitale e sviluppo business per aziende del settore.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${spaceGrotesk.variable} ${robotoMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}

