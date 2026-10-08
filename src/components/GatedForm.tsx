'use client';

import { useState } from 'react';
import { ArrowUpRightIcon } from './Icons';
import { CONTACT } from '@/content/site';
import { openEnquiryMailto } from '@/lib/enquiry-mail';

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
  heldBody = `Email this enquiry opens a message in your own email program, addressed to ${CONTACT.email}. Pixelette receives it only if you send that message. This website does not store the form. Sending it does not create a partnership or an investment commitment.`,
  approved = false,
  defaults,
  mailSubject = 'Enquiry',
}: {
  id: string;
  fields: Field[];
  consents: { id: string; label: string; required?: boolean }[];
  submitLabel: string;
  note?: string;
  heldBody?: string;
  approved?: boolean;
  defaults?: Record<string, string>;
  mailSubject?: string;
}) {
  const [blocked, setBlocked] = useState(false);

  return (
    <div className="form">
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
            <label className="label" htmlFor={f.id}>
              {f.label} {f.required ? <span className="req">*</span> : null}
            </label>
            {f.hint ? <span className="small hint">{f.hint}</span> : null}

            {f.kind === 'textarea' ? (
              <textarea className="textarea" id={f.id} name={f.id} required={f.required} />
            ) : f.kind === 'select' ? (
              <select className="select" id={f.id} name={f.id} required={f.required} defaultValue={defaults?.[f.id] ?? ''}>
                <option value="">Please select</option>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                className="input"
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

        <div className="btn-row">
          <button
            className="btn"
            type="button"
            onClick={(event) => {
              const form = event.currentTarget.form;
              if (!form || !form.reportValidity()) return;
              const data = new FormData(form);
              const lines = [
                ...fields.map((field) => `${field.label}: ${String(data.get(field.id) ?? '').trim()}`),
                ...consents.map((consent) => `${consent.label} ${data.get(consent.id) ? 'Yes.' : 'No.'}`),
                'Sending this email does not create a partnership or an investment commitment.',
              ];
              openEnquiryMailto(mailSubject, lines, event.currentTarget);
            }}
          >
            Email this enquiry <ArrowUpRightIcon />
          </button>
          <button className="btn" type="submit" disabled={!approved} hidden>
            {submitLabel} <ArrowUpRightIcon />
          </button>
        </div>

        {note ? <p className="small form-note">{note}</p> : null}

        {blocked ? (
          <p className="small form-note" role="status">
            This form is not yet accepting submissions.
          </p>
        ) : null}
      </form>

      {!approved ? <p className="small form-note" style={{ marginTop: 18 }}>{heldBody}</p> : null}
    </div>
  );
}
