'use client';

import { useState } from 'react';
import { Section, SectionHead, Buttons, Btn, CardGrid } from '@/components/ui';
import { PartnershipAssessment, StartupsPathways } from '@/components/PartnershipAssessment';
import type { Audience } from '@/lib/assessment';

const CONTRIBUTE = [
  {
    title: 'Technical feasibility and product scoping',
    body: 'A clearer view of whether the product can be built, and what the first scope should exclude.',
  },
  {
    title: 'Software and AI development',
    body: 'Engineering delivery from Pixelette Technologies, under an agreed scope.',
    href: 'https://pixelettetech.com/',
    link: 'Pixelette Technologies',
  },
  {
    title: 'Product launch preparation',
    body: 'The work needed to put a product in front of users, without a promise that users will come.',
  },
  {
    title: 'Marketing and market development',
    body: 'Commercial work from Pixelette Marketing, where that capability is part of the agreed scope.',
    href: 'https://pixelettemarketing.com/',
    link: 'Pixelette Marketing',
  },
  {
    title: 'Compliance and enterprise readiness',
    body: 'Readiness support associated with Pixelette Certified. Independent certification stays with accredited bodies.',
    href: 'https://pixelettecertified.com/',
    link: 'Pixelette Certified',
  },
  {
    title: 'Venture execution planning',
    body: 'How the work is sequenced, staffed and governed, coordinated by Pixelette Holdings.',
  },
];

export function StartupsBody() {
  const [audience, setAudience] = useState<Audience | null>(null);

  return (
    <>
      <Section>
        <SectionHead
          eyebrow="Pathways"
          title="Choose your pathway"
          lead="Select the description that fits. The partnership assessment below uses that choice, and you can change it."
        />
        <StartupsPathways audience={audience} onSelect={setAudience} />
      </Section>

      <Section surface="ice">
        <SectionHead
          eyebrow="Contribution"
          title="Where Pixelette can contribute"
          lead="Support across the life of a venture. Service detail lives on the relevant group website, not here."
        />
        <CardGrid>
          {CONTRIBUTE.map((item) => (
            <article key={item.title} className="card">
              <h3 className="h3">{item.title}</h3>
              <p className="body">{item.body}</p>
              {item.href ? (
                <p>
                  <a className="link" href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.link}
                  </a>
                </p>
              ) : null}
            </article>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Assessment"
          title="Startup partnership assessment"
          lead="About one to two minutes. No email is asked before the result. Nothing is stored on our servers."
        />
        <PartnershipAssessment audience={audience} onAudience={setAudience} />
      </Section>

      <Section surface="ice">
        <SectionHead
          eyebrow="Experience"
          title="Relevant experience"
          lead="A short illustration, not the full portfolio. Operating stage is stated only where it has been re-verified."
        />
        <CardGrid>
          <article className="card">
            <h3 className="h3">2Connect</h3>
            <p className="small">Direct HSE venture · Agentic AI</p>
            <p className="body">
              An agentic AI alternative to the recommender engine, capturing human intent across hundreds
              of dimensions for relevant, reciprocal matchmaking and discovery.
            </p>
            <p>
              <a className="link" href="/portfolio#2connect">View in the portfolio</a>
            </p>
          </article>
          <article className="card">
            <h3 className="h3">Digital Asset Vault</h3>
            <p className="small">Direct HSE venture · Blockchain</p>
            <p className="body">
              A direct Hybrid Sweat Equity relationship concerned with secure digital-asset storage.
              Launch, funding and traction are not stated.
            </p>
            <p>
              <a className="link" href="/portfolio#digital-asset-vault">View in the portfolio</a>
            </p>
          </article>
        </CardGrid>
      </Section>

      <Section surface="deep">
        <SectionHead
          eyebrow="Next step"
          title="Explore a partnership with Pixelette"
          lead="Founders can apply. Incubators and accelerators can send a programme enquiry. Neither step creates a partnership."
        />
        <Buttons>
          <Btn href="/apply">Apply to partner</Btn>
          <Btn href="/contact#incubators-and-accelerators" variant="secondary">
            Programme partnership enquiry
          </Btn>
        </Buttons>
      </Section>
    </>
  );
}
