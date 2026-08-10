import Link from 'next/link';
import {
  Section, SectionHead, Buttons, Btn, CardGrid, Card,
  Qualifier, RelationshipTag, ConversionClose,
} from '@/components/ui';
import { Testimonials } from '@/components/Testimonials';
import {
  ECONOMICS, GATES, CAPABILITIES, FOUNDER_CHARTER, CEILINGS_QUALIFIER,
  PROOF_TIMELINE, PROOF_TIMELINE_NOTE, INSTITUTIONAL, WHY_CHOOSE,
} from '@/content/hse';
import { ventures } from '@/content/ventures';
import { TESTIMONIALS } from '@/content/testimonials';
import { CapabilityBrand } from '@/components/CapabilityBrand';
import { Credentials } from '@/components/Credentials';

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
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow light">Hybrid Sweat Equity · Build it, launch it, own it</p>
            <h1 className="display">Build and launch your company, without giving a studio a quarter of it.</h1>
            <p className="lead light">
              Venture studios can look cash-free up front, then cost you 25&ndash;90% of your company.
              Pixelette gives you the build team, the launch, and the enterprise-readiness work for a
              clear fee plus a capped, earned share of the upside. You approve every stage, you keep
              control, and you can buy us out at fair value.
            </p>
            <Buttons>
              <Btn href="/apply">Check if you qualify</Btn>
              <Btn href="/hse-model" variant="secondary">Compare what you keep</Btn>
            </Buttons>
            <p className="consent-note">
              Selective entry. Clear fees. Capped upside. You keep control.
            </p>
          </div>

          <div
            className="orbit"
            role="img"
            aria-label="Four integrated Pixelette capabilities: Build, Launch, Assure and Own"
          >
            <div className="orbit-ring" />
            <div className="orbit-ring two" />
            <div className="orbit-core">
              <div>
                <strong>HSE</strong>
                <span>Execution engine</span>
              </div>
            </div>
            <div className="orbit-node node-build"><span>01 · Build</span><strong>Technology</strong></div>
            <div className="orbit-node node-launch"><span>02 · Launch</span><strong>Marketing</strong></div>
            <div className="orbit-node node-assure"><span>03 · Assure</span><strong>Certified</strong></div>
            <div className="orbit-node node-own"><span>04 · Own</span><strong>Holdings</strong></div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- proof timeline */}
      <Section surface="ice" tight>
        <div className="economics-grid">
          {PROOF_TIMELINE.map((m) => (
            <article className="economics-card" key={m.label}>
              <div className="number">{m.figure}</div>
              <h3>{m.label}</h3>
            </article>
          ))}
        </div>
        <p className="consent-note" style={{ marginTop: 20 }}>{PROOF_TIMELINE_NOTE}</p>
      </Section>

      {/* ------------------------------------------- why not a free studio */}
      <Section>
        <SectionHead
          eyebrow="The real cost of &ldquo;free&rdquo;"
          title="&ldquo;Free&rdquo; build can be the most expensive capital you ever take."
          lead="A studio that fronts the build for no cash is paid in ownership of your company, typically a quarter to the majority of it, and often the control that comes with it. With Pixelette you pay for the work, share a capped and earned slice of the upside, and stay the owner."
        />
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">What you give up</th>
              <th scope="col">A typical venture studio</th>
              <th scope="col">Pixelette HSE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Equity taken</td>
              <td>25&ndash;90% of your company</td>
              <td>Capped at 12/20/30% by stage, a ceiling, never automatic</td>
            </tr>
            <tr>
              <td>Control</td>
              <td>Often negotiated away</td>
              <td>You keep operating control</td>
            </tr>
            <tr>
              <td>Getting them out</td>
              <td>Rarely, locked in as major owners</td>
              <td>Full-cash route, or buy the earned stake back at fair value</td>
            </tr>
            <tr>
              <td>Cash up front</td>
              <td>Little or none</td>
              <td>A clear fee that covers the work, across milestones</td>
            </tr>
          </tbody>
        </table>
        <Qualifier>
          <strong>A comparison of models, not a specific offer.</strong> Figures describe common
          venture-studio structures; Pixelette&rsquo;s stage ceilings are maxima, not prices. Final
          terms require valuation, scope and signed documentation.
        </Qualifier>
      </Section>

      {/* ----------------------------------------------------- proof rail */}
      <Section surface="ice" tight>
        <CardGrid>
          <article className="p-card">
            <RelationshipTag relationship={twoConnect.relationship} flagship />
            <h3>{twoConnect.name}</h3>
            <p>{twoConnect.oneLine}</p>
            <p style={{ marginTop: 14 }}><Link href="/portfolio/2connect">Explore 2Connect ↗</Link></p>
          </article>

          <article className="p-card">
            <RelationshipTag relationship={bic.relationship} />
            <h3>{bic.name}</h3>
            <p>{bic.oneLine}</p>
          </article>

          <article className="p-card">
            <RelationshipTag relationship={dav.relationship} />
            <h3>{dav.name}</h3>
            <p>{dav.oneLine}</p>
          </article>

          <Card title="Four integrated capabilities">
            <p>
              Product delivery, go-to-market systems, compliance readiness and portfolio governance
              brought into one operating model.
            </p>
            <p style={{ marginTop: 14 }}><Link href="/capabilities">Explore capabilities ↗</Link></p>
          </Card>
        </CardGrid>
      </Section>

      {/* ------------------------------------------------------ economics */}
      <Section>
        <SectionHead
          eyebrow="The HSE model"
          title="Cash-funded delivery. Equity earned through execution."
          lead="How the money works, and why you keep more of your company: you fund the work at a fair rate, and we may convert an eligible part of our fee into a capped, earned equity slice. We put in no cash and take no control, and a full-cash route is always open."
        />
        <div className="economics-grid">
          {ECONOMICS.map((e) => (
            <article key={e.title} className="economics-card">
              <div className="number">{e.figure}</div>
              <h3>{e.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginTop: 10 }}>{e.body}</p>
            </article>
          ))}
        </div>
        <Qualifier>
          <strong>The 30%, 20% and 12% figures are maximum stage ceilings, not automatic offers.</strong>{' '}
          {CEILINGS_QUALIFIER}
        </Qualifier>
      </Section>

      {/* --------------------------------------------------- five gates */}
      <Section surface="navy">
        <SectionHead
          eyebrow="One system · five decision gates"
          title="Progress is earned at every stage."
          lead="Each stage produces evidence and a fresh go, revise or stop decision. Neither party is committed to a weak next phase simply because the previous phase was completed."
          light
        />
        <div className="gate-list">
          {GATES.map((g) => (
            <article key={g.n} className="gate">
              <div className="gate-num">{g.n}</div>
              <div>
                <h3>{g.name}</h3>
                <p>{g.body}</p>
                <dl>
                  <div><dt>Evidence produced</dt><dd>{g.evidence}</dd></div>
                  <div><dt>Decision</dt><dd>{g.decision}</dd></div>
                </dl>
                {g.note ? <p className="consent-note">{g.note}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------ 2Connect */}
      <Section surface="deep">
        <SectionHead
          eyebrow="Flagship direct HSE venture · Agentic AI"
          title="2Connect: intent-led AI for better introductions."
          lead="A networking agent built around a simple idea: people should meet because the connection makes sense for both sides. Users express what they need, the platform evaluates reciprocal fit, and each suggested match includes an explanation."
          light
        />
        <div className="metric-strip">
          <div className="metric"><strong>12</strong><span>project repositories</span></div>
          <div className="metric"><strong>1,891</strong><span>measured commits</span></div>
          <div className="metric"><strong>122</strong><span>active development days</span></div>
          <div className="metric"><strong>~217k</strong><span>lines of current code</span></div>
          <div className="metric"><strong>95</strong><span>AI/backend test files</span></div>
        </div>
        <p className="consent-note">
          CONSENT GATE, repository-derived measures, not revenue, user-growth or commercial-outcome
          claims. Client publication consent is required before any public release of these figures,
          screens, outcomes or founder quotes.
        </p>
        <div style={{ marginTop: 30 }}>
          <Buttons>
            <Btn href="/portfolio/2connect">Explore 2Connect</Btn>
            <Btn href="/apply" variant="secondary">Check if you qualify</Btn>
          </Buttons>
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
        <div style={{ marginTop: 34 }}>
          <Buttons>
            <Btn href="/portfolio" variant="ghost">Explore the portfolio</Btn>
          </Buttons>
        </div>
      </Section>

      {/* -------------------------------------------------- capabilities */}
      <Section surface="ice">
        <SectionHead
          eyebrow="One partner, the whole way"
          title="We don&rsquo;t just ship software. We build it, launch it, and get it enterprise-ready."
          lead="Most builders hand you a product and walk away. Pixelette takes you the whole journey, build, go-to-market and enterprise-readiness, and you keep control the entire time."
        />
        <CardGrid>
          {CAPABILITIES.map((c) => (
            <article key={c.capability} className="p-card">
              <CapabilityBrand name={c.capability} />
              <p className="eyebrow">{c.n} · {c.capability}</p>
              <h3>{c.arm}</h3>
              <p>{c.body}</p>
              {c.url.startsWith('http') ? (
                <p style={{ marginTop: 14 }}>
                  <a className="card-link" href={c.url} target="_blank" rel="noopener noreferrer">
                    Visit {c.arm.replace(' Ltd', '')} ↗
                  </a>
                </p>
              ) : null}
            </article>
          ))}
        </CardGrid>
      </Section>

      {/* --------------------------------------------- why founders choose */}
      <Section>
        <SectionHead
          eyebrow="Why founders choose us"
          title="Execution most venture partners don&rsquo;t offer."
        />
        <CardGrid>
          {WHY_CHOOSE.map((w) => (
            <Card key={w.title} title={w.title}>{w.body}</Card>
          ))}
        </CardGrid>
      </Section>

      {/* ------------------------------------------- institutional standing */}
      <Section surface="ice">
        <SectionHead
          eyebrow="Institutional standing"
          title="More than a venture builder, a policy-credentialed institution."
          lead="Authority almost no venture builder can claim: a seat inside UK Parliament, an investment in a national innovation think tank, and enterprise-grade certification."
        />
        <CardGrid>
          {INSTITUTIONAL.map((c) => (
            <Card key={c.title} title={c.title}>{c.body}</Card>
          ))}
        </CardGrid>
      </Section>

      {/* --------------------------------------------------- credentials */}
      <Section surface="ice" tight>
        <p className="cred-eyebrow">Verified credentials</p>
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
          light
        />
        <Testimonials items={TESTIMONIALS} />
      </Section>

      {/* ----------------------------------------------------------- fit */}
      <Section surface="ice">
        <SectionHead eyebrow="Is HSE the right route?" title="Built for founders ready to execute." />
        <div className="two-col">
          <article>
            <h3>Good fit</h3>
            <ul className="tick-list">
              <li>A defined problem with a plausible commercial market.</li>
              <li>A committed founder or operator.</li>
              <li>A buildable technology opportunity.</li>
              <li>Capital available for the agreed cash delivery portion.</li>
              <li>Willingness to consider a structured cash and equity partnership.</li>
            </ul>
          </article>
          <article>
            <h3>Not currently a fit</h3>
            <ul className="cross-list">
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
