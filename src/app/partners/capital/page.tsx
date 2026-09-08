import type { Metadata } from 'next';
import {
  Section, SectionHead, PageHero, Buttons, Btn, CardGrid, Card, FinancialPromotionNotice,
} from '@/components/ui';
import { gateSentence } from '@/content/hse';

/**
 * Capital partners.
 *
 * NOINDEX BY DESIGN. The FCA treats a website as capable of constituting a
 * financial promotion, and s.21 FSMA restricts unauthorised invitations or
 * inducements to engage in investment activity. Keeping this page out of the
 * index narrows who reaches it while the wording is with counsel, it is a
 * containment measure, not an SEO decision, and must not be "fixed" later by
 * someone tidying up robots directives.
 */
export const metadata: Metadata = {
  title: 'Capital Partners | Institutional overview',
  description:
    'An institutional overview of how Pixelette Holdings operates, selects and governs ventures. Information only, not an offer or invitation to invest.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/partners/capital' },
};

const PLATFORM = [
  ['Selective intake', 'Ventures enter through a qualification assessment and an investment-committee decision, not an open application funnel.'],
  ['Five decision gates', `${gateSentence()}. Each produces evidence and a fresh stop, revise or proceed decision.`],
  ['Evidence built continuously', 'Diligence material is assembled during delivery rather than reconstructed before a raise.'],
  ['Classified portfolio', 'Equity investments, HSE ventures, projects in development, delivered relationships and capital relationships are never presented as one undifferentiated group.'],
] as const;

export default function CapitalPartnersPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Partners' },
          { label: 'Capital Partners' },
        ]}
        eyebrow="Institutional overview"
        title="An execution-led operating platform."
        lead="This page is an institutional overview of how Pixelette Holdings operates, selects and governs ventures. It is provided for information only."
      >
        <Buttons>
          <Btn href="/partners/capital/qualification">Request qualification</Btn>
          <Btn href="/portfolio" variant="secondary">Explore the public portfolio</Btn>
        </Buttons>
      </PageHero>

      {/* The disclaimer sits above the fold of the page body, not in the footer
          alone. Position is part of the containment. */}
      <Section tight>
        <FinancialPromotionNotice
          eligibility="any"
          extra="No investment opportunity, deal terms, ticket sizes, returns or portfolio allocations are offered on this page."
          showS21
        />
      </Section>

      <Section>
        <SectionHead
          eyebrow="How the platform operates"
          title="Execution first, ownership second."
          lead="Pixelette builds, launches and assures ventures through four integrated capabilities, and participates in ownership through structured, milestone-earned equity rather than cash deployment."
        />
        <CardGrid>
          {PLATFORM.map(([title, body]) => (
            <Card key={title} title={title}>{body}</Card>
          ))}
        </CardGrid>
      </Section>

      <Section surface="ice">
        <SectionHead eyebrow="Governance and diligence" title="Built to survive scrutiny." />
        <div className="two-col">
          <article>
            <h3 className="h3">Governance approach</h3>
            <ul className="list">
              <li>Stage-based equity ceilings agreed before work begins.</li>
              <li>Milestone acceptance, vesting and clawback discipline.</li>
              <li>Founder retains operational control; Pixelette takes minority protections.</li>
              <li>Honest gate reporting, including paused and failed gates.</li>
            </ul>
          </article>
          <article>
            <h3 className="h3">Diligence approach</h3>
            <ul className="list">
              <li>Evidence room maintained across the delivery lifecycle.</li>
              <li>Architecture, security and delivery records held per venture.</li>
              <li>Claims classified by evidence status before any external use.</li>
              <li>Group credentials verified at source rather than asserted.</li>
            </ul>
          </article>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Qualification"
          title="Controlled access, properly gated."
          lead="Detailed portfolio material is shared only after qualification and manual approval, under counsel-approved terms."
        />
        <Buttons>
          <Btn href="/partners/capital/qualification">Request qualification</Btn>
        </Buttons>
        <p className="small">
          Submitting a request creates no entitlement to information, no offer and no investment
          opportunity.
        </p>
      </Section>
    </>
  );
}
