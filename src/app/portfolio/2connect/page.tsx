import type { Metadata } from 'next';
import {
  Section, SectionHead, PageHero, Buttons, Btn, CardGrid, Card,
} from '@/components/ui';

export const metadata: Metadata = {
  title: '2Connect | The AI agent for everyone you need to meet',
  description:
    'The flagship direct HSE venture: 2Connect (Linc), an AI agent that finds the right people by intent, tells you why, and only surfaces a match when it works for both sides.',
  alternates: { canonical: '/portfolio/2connect' },
};

const CONTEXTS = [
  ['A cofounder', 'The right partner for the venture, matched on intent rather than a follower count.'],
  ['An investor', 'Reach capital that fits the stage and sector, in both directions.'],
  ['A client or mentor', 'Connect a specific need to a specific person who can actually help.'],
  ['A hire', 'Match on stated intent rather than keyword overlap.'],
  ['A friend or a date', 'The same reciprocal logic extended beyond work.'],
  ['A local pro you can trust', 'Find a specific provider for a specific need, near you.'],
] as const;

const HOW = [
  ['01', 'Brief Linc once', 'You tell the agent what you are looking for, in your own words, instead of scrolling and filtering yourself.'],
  ['02', 'Linc searches both sides', 'It does the searching, scores both sides, and looks for people who genuinely fit.'],
  ['03', 'Every match comes with the reason', 'No black box and no cold outreach: each suggestion explains why the connection fits.'],
  ['04', 'A match only surfaces if both say yes', 'Reciprocal by design. A match appears only when it is worthwhile for both people.'],
] as const;

const MODEL = [
  ['Pay per match, not per month', 'A credit is spent only when both people say yes. Pixelette earns when your search ends, not when it drags on.'],
  ['Perfect match, or your credit back', 'If a connection was not right, the credit returns.'],
  ['Built on trust', 'Step-by-step verification, reporting and an 18+ requirement. Your data is used for matching and is never sold.'],
  ['Live on mobile', 'Available as native iOS and Android apps, alongside the web experience.'],
] as const;

// Delivery described at the capability level. Specific framework/provider names
// are intentionally not published unless verified against the codebase.
const DELIVERED = [
  ['Web application', 'A responsive web experience for briefing the agent and reviewing matches.'],
  ['Mobile apps', 'Native iOS and Android apps, live on the App Store and Google Play.'],
  ['Backend services', 'Typed backend services and APIs behind the product.'],
  ['AI matching service', 'A dedicated service that turns stated intent into candidate matches.'],
  ['Candidate retrieval', 'Vector-based retrieval to find relevant people at scale.'],
  ['Reciprocal scoring and reasoning', 'Fit evaluated in both directions, with an explanation produced for every match.'],
  ['Identity and onboarding', 'Authentication and a web-to-app intent bridge into the mobile experience.'],
  ['Infrastructure', 'CI/CD and infrastructure automation supporting continued delivery.'],
] as const;

export default function TwoConnectPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Portfolio', href: '/portfolio' },
          { label: '2Connect' },
        ]}
        eyebrow="Direct HSE Venture · Flagship · Agentic AI"
        title="2Connect: the AI agent for everyone you need to meet."
        lead="2Connect's agent, Linc, finds the right people by intent and tells you why. You brief it once instead of scrolling and filtering yourself; it searches, scores both sides, and only surfaces a match when it works for both people, across work and life."
      >
        <Buttons>
          <Btn href="/apply">Check if you qualify</Btn>
          <Btn href="https://2connect.ai/" variant="secondary">Visit 2connect.ai</Btn>
        </Buttons>
      </PageHero>

      <Section>
        <SectionHead
          eyebrow="The problem"
          title="Right now, you are the algorithm."
          lead="Directories, feeds and cold outreach put the searching, filtering and guessing on you. 2Connect begins with the outcome you are trying to reach, and does that work for you."
        />
        <CardGrid>
          {CONTEXTS.map(([title, body]) => (
            <Card key={title} title={title}>{body}</Card>
          ))}
        </CardGrid>
      </Section>

      <Section surface="ice">
        <SectionHead eyebrow="How it works" title="From what you are looking for, to who you should meet." />
        <div className="steps">
          {HOW.map(([n, title, body]) => (
            <div key={n} className="step">
              <b>{n}</b>
              <div>
                <h3 className="h3">{title}</h3>
                <p className="body">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Model and trust"
          title="Real people, and both sides have to say yes."
          lead="The commercial model and the trust model are the same idea: value only when a connection genuinely works."
        />
        <CardGrid>
          {MODEL.map(([title, body]) => (
            <Card key={title} title={title}>{body}</Card>
          ))}
        </CardGrid>
      </Section>

      <Section surface="deep">
        <SectionHead
          eyebrow="What Pixelette delivered"
          title="Concept to a live product on web and mobile."
          lead="Technical leadership and engineering delivery across web, mobile, backend, AI and infrastructure, taking 2Connect from concept to a live product on the web and the app stores."
        />
      </Section>

      <Section>
        <SectionHead
          eyebrow="Delivery surfaces"
          title="How the system moves from intent to introduction."
          lead="Users provide intent and profile context; the system retrieves candidates, evaluates reciprocal fit, produces the reasoning, and presents the match for a human decision."
        />
        <CardGrid>
          {DELIVERED.map(([title, body]) => (
            <Card key={title} title={title}>{body}</Card>
          ))}
        </CardGrid>
      </Section>

      <Section surface="deep">
        <SectionHead
          eyebrow="Next step"
          title="Building something operationally complex?"
          lead="If the venture has a committed operator, a serious market and capital available for execution, the HSE Fit Assessment is the right first step."
        />
        <Buttons>
          <Btn href="/apply">Check if you qualify</Btn>
          <Btn href="/capabilities" variant="secondary">Explore capabilities</Btn>
        </Buttons>
      </Section>
    </>
  );
}
