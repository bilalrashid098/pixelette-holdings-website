import type { Metadata } from 'next';
import { Newsreader, Outfit, IBM_Plex_Mono } from 'next/font/google';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ScrollEffects } from '@/components/ScrollEffects';
import { SITE } from '@/content/site';
import './globals.css';

/**
 * Fonts are fetched at BUILD time and self-hosted in the output.
 *
 * This is a genuine advantage over the WordPress route: no runtime request to
 * a third-party font CDN, so no third-party data flow to disclose and no
 * render-blocking external fetch. `display: swap` protects against invisible
 * text while loading.
 *
 * The three faces are group property, taken from the pattern guide: Newsreader
 * for display, Outfit for body, IBM Plex Mono for eyebrows, figures and small
 * labels. Self-hosting means the strict CSP (font-src 'self') needs no change.
 * Do NOT add a Google Fonts <link>; it will be blocked.
 *
 * Display weight is 400, not the guide's stylesheet's 300. Appendix E records
 * the group moving to 400 because the light cut read as too fragile at desktop
 * sizes. If the weight ever moves again, it moves everywhere at once.
 */
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-newsreader',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Pixelette Holdings | HSE Venture Partnership',
    template: '%s | Pixelette Holdings',
  },
  description:
    'Pixelette Holdings validates, builds, launches and prepares selected technology ventures for enterprise growth. Founders fund 50% of the agreed professional fee in cash; we earn the remainder through capped, milestone-linked equity.',
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    siteName: SITE.name,
    url: SITE.url,
    title: 'Pixelette Holdings | HSE Venture Partnership',
    description:
      'Get your company built, launched and enterprise-ready, and keep control. Pixelette Holdings partners with founders through its Hybrid Sweat Equity model.',
    images: [{ url: '/media/og-image.png', width: 1200, height: 630, alt: 'Pixelette Holdings, Hybrid Sweat Equity' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixelette Holdings | HSE Venture Partnership',
    description:
      'Get your company built, launched and enterprise-ready, and keep control, through the Hybrid Sweat Equity model.',
    images: ['/media/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

/**
 * Organization structured data.
 *
 * Only what is verified at Companies House. No award, rating or credential
 * property that is not evidenced, schema is a claim surface like any other,
 * and the previous site pushed unverified claims straight into the index
 * through it.
 */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  description:
    'Pixelette Holdings is a UK venture-building group that builds, launches and prepares technology ventures for enterprise growth through its Hybrid Sweat Equity model, taking capped, milestone-earned equity rather than deploying cash.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '20 Wenlock Road',
    addressLocality: 'London',
    postalCode: 'N1 7GU',
    addressCountry: 'GB',
  },
  identifier: {
    '@type': 'PropertyValue',
    name: 'Companies House company number',
    value: SITE.companyNumber,
  },
  // Verified public profile only.
  sameAs: ['https://www.linkedin.com/company/pixelette-holdings/'],
  // The group's stated focus areas (entity clarity for AI / answer engines).
  knowsAbout: [
    'Artificial intelligence',
    'FinTech',
    'HealthTech',
    'Blockchain',
    'RegTech',
    'Enterprise SaaS',
    'Digital identity',
    'Venture building',
  ],
  areaServed: ['United Kingdom', 'United States', 'European Union', 'Middle East'],
  // The group architecture, machine-readable, ties the sites together so an
  // engine understands Technologies/Marketing/Certified as one group.
  subOrganization: [
    { '@type': 'Organization', name: 'Pixelette Technologies Ltd', url: 'https://pixelettetech.com/' },
    { '@type': 'Organization', name: 'Pixelette Marketing', url: 'https://pixelettemarketing.com/' },
    { '@type': 'Organization', name: 'Pixelette Certified', url: 'https://pixelettecertified.com/' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.lang} className={`${newsreader.variable} ${outfit.variable} ${plexMono.variable}`}>
      <body>
        <SiteHeader />
        <main id="top">{children}</main>
        <SiteFooter />
        <ScrollEffects />
        <script
          type="application/ld+json"
          // Static, author-controlled JSON. No user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
