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

/**
 * The HSE proposition in plain English — section 03 of the 8 Sep 2026 copy
 * brief.
 *
 * Must render BEFORE the worked example, the structures and anything that
 * quotes a percentage. The brief: "This should come before detailed
 * percentages, valuation examples or technical terminology." The reviewer's
 * complaint was that the page reached the mechanics before the reader had been
 * given the idea.
 *
 * Note what the closing line rules out in both directions. It is there to stop
 * the model being read as free work by founders, and as passive investment by
 * everyone else — including, later on the page, capital partners.
 */
export const HSE_PROPOSITION = [
  'You pay an agreed portion of approved delivery fees in cash.',
  'The agreed balance can convert into equity against defined milestones and delivered work.',
  'Pixelette shares execution risk and participates in the upside it helps create.',
  'The commercial terms, valuation basis and governance are agreed before work begins.',
] as const;

export const HSE_PROPOSITION_CLOSE =
  'HSE is not free development and it is not passive investment. It is an aligned delivery-and-equity model.';

/**
 * The worked example.
 *
 * The 50 / ≤50 split is ONE illustrative structure, not the universal HSE
 * model. Section 04 of the brief introduces cash-led, balanced and equity-led
 * structures agreed venture by venture, so any copy that reads as "the founder
 * always funds half" is wrong and contradicts the section below it.
 *
 * The brief's instruction is to label the split as an example rather than
 * delete it: "label it clearly as an example rather than the universal HSE
 * structure unless that split is contractually fixed." Hence the wording here
 * and ECONOMICS_EXAMPLE_NOTE, which must travel with these cards wherever they
 * are rendered.
 */
export const ECONOMICS = [
  {
    figure: '50%',
    title: 'Founder funded cash',
    body: 'In this example the founder funds half of the agreed professional fee across approved milestone tranches. The actual proportion is agreed venture by venture.',
  },
  {
    figure: '≤50%',
    title: 'Eligible fee to equity',
    body: 'The agreed balance may convert into capped equity, subject to valuation, the agreed ceiling, accepted milestones and signed documentation.',
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
 * HSE structures, per section 04 of the 8 Sep 2026 copy brief.
 *
 * These REPLACE the published stage ceilings (30% / 20% / 12% by stage). The
 * brief's instruction is "REWRITE EXISTING OPTION CARDS", and its lead keeps
 * stage as one input among several rather than as the published axis: "The
 * right cash/equity mix depends on stage, evidence, valuation, delivery scope
 * and capital position. Every structure is agreed venture by venture."
 *
 * Consequence worth knowing before anyone "restores" the numbers: the site no
 * longer publishes an equity percentage anywhere. The CAP itself is still a
 * founder protection and is still claimed — capped, agreed before work begins,
 * earned against accepted delivery — it simply is not quantified in public.
 * The only percentage left in the content layer is the BIC shareholding in
 * ventures.ts, which is a different claim entirely.
 *
 * `eligibility` is not decoration. The brief: "Avoid implying that every
 * founder can select any option without assessment."
 */
export const STRUCTURES = [
  {
    name: 'Cash-led HSE',
    body: 'More cash, less equity. Best suited to funded or revenue-generating ventures that want alignment without unnecessary dilution.',
  },
  {
    name: 'Balanced HSE',
    body: 'A measured blend of cash and milestone-earned equity. Designed for founders protecting runway while still funding serious execution.',
  },
  {
    name: 'Equity-led HSE',
    body: 'A greater share of approved delivery value converts into equity, subject to eligibility, valuation, governance and an agreed minimum cash contribution.',
  },
] as const;

/**
 * The founder's cash share of the agreed professional fee.
 *
 * Load-bearing: it appears in the site-wide meta description as well as on
 * /hse-model, so a change here is a change to every route's metadata.
 */
export const FOUNDER_CASH_PCT = 50;

export const STRUCTURES_QUALIFIER =
  'Which structure is available depends on stage, evidence, valuation, delivery scope and capital position, and is decided by assessment rather than by preference. The actual equity requires an agreed valuation or conversion mechanism, scope, risk assessment and signed legal documentation.';

/**
 * Relationship economics, per section 06 of the brief.
 *
 * Comparative claims about third parties are the highest-risk copy on the
 * page, so the hedging here is deliberate and must survive editing. The
 * brief's instruction: "Do not use sweeping statements such as 'studios take
 * 25%' as a universal market fact. Use 'typical', 'may' or specific sourced
 * examples when making comparative claims."
 *
 * This replaced a table asserting that a typical venture studio takes
 * "25-90% of your company" — a market-wide claim about other people's
 * commercial terms, stated without a source. Note the surviving verbs:
 * "typical", "may combine", "varies". Do not sharpen them.
 */
export const RELATIONSHIP_ECONOMICS = [
  {
    name: 'Pixelette HSE',
    body: 'Cash plus milestone-earned equity; integrated execution; upside aligned to delivery; founder-led venture governance.',
  },
  {
    name: 'Typical agency',
    body: 'Cash fees for a defined scope; execution ends at the contracted service boundary; no shared venture upside.',
  },
  {
    name: 'Traditional venture studio',
    body: 'May combine capital and central services with meaningful equity participation; structures and control rights vary widely.',
  },
  {
    name: 'VC / angel capital',
    body: 'Capital for equity; operational support varies; the founder still carries responsibility for assembling and leading execution.',
  },
] as const;

export const RELATIONSHIP_ECONOMICS_NOTE =
  'Comparisons are illustrative. Actual third-party terms vary and should be assessed on their own merits.';

/**
 * Travels with the ECONOMICS cards. Without it those figures read as the
 * standard terms of every HSE engagement, which they are not.
 */
export const ECONOMICS_EXAMPLE_NOTE =
  'The cash and equity balance depends on stage, evidence, valuation, delivery scope and capital position, and is agreed venture by venture. It is not a fixed split.';

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

/**
 * Why Holdings exists — section 02 of the 8 Sep 2026 copy brief.
 *
 * `key` is the CANONICAL capability name and is what CapabilityBrand.tsx and
 * Icons.tsx look up to resolve each company's brand mark. `verb` is the brief's
 * DISPLAY word for the same thing. They differ for three of the four, and
 * conflating them silently drops a logo — the same failure the stage rename in
 * section 05 had to avoid.
 *
 * The two are separate rather than renamed because the brief itself does not
 * treat these verbs as a taxonomy: section 02 calls them Build / Grow / Ready /
 * Align, and section 08 calls the same four capabilities "Product and
 * engineering", "Go-to-market and growth", "Enterprise readiness" and "Venture
 * governance". Two label sets for one set of capabilities, in adjacent
 * sections, is descriptive writing rather than a rename directive — so the
 * site's canonical vocabulary (Build / Launch / Assure / Own, used by the Orbit,
 * /about and /capabilities) is left alone. Worth confirming with the copy owner.
 */
export const GROUP_PROPOSITION = [
  {
    key: 'Build',
    company: 'Pixelette Technologies',
    verb: 'Build',
    body: 'AI, software, automation and product engineering.',
    url: 'https://pixelettetech.com/',
  },
  {
    key: 'Launch',
    company: 'Pixelette Marketing',
    verb: 'Grow',
    body: 'Brand, go-to-market, demand generation and commercial growth.',
    url: 'https://pixelettemarketing.com/',
  },
  {
    key: 'Assure',
    company: 'Pixelette Certified',
    verb: 'Ready',
    body: 'Compliance, assurance and enterprise readiness.',
    url: 'https://pixelettecertified.com/',
  },
  {
    key: 'Own',
    company: 'Pixelette Holdings',
    verb: 'Align',
    body: 'Venture structure, equity, governance, group orchestration and capital relationships.',
    url: '/',
  },
] as const;

export const GROUP_PROPOSITION_CLOSE = 'Holdings aligns the venture. The group executes it.';

/**
 * The venture diagnostic — section 07 of the 8 Sep 2026 copy brief.
 *
 * PUBLICATION-GATED. This section is built to the brief's copy, and the brief's
 * copy describes a product that does not exist yet. Three assertions here are
 * not currently true of the thing the CTA points at:
 *
 *   "AI-assisted"   /apply renders a static form. There is no AI anywhere in
 *                   this codebase.
 *   "20 minutes"    no timing has been measured; the form is ten questions.
 *   "It produces a structured brief for human review"
 *                   the form produces nothing. FORM_APPROVED is false, the
 *                   submit button is disabled, and there is no action, no
 *                   endpoint and no storage.
 *
 * The brief's own publication gate covers this: "Every CTA should lead to a
 * real workflow: venture diagnostic, founder application or capital-partner
 * enquiry." Until the form accepts a submission — which needs a data
 * controller, lawful basis, retention period and CRM destination — this section
 * must not go live. Do not treat a passing build as clearance.
 */
export const DIAGNOSTIC = [
  'Problem and customer pain.',
  'Product and technical ambition.',
  'Evidence, traction and market route.',
  'Founder and team readiness.',
  'Delivery and capability gaps.',
  'Potential HSE fit and next step.',
] as const;

export const DIAGNOSTIC_NOTE =
  'No obligation. No equity commitment. Human review before any proposal.';

/**
 * Execution capability — section 08.
 *
 * Deliberately carries NO company names. The brief: "This section should show
 * outcomes and capabilities, not repeat the group-company introductions." The
 * group companies are introduced once, in section 02, and this section says
 * what the model does.
 */
export const EXECUTION = [
  {
    title: 'Product and engineering',
    body: 'AI, software, data, platforms and automation.',
  },
  {
    title: 'Go-to-market and growth',
    body: 'Positioning, demand, sales enablement and commercial systems.',
  },
  {
    title: 'Enterprise readiness',
    body: 'Compliance, assurance, security and operational readiness.',
  },
  {
    title: 'Venture governance',
    body: 'Milestone control, commercial alignment, reporting and capital preparation.',
  },
] as const;

/**
 * Founder control — section 11 of the 8 Sep 2026 copy brief.
 *
 * The brief's instruction is "KEEP SECTION - MAKE GOVERNANCE PRECISE", and the
 * precision is the point: every line is qualified by the documents that
 * actually determine the outcome. Note what is NOT claimed — no percentage, no
 * guaranteed retained stake. The brief: "Avoid absolute promises such as 'you
 * will always retain X%' unless the legal structure guarantees that outcome
 * across every HSE deal."
 *
 * These replace the eight-commitment charter on the HOMEPAGE only.
 * FOUNDER_CHARTER is unchanged and still renders in full on
 * /hse-model/founder-protection, which is the page the charter belongs to.
 */
export const FOUNDER_CONTROL = [
  'Founder: leads the vision, company and day-to-day decisions, subject to the agreed shareholder and governance documents.',
  'Founder: sees the commercial model, milestone conditions and equity mechanics before delivery starts.',
  'Pixelette: earns only the equity and rights agreed under the signed structure and milestone framework.',
  'Both sides: share defined information, governance and decision responsibilities appropriate to the venture stage.',
] as const;

export const FOUNDER_CONTROL_NOTE =
  'Final ownership, reserved matters and governance rights are determined by the signed commercial and shareholder documents.';

/**
 * Capital partners — section 13 of the 8 Sep 2026 copy brief.
 *
 * PUBLICATION-GATED, COUNSEL. This is the one section in the brief whose own
 * text defers to a lawyer: "Final wording should be reviewed for the applicable
 * regulatory position", and the brief's publication gate repeats it — "Capital
 * partner section: legal review for financial-promotion, investment-advice and
 * securities-offer wording."
 *
 * Publishing it changes the site's s.21 FSMA posture. /partners/capital is
 * currently reachable only from the footer and is noindexed by four independent
 * mechanisms. This section, plus the nav entry and the closing CTA that ship
 * with it, promote that page to the homepage and the primary navigation of
 * every route. That is what the brief asks for, and it is not a developer's
 * decision to release.
 *
 * Note the hedging in every line — "selected", "subject to independent due
 * diligence", "potential", "agreed case by case". None of it is decorative. No
 * return, ticket size, allocation or timeline is offered anywhere.
 */
export const CAPITAL_PARTNERS = [
  'Selected venture opportunities, subject to independent due diligence.',
  'Milestone visibility and execution reporting.',
  'Access to specialist group capability around the venture.',
  'Potential co-investment and strategic-partnership structures, agreed case by case.',
] as const;

/**
 * Only the first sentence of the brief's §13 note is public copy. The brief's
 * second sentence — "Final wording should be reviewed for the applicable
 * regulatory position" — addresses whoever implements this section, not a
 * website visitor, and is honoured by gating the section rather than by
 * printing it on the page.
 */
export const CAPITAL_PARTNERS_NOTE =
  'Nothing on this website should constitute investment advice, a financial promotion or an offer of securities.';

/**
 * Founder fit — section 14.
 *
 * The brief: "Keep the two-column fit / not-fit visual. It increases
 * credibility because Pixelette is visibly selective rather than trying to
 * convert every visitor." The asymmetry is deliberate — four qualifying
 * criteria against two disqualifying ones is the brief's own balance.
 */
export const FIT_GOOD = [
  'Committed founder or decision-making team.',
  'Clear problem, credible insight or evidence to validate.',
  'Ambition to build a scalable company, not simply outsource a project.',
  'Willingness to engage customers, share evidence and work to milestones.',
] as const;

export const FIT_NOT = [
  'Seeking free development or a passive “build it for me” relationship.',
  'No committed owner, no willingness to validate, or no realistic route to execution.',
] as const;

/** The eight commitments. The primary conversion mechanism on the site. */
export const FOUNDER_CHARTER = [
  'Equity vests only against accepted milestones.',
  'No equity is earned for rejected or undelivered work.',
  'Unvested equity returns when the relevant delivery stops.',
  'An equity ceiling is agreed before work begins.',
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
 * Network and reach, per section 10 of the 8 Sep 2026 copy brief.
 *
 * This REPLACES the "institutional standing" cards, which claimed authority
 * rather than describing relationships. What went, and why:
 *
 *   "Inside UK Parliament" / "a seat inside the regulatory conversation, not
 *   on the receiving end of it" — being secretariat to an APPG is an
 *   administrative role. The old phrasing implied a legislative position, and
 *   APPGs are not parliamentary bodies. The role itself is real and is still
 *   stated, accurately, on /about and in the credentials strip.
 *
 *   "Government engagement ... including national development and skills
 *   programmes" — no source, no named programme, no date. Unevidenced.
 *
 *   "Certified and secure ... with Cyber Essentials Plus" — the certifications
 *   are real, but this card was the ONLY place the site claimed "Plus", while
 *   the credentials strip beside it (CREDENTIALS in content/site.ts) said plain
 *   "Cyber Essentials". Two different certificates, contradicting each other on
 *   one page. Removing this card resolves that in the conservative direction:
 *   the surviving claim is the weaker one. Which is actually held is still an
 *   open question for the group — do NOT re-add "Plus" to satisfy the symmetry
 *   without checking the certificate. See the handover note.
 *
 * The brief's instruction: "Keep only logos, roles, named relationships and
 * claims that can be independently evidenced and are approved for public use."
 * Each line below is a category of relationship, not an assertion of standing.
 */
export const ECOSYSTEM = [
  'Technology and industry relationships.',
  'Academic and specialist expertise.',
  'International innovation collaboration.',
  'Policy and research engagement.',
  'Investor and strategic-capital relationships.',
] as const;

/**
 * Load-bearing. The brief's publication gate: "Policy / parliamentary /
 * institutional references: describe roles precisely and do not imply
 * endorsement, official parliamentary status or government backing."
 *
 * Must render wherever the APPG or a named institution appears — this section
 * and /about — not only here.
 */
export const ECOSYSTEM_NOTE =
  'Participation in a network, event, secretariat or programme does not imply endorsement by that organisation or any public body.';

/**
 * The operating model, per section 09 of the 8 Sep 2026 copy brief.
 *
 * Replaces the old WHY_CHOOSE differentiator cards. Two things went with them
 * and should not come back by accident:
 *
 *  1. "We give you policy level access" — the APPG / UK Parliament claim. It is
 *     removed HERE rather than in the section 10 commit, because section 10
 *     strips the same claim from INSTITUTIONAL, and removing it in one place
 *     while it stayed live two sections above would have been worse than
 *     leaving both.
 *  2. "We unlock global reach" — an unevidenced international-network claim.
 *
 * Every line below describes Pixelette's own operating model. The brief is
 * explicit about why: "Avoid claims that every other studio is advice-only;
 * make the contrast about Pixelette's own operating model." The old copy said
 * competitors "ignore" this ground. That is a claim about other firms and it
 * has gone.
 */
export const OPERATING_MODEL = [
  'Named delivery ownership and milestone accountability.',
  'Specialists deployed around the venture need, not a generic team template.',
  'Commercial and product work connected to the same venture plan.',
  'Governance, reporting and decision gates visible to founder and Pixelette.',
  'Scale, enterprise and capital readiness designed in rather than bolted on later.',
] as const;
