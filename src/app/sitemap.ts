import type { MetadataRoute } from 'next';
import { SITE, NOINDEX_ROUTES } from '@/content/site';

// output: 'export' requires metadata routes to declare themselves static.
export const dynamic = 'force-static';

/**
 * Sitemap.
 *
 * ROUTES is the full public route list; the gated ones are filtered out using
 * the same NOINDEX_ROUTES constant that drives robots.txt and the per-page
 * metadata. A route cannot be listed here and noindexed on the page — the two
 * are derived from one source.
 */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/hse-model', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/hse-model/founder-protection', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/validation-sprint', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/apply', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/apply/thank-you', priority: 0.1, changeFrequency: 'yearly' },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/portfolio/investments', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/portfolio/hse-ventures', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/portfolio/delivered-ventures', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/portfolio/2connect', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/capabilities', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/partners/accelerators', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/partners/capital', priority: 0.1, changeFrequency: 'yearly' },
  { path: '/partners/capital/qualification', priority: 0.1, changeFrequency: 'yearly' },
  { path: '/partners/capital/thank-you', priority: 0.1, changeFrequency: 'yearly' },
  { path: '/insights', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/insights/services-for-equity-properly-structured', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/social-impact', priority: 0.6, changeFrequency: 'monthly' },
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
