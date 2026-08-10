/**
 * Pixelette Holdings, portfolio data.
 *
 * The portfolio is the one genuinely structured content on the site: it is
 * queried, filtered and reused across the homepage proof rail, the portfolio
 * index and three classified archives. Hand-built markup would drift, and
 * drift is precisely the defect this rebuild exists to fix.
 *
 * THE LOAD-BEARING RULE: `relationship` is a required field on a non-optional
 * union type. A venture cannot be added without a classification, because the
 * build will not compile. "Classification before name" is enforced by the
 * type system rather than by editorial discipline.
 *
 * Descriptions are present only where controlled wording and supporting
 * evidence exist. Where they do not, `oneLine` is omitted and `gateNote`
 * states what is outstanding. An honest gap is better than an invented
 * description, never fill one in to make a card look finished.
 */

export type Relationship =
  | 'equity-investment'
  | 'direct-hse-venture'
  | 'project-in-development'
  | 'delivered-venture'
  | 'capital-relationship';

export type EvidenceStatus =
  | 'verified-primary'   // confirmed against a current official or first-party source
  | 'verified-vault'     // confirmed by the canonical vault record
  | 'founder-confirmed'  // Mr Rana has confirmed; documentary evidence not attached
  | 'consent-required'   // may be true, but publication rights are not recorded
  | 'counsel'            // legal review required before publication
  | 'held';              // evidence, identity or status unresolved

export interface Venture {
  slug: string;
  name: string;
  /** Required. The build fails without it, this is deliberate. */
  relationship: Relationship;
  evidence: EvidenceStatus;
  /** Controlled description. Omit entirely rather than invent one. */
  oneLine?: string;
  /** Second paragraph, only where evidenced. */
  detail?: string;
  /** Featured status. NOT a second relationship class. */
  flagship?: boolean;
  /** Rendered as the visible amber gate note. */
  gateNote?: string;
  /** Wording that must never be used for this venture. */
  avoid?: string;
  /** Logo renders only when written permission is recorded. */
  logoConsent?: boolean;
  externalUrl?: string;
}

export const RELATIONSHIP_LABEL: Record<Relationship, string> = {
  'equity-investment': 'Pixelette equity investment',
  'direct-hse-venture': 'Direct HSE venture',
  'project-in-development': 'Project in development',
  'delivered-venture': 'Delivered venture',
  'capital-relationship': 'Capital relationship',
};

// Descriptions below were forensically extracted from the live pixeletteholdings.com
// (visible portfolio cards + the site's own schema.org data) on 2026-08-08, the
// company's own first-party published content, and lightly cleaned to UK spelling,
// with duplicated/broken source phrasing fixed. `evidence: 'verified-primary'` = on a
// visible live card; `'founder-confirmed'` = present in the live site's own structured
// data but not shown on a visible card. Sensitive claims (BIC %, custody, medical,
// automotive) are handled per the notes; the BIC percentage stays withheld by directive.
export const ventures: Venture[] = [
  // ---------------------------------------------------------- equity
  {
    slug: 'big-innovation-centre',
    name: 'Big Innovation Centre',
    relationship: 'equity-investment',
    evidence: 'founder-confirmed',
    // 12% PUBLISHED per explicit founder authorisation 2026-08-08 (supersedes the
    // prior withhold directive). Matches the live site's "12% stake". Two Companies
    // House records use this name, so the founder should confirm the exact investee
    // entity and have counsel bless the final wording in the standing legal review.
    oneLine:
      'Pixelette Holdings holds a 12% equity investment in Big Innovation Centre, a cross-sector think tank and innovation hub shaping AI, blockchain and digital-economy policy.',
    detail:
      'The relationship connects the portfolio to a serious innovation and policy ecosystem. It is a structural minority investment position, not control of the organisation.',
    avoid: 'Do not imply control, ownership of the whole organisation, or endorsement of Pixelette by BIC.',
  },

  // ------------------------------------------------ project in development
  {
    slug: 'trust-layer-health',
    name: 'Trust Layer Health',
    relationship: 'project-in-development',
    evidence: 'counsel',
    // Active legal matter. Kept OFF the homepage. Minimal, neutral wording only.
    oneLine: 'A blockchain-based platform for verifying and auditing professional healthcare credentials with real-time compliance.',
    gateNote:
      'Held for counsel, active matter. Kept off the homepage spotlight. Publish no equity, ownership, stake or dispute-sensitive detail.',
    avoid: 'No equity language. No reference to any dispute.',
  },

  // ------------------------------------------------------ direct HSE
  {
    slug: '2connect',
    name: '2Connect',
    relationship: 'direct-hse-venture',
    evidence: 'verified-primary',
    flagship: true,
    oneLine:
      'An agentic AI alternative to the recommender engine, capturing human intent across hundreds of dimensions for relevant, reciprocal matchmaking and discovery.',
    detail:
      'A user describes what they need. The platform evaluates fit in both directions, surfaces relevant matches and explains why each introduction may be worthwhile.',
    externalUrl: 'https://www.2connect.ai/',
  },
  {
    slug: 'meta-space-labs',
    name: 'Meta Space Labs',
    relationship: 'direct-hse-venture',
    evidence: 'verified-primary',
    oneLine: 'A Web3-native venture building RENTOP, a decentralised real-world-asset tokenisation and rental platform.',
  },
  {
    slug: 'diverscinnova',
    name: 'diverSCInnova',
    relationship: 'direct-hse-venture',
    evidence: 'verified-primary',
    oneLine: 'An AI-powered cognitive assessment tool that helps companies identify, optimise and support diverse talent.',
  },
  {
    slug: 'digital-asset-vault',
    name: 'Digital Asset Vault',
    relationship: 'direct-hse-venture',
    evidence: 'verified-primary',
    oneLine: 'Secure digital-asset storage, purchasing, real-time tracking and trading for global clients.',
    // The live site uses the word "custody". Softened to "storage" here because
    // "custody" of digital assets can carry regulatory-permission implications.
    avoid: 'Prefer "secure storage" over "custody"; make no regulatory, licensing or financial-permission claim.',
  },
  {
    slug: 'webbooking-pro',
    name: 'WebBooking Pro',
    relationship: 'direct-hse-venture',
    evidence: 'founder-confirmed',
    oneLine: 'A cloud-based platform for hotels and rentals, combining property management with direct-booking tools.',
  },
  {
    slug: 'brics-blockchain',
    name: 'BRICS Blockchain',
    relationship: 'direct-hse-venture',
    evidence: 'verified-primary',
    oneLine: 'A blockchain venture building a decentralised financial ecosystem that tokenises real-world assets.',
    avoid: 'Do not imply affiliation with BRICS governments or institutions.',
  },
  {
    slug: 'accountability-intelligence',
    name: 'Accountability Intelligence',
    relationship: 'direct-hse-venture',
    evidence: 'verified-primary',
    oneLine: 'A smart assessment platform for creating and managing evaluations of people.',
  },
  {
    slug: 'synthea',
    name: 'Synthea',
    relationship: 'direct-hse-venture',
    evidence: 'verified-primary',
    oneLine: 'Scalable blockchain infrastructure that supports decentralised applications.',
    avoid: 'Do not conflate with the open-source Synthea health-data project, or with a former group-company name.',
  },
  {
    slug: 'qe-channel',
    name: 'QE Channel',
    relationship: 'direct-hse-venture',
    evidence: 'verified-primary',
    oneLine: 'A creator-first, blockchain-powered SVOD platform for original films, docuseries and podcasts.',
  },
  {
    slug: 'q-zero',
    name: 'Q~Zero',
    relationship: 'direct-hse-venture',
    evidence: 'founder-confirmed',
    oneLine: 'A retail self-checkout solution, customers scan and pay directly from their mobile, on the go.',
    avoid: 'Do not infer quantum technology from the name.',
  },
  {
    slug: 'voltan-motor',
    name: 'Voltan Motor',
    relationship: 'direct-hse-venture',
    evidence: 'verified-primary',
    oneLine: 'An electric-mobility company designing high-performance, sustainable luxury electric vehicles.',
    avoid: 'Use the singular "Voltan Motor" consistently (the live site mixes in "Voltan Motors"). Make no range, performance or delivery claims beyond the description.',
  },
  {
    slug: 'mamosis',
    name: 'Mamosis',
    relationship: 'direct-hse-venture',
    evidence: 'verified-primary',
    oneLine: 'An AI platform that analyses medical imaging and wellness data to support cancer diagnostics.',
    avoid: 'Medical-claims sensitivity: describe as decision-support, never a diagnosis guarantee or a regulated medical device, until clinical/regulatory status is confirmed.',
  },
  {
    slug: 'zam-zam',
    name: 'Zam Zam',
    relationship: 'direct-hse-venture',
    evidence: 'founder-confirmed',
    oneLine: 'A real-estate group offering luxury apartments, retail spaces and modern amenities.',
  },

  // Founder-confirmed 2026-08-08 as HSE ventures with a Pixelette ownership
  // position (previously classed delivered pending the equity-vs-client call).
  {
    slug: 'blockguard',
    name: 'BlockGuard',
    relationship: 'direct-hse-venture',
    evidence: 'founder-confirmed',
    oneLine:
      'A Layer-1 blockchain built to enhance security, decentralisation and user experience.',
  },
  {
    slug: 'fusio',
    name: 'Fusio',
    relationship: 'direct-hse-venture',
    evidence: 'founder-confirmed',
    oneLine:
      'An AI-powered, blockchain-based wealth-management ecosystem that bridges traditional finance and DeFi.',
    avoid:
      'Do not merge with the current fusio.space autonomous-agent proposition unless the same legal and product identity is confirmed, they may be two different propositions.',
  },

  // --------------------------------------------------------- capital
  {
    slug: 'void-venture-capital',
    name: 'Void Venture Capital',
    relationship: 'capital-relationship',
    evidence: 'verified-primary',
    oneLine:
      'A venture-capital firm investing in early-stage startups across fintech, AI, blockchain and entertainment.',
  },
];

/**
 * Starbreeder is deliberately absent.
 *
 * It was removed from the public portfolio by founder decision, and its URL
 * returns 410 Gone rather than a 301, there is no equivalent destination and
 * a redirect would misrepresent the relationship. Do not reintroduce it here
 * without an explicit decision.
 */

export const byRelationship = (r: Relationship): Venture[] =>
  ventures.filter((v) => v.relationship === r);

export const flagship = (): Venture | undefined => ventures.find((v) => v.flagship);

/**
 * No venture count is published until every description is evidenced.
 * A number that contradicts the grid beneath it is worse than no number —
 * the previous site said "19 ventures" above a grid of 21.
 */
export const publishableCount = (): number | null => {
  const described = ventures.filter(
    (v) => v.relationship === 'direct-hse-venture' && v.oneLine && v.evidence !== 'held',
  );
  return described.length === byRelationship('direct-hse-venture').length ? described.length : null;
};

/**
 * Founded / location / industry per venture, extracted from the live
 * pixeletteholdings.com portfolio cards (2026-08-08). Rendered as a small meta
 * line on each card. Kept in a lookup so the core `ventures` list stays lean.
 */
export const VENTURE_META: Record<string, { founded?: string; location?: string; industry?: string }> = {
  '2connect': { founded: '2025', location: 'US', industry: 'Agentic AI' },
  'trust-layer-health': { founded: '2025', location: 'UK', industry: 'HealthTech' },
  'accountability-intelligence': { founded: '2004', location: 'Canada', industry: 'HR Tech / Assessment' },
  'blockguard': { founded: '2018', location: 'US', industry: 'Blockchain' },
  'digital-asset-vault': { founded: '2023', location: 'US', industry: 'Blockchain' },
  'big-innovation-centre': { founded: '2011', location: 'UK', industry: 'Management Consulting' },
  'diverscinnova': { founded: '2023', location: 'Brazil', industry: 'AI' },
  'meta-space-labs': { founded: '2023', location: 'US', industry: 'Blockchain' },
  'synthea': { founded: '2023', location: 'US', industry: 'HealthTech' },
  'void-venture-capital': { founded: '2025', industry: 'Financial Services' },
  'fusio': { founded: '2024', location: 'US', industry: 'FinTech' },
  'brics-blockchain': { founded: '2025', location: 'US', industry: 'Blockchain' },
  'qe-channel': { founded: '2020', location: 'Canada', industry: 'SVOD' },
  'voltan-motor': { founded: '2022', location: 'US', industry: 'Automotive' },
  'mamosis': { founded: '2025', location: 'UK · Dubai · Turkey', industry: 'HealthTech' },
  'webbooking-pro': { founded: '2009', location: 'Croatia', industry: 'Hospitality' },
  'q-zero': { founded: '2018', location: 'Italy', industry: 'Retail / FinTech' },
  'zam-zam': { founded: '2022', industry: 'Real Estate' },
};

export const ventureMeta = (slug: string): string =>
  (() => {
    const m = VENTURE_META[slug];
    if (!m) return '';
    return [m.founded ? `Founded ${m.founded}` : '', m.location ?? '', m.industry ?? '']
      .filter(Boolean)
      .join('  ·  ');
  })();

/**
 * Slugs whose logo file exists at public/media/ventures/<slug>.png (fetched from
 * the live site). WebBooking Pro, Q~Zero and Zam Zam have no logo on the live
 * site, so they are absent here and render without one (never a broken image).
 */
const LOGO_SLUGS = new Set<string>([
  '2connect', 'trust-layer-health', 'accountability-intelligence', 'blockguard',
  'digital-asset-vault', 'big-innovation-centre', 'diverscinnova', 'meta-space-labs',
  'synthea', 'void-venture-capital', 'fusio', 'brics-blockchain', 'qe-channel',
  'voltan-motor', 'mamosis',
]);

export const ventureLogo = (slug: string): string =>
  LOGO_SLUGS.has(slug) ? `/media/ventures/${slug}.png` : '';
