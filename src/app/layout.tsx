import type { Metadata } from 'next';
import { Newsreader, Outfit, IBM_Plex_Mono } from 'next/font/google';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ScrollReveal } from '@/components/ScrollReveal';
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
 * Display weight is 500. The guide's stylesheet says 300; Appendix E records
 * the group moving to 400 during the first conversion because the light cut
 * read as too fragile at desktop sizes. This site moved again, to 500, on the
 * user's by-eye call after seeing it rendered: at 42px the 400 cut of a serif
 * read as washed out beside the brand marks it sits above.
 *
 * It moved EVERYWHERE at once, which is the rule — .h1, .h1p, .h2, .h3, the
 * prose heading, the validation-route lead-in and the orbit core. Leaving one
 * behind is how an interior page ends up with a heading lighter than the
 * subheadings underneath it.
 *
 * This is now a GROUP-LEVEL divergence. It needs carrying to Appendix E and to
 * the guide's author exactly as the 300 -> 400 move was. Until it is, Holdings
 * and Certified render the same class at different weights.
 */
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['500'],
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
        {/*
          Scroll reveal, whole mechanism. FIRST in the body so it runs during
          parse, before anything paints — otherwise the page renders visible and
          then blinks out as the attribute lands.

          IT DOES NOT DEPEND ON REACT, and that is deliberate. The first version
          set the attribute here and left the observing to a hydrated component;
          measured in Chrome, hydration on the five legal routes lost the race
          with the failsafe, so the reveal quietly did nothing. A visitor on a
          slow connection would have hit the same thing in production. The
          observer therefore starts at DOMContentLoaded and owes React nothing.
          ScrollReveal only re-scans after a client-side navigation, through the
          window.__revealScan hook exposed here.

          It is the ONLY thing that sets data-reveal, and only when the browser
          can observe intersections and the visitor has not asked for reduced
          motion. No script, no attribute, nothing hidden: the page is simply
          static. That is the correct failure direction, and the one the deleted
          ScrollEffects got wrong — see globals.css and commit 58cb09c.

          Both the catch and the 3s timer exist to remove the attribute if the
          scan never completes. Better a static page than a blank one.

          Inline is permitted here: the CSP sets script-src 'self'
          'unsafe-inline'. Do not move this to an external file — a fetched
          script cannot beat first paint, which is the whole reason it exists.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{" +
              "if(!('IntersectionObserver' in window))return;" +
              "if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;" +
              "var G='.card-grid, .tile-grid, .tile-strip, .tstm-grid, .two-col, .charter, .steps';" +
              "var I='.section-head, .prose';var MAX=7;var done=false;" +
              "var e=document.documentElement;e.setAttribute('data-reveal','on');" +
              "var io=new IntersectionObserver(function(es){es.forEach(function(en){" +
              "if(!en.isIntersecting)return;en.target.classList.add('is-revealed');io.unobserve(en.target);" +
              "});},{threshold:0,rootMargin:'0px 0px -12% 0px'});" +
              "function scan(){var g=document.querySelectorAll(G),i,j,k;" +
              "for(i=0;i<g.length;i++){var c=g[i].children;" +
              "for(j=0;j<c.length;j++)c[j].style.setProperty('--reveal-i',String(j<MAX?j:MAX));" +
              "io.observe(g[i]);}" +
              "var t=document.querySelectorAll(I);for(k=0;k<t.length;k++)io.observe(t[k]);done=true;}" +
              "window.__revealScan=scan;" +
              "if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scan);else scan();" +
              "setTimeout(function(){if(!done)e.removeAttribute('data-reveal');},3000);" +
              "}catch(_){try{document.documentElement.removeAttribute('data-reveal');}catch(__){}}})();",
          }}
        />
        {/* First focusable element on every route, so a keyboard or screen-reader
            visitor can bypass the header nav rather than tabbing it on all 26 pages.
            A plain <a>, not next/link: this is a same-page fragment, not a route. */}
        <a className="skip-to-content" href="#top">Skip to content</a>
        <ScrollReveal />
        <SiteHeader />
        <main id="top">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // Static, author-controlled JSON. No user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
