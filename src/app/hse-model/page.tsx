import type { Metadata } from 'next';
import { DeliveryStages } from '@/components/DeliveryStages';
import { Section, SectionHead, PageHero, Buttons, Btn } from '@/components/ui';
import { HSE_STATEMENT } from '@/content/site';

export const metadata: Metadata = {
  title: 'Hybrid Sweat Equity',
  description:
    'How Hybrid Sweat Equity works: agreed professional services in exchange for cash fees and equity participation, with the detailed terms set out in each venture’s agreements.',
  alternates: { canonical: '/hse-model' },
};

const PARTNERSHIP = [
  {
    title: 'Agreed cash contribution',
    body: 'The founder and Pixelette agree what portion of the professional fee is paid in cash, and when. There is no published standard split.',
  },
  {
    title: 'Professional services',
    body: 'Pixelette provides the delivery described in the agreed scope. The work is contracted. Customers, revenue and fundraising are not.',
  },
  {
    title: 'Equity participation',
    body: 'Any equity is set out in the commercial and shareholder agreements. It is not a fixed allocation, and it is not presented here as a standard percentage.',
  },
  {
    title: 'Milestones',
    body: 'Responsibilities can be linked to milestones defined in the agreements. What counts as acceptance is agreed for that venture, not assumed from this page.',
  },
];

const PROTECTION = [
  {
    title: 'Agreed delivery scope',
    body: 'The agreements should say what will be done, and what sits outside that scope.',
  },
  {
    title: 'Milestone definitions',
    body: 'Where equity or payment depends on a milestone, the agreements should say how that milestone is defined and accepted.',
  },
  {
    title: 'Equity and ownership',
    body: 'Who holds shares, on what terms, is a matter for the signed documents. This page does not set those terms.',
  },
  {
    title: 'Governance and decision-making',
    body: 'Voting, reserved matters and day-to-day authority depend on the agreements. Founder control is not guaranteed by this website.',
  },
  {
    title: 'Intellectual property',
    body: 'Ownership and licensing of work product should be written down, including what transfers and when.',
  },
  {
    title: 'Exit and termination',
    body: 'The agreements should cover what happens if the work stops, including any unvested rights. Those outcomes are not universal.',
  },
];

const QUESTIONS: { q: string; a: string }[] = [
  {
    q: 'Is Hybrid Sweat Equity free development?',
    a: 'No. Pixelette contributes agreed professional services in exchange for a combination of cash fees and equity participation. It is not free work, and it is not a cash investment by Pixelette.',
  },
  {
    q: 'Is there a standard equity percentage?',
    a: 'No. The allocation of equity, milestone conditions, founder rights and governance arrangements are established in the relevant agreements. A percentage on this website would be misleading.',
  },
  {
    q: 'Do founders keep complete control?',
    a: 'Decision-making rights depend on the shareholder and governance documents for that venture. This page does not promise that every founder retains complete control.',
  },
  {
    q: 'Is a paid pilot required before a conversation?',
    a: 'No standard paid pilot, validation retainer or other preliminary fee is required by this website. If any preliminary work is contracted, that is a separate agreement.',
  },
  {
    q: 'Does following the stages guarantee a launch, customers or investment?',
    a: 'No. The stages describe how delivery can be organised. They are not a timetable, and they are not a promise of customers, revenue or external investment.',
  },
  {
    q: 'What should I do if I want to discuss a partnership?',
    a: 'Explore a partnership. You can take the short startup partnership assessment first if you want a clearer next step. Submitting an enquiry does not create a partnership.',
  },
];

export default function HsePage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Hybrid Sweat Equity' }]}
        eyebrow="Hybrid Sweat Equity"
        title="What is Hybrid Sweat Equity?"
        lead={HSE_STATEMENT}
      >
        <Buttons>
          <Btn href="/apply">Explore a partnership</Btn>
          <Btn href="/startups" variant="secondary">For startups and venture programmes</Btn>
        </Buttons>
      </PageHero>

      <Section id="how-the-partnership-works">
        <SectionHead
          eyebrow="The partnership"
          title="How the partnership works"
          lead="Cash, delivery, equity and milestones are agreed for the venture. The precise commercial model depends on its circumstances."
        />
        <div className="quad-grid">
          {PARTNERSHIP.map((item) => (
            <article key={item.title} className="card">
              <h3 className="h3">{item.title}</h3>
              <p className="body">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="ice" id="how-it-works">
        <SectionHead
          eyebrow="Delivery"
          title="From concept to launch"
          lead="Five stages, used to organise the work. They are not guaranteed completion times."
        />
        <DeliveryStages />
      </Section>

      <Section id="protecting-the-partnership">
        <SectionHead
          eyebrow="The agreements"
          title="Protecting the partnership"
          lead="These are subjects the agreements should address. They are not rights that exist on the same terms for every venture."
        />
        <div className="card-grid">
          {PROTECTION.map((item) => (
            <article key={item.title} className="card">
              <h3 className="h3">{item.title}</h3>
              <p className="body">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="ice">
        <SectionHead eyebrow="Questions" title="Common questions" />
        <div className="faq">
          {QUESTIONS.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section surface="deep" id="apply">
        <SectionHead
          eyebrow="Next step"
          title="Explore a partnership"
          lead="Tell us about the venture. An enquiry does not create a partnership, and it does not promise a reply within a set time."
        />
        <Buttons>
          <Btn href="/apply">Explore a partnership</Btn>
          <Btn href="/startups#partnership-assessment" variant="secondary">Startup partnership assessment</Btn>
        </Buttons>
      </Section>
    </>
  );
}
