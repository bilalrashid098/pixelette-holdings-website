import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, SectionHead, PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Four articles on venture formation, equity and governance, and building towards investment readiness. Commercial commentary from Pixelette Holdings, not legal advice.',
  alternates: { canonical: '/insights' },
};

const ARTICLES = [
  {
    category: 'Venture formation',
    title: 'Building a technology startup: what founders should validate before development begins',
    body: 'Problem, customer, scope and the cost of building the wrong thing first.',
    href: '/insights/building-a-technology-startup',
  },
  {
    category: 'Equity and governance',
    title: 'Services for equity: how startup partnerships can be structured',
    body: 'Why cash and equity are combined, and why no single structure fits every venture.',
    href: '/insights/services-for-equity-properly-structured',
  },
  {
    category: 'Equity and governance',
    title: 'Founder control and equity dilution: what to consider before signing',
    body: 'Economic ownership and decision-making rights are different questions.',
    href: '/insights/founder-control-and-equity-dilution',
  },
  {
    category: 'Building and scaling',
    title: 'From MVP to investment readiness: building evidence that matters',
    body: 'A working product, user evidence and a repeatable commercial story are not the same thing.',
    href: '/insights/from-mvp-to-investment-readiness',
  },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Insights' }]}
        eyebrow="Insights"
        title="Notes on building and owning a venture"
        lead="Four articles on venture formation, equity and governance, and the evidence that sits between a product and a more serious commercial conversation."
      />
      <Section>
        <SectionHead
          eyebrow="Launch set"
          title="Four articles"
          lead="Written as commercial commentary. They are not legal advice, and they are not case studies."
        />
        <div className="card-grid">
          {ARTICLES.map((article) => (
            <article key={article.href} className="card">
              <p className="eyebrow">{article.category}</p>
              <h3 className="h3">{article.title}</h3>
              <p className="body">{article.body}</p>
              <p>
                <Link className="link" href={article.href}>Read the article</Link>
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
