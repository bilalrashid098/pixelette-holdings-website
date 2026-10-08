import type { Metadata } from 'next';
import { Section, SectionHead, PageHero, Buttons, Btn } from '@/components/ui';
import { SITE, CONTACT, SOCIALS, CAPITAL_STATEMENT } from '@/content/site';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Pixelette Holdings about a general enquiry, a strategic partnership, an incubator or accelerator programme, or a capital relationship. Founders should use Apply to partner.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        eyebrow="Contact"
        title="Contact Pixelette Holdings"
        lead="Choose the enquiry that fits. Founder partnerships have their own application, so the same questions are not asked twice."
      />

      <Section>
        <SectionHead eyebrow="Routes" title="Where to send it" />
        <div className="card-grid">
          <article className="card">
            <h3 className="h3">Founder partnerships</h3>
            <p className="body">
              If you are building a venture and want to discuss Hybrid Sweat Equity or delivery, use
              Apply to partner. You can take the startup partnership assessment first.
            </p>
            <Buttons>
              <Btn href="/apply">Apply to partner</Btn>
            </Buttons>
          </article>
          <article className="card" id="incubators-and-accelerators">
            <h3 className="h3">Incubators and accelerators</h3>
            <p className="body">
              Programme operators can use the form below and choose Incubators and accelerators. If you
              have already completed the assessment, those answers are carried into this page in your
              browser only.
            </p>
          </article>
          <article className="card" id="capital-relationships">
            <h3 className="h3">Capital relationships</h3>
            <p className="body">{CAPITAL_STATEMENT}</p>
          </article>
          <article className="card">
            <h3 className="h3">General and strategic</h3>
            <p className="body">
              General enquiries and strategic partnerships that are not a founder application can use
              the form below.
            </p>
          </article>
        </div>
      </Section>

      <Section surface="ice">
        <SectionHead
          eyebrow="Enquiry"
          title="Write to us"
          lead="The categories are general enquiries, strategic partnerships, incubators and accelerators, and capital relationships."
        />
        <ContactForm />
      </Section>

      <Section tight>
        <div className="two-col">
          <article>
            <h3 className="h3">Direct contact</h3>
            <ul className="list-plain">
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phone}</a></li>
              <li>
                <a href={SOCIALS[0].href} target="_blank" rel="noopener noreferrer">LinkedIn</a>
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
