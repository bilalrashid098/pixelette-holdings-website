import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, PageHero } from '@/components/ui';
import { SITE } from '@/content/site';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How cookies are used on the Pixelette Holdings website.',
  alternates: { canonical: '/cookies' },
};

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
          <h2>The short version</h2>
          <p>
            This website sets <strong>no analytics, marketing or tracking cookies</strong>. Fonts are
            self-hosted, so no third-party font request is made either, and the site&rsquo;s security
            policy does not allow third-party scripts to load. There is nothing to consent to, which is
            why you see no cookie banner.
          </p>

          <h2>Session storage, which is not a cookie</h2>
          <p>
            The startup partnership assessment keeps its answers in your browser&rsquo;s session
            storage under the key <code>ph-partnership-assessment</code>. That is not a cookie, it is
            not sent to us, and it is removed when the tab closes. It does not contain your name or
            email. The privacy-choices control uses local storage for the same reason: a preference
            that stays on your device.
          </p>

          <h2>Privacy choices</h2>
          <p>
            <strong>Privacy choices</strong>, in the footer of every page, lets you turn website
            analytics on or off in advance. No analytics are running today, so the setting has no
            effect yet; it is off unless you turn it on. Your choice is kept in your browser&rsquo;s
            local storage, not in a cookie, and is not sent to us. Clearing your browser&rsquo;s site
            data removes it.
          </p>

          <h2>If that changes</h2>
          <p>
            If analytics or marketing cookies are ever introduced, they will be set only after you give
            consent through Privacy choices, turning them off will be as easy as turning them on, and
            this page will list every cookie with its provider, purpose and duration.
          </p>

          <h2>Who we are</h2>
          <p>
            {SITE.legalName}, company number {SITE.companyNumber}, registered office{' '}
            {SITE.registeredOffice}. Questions about this policy:{' '}
            <Link href="/privacy">see our Privacy Notice</Link>.
          </p>
        </div>
      </Section>
    </>
  );
}
