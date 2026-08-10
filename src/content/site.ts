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
 * the Launch capability, but must NOT carry "Ltd" or an active-company claim
 * on legal pages until its restoration is independently confirmed.
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
    capability: 'Launch',
    isRegisteredCompany: false,
    note: 'Named as the commercial capability and brand. Do not add "Ltd", a company number or an active/restored-company claim until Companies House confirms restoration.',
  },
  certified: {
    name: 'Pixelette Certified',
    capability: 'Assure',
    isRegisteredCompany: false,
    note: 'A capability and service brand. Never describe as a registered company or an independent certification body.',
  },
  holdings: {
    name: 'Pixelette Holdings Ltd',
    companyNumber: '14921782',
    capability: 'Own',
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
  children?: { label: string; href: string }[];
}

export const PRIMARY_NAV: NavItem[] = [
  { label: 'HSE Model', href: '/hse-model' },
  {
    label: 'Portfolio',
    href: '/portfolio',
    children: [
      { label: 'Equity Investments', href: '/portfolio/investments' },
      { label: 'Direct HSE Ventures', href: '/portfolio/hse-ventures' },
      { label: 'Delivered Ventures', href: '/portfolio/delivered-ventures' },
      { label: '2Connect case study', href: '/portfolio/2connect' },
    ],
  },
  { label: 'Capabilities', href: '/capabilities' },
  {
    label: 'Partners',
    href: '/partners/accelerators',
    children: [
      { label: 'Incubators & Accelerators', href: '/partners/accelerators' },
      { label: 'Capital Partners', href: '/partners/capital' },
    ],
  },
  { label: 'Insights', href: '/insights' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About Pixelette', href: '/about' },
      { label: 'Social Impact', href: '/social-impact' },
    ],
  },
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
export const DISCLAIMER = {
  short:
    'This website is provided for information only and is not an offer, invitation or inducement to invest. Any investment opportunity is available only to professional, high-net-worth or self-certified sophisticated investors, subject to eligibility verification and formal documentation. Nothing on this website constitutes investment, legal, tax or financial advice.',
  gate: 'HELD FOR COUNSEL — this wording must be approved before the site is published.',
} as const;
