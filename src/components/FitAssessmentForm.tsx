'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRightIcon } from './Icons';
import { CONTACT } from '@/content/site';
import { AUDIENCE_LABEL, readAssessment, type PartnershipAssessment } from '@/lib/assessment';
import { openEnquiryMailto } from '@/lib/enquiry-mail';
import { submitPartnershipEnquiry } from '@/app/contact/actions';

const SECTORS = [
  'Artificial intelligence',
  'HealthTech',
  'RegTech / compliance',
  'FinTech',
  'Blockchain / digital assets',
  'Enterprise SaaS',
  'Marketplace / platform',
  'Other',
];

const STAGES = [
  'Idea or research',
  'Validated problem',
  'Prototype',
  'MVP',
  'Live product without revenue',
  'Early revenue',
  'Scaling',
];

const CAPITAL = [
  'Under £10,000',
  '£10,000 to £25,000',
  '£25,001 to £50,000',
  '£50,001 to £100,000',
  '£100,001 to £250,000',
  'Over £250,000',
  'Not yet secured',
  'Prefer not to say at this stage',
];

const CONSTRAINTS = [
  'Product definition',
  'Technical architecture',
  'Product build',
  'Launch and customer acquisition',
  'Compliance or enterprise readiness',
  'Team or operator capacity',
  'Capital readiness',
  'Other',
];

function Select({ id, name, label, hint, options, defaultValue = '', required = true }: {
  id: string; name: string; label: string; hint?: string; options: string[]; defaultValue?: string; required?: boolean;
}) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label} {required ? <span className="req">*</span> : null}
      </label>
      {hint ? <span className="small hint">{hint}</span> : null}
      <select className="select" id={id} name={name} required={required} defaultValue={defaultValue}>
        <option value="">Please select</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

/**
 * Founder partnership enquiry on /apply.
 *
 * Email stays mailto (opens the visitor's mail program). Before that, answers
 * are stored in Supabase as a durable backup so the enquiry is not lost if the
 * email is never sent.
 */
export function FitAssessmentForm() {
  const [carried, setCarried] = useState<PartnershipAssessment | null>(null);
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    const data = readAssessment();
    if (data?.audience === 'founder') setCarried(data);
    setReady(true);
  }, []);

  if (!ready) return <div className="form" aria-busy="true" />;

  const stageDefault = carried && STAGES.includes(carried.stage) ? carried.stage : '';

  const send = async (form: HTMLFormElement, control: HTMLElement) => {
    if (inFlight.current) return;
    if (!form.reportValidity()) return;

    inFlight.current = true;
    setPending(true);
    setNote(null);

    const data = new FormData(form);
    if (carried) {
      data.set('assessmentNeed', carried.need);
      data.set('assessmentStructure', carried.structure);
      data.set('assessmentContext', carried.context);
    }

    let storeStatus: 'ok' | 'unconfigured' | 'failed' | 'error' | 'limited' = 'failed';
    try {
      const result = await submitPartnershipEnquiry(data);
      storeStatus = result.status;
      if (result.status === 'error' || result.status === 'limited') {
        setNote(result.message ?? 'Please check the form and try again.');
        inFlight.current = false;
        setPending(false);
        return;
      }
    } catch {
      storeStatus = 'failed';
    }

    const value = (key: string) => String(data.get(key) ?? '').trim();
    openEnquiryMailto(
      'Partnership enquiry',
      [
        `Name: ${value('name')}`,
        `Email: ${value('email')}`,
        `Company or venture: ${value('company')}`,
        `Website: ${value('website')}`,
        `Country or principal market: ${value('market')}`,
        `Sector: ${value('sector')}`,
        `Current stage: ${value('stage')}`,
        `Capital currently available: ${value('capital')}`,
        `Venture description: ${value('description')}`,
        `Biggest current constraint: ${value('constraint')}`,
        carried ? `Assessment visitor: ${AUDIENCE_LABEL[carried.audience]}` : '',
        carried ? `Assessment need: ${carried.need}` : '',
        carried ? `Assessment structure: ${carried.structure}` : '',
        carried ? `Assessment context: ${carried.context}` : '',
        `Marketing emails: ${data.get('marketing') ? 'yes' : 'no'}`,
        'Sending this email does not create a partnership or an investment commitment.',
      ],
      control,
    );

    if (storeStatus === 'ok') {
      setNote('A copy was saved. Please send the email that just opened so the team also receives it in the inbox.');
    } else if (storeStatus === 'unconfigured' || storeStatus === 'failed') {
      setNote(
        `We could not save a backup copy just now. Please send the email that opened — that is how this enquiry reaches ${CONTACT.email}.`,
      );
    }

    inFlight.current = false;
    setPending(false);
  };

  return (
    <div className="form">
      {carried ? (
        <div className="qualifier">
          <p>
            <strong>From your startup partnership assessment.</strong> Stage: {carried.stage}. Need:{' '}
            {carried.need}. Structure: {carried.structure}. Context: {carried.context}. You are marked
            as a {AUDIENCE_LABEL[carried.audience].toLowerCase()}. You can change the stage below. To
            change the earlier answers, return to the startups page.
          </p>
        </div>
      ) : null}
      <form id="fit-assessment" noValidate>
        <div className="field">
          <label className="label" htmlFor="f-name">
            Founder name <span className="req">*</span>
          </label>
          <input className="input" id="f-name" name="name" type="text" autoComplete="name" required />
        </div>

        <div className="field">
          <label className="label" htmlFor="f-email">
            Email <span className="req">*</span>
          </label>
          <input className="input" id="f-email" name="email" type="email" autoComplete="email" required />
        </div>

        <div className="field">
          <label className="label" htmlFor="f-company">
            Company or venture <span className="req">*</span>
          </label>
          <input
            className="input"
            id="f-company"
            name="company"
            type="text"
            autoComplete="organization"
            required
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="f-website">
            Website
          </label>
          <span className="small hint">Leave blank if the venture is not yet online.</span>
          <input className="input" id="f-website" name="website" type="url" inputMode="url" />
        </div>

        <div className="field">
          <label className="label" htmlFor="f-market">
            Country or principal market <span className="req">*</span>
          </label>
          <input className="input" id="f-market" name="market" type="text" required />
        </div>

        <Select id="f-sector" name="sector" label="Sector" options={SECTORS} />
        <Select id="f-stage" name="stage" label="Current stage" options={STAGES} defaultValue={stageDefault} />
        <Select
          id="f-capital"
          name="capital"
          label="Capital currently available for professional execution"
          hint="Optional context for the conversation. It is not a fee and it is not a requirement."
          options={CAPITAL}
          required={false}
        />

        <div className="field">
          <label className="label" htmlFor="f-description">
            Venture description <span className="req">*</span>
          </label>
          <span className="small hint">One or two sentences: the problem, who it serves and the outcome.</span>
          <textarea className="textarea" id="f-description" name="description" required />
        </div>

        <Select id="f-constraint" name="constraint" label="Biggest current constraint" options={CONSTRAINTS} />

        <div className="consent-row">
          <input id="c-privacy" name="privacy" type="checkbox" required />
          <label htmlFor="c-privacy">
            I have read the Privacy Notice and understand how the data controller named in it will use
            the information I provide to assess this enquiry and contact me about it.{' '}
            <span className="req">*</span>
          </label>
        </div>

        <div className="consent-row">
          <input id="c-commercial" name="commercial" type="checkbox" required />
          <label htmlFor="c-commercial">
            I understand that sending this enquiry does not create a partnership, and does not mean
            Pixelette will invest cash, raise funding or provide investor introductions.{' '}
            <span className="req">*</span>
          </label>
        </div>

        <div className="consent-row">
          <input id="c-marketing" name="marketing" type="checkbox" />
          <label htmlFor="c-marketing">
            I would like to receive occasional emails from Pixelette Holdings about venture-building
            insights and relevant services. I can unsubscribe at any time.
          </label>
        </div>

        {/* Honeypot: website is a real field on this form, so the trap uses fax. */}
        <div aria-hidden className="honeypot">
          <label>
            <span>Fax</span>
            <input autoComplete="off" name="fax" tabIndex={-1} type="text" />
          </label>
        </div>

        <div className="btn-row">
          <button
            className="btn"
            type="button"
            disabled={pending}
            onClick={(event) => {
              const form = event.currentTarget.form;
              if (!form) return;
              void send(form, event.currentTarget);
            }}
          >
            {pending ? 'Saving…' : 'Send enquiry'} <ArrowUpRightIcon />
          </button>
        </div>

        <p className="small form-note">
          Send enquiry saves a backup copy on our servers, then opens a message in your own email
          program addressed to {CONTACT.email}. Pixelette receives that message only if you send it.
          Sending it does not create a partnership, a meeting or an investment commitment.
        </p>

        {note ? (
          <p className="small form-note" role="status">
            {note}
          </p>
        ) : null}
      </form>

      <p className="small form-note" style={{ marginTop: 22 }}>
        If your email program does not open, write to{' '}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> with the same details.
      </p>
    </div>
  );
}
