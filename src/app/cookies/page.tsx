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
            self-hosted, so no third-party font request is made either. There is nothing to consent to,
            which is why you see no cookie banner.
          </p>

          <h2>If that changes</h2>
          <p>
            If analytics or marketing cookies are ever introduced, they will be set only after you give
            consent through a cookie control, rejecting them will be as easy as accepting them, and this
            page will list every cookie with its provider, purpose and duration.
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
