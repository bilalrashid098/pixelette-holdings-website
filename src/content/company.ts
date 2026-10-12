/**
 * Company facts for the site assistant — Holdings only.
 *
 * Mirrors verified fields from `src/content/site.ts`. Do not reuse
 * Technologies’ sales inbox, Clutch figures, or ISO claims here.
 */

import { CONTACT, SITE } from '@/content/site';

export const SITE_URL = SITE.url;

export const company = {
  legalName: SITE.legalName,
  name: SITE.name,
  shortName: 'Pixelette',
  crn: SITE.companyNumber,
  registeredIn: SITE.jurisdiction,
  /** Companies House incorporation year for CRN 11716825. */
  incorporated: 2018,
  addressLine: SITE.registeredOffice,
  description:
    'Pixelette Holdings partners with selected founders through Hybrid Sweat Equity: agreed professional services in exchange for a combination of cash fees and equity participation.',
} as const;

/** Holdings does not publish a Clutch aggregate on this site. */
export const clutch = {
  ratingValue: 0,
  reviewCount: 0,
  profileUrl: '',
  lastVerified: '',
  published: false,
} as const;

export const contactEmail = CONTACT.email;
export const pressEmail = contactEmail;
