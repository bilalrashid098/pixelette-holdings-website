/**
 * Pixelette Holdings — site configuration.
 *
 * Corporate identity is verified at Companies House and must not be edited
 * without re-verification. Getting the legal entity wrong on a privacy notice
 * or terms page is a compliance defect, not a typo.
 */

export const SITE = {
  name: 'Pixelette Holdings',
  legalName: 'Pixelette Holdings Ltd',
  companyNumber: '14921782',
  registeredOffice: '20 Wenlock Road, London, N1 7GU',
  jurisdiction: 'England and Wales',
  url: 'https://pixeletteholdings.com',
  locale: 'en_GB',
  lang: 'en-GB',
} as const;

/**
 * Group companies and brands.
 *
 * NAMING DISCIPLINE: "Ltd" and a company number appear only where a registered
 * company is verified at Companies House. Pixelette Certified and Pixelette
 * Group are brands, not registered companies. Pixelette Marketing is named as
 * the Grow capability, but must NOT carry "Ltd" or an active-company claim
 * on legal pages until its restoration is independently confirmed.
 *
 * `capability` is RENDERED — /about prints "{capability}: {name}" — so it moved
 * to the brief's display words on 2026-09-11 (Build / Grow / Ready / Align).
 * It is not a lookup key. The brand-mark keys are `key` on GROUP_PROPOSITION in
 * hse.ts and `id` in /capabilities, and those still read Build / Launch /
 * Assure / Own. Do not "align" them for tidiness — see [[codebase-gotchas]].
 */

export const GROUP = {
  technologies: {
    name: 'Pixelette Technologies Ltd',
    companyNumber: '11716825',
    capability: 'Build',
    isRegisteredCompany: true,
  },
  marketing: {
    name: 'Pixelette Marketing',
    capability: 'Grow',
    isRegisteredCompany: false,
    note: 'Named as the commercial capability and brand. Do not add "Ltd", a company number or an active/restored-company claim until Companies House confirms restoration.',
  },
  certified: {
    name: 'Pixelette Certified',
    capability: 'Ready',
    isRegisteredCompany: false,
    note: 'A capability and service brand. Never describe as a registered company or an independent certification body.',
  },
  holdings: {
    name: 'Pixelette Holdings Ltd',
    companyNumber: '14921782',
    capability: 'Align',
    isRegisteredCompany: true,
  },
} as const;

/**
 * Contact + social. Only what is real on the live site: LinkedIn is the sole
 * active social profile; the contact email is info@pixeletteholdings.com. There
 * is NO telephone number on the original site — add one here only when the
 * founder provides it. A YouTube channel is referenced in the old site's schema
 * but has no live link; confirm it is active before adding.
 */
export const CONTACT = {
  email: 'info@pixeletteholdings.com',
  phone: '+44 20 4518 8226', // supplied by founder (from pixelettetech.com), 2026-08-08
  phoneTel: '+442045188226',
} as const;

/**
 * Group credentials shown on the site. Badge files live at
 * public/media/credentials/. These are re-used from the live Holdings site;
 * confirm each is current and correctly attributed to the group entity before
 * final launch. Agency review-directory awards (Clutch/Manifest/DesignRush)
 * are deliberately NOT here — they belong on the Pixelette Technologies site.
 */
/**
 * Text-only credential labels. Do not render badge images from these keys.
 * Cyber Essentials is not held and must not be listed.
 * ISO lines are Pixelette Technologies' certificates, not a group-wide claim.
 */
export const CREDENTIALS = [
  { key: 'iso-9001', label: 'ISO 9001', note: 'Quality management, Pixelette Technologies' },
  { key: 'iso-27001', label: 'ISO/IEC 27001', note: 'Information security management, Pixelette Technologies' },
] as const;

/** Approved public description of capital relationships. Not a financial promotion. */
export const CAPITAL_STATEMENT =
  'Pixelette Holdings develops relationships with investors and strategic capital partners to support selected ventures. Any potential investment discussions are considered individually and are subject to appropriate eligibility checks, due diligence and legal requirements.';

/** Approved public description of Hybrid Sweat Equity. */
export const HSE_STATEMENT =
  'Pixelette contributes agreed professional services in exchange for a combination of cash fees and equity participation. The allocation of equity, milestone conditions, founder rights and governance arrangements are established in the relevant commercial and shareholder agreements.';

/** Approved public description of the Big Innovation Centre relationship. */
export const BIC_STATEMENT =
  "Pixelette Holdings' founder is also a founder and shareholder of Big Innovation Centre.";

export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/pixelette-holdings/' },
] as const;

/**
 * The footer's "Part of Pixelette Group" band — 18 Sep 2026.
 *
 * The group footer shared with the Pixelette Technologies and Pixelette
 * Marketing sites. The `what` lines are the group's own wording, VERBATIM from
 * the Technologies footer, so every sister site describes every company the
 * same way.
 *
 * Brand names only — no "Ltd". Marketing is dissolved at Companies House
 * (14925088, 24 Feb 2026) and Certified is a brand, so neither may be called
 * a company; see GROUP above. The same is why the band's intro here does not
 * copy the Technologies sentence "one of four companies in Pixelette Group".
 */
export const FOOTER_GROUP = [
  {
    name: 'Pixelette Holdings',
    href: null,
    what: 'Group-level venture partnerships, HSE/equity structures, portfolio and strategic relationships.',
    mark: '/media/brand/pixelette-holdings-white.svg',
  },
  {
    name: 'Pixelette Technologies',
    href: 'https://pixelettetech.com/',
    what: 'Software engineering, AI & automation, blockchain and ongoing product engineering.',
    mark: '/media/brand/pixelette-technologies-white.svg',
  },
  {
    name: 'Pixelette Marketing',
    href: 'https://pixelettemarketing.com/',
    what: 'Demand, pipeline, conversion, revenue and accountable growth systems.',
    mark: '/media/brand/pixelette-marketing-white.svg',
  },
  {
    name: 'Pixelette Certified',
    href: 'https://pixelettecertified.com/',
    what: 'Compliance readiness, cyber assurance, privacy, AI governance and ongoing compliance support.',
    mark: '/media/brand/pixelette-certified-white.svg',
  },
] as const;

export interface NavItem {
  label: string;
  href: string;
}

/**
 * Primary navigation — the 8 Sep 2026 copy brief.
 *
 * The brief's nav is: Home | HSE | How It Works | Portfolio / Proof |
 * Capital Partners | The Group | About | Start.
 *
 *   Home   is the wordmark (SiteHeader), not a nav item.
 *   Start  is the header CTA button, not a nav item.
 *   Capital Partners is added with the rest of the capital surface, which is
 *          held for counsel under s.21 FSMA. Until then it stays footer-only.
 *
 * Labels are relabels, not new routes: "How It Works" is the five-gate section
 * on /hse-model (vercel.json already 301s /how-it-works there), and "The Group"
 * is /capabilities.
 *
 * NOTE: SiteHeader renders top-level items only. There is no dropdown and no
 * `dropdown` rule in globals.css, so the sub-item arrays that used to sit here
 * were never displayed. They have been removed rather than carried forward as
 * dead data; those routes remain reachable from FOOTER_NAV.
 */
export const PRIMARY_NAV: NavItem[] = [
  { label: 'Hybrid Sweat Equity', href: '/hse-model' },
  { label: 'Startups and venture programmes', href: '/startups' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Footer link columns — the group footer structure, 18 Sep 2026.
 *
 * Technologies runs two columns, Services and Company, with its legal pages at
 * the foot of Company. Holdings keeps that shape with one more column, because
 * the portfolio and partner routes are crawl paths to indexed pages and folding
 * them into the first column would make it twice the length of the others.
 * Every route that was in the old five-column footer is still here.
 *
 * The "Privacy choices" control is not a link and is not in this list;
 * SiteFooter renders it straight after the Cookies entry, where Technologies
 * has it.
 */
export const FOOTER_NAV = [
  {
    heading: 'Work with Pixelette',
    links: [
      { label: 'Hybrid Sweat Equity', href: '/hse-model' },
      { label: 'Startups and venture programmes', href: '/startups' },
      { label: 'Explore a partnership', href: '/apply' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Portfolio',
    links: [
      { label: 'Selected ventures', href: '/portfolio' },
      { label: 'Insights', href: '/insights' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Privacy notice', href: '/privacy' },
      { label: 'Cookies and analytics', href: '/cookies' },
      { label: 'Terms', href: '/terms' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
];

/**
 * Routes excluded from indexing.
 *
 * Enforced in code and in the generated robots file, not left to a plugin
 * setting or an editor's discretion.
 */
export const NOINDEX_ROUTES = ['/apply/thank-you'];

/**
 * The site-wide financial-promotion notice.
 *
 * HELD FOR COUNSEL. Load-bearing for the s.21 FSMA position — it must appear
 * in the footer of every page and be approved before publication.
 */
const DISCLAIMER_HEADLINE =
  'This website is provided for information only and is not an offer, invitation or inducement to invest.';

/**
 * ELIGIBILITY WORDING IS NOT YET SINGLE-SOURCED — deliberately.
 *
 * Two variants are live and they differ in scope:
 *
 *   investment  "Any INVESTMENT opportunity is available only to…"  (footer, /disclaimer)
 *   any         "Any opportunity is available only to…"             (the three capital routes)
 *
 * The second is broader. Collapsing the capital routes onto the first would
 * NARROW the wording on precisely the pages most exposed under s.21 FSMA, and
 * that is a decision for counsel, not for a refactor. Both are reproduced here
 * verbatim so the choice is visible in one place and can be resolved with a
 * single edit once counsel rules. See the handover note.
 */
const DISCLAIMER_ELIGIBILITY = {
  investment: CAPITAL_STATEMENT,
  any: CAPITAL_STATEMENT,
} as const;

const DISCLAIMER_NO_ADVICE =
  'Nothing on this website constitutes investment, legal, tax or financial advice.';

/**
 * Footer informational notice. Replaces the investor-category eligibility line
 * in the footer only. The disclaimer page and capital routes still read
 * DISCLAIMER, which is unchanged.
 */
export const FOOTER_NOTICE =
  'This website provides general information about Pixelette Holdings and its activities. It does not constitute investment advice or an offer of securities. Any investment-related communication is subject to applicable legal and regulatory requirements.';

export const DISCLAIMER = {
  headline: DISCLAIMER_HEADLINE,
  eligibility: DISCLAIMER_ELIGIBILITY,
  noAdvice: DISCLAIMER_NO_ADVICE,
  /** The FCA / s.21 explanation. Shown on the capital routes, not in the footer. */
  s21: 'The FCA treats websites and online materials as capable of constituting financial promotions; section 21 of the Financial Services and Markets Act 2000 restricts unauthorised invitations or inducements to engage in investment activity.',
  /** The footer line. Output is byte-identical to the previous hand-written string. */
  short: `${DISCLAIMER_HEADLINE} ${DISCLAIMER_ELIGIBILITY.investment} ${DISCLAIMER_NO_ADVICE}`,
  gate: 'HELD FOR COUNSEL — this wording must be approved before the site is published.',
} as const;
