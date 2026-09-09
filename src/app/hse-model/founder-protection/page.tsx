import type { Metadata } from 'next';
import { Section, SectionHead, PageHero, Buttons, Btn, Qualifier } from '@/components/ui';
import { FOUNDER_CHARTER, PIXELETTE_PROTECTIONS } from '@/content/hse';

export const metadata: Metadata = {
  title: 'Founder Protection | The HSE Charter',
  description:
    'The eight commitments that make the Pixelette HSE equity model safe for a founder to enter, the protections that run the other way, and the limits of what the charter does.',
  alternates: { canonical: '/hse-model/founder-protection' },
};

const FOUNDER_PROTECTIONS = [
  'Equity is never fully granted upfront.',
  'The equity ceiling is known before work begins.',
  'Unvested equity returns automatically when delivery stops.',
  'Operational control stays with the founder.',
  'Pixelette takes minority protections, not control.',
  'Every stage carries a stop, continue or revise decision.',
  'Defined buyback provisions may apply.',
];

const BOUNDARIES = [
  'It does not promise customers, revenue or product-market fit.',
  'It does not promise fundraising or investor introductions.',
  'It does not commit Pixelette to a cash investment.',
  'It does not cover third-party licence, audit or certification costs.',
  'It does not create unlimited development or open-ended support.',
  'It does not mean independent certification is awarded by Pixelette.',
];

export default function FounderProtectionPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'HSE Model', href: '/hse-model' },
          { label: 'Founder Protection' },
        ]}
        eyebrow="Alignment that can be understood"
        title="Your equity is earned, not taken upfront."
        lead="HSE is designed to protect founders from vague scope, automatic dilution and undelivered promises. These are the commitments that make the equity model safe to enter."
      >
        <Buttons>
          <Btn href="/apply">Check if you qualify</Btn>
          <Btn href="/hse-model" variant="secondary">
            Return to the HSE model
          </Btn>
        </Buttons>
      </PageHero>

      <Section>
        <SectionHead
          eyebrow="The charter"
          title="Eight commitments to the founder."
          lead="Each one exists to remove a specific fear founders have about giving equity to a delivery partner."
        />
        <ol className="charter">
          {FOUNDER_CHARTER.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ol>
        <Qualifier>
          <strong>Legal note.</strong> Final contractual language, buyback terms, vesting, clawback, IP
          transfer and dispute provisions require counsel approval. These are the intended charter
          principles, not the executed instrument.
        </Qualifier>
      </Section>

      <Section surface="ice">
        <SectionHead
          eyebrow="Both directions"
          title="A partnership protects both parties."
          lead="The same discipline that protects the founder also protects the delivery partner. Neither set of obligations works without the other."
        />
        <div className="two-col">
          <article>
            <h3 className="h3">What protects the founder</h3>
            <ul className="list">
              {FOUNDER_PROTECTIONS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3 className="h3">What protects Pixelette</h3>
            <ul className="list">
              {PIXELETTE_PROTECTIONS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Boundaries"
          title="What the charter does not do."
          lead="Protection is not the same as a guarantee. Being explicit about the limits is part of what makes the rest credible."
        />
        <ul className="list list-cross">
          {BOUNDARIES.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </Section>

      <Section surface="deep">
        <SectionHead
          eyebrow="Next step"
          title="Comfortable with how the equity works?"
          lead="The short fit assessment is the responsible starting point. It is not a pitch competition and not a request for Pixelette to invest cash."
        />
        <Buttons>
          <Btn href="/apply">Check if you qualify</Btn>
          <Btn href="/hse-model" variant="secondary">
            Read the model in full
          </Btn>
        </Buttons>
      </Section>
    </>
  );
}
