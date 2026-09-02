'use client';

import { useState } from 'react';
import type { Testimonial } from '@/content/testimonials';

/** Two-letter monogram, ignoring honorifics. */
function initials(name: string): string {
  const parts = name.replace(/^(Professor|Prof\.?|Dr\.?|Dato|Seri)\s+/gi, '').trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
}

function Avatar({ src, name }: { src?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        className="tstm-photo"
        src={src}
        alt={name}
        width={46}
        height={46}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return <span className="tstm-mono" aria-hidden="true">{initials(name)}</span>;
}

/**
 * Founder testimonials, real, attributed quotes published on the group's own
 * live site. Shows the founder's photo when the file is present (fetched by
 * download-assets.ps1), otherwise a clean monogram. Never a broken image.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="tstm-grid">
      {items.map((t) => (
        <figure className="card tstm" key={t.name}>
          <blockquote>{t.quote}</blockquote>
          <figcaption>
            <Avatar src={t.avatar} name={t.name} />
            <span className="tstm-who">
              <strong className="h4">{t.name}</strong>
              <span className="small">{t.role} · {t.company}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
