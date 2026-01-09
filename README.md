# MaBaconsulting Website

Sito istituzionale per consulenza specialistica nel settore **Aerospazio e Difesa**.

## 📋 Descrizione

MaBaconsulting è una piattaforma web moderna e professionale che presenta i servizi di consulenza specializzata nel settore Aerospazio e Difesa. Il sito offre un'esperienza utente fluida con supporto multilingue (Italiano e Inglese) e un design moderno caratterizzato da effetti glassmorphism e animazioni eleganti.

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Linguaggio:** TypeScript
- **Styling:** Tailwind CSS
- **Animazioni:** Framer Motion
- **Icons:** Lucide React
- **Font:** Google Fonts (Space Grotesk, Roboto Mono)

## 📁 Struttura del Progetto

```
mabaconsulting1/
├── app/
│   ├── [lang]/              # Route dinamiche per lingue (it, en)
│   │   ├── layout.tsx       # Layout con generateMetadata, hreflang, Open Graph, JSON-LD
│   │   ├── page.tsx         # Homepage principale
│   │   ├── services/
│   │   │   └── [id]/
│   │   │       └── page.tsx # Pagine dettaglio servizi
│   │   └── team/
│   │       └── [slug]/
│   │           └── page.tsx # Pagine dettaglio team
│   ├── globals.css          # Stili globali, Tailwind, overflow-x-hidden
│   ├── layout.tsx           # Root layout con metadata base
│   ├── page.tsx             # Redirect alla lingua di default
│   ├── sitemap.ts           # Sitemap dinamica con hreflang
│   └── robots.ts            # Robots.txt dinamico
├── components/
│   ├── Navbar.tsx           # Barra navigazione responsive, grid layout
│   ├── Hero.tsx             # Hero section con typography scaling responsive
│   ├── AboutSection.tsx     # Sezione "Chi Siamo" (#about)
│   ├── ServicesSection.tsx  # Sezione "Servizi" (#services) - cards centrate
│   ├── TeamSection.tsx      # Sezione "Team" (#team) - cards centrate
│   ├── ContactSection.tsx   # Sezione "Contatti" (#contact) - email protette
│   ├── FeatureCard.tsx      # Componente card riutilizzabile (deprecated)
│   ├── FeatureGrid.tsx      # SVG flowchart responsive "Metodo Ad Hoc"
│   ├── StatsSection.tsx     # Statistiche animate da dizionari i18n
│   ├── Footer.tsx           # Footer con link smooth scroll
│   ├── Logo.tsx             # Logo con bandiera italiana
│   ├── LanguageSwitcher.tsx # Selettore lingua
│   └── HtmlLangSetter.tsx   # Componente per lang dinamico HTML
├── contexts/
│   └── I18nContext.tsx      # Context per internazionalizzazione
├── dictionaries/
│   ├── it.json              # Traduzioni italiano (con SEO e stats)
│   └── en.json              # Traduzioni inglese (con SEO e stats)
├── lib/
│   └── i18n.ts              # Utility per gestione i18n
├── tailwind.config.ts       # Configurazione Tailwind CSS
├── next.config.js           # Configurazione Next.js
├── tsconfig.json            # Configurazione TypeScript
└── package.json             # Dipendenze e script del progetto
```

## 🎯 Sezioni del Sito

- **Home**: Hero section con call-to-action
- **Chi Siamo** (`#about`): Presentazione aziendale e statistiche
- **Servizi** (`#services`): Descrizione dei servizi offerti
- **Team** (`#team`): Presentazione del team
- **Contatti** (`#contact`): Informazioni di contatto

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installato
- npm, yarn o pnpm come package manager

### Installazione

1. Clona il repository:
```bash
git clone <repository-url>
cd mabaconsulting1
```

2. Installa le dipendenze:
```bash
npm install
# oppure
yarn install
# oppure
pnpm install
```

3. Avvia il server di sviluppo:
```bash
npm run dev
# oppure
yarn dev
# oppure
pnpm dev
```

4. Apri [http://localhost:3000](http://localhost:3000) nel browser.

## 📦 Build per Produzione

```bash
npm run build
npm start
```

## 🌍 Internazionalizzazione

Il sito supporta due lingue:
- **Italiano (it)** - Lingua di default
- **Inglese (en)** - Lingua secondaria

Le traduzioni sono gestite tramite file JSON in `dictionaries/`. Il language switcher è disponibile nella navbar.

## 🔗 Link e Navigazione

Tutti i link di navigazione utilizzano anchor links per lo scroll fluido:
- `#about` - Sezione Chi Siamo
- `#services` - Sezione Servizi
- `#team` - Sezione Team
- `#contact` - Sezione Contatti

## 🔍 SEO & Metadata

Il sito include un'ottimizzazione SEO completa:
- **Dynamic Metadata**: Title e description dinamici per ogni lingua tramite `generateMetadata`
- **Hreflang & Alternates**: Relazioni corrette tra `/it` e `/en` per Google
- **Open Graph & Twitter Cards**: Metadata social media configurati
- **Sitemap Dinamica**: `app/sitemap.ts` genera automaticamente la sitemap con tutte le pagine
- **Robots.txt**: `app/robots.ts` configura le regole di crawling
- **JSON-LD Structured Data**: Schema.org ProfessionalService per migliorare il posizionamento
- **HTML Lang Dinamico**: Tag `<html lang>` aggiornato dinamicamente per ogni lingua

### Variabili d'Ambiente

Per la produzione, configura:
```env
NEXT_PUBLIC_SITE_URL=https://mabaconsulting.com
```

## 📱 Responsive Design

Il sito è completamente responsive e ottimizzato per:
- **Mobile** (320px+): Layout verticale, padding `px-4`, typography scalabile
- **Tablet** (640px+): Grid 2 colonne, padding `px-6`
- **Desktop** (1024px+): Layout completo, padding `px-8`
- **Wide Screen** (1280px+): Contenuto centrato con max-width

**Caratteristiche:**
- Nessun scroll orizzontale indesiderato (`overflow-x-hidden`)
- SVG FeatureGrid con scroll controllato su mobile
- Typography scaling da `text-4xl` a `text-8xl`
- Navbar responsive con menu hamburger su mobile
- Touch targets ottimizzati (min 44px)

## 🔒 Sicurezza

- **Email Protection**: Indirizzi email protetti con HTML entities (visibili agli utenti, difficili da scansionare per bot)
- **No Console Logs**: Codice pulito senza log di debug in produzione
- **Type Safety**: TypeScript strict mode attivo

## 📝 Note per il Deployment

Il progetto è configurato per essere deployato su **Vercel** con supporto completo per:
- Static Site Generation (SSG)
- Server-Side Rendering (SSR)
- Incremental Static Regeneration (ISR)

**Sitemap e Robots:**
- Accessibili automaticamente su `/sitemap.xml` e `/robots.txt`

## 📄 Licenza

Proprietario: MaBaconsulting

---

**Sviluppato con** ❤️ **usando Next.js e TypeScript**
