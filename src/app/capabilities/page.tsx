import type { Metadata } from 'next';
import {
  Section, SectionHead, PageHero, Buttons, Btn, CardGrid, Card, Qualifier,
} from '@/components/ui';
import { CapabilityBrand } from '@/components/CapabilityBrand';

export const metadata: Metadata = {
  title: 'Capabilities | Build, Launch, Assure, Own',
  description:
    'Four integrated Pixelette capabilities operating as a single venture-building system rather than four separate suppliers a founder has to coordinate.',
  alternates: { canonical: '/capabilities' },
};

/**
 * Capability detail.
 *
 * The naming discipline in `content/site.ts` applies here too: Pixelette
 * Marketing carries no "Ltd" and Pixelette Certified is never described as a
 * registered company or an awarding body. Both qualifiers below are load-bearing.
 */
const CAPABILITY_DETAIL = [
  {
    id: 'build',
    n: '01 · Build',
    arm: 'Pixelette Technologies Ltd',
    lead: 'Product, AI, blockchain, architecture, engineering, infrastructure, security and launch-ready technology.',
    surface: 'warm' as const,
    cards: [
      ['Product and UX', 'Product strategy, definition and interface design against explicit acceptance criteria.'],
      ['Engineering', 'Architecture, backend, web and mobile delivery across modern production stacks.'],
      ['AI and data', 'Applied AI services, retrieval, orchestration and evaluation as engineered components.'],
      ['Infrastructure and security', 'CI/CD, infrastructure-as-code, security decisions and quality assurance evidence.'],
    ],
  },
  {
    id: 'launch',
    n: '02 · Launch',
    arm: 'Pixelette Marketing',
    lead: 'Positioning, brand, campaigns, demand generation, sales infrastructure, partnerships and early traction. The contracted work is the commercialisation system, customers, revenue and product-market fit are never guaranteed.',
    surface: 'ice' as const,
    cards: [
      ['Positioning and ICP', 'Offer design, ideal-customer definition and the commercial narrative.'],
      ['Launch assets', 'Commercial website, sales materials and campaign creative.'],
      ['Demand systems', 'Outbound design, CRM structure, pipeline records and pilot strategy.'],
      ['Traction measurement', 'Evidence of activity and learning, reported honestly against the agreed plan.'],
    ],
    qualifier: (
      <>
        <strong>Naming rule.</strong> Pixelette Marketing is named throughout the commercial site as the
        group&rsquo;s Launch capability. Company-registration wording is not used on legal pages until
        restoration is independently evidenced.
      </>
    ),
  },
  {
    id: 'assure',
    n: '03 · Assure',
    arm: 'Pixelette Certified capability',
    lead: 'Security, governance, compliance implementation, certification readiness and evidence preparation.',
    surface: 'warm' as const,
    cards: [
      ['Readiness assessment', 'Gap register, control design and a proportionate remediation plan.'],
      ['Implementation support', 'Policy, evidence and operational adoption support with named owners.'],
      ['Audit preparation', 'Evidence packs organised for third-party scrutiny and enterprise procurement.'],
      ['Enterprise readiness', 'Security and governance posture suitable for regulated buyers.'],
    ],
    qualifier: (
      <>
        <strong>Independent certification remains external.</strong> Pixelette prepares organisations
        for certification; it does not award independent ISO certification or accreditation.
      </>
    ),
  },
  {
    id: 'own',
    n: '04 · Own',
    arm: 'Pixelette Holdings Ltd',
    lead: 'Venture selection, commercial structuring, services-for-equity participation, governance and capital readiness.',
    surface: 'ice' as const,
    cards: [
      ['Selection', 'Qualification, fit assessment and the investment-committee decision.'],
      ['Structuring', 'Stage ceilings, milestone definition, vesting and clawback design.'],
      ['Governance', 'Portfolio review, KPI visibility and honest gate reporting.'],
      ['Capital readiness', 'Evidence-room structure and diligence support, without promising an outcome.'],
    ],
  },
];

const GROUP_URLS: Record<string, string> = {
  build: 'https://pixelettetech.com/',
  launch: 'https://pixelettemarketing.com/',
  assure: 'https://pixelettecertified.com/',
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Capabilities' }]}
        eyebrow="One partner, the whole way"
        title="Four capabilities. One venture-building system."
        lead="Most builders hand you a product and walk away. Pixelette takes you the whole way, we build it, take it to market, and get it enterprise-ready, and you keep control the entire time."
      >
        <Buttons>
          <Btn href="/apply">Check if you qualify</Btn>
          <Btn href="/hse-model" variant="secondary">Explore the HSE model</Btn>
        </Buttons>
      </PageHero>

      {CAPABILITY_DETAIL.map((c) => (
        <Section key={c.id} id={c.id} surface={c.surface}>
          <CapabilityBrand name={c.id.charAt(0).toUpperCase() + c.id.slice(1)} />
          <SectionHead eyebrow={c.n} title={c.arm} lead={c.lead} />
          <CardGrid>
            {c.cards.map(([title, body]) => (
              <Card key={title} title={title as string}>{body}</Card>
            ))}
          </CardGrid>
          {GROUP_URLS[c.id] ? (
            <p style={{ marginTop: 26 }}>
              <a className="link flink" href={GROUP_URLS[c.id]} target="_blank" rel="noopener noreferrer">
                Visit {c.arm.replace(' Ltd', '').replace(' capability', '')} ↗
              </a>
            </p>
          ) : null}
          {c.qualifier ? <Qualifier>{c.qualifier}</Qualifier> : null}
        </Section>
      ))}

      <Section surface="deep">
        <SectionHead
          eyebrow="Next step"
          title="Need the whole system, not one supplier?"
          lead="If you would rather retain equity, the same capabilities are available on full-cash professional delivery."
          light
        />
        <Buttons>
          <Btn href="/apply">Check if you qualify</Btn>
          <Btn href="/contact" variant="secondary">Discuss full-cash delivery</Btn>
        </Buttons>
      </Section>
    </>
  );
}
