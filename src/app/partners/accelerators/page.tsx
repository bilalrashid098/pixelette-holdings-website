import type { Metadata } from 'next';
import {
  Section, SectionHead, PageHero, Buttons, Btn, CardGrid, Card,
} from '@/components/ui';
import { GatedForm, type Field } from '@/components/GatedForm';

export const metadata: Metadata = {
  title: 'Incubators & Accelerators | Portfolio execution partner',
  description:
    'Pixelette gives selected portfolio companies the capability to validate, build, launch and become diligence-ready, the gap between founder education and shipped product.',
  alternates: { canonical: '/partners/accelerators' },
};

const OFFER = [
  ['Readiness clinic', 'A structured session across the cohort to surface the real execution constraint per company.'],
  ['Honest routing', 'A clear route for each company: a Hybrid Sweat Equity (HSE) mandate, a paid Validation Sprint, full-cash delivery, or no current engagement.'],
  ['Validation Sprints', 'Paid, time-boxed validation producing a blueprint, architecture and go-to-market logic.'],
  ['Product build', 'Full delivery against explicit acceptance criteria through Pixelette Technologies.'],
  ['Launch and GTM support', 'Positioning, launch assets, demand systems and pilot strategy.'],
  ['Assurance readiness', 'Security, governance and compliance preparation for enterprise and regulated buyers.'],
  ['Partner reporting', 'Visibility of progress and gate decisions across the companies referred.'],
  ['Senior attention', 'Intake is deliberately constrained so every company gets a senior team, not a queue.'],
] as const;

const FIELDS: Field[] = [
  { kind: 'text', id: 'p-org', label: 'Organisation', required: true, autoComplete: 'organization' },
  { kind: 'text', id: 'p-contact', label: 'Contact name and role', required: true, autoComplete: 'name' },
  { kind: 'email', id: 'p-email', label: 'Work email', required: true, autoComplete: 'email' },
  {
    kind: 'select', id: 'p-type', label: 'Programme type', required: true,
    options: ['Accelerator', 'Incubator', 'University programme', 'Corporate venture programme', 'Government or agency programme', 'Other'],
  },
  {
    kind: 'select', id: 'p-stage', label: 'Typical cohort stage', required: true,
    options: ['Idea or research', 'Validated problem', 'Prototype', 'MVP', 'Early revenue', 'Mixed'],
  },
  { kind: 'text', id: 'p-count', label: 'Number of companies', required: true },
  {
    kind: 'select', id: 'p-gap', label: 'Primary execution gap', required: true,
    options: ['Product definition', 'Technical build', 'Launch and customer acquisition', 'Compliance and enterprise readiness', 'Capital readiness', 'Other'],
  },
  { kind: 'text', id: 'p-timing', label: 'Expected timing', required: true },
];

export default function AcceleratorsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Partners' },
          { label: 'Incubators & Accelerators' },
        ]}
        eyebrow="Portfolio execution partner"
        title="Your programme develops founders. We build alongside them."
        lead="Accelerators and incubators give founders frameworks, focus and networks. Pixelette gives their companies the team to validate, build, launch and become diligence-ready, closing the gap between guidance and a shipped product."
      >
        <Buttons>
          <Btn href="#enquiry">Discuss portfolio execution</Btn>
          <Btn href="/portfolio/2connect" variant="secondary">View 2Connect</Btn>
        </Buttons>
      </PageHero>

      <Section>
        <SectionHead
          eyebrow="The gap"
          title="Great programmes sharpen founders. The product still has to be built."
          lead="Most cohorts leave with a sharper pitch and the same execution constraint. Pixelette plugs into your programme as the delivery layer, validating, building and launching companies, with the same honest qualification applied to each one."
        />
        <CardGrid>
          {OFFER.map(([title, body]) => (
            <Card key={title} title={title}>{body}</Card>
          ))}
        </CardGrid>
      </Section>

      <Section id="enquiry" surface="ice">
        <SectionHead
          eyebrow="Partnership enquiry"
          title="Start with the cohort, not the paperwork."
          lead="A short enquiry so the first conversation is about your companies rather than our process."
        />
        <GatedForm
          id="partner-form"
          fields={FIELDS}
          consents={[
            {
              id: 'p-privacy',
              required: true,
              label:
                'I have read the Privacy Notice and understand how the data controller named in it will use this information to assess the enquiry and contact me about it.',
            },
          ]}
          submitLabel="Discuss portfolio execution"
          note="Submission does not create an engagement or offer."
        />
      </Section>
    </>
  );
}
