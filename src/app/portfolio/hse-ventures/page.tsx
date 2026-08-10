import type { Metadata } from 'next';
import {
  Section, SectionHead, PageHero, CardGrid, VentureCard, ConversionClose,
} from '@/components/ui';
import { byRelationship, publishableCount } from '@/content/ventures';

export const metadata: Metadata = {
  title: 'Direct HSE Ventures',
  description:
    'Ventures selected for the Pixelette HSE portfolio, each listed with its classification first and its outstanding evidence stated rather than hidden.',
  alternates: { canonical: '/portfolio/hse-ventures' },
};

export default function HseVenturesPage() {
  const hse = byRelationship('direct-hse-venture');
  const described = hse.filter((v) => v.oneLine);
  const held = hse.filter((v) => !v.oneLine);
  const count = publishableCount();

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Portfolio', href: '/portfolio' },
          { label: 'Direct HSE Ventures' },
        ]}
        eyebrow="Direct HSE ventures"
        title="Ventures selected for the HSE portfolio."
        lead="Selection means Pixelette judged the venture worth executing against. It does not mean a completed product, a commercial outcome or a guaranteed return."
        small
      />

      <Section>
        <SectionHead
          eyebrow="Described"
          title={
            count === null
              ? 'Ventures with an approved description.'
              : `All ${count} ventures carry an approved description.`
          }
          lead="Each card leads with its classification, then the approved one-line description and any wording restriction that applies to it."
        />
        <CardGrid>
          {described.map((v) => (
            <VentureCard key={v.slug} venture={v} />
          ))}
        </CardGrid>
      </Section>

      {held.length > 0 ? (
        <Section surface="ice">
          <SectionHead
            eyebrow="Description held"
            title="Named, but not yet described."
            lead="These ventures are in the portfolio. Their public descriptions are not written yet, so the cards say so. An invented description would be a fabricated claim, and a card that looks finished is not worth more than one that is honest."
          />
          <CardGrid>
            {held.map((v) => (
              <VentureCard key={v.slug} venture={v} />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      <ConversionClose />
    </>
  );
}
