import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, SectionHead, PageHero, CardGrid } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Insights | Evidence-led writing on venture execution',
  description:
    'Original expertise from delivery, not keyword pages. Each article carries named evidence and routes to the relevant proof or model explanation.',
  alternates: { canonical: '/insights' },
};

const LINES = [
  {
    title: 'Services-for-equity, properly structured',
    body: 'How fee-to-equity works, where it fails, and the protections that make it safe for a founder to enter.',
    href: '/insights/services-for-equity-properly-structured',
  },
  {
    title: 'Agentic AI delivery in production',
    body: 'What it actually takes to ship an agentic product: architecture boundaries, retrieval, evaluation and the honest limits.',
  },
  {
    title: 'Validating before you build',
    body: 'Why a paid validation stage is cheaper than a wrong build, and what evidence a go decision actually needs.',
  },
  {
    title: 'Compliance readiness as a growth lever',
    body: 'How security and governance readiness opens enterprise and regulated revenue rather than blocking it.',
  },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Insights' }]}
        eyebrow="Insights"
        title="Evidence-led writing on venture execution."
        lead="Original expertise from delivery, not keyword pages. Each piece carries named evidence and routes to the relevant proof or model explanation."
      />

      <Section>
        <SectionHead
          eyebrow="What we write about"
          title="Subjects we cover with authority."
          lead="Written from the group's actual delivery evidence and mapped to the real questions founders and partners ask."
        />
        <CardGrid>
          {LINES.map((l) => (
            <article key={l.title} className="p-card">
              <h3>{l.title}</h3>
              <p>{l.body}</p>
              {l.href ? (
                <p style={{ marginTop: 14 }}>
                  <Link href={l.href}>Read the article ↗</Link>
                </p>
              ) : null}
            </article>
          ))}
        </CardGrid>
      </Section>
    </>
  );
}
