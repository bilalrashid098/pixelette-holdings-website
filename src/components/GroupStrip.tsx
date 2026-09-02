'use client';

import { useState } from 'react';
import { GROUP_COMPANIES } from '@/content/site';

/** One group company: its logo (public/media/brand/<key>.png) if present, else
 *  its name. Links to the company site (external opens a new tab). No broken
 *  images, a missing logo falls back to the name. */
function Item({ c }: { c: { key: string; name: string; sub: string; href: string; mark: string } }) {
  const [failed, setFailed] = useState(false);
  const external = c.href.startsWith('http');
  return (
    <a
      className="group-item"
      href={c.href}
      aria-label={`${c.name} ${c.sub}`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {c.mark && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="group-mark" src={`/media/brand/${c.mark}`} alt="" onError={() => setFailed(true)} />
      ) : null}
      <span className="group-word">
        <span className="group-word-main">{c.name}</span>
        <span className="group-word-sub">{c.sub}</span>
      </span>
    </a>
  );
}

/** "The Pixelette Group" cross-link strip for the footer. */
export function GroupStrip() {
  return (
    <div className="group-strip">
      <span className="eyebrow group-eyebrow">The Pixelette Group</span>
      <div className="group-items">
        {GROUP_COMPANIES.map((c) => (
          <Item key={c.key} c={c} />
        ))}
      </div>
    </div>
  );
}
