import type { Metadata } from 'next';
import { PageHero, Buttons, Btn } from '@/components/ui';
import { SITE } from '@/content/site';
import { StartupsBody } from './StartupsBody';

const TITLE = 'Startups and venture programmes';
const DESCRIPTION =
  'Pixelette Holdings is a startup development partner for founders, incubators and accelerators, including startup equity partnership and support for venture programmes.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/startups' },
  keywords: [
    'technology startup development',
    'startup development partner',
    'startup equity partnership',
    'startup incubator support',
    'accelerator technology partner',
    'services for equity',
  ],
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: TITLE,
  description: DESCRIPTION,
  url: `${SITE.url}/startups/`,
  inLanguage: 'en-GB',
  isPartOf: {
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
  },
};

export default function StartupsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: TITLE }]}
        eyebrow="Startups and venture programmes"
        title="Build your startup with the right execution partner"
        lead="Whether you are building a new technology venture or supporting a programme of emerging businesses, Pixelette Holdings brings together specialist delivery capability and flexible commercial partnership structures to help selected ventures progress from concept towards launch and growth."
      >
        <Buttons>
          <Btn href="#pathways">Explore partnership options</Btn>
          <Btn href="/hse-model" variant="secondary">How Hybrid Sweat Equity works</Btn>
        </Buttons>
      </PageHero>
      <StartupsBody />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
