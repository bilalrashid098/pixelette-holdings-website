import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, PageHero, Qualifier } from '@/components/ui';
import { SITE, CONTACT } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description:
    'How Pixelette Holdings Ltd collects, uses and protects personal information across this website and our work.',
  alternates: { canonical: '/privacy' },
};

/**
 * Structured to match the Pixelette Marketing privacy statement, rewritten for
 * what this Holdings site actually does: mailto enquiries, browser-only
 * assessment storage, no analytics cookies, and contact via CONTACT.email only.
 * Counsel should still confirm before publication.
 */
const EFFECTIVE = '12 October 2026';
const VERSION = '1.0';

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
          <p className="lead" style={{ marginBottom: 8 }}>
            Effective {EFFECTIVE} · Version {VERSION}
          </p>
          <p className="lead" style={{ marginBottom: 32 }}>
            How Pixelette Holdings uses, protects and manages personal information across this
            website and our work.
          </p>

          <div className="prose">
            <h2>About this notice, and about us</h2>
            <p>
              This notice explains what {SITE.legalName} does with personal information: what we
              collect, why we are allowed to hold it, who else handles it, how long we keep it and
              what you can require of us. It covers {SITE.url.replace(/^https?:\/\//, '')} and the
              ordinary course of dealing with us as a founder, programme partner, capital contact,
              supplier or site visitor.
            </p>
            <p>
              {SITE.legalName} (&quot;Pixelette Holdings&quot;, &quot;we&quot;, &quot;us&quot; or
              &quot;our&quot;) is the controller for the information described here. We are
              registered in {SITE.jurisdiction} under company number {SITE.companyNumber}, with our
              registered office at {SITE.registeredOffice}.
            </p>
            <p>
              For anything in this notice, or about your information generally, write to{' '}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. A person reads that address.
            </p>
            <p>
              Other Pixelette Group companies and brands operate their own websites and services.
              Where you deal with them directly, their own privacy notices apply. This notice covers
              this Holdings website and enquiries addressed to {SITE.legalName}.
            </p>

            <h2>Information we collect</h2>
            <p>
              We would rather hold less than more. The list below is short because the site is built
              that way, not because it has been summarised.
            </p>

            <h3>What you give us</h3>
            <p>
              Enquiry forms on this website open a message in your own email program, addressed to{' '}
              {CONTACT.email}. The website does not store or transmit what you type. We receive
              personal information only if you send that message. Typical fields include your name,
              email, organisation, enquiry type and message. On the partnership enquiry, we may
              also receive venture context such as stage, need, structure and a short description,
              together with whether you asked for occasional insights emails.
            </p>
            <p>
              The startup partnership assessment on this site asks about visitor type, stage, need
              and partnership structure. It does not ask for your name or email. Answers stay in this
              browser&apos;s session storage so they can be shown again on the partnership enquiry or
              contact page. They are not sent to us, and closing the tab removes them.
            </p>
            <p>
              If you email or call us instead, we have whatever you put in that message and whatever
              follows in the conversation. As a partner, client or supplier, we hold the business
              contact details and correspondence needed to run the relationship: the people we deal
              with, what was discussed, and the ordinary record of the work.
            </p>

            <h3>What the site generates</h3>
            <p>
              Serving a web page involves your device asking our host for it, and our host keeps
              short-lived operational records of those requests in order to serve the site and defend
              it from abuse. We do not build those records into a profile and we do not connect them
              to an enquiry.
            </p>
            <p>
              What the site does with analytics and storage is described under analytics, cookies and
              your privacy choices.
            </p>

            <h3>Please do not send more than you need to</h3>
            <p>
              Enquiries are for telling us about a venture, programme or commercial conversation.
              Please do not use them to send confidential material, passwords, health or other
              special-category information, or personal information about people who are not expecting
              it. If a conversation genuinely needs that material, we will agree a proper route for it
              first. Do not email material you are not willing to send without a signed
              confidentiality arrangement where you need one.
            </p>

            <h3>Recruitment and events</h3>
            <p>
              If you apply for a role with Pixelette Holdings, we may process the information you
              provide as part of your application, together with information reasonably required to
              assess it and, where relevant, to complete pre-employment checks.
            </p>
            <p>
              If you register for an event, webinar, briefing or other session we organise, we may
              process your registration details and, where relevant, information about your
              attendance.
            </p>

            <h3>Social media</h3>
            <p>
              We link to our LinkedIn page. That is an ordinary link: there is no social plug-in,
              embed, share button or advertising pixel on this site, so visiting a page here tells no
              social network anything about you. If you follow a link and interact with us there, that
              platform&apos;s own terms and privacy notice apply, and we see only what the platform
              shows us.
            </p>

            <h3>Business development and marketing</h3>
            <p>
              We may use business contact information given to us directly, or obtained from
              appropriate public, professional or business sources, to identify organisations and
              people who may have a legitimate interest in our partnership model or related
              capabilities.
            </p>
            <p>
              Where personal information is involved, we process it in line with data protection and
              electronic marketing law. You can object to direct marketing at any time and we will
              respect that. We do not sell personal information, and we do not share it with third
              parties for their own marketing.
            </p>

            <h2>How and why we use information</h2>
            <p>For each thing we do, the lawful basis we rely on:</p>
            <ul className="list">
              <li>
                Reading and answering your enquiry: our legitimate interest in replying to a business
                enquiry you chose to send us.
              </li>
              <li>
                Assessing whether a partnership or commercial conversation is relevant: our legitimate
                interest in evaluating enquiries we invite through this site.
              </li>
              <li>
                Taking steps towards a contract at your request: steps taken before entering into a
                contract.
              </li>
              <li>
                Delivering and administering an engagement, including invoicing where relevant:
                performance of our contract with you or your organisation.
              </li>
              <li>
                Keeping a record of what was asked and answered: our legitimate interest in an
                accurate record of our business dealings.
              </li>
              <li>
                Keeping the website available and secure: our legitimate interest in the security of
                our own systems.
              </li>
              <li>
                Sending occasional insights or relevant service information, where you have opted in:
                your consent. That consent is optional, is not a condition of sending an enquiry, and
                can be withdrawn at any time.
              </li>
              <li>
                Measuring how the website is used, if analytics is introduced: your consent, given
                through Privacy choices.
              </li>
              <li>
                Meeting tax, accounting and other legal obligations: compliance with a legal
                obligation.
              </li>
            </ul>
            <p>
              Where we rely on legitimate interests we have weighed them against your interests, and
              you can object. See your rights.
            </p>
            <p>
              No decision with legal or similarly significant effects is made about you by automated
              means. Whether we reply, what we say and whether we propose working together are
              decisions made by people.
            </p>

            <h2>Analytics, cookies and your privacy choices</h2>
            <p>
              This website does not use advertising, analytics or cross-site tracking cookies, and it
              does not run a third-party tag manager. Fonts are self-hosted. There is no cookie banner
              because there is nothing non-essential to consent to today.
            </p>
            <p>
              The partnership assessment keeps answers in session storage under the key{' '}
              <code>ph-partnership-assessment</code>. That is not a cookie, is not sent to us, and is
              removed when the tab closes.
            </p>
            <p>
              <strong>Privacy choices</strong>, in the footer of every page, lets you turn website
              analytics on or off in advance. No analytics are running today, so the setting has no
              effect yet; it is off unless you turn it on. Your choice is kept in this browser&apos;s
              local storage under the key <code>ph-analytics</code>, not in a cookie, and is not sent
              to us. If privacy-preserving analytics is ever introduced, it will run only if you allow
              it, this notice and the{' '}
              <Link className="link" href="/cookies">
                cookie policy
              </Link>{' '}
              will be updated, and consent will be obtained first.
            </p>

            <h2>Who else handles it, and where it goes</h2>
            <p>
              Your enquiry is read by the people here who need to answer it. Our website host may
              process ordinary technical records needed to deliver and secure the site. Once an email
              you send reaches us, our mailbox provider carries it in the ordinary way of any
              business correspondence. We may also share information with professional advisers, with
              group companies where needed to assess or deliver a relevant capability, and with a
              regulator or other body where the law requires it. In the context of a corporate
              transaction, we may share information with the parties to it.
            </p>
            <p>
              Because enquiry forms open in your own email program, we do not use a third-party form
              or transactional-email provider to collect enquiries from this site. Each provider we do
              engage processes information for us under that provider&apos;s data processing terms
              where required. If you are assessing us as a supplier and need the contractual position
              in writing, ask and we will send it to your reviewer.
            </p>
            <p>We do not sell personal data or exchange it for monetary consideration.</p>

            <h3>Transfers out of the United Kingdom</h3>
            <p>
              We have not restricted the regions in which hosting and related providers process
              information, so you should assume your information may be handled outside the United
              Kingdom, including in the United States. Under UK data protection law that is a
              restricted transfer and it needs a safeguard. The safeguard is in each provider&apos;s
              data processing terms: the European Commission&apos;s standard contractual clauses
              together with the UK Addendum that adapts them for UK transfers, or the UK&apos;s own
              recognised transfer mechanisms where a provider relies on them.
            </p>

            <h2>Security</h2>
            <p>
              The site is served over an encrypted connection. Enquiry content leaves your device only
              when you send email yourself. Access to correspondence we receive is limited to the
              people who need it.
            </p>
            <p>
              Nobody can promise a system is impossible to break into, and we are not going to. What
              we can tell you is what we do, which is above, and that if something went wrong and your
              information were affected, we would tell you and the regulator where the law requires
              it.
            </p>

            <h2>How long we keep it</h2>
            <p>
              Assessment answers in session storage are not retained by us, because we do not receive
              them. Email you send us is kept only as long as needed to handle the enquiry and any
              later engagement, and for any period the law requires. Ask us to delete an enquiry at
              any point and we will, without asking why, unless we must keep a record for legal or
              tax reasons.
            </p>
            <p>
              Where we have worked together, the record becomes part of the engagement file and is
              kept for the engagement and for as long afterwards as we may need it for legal and tax
              purposes.
            </p>

            <h2>Work across the group</h2>
            <p>
              Partnership and delivery conversations often involve other Pixelette Group companies or
              brands. Where work is taken forward by another group entity, that entity may become the
              controller or processor for information needed to run the engagement, and its own
              privacy notice will apply to that work.
            </p>
            <p>
              This notice does not govern personal information that those entities hold for their own
              services. If you need to exercise a right over information held by another group
              company, approach that organisation. If a request reaches us instead and we are not the
              right controller, we will tell you or pass it on where appropriate.
            </p>

            <h2>Your rights</h2>
            <p>
              Under UK data protection law you may ask us for a copy of the personal information we
              hold about you, have inaccurate information corrected, have information deleted, ask us
              to restrict how we use it, and receive it in a portable form where that applies.
            </p>
            <p>
              Where we rely on our legitimate interests you have the right to object, and we will stop
              unless we have compelling grounds to continue. Where we rely on your consent you can
              withdraw it at any time, which does not affect anything done before you did. The right
              to object to direct marketing is absolute and is set out under business development and
              marketing.
            </p>
            <p>
              To exercise any of these, email{' '}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. We will respond within one
              month and there is no charge. We may ask you to confirm who you are before we release
              information, which protects you rather than us.
            </p>

            <h2>Complaints</h2>
            <p>
              If you are unhappy with how we have handled your information, tell us first at{' '}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> so that we can put it right. We
              will acknowledge your complaint within 30 days, look into it and report the outcome.
            </p>
            <p>
              You also have the right to complain to the Information Commissioner&apos;s Office, the
              UK supervisory authority, at{' '}
              <a href="https://ico.org.uk" rel="noopener noreferrer" target="_blank">
                ico.org.uk
              </a>{' '}
              or on 0303 123 1113. You do not have to come to us first, though we would rather you
              did.
            </p>

            <h2>Children</h2>
            <p>
              This is a business website and our services are offered to organisations and adult
              founders. It is not directed at children and we do not knowingly collect information
              about them. If you believe a child has sent us something, tell us and we will delete it.
            </p>

            <h2>Links to other sites</h2>
            <p>
              We link to our LinkedIn page, to other Pixelette Group companies and brands, to selected
              ventures and to sources we cite. Those sites have their own privacy practices and this
              notice does not extend to them.
            </p>

            <h2>Changes to this notice</h2>
            <p>
              We review this notice when what we do with personal information changes, and at least
              once a year. The effective date and version are at the top of this page. Where a change
              materially affects you we will say so, rather than leaving you to notice a new date.
            </p>

            <h2>Contact</h2>
            <p>
              {SITE.legalName}
              <br />
              {SITE.registeredOffice}
              <br />
              Registered in {SITE.jurisdiction}, company number {SITE.companyNumber}
              <br />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <p>
              We have not appointed a statutory data protection officer, because we are not required
              to. Privacy questions go to the address above and are answered by a person.
            </p>
          </div>

          <Qualifier>
            <strong>Separation of consent.</strong> The privacy acknowledgement required to send an
            enquiry is not consent to marketing. Marketing consent is optional, unticked by default,
            recorded separately with its exact wording where offered, and can be withdrawn at any
            time.
          </Qualifier>
        </div>
      </Section>
    </>
  );
}
