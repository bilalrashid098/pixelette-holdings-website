import type { Metadata } from 'next';
import { Section, SectionHead, PageHero, Buttons, Btn } from '@/components/ui';
import { GatedForm, type Field } from '@/components/GatedForm';
import { SITE, CONTACT, SOCIALS } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Route your enquiry properly. Founder applications go through the HSE Fit Assessment; capital relationships follow a separate, controlled qualification route.',
  alternates: { canonical: '/contact' },
};

const FIELDS: Field[] = [
  {
    kind: 'select', id: 'c-type', label: 'Enquiry type', required: true,
    options: [
      'Enterprise pilot',
      'Portfolio commercial partnership',
      'Technology delivery (full-cash)',
      'Assurance and compliance readiness',
      'Social-impact partnership',
      'Media or speaking',
      'HSE application problem',
      'Other',
    ],
  },
  { kind: 'text', id: 'c-name', label: 'Name', required: true, autoComplete: 'name' },
  { kind: 'email', id: 'c-email', label: 'Work email', required: true, autoComplete: 'email' },
  { kind: 'text', id: 'c-org', label: 'Organisation', autoComplete: 'organization' },
  {
    kind: 'textarea', id: 'c-message', label: 'Message', required: true,
    hint: 'Please do not send confidential documents or personal data through this form.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        eyebrow="Contact"
        title="Route your enquiry properly."
        lead="Selecting the right route means the right person replies. Founder applications are handled through the HSE Fit Assessment, not this form."
      />

      <Section>
        <SectionHead eyebrow="Before you write" title="Two enquiries have their own route." />
        <div className="two-col">
          <article>
            <h3 className="h3">Founders seeking an HSE partnership</h3>
            <p className="body">
              Use the short fit assessment. It gathers the venture, stage and execution-capital context
              needed for a qualification decision, and it reaches the right reviewer directly.
            </p>
            <div style={{ marginTop: 20 }}>
              <Buttons>
                <Btn href="/apply">Check if you qualify</Btn>
              </Buttons>
            </div>
          </article>
          <article>
            <h3 className="h3">Capital partners</h3>
            <p className="body">
              Capital relationships follow a separate, controlled qualification route under
              counsel-approved terms. Please do not send investment enquiries through the general
              contact form.
            </p>
            <div style={{ marginTop: 20 }}>
              <Buttons>
                <Btn href="/partners/capital" variant="ghost">Capital Partner overview</Btn>
              </Buttons>
            </div>
          </article>
        </div>
      </Section>

      <Section surface="ice">
        <SectionHead
          eyebrow="General enquiries"
          title="Everything else."
          lead="Choose the enquiry type so your message routes internally rather than sitting in a shared inbox."
        />
        <GatedForm
          id="contact-form"
          fields={FIELDS}
          consents={[
            {
              id: 'c-privacy',
              required: true,
              label:
                'I have read the Privacy Notice and understand how the data controller named in it will use this information to respond to my enquiry.',
            },
          ]}
          submitLabel="Send enquiry"
          note="Submitting an enquiry does not create an engagement or offer."
          heldBody={`This form is being finalised. In the meantime, email us directly at ${CONTACT.email} and we will route your enquiry to the right person.`}
        />
      </Section>

      <Section tight>
        <div className="two-col">
          <article>
            <h3 className="h3">Contact</h3>
            <ul className="list-plain">
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phone}</a></li>
              <li>
                <a href={SOCIALS[0].href} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </article>
          <article>
            <h3 className="h3">Registered office</h3>
            <p className="body">
              {SITE.legalName}
              <br />
              {SITE.registeredOffice}
              <br />
              Registered in {SITE.jurisdiction}, company number {SITE.companyNumber}.
            </p>
          </article>
        </div>
      </Section>
    </>
  );
}
