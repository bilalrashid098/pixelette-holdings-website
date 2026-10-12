import Link from 'next/link';
import { Section, PageHero } from '@/components/ui';
import { SITE, CONTACT } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Cookie Policy',
  description:
    'How cookies and similar technologies are used on the Pixelette Holdings website.',
  path: '/cookies',
});

/**
 * Structured to match the Pixelette Marketing cookie policy, rewritten for this
 * site: no analytics or advertising cookies today; browser storage only for the
 * partnership assessment and Privacy choices. Contact via CONTACT.email only.
 */
const UPDATED = '12 October 2026';

export default function CookiesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Cookie Policy' }]}
        eyebrow="Legal"
        title="Cookie policy"
      />

      <Section>
        <div style={{ maxWidth: 860 }} className="prose">
          <p className="lead" style={{ marginBottom: 32 }}>
            Last updated: {UPDATED}
          </p>

          <p>
            This page explains how {SITE.legalName} uses cookies and similar technologies on{' '}
            {SITE.url.replace(/^https?:\/\//, '')}.
          </p>

          <h2>What cookies are</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help
            sites work and give site owners information about how the site is used. Similar
            technologies include local storage and session storage, which keep information in your
            browser rather than as a cookie.
          </p>

          <h2>The cookies we use</h2>
          <p>
            This website sets <strong>no analytics, marketing, advertising or tracking cookies</strong>.
            Fonts are self-hosted, so no third-party font request is made either, and the site&apos;s
            security policy does not allow third-party scripts to load. There is nothing non-essential
            to consent to today, which is why you see no cookie banner.
          </p>
          <p>We do use limited browser storage that is not a cookie:</p>
          <ul className="list">
            <li>
              <code>ph-partnership-assessment</code> (session storage): holds startup partnership
              assessment answers so they can be shown again on the enquiry or contact page. It does
              not contain your name or email, is not sent to us, and is removed when the tab closes.
            </li>
            <li>
              <code>ph-analytics</code> (local storage): holds your Privacy choices preference for
              website analytics (<code>on</code> or <code>off</code>). It contains no identifier and
              is never sent to us. Clearing your browser&apos;s site data removes it.
            </li>
          </ul>
          <p>
            We do not use advertising or profiling cookies. If analytics cookies are ever introduced,
            they will be set only after you accept them through Privacy choices, and this page will
            list every cookie with its provider, purpose and duration.
          </p>

          <h2>Your choice and how to change it</h2>
          <p>
            <strong>Privacy choices</strong>, in the footer of every page, lets you turn website
            analytics on or off in advance. No analytics are running today, so the setting has no
            effect yet; it is off unless you turn it on. Switching it later will also be how consent
            is given or withdrawn if privacy-preserving analytics is introduced.
          </p>
          <p>
            For more on how personal information is handled on this site, see our{' '}
            <Link className="link" href="/privacy">
              Privacy notice
            </Link>
            .
          </p>

          <h2>More information</h2>
          <p>
            For your rights under UK data protection law, see the{' '}
            <a href="https://ico.org.uk/for-the-public/online/cookies/" rel="noopener noreferrer" target="_blank">
              ICO guidance on cookies
            </a>
            . Questions about this policy:{' '}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>

          <h2>Who we are</h2>
          <p>
            {SITE.legalName}, company number {SITE.companyNumber}, registered office{' '}
            {SITE.registeredOffice}.
          </p>
        </div>
      </Section>
    </>
  );
}
