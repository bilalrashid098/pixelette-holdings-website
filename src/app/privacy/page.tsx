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
const EFFECTIVE = '8 August 2026';

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
      'Information you provide to us directly. When you submit an enquiry, for example the HSE Fit Assessment or a partnership enquiry, we collect the details you give us: your name, work email, company or venture, website, country or principal market, sector, current stage, an indication of the capital available for professional execution, your venture description and your current constraint. If you correspond with us, we hold that correspondence.',
      'Information collected automatically. Our host records basic technical information needed to serve and secure the site, such as your IP address and standard server logs. This site does not use advertising, analytics or cross-site tracking cookies, and does not run a third-party tag manager. Only strictly necessary functionality is used. If analytics is ever introduced, this notice will be updated and consent obtained first.',
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
      'We keep personal data only as long as necessary for the purpose it was collected, taking account of our legal and contractual obligations. Enquiries that do not proceed are retained for up to 12 months from our last contact; where an engagement proceeds, records are kept for the life of the engagement plus any period required by law. Data is securely deleted when retention is no longer justified.',
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
      'We apply appropriate technical and organisational measures, including encryption in transit and at rest, role-based access controls, multi-factor authentication for administrative access, regular vulnerability assessment, secure development practices, and staff confidentiality obligations.',
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
