import type { Metadata } from 'next';
import { SITE } from '@/content/site';

/**
 * Page metadata helper. The KB builder extracts exact string literals from
 * `pageMetadata({ title, description, path })` calls — keep those fields as
 * string literals at the call site.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  noIndex?: boolean;
}): Metadata {
  const canonical = input.path === '/' ? '/' : input.path;
  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: { canonical },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: input.absoluteTitle ? input.title : `${input.title} | ${SITE.name}`,
      description: input.description,
      url: `${SITE.url}${canonical === '/' ? '' : canonical}`,
      siteName: SITE.name,
      locale: SITE.locale,
      type: 'website',
    },
  };
}
