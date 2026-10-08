import Link from 'next/link';
import { FOOTER_NAV, FOOTER_GROUP, SITE, FOOTER_NOTICE, CONTACT, SOCIALS } from '@/content/site';
import { PrivacyChoices } from './PrivacyChoices';

const svg = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, className: 'contact-ic' };

function PhoneIcon() {
  return (
    <svg {...svg}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg {...svg}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="contact-ic">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 10L10 4M10 4H5M10 4v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Footer — the group footer, 18 Sep 2026.
 *
 * Rebuilt to the structure of the Pixelette Technologies footer, which the
 * Marketing site follows too. Top to bottom, as theirs:
 *
 *   1. A grid: a wide brand column, then link columns, each an h2 over a <ul>.
 *      "Privacy choices" sits after the cookies link and opens a dialog.
 *   2. The group band: "Part of Pixelette Group" and the four businesses, this
 *      one marked "You are here".
 *   3. The legal line: the company identity, in two halves.
 *
 * WHERE IT DIFFERS FROM THEIRS, and why:
 *
 * - The brand column carries CONTACT in the slot where Technologies lists its
 *   ISO certificates. Those certificates, and their expiry dates, are
 *   Technologies'; they are not facts about this company.
 * - The financial-promotion notice stays, between the band and the legal line.
 *   It is a deliberate s.21 FSMA measure on every page, not decoration, and
 *   Technologies has no investment content to need one. The internal "HELD
 *   FOR COUNSEL" flag (DISCLAIMER.gate) is still NOT rendered publicly.
 * - No VAT number. Theirs shows one; none is on record for Holdings, and it is
 *   not a fact to guess. The identity below is verified at Companies House.
 */
export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="site-footer__logo"
              src="/media/brand/holdings.png"
              alt={SITE.name}
              width={1000}
              height={254}
            />
            <p className="small">
              Venture partnerships for selected technology ventures: validated, built, launched and
              prepared for growth with the Pixelette Group.
            </p>
            <ul className="site-footer__contact">
              {CONTACT.phone ? (
                <li>
                  <a className="flink" href={`tel:${CONTACT.phoneTel}`}><PhoneIcon /> {CONTACT.phone}</a>
                </li>
              ) : null}
              <li>
                <a className="flink" href={`mailto:${CONTACT.email}`}><MailIcon /> {CONTACT.email}</a>
              </li>
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a className="flink" href={s.href} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {FOOTER_NAV.map((col) => (
            <div key={col.heading}>
              <h2 className="eyebrow site-footer__heading">{col.heading}</h2>
              <ul className="site-footer__list">
                {col.links.flatMap((l) => {
                  const item = (
                    <li key={l.href}>
                      <Link className="flink" href={l.href}>
                        {l.label}
                      </Link>
                    </li>
                  );
                  // Where Technologies puts it: straight after the cookies link.
                  return l.href === '/cookies'
                    ? [item, <li key="privacy-choices"><PrivacyChoices /></li>]
                    : [item];
                })}
              </ul>
            </div>
          ))}
        </div>

        <section className="groupband" aria-labelledby="group-heading">
          <div className="groupband__intro">
            <h2 id="group-heading" className="h4">Part of Pixelette Group</h2>
            <p className="small">
              Pixelette Holdings is part of Pixelette Group, a UK technology group. Holdings is where
              the group&rsquo;s venture partnerships and HSE structures sit; the engineering, growth
              and compliance-readiness work comes from the group&rsquo;s other businesses.
            </p>
          </div>
          <ul className="groupband__list">
            {FOOTER_GROUP.map((c) => (
              <li key={c.name}>
                {c.mark ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="groupband__mark" src={c.mark} alt="" />
                ) : (
                  <span className="groupband__mark" aria-hidden="true" />
                )}
                {c.href ? (
                  <a className="groupband__name" href={c.href} target="_blank" rel="noopener noreferrer">
                    {c.name}
                    <ExternalIcon />
                  </a>
                ) : (
                  <span className="groupband__name groupband__name--current">
                    {c.name}
                    <span className="groupband__here">You are here</span>
                  </span>
                )}
                <span className="groupband__what">{c.what}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="footer-legal">
          {FOOTER_NOTICE}
        </div>

        <div className="site-footer__legal">
          <p className="site-footer__id">
            <span>{SITE.legalName}</span>
            <span>Registered in {SITE.jurisdiction}</span>
            <span>Company number {SITE.companyNumber}</span>
          </p>
          <p className="site-footer__id site-footer__id--end">
            <span>Registered office {SITE.registeredOffice}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
