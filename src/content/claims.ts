/**
 * Claims register for Pixelette Holdings.
 *
 * Fail closed: nothing is publishable until a row is VERIFIED with evidence.
 * Holdings does not currently publish aggregate ratings, awards, or headcount
 * figures through the assistant. ISO certificates belong to Technologies and
 * must not be stated as Holdings facts.
 */

export type ClaimStatus = 'VERIFIED' | 'HELD' | 'NOT_PUBLISHED';

export type Claim = {
  id: string;
  label: string;
  status: ClaimStatus;
  detail?: string;
  evidenceNote: string;
  publicationInstruction?: string;
};

export const CLAIMS: readonly Claim[] = [
  {
    id: 'geography-count',
    label: 'Team size or countries served as a count',
    status: 'HELD',
    evidenceNote: 'No evidenced headcount or geography count is published on this site.',
  },
  {
    id: 'top-ai-company-award',
    label: 'Awards or ranking claims',
    status: 'HELD',
    evidenceNote: 'Agency awards are not published as Holdings claims on this site.',
  },
  {
    id: 'appg-parliament-reference',
    label: 'Parliamentary or APPG connection',
    status: 'NOT_PUBLISHED',
    evidenceNote: 'Not a Holdings claim on this site.',
  },
  {
    id: 'client-logos',
    label: 'Named client list beyond published portfolio ventures',
    status: 'HELD',
    evidenceNote: 'Only ventures published on /portfolio may be named.',
  },
  {
    id: 'ai-project-count',
    label: 'Project or venture count as a marketing figure',
    status: 'HELD',
    evidenceNote: 'No aggregate project count is published for the assistant to quote.',
  },
  {
    id: 'iso-9001-certificate',
    label: 'ISO 9001 held by Pixelette Holdings',
    status: 'NOT_PUBLISHED',
    evidenceNote: 'ISO 9001 is attributed to Pixelette Technologies, not Holdings.',
  },
  {
    id: 'iso-27001-certificate',
    label: 'ISO 27001 held by Pixelette Holdings',
    status: 'NOT_PUBLISHED',
    evidenceNote: 'ISO 27001 is attributed to Pixelette Technologies, not Holdings.',
  },
  {
    id: 'clutch-rating',
    label: 'Clutch rating for Pixelette Holdings',
    status: 'NOT_PUBLISHED',
    evidenceNote: 'This site does not publish a Clutch aggregate.',
  },
] as const;

export function claimById(id: string): Claim | undefined {
  return CLAIMS.find(c => c.id === id);
}

export function isPublishable(id: string): boolean {
  return claimById(id)?.status === 'VERIFIED';
}

export function publishedClaims(): Claim[] {
  return CLAIMS.filter(c => c.status === 'VERIFIED');
}
