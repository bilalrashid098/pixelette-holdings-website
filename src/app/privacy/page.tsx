import type { Metadata } from 'next';
import { Section, PageHero, Qualifier } from '@/components/ui';
import { SITE, CONTACT } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description: 'How Pixelette Holdings Ltd collects, uses and protects personal data provided through this website.',
  alternates: { canonical: '/privacy' },
};

/**
 * Ported from the live pixeletteholdings.com privacy policy and ADAPTED to this
 * rebuild: the cookies / analytics / tracking-pixel clauses are corrected because
 * this site sets NO tracking, advertising or analytics cookies. Rendered from
 * string constants so the legal prose does not trip JSX entity linting.
 * Counsel should still confirm before publication.
 */
const EFFECTIVE = '8 October 2026';

const SECTIONS: { h: string; body: string[] }[] = [
  {
    h: 'Who we are',
    body: [
      `The data controller is ${SITE.legalName} ("Pixelette Holdings", "we", "us" or "our"), a company registered in ${SITE.jurisdiction}, company number ${SITE.companyNumber}, registered office ${SITE.registeredOffice}. For any privacy matter, contact ${CONTACT.email}.`,
      'This notice describes how we collect, use, disclose, store and protect personal data in connection with our website and related services. By using the site, you acknowledge the practices described here.',
    ],
  },
  {
    h: 'Who this applies to',
    body: [
      'This notice applies to everyone whose personal data we handle in connection with the site and our services, including founders and applicants, partners, clients, vendors and site visitors, regardless of location.',
    ],
  },
  {
    h: 'What we collect',
    body: [
      'The startup partnership assessment runs in your browser. It asks about visitor type, stage, need and partnership structure. It does not ask for your name or email. The answers are kept in this browser’s session storage so they can be shown again on the application or contact page. They are not sent to us, and closing the tab removes them. We do not keep a copy.',
      'Information you choose to send by email. If you email an application or another enquiry, we receive what you include, such as your name, work email, organisation and message. The forms on this website do not themselves transmit that information.',
      'Information collected automatically. Our host records basic technical information needed to serve and secure the site, such as your IP address and standard server logs. This site does not use advertising, analytics or cross-site tracking cookies, and does not run a third-party tag manager. If you set a preference under Privacy choices in the footer, it is kept in your own browser and is not sent to us. If analytics is ever introduced, this notice will be updated and consent obtained first.',
    ],
  },
  {
    h: 'Why we use it, and our lawful basis',
    body: [
      'We use your information to assess your enquiry, decide the responsible next step, and contact you about it. Our lawful bases under the UK GDPR are: our legitimate interests in evaluating and responding to a business enquiry you initiated; the performance of, or steps towards, a contract where one is in view; and compliance with our legal obligations.',
      'Where you separately opt in, we rely on your consent to send occasional insights and relevant service information. That consent is optional, is not a condition of submitting an enquiry, and can be withdrawn at any time.',
    ],
  },
  {
    h: 'Who we share it with',
    body: [
      'We share personal data only where necessary: with service providers who process it on our behalf under contract (for example secure hosting and IT security); with professional advisers; with authorities where we are legally required to; and, in the context of a corporate transaction, with the parties to it. We do not sell personal data or exchange it for monetary consideration.',
    ],
  },
  {
    h: 'International transfers',
    body: [
      'Where personal data is transferred outside the UK, we rely on appropriate safeguards recognised under UK data-protection law, such as the International Data Transfer Agreement or Standard Contractual Clauses, together with any additional measures required.',
    ],
  },
  {
    h: 'How long we keep it',
    body: [
      'Assessment answers in session storage are not retained by us, because we do not receive them. Email you send us is kept only as long as needed to handle the enquiry and any later engagement, and for any period the law requires. A specific retention period for emailed enquiries has not been re-approved for this revision, so this notice does not state one as settled.',
    ],
  },
  {
    h: 'Your rights',
    body: [
      `You have the right to access your personal data and to request its rectification, erasure, restriction or portability, and to object to processing. Where processing is based on consent, you may withdraw it at any time. To exercise a right, contact ${CONTACT.email}.`,
      "You also have the right to complain to the Information Commissioner's Office (ICO), the UK supervisory authority, at ico.org.uk.",
    ],
  },
  {
    h: 'How we protect it',
    body: [
      'This website is a static site. It does not store assessment answers or form entries on our servers. Email you send is handled in ordinary business mail. We do not describe security controls on this page that have not been set out for this revision.',
    ],
  },
  {
    h: 'Children',
    body: [
      'The site and our services are not directed to children under 13, and we do not knowingly collect their personal data.',
    ],
  },
  {
    h: 'Other sites, and changes to this notice',
    body: [
      'This notice does not cover third-party websites we may link to; please read their own policies. We may update this notice from time to time; the effective date above reflects the latest revision.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Privacy Notice' }]}
        eyebrow="Legal"
        title="Privacy notice"
      />

      <Section>
        <div style={{ maxWidth: 860 }}>
          <p className="lead" style={{ marginBottom: 8 }}>Effective date: {EFFECTIVE}.</p>

          <div className="prose">
            {SECTIONS.map((s) => (
              <div key={s.h}>
                <h2>{s.h}</h2>
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          <Qualifier>
            <strong>Separation of consent.</strong> The privacy acknowledgement required to submit an
            enquiry is not consent to marketing. Marketing consent is optional, unticked by default,
            recorded separately with its exact wording, and can be withdrawn at any time.
          </Qualifier>
        </div>
      </Section>
    </>
  );
}
