import type { Metadata } from 'next';
import {
  Section, SectionHead, PageHero, Buttons, Btn, CardGrid,
  VentureCard, ConversionClose,
} from '@/components/ui';
import { byRelationship, publishableCount } from '@/content/ventures';

export const metadata: Metadata = {
  title: 'Portfolio | Proof with the labels left on',
  description:
    'Equity investments, direct HSE ventures, projects in development, delivered ventures and capital relationships, each shown for what it is, with the evidence gates left visible.',
  alternates: { canonical: '/portfolio' },
};

const TAXONOMY = [
  ['Equity Investments', 'Founder-confirmed equity interests, with final documentary and legal checks completed before publication.'],
  ['Direct HSE Ventures', 'Ventures selected for the Pixelette HSE portfolio.'],
  ['Projects in Development', 'Current portfolio projects described without implying ownership, completion or a guaranteed outcome.'],
  ['Delivered Ventures', 'Companies or products for which a Pixelette capability delivered evidenced work, without implying equity.'],
  ['Capital and Strategic Partners', 'Organisations connected to capital, policy, distribution or institutional work, without implying ownership.'],
] as const;

export default function PortfolioPage() {
  const investments = byRelationship('equity-investment');
  const inDevelopment = byRelationship('project-in-development');
  const hse = byRelationship('direct-hse-venture');
  const delivered = byRelationship('delivered-venture');
  const capital = byRelationship('capital-relationship');

  // Null until every HSE venture carries an evidenced description. A count that
  // contradicts the grid below it is worse than no count at all.
  const count = publishableCount();

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Portfolio' }]}
        eyebrow="Portfolio and relationships"
        title="Proof with the labels left on."
        lead="A logo is not an investment and delivered work is not ownership. We separate each relationship so founders and partners can understand how it is currently classified and which details remain evidence-gated."
      >
        <Buttons>
          <Btn href="/portfolio/2connect">Explore 2Connect</Btn>
          <Btn href="/apply" variant="secondary">Check if you qualify</Btn>
        </Buttons>
      </PageHero>

      <Section>
        <SectionHead
          eyebrow="Taxonomy"
          title="Every relationship shown for what it is."
          lead="Classification creates credibility. It does not hide weak evidence behind a mixed logo wall."
        />
        <div className="taxonomy">
          {TAXONOMY.map(([term, def]) => (
            <div key={term}>
              <p><strong>{term}</strong></p>
              <p>{def}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 34 }}>
          <Buttons>
            <Btn href="/portfolio/investments" variant="ghost">Equity investments</Btn>
            <Btn href="/portfolio/hse-ventures" variant="ghost">Direct HSE ventures</Btn>
            <Btn href="/portfolio/delivered-ventures" variant="ghost">Delivered ventures</Btn>
          </Buttons>
        </div>
      </Section>

      <Section surface="ice">
        <SectionHead eyebrow="Equity investments" title="Where Pixelette holds an interest." />
        <CardGrid>
          {investments.map((v) => (
            <VentureCard key={v.slug} venture={v} />
          ))}
        </CardGrid>
      </Section>

      <Section>
        <SectionHead eyebrow="Projects in development" title="Being built now." />
        <CardGrid>
          {inDevelopment.map((v) => (
            <VentureCard key={v.slug} venture={v} />
          ))}
        </CardGrid>
      </Section>

      <Section surface="deep">
        <SectionHead
          eyebrow="Featured direct HSE venture"
          title="2Connect: intent-led AI for better introductions."
          lead="An intent-led AI networking agent that evaluates reciprocal fit and explains why an introduction may be valuable."
        />
        <div className="tile-strip">
          <div className="tile"><strong>12</strong><span>project repositories</span></div>
          <div className="tile"><strong>1,891</strong><span>measured commits</span></div>
          <div className="tile"><strong>122</strong><span>active development days</span></div>
          <div className="tile"><strong>~217k</strong><span>lines of current code</span></div>
          <div className="tile"><strong>95</strong><span>AI/backend test files</span></div>
        </div>
        <p className="small">
          Repository-derived measures, approved for controlled design only. Client publication consent
          is required before any public release of the figures, screens, outcome claims or founder
          quotes.
        </p>
        <div style={{ marginTop: 30 }}>
          <Buttons>
            <Btn href="/portfolio/2connect">Explore the project</Btn>
          </Buttons>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Direct HSE ventures"
          title={count === null ? 'Ventures in the HSE portfolio.' : `${count} ventures in the HSE portfolio.`}
          lead="Each venture is listed with its classification first. Where an approved description and supporting evidence do not yet exist, the card says so rather than inventing one."
        />
        <CardGrid>
          {hse.map((v) => (
            <VentureCard key={v.slug} venture={v} />
          ))}
        </CardGrid>
      </Section>

      {delivered.length > 0 ? (
        <Section surface="ice">
          <SectionHead
            eyebrow="Delivered ventures"
            title="Work delivered, without implying ownership."
            lead="A delivered relationship means a Pixelette capability did evidenced work. It does not mean Pixelette holds equity."
          />
          <CardGrid>
            {delivered.map((v) => (
              <VentureCard key={v.slug} venture={v} />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      <Section>
        <SectionHead
          eyebrow="Capital and strategic partners"
          title="Relationships connected to capital and institutions."
          lead="Named here without implying ownership, endorsement or a fundraising outcome."
        />
        <CardGrid>
          {capital.map((v) => (
            <VentureCard key={v.slug} venture={v} />
          ))}
        </CardGrid>
      </Section>

      <ConversionClose />
    </>
  );
}
