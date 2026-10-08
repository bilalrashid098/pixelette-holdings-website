import type { Metadata } from 'next';
import { Section, SectionHead, PageHero, Buttons, Btn } from '@/components/ui';
import { BIC_STATEMENT, CAPITAL_STATEMENT, FOOTER_GROUP, SITE } from '@/content/site';
import { ECOSYSTEM_NOTE } from '@/content/hse';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Pixelette Holdings coordinates venture partnerships for the Pixelette group. Technologies, Marketing and Certified deliver engineering, growth and enterprise readiness.',
  alternates: { canonical: '/about' },
};

const GROUP_COPY: Record<string, string> = {
  'Pixelette Holdings':
    'Coordinates venture partnerships, equity structures and group relationships. This website is the Holdings site.',
  'Pixelette Technologies':
    'Software engineering, AI, automation and product engineering. Delivery detail sits on the Technologies website.',
  'Pixelette Marketing':
    'Brand, marketing and commercial growth. Delivery detail sits on the Marketing website.',
  'Pixelette Certified':
    'Compliance readiness and enterprise readiness. Certified is a brand, not a registered company, and it does not itself award independent certification.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        eyebrow="About"
        title="Who we are"
        lead={`${SITE.name} coordinates venture partnerships for selected technology ventures. Engineering, commercial growth and enterprise readiness are delivered by the other businesses in the group.`}
      >
        <Buttons>
          <Btn href="/hse-model">Hybrid Sweat Equity</Btn>
          <Btn href="/contact" variant="secondary">Contact</Btn>
        </Buttons>
      </PageHero>

      <Section id="founder">
        <SectionHead
          eyebrow="Leadership"
          title="Our founder and leadership"
          lead="Founder ownership and corporate holdings are not the same thing. A personal shareholding is not an asset of Pixelette Holdings Ltd unless the corporate records say so."
        />
        <div className="prose">
          <p>
            Pixelette Holdings is led by its founder. {BIC_STATEMENT} That personal relationship is
            not described here as a direct equity investment by the company.
          </p>
          <p>
            Named leadership profiles are shown only with the person’s agreement and a confirmed role.
            None are published on this page.
          </p>
        </div>
      </Section>

      <Section surface="ice" id="the-group">
        <SectionHead
          eyebrow="The group"
          title="The Pixelette Group"
          lead="Four names, with the artwork used for each. Descriptions stay short. The specialist websites carry the service detail."
        />
        <div className="quad-grid">
          {FOOTER_GROUP.map((company) => (
            <article key={company.name} className="card">
              {company.mark ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="cap-mark" src={company.mark} alt="" />
              ) : (
                <span className="cap-mark" aria-hidden="true" />
              )}
              <h3 className="h3">{company.name}</h3>
              <p className="body">{GROUP_COPY[company.name]}</p>
              {company.href ? (
                <p>
                  <a className="link" href={company.href} target="_blank" rel="noopener noreferrer">
                    Visit {company.name}
                  </a>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      <Section id="credentials">
        <SectionHead
          eyebrow="Credentials"
          title="Credentials and relationships"
          lead="Certifications are named in text and attributed to the company that holds them. Third-party logos are not shown."
        />
        <div className="home-block">
          <h3 className="h3">Quality and information security</h3>
          <p className="body">
            ISO 9001 and ISO/IEC 27001 certifications are held by Pixelette Technologies, reflecting
            recognised standards for quality and information security management. They are not presented
            as certifications of Pixelette Holdings, or of every company in the group.
          </p>
          <ul className="cred-list">
            <li>
              <strong>ISO 9001</strong>
              <span>Quality management, Pixelette Technologies</span>
            </li>
            <li>
              <strong>ISO/IEC 27001</strong>
              <span>Information security management, Pixelette Technologies</span>
            </li>
          </ul>
        </div>
        <div className="home-block" id="relationships">
          <h3 className="h3">Big Innovation Centre and APPG AI</h3>
          <p className="body">
            {BIC_STATEMENT}{' '}
            <a className="link" href="https://biginnovationcentre.com/">Big Innovation Centre</a>
            {' '}serves as Secretariat to the{' '}
            <a className="link" href="https://bicpavilion.com/about_pavilion/appg-artificial-intelligence">
              All-Party Parliamentary Group on Artificial Intelligence
            </a>
            . That secretariat role belongs to Big Innovation Centre. It is not an appointment of
            Pixelette Holdings.
          </p>
          <p className="small">{ECOSYSTEM_NOTE}</p>
        </div>
        <div className="home-block">
          <h3 className="h3">Capital relationships</h3>
          <p className="body">{CAPITAL_STATEMENT}</p>
          <p>
            <a className="link" href="/contact#capital-relationships">Discuss a strategic partnership</a>
          </p>
        </div>
      </Section>

      <Section surface="ice" id="initiatives">
        <SectionHead
          eyebrow="Initiatives"
          title="Verified initiatives"
          lead="Only what can be said from the material available for this revision."
        />
        <div className="prose">
          <p>
            The group has previously referred to skills and development activity, including technology
            training for young people. Specific delivery claims are not repeated here.
          </p>
          <p>
            Earlier pages described a water project in Pakistan and innovation activity connected with
            Cyprus, including references to public bodies. Those references are not restated as completed
            delivery or as government endorsement. The records needed to confirm them are not part of
            this revision.
          </p>
        </div>
      </Section>
    </>
  );
}
