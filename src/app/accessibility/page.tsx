import type { Metadata } from 'next';
import { Section, PageHero } from '@/components/ui';
import { SITE, CONTACT } from '@/content/site';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description:
    'Pixelette Holdings aims to meet WCAG 2.2 level AA. Accessibility is treated as a build requirement, not a retrofit.',
  alternates: { canonical: '/accessibility' },
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Accessibility' }]}
        eyebrow="Legal"
        title="Accessibility statement"
      />

      <Section>
        <div style={{ maxWidth: 860 }}>
          <div className="prose">
            <h2>Our commitment</h2>
            <p>
              {SITE.legalName} aims to meet <strong>WCAG 2.2 level AA</strong>. Accessibility is
              treated as a build requirement, not a retrofit.
            </p>

            <h2>What is built in</h2>
            <ul className="list">
              <li>Semantic headings and landmark structure on every page.</li>
              <li>Full keyboard operability, including the navigation and the interactive stage system.</li>
              <li>Visible focus indicators on all interactive elements.</li>
              <li>Navigation that does not depend on hover.</li>
              <li>
                Motion that respects the <code>prefers-reduced-motion</code> setting, with all rotation
                and reveal transitions removed.
              </li>
              <li>Interactive states that remain clear without animation.</li>
              <li>Form labels, hints and error messages tied to their fields.</li>
              <li>
                Colour contrast checked against the AA threshold, using an accessible cobalt for text
                on light surfaces.
              </li>
              <li>Meaningful alternative text; decorative images marked as decorative.</li>
            </ul>
          </div>

          <div className="prose">
            <h2>Feedback</h2>
            <p>
              If you encounter a barrier on this website, email us at{' '}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and we will respond and
              remediate.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
