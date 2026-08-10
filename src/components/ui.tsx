import Link from 'next/link';
import type { ReactNode } from 'react';
import { RELATIONSHIP_LABEL, ventureMeta, ventureLogo, type Relationship, type Venture } from '@/content/ventures';

// Testimonials moved to its own client component (components/Testimonials.tsx) so
// it can show real founder photos with an onError fallback to a monogram.

/* -------------------------------------------------------------- primitives */

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
    <section id={id} className={`section${tight ? ' tight' : ''} surface-${surface}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  light,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  light?: boolean;
}) {
  return (
    <div className="section-head">
      <div>
        <p className={`eyebrow${light ? ' light' : ''}`}>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {lead ? <p className={`lead${light ? ' light' : ''}`}>{lead}</p> : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumb,
  children,
  small,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: ReactNode;
  small?: boolean;
}) {
  return (
    <section className="hero">
      <div className="shell hero-grid single">
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
          <p className="eyebrow light">{eyebrow}</p>
          <h1 className={`display${small ? ' sm' : ''}`}>{title}</h1>
          {lead ? <p className="lead light">{lead}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}

export function Buttons({ children }: { children: ReactNode }) {
  return <div className="button-row">{children}</div>;
}

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
    <Link className={`button ${variant}`} href={href}>
      {children}{' '}
      <span className="arrow" aria-hidden="true">
        ↗
      </span>
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
  return (
    <div className={`held-block${legal ? ' legal' : ''}`}>
      <span className="held-flag">{flag}</span>
      {title ? <h3>{title}</h3> : null}
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
}

export function Qualifier({ children }: { children: ReactNode }) {
  return <div className="qualifier">{children}</div>;
}

/* ------------------------------------------------------------- portfolio  */

export function RelationshipTag({
  relationship,
  flagship,
}: {
  relationship: Relationship;
  flagship?: boolean;
}) {
  if (flagship) {
    return <span className="rel-label rel-flagship">Flagship · {RELATIONSHIP_LABEL[relationship]}</span>;
  }
  return <span className={`rel-label rel-${relationship}`}>{RELATIONSHIP_LABEL[relationship]}</span>;
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
    <article className="p-card">
      {/* Fixed-height logo slot on EVERY card so the tag, name and text always start
          at the same place, whether or not the venture has a logo (keeps the grid aligned). */}
      <div className="venture-logo-slot">
        {ventureLogo(venture.slug) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="venture-logo" src={ventureLogo(venture.slug)} alt={`${venture.name} logo`} loading="lazy" />
        ) : null}
      </div>
      <RelationshipTag relationship={venture.relationship} flagship={venture.flagship} />
      <h3>{venture.name}</h3>
      {ventureMeta(venture.slug) ? <p className="venture-meta">{ventureMeta(venture.slug)}</p> : null}
      {venture.oneLine ? <p>{venture.oneLine}</p> : null}
      {venture.detail ? <p>{venture.detail}</p> : null}
      {/* gateNote is an INTERNAL editorial note (evidence/consent still owed) and is
          deliberately NOT rendered to the public. It stays in the data for the team. */}
      {href ? (
        <p style={{ marginTop: 14 }}>
          <Link href={href}>Read more ↗</Link>
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
    <article className="p-card">
      <h3>{title}</h3>
      {typeof children === 'string' ? <p>{children}</p> : children}
    </article>
  );
}

/* ------------------------------------------------------------------- CTA  */

export function ConversionClose({
  title = 'Could we build this company together?',
  lead = 'Complete a short HSE Fit Assessment to provide the venture, founder, execution-scope and available-capital information needed for qualification.',
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <Section surface="deep">
      <SectionHead eyebrow="Next step" title={title} lead={lead} light />
      <Buttons>
        <Btn href="/apply">Check if you qualify</Btn>
        <Btn href="/hse-model" variant="secondary">
          Explore the HSE model
        </Btn>
      </Buttons>
      <p className="consent-note">
        Short first-stage assessment. No pitch-deck upload. No automatic acceptance. The form does not
        request payment.
      </p>
    </Section>
  );
}
