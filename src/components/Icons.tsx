/**
 * Bespoke capability icons, inline SVG, stroke-based, inherit currentColor.
 *
 * No raster assets, no external requests: these are hand-drawn vectors so they
 * stay crisp at any size, add nothing to the network, and satisfy the strict
 * CSP (no img/font host beyond 'self'). One icon per group capability.
 */
import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

/* ------------------------------------------------- the guide's icon set
 *
 * Traced from the pattern guide's own markup, path data unchanged. Every one
 * takes `currentColor`, so the call site decides the tone — and the tone is
 * always the READING tone, never the signal: at these stroke weights the
 * signal reads washed out even where the ratio technically passes.
 *
 * Only icons with a real call site are built. The guide also draws a star and
 * a set of chevrons; this site has nowhere to put them, and a primitive
 * nobody imports is the failure mode Appendix E warns about.
 *
 * The check, the plus, the minus and the quote glyph are drawn from the same
 * traced paths but applied as CSS masks in globals.css, because their call
 * sites are ::before pseudo-elements on list items, accordions and blockquotes
 * where an inline SVG would mean touching every item of markup.
 */

const guideBase: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 17 17',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

/** Arrow up-right — outbound and forward actions. The guide's own button arrow. */
export function ArrowUpRightIcon({ size = 15 }: { size?: number }) {
  return (
    <svg {...guideBase} width={size} height={size}>
      <path d="M5 12L12 5M6 5h6v6" />
    </svg>
  );
}

/** Arrow right — inline continuation. */
export function ArrowRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg {...guideBase} width={size} height={size}>
      <path d="M3 8.5h10M9 4.5l4 4-4 4" />
    </svg>
  );
}

/** Menu, three rules. The guide has no mobile drawer; this is the group's. */
export function MenuIcon({ size = 20 }: { size?: number }) {
  return (
    <svg {...guideBase} width={size} height={size}>
      <path d="M2.5 4.5h12M2.5 8.5h12M2.5 12.5h12" />
    </svg>
  );
}

/** Close. */
export function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg {...guideBase} width={size} height={size}>
      <path d="M4 4l9 9M13 4l-9 9" />
    </svg>
  );
}

/** Build, stacked layers (product assembled from parts). */
export function BuildIcon() {
  return (
    <svg {...base}>
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M2 12l10 5 10-5" />
      <path d="M2 16l10 5 10-5" />
    </svg>
  );
}

/** Launch, rising trajectory into market. */
export function LaunchIcon() {
  return (
    <svg {...base}>
      <path d="M12 2c2.8 2.4 4.2 5.6 4.2 9.4L12 14.5l-4.2-3.1C7.8 7.6 9.2 4.4 12 2Z" />
      <path d="M8.4 13.2 6 18l4.2-1.3" />
      <circle cx="12" cy="9" r="1.5" />
    </svg>
  );
}

/** Assure, shield with a check (enterprise-ready, verified). */
export function AssureIcon() {
  return (
    <svg {...base}>
      <path d="M12 3l7 3v5c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/** Own, institutional building (holdings, governance). */
export function OwnIcon() {
  return (
    <svg {...base}>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-4 7 4v13" />
      <path d="M10 21v-6h4v6" />
      <path d="M8.5 11h.01M15.5 11h.01" />
    </svg>
  );
}

const MAP: Record<string, () => React.JSX.Element> = {
  Build: BuildIcon,
  Launch: LaunchIcon,
  Assure: AssureIcon,
  Own: OwnIcon,
};

/** Render the icon for a capability by its name; nothing if unknown. */
export function CapabilityIcon({ name }: { name: string }) {
  const Ico = MAP[name];
  return Ico ? (
    <span className="cap-icon" aria-hidden="true">
      <Ico />
    </span>
  ) : null;
}
