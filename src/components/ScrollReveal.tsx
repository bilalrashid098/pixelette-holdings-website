'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Re-scan hook for scroll reveal. Mounted once in the layout.
 *
 * THE MECHANISM IS NOT HERE. It lives in the inline script in layout.tsx —
 * selectors, observer, stagger indices and the safety gate — and it starts at
 * DOMContentLoaded without waiting for React. This component exists for one
 * job: a client-side navigation renders nodes the original scan never saw, so
 * it asks the script to look again.
 *
 * That split is not stylistic. The first version put the observer in this file
 * and left only the gate inline; measured in Chrome, hydration on the five
 * legal routes lost the race with the failsafe timer, the attribute came back
 * off and the reveal silently did nothing. Anything a slow device delays must
 * not be the thing the feature depends on. Moving the observer inline fixed it,
 * and left this file unable to break the initial page load at all.
 *
 * Under prefers-reduced-motion the script never defines __revealScan, so this
 * hook finds nothing to call and does nothing. The accessibility statement
 * promises visitors exactly that.
 *
 * Every page stays a server component: nothing is imported per route and no
 * page markup changed anywhere. The reveal reads the structural classes the
 * site already ships, so a new page written with the existing wrappers animates
 * without being told to.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const scan = (window as unknown as { __revealScan?: () => void }).__revealScan;
    // Absent under reduced motion, on a browser without IntersectionObserver,
    // or if the script's own guard tore the mechanism down. All three mean the
    // page is static and there is nothing to re-scan.
    if (typeof scan !== 'function') return;

    // The new route's nodes exist by the time effects run. Re-observing an
    // element already under observation is a no-op, so this is safe to repeat.
    scan();
  }, [pathname]);

  return null;
}
