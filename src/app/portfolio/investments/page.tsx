import type { Metadata } from 'next';
import {
  Section, PageHero, CardGrid, VentureCard,
  Qualifier, ConversionClose,
} from '@/components/ui';
import { byRelationship } from '@/content/ventures';

export const metadata: Metadata = {
  title: 'Equity Investments',
  description:
    'Where Pixelette Holdings holds a founder-confirmed equity interest, with the documentary and legal checks that remain outstanding stated openly.',
  alternates: { canonical: '/portfolio/investments' },
};

export default function InvestmentsPage() {
  const investments = byRelationship('equity-investment');

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Portfolio', href: '/portfolio' },
          { label: 'Equity Investments' },
        ]}
        eyebrow="Equity investments"
        title="Where Pixelette holds an interest."
        lead="Equity interests held by Pixelette Holdings, shown for what they are: an investment position, not control of the organisation."
        small
      />

      <Section>
        <CardGrid>
          {investments.map((v) => (
            <VentureCard key={v.slug} venture={v} />
          ))}
        </CardGrid>

        <Qualifier>
          Pixelette Holdings holds a minority equity interest only. Nothing on this page implies
          control of the investee, ownership of the wider organisation, or endorsement of Pixelette by
          it.
        </Qualifier>
      </Section>

      <ConversionClose
        title="Building something we should hold an interest in?"
        lead="The HSE Fit Assessment is the route into the portfolio. It is a commercial qualification, not a pitch competition."
      />
    </>
  );
}
