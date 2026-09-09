import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRightIcon } from './Icons';
import { RELATIONSHIP_LABEL, ventureMeta, ventureLogo, type Relationship, type Venture } from '@/content/ventures';
import { DISCLAIMER } from '@/content/site';

// Testimonials moved to its own client component (components/Testimonials.tsx) so
// it can show real founder photos with an onError fallback to a monogram.

/* -------------------------------------------------------------- primitives */

/**
 * Class maps.
 *
 * Written as whole literal strings rather than assembled by interpolation, so
 * the token gate can see every class that will reach the DOM. A class built by
 * interpolation is invisible to a static check, which is exactly how a rule
 * that no longer exists survives a stylesheet rewrite. The `_CLASS` suffix is
 * the convention the gate looks for — see scripts/token-gate.mjs.
 */
const SECTION_CLASS = {
  // `warm` was the old warm-white default and is now simply the page ground.
  warm: { normal: 'sec', tight: 'sec-sm' },
  ice: { normal: 'sec band-alt', tight: 'sec-sm band-alt' },
  navy: { normal: 'sec band-closing', tight: 'sec-sm band-closing' },
  deep: { normal: 'sec band-closing deep', tight: 'sec-sm band-closing deep' },
} as const;

export function Section({
  children,
  surface = 'warm',
  id,
  tight,
}: {
  children: ReactNode;
  surface?: 'warm' | 'ice' | 'navy' | 'deep';
  id?: string;
  tight?: boolean;
}) {
  return (
    <section id={id} className={SECTION_CLASS[surface][tight ? 'tight' : 'normal']}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/**
 * Dark grounds recolour their own children in the common layer, so a section
 * moved onto a dark band cannot end up half-inverted. There is no `light`
 * prop; it was retired at D8 together with its call sites.
 */
export function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h2">{title}</h2>
      </div>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  );
}

/**
 * The interior-page hero. Drives 25 of the 26 routes; the homepage hand-rolls
 * its own.
 *
 * The ground is the offset light wash on every route, by user decision. That
 * inverts what used to be a dark navy hero, so the breadcrumb, eyebrow, lead
 * and heading all read on light now.
 *
 * There is no `small` prop. Every interior hero takes .h1p, which is the
 * scale's interior variant and has more call sites than any other token in the
 * system. Retired at D8 with its call sites.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="hero wash-left">
      <div className="wrap">
        <div>
          {breadcrumb ? (
            <p className="breadcrumb">
              {breadcrumb.map((b, i) => (
                <span key={b.label}>
                  {i > 0 ? ' / ' : ''}
                  {b.href ? <Link href={b.href}>{b.label}</Link> : b.label}
                </span>
              ))}
            </p>
          ) : null}
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h1p">{title}</h1>
          {lead ? <p className="lead">{lead}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}

export function Buttons({ children }: { children: ReactNode }) {
  return <div className="btn-row">{children}</div>;
}

const BTN_CLASS = {
  primary: 'btn',
  secondary: 'btn2',
  ghost: 'btn-ghost',
} as const;

export function Btn({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  return (
    <Link className={BTN_CLASS[variant]} href={href}>
      {children}
      {/* The guide's own traced arrow, replacing the ↗ text glyph. Decorative
          and aria-hidden either way, so the label the user reads is unchanged. */}
      <ArrowUpRightIcon />
    </Link>
  );
}

/* ------------------------------------------------------------------ gates */

/**
 * A visible held-claim block.
 *
 * Drop this wherever a claim is not yet publishable. It exists so a gate is
 * never silently omitted from a page, a reviewer can see what is outstanding
 * without reading the evidence register. Delete it only when the gate has
 * actually closed, never to make a page look finished.
 */
const HELD_CLASS = {
  normal: 'held',
  legal: 'held legal',
} as const;

const HELD_FLAG_CLASS = {
  normal: 'pill flag-held',
  legal: 'pill flag-legal',
} as const;

export function EvidenceGate({
  flag,
  title,
  children,
  legal,
}: {
  flag: string;
  title?: string;
  children: ReactNode;
  legal?: boolean;
}) {
  const key = legal ? 'legal' : 'normal';
  return (
    <div className={HELD_CLASS[key]}>
      <span className={HELD_FLAG_CLASS[key]}>{flag}</span>
      {title ? <h3 className="h3">{title}</h3> : null}
      {typeof children === 'string' ? <p className="body">{children}</p> : children}
    </div>
  );
}

export function Qualifier({ children }: { children: ReactNode }) {
  return <div className="qualifier">{children}</div>;
}

/**
 * The financial-promotion notice.
 *
 * One component so that when counsel returns approved wording, editing
 * DISCLAIMER moves every surface at once. Before this existed the notice was
 * hand-written on five pages and had already drifted — and the pages carrying
 * the unapproved variant were the three capital routes, i.e. the ones most
 * exposed under s.21 FSMA.
 *
 * `eligibility` selects between the two live scope variants; see the comment on
 * DISCLAIMER_ELIGIBILITY in content/site.ts for why they are not yet collapsed.
 * `extra` is the page-specific sentence that sits between the headline and the
 * eligibility wording. `showS21` adds the FCA explanation as a .small line.
 */
export function FinancialPromotionNotice({
  eligibility = 'investment',
  extra,
  showS21,
}: {
  eligibility?: keyof typeof DISCLAIMER.eligibility;
  extra?: ReactNode;
  showS21?: boolean;
}) {
  return (
    <Qualifier>
      <p>
        <strong>{DISCLAIMER.headline}</strong>{' '}
        {extra ? <>{extra} </> : null}
        {DISCLAIMER.eligibility[eligibility]}
      </p>
      {showS21 ? <p className="small">{DISCLAIMER.s21}</p> : null}
    </Qualifier>
  );
}

/* ------------------------------------------------------------- portfolio  */

/**
 * Classification tags.
 *
 * The tag is a .pill carrying a classification colour. Those colours encode
 * meaning rather than brand, so they live in the site layer's marked
 * classification block rather than reading a brand token.
 */
const REL_CLASS: Record<Relationship, string> = {
  'equity-investment': 'pill rel-equity-investment',
  'direct-hse-venture': 'pill rel-direct-hse-venture',
  'project-in-development': 'pill rel-project-in-development',
  'delivered-venture': 'pill rel-delivered-venture',
  'capital-relationship': 'pill rel-capital-relationship',
};

export function RelationshipTag({
  relationship,
  flagship,
}: {
  relationship: Relationship;
  flagship?: boolean;
}) {
  if (flagship) {
    return <span className="pill-brand">Flagship · {RELATIONSHIP_LABEL[relationship]}</span>;
  }
  return <span className={REL_CLASS[relationship]}>{RELATIONSHIP_LABEL[relationship]}</span>;
}

/**
 * Venture card.
 *
 * The classification tag renders BEFORE the name, every time, that ordering
 * is the portfolio rule made structural. A venture with no evidenced
 * description shows its name and label and nothing else, and says why.
 */
export function VentureCard({ venture, href }: { venture: Venture; href?: string }) {
  return (
    <article className="card">
      {/* Fixed-height logo slot on EVERY card so the tag, name and text always start
          at the same place, whether or not the venture has a logo (keeps the grid aligned). */}
      <div className="logo-slot">
        {ventureLogo(venture.slug) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="venture-logo" src={ventureLogo(venture.slug)} alt={`${venture.name} logo`} loading="lazy" />
        ) : null}
      </div>
      <RelationshipTag relationship={venture.relationship} flagship={venture.flagship} />
      <h3 className="h3">{venture.name}</h3>
      {ventureMeta(venture.slug) ? <p className="small">{ventureMeta(venture.slug)}</p> : null}
      {venture.oneLine ? <p className="body">{venture.oneLine}</p> : null}
      {venture.detail ? <p className="body">{venture.detail}</p> : null}
      {/* gateNote is an INTERNAL editorial note (evidence/consent still owed) and is
          deliberately NOT rendered to the public. It stays in the data for the team. */}
      {href ? (
        <p>
          {/* The arrow is part of the visible label, so it stays as the
              character it is. Only the arrows that were already aria-hidden
              decoration became icons. */}
          <Link className="link flink" href={href}>
            Read more ↗
          </Link>
        </p>
      ) : null}
    </article>
  );
}

export function CardGrid({ children }: { children: ReactNode }) {
  return <div className="card-grid">{children}</div>;
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="card">
      <h3 className="h3">{title}</h3>
      {typeof children === 'string' ? <p className="body">{children}</p> : children}
    </article>
  );
}

/* ------------------------------------------------------------------- CTA  */

/**
 * The closing conversion block — section 15 of the 8 Sep 2026 copy brief.
 *
 * The brief keeps the existing headline ("Retain the existing closing headline
 * if already used") and rewrites the lead, the CTAs and the note.
 *
 * `capitalRoute` adds the second audience the brief asks for: "If you are an
 * investor, family office or strategic partner, speak to Holdings about capital
 * partnerships." It defaults to FALSE and is enabled only on the homepage,
 * because this component renders on five other routes and the destination
 * (/partners/capital) is noindexed and held for counsel under s.21 FSMA.
 * Turning it on everywhere would promote that page from the foot of every
 * portfolio route.
 *
 * The capital sentence and the capital button move together. A lead that
 * invites investors to speak to Holdings, above a block with no route for them,
 * would be worse than not making the offer.
 */
export function ConversionClose({
  title = 'Could we build this company together?',
  lead = 'If you have a real problem, a committed founding team and the ambition to build something that can scale, start with the venture diagnostic.',
  capitalRoute = false,
}: {
  title?: string;
  lead?: string;
  capitalRoute?: boolean;
}) {
  return (
    <Section surface="deep">
      <SectionHead
        eyebrow="Next step"
        title={title}
        lead={
          capitalRoute
            ? `${lead} If you are an investor, family office or strategic partner, speak to Holdings about capital partnerships.`
            : lead
        }
      />
      <Buttons>
        <Btn href="/apply">Start venture diagnostic</Btn>
        {capitalRoute ? (
          <Btn href="/partners/capital" variant="secondary">
            Talk to Pixelette Holdings
          </Btn>
        ) : null}
      </Buttons>
      <p className="small">
        Selected opportunities only. Every HSE or investment relationship is subject to review, agreed
        terms and formal documentation.
      </p>
    </Section>
  );
}
