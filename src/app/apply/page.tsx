import type { Metadata } from 'next';
import { Section, SectionHead, PageHero, Qualifier } from '@/components/ui';
import { FitAssessmentForm } from '@/components/FitAssessmentForm';

export const metadata: Metadata = {
  title: 'Apply for HSE | Fit Assessment',
  description:
    'A short commercial qualification for an HSE execution partnership. Not a pitch competition, not a grant application, and not a request for Pixelette to invest cash.',
  alternates: { canonical: '/apply' },
};

const STEPS = [
  {
    n: '01',
    title: 'Qualification triage',
    body: 'Once the review owner and service process are operationally approved, submissions are assessed for founder, market, scope, capability fit and the available execution pathway.',
  },
  {
    n: '02',
    title: 'Qualification conversation',
    body: 'Suitable founders may be invited to a focused commercial and product discussion.',
  },
  {
    n: '03',
    title: 'Responsible route',
    body: 'We may recommend an HSE mandate, a paid Validation Sprint, full-cash delivery, a request for more evidence or no current engagement.',
  },
  {
    n: '04',
    title: 'Separate agreement',
    body: 'No HSE economics, delivery obligation or equity arrangement exists until separately assessed, documented and signed.',
  },
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Apply' }]}
        eyebrow="HSE Fit Assessment"
        title="Tell us what you are ready to build."
        lead="This is a commercial qualification for an execution partnership. It is not a pitch competition, a grant application or a request for Pixelette to invest cash."
      >
        <ul className="tick-list">
          <li>Short first-stage assessment.</li>
          <li>No pitch deck required at this stage.</li>
          <li>No automatic acceptance or rejection.</li>
          <li>The form does not request payment.</li>
        </ul>
      </PageHero>

      <Section>
        <SectionHead
          eyebrow="Before you start"
          title="HSE may be right if…"
          lead="If the opportunity is promising but not sufficiently validated, we may suggest a paid Validation Sprint. If you prefer to retain equity, we may suggest full-cash delivery."
        />
        <ul className="tick-list">
          <li>You are the committed founder or operator.</li>
          <li>The venture addresses a defined problem and market.</li>
          <li>You can fund the agreed cash portion of professional execution.</li>
          <li>You are open to a structured fee-to-equity discussion.</li>
          <li>You can provide timely evidence, decisions and user access.</li>
        </ul>
      </Section>

      <Section surface="ice">
        <SectionHead
          eyebrow="The assessment"
          title="Ten questions. Nothing sensitive."
          lead="Give us enough context to make the next conversation useful. Sensitive financial documents and detailed cap-table information are not required here."
        />
        <FitAssessmentForm />
      </Section>

      <Section>
        <SectionHead eyebrow="What happens next" title="A human decision, not an algorithm." />
        <div className="steps">
          {STEPS.map((s) => (
            <div key={s.n} className="step reveal">
              <b>{s.n}</b>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <Qualifier>
          <strong>No response time is published</strong> until an operational service level has been
          approved and staffed.
        </Qualifier>
      </Section>
    </>
  );
}
