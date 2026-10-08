/**
 * Startup partnership assessment.
 *
 * Answers stay in sessionStorage on this browser. They are not personal data
 * and they are not sent to Pixelette unless the visitor later puts them in an
 * email. Do not add a name, email or free-text field here.
 */

export const ASSESSMENT_STORAGE_KEY = 'ph-partnership-assessment';

export type Audience = 'founder' | 'incubator' | 'accelerator';

export interface PartnershipAssessment {
  audience: Audience;
  stage: string;
  need: string;
  structure: string;
  context: string;
}

export const AUDIENCE_LABEL: Record<Audience, string> = {
  founder: 'Startup founder',
  incubator: 'Incubator',
  accelerator: 'Accelerator',
};

export const FOUNDER_STAGES = [
  'Idea or research',
  'Validated problem',
  'Prototype',
  'MVP',
  'Live product without revenue',
  'Early revenue',
  'Scaling',
] as const;

const QUESTIONS: Record<Audience, { stage: string[]; need: string[]; structure: string[]; context: string[]; contextLabel: string }> = {
  founder: {
    stage: [...FOUNDER_STAGES],
    need: [
      'Technical feasibility and product scoping',
      'Software and AI development',
      'Defining the MVP',
      'Product launch preparation',
      'Marketing and market development',
      'Compliance and enterprise readiness',
      'Venture execution planning',
    ],
    structure: [
      'Exploring Hybrid Sweat Equity',
      'Prefer to discuss cash fees',
      'Not yet sure',
    ],
    contextLabel: 'What would you most like a first conversation to cover?',
    context: ['Feasibility', 'MVP scope', 'Commercial structure', 'Timing and capacity'],
  },
  incubator: {
    stage: [
      'New programme being designed',
      'Active cohort',
      'Established portfolio of companies',
      'Occasional referrals',
    ],
    need: [
      'Technical support for portfolio companies',
      'Assessment of promising ventures',
      'Access to delivery capability',
      'A partnership for selected companies',
    ],
    structure: [
      'Support for selected companies',
      'A programme-wide delivery arrangement',
      'An introductory conversation',
    ],
    contextLabel: 'How would you like to start?',
    context: ['Referral of one company', 'A conversation about the portfolio', 'Not sure yet'],
  },
  accelerator: {
    stage: [
      'Upcoming cohort',
      'Cohort in progress',
      'Post-programme support',
      'Several programmes a year',
    ],
    need: [
      'Support for a programme cohort',
      'Product roadmaps',
      'MVP execution',
      'Launch preparation',
    ],
    structure: [
      'Support for selected companies',
      'A programme-wide delivery arrangement',
      'An introductory conversation',
    ],
    contextLabel: 'What is the nearest milestone?',
    context: ['Next cohort start', 'A company that needs a build', 'A general partnership discussion'],
  },
};

export function questionsFor(audience: Audience) {
  return QUESTIONS[audience];
}

export function readAssessment(): PartnershipAssessment | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(ASSESSMENT_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as PartnershipAssessment;
    if (!data || !QUESTIONS[data.audience]) return null;
    if (!data.stage || !data.need || !data.structure || !data.context) return null;
    return data;
  } catch {
    return null;
  }
}

export function writeAssessment(data: PartnershipAssessment) {
  sessionStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(data));
}
