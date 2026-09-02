import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Section, SectionHead, PageHero, Buttons, Btn, EvidenceGate, Qualifier,
} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Services-for-equity, properly structured',
  description:
    'Most services-for-equity arrangements fail for the same two reasons: the scope was never defined, and the equity was granted before the work was done. Both are structural, and both are fixable.',
  alternates: { canonical: '/insights/services-for-equity-properly-structured' },
};

export default function ServicesForEquityArticle() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Insights', href: '/insights' },
          { label: 'Services-for-equity' },
        ]}
        eyebrow="Insight · The HSE model"
        title="Services-for-equity, properly structured."
        lead="Most services-for-equity arrangements fail for the same two reasons: the scope was never defined, and the equity was granted before the work was done. Both are fixable, and the fixes are structural rather than cultural."
      />

      <Section>
        <div className="prose">
          <p className="lead" style={{ marginBottom: 34 }}>
            <strong>
              Services-for-equity is an arrangement in which a delivery partner accepts equity in place
              of part of its fee.
            </strong>{' '}
            It is common, it is frequently mishandled, and the failure pattern is consistent enough to
            be designed out.
          </p>

          <h2>Why most arrangements fail</h2>
          <p>Two failure modes account for the majority of disputes.</p>
          <p>
            <strong>Undefined scope.</strong> &ldquo;Development support&rdquo; is not a deliverable.
            When the work is not specified against acceptance criteria, both parties form different
            expectations, and the disagreement surfaces only after the equity has moved. The founder
            believes they bought a product; the partner believes they sold a period of effort.
          </p>
          <p>
            <strong>Equity granted upfront.</strong> If shares are issued at signature, the
            partner&rsquo;s incentive inverts on day two. Every hour after that is a cost against an
            asset already held. The founder is diluted for work that may never arrive, and has no
            mechanism to recover the position.
          </p>

          <h2>The four structures that fix it</h2>

          <h3>1. Milestone vesting</h3>
          <p>
            Equity vests only when a defined milestone is delivered <em>and accepted</em>. Acceptance
            is the load-bearing word: delivery asserted by the partner is not the same as delivery
            accepted by the founder, and the agreement must say which one triggers vesting.
          </p>

          <h3>2. Clawback</h3>
          <p>
            Unvested equity returns automatically when delivery stops. Without it, a partner who
            disengages at 40% completion keeps whatever vested and the founder carries the dilution
            permanently. Clawback is what makes the arrangement survivable when it goes wrong.
          </p>

          <h3>3. Stage-based ceilings</h3>
          <p>
            A pre-seed venture carries more execution risk than one with revenue, so the defensible
            ceiling differs. Agreeing the maximum before work begins removes the negotiation that would
            otherwise happen at the worst possible moment: mid-delivery, when the founder has least
            leverage.
          </p>

          <h3>4. A genuine full-cash alternative</h3>
          <p>
            If the partner will only work for equity, the arrangement is not a choice. A real cash
            route, priced at commercial value, is what makes the equity route a decision rather than a
            condition. It also disciplines the pricing: a fee that would be indefensible in cash is
            indefensible in equity.
          </p>
        </div>

        <div style={{ maxWidth: 760 }}>
          <EvidenceGate flag="In practice" title="The question that exposes an unstructured deal" legal>
            Ask what happens if the partner stops work at 40% completion. A properly structured
            arrangement has a specific answer: this much vested, this much returns, these deliverables
            are yours, this is the dispute route. An unstructured one produces a pause, and then a
            reassurance about the relationship. The pause is the answer.
          </EvidenceGate>
        </div>

        <div className="prose">
          <h2>The valuation problem nobody solves early enough</h2>
          <p>
            Milestone-earned equity raises an obvious question: earned at what valuation? A cap table
            records a fixed number. You cannot retroactively reprice a position as the venture de-risks.
            The usual answer is a convertible instrument with a stage-banded cap, converting at the next
            priced round, which defers the valuation argument to a point where there is evidence to
            settle it. Until that instrument exists, stage ceilings are directional rather than
            operable, and any percentage discussed is an intention, not a term.
          </p>

          <h2>What honest structuring cannot promise</h2>
          <ul className="list list-cross">
            <li>That the venture succeeds.</li>
            <li>Customers, revenue or product-market fit.</li>
            <li>Fundraising, investor introductions or an investment outcome.</li>
            <li>That every milestone is accepted first time.</li>
          </ul>
          <p style={{ marginTop: 18 }}>
            What it can do is ensure that if any of those go badly, the equity position reflects the
            work actually delivered. That is the whole of the promise, and a partner offering more than
            it is telling you something about how the arrangement will be run.
          </p>
        </div>

        <div style={{ maxWidth: 760 }}>
          <Qualifier>
            <strong>How this applies at Pixelette.</strong> The HSE model uses all four structures:
            milestone vesting, clawback, stage ceilings of up to 30%, 20% and 12%, and a full-cash
            alternative that is always available. The{' '}
            <Link href="/hse-model/founder-protection">Founder Protection Charter</Link> states the
            commitments in eight lines. Final contractual language, vesting mechanics and tax treatment
            require counsel approval before any instrument is signed.
          </Qualifier>
        </div>
      </Section>

      <Section surface="deep">
        <SectionHead eyebrow="Next" title="See how the structures work in practice." />
        <Buttons>
          <Btn href="/hse-model">Explore the HSE model</Btn>
          <Btn href="/hse-model/founder-protection" variant="secondary">
            Read Founder Protection
          </Btn>
        </Buttons>
      </Section>
    </>
  );
}
