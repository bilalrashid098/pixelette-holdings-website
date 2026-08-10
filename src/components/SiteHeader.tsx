'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PRIMARY_NAV } from '@/content/site';

/**
 * Institutional header. One dominant CTA, consistently "Apply for HSE".
 *
 * The mobile menu is keyboard operable, closes on Escape and on navigation,
 * and locks background scroll while open. Dropdown behaviour never depends on
 * hover, that was a defect on the previous site.
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
      <div className="shell nav">
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
          className={`nav-links${open ? ' is-open' : ''}`}
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
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-menu"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>

        <Link className="button primary nav-cta" href="/apply">
          Check if you qualify <span className="arrow" aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
