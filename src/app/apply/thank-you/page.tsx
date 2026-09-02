import type { Metadata } from 'next';
import { Section, SectionHead, PageHero, Buttons, Btn } from '@/components/ui';

/**
 * Confirmation page. Excluded from the index, a thank-you page in search
 * results is a tracking and duplicate-content defect, and this one would also
 * expose a route that does not yet accept submissions.
 */
export const metadata: Metadata = {
  title: 'Assessment received',
  robots: { index: false, follow: false },
  alternates: { canonical: '/apply/thank-you' },
};

export default function ApplyThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow="Assessment received"
        title="Thank you. Your assessment is with us."
        lead="A member of the Pixelette Holdings team will review what you have sent and respond if the venture is a plausible fit for a qualification conversation."
      />

      <Section>
        <SectionHead eyebrow="What happens now" title="What you should expect." />
        <ul className="list">
          <li>Your submission is reviewed by a person, not scored by an algorithm.</li>
          <li>A response does not imply acceptance, an offer or an entitlement to a meeting.</li>
          <li>We may recommend HSE, a paid Validation Sprint, full-cash delivery or no engagement.</li>
          <li>Nothing is agreed until scope, economics and documentation are signed separately.</li>
        </ul>

        <Buttons>
          <Btn href="/hse-model">
            Read the HSE model
          </Btn>
          <Btn href="/portfolio">
            Explore the portfolio
          </Btn>
        </Buttons>
      </Section>
    </>
  );
}
