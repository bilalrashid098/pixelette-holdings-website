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
export const CREDENTIALS = [
  { key: 'appg', label: 'APPG AI Secretariat', note: 'UK Parliament' },
  { key: 'iso-9001', label: 'ISO 9001', note: 'Quality management' },
  { key: 'iso-27001', label: 'ISO 27001', note: 'Information security' },
  { key: 'cyber-essentials', label: 'Cyber Essentials', note: 'UK cyber standard' },
] as const;

export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/pixelette-holdings/' },
] as const;

/**
 * The Pixelette Group companies — for the header/footer cross-links and the
 * group logo strip. Logos live at public/media/brand/<key>.png (fetched by
 * download-assets.ps1) and fall back to the name when absent. Pixelette Certified
 * has no logo on the live site, so it renders as a text link.
 */
// Uniform lockup: each company's SQUARE brand mark (one fixed size) + its name in
// one consistent font. This replaces the inconsistent baked-in logo lockups so all
// four match. Marks live at public/media/brand/ (fetched by download-assets.ps1).
export const GROUP_COMPANIES = [
  { key: 'holdings', name: 'Pixelette', sub: 'Holdings', href: '/', mark: 'mark-holdings.png' },
  { key: 'technologies', name: 'Pixelette', sub: 'Technologies', href: 'https://pixelettetech.com/', mark: 'mark-technologies.png' },
  { key: 'marketing', name: 'Pixelette', sub: 'Marketing', href: 'https://pixelettemarketing.com/', mark: 'mark-marketing.svg' },
  { key: 'certified', name: 'Pixelette', sub: 'Certified', href: 'https://pixelettecertified.com/', mark: 'certified-icon.svg' },
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
  { label: 'HSE', href: '/hse-model' },
  { label: 'How It Works', href: '/hse-model#how-it-works' },
  { label: 'Portfolio / Proof', href: '/portfolio' },
  // PUBLICATION-GATED, COUNSEL. Ships with the §13 homepage section and the
  // closing capital CTA; see that section's comment. /partners/capital stays
  // noindexed — this promotes the route in navigation, nothing else.
  { label: 'Capital Partners', href: '/partners/capital' },
  { label: 'The Group', href: '/capabilities' },
  { label: 'About', href: '/about' },
];

export const FOOTER_NAV = [
  {
    heading: 'Build with Pixelette',
    links: [
      { label: 'HSE Model', href: '/hse-model' },
      { label: 'Founder Protection', href: '/hse-model/founder-protection' },
      { label: 'Validation Sprint', href: '/validation-sprint' },
      { label: 'Apply for HSE', href: '/apply' },
    ],
  },
  {
    heading: 'Portfolio',
    links: [
      { label: 'Equity Investments', href: '/portfolio/investments' },
      { label: 'HSE Ventures', href: '/portfolio/hse-ventures' },
      { label: 'Delivered Ventures', href: '/portfolio/delivered-ventures' },
      { label: '2Connect', href: '/portfolio/2connect' },
    ],
  },
  {
    heading: 'Partner with Pixelette',
    links: [
      { label: 'Incubators & Accelerators', href: '/partners/accelerators' },
      { label: 'Capital Partners', href: '/partners/capital' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Capabilities', href: '/capabilities' },
      { label: 'About', href: '/about' },
      { label: 'Social Impact', href: '/social-impact' },
      { label: 'Insights', href: '/insights' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
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
export const NOINDEX_ROUTES = [
  '/apply/thank-you',
  '/partners/capital',
  '/partners/capital/qualification',
  '/partners/capital/thank-you',
];

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
  investment:
    'Any investment opportunity is available only to professional, high-net-worth or self-certified sophisticated investors, subject to eligibility verification and formal documentation.',
  any: 'Any opportunity is available only to professional, high-net-worth or self-certified sophisticated investors, subject to eligibility verification and formal documentation.',
} as const;

const DISCLAIMER_NO_ADVICE =
  'Nothing on this website constitutes investment, legal, tax or financial advice.';

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
