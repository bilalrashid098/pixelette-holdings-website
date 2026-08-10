'use client';

import { useState } from 'react';
import { CapabilityIcon } from './Icons';

/**
 * Shows the real group-company logo on a capability card. Falls back to the
 * bespoke line icon if the logo file is missing, so a card never shows a broken
 * image. Logos live at public/media/brand/ (fetched by download-assets.ps1).
 */
// Square brand MARK per capability — one fixed size, so all four match. Falls back
// to the bespoke line icon if the mark file is missing (never a broken image).
const MARK: Record<string, string> = {
  Build: 'mark-technologies.png',
  Launch: 'mark-marketing.svg',
  Assure: 'certified-icon.svg',
  Own: 'mark-holdings.png',
};

export function CapabilityBrand({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const file = MARK[name];
  if (!file || failed) return <CapabilityIcon name={name} />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="cap-mark" src={`/media/brand/${file}`} alt="" onError={() => setFailed(true)} />;
}
