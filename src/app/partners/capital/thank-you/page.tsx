import type { Metadata } from 'next';
import { Section, SectionHead, PageHero, Buttons, Btn, EvidenceGate } from '@/components/ui';
import { DISCLAIMER } from '@/content/site';

export const metadata: Metadata = {
  title: 'Qualification request received',
  robots: { index: false, follow: false },
  alternates: { canonical: '/partners/capital/thank-you' },
};

export default function CapitalThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow="Request received"
        title="Thank you. Your request is with us."
        lead="Requests are reviewed and approved manually. Access to detailed portfolio material is never automatic."
      />

      <Section>
        <EvidenceGate flag="Important notice, held for counsel approval" legal>
          {/* Composed from DISCLAIMER rather than using FinancialPromotionNotice,
              because the notice sits inside an EvidenceGate here, not a Qualifier.
              The wording is still single-sourced. */}
          <p>
            <strong>{DISCLAIMER.headline}</strong>{' '}
            Receipt of this request creates no entitlement to information, no offer and no investment
            opportunity. {DISCLAIMER.eligibility.any}
          </p>
        </EvidenceGate>

        <SectionHead eyebrow="What happens now" title="Manual review, then a decision." />
        <ul className="list">
          <li>Your request is assessed against the approved qualification criteria.</li>
          <li>Eligibility verification and formal documentation precede any material being shared.</li>
          <li>No deal terms, ticket sizes, returns or allocations are communicated by this route.</li>
          <li>A response is not a confirmation of eligibility.</li>
        </ul>

        <Buttons>
          <Btn href="/portfolio">Explore the public portfolio</Btn>
          <Btn href="/hse-model">Read the HSE model</Btn>
        </Buttons>
      </Section>
    </>
  );
}
