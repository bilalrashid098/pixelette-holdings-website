'use client';

import Link from 'next/link';
import { type FormEvent, useActionState, useEffect, useRef, useState } from 'react';

import { QUESTIONS } from '@/content/enquiry-questions';
import { CONTACT } from '@/content/site';
import { AUDIENCE_LABEL, readAssessment, type PartnershipAssessment } from '@/lib/assessment';

import { submitContact, type ContactState } from './actions';

/** The server's answer, or `unconfirmed` when no answer arrived (see `submit`). */
type FormState = ContactState & { unconfirmed?: boolean };

const initialState: ContactState = { status: 'idle', message: '' };

/** When a Send has taken long enough that the visitor should hear about it. */
const SLOW_SEND_MS = 15000;

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? 'Sending…' : 'Send enquiry'}
    </button>
  );
}

type FieldProps = {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  maxLength: number;
  autoComplete?: string;
  type?: 'text' | 'email';
  rows?: number;
  defaultValue?: string;
};

function Field({
  name,
  label,
  error,
  hint,
  optional = false,
  maxLength,
  autoComplete,
  type = 'text',
  rows,
  defaultValue,
}: FieldProps) {
  const id = `field-${name}`;
  const hintId = hint ? `hint-${name}` : undefined;
  const errorId = error ? `err-${name}` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ');

  const shared = {
    id,
    name,
    maxLength,
    required: !optional,
    defaultValue,
    className: rows === undefined ? 'input' : 'textarea',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy === '' ? undefined : describedBy,
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {optional ? `${label} (optional)` : label}{' '}
        {!optional ? <span className="req">*</span> : null}
      </label>
      {hint ? (
        <span className="small hint" id={hintId}>
          {hint}
        </span>
      ) : null}
      {rows === undefined ? (
        <input {...shared} type={type} autoComplete={autoComplete} />
      ) : (
        <textarea {...shared} rows={rows} />
      )}
      {error ? (
        <span className="field-error" id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

function assessmentSummary(data: PartnershipAssessment): string {
  return [
    `Audience: ${AUDIENCE_LABEL[data.audience]}.`,
    `Stage: ${data.stage}.`,
    `Need: ${data.need}.`,
    `Structure: ${data.structure}.`,
    `Context: ${data.context}.`,
  ].join(' ');
}

/**
 * Contact enquiry: same server pipeline as Pix H (`submitContact` → Supabase
 * insert + Resend notification). Success if either leg lands, so a DB row
 * backs up the inbox when mail is down or unconfigured.
 *
 * Field names match `acceptEnquiry` / the assistant review form. The four
 * labels come from `enquiry-questions.ts` so Privacy and Pix H stay aligned.
 */
export function ContactForm() {
  const [serverState, formAction] = useActionState(submitContact, initialState);
  const [clientState, setClientState] = useState<FormState | null>(null);
  const [pending, setPending] = useState(false);
  const [slow, setSlow] = useState(false);
  const [carried, setCarried] = useState<PartnershipAssessment | null>(null);
  const [ready, setReady] = useState(false);
  const inFlight = useRef(false);

  useEffect(() => {
    const data = readAssessment();
    if (data && data.audience !== 'founder') setCarried(data);
    setReady(true);
  }, []);

  const state: FormState = clientState ?? serverState;
  const err = state.errors ?? {};

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    const data = new FormData(event.currentTarget);
    setPending(true);
    let next: FormState;
    try {
      next = await submitContact(initialState, data);
    } catch {
      next = { status: 'error', message: '', unconfirmed: true };
    }
    inFlight.current = false;
    setPending(false);
    setSlow(false);
    setClientState(next);
  };

  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(() => setSlow(true), SLOW_SEND_MS);
    return () => clearTimeout(timer);
  }, [pending]);

  const message = state.unconfirmed
    ? `We could not confirm that your enquiry was sent: the connection may have dropped. It may still have reached us. ` +
      `Please email ${CONTACT.email} so it is not lost; your answers are still below to copy.`
    : state.message;

  if (!ready) return <div className="form" aria-busy="true" />;

  return (
    <div className="form">
      {carried ? (
        <div className="qualifier">
          <p>
            <strong>From your startup partnership assessment.</strong> You are marked as{' '}
            {AUDIENCE_LABEL[carried.audience].toLowerCase()}. Those answers are suggested in the
            first question below so you can edit them before sending. Personal contact details are
            only needed on this form.
          </p>
        </div>
      ) : null}

      <form action={formAction} noValidate onSubmit={submit}>
        <div aria-live="polite" role="status">
          {!pending && state.status !== 'idle' && message ? (
            <p
              className="small form-note"
              style={{
                marginBottom: 18,
                color: state.status === 'success' ? undefined : 'var(--color-danger)',
              }}
            >
              {message}
            </p>
          ) : null}
          {slow ? (
            <p className="small form-note" style={{ marginBottom: 18, color: 'var(--color-danger)' }}>
              This is taking longer than it should. It may still arrive. If you would rather not
              wait, email {CONTACT.email}.
            </p>
          ) : null}
        </div>

        {state.status === 'success' ? null : (
          <>
            <div className="two-col" style={{ gap: 20, marginBottom: 0 }}>
              <Field name="name" label="Name" autoComplete="name" maxLength={120} error={err.name} />
              <Field
                name="company"
                label="Organisation"
                autoComplete="organization"
                maxLength={160}
                optional
                error={err.company}
              />
            </div>

            <Field
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              maxLength={200}
              error={err.email}
            />

            <Field
              name="objective"
              label={QUESTIONS.objective}
              rows={4}
              maxLength={4000}
              error={err.objective}
              defaultValue={carried ? assessmentSummary(carried) : undefined}
            />

            <Field
              name="existing"
              label={QUESTIONS.existing}
              rows={3}
              maxLength={4000}
              optional
              error={err.existing}
            />

            <Field
              name="deadline"
              label={QUESTIONS.deadline}
              maxLength={200}
              optional
              hint="A date, a quarter, or “not yet” is fine."
              error={err.deadline}
            />

            <Field
              name="success"
              label={QUESTIONS.success}
              rows={3}
              maxLength={4000}
              optional
              error={err.success}
            />

            <div aria-hidden className="honeypot">
              <label>
                <span>Website</span>
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="btn-row">
              <SubmitButton pending={pending} />
            </div>
            <p className="small form-note">
              We use the information you provide to respond to your enquiry. See our{' '}
              <Link className="link" href="/privacy">
                Privacy Notice
              </Link>{' '}
              for more information. Sending an enquiry does not create a partnership, an investment
              or a commitment by either side.
            </p>
          </>
        )}
      </form>
    </div>
  );
}
