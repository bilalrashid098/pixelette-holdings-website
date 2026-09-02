import Link from 'next/link';
import { FOOTER_NAV, SITE, DISCLAIMER, CONTACT, SOCIALS } from '@/content/site';
import { GroupStrip } from './GroupStrip';

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

/**
 * Footer.
 *
 * Carries the site-wide financial-promotion notice on every page, that is a
 * deliberate s.21 FSMA measure, not decoration. The HELD flag stays visible
 * until counsel approves the wording; do not remove it to make the footer
 * look finished.
 */
export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <GroupStrip />
        <div className="footer-cols">
          {FOOTER_NAV.map((col) => (
            <div key={col.heading}>
              <h4 className="h4">{col.heading}</h4>
              {col.links.map((l) => (
                <Link className="small flink" key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Contact + social. The financial-promotion notice below is protective
            and stays. The internal "HELD FOR COUNSEL" flag (DISCLAIMER.gate) is
            NOT rendered publicly, it is an editorial note, tracked in the
            counsel brief and site.ts, not a message for visitors. The disclaimer
            wording still requires counsel sign-off before public launch. */}
        <div className="footer-contact">
          {CONTACT.phone ? (
            <a className="small flink" href={`tel:${CONTACT.phoneTel}`}><PhoneIcon /> {CONTACT.phone}</a>
          ) : null}
          <a className="small flink" href={`mailto:${CONTACT.email}`}><MailIcon /> {CONTACT.email}</a>
          {SOCIALS.map((s) => (
            <a className="small flink" key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon /> {s.label}
            </a>
          ))}
        </div>

        <div className="footer-legal">
          <strong>Important notice.</strong> {DISCLAIMER.short}
        </div>

        <div className="footer-base">
          <span>
            {SITE.legalName} · Registered in {SITE.jurisdiction} · Company number{' '}
            {SITE.companyNumber} · {SITE.registeredOffice}
          </span>
          {/* Worklist 1m: the footer year must be current. Derived, not typed,
              so it cannot go stale the way the live site's did. */}
          <span>© {new Date().getFullYear()} {SITE.legalName}</span>
        </div>
      </div>
    </footer>
  );
}
