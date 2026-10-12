import type { PixContext } from './context';

/**
 * Guardrail layer for the Holdings assistant. Rules run BEFORE retrieval.
 */

export type Rule = {
  id: string;
  test: RegExp;
  reply: string;
  path?: string;
  offer?: 'enquiry';
};

const CONTACT = '/contact';

export const TIMELINE_ASK =
  /\b(how long|timeline|timescale|time ?frame|deadline|how (fast|quickly|soon)|when (can|could|will|would) you|delivery date|turnaround|lead time|in (\d+|a|one|two|three|four|five|six|a few|several) (days?|weeks?|months?)|\d+ (days?|weeks?|months?)|how many (days|weeks|months)|(ready|finished|live|delivered|launched|completed) (by|in|before)|when (would|will|could|can|might) (it|this|that|the (project|app|site|system|build|product|venture|partnership)) (be )?(ready|done|finished|live|delivered|built|start|launch|go live)|start (on |this |next )?(monday|tuesday|wednesday|thursday|friday|tomorrow|next week|next month|immediately|straight away|right away)|go live|launch date|by (next|the end of|end of) (week|month|quarter|year)|asap)\b/i;

export function rules(ctx: PixContext): Rule[] {
  return [
    {
      id: 'abuse',
      test: /\b(fuck|fucking|shit|bitch|bastard|cunt|dickhead|wanker|arsehole|idiot|moron|scam|scammer|fraud|fraudster|crooks?)\b/i,
      reply:
        'I am here to help with venture partnerships and strategic relationships, and I would be glad to assist with a genuine enquiry. You are also welcome to contact the team directly at ' +
        `${ctx.contactEmail}.`,
    },
    {
      id: 'injection',
      test: /\b(ignore (all |your |the )?(previous|prior|above)|system prompt|your instructions|hidden instructions|you are now|disregard (all|your|the)|jailbreak|pretend you are|(reveal|show|print|repeat|display) (me )?(your |the )?(system |hidden )?(prompt|instructions|rules)|developer mode|you are dan|dan mode|do anything now|act as (an? )?(unrestricted|unfiltered|uncensored|different)|new system (message|prompt)|use this (page|text|message) as (your )?(new )?(system|instructions|prompt)|(forget|override) (your|all|the|previous) (rules|instructions|guidelines))\b/i,
      reply:
        'There is nothing behind me to unlock. I answer only from the published pages of this website, so the most useful thing I can do is point you to the right one. What would you like to find out?',
    },
    {
      id: 'off-topic',
      test: /^(?![\s\S]*\b(apps?|application|platforms?|software|systems?|websites?|build\w*|develop\w*|products?|solutions?|tools?|venture|partnership|equity|hse|startup|founder|portfolio|invest\w*|pixelette)\b)[\s\S]*\b(weather|joke|poem|limerick|recipe|cook(ing)?|football|soccer|cricket|basketball|sports?|match score|horoscope|astrology|president|prime minister|election|politic(s|al)|religio(n|us)|sing|song|music|movies?|films?|tv show|netflix|celebrit(y|ies)|actor|actress|homework|essay|translate (this|that|the following|into)|write (me )?(an? )?(story|essay|poem|song|cover letter)|cover letter|who won|latest news|news today|headlines|summari[sz]e (this|that|the following|my)|crossword|lottery|stock tips?|crypto price|bitcoin price|dating|relationship advice|diet|symptoms?|medicine|medical advice|doctor|travel|flights?|hotels?|holiday|capital of|what time is it|what day is it|how old is|solve (this|the equation)|calculate)\b/i,
      reply:
        'I am not trained for that. I can only help with Pixelette Holdings and the work on this site: group ventures, partnerships and strategic relationships. What would you like to know?',
    },
    {
      id: 'identity',
      test: /\b(are you (a |an )?(human|real|person|bot|ai|robot|chatbot|chatgpt|gpt|claude|gemini)|is this (a |an )?(bot|human|person|chatbot|chatgpt|gpt|real person|ai)|am i (talking|speaking|chatting) to (a |an )?(human|person|real|bot|ai|machine)|what are you|who (made|built|created|programmed) you|what (model|ai|llm) (are|is) (you|this)|are you (using|powered by) (chatgpt|gpt|openai|claude|an? llm|ai))\b/i,
      reply:
        'I am an automated assistant rather than a member of the team. I answer by finding the relevant passage on this website rather than by generating an opinion, so if I cannot find it I will tell you plainly and put you in touch with a colleague who can.',
    },
    {
      id: 'price',
      test: /\b(price|prices|pricing|cost|costs|costing|quote|quotation|estimate|budget|how much (does|do|would|will|is|are|was|for|money|to|should|it|of)|day rates?|daily rates?|hourly rates?|your rates|rates for|rate card|fee|fees|ballpark|cheap|expensive|afford|pricey|costly|(what|how much) (do|would|will) you charge|you charge|charges|fixed[- ]price|time and materials|commercial model|payment terms|rough (figure|number|idea)|minimum (project|engagement|budget|spend|contract|order)|equity (percentage|%|split)|what (percentage|%) (equity|stake))\b/i,
      reply:
        'Commercial terms are agreed for each venture, so any figure I gave you now would be misleading. The Hybrid Sweat Equity page explains the structure; a scoped conversation with the team is the route to specifics. I would be glad to take your details here, or you are welcome to use the contact page.',
      path: '/hse-model',
      offer: 'enquiry',
    },
    {
      id: 'timeline',
      test: TIMELINE_ASK,
      reply:
        'Timelines depend entirely on scope and the venture, so a figure given without a scope would only be a guess. The team will give you a realistic picture in conversation. I would be glad to take your details here, or you are welcome to use the contact page.',
      path: CONTACT,
      offer: 'enquiry',
    },
    {
      id: 'competitors',
      test: /\b(better than|compare(d)? (to|with)|vs\.? |why not use|competitor)\b/i,
      reply:
        'It would not be appropriate for me to comment on other firms. What I can do is show you how this group works and which ventures are published, so that you can make the comparison yourself.',
      path: '/portfolio',
    },
    {
      id: 'staff-contact',
      test: /\b(personal (email|number|phone|mobile)|mobile number of|home address|linkedin of|who is your (ceo|cto|founder)\b.*\b(email|number|phone))\b/i,
      reply: `I am not able to share individual contact details, though nothing is lost by that: everything reaches the right person through ${ctx.contactEmail} or the contact page.`,
      path: CONTACT,
    },
    {
      id: 'careers',
      test: /\b((are you|is pixelette) (currently )?(hiring|recruiting)|careers?|job (openings?|vacanc(y|ies)|opportunit(y|ies))|vacanc(y|ies)|work (for|at) (you|pixelette)|join (your|the) team|internships?|graduate (roles?|scheme))\b/i,
      reply:
        'This site does not currently publish a careers page. If you would like to enquire about working with the team, the contact page will reach a person.',
      path: CONTACT,
    },
    {
      id: 'contact',
      test: /\b(contact|get in touch|speak to|talk to (someone|somebody|a human|a person|the team|sales)|just want to (speak|talk)|book (a )?(call|conversation|meeting)|arrange a call|scoping call|meeting|email you|phone you|call you)\b/i,
      reply: `The contact page is the quickest route to the team, and ${ctx.contactEmail} reaches the same place. If you would prefer, I would be glad to take your details here.`,
      path: CONTACT,
      offer: 'enquiry',
    },
    {
      id: 'legal-or-financial-advice',
      test: /\b(legal advice|is (this|it) legal|tax advice|investment advice|should i invest|financial advice|financial promotion|sue|lawsuit|fca|fsma)\b/i,
      reply:
        'That falls outside what this website should advise on, and I am not a suitable source for it. I would recommend speaking with a qualified adviser. For how Hybrid Sweat Equity is described on this site, see the HSE page and the disclaimer.',
      path: '/disclaimer',
    },
  ];
}

export const CLAIM_GUARDS: { id: string; test: RegExp; whenHeld: string }[] = [
  {
    id: 'geography-count',
    test: /\b(how many (people|staff|employees|engineers|developers|countries)|team size|headcount|how big is (the|your) (team|company)|offices in|countries|\d+\+?\s*(people|staff|employees|engineers|developers|offices|locations))\b/i,
    whenHeld:
      'I would rather not put a figure on the size of the team or the countries it covers, because this site does not currently evidence one. The team will tell you what is relevant to a conversation.',
  },
  {
    id: 'top-ai-company-award',
    test: /\b(award|awards|award-winning|best (ai|agency|company)|ranked|ranking|accolade)\b/i,
    whenHeld:
      'I will not claim an award that this site does not currently evidence. The published pages about the group and portfolio are the honest version of that answer.',
  },
  {
    id: 'appg-parliament-reference',
    test: /\b(appg|parliament|parliamentary|government|policy group|secretariat)\b/i,
    whenHeld:
      'That is not a connection this site currently states, so it would not be right for me to characterise it. If it matters to your decision, the contact page is the right route.',
  },
  {
    id: 'client-logos',
    test: /\b(who are your clients|client list|which companies|name.{0,12}clients?|worked with (any|which))\b/i,
    whenHeld:
      'Ventures are named only where they appear on the published portfolio, so I am not able to confirm or deny anyone else. You are very welcome to read the ones that are published.',
  },
  {
    id: 'ai-project-count',
    test: /\b(how many (projects|builds|clients|ventures|ai projects)|number of projects|track record numbers)\b/i,
    whenHeld:
      'I will not quote a count that this site does not evidence. The published portfolio and insights are the honest version of that answer.',
  },
];

const FACT_CLAIMS = {
  iso9001: 'iso-9001-certificate',
  iso27001: 'iso-27001-certificate',
  clutch: 'clutch-rating',
} as const;

export const PIX_CLAIM_IDS: readonly string[] = [
  ...CLAIM_GUARDS.map(guard => guard.id),
  ...Object.values(FACT_CLAIMS),
];

export function publishableFacts(ctx: PixContext): { test: RegExp; reply: string; path?: string }[] {
  const facts: { test: RegExp; reply: string; path?: string }[] = [];
  const allowed = (id: string) => ctx.publishable.includes(id);

  // ISO / Clutch facts stay gated. Holdings register keeps them NOT_PUBLISHED.
  if (allowed(FACT_CLAIMS.iso27001) || allowed(FACT_CLAIMS.iso9001)) {
    const held: string[] = [];
    if (allowed(FACT_CLAIMS.iso9001)) held.push('ISO 9001 for quality management');
    if (allowed(FACT_CLAIMS.iso27001)) held.push('ISO 27001 for information security');
    facts.push({
      test: /\b(iso|certified|certification|certifications|accredited|9001|27001|standards)\b/i,
      reply: `Published certifications named on this site: ${held.join(' and ')}.`,
      path: '/about',
    });
  }

  if (allowed(FACT_CLAIMS.clutch) && ctx.clutch) {
    facts.push({
      test: /\b(review|reviews|rating|ratings|clutch|testimonial|testimonials|reputation|feedback)\b/i,
      reply: `The Clutch profile shows ${ctx.clutch.ratingValue} out of 5 from ${ctx.clutch.reviewCount} verified reviews.`,
      path: '/portfolio',
    });
  }

  facts.push({
    test: /\b(who are you|what is pixelette|what do(es)? (you|pixelette|they|holdings)( actually)? do|what services|about the company|founded|established|based|where are you|registered|company number)\b/i,
    reply: `${ctx.company.name} is a UK venture-building group, incorporated in ${ctx.company.incorporated} and registered in ${ctx.company.registeredIn} as ${ctx.company.legalName}, company number ${ctx.company.crn}. It partners with selected founders through Hybrid Sweat Equity and coordinates group ventures, partnerships and strategic relationships.`,
    path: '/about',
  });

  return facts;
}

export const TOPIC_ROUTES: readonly { id: string; test: RegExp; path: string; faq?: string }[] = [
  {
    id: 'services',
    test: /\b(what can you (help|do)|how can you help|what (do|can) you (offer|help with)|what (are|is) your services)\b/i,
    path: '/',
    faq: 'What does Pixelette Holdings do?',
  },
  {
    id: 'hse',
    test: /\b(hybrid sweat equity|what is hse|\bhse\b|sweat equity|equity partnership|services for equity)\b/i,
    path: '/hse-model',
  },
  {
    id: 'startups',
    test: /\b(startup|startups|founder|founders|incubator|accelerator|venture programme)\b/i,
    path: '/startups',
  },
  {
    id: 'portfolio',
    test: /\b(portfolio|ventures?|examples? of (your )?work|what have you (built|partnered|done)|show me (your |some )?(ventures|portfolio|examples))\b/i,
    path: '/portfolio',
  },
  {
    id: 'apply',
    test: /\b(apply|explore a partnership|start (a )?partnership|how (do|can) i (apply|start|begin)|next step)\b/i,
    path: '/apply',
  },
  {
    id: 'privacy',
    test: /\b(gdpr|data protection|privacy|personal (data|information)|(my|our) (data|information)|store (my|our|your) (data|details)|cookies?)\b/i,
    path: '/privacy',
  },
  {
    id: 'group',
    test: /\b((the )?group|group compan(y|ies)|pixelette (technologies|marketing|certified)|sister (compan(y|ies)|brands?)|about (the )?company)\b/i,
    path: '/about',
  },
  {
    id: 'insights',
    test: /\b(insights?|articles?|blog|reading|thought leadership)\b/i,
    path: '/insights',
  },
];
