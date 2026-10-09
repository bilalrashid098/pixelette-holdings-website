import type { Metadata } from 'next';
import { Section, SectionHead, PageHero, Buttons, Btn, CardGrid, VentureCard } from '@/components/ui';
import { ventures } from '@/content/ventures';
import { Testimonials } from '@/components/Testimonials';
import { FURTHER_TESTIMONIALS } from '@/content/testimonials';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Explore technology ventures and projects that Pixelette has helped develop, build and support through its specialist capabilities and venture partnerships.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  const selected = ventures.filter(
    (v) => v.relationship === 'direct-hse-venture' && v.evidence !== 'counsel' && v.oneLine,
  );

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Portfolio' }]}
        eyebrow="Portfolio"
        title="Selected ventures and projects"
        lead="Explore technology ventures and projects that Pixelette has helped develop, build and support through its specialist capabilities and venture partnerships."
      >
        <div id="selected-ventures">
          <CardGrid>
            {selected.map((venture) => (
              <VentureCard key={venture.slug} venture={venture} />
            ))}
          </CardGrid>
        </div>
      </PageHero>

      {/* <Section surface="ice" id="relationships">
        <SectionHead
          eyebrow="Relationships"
          title="Investments and relationships"
          lead="Founder relationships and strategic associations are kept separate from direct Hybrid Sweat Equity ventures. No corporate shareholding figure is published."
        />
        <CardGrid>
          {ventures
            .filter(
              (v) =>
                (v.relationship === 'founder-relationship' ||
                  v.relationship === 'capital-relationship') &&
                v.evidence !== 'counsel',
            )
            .map((venture) => (
              <VentureCard key={venture.slug} venture={venture} />
            ))}
        </CardGrid>
      </Section> */}

      <Section id="founder-experiences">
        <SectionHead
          eyebrow="Founder experiences"
          title="In their words"
          lead="Quotations are reproduced as previously published. Layout only has changed."
        />
        <Testimonials items={FURTHER_TESTIMONIALS} />
      </Section>

      <Section surface="deep">
        <SectionHead
          eyebrow="Next step"
          title="Explore working with Pixelette"
          lead="The commercial model is explained on the Hybrid Sweat Equity page. Founders can explore a partnership."
        />
        <Buttons>
          <Btn href="/hse-model">Hybrid Sweat Equity</Btn>
          <Btn href="/apply" variant="secondary">Explore a partnership</Btn>
        </Buttons>
      </Section>
    </>
  );
}
