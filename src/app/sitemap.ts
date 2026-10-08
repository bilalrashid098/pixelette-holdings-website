import type { MetadataRoute } from 'next';
import { SITE, NOINDEX_ROUTES } from '@/content/site';

export const dynamic = 'force-static';

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/hse-model', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/startups', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/insights', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/insights/building-a-technology-startup', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/insights/services-for-equity-properly-structured', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/insights/founder-control-and-equity-dilution', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/insights/from-mvp-to-investment-readiness', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/apply', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/apply/thank-you', priority: 0.1, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/disclaimer', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/accessibility', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.filter((r) => !NOINDEX_ROUTES.includes(r.path)).map((r) => ({
    url: `${SITE.url}${r.path === '/' ? '/' : `${r.path}/`}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
