import type { Metadata } from 'next';
import {
  Section, SectionHead, PageHero, Buttons, Btn, CardGrid, Card, Qualifier,
} from '@/components/ui';
import { GROUP } from '@/content/site';

export const metadata: Metadata = {
  title: 'About | An execution-led venture-building group',
  description:
    'Pixelette Holdings selects a small number of technology ventures each year and builds them through a defined operating system, not a fund, not an agency, and not an accelerator making funding promises.',
  alternates: { canonical: '/about' },
};

const PHILOSOPHY = [
  ['Selective by design', 'Capacity is deliberately limited. Ventures enter through qualification and an investment-committee decision.'],
  ['Evidence over assertion', 'Claims are classified by evidence status before external use. Where proof is not attached, the claim is held.'],
  ['Aligned, not extractive', 'Equity is earned against accepted delivery and returns when delivery stops. A full-cash route is always available.'],
  ['Honest about limits', 'No promise of customers, revenue, certification or fundraising. What is contracted is the work.'],
] as const;

const CREDENTIALS = [
  {
    title: 'Quality and security standards',
    body: 'ISO 9001, ISO 27001 and Cyber Essentials accreditations held within the group.',
  },
  {
    title: 'Policy ecosystem',
    body: "Secretariat to the UK Parliament's All-Party Parliamentary Group on Artificial Intelligence; previously Secretariat to the APPG on Blockchain.",
  },
  {
    title: 'Innovation ecosystem',
    body: 'An equity interest in Big Innovation Centre, connecting the portfolio to an established innovation and policy organisation.',
  },
  {
    title: 'International reach',
    body: "Delivery experience across multiple markets through the group's technology arm.",
  },
];

/**
 * Group architecture rendered from `GROUP`.
 *
 * The company-number line appears only where `isRegisteredCompany` is true, so
 * a registration claim cannot be attached to a brand by editing copy.
 */
const ARCHITECTURE = [
  { entity: GROUP.technologies, body: 'Product, AI, blockchain, architecture, engineering and infrastructure.' },
  { entity: GROUP.marketing, body: "The group's Launch and go-to-market capability. Positioning, campaigns, demand generation and early traction." },
  { entity: GROUP.certified, body: 'A capability and service brand for compliance readiness, security and governance preparation. Independent certification remains external.' },
  { entity: GROUP.holdings, body: 'Venture selection, structuring, governance and capital readiness.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        eyebrow="About Pixelette Holdings"
        title="An execution-led venture-building group."
        lead="Pixelette Holdings selects a small number of technology ventures each year and builds them through a defined operating system, not a fund, not an agency, and not an accelerator making funding promises."
      >
        <Buttons>
          <Btn href="/apply">Check if you qualify</Btn>
          <Btn href="/portfolio" variant="secondary">Explore the portfolio</Btn>
        </Buttons>
      </PageHero>

      <Section>
        <SectionHead
          eyebrow="Operating philosophy"
          title="Build the company, not just the product."
          lead="Most ventures fail somewhere between a working product and a business that can withstand scrutiny. The group is organised around closing that distance: technology, commercialisation, assurance and governance under one operating model, with the incentive aligned through earned equity."
        />
        <CardGrid>
          {PHILOSOPHY.map(([title, body]) => (
            <Card key={title} title={title}>{body}</Card>
          ))}
        </CardGrid>
      </Section>

      <Section surface="ice">
        <SectionHead
          eyebrow="Group architecture"
          title="Four capabilities, correctly named."
          lead="Capability names and legal-entity names are deliberately not used interchangeably."
        />
        <div className="taxonomy">
          {ARCHITECTURE.map(({ entity, body }) => (
            <div key={entity.name}>
              <p>
                <strong>
                  {entity.capability}: {entity.name}
                </strong>
              </p>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <Qualifier>
          <strong>Naming discipline.</strong> &ldquo;Pixelette Group&rdquo; is an umbrella brand.
          Company-registration wording is used only where a registered company exists and is verified
          at Companies House.
        </Qualifier>
      </Section>

      <Section>
        <SectionHead eyebrow="Credentials" title="Verified, not asserted." />
        <CardGrid>
          {CREDENTIALS.map((c) => (
            <article key={c.title} className="card">
              <h3 className="h3">{c.title}</h3>
              <p className="body">{c.body}</p>
            </article>
          ))}
        </CardGrid>
      </Section>

      <Section surface="deep">
        <SectionHead eyebrow="Next step" title="Think your venture fits?" />
        <Buttons>
          <Btn href="/apply">Check if you qualify</Btn>
          <Btn href="/hse-model" variant="secondary">Explore the HSE model</Btn>
        </Buttons>
      </Section>
    </>
  );
}
