'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Scroll behaviour, mounted once in the layout.
 *
 * Two jobs, both ported from the approved prototype:
 *   1. Condense the header past 90px and hide it on downward scroll.
 *   2. Reveal `.reveal` elements as they enter the viewport.
 *
 * Keeping this in one client component means every page can stay a server
 * component and still opt into the motion by adding a class name.
 *
 * Under `prefers-reduced-motion` the observer is skipped entirely and every
 * element is revealed immediately, content must never depend on animation to
 * become visible.
 */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector('.site-header');
    let last = 0;

    const onScroll = () => {
      const y = window.scrollY;
      header?.classList.toggle('is-condensed', y > 90);
      header?.classList.toggle('is-hidden', y > last && y > 320);
      last = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Re-runs per route: a client-side navigation renders new `.reveal` nodes.
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.reveal'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
