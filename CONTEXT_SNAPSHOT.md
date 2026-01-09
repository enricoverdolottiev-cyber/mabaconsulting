# Context Snapshot - MaBaconsulting Website

**Generated:** 2024 (Last Updated: 2024)  
**Purpose:** Technical and structural documentation for LLM handoff and development continuity  
**Status:** Production-ready with full SEO, responsive design, and security optimizations

---

## 1. Project Overview & Stack

### Project Identity
- **Name:** MaBaconsulting (mabaconsulting)
- **Version:** 0.1.0
- **Purpose:** Corporate website for specialized consulting in Aerospace & Defense sector
- **Type:** Marketing/Institutional website with multilingual support

### Technology Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Next.js | 14.2.0 | React framework with App Router |
| **Language** | TypeScript | 5.3.3 | Type-safe JavaScript |
| **UI Library** | React | 18.3.0 | Component library |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| **Animations** | Framer Motion | 11.0.0 | Animation library |
| **Icons** | Lucide React | 0.344.0 | Icon component library |
| **Fonts** | Google Fonts | - | Space Grotesk (primary), Roboto Mono (mono) |
| **Build Tool** | Next.js Built-in | - | Webpack/Turbopack |
| **Package Manager** | npm | - | Dependency management |

### Configuration Files

| File | Purpose | Key Settings |
|------|---------|--------------|
| `package.json` | Dependencies & scripts | Next.js 14, React 18, Framer Motion, Lucide |
| `next.config.js` | Next.js configuration | `reactStrictMode: true` |
| `tsconfig.json` | TypeScript config | Path aliases `@/*`, strict mode enabled |
| `tailwind.config.ts` | Tailwind customization | Custom colors (primary, background, text), fonts, shadows |
| `postcss.config.js` | PostCSS processing | Autoprefixer integration |

### Key Dependencies

**Production:**
- `next@^14.2.0` - Core framework
- `react@^18.3.0` & `react-dom@^18.3.0` - UI library
- `framer-motion@^11.0.0` - Animations
- `lucide-react@^0.344.0` - Icons

**Development:**
- `typescript@^5.3.3` - Type checking
- `tailwindcss@^3.4.1` - Styling
- `@types/*` - Type definitions

---

## 2. Directory Structure & Architecture

### Directory Tree

```
mabaconsulting1/
├── app/                          # Next.js App Router
│   ├── [lang]/                   # Dynamic route for locales (it, en)
│   │   ├── layout.tsx            # Language-specific layout with generateMetadata, hreflang, Open Graph, JSON-LD
│   │   ├── page.tsx              # Main homepage (Server Component)
│   │   ├── services/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Service detail pages (dynamic routes)
│   │   └── team/
│   │       └── [slug]/
│   │           └── page.tsx      # Team member detail pages (dynamic routes)
│   ├── layout.tsx                # Root layout (fonts, metadataBase, HTML structure)
│   ├── page.tsx                  # Root redirect to /it
│   ├── globals.css               # Global styles, Tailwind directives, utilities, overflow-x-hidden
│   ├── sitemap.ts                # Dynamic sitemap generation with hreflang alternates
│   └── robots.ts                 # Dynamic robots.txt generation
│
├── components/                   # React components (Client Components)
│   ├── Navbar.tsx                # Fixed responsive navigation, grid layout, mobile menu
│   ├── Hero.tsx                  # Hero section with responsive typography scaling
│   ├── AboutSection.tsx          # About section (#about) - responsive
│   ├── ServicesSection.tsx       # Services grid (#services) - centered cards, responsive
│   ├── TeamSection.tsx           # Team members (#team) - centered cards, responsive
│   ├── ContactSection.tsx        # Contact info (#contact) - email protection, left-aligned
│   ├── FeatureGrid.tsx           # Interactive responsive SVG flowchart "Metodo Ad Hoc"
│   ├── FeatureCard.tsx           # Reusable feature card component (deprecated/unused)
│   ├── StatsSection.tsx          # Animated statistics counter (values from i18n dictionaries)
│   ├── Footer.tsx                # Footer with smooth scroll links, responsive
│   ├── Logo.tsx                  # Brand logo with Italian flag integration
│   ├── LanguageSwitcher.tsx      # Language dropdown selector
│   └── HtmlLangSetter.tsx        # Client component for dynamic HTML lang attribute
│
├── contexts/                     # React Context providers
│   └── I18nContext.tsx           # Internationalization context (Client Component)
│
├── dictionaries/                 # Translation files (JSON)
│   ├── it.json                   # Italian translations (with SEO keys, stats values)
│   └── en.json                   # English translations (with SEO keys, stats values)
│
├── lib/                          # Utility functions
│   └── i18n.ts                   # i18n helper functions (getDictionary, Locale types)
│
└── [config files]                # Configuration files (see above)
```

### Architecture Pattern

**Pattern:** **Component-Based Architecture with App Router (Next.js 14)**

- **Server Components by default** (`app/[lang]/page.tsx`)
- **Client Components** where needed (`'use client'` directive)
- **Context API** for client-side state (i18n)
- **File-based routing** via App Router
- **Static generation** with dynamic routes (`generateStaticParams`)

### Core Folders

| Folder | Purpose | Key Files |
|--------|---------|-----------|
| `app/` | Next.js App Router routes | `[lang]/page.tsx` (main entry), `layout.tsx` (root) |
| `components/` | Reusable UI components | All `*.tsx` files (Client Components) |
| `contexts/` | React Context providers | `I18nContext.tsx` |
| `dictionaries/` | i18n translation data | `it.json`, `en.json` |
| `lib/` | Utility functions | `i18n.ts` |

### Routing Strategy

- **Root (`/`)**: Redirects to `/it` (default locale)
- **Language routes (`/[lang]`)**: Dynamic route for `it` and `en`
- **Static generation**: Both locales pre-rendered at build time
- **Anchor navigation**: Smooth scroll to sections (`#about`, `#services`, `#team`, `#contact`)

---

## 3. Data Flow & State Management

### State Management Approach

**Primary Method:** React Context API (Client-Side)

- **Context:** `I18nContext` (`contexts/I18nContext.tsx`)
- **Provider:** `I18nProvider` wraps the entire app
- **Hook:** `useI18n()` for accessing locale and dictionary
- **Persistence:** `localStorage` for locale preference

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│  Server Component (app/[lang]/page.tsx)                 │
│  - Receives locale from URL params                     │
│  - Passes initialLocale to I18nProvider                │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  I18nProvider (Client Component)                       │
│  - Manages locale state                                 │
│  - Loads dictionary from lib/i18n.ts                    │
│  - Syncs with localStorage                             │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  Client Components (Navbar, Hero, etc.)                 │
│  - Use useI18n() hook                                  │
│  - Access dictionary.hero.title, etc.                  │
│  - Update locale via setLocale()                       │
└─────────────────────────────────────────────────────────┘
```

### Internationalization (i18n)

**Implementation:**
- **Type-safe:** `Locale` type (`'it' | 'en'`)
- **Dictionary loading:** `getDictionary(locale)` from `lib/i18n.ts`
- **Translation files:** JSON structure in `dictionaries/`
- **URL-based routing:** `/it` and `/en` routes
- **Client-side switching:** `setLocale()` triggers navigation to new route

**Dictionary Structure:**
```typescript
{
  nav: { services, aboutUs, team, contact },
  hero: { title, subtitle, ctaPrimary, ctaSecondary },
  features: { title, subtitle, managementConsulting, ... },
  about: { title, subtitle, description, stats },
  services: { title, subtitle, list: [{ id, title, shortDescription, content }], detail },
  team: { title, subtitle, mauro, livia },
  team_members: { [slug]: { bio_title, bio_content, cv_button_label, cv_file_path }, backToTeam },
  contact: { title, subtitle, form, info },
  contacts: { title, companyName, legalSeat, admin, marketing, ... },
  footer: { tagline, links, ... },
  metodo: { title, subtitle, cliente, step1, step2, step3, step4, step5 }, // For SVG flowchart
  stats: { title, subtitle, uptime: { value, suffix, label, description }, ... }, // Values now in i18n
  seo: { siteName, defaultTitle, defaultDescription, keywords } // SEO metadata
}
```

### External Data Sources

**None currently.** All content is:
- Static (hardcoded in components)
- Translated via JSON dictionaries
- No API calls, no database, no CMS

### Form Handling

**Contact Section:**
- **No form submission** implemented
- Displays contact info (email, location) with email protection (HTML entities)
- Email copy-to-clipboard functionality
- Email addresses fully visible but protected from bot scraping
- Layout: Left-aligned with icons, horizontal icon+text layout
- No backend integration

---

## 4. Feature Status

### ✅ Fully Implemented Features

| Feature | Component | Status | Notes |
|---------|-----------|--------|-------|
| **Multilingual Support** | `I18nContext`, `LanguageSwitcher` | ✅ Complete | Italian (default) & English |
| **Responsive Navigation** | `Navbar` | ✅ Complete | Desktop + mobile menu, scroll detection. Grid layout: logo left, menu centered, language switcher right |
| **Hero Section** | `Hero` | ✅ Complete | Animated background, particles, gradient text |
| **About Section** | `AboutSection` | ✅ Complete | Stats display (35+ years, 50+ projects, 100+ clients) |
| **Services Section** | `ServicesSection` | ✅ Complete | 5 service cards with icons, centered content, responsive grid (1x mobile, 2x tablet, 3x desktop) |
| **Team Section** | `TeamSection` | ✅ Complete | 2 team members (Mauro, Livia), centered cards, responsive grid (1x mobile, 2x desktop) |
| **Contact Section** | `ContactSection` | ✅ Complete | Email protection (HTML entities), left-aligned layout, copy functionality, responsive |
| **Feature Grid** | `FeatureGrid` | ✅ Complete | Interactive responsive SVG flowchart "Metodo Ad Hoc" with horizontal scroll on mobile, animated dashed arrows, 5 process boxes, client bar |
| **Stats Section** | `StatsSection` | ✅ Complete | Animated counters, values from i18n dictionaries (99.9%, 500+, 50+, 1000+), responsive grid |
| **Footer** | `Footer` | ✅ Complete | Simplified responsive layout: Brand column (2/3 width) + Company links with smooth scroll. Legal links ready for pages |
| **Smooth Scrolling** | `Navbar` | ✅ Complete | Anchor links with offset |
| **Active Section Detection** | `Navbar` | ✅ Complete | Intersection Observer API |
| **Animations** | All components | ✅ Complete | Framer Motion throughout |
| **Glassmorphism UI** | Global CSS | ✅ Complete | `.glass` utility class |
| **Gradient Text** | Global CSS | ✅ Complete | `.gradient-text` utility |

### ⚠️ Partially Implemented / Placeholder Features

| Feature | Component | Status | Notes |
|---------|-----------|--------|-------|
| **Contact Form** | `ContactSection` | ❌ Missing | Only displays info, no form submission |
| **Footer Legal Links** | `Footer` | ⚠️ Placeholder | Links to `/privacy-policy`, `/terms-of-service`, `/cookie-policy` ready but pages not created |
| **Dropdown Menus** | `Navbar` | ⚠️ Placeholder | Dropdown structure exists but no content |
| **SEO Verification Codes** | `app/[lang]/layout.tsx` | ⚠️ Placeholder | Verification section exists but codes commented out (Google, Yandex, Bing) |

### ❌ Missing Features (Not Implemented)

| Feature | Expected Location | Priority | Notes |
|---------|-------------------|----------|-------|
| **Contact Form Backend** | `ContactSection` | High | No form submission handler |
| **SEO Verification Codes** | `app/[lang]/layout.tsx` | Medium | Add Google Search Console, Yandex, Bing verification codes |
| **OG Images** | `public/` | Medium | Add `/og-image.jpg` (1200x630px) for Open Graph |
| **Logo Image** | `public/` | Medium | Add `/logo.png` for JSON-LD structured data |
| **Analytics** | Global | Low | No Google Analytics or similar |
| **Error Pages** | `app/` | Low | No custom 404/500 pages |
| **Loading States** | Global | Low | No loading.tsx files |
| **Privacy Policy** | `app/[lang]/privacy-policy` | Medium | Link in footer ready, page needed |
| **Terms of Service** | `app/[lang]/terms-of-service` | Medium | Link in footer ready, page needed |
| **Cookie Policy** | `app/[lang]/cookie-policy` | Medium | Link in footer ready, page needed |

### 🔧 Technical Debt / Known Issues

1. **Empty Dictionary Keys:** Some feature keys in dictionaries have empty strings (`innovationLabs`, `securityCompliance`)
2. **Type Safety:** Some dictionary access uses `as` assertions (e.g., `team_members as unknown as Record<string, any>`) - could be improved with better typing
3. **FeatureCard Component:** `FeatureCard.tsx` exists but is not currently used (FeatureGrid now uses SVG flowchart)
4. **Missing OG Images:** Need to add `/public/og-image.jpg` (1200x630px) and `/public/logo.png` for SEO
5. **No Error Boundaries:** No React error boundaries implemented
6. **No Loading States:** No loading.tsx or Suspense boundaries for async operations
7. **SEO Verification:** Verification codes in metadata are commented out (need to add real codes)
8. **Legal Pages:** Privacy Policy, Terms of Service, Cookie Policy links exist but pages not created

---

## 5. Coding Conventions & Style

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| **Components** | PascalCase | `Hero.tsx`, `Navbar.tsx` |
| **Files** | PascalCase for components | `FeatureCard.tsx` |
| **Functions** | camelCase | `getDictionary()`, `copyEmail()` |
| **Variables** | camelCase | `activeSection`, `mobileMenuOpen` |
| **Types/Interfaces** | PascalCase | `Locale`, `I18nContextType` |
| **Constants** | camelCase or UPPER_CASE | `defaultLocale`, `locales` |
| **CSS Classes** | Tailwind utilities | `text-white`, `bg-primary` |
| **Custom CSS Classes** | kebab-case | `.gradient-text`, `.glass` |

### Component Patterns

**1. Client Components Pattern:**
```typescript
'use client'
import { motion } from 'framer-motion'
import { useI18n } from '@/contexts/I18nContext'

export default function ComponentName() {
  const { dictionary } = useI18n()
  // Component logic
}
```

**2. Server Components Pattern:**
```typescript
import { Locale } from '@/lib/i18n'
import Component from '@/components/Component'

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  // Server-side logic
}
```

**3. Animation Pattern:**
- Consistent use of `framer-motion` for all animations
- `whileInView` for scroll-triggered animations
- `viewport={{ once: true }}` to prevent re-animation
- Staggered delays: `delay: index * 0.1`

### Styling Approach

**Tailwind CSS Utility-First:**
- No custom CSS files (except `globals.css` for utilities)
- Custom utilities: `.glass`, `.gradient-text`, `.gradient-border`
- Custom theme colors: `primary`, `primary-cyan`, `background`, `text-primary`, `text-secondary`
- Custom fonts: `font-sans` (Space Grotesk), `font-mono` (Roboto Mono)

**Design System:**
- **Colors:** Dark theme (black background `#000000`)
- **Primary:** Blue (`#0070FF`) to Cyan (`#00D9FF`) gradient
- **Text:** White primary, gray secondary (`#A1A1AA`)
- **Effects:** Glassmorphism (`bg-white/5`, `backdrop-blur-md`) applied to Navbar (on scroll) and Footer
- **Shadows:** Custom glow effects (`glow-blue`, `glow-cyan`, `glow-purple`)
- **Layout:** CSS Grid used for Navbar (3-column: logo left, menu center, switcher right) and Footer (3-column: brand 2/3, company 1/3)

### Code Organization

**Component Structure:**
1. Imports (external, then internal)
2. Type definitions (if any)
3. Component function
4. Hooks (useState, useEffect, etc.)
5. Event handlers
6. Render/return

**File Organization:**
- One component per file
- Co-located types with components (when simple)
- Shared types in separate files (when reused)

### Libraries & Patterns

| Library | Usage Pattern |
|---------|---------------|
| **Framer Motion** | `motion.div`, `motion.h1`, etc. for all animated elements |
| **Lucide React** | Icon components imported as React components |
| **Next.js App Router** | Server Components by default, `'use client'` when needed |
| **TypeScript** | Strict mode enabled, path aliases (`@/*`) |

---

## 6. Entry Points & Critical Files

### Must-Read Files for New Developers

| File | Purpose | Why Critical |
|------|---------|--------------|
| `app/[lang]/page.tsx` | Main homepage | Entry point, shows component composition |
| `app/[lang]/layout.tsx` | Language layout | Dynamic metadata, SEO, hreflang, JSON-LD |
| `app/layout.tsx` | Root layout | Fonts, metadataBase, HTML structure |
| `app/sitemap.ts` | Dynamic sitemap | SEO, all routes with alternates |
| `app/robots.ts` | Dynamic robots.txt | SEO, crawling rules |
| `contexts/I18nContext.tsx` | i18n provider | Understanding state management |
| `lib/i18n.ts` | i18n utilities | How translations work |
| `dictionaries/it.json` | Italian translations | Content structure with SEO keys and stats values |
| `dictionaries/en.json` | English translations | Content structure with SEO keys and stats values |
| `components/Navbar.tsx` | Navigation | Responsive, scroll detection, CSS Grid layout, mobile menu |
| `components/Logo.tsx` | Brand logo | Italian flag integration, geometric precision |
| `components/Hero.tsx` | Hero section | Responsive typography scaling, animation patterns |
| `components/FeatureGrid.tsx` | Interactive SVG flowchart | Responsive SVG, scroll controllato, geometric precision |
| `components/StatsSection.tsx` | Statistics | i18n-driven values, animated counters |
| `components/ContactSection.tsx` | Contact info | Email protection, left-aligned layout |
| `components/HtmlLangSetter.tsx` | HTML lang setter | Dynamic lang attribute for SEO |
| `app/globals.css` | Global styles | Custom utilities, overflow-x-hidden, design system |
| `tailwind.config.ts` | Tailwind config | Custom theme, colors, fonts |

### File Dependencies Map

```
app/layout.tsx
  └── app/globals.css
  └── Google Fonts (Space Grotesk, Roboto Mono)

app/[lang]/layout.tsx
  ├── app/globals.css
  ├── components/HtmlLangSetter.tsx
  ├── lib/i18n.ts
  │     └── dictionaries/*.json
  └── generateMetadata() function

app/[lang]/page.tsx
  ├── contexts/I18nContext.tsx
  │     └── lib/i18n.ts
  │           └── dictionaries/*.json
  ├── components/Navbar.tsx
  │     └── components/LanguageSwitcher.tsx
  │           └── contexts/I18nContext.tsx
  ├── components/Hero.tsx
  │     └── contexts/I18nContext.tsx
  ├── components/AboutSection.tsx
  │     └── contexts/I18nContext.tsx
  ├── components/FeatureGrid.tsx
  │     └── contexts/I18nContext.tsx (for metodo dictionary keys)
  ├── components/StatsSection.tsx
  │     └── contexts/I18nContext.tsx (stats values from dictionary)
  ├── components/ServicesSection.tsx
  │     └── contexts/I18nContext.tsx
  ├── components/TeamSection.tsx
  │     └── contexts/I18nContext.tsx
  ├── components/ContactSection.tsx
  │     └── contexts/I18nContext.tsx
  └── components/Footer.tsx
      └── contexts/I18nContext.tsx

app/sitemap.ts
  └── lib/i18n.ts (for locales and services)

app/robots.ts
  └── (standalone, uses env vars)
```

### Build & Development Workflow

**Development:**
```bash
npm run dev    # Starts Next.js dev server (localhost:3000)
```

**Build:**
```bash
npm run build  # Creates production build
npm start      # Starts production server
```

**Linting:**
```bash
npm run lint   # Runs ESLint (Next.js default)
```

### Deployment

**Target Platform:** Vercel (recommended)

**Configuration:**
- Framework: Next.js (auto-detected)
- Build Command: `npm run build`
- Output Directory: `.next`
- Static Generation: Enabled via `generateStaticParams`

**Environment Variables:** None required

---

## 7. Additional Technical Notes

### Performance Considerations

- **Static Generation:** Both locales (`it`, `en`) are pre-rendered at build time
- **Dynamic Routes:** Service and team detail pages generated via `generateStaticParams`
- **Client Components:** Used only where necessary (animations, interactivity)
- **Image Optimization:** Not currently used (no images in project, except planned OG image)
- **Font Optimization:** Google Fonts loaded via `next/font/google` (optimized, display: swap)
- **SVG Animations:** CSS animations (`@keyframes`) used for dashed arrow effects in FeatureGrid flowchart (lightweight, GPU-accelerated)
- **No Layout Shift:** Framer Motion animations configured to prevent CLS (Cumulative Layout Shift)
- **Overflow Prevention:** Global `overflow-x-hidden` prevents unwanted horizontal scrolling

### SEO Implementation

- **Metadata API:** Using Next.js 14 official Metadata API in `app/[lang]/layout.tsx`
- **Dynamic Metadata:** `generateMetadata` function loads title/description from dictionaries
- **Hreflang Tags:** Properly configured with `alternates.languages` for `/it` and `/en`
- **Canonical URLs:** Each language version has correct canonical URL
- **Open Graph:** Full OG tags with locale-specific data (it_IT, en_US)
- **Twitter Cards:** Summary large image cards configured
- **Structured Data:** JSON-LD ProfessionalService schema with company info
- **Sitemap:** Dynamic generation includes all routes with proper priorities and alternates
- **Robots:** Dynamic generation with sitemap reference and proper host
- **HTML Lang:** Dynamic `lang` attribute via `HtmlLangSetter` component

### Browser Support

- Modern browsers (ES2017+ target)
- CSS features: backdrop-filter, CSS Grid, Flexbox
- JavaScript: Intersection Observer API, Clipboard API

### Accessibility

- **Semantic HTML:** Proper use of `<section>`, `<nav>`, `<footer>`
- **ARIA Labels:** Limited (mobile menu button has `aria-label`)
- **Keyboard Navigation:** Basic support (not fully tested)
- **Color Contrast:** High contrast (white on black)

### Security

- **No user input:** No forms, no XSS risks
- **No authentication:** Public website
- **No API calls:** No external data fetching
- **Email Protection:** HTML entities encoding (`@` → `&#64;`, `.` → `&#46;`) makes scraping difficult while remaining user-friendly
- **No Console Logs:** Clean production code without debug statements
- **Type Safety:** TypeScript strict mode prevents many runtime errors
- **Dependencies:** Regularly updated via npm

---

## 8. Quick Reference

### Common Tasks

**Add a new language:**
1. Add locale to `lib/i18n.ts` (`Locale` type, `dictionaries` object)
2. Create `dictionaries/[locale].json`
3. Update `generateStaticParams()` in `app/[lang]/layout.tsx`
4. Add to `LanguageSwitcher` languages array

**Add a new section:**
1. Create component in `components/`
2. Add section ID (e.g., `id="newSection"`)
3. Import and add to `app/[lang]/page.tsx`
4. Add navigation item in `Navbar.tsx`
5. Add translations to dictionaries

**Modify FeatureGrid flowchart:**
1. Edit SVG structure in `components/FeatureGrid.tsx`
2. Update `dictionary.metodo.*` keys in `dictionaries/*.json` for text content
3. Adjust coordinates for geometric precision (viewBox: 0 0 1400 600)
4. Modify CSS animations in `<style>` tag within SVG `<defs>` for arrow effects
5. Mobile responsive: Container uses `overflow-x-auto` with `min-w-[800px]` for mobile scroll

**Modify styling:**
1. Use Tailwind utilities (preferred)
2. Add custom utility to `app/globals.css` if needed
3. Update `tailwind.config.ts` for theme changes

**Modify Navbar layout:**
1. Grid structure: `grid-cols-[1fr_auto_1fr]` for 3-column layout
2. Logo: `justify-self-start` (left column)
3. Menu: `justify-self-center` (center column)
4. Language switcher: `justify-self-end` (right column)

**Modify Footer structure:**
1. Current layout: 3-column grid (`lg:grid-cols-3`)
2. Brand column spans 2 columns (`lg:col-span-2`)
3. Company column spans 1 column
4. Company links: Smooth scroll to `#about` and `#contact`
5. Legal links: Ready for `/privacy-policy`, `/terms-of-service`, `/cookie-policy` pages

**Modify Contact Section:**
1. Email protection: Uses HTML entities encoding in `encodeEmailForDisplay()` function
2. Layout: Left-aligned with horizontal icon+text layout
3. Email visibility: Fully visible to users, protected from bots
4. Copy functionality: Clipboard API with visual feedback

**Update content:**
1. Edit `dictionaries/it.json` and `dictionaries/en.json`
2. No code changes needed (content is data-driven)
3. Stats values: Update `dictionary.stats.*.value` and `suffix` for statistics
4. SEO metadata: Update `dictionary.seo.*` for titles, descriptions, keywords

**Update SEO metadata:**
1. Edit `dictionary.seo` keys in `dictionaries/it.json` and `dictionaries/en.json`
2. Add verification codes in `app/[lang]/layout.tsx` (uncomment verification section)
3. Add images: `/public/og-image.jpg` (1200x630px) and `/public/logo.png`
4. Set environment variable: `NEXT_PUBLIC_SITE_URL=https://mabaconsulting.com`

**Modify responsive design:**
1. Global overflow: Checked in `app/globals.css` (html and body have overflow-x-hidden)
2. Padding uniform: All sections use `px-4 sm:px-6 lg:px-8` pattern
3. Typography scaling: Use `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` pattern
4. FeatureGrid SVG: Responsive container with horizontal scroll on mobile
5. ServicesSection: Centered cards with responsive grid (1x mobile, 2x tablet, 3x desktop)
6. TeamSection: Centered cards with responsive grid (1x mobile, 2x desktop)
7. ContactSection: Left-aligned layout with horizontal icon+text

---

**End of Context Snapshot**

