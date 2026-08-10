import type { Metadata } from 'next';
import {
  Section, SectionHead, PageHero, Buttons, Btn, CardGrid, Card,
  EvidenceGate, Qualifier,
} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Validation Sprint | Test the thesis first',
  description:
    'A focused, time-boxed paid engagement that turns an idea into an evidence-backed decision: product blueprint, technical architecture, go-to-market plan and a clear recommendation.',
  alternates: { canonical: '/validation-sprint' },
};

const WORKSTREAMS = [
  {
    n: '01',
    title: 'Commercial validation',
    body: 'Who the buyer is, what triggers the purchase, and whether the opportunity is worth the capital it would consume.',
  },
  {
    n: '02',
    title: 'Product definition',
    body: 'The blueprint: what is genuinely in the first release, and what is deferred.',
  },
  {
    n: '03',
    title: 'Technical architecture',
    body: 'How it would be built, the material risks, and what the build realistically requires.',
  },
  {
    n: '04',
    title: 'Go-to-market logic',
    body: 'How the first customers would actually be reached, and what that costs.',
  },
];

export default function ValidationSprintPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Validation Sprint' }]}
        eyebrow="Paid entry route"
        title="Test the thesis before you fund the build."
        lead="A focused, time-boxed engagement that turns an idea into an evidence-backed decision. You leave with a product blueprint, technical architecture and go-to-market plan, and a clear answer on whether a full venture build is justified."
      >
        <Buttons>
          <Btn href="/apply">Request a Sprint</Btn>
          <Btn href="/hse-model" variant="secondary">
            Explore the HSE model
          </Btn>
        </Buttons>
      </PageHero>

      <Section>
        <SectionHead
          eyebrow="Why it exists"
          title="The most expensive mistake is a well-built product nobody needed."
          lead="Some ventures are promising but not yet evidenced enough to price equity responsibly. Committing either party to a full mandate at that point is bad for the founder and bad for us. The Sprint is the honest intermediate step."
        />
        <div className="two-col">
          <article>
            <h3>The Sprint is right when</h3>
            <ul className="tick-list">
              <li>The problem is real but the buyer is not yet proven.</li>
              <li>Scope is unclear enough that any estimate would be fiction.</li>
              <li>Technical feasibility carries genuine unknowns.</li>
              <li>You want a decision backed by evidence, not enthusiasm.</li>
              <li>You can fund a paid discovery engagement.</li>
            </ul>
          </article>
          <article>
            <h3>The Sprint is not</h3>
            <ul className="cross-list">
              <li>A free consultation or a sales meeting.</li>
              <li>A pitch-deck exercise.</li>
              <li>A commitment by either party to an HSE mandate.</li>
              <li>A guarantee that the venture proceeds.</li>
            </ul>
          </article>
        </div>
      </Section>

      <Section surface="ice">
        <SectionHead eyebrow="What happens" title="Four workstreams, one decision." />
        <div className="steps">
          {WORKSTREAMS.map((w) => (
            <div key={w.n} className="step reveal">
              <b>{w.n}</b>
              <div>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="What you keep"
          title="Deliverables are yours regardless of the outcome."
          lead="Including the outcome where we conclude the venture should not proceed. That conclusion is worth more than a build."
        />
        <CardGrid>
          <Card title="Product blueprint">Scope, feature definition and the deferred list, with reasoning.</Card>
          <Card title="Technical architecture">Proposed stack, integration surface and identified risks.</Card>
          <Card title="Go-to-market plan">Positioning, ideal customer, first-channel logic and pilot approach.</Card>
          <Card title="Recommendation">Proceed, revise or stop, with the evidence behind it.</Card>
        </CardGrid>
      </Section>

      <Section surface="ice">
        <SectionHead eyebrow="Three honest outcomes" title="Every Sprint ends in a decision, not a proposal." />
        <CardGrid>
          <article className="p-card">
            <span className="rel-label rel-direct-hse-venture">Outcome one</span>
            <h3>Proceed to HSE</h3>
            <p>The evidence supports a full mandate. Sprint deliverables fold into the subsequent engagement.</p>
          </article>
          <article className="p-card">
            <span className="rel-label rel-capital-relationship">Outcome two</span>
            <h3>Proceed on full cash</h3>
            <p>The venture is sound and you would rather retain the equity. The same delivery discipline applies.</p>
          </article>
          <article className="p-card">
            <span className="rel-label rel-project-in-development">Outcome three</span>
            <h3>No fit</h3>
            <p>
              We say so plainly. You keep every deliverable and the reasoning, and you have not spent a
              build budget finding out.
            </p>
          </article>
        </CardGrid>
        <Qualifier>
          <strong>No Sprint carries an implied HSE offer.</strong> Completing a Sprint does not create
          an entitlement to a mandate, and does not vest any equity.
        </Qualifier>
      </Section>

      <Section tight>
        <EvidenceGate flag="Commercial terms held" title="Fee and duration">
          Sprint scope, duration and fee are confirmed per engagement following a qualification
          conversation. No public price is published until the standard scope and commercial terms are
          approved.
        </EvidenceGate>
      </Section>

      <Section surface="deep">
        <SectionHead
          eyebrow="Next step"
          title="Not sure whether you need a Sprint or a mandate?"
          lead="The fit assessment routes you honestly. If the venture is ready for a full mandate we will say so; if it is not, the Sprint is the responsible alternative."
          light
        />
        <Buttons>
          <Btn href="/apply">Check your fit</Btn>
          <Btn href="/hse-model/founder-protection" variant="secondary">
            Read Founder Protection
          </Btn>
        </Buttons>
      </Section>
    </>
  );
}
