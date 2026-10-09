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
 * Only icons with a real call site are built. The guide also draws a star, a
 * set of chevrons and a plain right arrow; this site has nowhere to put them,
 * and a primitive nobody imports is the failure mode Appendix E warns about.
 * The right arrow WAS built at D1 and removed at D8 for exactly that reason.
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

/* Lucide-aligned outline icons for Protecting the partnership (24×24). */

export function ClipboardListIcon({ size = 24 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}

export function FlagIcon({ size = 24 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

export function ChartPieIcon({ size = 24 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    </svg>
  );
}

export function ScaleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}

export function FileCheck2Icon({ size = 24 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m3 15 2 2 4-4" />
    </svg>
  );
}

export function ArrowRightLeftIcon({ size = 24 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="m16 3 4 4-4 4" />
      <path d="M20 7H4" />
      <path d="m8 21-4-4 4-4" />
      <path d="M4 17h16" />
    </svg>
  );
}

/* Lucide-aligned outline icons for About — Our approach principles (24×24). */

export function HandSupportIcon({ size = 24 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" />
      <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.2-.6H12a2 2 0 0 0 0-4h-1" />
      <path d="m14 14 2.7-2.7a1.8 1.8 0 0 0 0-2.6 1.8 1.8 0 0 0-2.6 0L12 10.4" />
      <path d="m5 14-1.5 1.5a1.5 1.5 0 0 0 0 2.1l3.4 3.4c.4.4 1 .6 1.5.4L14 19" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function SettingsIcon({ size = 24 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function HeartHandIcon({ size = 24 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
      <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.2-.6H12a2 2 0 0 0 0-4h-1" />
      <path d="M19.5 8.5c.7-.7 1.1-1.6 1.1-2.6A3.4 3.4 0 0 0 17.2 2.5c-1 0-1.9.4-2.6 1.1L14 4.2l-.6-.6A3.7 3.7 0 0 0 8.2 9l5.8 5.8" />
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
