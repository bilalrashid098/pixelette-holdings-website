'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PRIMARY_NAV } from '@/content/site';
import { MenuIcon, CloseIcon, ArrowUpRightIcon } from './Icons';

/**
 * Institutional header. One dominant CTA, "Start Venture Diagnostic", which
 * routes to the /apply fit assessment.
 *
 * The mobile menu is keyboard operable, closes on Escape and on navigation,
 * and locks background scroll while open.
 *
 * There is no dropdown: PRIMARY_NAV is rendered flat, one link per top-level
 * item. The brief's navigation is flat by design, so nothing is hidden here.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isCurrent = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  // Show the real logo when its file exists; fall back to the wordmark otherwise
  // (fetched by download-assets.ps1). Never a broken image.
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="wordmark" href="/" aria-label="Pixelette Holdings home">
          {logoFailed ? (
            <span>PIXELETTE HOLDINGS</span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="brand-logo"
              src="/media/brand/holdings.png"
              alt="Pixelette Holdings"
              onError={() => setLogoFailed(true)}
            />
          )}
        </Link>

        <nav
          id="primary-menu"
          className={open ? 'nav-links is-open' : 'nav-links'}
          aria-label="Primary navigation"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}

          {/* The CTA repeats inside the menu panel because at phone widths the
              header CTA is hidden: the label is long enough that it overflowed
              the viewport beside the wordmark and the menu button. Exactly one
              of the two is ever visible — see .nav-cta / .nav-cta-mobile. */}
          <Link className="btn nav-cta-mobile" href="/apply">
            Start Venture Diagnostic <ArrowUpRightIcon />
          </Link>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-menu"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <Link className="btn2 nav-cta" href="/apply">
          Start Venture Diagnostic <ArrowUpRightIcon />
        </Link>
      </div>
    </header>
  );
}
