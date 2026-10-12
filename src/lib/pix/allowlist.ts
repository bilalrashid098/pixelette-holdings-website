/**
 * Route families the Holdings assistant may ground answers in.
 *
 * Allowlist, not denylist: a new top-level section stays out until listed.
 */

export const ALLOWED_SOURCE_PREFIXES: readonly string[] = [
  '/',
  '/about',
  '/accessibility',
  '/apply',
  '/contact',
  '/cookies',
  '/disclaimer',
  '/hse-model',
  '/insights',
  '/portfolio',
  '/privacy',
  '/startups',
  '/terms',
];

export const FORBIDDEN_SOURCE_PREFIXES: readonly string[] = [
  '/archive',
  '/legacy',
  '/old',
  '/deprecated',
  '/held',
  '/insights/archive/',
];

export function isAllowedSource(routePath: string): boolean {
  const p = (routePath || '').trim();
  if (!p.startsWith('/')) return false;
  if (FORBIDDEN_SOURCE_PREFIXES.some(f => p === f || p.startsWith(f.endsWith('/') ? f : `${f}/`))) {
    return false;
  }
  if (p === '/') return true;
  return ALLOWED_SOURCE_PREFIXES.some(a => a !== '/' && (p === a || p.startsWith(`${a}/`)));
}
