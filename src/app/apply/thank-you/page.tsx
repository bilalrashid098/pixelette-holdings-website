import type { Metadata } from 'next';
import { Section, SectionHead, PageHero, Buttons, Btn } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Application',
  robots: { index: false, follow: false },
  alternates: { canonical: '/apply/thank-you' },
};

export default function ApplyThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow="Apply to partner"
        title="This page is not a receipt"
        lead="The application form on this website does not send what you type. An email you send yourself is the message that can be received. This address does not confirm that a message has arrived."
      />

      <Section>
        <SectionHead eyebrow="What this does not mean" title="No partnership has been created" />
        <ul className="list">
          <li>A page view is not a submission.</li>
          <li>A reply, if one is sent, does not imply acceptance or a meeting.</li>
          <li>There is no promised response time.</li>
          <li>Nothing is agreed until scope and documentation are signed separately.</li>
        </ul>
        <Buttons>
          <Btn href="/apply">Return to the application</Btn>
          <Btn href="/hse-model" variant="secondary">Hybrid Sweat Equity</Btn>
        </Buttons>
      </Section>
    </>
  );
}
