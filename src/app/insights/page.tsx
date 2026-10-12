import { Section, PageHero } from '@/components/ui';
import { InsightArticleCard } from '@/components/InsightArticleCard';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Insights',
  description:
    'Explore practical perspectives on venture formation, equity partnerships, founder governance and the decisions involved in developing and growing technology businesses.',
  path: '/insights',
});

const FEATURED = {
  category: 'Venture formation',
  title: 'Building a technology startup: what founders should validate before development begins',
  summary:
    'Before committing to development, founders need clarity on the problem, target customer, product scope and commercial assumptions. Explore the questions worth resolving before the first build.',
  href: '/insights/building-a-technology-startup',
  imageSrc: '/media/insights/foundations-validation.webp',
  imageAlt:
    'Architectural still life of an unfinished modular structural model on a pale surface, suggesting foundations and validation before construction.',
};

const SUPPORTING = [
  {
    category: 'Equity and governance',
    title: 'Services for equity: how startup partnerships can be structured',
    summary:
      'Understand how cash contributions, professional services and equity participation can be combined in a venture partnership.',
    href: '/insights/services-for-equity-properly-structured',
    imageSrc: '/media/insights/services-equity.webp',
    imageAlt:
      'Two complementary geometric sculptural forms balanced together, suggesting exchange of contributions and shared interests.',
  },
  {
    category: 'Equity and governance',
    title: 'Founder control and equity dilution: what to consider before signing',
    summary:
      'Explore the distinctions between share ownership, voting rights, governance arrangements and founder decision-making.',
    href: '/insights/founder-control-and-equity-dilution',
    imageSrc: '/media/insights/founder-governance.webp',
    imageAlt:
      'Intersecting geometric structural forms in careful proportion, suggesting the distinction between ownership and control.',
  },
  {
    category: 'Building and scaling',
    title: 'From MVP to investment readiness: building evidence that matters',
    summary:
      'Understand how product functionality, customer validation and commercial evidence contribute to preparing a venture for future investment discussions.',
    href: '/insights/from-mvp-to-investment-readiness',
    imageSrc: '/media/insights/mvp-readiness.webp',
    imageAlt:
      'Ascending sequence of architectural stepping forms on a pale surface, suggesting progressive development and readiness.',
  },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Insights' }]}
        eyebrow="Insights"
        title="Insights on building technology ventures"
        lead="Explore practical perspectives on venture formation, equity partnerships, founder governance and the decisions involved in developing and growing technology businesses."
      />
      <Section>
        <div className="insights-editorial">
          <InsightArticleCard {...FEATURED} variant="featured" />
          <div className="insights-editorial__stack">
            {SUPPORTING.map((article) => (
              <InsightArticleCard key={article.href} {...article} variant="supporting" />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
