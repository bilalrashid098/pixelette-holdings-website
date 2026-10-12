import type { MetadataRoute } from 'next';
import { SITE, NOINDEX_ROUTES } from '@/content/site';

// Keep the robots route static (no request-time data).
export const dynamic = 'force-static';

/**
 * robots.txt, generated from the same NOINDEX_ROUTES list the pages use.
 *
 * Deriving it means a gated route cannot be excluded in one place and exposed
 * in the other — the previous site's robots directives and its page metadata
 * disagreed, and the pages won.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: NOINDEX_ROUTES.map((r) => `${r}/`),
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
