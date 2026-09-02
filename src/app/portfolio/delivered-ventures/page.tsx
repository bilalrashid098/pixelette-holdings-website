import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Section, PageHero, CardGrid, VentureCard, ConversionClose,
} from '@/components/ui';
import { byRelationship } from '@/content/ventures';

export const metadata: Metadata = {
  title: 'Delivered Ventures',
  description:
    'Companies and products for which a Pixelette capability delivered evidenced work, listed without implying equity, ownership or endorsement.',
  alternates: { canonical: '/portfolio/delivered-ventures' },
};

export default function DeliveredVenturesPage() {
  const delivered = byRelationship('delivered-venture');

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Portfolio', href: '/portfolio' },
          { label: 'Delivered Ventures' },
        ]}
        eyebrow="Delivered ventures"
        title="Work delivered. Not ownership claimed."
        lead="A delivered relationship means a Pixelette capability did evidenced work for the venture. It carries no equity claim, and it is not a client endorsement."
        small
      />

      <Section>
        {delivered.length > 0 ? (
          <CardGrid>
            {delivered.map((v) => (
              <VentureCard key={v.slug} venture={v} />
            ))}
          </CardGrid>
        ) : (
          <p className="lead">
            Where Pixelette delivers work for a venture without taking an equity position, it will be
            listed here. Our current portfolio is shown under{' '}
            <Link href="/portfolio/hse-ventures">Direct HSE Ventures</Link> and{' '}
            <Link href="/portfolio/investments">Equity Investments</Link>.
          </p>
        )}
      </Section>

      <ConversionClose />
    </>
  );
}
