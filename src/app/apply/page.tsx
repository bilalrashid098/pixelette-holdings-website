import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, SectionHead, PageHero } from '@/components/ui';
import { FitAssessmentForm } from '@/components/FitAssessmentForm';
import { CONTACT } from '@/content/site';

export const metadata: Metadata = {
  title: 'Explore a partnership',
  description:
    'Tell us about your venture. Share a few details and Pixelette Holdings will review your enquiry. It does not create a partnership or an investment commitment, and it does not promise a reply by a set date.',
  alternates: { canonical: '/apply' },
};

const STEPS = [
  {
    n: '01',
    title: 'What to send',
    body: 'Your name, a work email, the venture, its stage and a short description. You do not need a pitch deck or a cap table at this point.',
  },
  {
    n: '02',
    title: 'How it is used',
    body: 'If you send the enquiry, Pixelette Holdings Ltd uses it to decide whether a conversation is relevant and to reply. The privacy notice describes that handling.',
  },
  {
    n: '03',
    title: 'What happens afterwards',
    body: 'A person may review an enquiry that has actually been received. There is no promised response time. A reply does not create a partnership or commitment.',
  },
  {
    n: '04',
    title: 'What it does not do',
    body: 'It does not create a partnership, a delivery obligation, an investment, or a commitment by either side. Any commercial terms would be a separate agreement.',
  },
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Explore a partnership' }]}
        eyebrow="Explore a partnership"
        title="Tell us about your venture"
        lead="Share a few details about your venture and what you are looking to achieve. We'll review your enquiry and explore whether there may be an opportunity to work together."
      >
        <ul className="list">
          <li>Use it if you are a founder. Programme operators should use the contact page.</li>
          <li>No pitch deck is required here.</li>
          <li>If you completed the startup partnership assessment, those answers are brought forward in this browser.</li>
          <li>The form does not ask for payment.</li>
        </ul>
      </PageHero>

      <Section>
        <SectionHead
          eyebrow="Before you write"
          title="What this enquiry is for"
          lead="A conversation about delivery and a possible Hybrid Sweat Equity arrangement. It is not a request for Pixelette to invest cash, and there is no standard paid pilot on this page."
        />
        <ul className="list">
          <li>You can speak for the venture.</li>
          <li>There is a problem and a person it is for.</li>
          <li>You are willing to discuss cash, equity, or both, without a fixed public formula.</li>
          <li>You can take part in the work: decisions, evidence and access to users.</li>
        </ul>
        <p className="body">
          Incubators and accelerators should use the{' '}
          <Link className="link" href="/contact#incubators-and-accelerators">programme enquiry</Link>.
          The assessment itself is on the{' '}
          <Link className="link" href="/startups#partnership-assessment">startups page</Link>.
        </p>
      </Section>

      <Section surface="ice">
        <SectionHead
          eyebrow="The enquiry"
          title="The information to include"
          lead={`The Send enquiry button opens a message to ${CONTACT.email} in your own email program. This website does not store what you type, and Pixelette receives it only when you send that message.`}
        />
        <FitAssessmentForm />
      </Section>

      <Section>
        <SectionHead eyebrow="After you send it" title="What you should expect" />
        <div className="steps">
          {STEPS.map((s) => (
            <div key={s.n} className="step">
              <b>{s.n}</b>
              <div>
                <h3 className="h3">{s.title}</h3>
                <p className="body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="small">
          Read the <Link className="link" href="/privacy">privacy notice</Link> before you email
          personal information.
        </p>
      </Section>
    </>
  );
}
