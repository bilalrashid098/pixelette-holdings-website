/**
 * Founder testimonials.
 *
 * Extracted verbatim from the live pixeletteholdings.com testimonial carousel
 * on 2026-08-08, already publicly published on the company's own site, so the
 * publication act has already been taken for each named individual and company.
 * Quotes are reproduced exactly; do not edit the wording. If any individual
 * withdraws consent, remove their entry here.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Self-hosted portrait. Rendered when the file exists; falls back to a
   *  monogram if it is missing. Files are fetched by download-assets.ps1. */
  avatar?: string;
  /**
   * Selected for the homepage. Section 12 of the 8 Sep 2026 copy brief asks for
   * "the three strongest, most specific testimonials on the homepage. Each
   * should explain an outcome, not simply praise the relationship."
   *
   * Marked here rather than sliced at the call site so that WHICH three were
   * chosen is visible in the diff and can be argued with. The four that are not
   * marked are not deleted — they render on /portfolio.
   */
  homepage?: true;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Pixelette Holdings' hybrid sweat equity model gave us room to build without the typical early-stage compromises, and that made all the difference.",
    name: 'Professor Dato Seri Dr. von Rahman',
    role: 'Founder',
    company: 'Voltan Motor',
    avatar: '/media/testimonials/von-rahman.png',
  },
  {
    quote:
      "We were able to scale quickly without the usual funding pressure, thanks to the way they backed us from day one. The advice, the support, the belief in what we're building, it all gave us the space to really focus on execution. Their sweat equity model played a big part in making that possible.",
    name: 'Anthony Bevan',
    role: 'CEO',
    company: 'BlockGuard',
    avatar: '/media/testimonials/anthony-bevan.png',
  },
  {
    quote:
      'Pixelette Holdings was instrumental in accelerating the development of our AI B2B tool. Their strategic guidance and hands-on support helped us overcome key challenges and shorten our time to market.',
    name: 'Emmanuelle C. S. Fernandes',
    role: 'Founder',
    company: 'diverSCInnova',
    avatar: '/media/testimonials/emmanuelle-fernandes.png',
    // Names the product and the outcome: an AI B2B tool, shortened time to market.
    homepage: true,
  },
  {
    quote:
      "Pixelette Holdings was more than just a venture partner; they were a true execution partner. Through their hybrid sweat equity model, we gained access to a seasoned team across engineering and GTM. We cut development costs by half and scaled far faster than we could've on our own.",
    name: 'Anthony Zirrolli',
    role: 'Co-founder',
    company: 'Fusio',
    avatar: '/media/testimonials/anthony-zirrolli.png',
    // The only quantified outcome in the set: "cut development costs by half".
    homepage: true,
  },
  {
    quote:
      "It's rare to find a venture partner who's all in on both the vision and the execution. Pixelette Holdings' clear structure, deep technical know-how, and hands-on support gave us the clarity and momentum we needed to build with confidence.",
    name: 'Sunny Oller',
    role: 'CEO & Co-founder',
    company: 'Meta Space Labs',
    avatar: '/media/testimonials/sunny-oller.png',
  },
  {
    quote:
      "Pixelette Holdings was more than just a venture partner. They didn't just advise us, they helped us build with hands-on support across product, compliance, and go-to-market. Their model helped us scale without draining our runway or equity.",
    name: 'David Steenhoek',
    role: 'Co-founder',
    company: 'Void Venture Capital',
    avatar: '/media/testimonials/david-steenhoek.png',
  },
  {
    quote:
      'Most venture partners give advice. Pixelette Holdings gave us a full execution layer. From day one, they were embedded with our team, helping us build, test, and go to market efficiently. Their hybrid model let us focus on growth, not budget constraints.',
    name: 'Brenda Gilbert',
    role: 'Founder',
    company: 'QE Channel',
    avatar: '/media/testimonials/brenda-gilbert.png',
    // "Most venture partners give advice. Pixelette gave us a full execution
    // layer." Says in a founder's words what section 09 claims in ours.
    homepage: true,
  },
];

/**
 * The three the homepage leads with, and the four it links to.
 *
 * Derived from the `homepage` flag rather than being two hand-maintained lists,
 * so a quote cannot end up in both or in neither. Nothing is deleted: all seven
 * remain published, and the split only decides where each one appears.
 */
export const HOMEPAGE_TESTIMONIALS = TESTIMONIALS.filter((t) => t.homepage);
export const FURTHER_TESTIMONIALS = TESTIMONIALS.filter((t) => !t.homepage);
