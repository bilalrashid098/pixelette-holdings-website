'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/**
 * Privacy choices — 18 Sep 2026.
 *
 * The same panel as the Pixelette Technologies footer: a dialog with one
 * setting, Website analytics, its current state, an On/Off switch and a link
 * to the cookie policy. The stored choice works the same way as theirs — a
 * value in localStorage and a window event — under this site's own names.
 *
 * THE WORDING IS HOLDINGS', AND EVERY SENTENCE IS TRUE OF THIS SITE, checked
 * 18 Sep 2026:
 *
 * - No analytics run. package.json has no analytics dependency, layout.tsx
 *   loads no third-party script, and the CSP (vercel.json, public/_headers)
 *   is script-src 'self', connect-src 'self' — a third-party tag could not load
 *   or report even if one were added by mistake.
 * - The site sets no cookies. The choice below is kept in localStorage, which
 *   is storage the visitor asked for and so strictly necessary.
 *
 * Technologies' panel opens "We use limited, privacy-preserving analytics".
 * That is not copied: it is not true here. Nor is their default — they show
 * On when nothing is stored. Here it is OFF, because /privacy and /cookies both
 * promise consent will be obtained BEFORE any analytics is introduced; a
 * pre-pressed On would contradict them.
 */

export const ANALYTICS_KEY = 'ph-analytics';
export const PRIVACY_EVENT = 'ph-privacy-change';

type Choice = 'on' | 'off';

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(ANALYTICS_KEY);
    return v === 'on' || v === 'off' ? v : null;
  } catch {
    return null;
  }
}

function writeChoice(v: Choice) {
  try {
    window.localStorage.setItem(ANALYTICS_KEY, v);
  } catch {}
  window.dispatchEvent(new CustomEvent(PRIVACY_EVENT, { detail: v }));
}

export function PrivacyChoices() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [choice, setChoice] = useState<Choice | null>(null);
  // The stored choice is only readable in the browser. Until it has been read,
  // the switch is disabled and neither side is pressed, rather than showing a
  // server-rendered state that may be wrong.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChoice(readChoice());
    setReady(true);
  }, []);

  const choose = (v: Choice) => {
    writeChoice(v);
    setChoice(v);
  };

  const isOn = choice === 'on';

  return (
    <>
      <button
        type="button"
        className="flink privacy-trigger"
        onClick={() => dialogRef.current?.showModal()}
      >
        Privacy choices
      </button>
      <dialog
        ref={dialogRef}
        className="privacy-panel"
        aria-labelledby="privacy-choices-title"
        // A click on the dialog element itself, not on anything inside it, is a
        // click on the backdrop.
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="privacy-panel__inner">
          <div className="privacy-panel__head">
            <h2 id="privacy-choices-title">Privacy choices</h2>
            <button
              type="button"
              className="privacy-panel__close"
              aria-label="Close privacy choices"
              onClick={() => dialogRef.current?.close()}
            >
              ×
            </button>
          </div>

          <h3 className="privacy-panel__sub">Website analytics</h3>
          <p className="privacy-panel__body">
            The Pixelette Holdings website does not use analytics, advertising or tracking cookies,
            and loads no third-party scripts. If we introduce privacy-preserving analytics to
            understand how the site is used, it will not be used for advertising, cross-site
            tracking or to identify individual visitors, and it will only run if you allow it here.
          </p>
          <p className="privacy-panel__state">
            No analytics are currently running on this website. Your choice is saved and will apply
            if that changes.
          </p>

          <div className="privacy-panel__control">
            <span id="analytics-toggle-label">Website analytics</span>
            <div className="privacy-toggle" role="group" aria-labelledby="analytics-toggle-label">
              <button
                type="button"
                onClick={() => choose('on')}
                aria-pressed={ready ? isOn : undefined}
                disabled={!ready}
              >
                On
              </button>
              <button
                type="button"
                onClick={() => choose('off')}
                aria-pressed={ready ? !isOn : undefined}
                disabled={!ready}
              >
                Off
              </button>
            </div>
          </div>

          <p className="privacy-panel__note">
            Your choice is kept in this browser, not in a cookie. You can change it at any time.
          </p>
          <Link
            className="privacy-panel__link"
            href="/cookies"
            onClick={() => dialogRef.current?.close()}
          >
            Learn more about cookies &amp; analytics
          </Link>
        </div>
      </dialog>
    </>
  );
}
