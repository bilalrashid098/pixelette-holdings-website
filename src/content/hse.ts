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

/**
 * Stage ceilings.
 *
 * `pct` is a NUMBER, not a formatted string. Three sites need the same figures
 * in three different shapes — a table cell, a slash list and a prose sentence —
 * and a pre-formatted string cannot be reshaped, which is exactly why those
 * sites drifted into hand-typed literals. Derive; never retype.
 */
export const CEILINGS = [
  { stage: 'Pre-seed or concept', pct: 30, need: 'Validation, product, launch, assurance and venture-building' },
  { stage: 'Post-MVP or funded founder', pct: 20, need: 'Product advancement, launch, traction and assurance' },
  { stage: 'Traction or Series A-ready', pct: 12, need: 'Targeted execution and readiness work' },
] as const;

/** "12/20/30%" — ascending, for the comparison table. */
export const CEILING_FIGURES = `${[...CEILINGS].map((c) => c.pct).sort((a, b) => a - b).join('/')}%`;

/** "30%, 20% and 12%" — descending, for prose. */
export const CEILING_SENTENCE = (() => {
  const p = CEILINGS.map((c) => `${c.pct}%`);
  return `${p.slice(0, -1).join(', ')} and ${p[p.length - 1]}`;
})();

/** The highest ceiling, for any copy that names a single maximum. */
export const CEILING_MAX_PCT = Math.max(...CEILINGS.map((c) => c.pct));

/**
 * The founder's cash share of the agreed professional fee.
 *
 * Load-bearing: it appears in the site-wide meta description as well as on
 * /hse-model, so a change here is a change to every route's metadata.
 */
export const FOUNDER_CASH_PCT = 50;

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

/**
 * The five stages, per section 05 of the 8 Sep 2026 copy brief:
 * Validate, Design, Build, Launch, Scale.
 *
 * CAUTION. These are STAGE names. They are not the CAPABILITY names, which are
 * Build / Launch / Assure / Own and are used as object KEYS by
 * CapabilityBrand.tsx and Icons.tsx to look up each group company's brand mark.
 * The stage formerly called "Assure" has gone; the capability called "Assure"
 * (Pixelette Certified) must survive. Renaming the capability drops its logo
 * with no error and no build failure.
 *
 * The `note` on each stage is a claim gate, not decoration. The two stages the
 * brief retires carried notes that must not be lost, so both now sit on Scale,
 * which is where enterprise readiness and capital preparation ended up.
 */
export const GATES: Gate[] = [
  {
    n: '01',
    name: 'Validate',
    body: 'Prove the problem, the target customer and the commercial outcome before anyone funds a product. The founder’s thesis becomes an evidence-backed scope.',
    evidence: 'Evidence-backed opportunity thesis and scope',
    decision: 'Stop, revise or proceed',
    note: 'No delivery equity vests merely because validation completed.',
  },
  {
    n: '02',
    name: 'Design',
    body: 'Define the product, the architecture, the commercial model, the risks and the milestones, so that what follows is a plan rather than an open-ended engagement.',
    evidence: 'Build and launch blueprint',
    decision: 'Approve the blueprint, revise or stop',
  },
  {
    n: '03',
    name: 'Build',
    body: 'Deliver the agreed MVP or core product against explicit acceptance criteria: product design, UX, architecture, engineering, security and quality assurance.',
    evidence: 'A usable, testable product',
    decision: 'Accept, remedy or stop',
    note: 'Only accepted delivery milestones can vest delivery equity.',
  },
  {
    n: '04',
    name: 'Launch',
    body: 'Prepare go-to-market, sales assets and operating workflows, and close the enterprise gaps that would otherwise stall the first serious buyer.',
    evidence: 'A launch-ready venture',
    decision: 'Continue, reposition or stop',
    note: 'The contracted launch system is delivered. Customers, revenue and product-market fit are not guaranteed.',
  },
  {
    n: '05',
    name: 'Scale',
    body: 'Harden the technology, automate operations, improve enterprise readiness and support growth and capital preparation.',
    evidence: 'A business built to scale',
    decision: 'Bootstrap, extend or pursue external capital',
    note: 'Independent certification is not a Pixelette milestone unless an external accredited body awards it. No investment, fundraising or introduction result is guaranteed.',
  },
];

/**
 * The five stage names as a sentence: "Validate, Design, Build, Launch and
 * Scale". Derived, because /partners/capital used to hand-type it — and the
 * rename in this commit is exactly the change that would have left that page
 * contradicting the two pages that render GATES.
 */
export const gateSentence = () => {
  const n = GATES.map((g) => g.name);
  return `${n.slice(0, -1).join(', ')} and ${n[n.length - 1]}`;
};

/**
 * "Validate-to-Scale" — the programme's first and last stage. Derived for the
 * same reason as gateSentence().
 */
export const PROGRAMME_NAME = `${GATES[0]!.name}-to-${GATES[GATES.length - 1]!.name}`;

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
