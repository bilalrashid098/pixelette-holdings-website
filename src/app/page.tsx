import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  Section, SectionHead, Buttons, Btn, CardGrid, RelationshipTag,
} from '@/components/ui';
import { Testimonials } from '@/components/Testimonials';
import { ventures } from '@/content/ventures';
import { HOMEPAGE_TESTIMONIALS } from '@/content/testimonials';
import { FOOTER_NOTICE } from '@/content/site';
import { Orbit } from '@/components/Orbit';

export const metadata: Metadata = {
  title: 'HSE venture partnership',
  description:
    'Pixelette Holdings partners with selected founders to develop, launch and grow technology ventures through its Hybrid Sweat Equity model.',
  openGraph: {
    title: 'Pixelette Holdings | HSE venture partnership',
    description:
      'Pixelette Holdings partners with selected founders to develop, launch and grow technology ventures through its Hybrid Sweat Equity model.',
  },
  twitter: {
    title: 'Pixelette Holdings | HSE venture partnership',
    description:
      'Pixelette Holdings partners with selected founders to develop, launch and grow technology ventures through its Hybrid Sweat Equity model.',
  },
};

const STAGES = ['Validate', 'Design', 'Build', 'Launch', 'Grow'] as const;

const GROUP = [
  {
    name: 'Pixelette Holdings',
    body: 'Venture partnerships, equity structures and group coordination',
    mark: '/media/brand/mark-holdings.png',
    href: null,
  },
  {
    name: 'Pixelette Technologies',
    body: 'Software engineering, AI, automation and blockchain',
    mark: '/media/brand/mark-technologies.png',
    href: 'https://pixelettetech.com/',
  },
  {
    name: 'Pixelette Marketing',
    body: 'Brand, marketing strategy and commercial growth',
    mark: '/media/brand/mark-marketing.svg',
    href: 'https://pixelettemarketing.com/',
  },
  {
    name: 'Pixelette Certified',
    body: 'Compliance, assurance and enterprise readiness',
    // Approved green tree logo is not in the project. Leave the slot empty.
    mark: null,
    href: 'https://pixelettecertified.com/',
  },
] as const;

const HSE_POINTS = [
  {
    title: 'Agreed cash contribution',
    body: 'The cash fee is agreed individually for each venture.',
  },
  {
    title: 'Professional delivery',
    body: 'Pixelette provides the professional services described in the agreed scope.',
  },
  {
    title: 'Contractual equity participation',
    body: 'Any equity participation is set out in the relevant agreements, for Pixelette or the relevant Pixelette group entity.',
  },
  {
    title: 'Milestones and governance',
    body: 'Milestones, founder rights and decision-making arrangements are documented for the venture.',
  },
] as const;

const DELIVERY = [
  {
    n: '01',
    name: 'Validate',
    body: 'Test the problem, the customer and the commercial case before delivery begins.',
  },
  {
    n: '02',
    name: 'Design',
    body: 'Set the product, the commercial model and the milestones that will guide the work.',
  },
  {
    n: '03',
    name: 'Build',
    body: 'Deliver the agreed product to the scope and acceptance criteria set in advance.',
  },
  {
    n: '04',
    name: 'Launch',
    body: 'Prepare the go-to-market assets and operating workflows the venture needs to enter the market.',
  },
  {
    n: '05',
    name: 'Grow',
    body: 'Continue delivery as the venture strengthens its product, operations and commercial position.',
  },
] as const;

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

function GroupMark({ src }: { src: string | null }) {
  if (!src) return <span className="cap-mark" aria-hidden="true" />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="cap-mark" src={src} alt="" />;
}

export default function HomePage() {
  const twoConnect = ventures.find((v) => v.slug === '2connect')!;
  const dav = ventures.find((v) => v.slug === 'digital-asset-vault')!;

  return (
    <>
      <section className="hero wash-left">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Pixelette Holdings</p>
            <h1 className="h1">Build your venture with the people who deliver it</h1>
            <p className="lead">
              Pixelette Holdings partners with selected founders to develop, launch and grow
              technology ventures. Through our Hybrid Sweat Equity model, we combine agreed cash
              contributions with equity participation, bringing together engineering, marketing,
              enterprise readiness and venture governance.
            </p>
            <Buttons>
              <Btn href="#hybrid-sweat-equity">Explore Hybrid Sweat Equity</Btn>
              <Btn href="/contact" variant="secondary">Discuss your venture</Btn>
            </Buttons>
            <ol className="stage-seq" aria-label="Delivery sequence">
              {STAGES.map((stage) => (
                <li key={stage}>{stage}</li>
              ))}
            </ol>
          </div>
          <Orbit />
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="The group"
          title="One venture partner, three specialist businesses"
          lead="Pixelette Holdings coordinates venture relationships, equity structures and group governance. Pixelette Technologies, Pixelette Marketing and Pixelette Certified deliver engineering, commercial growth and enterprise readiness."
        />
        <div className="quad-grid">
          {GROUP.map((company) => (
            <article key={company.name} className="card">
              <GroupMark src={company.mark} />
              <h3 className="h3">{company.name}</h3>
              <p className="body">{company.body}</p>
              {company.href ? (
                <p>
                  <ExtLink href={company.href}>Visit {company.name}</ExtLink>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      <Section surface="ice" id="hybrid-sweat-equity">
        <SectionHead
          eyebrow="Hybrid Sweat Equity"
          title="A partnership built around delivery and shared interests"
          lead="Pixelette contributes agreed professional services in exchange for a combination of cash fees and equity participation. The allocation of equity, milestone conditions, founder rights and governance arrangements are established in the relevant commercial and shareholder agreements."
        />
        <div className="quad-grid">
          {HSE_POINTS.map((point) => (
            <article key={point.title} className="card">
              <h3 className="h3">{point.title}</h3>
              <p className="body">{point.body}</p>
            </article>
          ))}
        </div>
        <p className="body home-follow">
          Each arrangement is individually negotiated. Delivery scope and milestones are agreed in
          advance, and equity participation is linked to the contractual terms and the delivery
          arrangements for that venture. Governance, ownership and decision rights are documented.
          The precise commercial model depends on the venture and its circumstances.
        </p>
        <p className="body home-follow">
          <a className="link" href="/hse-model">How the partnership works</a>
          {' '}is set out on the Hybrid Sweat Equity page.{' '}
          <a className="link" href="/hse-model#protecting-the-partnership">Founder rights and governance</a>
          {' '}are covered on that page.
        </p>
      </Section>

      <Section>
        <SectionHead
          eyebrow="From idea to launch"
          title="Progress through defined milestones"
          lead="Five stages take a selected venture from an early idea towards a position where it can grow. The purpose of each stage is agreed before the work for that stage begins."
        />
        <div className="steps">
          {DELIVERY.map((stage) => (
            <article key={stage.n} className="step">
              <b>{stage.n}</b>
              <div>
                <h3 className="h3">{stage.name}</h3>
                <p className="body">{stage.body}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="home-follow">
          <a className="link" href="/hse-model#how-it-works">See the delivery methodology</a>
        </p>
      </Section>

      <Section surface="ice">
        <SectionHead
          eyebrow="Portfolio"
          title="Clear distinctions across our portfolio"
          lead="A short selection of ventures and relationships. Each reference is classified according to the relationship that can be described from the evidence held."
        />
        <CardGrid>
          <article className="card">
            <RelationshipTag relationship={twoConnect.relationship} flagship={twoConnect.flagship} />
            <h3 className="h3">{twoConnect.name}</h3>
            <p className="body">{twoConnect.oneLine}</p>
            <p>
              <a className="link" href="/portfolio#2connect">Explore 2Connect</a>
            </p>
          </article>

          <article className="card">
            <p className="eyebrow">Founder relationship</p>
            <h3 className="h3">Big Innovation Centre</h3>
            <p className="body">
              Pixelette Holdings&rsquo; founder is also a founder and shareholder of Big Innovation
              Centre. The reference is shown as that personal relationship.
            </p>
            <p>
              <ExtLink href="https://biginnovationcentre.com/">Big Innovation Centre</ExtLink>
            </p>
          </article>

          <article className="card">
            <RelationshipTag relationship={dav.relationship} />
            <h3 className="h3">{dav.name}</h3>
            <p className="body">
              A direct Hybrid Sweat Equity venture in the portfolio, concerned with secure
              digital-asset storage and related services.
            </p>
          </article>
        </CardGrid>
        <p className="home-follow">
          <a className="link" href="/portfolio">Explore the portfolio</a>
        </p>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Credentials"
          title="Group credentials and relationships"
          lead="Certifications, institutional relationships and founder experiences are set out under separate headings."
        />

        <div className="home-block">
          <h3 className="h3">Quality and information security</h3>
          <p className="body">
            ISO 9001 and ISO/IEC 27001 certifications are held by Pixelette Technologies, reflecting
            recognised standards for quality and information security management.
          </p>
          <ul className="cred-list">
            <li>
              <strong>ISO 9001</strong>
              <span>Quality management</span>
            </li>
            <li>
              <strong>ISO/IEC 27001</strong>
              <span>Information security management</span>
            </li>
          </ul>
        </div>

        <div className="home-block">
          <h3 className="h3">Innovation and strategic relationships</h3>
          <p className="body">
            Pixelette Holdings&rsquo; founder is also a founder and shareholder of{' '}
            <ExtLink href="https://biginnovationcentre.com/">Big Innovation Centre</ExtLink>, an
            organisation active in innovation, technology and artificial intelligence.{' '}
            <ExtLink href="https://biginnovationcentre.com/">Big Innovation Centre</ExtLink>
            {' '}serves as Secretariat to the{' '}
            <ExtLink href="https://bicpavilion.com/about_pavilion/appg-artificial-intelligence">
              All-Party Parliamentary Group on Artificial Intelligence
            </ExtLink>{' '}
            (APPG AI).
          </p>
          <p className="small home-follow">
            The relationship does not imply endorsement of Pixelette Holdings by the APPG, UK
            Parliament or the UK Government.
          </p>
        </div>

        <div className="home-block">
          <h3 className="h3">Founders and partners, in their words</h3>
          <p className="body">
            Real founders across the portfolio on what the Hybrid Sweat Equity partnership changed
            for them.
          </p>
          <Testimonials items={HOMEPAGE_TESTIMONIALS} />
        </div>
      </Section>

      <Section surface="ice">
        <SectionHead
          eyebrow="Capital relationships"
          title="Strategic capital relationships"
          lead="Pixelette Holdings develops relationships with investors and strategic capital partners to support selected ventures. Any potential investment discussions are considered individually and are subject to appropriate eligibility checks, due diligence and legal requirements."
        />
        <Buttons>
          <Btn href="/contact">Discuss a strategic partnership</Btn>
        </Buttons>
        <p className="small home-follow">{FOOTER_NOTICE}</p>
      </Section>

      <Section surface="deep">
        <SectionHead
          eyebrow="Next step"
          title="Build your next venture with Pixelette"
          lead="Tell us what you are building, the progress you have made and where additional delivery capability could make a difference. Our team will review the opportunity and discuss the next steps with you."
        />
        <Buttons>
          <Btn href="/apply">Start your venture assessment</Btn>
          <Btn href="/contact" variant="secondary">Contact Pixelette Holdings</Btn>
        </Buttons>
      </Section>
    </>
  );
}
