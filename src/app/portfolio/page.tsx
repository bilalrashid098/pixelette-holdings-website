import type { Metadata } from 'next';
import { Section, SectionHead, PageHero, Buttons, Btn, CardGrid, VentureCard } from '@/components/ui';
import { ventures } from '@/content/ventures';
import { Testimonials } from '@/components/Testimonials';
import { FURTHER_TESTIMONIALS } from '@/content/testimonials';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Selected Pixelette venture relationships, founder relationships and strategic associations, described only to the extent the current evidence supports.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  const selected = ventures.filter(
    (v) => v.relationship === 'direct-hse-venture' && v.evidence !== 'counsel' && v.oneLine,
  );
  const relationships = ventures.filter(
    (v) =>
      (v.relationship === 'founder-relationship' || v.relationship === 'capital-relationship') &&
      v.evidence !== 'counsel',
  );

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Portfolio' }]}
        eyebrow="Portfolio"
        title="Selected ventures and projects"
        lead="A record of relationships already described by Pixelette. An entry is not a statement that the project has launched, raised funding or become commercially successful."
      />

      <Section id="selected-ventures">
        <SectionHead
          eyebrow="Ventures"
          title="Relationship, sector and what can be said"
          lead="Each card names the relationship that can be described from the material held. Where the operating stage has not been re-verified, the card says so."
        />
        <CardGrid>
          {selected.map((venture) => (
            <VentureCard key={venture.slug} venture={venture} />
          ))}
        </CardGrid>
      </Section>

      {/* <Section surface="ice" id="relationships">
        <SectionHead
          eyebrow="Relationships"
          title="Investments and relationships"
          lead="Founder relationships and strategic associations are kept separate from direct Hybrid Sweat Equity ventures. No corporate shareholding figure is published."
        />
        <CardGrid>
          {relationships.map((venture) => (
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
          lead="The commercial model is explained on the Hybrid Sweat Equity page. Founders can apply to partner."
        />
        <Buttons>
          <Btn href="/hse-model">Hybrid Sweat Equity</Btn>
          <Btn href="/apply" variant="secondary">Apply to partner</Btn>
        </Buttons>
      </Section>
    </>
  );
}
