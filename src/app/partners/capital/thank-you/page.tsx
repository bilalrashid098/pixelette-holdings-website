import type { Metadata } from 'next';
import { Section, SectionHead, PageHero, Buttons, Btn, EvidenceGate } from '@/components/ui';

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
        small
      />

      <Section>
        <EvidenceGate flag="Important notice, held for counsel approval" legal>
          <p>
            <strong>
              This website is provided for information only and is not an offer, invitation or
              inducement to invest.
            </strong>{' '}
            Receipt of this request creates no entitlement to information, no offer and no investment
            opportunity. Any opportunity is available only to professional, high-net-worth or
            self-certified sophisticated investors, subject to eligibility verification and formal
            documentation.
          </p>
        </EvidenceGate>

        <SectionHead eyebrow="What happens now" title="Manual review, then a decision." />
        <ul className="tick-list">
          <li>Your request is assessed against the approved qualification criteria.</li>
          <li>Eligibility verification and formal documentation precede any material being shared.</li>
          <li>No deal terms, ticket sizes, returns or allocations are communicated by this route.</li>
          <li>A response is not a confirmation of eligibility.</li>
        </ul>

        <div style={{ marginTop: 34 }}>
          <Buttons>
            <Btn href="/portfolio" variant="ghost">Explore the public portfolio</Btn>
            <Btn href="/hse-model" variant="ghost">Read the HSE model</Btn>
          </Buttons>
        </div>
      </Section>
    </>
  );
}
