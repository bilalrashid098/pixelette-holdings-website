'use client';

import { useState } from 'react';

/** One badge: shows the accreditation image when present, else a text pill.
 *  Never a broken image (onError falls back). */
function Badge({ img, label }: { img?: string; label: string }) {
  const [failed, setFailed] = useState(false);
  if (img && !failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        className="cred-badge"
        src={img}
        alt={label}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return <span className="pill">{label}</span>;
}

export function CredentialStrip({ items }: { items: readonly { label: string; img?: string }[] }) {
  return (
    <div className="cred-strip">
      {items.map((c) => (
        <Badge key={c.label} img={c.img} label={c.label} />
      ))}
    </div>
  );
}
