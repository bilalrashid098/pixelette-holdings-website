import Link from 'next/link';
import {
  Section, SectionHead, Buttons, Btn, CardGrid, Card,
  Qualifier, RelationshipTag, ConversionClose,
} from '@/components/ui';
import { Testimonials } from '@/components/Testimonials';
import {
  ECONOMICS, GATES, CAPABILITIES, FOUNDER_CHARTER, STRUCTURES_QUALIFIER,
  ECONOMICS_EXAMPLE_NOTE, RELATIONSHIP_ECONOMICS, RELATIONSHIP_ECONOMICS_NOTE,
  PROOF_TIMELINE, PROOF_TIMELINE_NOTE, ECOSYSTEM, ECOSYSTEM_NOTE, OPERATING_MODEL,
} from '@/content/hse';
import { ventures } from '@/content/ventures';
import { TESTIMONIALS } from '@/content/testimonials';
import { CapabilityBrand } from '@/components/CapabilityBrand';
import { Credentials } from '@/components/Credentials';
import { Orbit } from '@/components/Orbit';

export default function HomePage() {
  const bic = ventures.find((v) => v.slug === 'big-innovation-centre')!;
  // Trust Layer Health is deliberately NOT featured on the homepage: it is an
  // active legal matter (evidence: 'counsel', "no reference to any dispute").
  // A clean direct-HSE venture takes the spotlight instead. TLH remains in the
  // portfolio data, classified and gated, but off the marketing front page.
  const dav = ventures.find((v) => v.slug === 'digital-asset-vault')!;
  const twoConnect = ventures.find((v) => v.slug === '2connect')!;

  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className="hero wash-left">
        <div className="wrap hero-grid">
          <div>
            {/* Sentence case, not the brief's all-caps. Every other eyebrow on
                the site is sentence case by decision (commit aac7783) and
                .eyebrow carries no text-transform, so setting this one in caps
                would make it the only shouted line on the page. Wording is the
                brief's; only the case follows the house rule. */}
            <p className="eyebrow">Pixelette Holdings · Venture building &amp; equity partnerships</p>
            <h1 className="h1">Build and launch your company, without giving away equity for promises.</h1>
            <p className="lead">
              Pixelette Holdings is the group-level venture partner behind Pixelette Technologies,
              Pixelette Marketing and Pixelette Certified. We partner with selected founders to turn
              ambitious ideas into investable, launch-ready companies by combining product
              engineering, growth, enterprise readiness and governance through one aligned venture
              relationship.
            </p>
            <Buttons>
              <Btn href="/hse-model" variant="secondary">See how HSE works</Btn>
              <Btn href="/apply">Apply to build with us</Btn>
            </Buttons>
            <p className="small">
              Founder-led. Milestone-based. Equity aligned to delivered execution.
            </p>
          </div>

          {/* Same markup, same order, same words — moved into its own component
              so the motion exception and its keyframe stay out of the global
              stylesheet, and so the pause observer has somewhere to live. */}
          <Orbit />
        </div>
      </section>

      {/* ------------------------------------------------- proof timeline */}
      <Section surface="ice" tight>
        <div className="tile-grid">
          {PROOF_TIMELINE.map((m) => (
            <article className="tile" key={m.label}>
              <strong>{m.figure}</strong>
              <span>{m.label}</span>
            </article>
          ))}
        </div>
        <p className="small" style={{ marginTop: 20 }}>{PROOF_TIMELINE_NOTE}</p>
      </Section>

      {/* --------------------------------------------- relationship economics */}
      <Section>
        <SectionHead
          eyebrow="Economics"
          title="Every relationship should be clear about what it costs &mdash; and what you get."
          lead="HSE should be compared on total economics, not just cash price or headline equity. What matters is what the equity is granted for, when it is earned, what execution is included and how much founder control remains."
        />
        <CardGrid>
          {RELATIONSHIP_ECONOMICS.map((r) => (
            <Card key={r.name} title={r.name}>{r.body}</Card>
          ))}
        </CardGrid>
        <Qualifier>
          <strong>A comparison of models, not a specific offer.</strong>{' '}
          {RELATIONSHIP_ECONOMICS_NOTE} Pixelette&rsquo;s equity ceiling is a maximum agreed in
          advance, not a price. Final terms require valuation, scope and signed documentation.
        </Qualifier>
      </Section>

      {/* ----------------------------------------------------- proof rail */}
      <Section surface="ice" tight>
        <CardGrid>
          <article className="card">
            <RelationshipTag relationship={twoConnect.relationship} flagship />
            <h3 className="h3">{twoConnect.name}</h3>
            <p className="body">{twoConnect.oneLine}</p>
            <p><Link className="link flink" href="/portfolio/2connect">Explore 2Connect ↗</Link></p>
          </article>

          <article className="card">
            <RelationshipTag relationship={bic.relationship} />
            <h3 className="h3">{bic.name}</h3>
            <p className="body">{bic.oneLine}</p>
          </article>

          <article className="card">
            <RelationshipTag relationship={dav.relationship} />
            <h3 className="h3">{dav.name}</h3>
            <p className="body">{dav.oneLine}</p>
          </article>

          <Card title="Four integrated capabilities">
            <p>
              Product delivery, go-to-market systems, compliance readiness and portfolio governance
              brought into one operating model.
            </p>
            <p><Link className="link flink" href="/capabilities">Explore capabilities ↗</Link></p>
          </Card>
        </CardGrid>
      </Section>

      {/* ------------------------------------------------------ economics */}
      <Section>
        <SectionHead
          eyebrow="The HSE model"
          title="Cash funded delivery. Equity earned through execution."
          lead="How the money works, and why you keep more of your company: you fund an agreed portion of the work at a fair rate, and we may convert an eligible part of our fee into a capped, earned equity slice. We put in no cash and take no control, and a full-cash route is always open. The figures below are one worked example."
        />
        <div className="card-grid">
          {ECONOMICS.map((e) => (
            <article key={e.title} className="card">
              <p className="stat">{e.figure}</p>
              <h3 className="h3">{e.title}</h3>
              <p className="body">{e.body}</p>
            </article>
          ))}
        </div>
        <Qualifier>
          <p>
            <strong>One worked example, not a standard offer.</strong>{' '}
            {ECONOMICS_EXAMPLE_NOTE}
          </p>
          <p>
            <strong>Subject to eligibility and agreed terms.</strong>{' '}
            {STRUCTURES_QUALIFIER}
          </p>
        </Qualifier>
      </Section>

      {/* --------------------------------------------------- five gates */}
      <Section surface="navy">
        <SectionHead
          eyebrow="Stage-gated execution"
          title="Progress is earned at every stage."
          lead="We do not treat venture building as one long development contract. Each stage has a defined decision, output and evidence threshold. The venture progresses when the next investment of time, cash and equity is justified."
        />
        <div className="gate-list">
          {GATES.map((g) => (
            <article key={g.n} className="gate">
              <div className="gate-num">{g.n}</div>
              <div>
                <h3 className="h3">{g.name}</h3>
                <p className="body">{g.body}</p>
                <dl>
                  <div><dt>Evidence produced</dt><dd>{g.evidence}</dd></div>
                  <div><dt>Decision</dt><dd>{g.decision}</dd></div>
                </dl>
                {g.note ? <p className="small">{g.note}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------- portfolio */}
      <Section>
        <SectionHead
          eyebrow="Proof, properly classified"
          title="Every relationship shown for what it is."
          lead="Our portfolio separates equity investments, direct HSE ventures, projects in development, delivered work and capital relationships. Classification creates credibility. It does not hide weak evidence behind a mixed logo wall."
        />
        <div className="taxonomy">
          <div><p><strong>Equity Investments</strong></p><p>Founder-confirmed equity interests, with final documentary and legal checks completed before publication.</p></div>
          <div><p><strong>Direct HSE Ventures</strong></p><p>Ventures selected for the Pixelette HSE portfolio.</p></div>
          <div><p><strong>Projects in Development</strong></p><p>Current portfolio projects described without implying ownership, completion or a guaranteed outcome.</p></div>
          <div><p><strong>Delivered Ventures</strong></p><p>Companies or products for which a Pixelette capability delivered evidenced work, without implying equity.</p></div>
          <div><p><strong>Capital and Strategic Partners</strong></p><p>Organisations connected to capital, policy or institutional work, without implying ownership.</p></div>
        </div>
        <Buttons>
          <Btn href="/portfolio">Explore the portfolio</Btn>
        </Buttons>
      </Section>

      {/* ------------------------------------------------------ 2Connect */}
      <Section surface="deep">
        <SectionHead
          eyebrow="Flagship direct HSE venture · Agentic AI"
          title="2Connect: intent led AI for better introductions."
          lead="A networking agent built around a simple idea: people should meet because the connection makes sense for both sides. Users express what they need, the platform evaluates reciprocal fit, and each suggested match includes an explanation."
        />
        <div className="tile-strip">
          <div className="tile"><strong>12</strong><span>project repositories</span></div>
          <div className="tile"><strong>1,891</strong><span>measured commits</span></div>
          <div className="tile"><strong>122</strong><span>active development days</span></div>
          <div className="tile"><strong>~217k</strong><span>lines of current code</span></div>
          <div className="tile"><strong>95</strong><span>AI/backend test files</span></div>
        </div>
        <p className="small">
          CONSENT GATE, repository-derived measures, not revenue, user-growth or commercial-outcome
          claims. Client publication consent is required before any public release of these figures,
          screens, outcomes or founder quotes.
        </p>
        <Buttons>
          <Btn href="/portfolio/2connect">Explore 2Connect</Btn>
          <Btn href="/apply" variant="secondary">Check if you qualify</Btn>
        </Buttons>
      </Section>

      {/* -------------------------------------------------- capabilities */}
      <Section surface="ice">
        <SectionHead
          eyebrow="One partner, the whole way"
          title="We don&rsquo;t just ship software. We build it, launch it, and get it enterprise ready."
          lead="Most builders hand you a product and walk away. Pixelette takes you the whole journey, build, go-to-market and enterprise readiness, and you keep control the entire time."
        />
        <CardGrid>
          {CAPABILITIES.map((c) => (
            <article key={c.capability} className="card">
              <CapabilityBrand name={c.capability} />
              <p className="eyebrow">{c.n} · {c.capability}</p>
              <h3 className="h3">{c.arm}</h3>
              <p className="body">{c.body}</p>
              {c.url.startsWith('http') ? (
                <p>
                  <a className="link flink" href={c.url} target="_blank" rel="noopener noreferrer">
                    Visit {c.arm.replace(' Ltd', '')} ↗
                  </a>
                </p>
              ) : null}
            </article>
          ))}
        </CardGrid>
      </Section>

      {/* ------------------------------------------------- operating model */}
      <Section>
        <SectionHead
          eyebrow="Operating model"
          title="Execution is the product, not advice."
          lead="Founders do not need another deck, mentor network or strategy workshop. They need accountable specialists moving defined outcomes forward. Our model is built around delivery that can be evidenced, accepted and linked to venture milestones."
        />
        <ul className="list">
          {OPERATING_MODEL.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------- institutional standing */}
      <Section surface="ice">
        <SectionHead
          eyebrow="Network and reach"
          title="Built inside a wider innovation ecosystem."
          lead="Pixelette Holdings engages across technology, industry, academic and innovation-policy networks. For selected portfolio companies, that can create useful routes to expertise, strategic introductions and market insight while every commercial, investment and governance decision remains independently made."
        />
        <ul className="list">
          {ECOSYSTEM.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <p className="small">{ECOSYSTEM_NOTE}</p>
      </Section>

      {/* --------------------------------------------------- credentials */}
      <Section surface="ice" tight>
        <p className="eyebrow cred-eyebrow">Verified credentials</p>
        <Credentials />
      </Section>

      {/* ------------------------------------------------------- charter */}
      <Section>
        <SectionHead
          eyebrow="Alignment that can be understood"
          title="You keep control. Your equity is earned, never taken."
          lead="HSE is built to remove the fears founders have about giving equity to a delivery partner: a capped ceiling agreed before we start, equity earned only against accepted work, and the right to buy us out at fair value."
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

      {/* --------------------------------------------------- testimonials */}
      <Section surface="navy">
        <SectionHead
          eyebrow="Trusted by founders"
          title="Founders who built with us, in their words."
          lead="Real founders across the portfolio on what the Hybrid Sweat Equity partnership changed for them."
        />
        <Testimonials items={TESTIMONIALS} />
      </Section>

      {/* ----------------------------------------------------------- fit */}
      <Section surface="ice">
        <SectionHead eyebrow="Is HSE the right route?" title="Built for founders ready to execute." />
        <div className="two-col">
          <article>
            <h3 className="h3">Good fit</h3>
            <ul className="list">
              <li>A defined problem with a plausible commercial market.</li>
              <li>A committed founder or operator.</li>
              <li>A buildable technology opportunity.</li>
              <li>Capital available for the agreed cash delivery portion.</li>
              <li>Willingness to consider a structured cash and equity partnership.</li>
            </ul>
          </article>
          <article>
            <h3 className="h3">Not currently a fit</h3>
            <ul className="list list-cross">
              <li>The primary request is for Pixelette to provide or find cash.</li>
              <li>There is no committed operator.</li>
              <li>No capital is available for professional execution.</li>
              <li>The opportunity cannot yet be scoped or validated.</li>
              <li>The founder expects guaranteed customers, revenue or fundraising.</li>
            </ul>
          </article>
        </div>
      </Section>

      <ConversionClose />
    </>
  );
}
