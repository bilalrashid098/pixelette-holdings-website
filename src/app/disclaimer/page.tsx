import type { Metadata } from 'next';
import { Section, PageHero } from '@/components/ui';
import { DISCLAIMER } from '@/content/site';

export const metadata: Metadata = {
  title: 'Website and Investment Disclaimer',
  description:
    'Pixelette Holdings website disclaimer: information only, not an offer or inducement to invest, no advice and no guaranteed outcomes.',
  alternates: { canonical: '/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Disclaimer' }]}
        eyebrow="Legal"
        title="Website and investment disclaimer"
      />

      <Section>
        <div style={{ maxWidth: 860 }}>
          <div className="prose">
            <h2>No offer or inducement</h2>
            <p>
              This website is provided for information only and is{' '}
              <strong>not an offer, invitation or inducement to invest</strong>.{' '}
              {DISCLAIMER.eligibility.investment}
            </p>

            <h2>No advice</h2>
            <p>
              Nothing on this website constitutes investment, legal, tax or financial advice, and it
              must not be relied upon as such.
            </p>

            <h2>No guaranteed outcomes</h2>
            <ul className="list list-cross">
              <li>No customers, revenue or product-market fit is guaranteed.</li>
              <li>No fundraising outcome, investor introduction or investment result is guaranteed.</li>
              <li>
                No independent certification is awarded by Pixelette; certification is granted by
                external accredited bodies.
              </li>
              <li>
                Indicative equity ceilings are maxima, not offers, and depend on valuation, scope, risk
                and signed documentation.
              </li>
            </ul>

            <h2>Portfolio information</h2>
            <p>
              Portfolio relationships are shown with a classification label describing the current
              nature of each relationship. A logo or name does not imply ownership, equity, endorsement
              or a current commercial engagement beyond the stated classification.
            </p>

            <h2>Financial promotions</h2>
            <p>
              Websites and online materials can constitute financial promotions. Section 21 of the
              Financial Services and Markets Act 2000 restricts unauthorised invitations or inducements
              to engage in investment activity. Capital-partner materials are provided only through a
              qualified, controlled route under counsel-approved terms.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
