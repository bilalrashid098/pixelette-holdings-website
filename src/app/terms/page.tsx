import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, PageHero, Qualifier } from '@/components/ui';
import { SITE, CONTACT } from '@/content/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms governing use of the Pixelette Holdings website, including your ownership of anything you submit.',
  alternates: { canonical: '/terms' },
};

/**
 * Ported from the live pixeletteholdings.com terms and ADAPTED to this rebuild:
 * the governing law is stated correctly as England and Wales (the live site said
 * "United Kingdom", which is not a single jurisdiction), and two privacy-policy
 * sections that had been pasted into the live Terms in error are dropped.
 * Rendered from strings so the prose does not trip JSX entity linting.
 */
const EFFECTIVE = '8 August 2026';

const SECTIONS: { h: string; body: string[] }[] = [
  {
    h: 'Who we are',
    body: [
      `Pixelette Holdings is a trading name of ${SITE.legalName}, a company registered in ${SITE.jurisdiction}, company number ${SITE.companyNumber}, registered office ${SITE.registeredOffice}. Contact: ${CONTACT.email}. These terms govern your use of this website.`,
    ],
  },
  {
    h: 'Eligibility and acceptance',
    body: [
      'You must be at least 18 years of age, or using the site under the supervision of a parent or legal guardian. By using the site you accept these terms.',
    ],
  },
  {
    h: 'Use of the website',
    body: [
      "Content is provided for general information about the group's capabilities and operating model. Nothing on this website forms an offer, engagement, delivery obligation or equity arrangement, and submitting any form does not create an engagement, meeting entitlement or offer.",
    ],
  },
  {
    h: 'No investment offer',
    body: [
      'This website is provided for information only and is not an offer, invitation or inducement to invest. Please read the website and investment disclaimer.',
    ],
  },
  {
    h: 'Your ideas and materials stay yours',
    body: [
      'Any business information, startup idea, pitch deck, financial model, intellectual property or related material you submit remains entirely your property. Submitting it does not transfer any intellectual property to us or grant us a licence, and this applies whether or not a formal engagement follows. We treat such material as confidential and will not share it without your explicit written consent. If you would like, we are happy to formalise this through a mutual non-disclosure agreement (NDA) before you send sensitive materials.',
    ],
  },
  {
    h: 'Our intellectual property',
    body: [
      'All content on this website, text, graphics, logos and design, is the property of Pixelette Holdings or its licensors and is protected by law. You may not reproduce, distribute or modify it without our prior written consent.',
    ],
  },
  {
    h: 'Permitted use',
    body: [
      'You may use the site only for lawful purposes. You must not: violate any applicable law; disable, overburden or damage the site; attempt to gain unauthorised access; use automated means such as crawlers, bots or scrapers to access, monitor or copy content; or introduce any virus, worm, or other malicious code.',
    ],
  },
  {
    h: 'Third-party links',
    body: [
      'The site may link to third-party websites. We are not responsible for their content or practices, and a link does not imply endorsement.',
    ],
  },
  {
    h: 'Disclaimers',
    body: [
      'The site is provided on an "as is" and "as available" basis. To the extent permitted by law, we disclaim implied warranties including merchantability, fitness for a particular purpose and non-infringement.',
    ],
  },
  {
    h: 'Limitation of liability and indemnity',
    body: [
      'To the extent permitted by law, we are not liable for indirect, incidental, special or consequential loss, including lost profits, lost data or business interruption. You agree to indemnify Pixelette Holdings against claims arising from your misuse of the site or breach of these terms.',
    ],
  },
  {
    h: 'Termination, and general terms',
    body: [
      'We may suspend or withdraw access to the site at our discretion. These terms are the entire agreement between us regarding the site; if any provision is unenforceable the remainder stands; a failure to enforce a term is not a waiver of it; and you may not assign your rights under these terms without our prior written consent.',
    ],
  },
  {
    h: 'Governing law',
    body: [
      'These terms are governed by and construed in accordance with the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Terms of Use' }]}
        eyebrow="Legal"
        title="Terms of Use"
      />

      <Section>
        <div style={{ maxWidth: 860 }}>
          <p className="lead" style={{ marginBottom: 8 }}>Effective date: {EFFECTIVE}.</p>

          <div className="prose">
            {SECTIONS.map((s) => (
              <div key={s.h}>
                <h2>{s.h}</h2>
                {s.body.map((p, i) =>
                  s.h === 'No investment offer' ? (
                    <p key={i}>
                      This website is provided for information only and is not an offer, invitation or
                      inducement to invest. Please read the{' '}
                      <Link href="/disclaimer">website and investment disclaimer</Link>.
                    </p>
                  ) : (
                    <p key={i}>{p}</p>
                  ),
                )}
              </div>
            ))}
          </div>

          <Qualifier>
            <strong>Governing law.</strong> These terms are governed by the laws of England and Wales,
            and the courts of England and Wales have jurisdiction.
          </Qualifier>
        </div>
      </Section>
    </>
  );
}
