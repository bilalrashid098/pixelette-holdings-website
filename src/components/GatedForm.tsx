'use client';

import { useState } from 'react';

/**
 * A form that renders and validates but cannot submit.
 *
 * Same gate as the HSE Fit Assessment: no personal data is accepted anywhere on
 * this site until the data controller, lawful basis, retention period and
 * routing destination are approved. Centralising it means a new enquiry form
 * cannot be added later without inheriting the gate.
 *
 * To go live: set `approved` on the calling page and wire `action`.
 */

export type Field =
  | { kind: 'text' | 'email' | 'url'; id: string; label: string; hint?: string; required?: boolean; autoComplete?: string }
  | { kind: 'textarea'; id: string; label: string; hint?: string; required?: boolean }
  | { kind: 'select'; id: string; label: string; hint?: string; required?: boolean; options: string[] };

export function GatedForm({
  id,
  fields,
  consents,
  submitLabel,
  note,
  heldBody = 'This form is being finalised. In the meantime, email us at info@pixeletteholdings.com and we will route your enquiry to the right person.',
  approved = false,
}: {
  id: string;
  fields: Field[];
  consents: { id: string; label: string; required?: boolean }[];
  submitLabel: string;
  note?: string;
  heldBody?: string;
  approved?: boolean;
}) {
  const [blocked, setBlocked] = useState(false);

  return (
    <div className="form-wrap reveal">
      <form
        id={id}
        noValidate
        onSubmit={(e) => {
          if (!approved) {
            e.preventDefault();
            setBlocked(true);
          }
        }}
      >
        {fields.map((f) => (
          <div key={f.id} className="field">
            <label htmlFor={f.id}>
              {f.label} {f.required ? <span className="req">*</span> : null}
            </label>
            {f.hint ? <span className="hint">{f.hint}</span> : null}

            {f.kind === 'textarea' ? (
              <textarea id={f.id} name={f.id} required={f.required} />
            ) : f.kind === 'select' ? (
              <select id={f.id} name={f.id} required={f.required} defaultValue="">
                <option value="">Please select</option>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                id={f.id}
                name={f.id}
                type={f.kind}
                required={f.required}
                autoComplete={f.autoComplete}
              />
            )}
          </div>
        ))}

        {consents.map((c) => (
          <div key={c.id} className="consent-row">
            <input id={c.id} name={c.id} type="checkbox" required={c.required} />
            <label htmlFor={c.id}>
              {c.label} {c.required ? <span className="req">*</span> : null}
            </label>
          </div>
        ))}

        <div className="button-row" style={{ marginTop: 20 }}>
          <button className="button primary" type="submit" disabled={!approved}>
            {submitLabel} <span className="arrow" aria-hidden="true">↗</span>
          </button>
        </div>

        {note ? <p className="form-note">{note}</p> : null}

        {blocked ? (
          <p className="form-note" role="status">
            This form is not yet accepting submissions.
          </p>
        ) : null}
      </form>

      {!approved ? <p className="form-note" style={{ marginTop: 18 }}>{heldBody}</p> : null}
    </div>
  );
}
