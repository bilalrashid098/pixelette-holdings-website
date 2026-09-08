import type { Metadata } from 'next';
import {
  Section, SectionHead, PageHero, Buttons, Btn, CardGrid, Card, Qualifier,
} from '@/components/ui';
import {
  CEILINGS, CEILINGS_QUALIFIER, GATES, NOT_PROMISED,
  CEILING_MAX_PCT, FOUNDER_CASH_PCT, PROGRAMME_NAME,
  CONTINUATION_EQUITY_HELD,
} from '@/content/hse';

export const metadata: Metadata = {
  title: 'The HSE Model | Milestone-Earned Equity',
  description:
    "Understand how Pixelette's Hybrid Sweat Equity model combines cash funded venture execution with capped, milestone-earned equity and a full-cash alternative.",
  alternates: { canonical: '/hse-model' },
};

const FAQS = [
  {
    q: 'Does Pixelette invest cash?',
    a: 'No. Under the founder funded HSE route, Pixelette may convert an eligible portion of its professional fee into equity. It does not provide a cash cheque.',
  },
  {
    q: `Is the equity automatically ${CEILING_MAX_PCT}%?`,
    a: `No. The ${CEILING_MAX_PCT}% figure is the maximum ceiling for the earliest stage. The final economics depend on valuation, scope, risk, cash coverage and legal documentation.`,
  },
  {
    q: 'What does the cash portion cover?',
    a: `The founder's cash portion — ${FOUNDER_CASH_PCT}% in the worked example, though the proportion is agreed venture by venture — must cover Pixelette's delivery costs, required margin and operating risk for the agreed programme. External services and third-party costs remain with the venture unless expressly agreed otherwise.`,
  },
  {
    q: 'Can I pay entirely in cash?',
    a: 'Yes. The full-cash alternative is always available.',
  },
  {
    q: 'Do you take control of my company?',
    a: 'No. You keep operational control. Any Pixelette stake is a capped minority earned against accepted work, and you retain the right to buy it back at fair value.',
  },
  {
    q: 'Will Pixelette raise funding for us?',
    a: 'No fundraising outcome is promised. Capital readiness and suitable introductions, where lawful and appropriate, are separate from an investment result.',
  },
  {
    q: 'Who owns the IP?',
    a: 'The final position must be set in the engagement documents. The intended model aligns IP transfer with payment, delivery acceptance and the agreed equity documentation.',
  },
];

/**
 * FAQPage structured data, emitted for answer-engine / AI-search visibility.
 * Generated from the same FAQS above, so the markup can never drift from the
 * visible answers. These answers are accurate to the model; counsel may still
 * refine the wording, which flows through automatically.
 */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function HseModelPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'HSE Model' }]}
        eyebrow="Hybrid Sweat Equity"
        title="Build your company without giving it away."
        lead="HSE combines cash funded execution with a capped, earned equity slice, so you get a senior build, launch and enterprise readiness team without handing over control or a large share of your company. Built for founders who intend to stay owners."
      >
        <Buttons>
          <Btn href="/apply">Check if you qualify</Btn>
          <Btn href="/hse-model/founder-protection" variant="secondary">
            Read Founder Protection
          </Btn>
        </Buttons>
      </PageHero>

      {/* ----------------------------------------------------- what HSE is */}
      <Section>
        <SectionHead
          eyebrow="What HSE is"
          title="Not a cash investment. Not discounted delivery. Not a studio that takes your company."
          lead={`Every engagement is valued at full commercial rates. For an approved HSE programme, the founder pays an agreed portion of the professional fee in cash — ${FOUNDER_CASH_PCT}% in the worked example below — and Pixelette may convert the eligible balance into capped equity that is earned through accepted delivery. Pixelette deploys no cash.`}
        />
        <CardGrid>
          <Card title="The founder contributes">
            Cash for the agreed delivery portion, third-party costs, operator leadership, decisions and
            access.
          </Card>
          <Card title="Pixelette contributes">
            The approved professional capability, delivery governance and an eligible fee portion
            placed at risk.
          </Card>
          <Card title="The venture gains">
            {`A structured ${PROGRAMME_NAME} programme with aligned execution and a continuously built evidence base.`}
          </Card>
        </CardGrid>
      </Section>

      {/* ------------------------------------------------------- economics */}
      <Section surface="ice">
        <SectionHead
          eyebrow="Economics"
          title="The stage sets the maximum ceiling."
          lead="Earlier ventures carry more execution risk and may require a broader programme. More mature ventures usually require a narrower equity allocation."
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Stage at signature</th>
              <th scope="col">Indicative maximum ceiling</th>
              <th scope="col">Typical need</th>
            </tr>
          </thead>
          <tbody>
            {CEILINGS.map((c) => (
              <tr key={c.stage}>
                <td>{c.stage}</td>
                <td className="ceiling">Up to {c.pct}%</td>
                <td>{c.need}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Qualifier>
          <strong>These are ceilings, not standard prices or offers.</strong> {CEILINGS_QUALIFIER}
        </Qualifier>
      </Section>

      {/* -------------------------------------------- how equity is earned */}
      <Section>
        <SectionHead eyebrow="How equity is earned" title="Two tranches. Both earned through work." />
        <div className="two-col">
          <article>
            <h3 className="h3">Delivery equity</h3>
            <p className="body">
              Equity vests only when defined product, launch or readiness milestones are delivered and
              accepted. Rejected, incomplete or undelivered milestones do not vest. Unvested equity
              returns when the relevant delivery ends.
            </p>
          </article>
          <article>
            <span className="pill flag-held">{CONTINUATION_EQUITY_HELD.flag}</span>
            <h3 className="h3">Continuation equity</h3>
            <p className="body">{CONTINUATION_EQUITY_HELD.body}</p>
          </article>
        </div>
      </Section>

      {/* ------------------------------------------------------ five gates */}
      {/* id is the target of the "How It Works" primary-nav item. */}
      <Section surface="navy" id="how-it-works">
        <SectionHead
          eyebrow="Five gates"
          title="Five gates. Five evidence-based decisions."
          lead="Each stage produces evidence and a fresh decision. Neither party is committed to a weak next phase simply because the previous phase was completed."
        />
        <div className="gate-list">
          {GATES.map((g) => (
            <article key={g.n} className="gate">
              <div className="gate-num">{g.n}</div>
              <div>
                <h3 className="h3">{g.name}</h3>
                <p className="body">{g.body}</p>
                <dl>
                  <div>
                    <dt>Evidence produced</dt>
                    <dd>{g.evidence}</dd>
                  </div>
                  <div>
                    <dt>Decision</dt>
                    <dd>{g.decision}</dd>
                  </div>
                  {g.note ? (
                    <div>
                      <dt>Commercial gate</dt>
                      <dd>{g.note}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------- mutual obligations */}
      <Section>
        <SectionHead
          eyebrow="Mutual obligations"
          title="A partnership requires two operating parties."
        />
        <div className="two-col">
          <article>
            <h3 className="h3">The founder is responsible for</h3>
            <ul className="list-plain">
              <li>Vision, domain expertise and operator leadership.</li>
              <li>Timely decisions and stakeholder access.</li>
              <li>The agreed cash tranche before each phase.</li>
              <li>Third-party licences, audits, certification and regulatory fees.</li>
              <li>Truthful financial, company, IP and cap-table information.</li>
              <li>Completing agreed equity and company documentation.</li>
            </ul>
          </article>
          <article>
            <h3 className="h3">Under an approved engagement, Pixelette&rsquo;s responsibilities may include</h3>
            <ul className="list-plain">
              <li>The accepted scope and delivery evidence.</li>
              <li>Technical, product, launch and assurance work expressly included.</li>
              <li>Transparent reporting and change control.</li>
              <li>Protecting the stage ceiling and vesting rules.</li>
              <li>Maintaining the evidence room for agreed work.</li>
              <li>Pausing rather than concealing a failed gate.</li>
            </ul>
          </article>
        </div>

        <div className="panel space-t">
          <h3 className="h3">What HSE does not promise</h3>
          <ul>
            {NOT_PROMISED.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ------------------------------------------- full-cash alternative */}
      <Section surface="ice" tight>
        <aside className="validation-route">
          <div>
            <strong>Prefer to retain all available equity?</strong>
            <p>
              A founder may choose full-cash professional delivery. The scope, quality bar and
              acceptance process remain explicit, while no HSE equity is considered for that work.
            </p>
          </div>
          <Btn href="/contact">
            Discuss full-cash delivery
          </Btn>
        </aside>
      </Section>

      {/* -------------------------------------------------------------- FAQ */}
      <Section>
        <SectionHead eyebrow="Questions" title="The questions founders ask first." />
        <div className="faq">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <script
          type="application/ld+json"
          // Static, author-controlled JSON generated from the FAQ list above.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Section>

      {/* --------------------------------------------------- qualification */}
      <Section surface="deep">
        <SectionHead
          eyebrow="Qualification"
          title="The right route starts with fit."
          lead="The assessment helps us decide whether the responsible next step is an HSE mandate, a paid Validation Sprint, full-cash delivery or no current engagement."
        />
        <Buttons>
          <Btn href="/apply">Check if you qualify</Btn>
          <Btn href="/validation-sprint" variant="secondary">
            Start with a Validation Sprint
          </Btn>
        </Buttons>
      </Section>
    </>
  );
}
