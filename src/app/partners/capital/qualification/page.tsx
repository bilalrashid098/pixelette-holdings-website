import type { Metadata } from 'next';
import { Section, SectionHead, PageHero, Qualifier } from '@/components/ui';
import { GatedForm, type Field } from '@/components/GatedForm';
import { CONTACT } from '@/content/site';

export const metadata: Metadata = {
  title: 'Capital qualification request',
  description:
    'A qualification request for capital partners. Information only, submitting it creates no entitlement to information, no offer and no investment opportunity.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/partners/capital/qualification' },
};

const FIELDS: Field[] = [
  { kind: 'text', id: 'k-name', label: 'Name', required: true, autoComplete: 'name' },
  { kind: 'email', id: 'k-email', label: 'Business email', required: true, autoComplete: 'email' },
  { kind: 'text', id: 'k-firm', label: 'Firm', required: true, autoComplete: 'organization' },
  { kind: 'text', id: 'k-role', label: 'Role', required: true },
  { kind: 'text', id: 'k-juris', label: 'Jurisdiction', required: true },
  { kind: 'text', id: 'k-focus', label: 'Investment focus', required: true },
  { kind: 'text', id: 'k-stage', label: 'Stage focus', required: true },
  { kind: 'textarea', id: 'k-reason', label: 'Reason for requesting access', required: true },
];

export default function CapitalQualificationPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Capital Partners', href: '/partners/capital' },
          { label: 'Qualification' },
        ]}
        eyebrow="Qualification"
        title="Controlled access, properly gated."
        lead="Detailed portfolio material is shared only after qualification and manual approval, under counsel-approved terms."
      />

      <Section>
        <Qualifier>
          <p>
            <strong>
              This website is provided for information only and is not an offer, invitation or
              inducement to invest.
            </strong>{' '}
            Any opportunity is available only to professional, high-net-worth or self-certified
            sophisticated investors, subject to eligibility verification and formal documentation.
          </p>
        </Qualifier>

        <SectionHead eyebrow="The request" title="Tell us who you are and why." />

        <GatedForm
          id="capital-form"
          fields={FIELDS}
          consents={[
            {
              id: 'k-privacy',
              required: true,
              label:
                'I have read the Privacy Notice and understand how the data controller named in it will use this information to assess this request and contact me about it.',
            },
          ]}
          submitLabel="Request qualification"
          note="Submitting this request does not create any entitlement to information, an offer, or an investment opportunity."
          heldBody={`This request form is being finalised. In the meantime, email us at ${CONTACT.email} and we will follow up.`}
        />
      </Section>
    </>
  );
}
