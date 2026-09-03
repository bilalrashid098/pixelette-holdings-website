/**
 * Pixelette Holdings, the HSE model.
 *
 * Canonical source: Main Vault/Topics/hybrid-sweat-equity.md § HSE 2.0.
 *
 * Two rules govern everything in this file:
 *
 *  1. Ceilings are MAXIMA, never offers. Any copy that reads as a price or a
 *     standard term is wrong.
 *  2. What is contracted is the WORK, never the outcome. Customers, revenue,
 *     product-market fit and fundraising are explicitly not guaranteed.
 */

export const ECONOMICS = [
  {
    figure: '50%',
    title: 'Founder funded cash',
    body: 'The founder funds half of the agreed professional fee across approved milestone tranches.',
  },
  {
    figure: '≤50%',
    title: 'Eligible fee to equity',
    body: 'The remaining eligible fee may convert into capped equity, subject to valuation, stage ceilings, accepted milestones and signed documentation.',
  },
  {
    figure: '£0',
    title: 'Pixelette cash deployed',
    body: 'Pixelette contributes professional execution, not a cash cheque. The venture funds third-party, licence, audit and certification costs.',
  },
  {
    figure: '100%',
    title: 'Full cash alternative',
    body: 'A founder may choose to pay the complete professional fee and retain the equity that would otherwise be considered.',
  },
] as const;

export const CEILINGS = [
  { stage: 'Pre-seed or concept', ceiling: 'Up to 30%', need: 'Validation, product, launch, assurance and venture-building' },
  { stage: 'Post-MVP or funded founder', ceiling: 'Up to 20%', need: 'Product advancement, launch, traction and assurance' },
  { stage: 'Traction or Series A-ready', ceiling: 'Up to 12%', need: 'Targeted execution and readiness work' },
] as const;

export const CEILINGS_QUALIFIER =
  'These are ceilings, not standard prices or offers. The actual equity requires an agreed valuation or conversion mechanism, scope, risk assessment and signed legal documentation.';

export interface Gate {
  n: string;
  name: string;
  body: string;
  evidence: string;
  decision: string;
  note?: string;
}

export const GATES: Gate[] = [
  {
    n: '01',
    name: 'Validate',
    body: 'Prove the problem before funding the product. Customer, commercial, product and technical validation turn the founder’s thesis into an evidence-backed scope.',
    evidence: 'Validation findings, product blueprint, technical architecture, roadmap',
    decision: 'Stop, revise or proceed',
    note: 'No delivery equity vests merely because validation completed.',
  },
  {
    n: '02',
    name: 'Build',
    body: 'Deliver the agreed product increment against explicit acceptance criteria: product design, UX, architecture, engineering, security and quality assurance.',
    evidence: 'Accepted increments, test evidence, architecture records, delivery history',
    decision: 'Accept, remedy or stop',
    note: 'Only accepted delivery milestones can vest delivery equity.',
  },
  {
    n: '03',
    name: 'Launch',
    body: 'Build and operate the agreed commercialisation system for a defined period: positioning, launch assets, pilot strategy, demand systems, CRM structure and traction measurement.',
    evidence: 'Launch plan, market assets, pipeline records, campaign evidence, pilot activity',
    decision: 'Continue, reposition or stop',
    note: 'The contracted launch system is delivered. Customers, revenue and product-market fit are not guaranteed.',
  },
  {
    n: '04',
    name: 'Assure',
    body: 'Prepare the product and organisation for enterprise, security, governance and relevant regulatory scrutiny: readiness assessment, control design, policy and evidence support.',
    evidence: 'Gap register, implementation evidence, readiness pack, risk record',
    decision: 'Ready or remediate',
    note: 'Independent certification is not a Pixelette milestone unless an external accredited body awards it.',
  },
  {
    n: '05',
    name: 'Capitalise',
    body: 'Decide how the venture should fund its next stage of growth: evidence-room structure, diligence support, operating metrics and capital-readiness preparation.',
    evidence: 'Current diligence pack, decision-ready growth plan, explicit recommendation',
    decision: 'Bootstrap, extend or pursue external capital',
    note: 'No investment, fundraising or introduction result is guaranteed.',
  },
];

export const CAPABILITIES = [
  {
    n: '01',
    capability: 'Build',
    arm: 'Pixelette Technologies Ltd',
    body: 'Product, AI, blockchain, architecture, engineering, infrastructure, security and launch-ready technology.',
    url: 'https://pixelettetech.com/',
  },
  {
    n: '02',
    capability: 'Launch',
    arm: 'Pixelette Marketing',
    body: 'Positioning, brand, campaigns, demand generation, sales infrastructure, partnerships and early traction.',
    gate: 'Naming rule: use as the commercial capability and brand. Do not use "Ltd", a company number or an active-company claim on legal pages until restoration is independently verified.',
    url: 'https://pixelettemarketing.com/',
  },
  {
    n: '03',
    capability: 'Assure',
    arm: 'Pixelette Certified',
    body: 'Security, governance, compliance implementation, certification readiness and evidence preparation.',
    gate: 'Independent certification remains external. Never imply Pixelette awards ISO certification or accreditation.',
    url: 'https://pixelettecertified.com/',
  },
  {
    n: '04',
    capability: 'Own',
    arm: 'Pixelette Holdings Ltd',
    body: 'Venture selection, commercial structuring, services-for-equity participation, governance and capital readiness.',
    url: '/',
  },
] as const;

/** The eight commitments. The primary conversion mechanism on the site. */
export const FOUNDER_CHARTER = [
  'Equity vests only against accepted milestones.',
  'No equity is earned for rejected or undelivered work.',
  'Unvested equity returns when the relevant delivery stops.',
  'A stage-based equity ceiling is agreed before work begins.',
  'The founder retains operational control.',
  'Material scope changes require written agreement.',
  'A full-cash route is always available.',
  'Commercial service value is documented transparently.',
] as const;

export const PIXELETTE_PROTECTIONS = [
  'Equity documents completed before equity-funded work begins.',
  'The cash tranche is paid before each phase.',
  'Defined founder participation requirements.',
  'Work-pause rights for overdue decisions or payments.',
  'Information rights while Pixelette remains a shareholder.',
  'IP transfer linked to payment and milestone completion.',
  'Founder-departure, asset-transfer and long-stop provisions.',
] as const;

/** Stated plainly, because being explicit about limits is what makes the rest credible. */
export const NOT_PROMISED = [
  'A cash investment from Pixelette.',
  'Automatic entry into the portfolio.',
  'Customers, revenue or product-market fit.',
  'Fundraising or investor introductions.',
  'Independent certification by Pixelette.',
  'Unlimited development or open-ended support.',
  'Payment of third-party costs.',
] as const;

/**
 * Continuation equity.
 *
 * HELD. Tranche B is retained at up to 3%, but redefined as earned
 * continuation equity rather than an automatic advisory allocation. It must
 * NOT be presented as operable until the rate, period and vesting basis are
 * defined and counsel has approved the instrument.
 */
export const CONTINUATION_EQUITY_HELD = {
  flag: 'Held, counsel and commercial definition',
  body: 'The current internal model contemplates a possible allocation of up to 3% for defined post-launch commercialisation, governance or scaling work, earned only while that work continues. The rate, period, vesting basis and legal treatment remain unresolved, so no operable term is published.',
} as const;

/**
 * Delivery timeline, the concrete proof points from the live site. Presented
 * as TARGETS, not guarantees (the live site's own qualifier is preserved).
 */
export const PROOF_TIMELINE = [
  { figure: '6–10 wks', label: 'MVP built' },
  { figure: '90 days', label: 'Initial traction' },
  { figure: '6–9 months', label: 'Target to investor-readiness' },
] as const;

export const PROOF_TIMELINE_NOTE =
  'Target timeframes, not guarantees: outcomes depend on execution, market conditions, founder responsiveness and venture complexity.';

/**
 * Group credentials shown as a trust strip. Names only, certificate numbers and
 * issuing bodies are added once the current certificates are attached (see /about).
 * "Previously" on the Blockchain APPG is load-bearing and must stay accurate.
 */
export const CREDENTIALS_STRIP = [
  'ISO 9001',
  'ISO 27001',
  'Cyber Essentials Plus',
  'APPG on AI, Secretariat (UK Parliament)',
] as const;

/**
 * Credential badges, the real accreditation marks. Rendered as images from
 * public/media/credentials/ (fetched by download-assets.ps1) with a text-pill
 * fallback when a file is absent. Certificate NUMBERS stay off until attached;
 * the marks themselves are Pixelette's own held credentials.
 */
export const CREDENTIALS = [
  { label: 'ISO 9001', img: '/media/credentials/iso-9001.png' },
  { label: 'ISO 27001', img: '/media/credentials/iso-27001.png' },
  { label: 'Cyber Essentials Plus', img: '/media/credentials/cyber-essentials.png' },
  { label: 'APPG on AI, Secretariat', img: '/media/credentials/appg.png' },
] as const;

/**
 * Institutional standing, the authority signals that set Pixelette apart from
 * an ordinary venture builder. All accurate and gate-safe: APPG tense preserved
 * (AI current, Blockchain previous), BIC stated as an investment with NO
 * percentage (standing directive), no head-of-state named (Cyprus held).
 */
export const INSTITUTIONAL = [
  {
    title: 'Inside UK Parliament',
    body: 'Secretariat to the All Party Parliamentary Group on Artificial Intelligence, and previously to the APPG on Blockchain, a seat inside the regulatory conversation, not on the receiving end of it.',
  },
  {
    title: 'Big Innovation Centre',
    body: 'An equity investment in the cross-sector innovation think tank shaping AI, blockchain and digital economy policy. A structural relationship, not advisory.',
  },
  {
    title: 'Certified and secure',
    body: 'ISO 9001 and ISO 27001 certified, with Cyber Essentials Plus, the quality and security posture that regulated and enterprise buyers require before they engage.',
  },
  {
    title: 'Government engagement',
    body: 'Institutional and government engagement across multiple markets, including national development and skills programmes.',
  },
] as const;

/**
 * Why founders choose Pixelette. Ported from the live site's differentiators.
 * Two live-site specifics are deliberately softened pending evidence and flagged
 * in the content audit: "top 5% of engineers" -> "senior"; "13+ countries" ->
 * "multiple markets"; named individuals (Dr Edward Zuckerberg, Dr Hatem Bugshan)
 * are omitted pending consent. Restore on explicit founder confirmation.
 */
export const WHY_CHOOSE = [
  {
    title: 'We deploy top tier technical talent',
    body: 'Our in-house teams specialise in AI, blockchain and product. We don’t outsource, we build with senior engineers and strategic operators.',
  },
  {
    title: 'We craft investor ready ventures',
    body: 'From market positioning to pitch creation, we prepare founders to raise with clarity and confidence, turning bold ideas into investable stories.',
  },
  {
    title: 'We execute across the full venture stack',
    body: 'Beyond engineering, we cover go-to-market, legal, compliance and governance, the ground most venture partners ignore.',
  },
  {
    title: 'We give you policy level access',
    body: 'As Secretariat to the UK Parliament’s APPG on AI, and previously on Blockchain, we bring founders close to where emerging tech regulation is formed.',
  },
  {
    title: 'We unlock global reach',
    body: 'Our international network spans multiple markets and includes venture investors, regulators and industry leaders.',
  },
] as const;

export const QUALIFICATION_MESSAGE =
  'HSE is designed for founders with a committed operator, a defined technology opportunity and capital available for professional execution. For an approved programme, the founder funds the agreed cash portion while Pixelette may convert an eligible part of its professional fee into capped, milestone-earned equity. Applying does not mean Pixelette has accepted the venture, will invest cash, will raise funding or will provide investor introductions.';
