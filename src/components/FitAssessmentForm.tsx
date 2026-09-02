'use client';

import { useState } from 'react';
import { ArrowUpRightIcon } from './Icons';

/**
 * HSE Fit Assessment.
 *
 * DELIBERATELY INERT. The form renders and validates, but submission is
 * blocked in code and the submit control is disabled until the data controller,
 * lawful basis, retention period, CRM destination and triage owner are
 * approved. Collecting founder personal data with no approved controller would
 * be a UK GDPR defect, so the gate is enforced here rather than left to a
 * deployment step someone might skip.
 *
 * To go live: set FORM_APPROVED to true and wire `action` to the approved
 * endpoint. Nothing else in this component needs to change.
 */
const FORM_APPROVED = false;

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

function Select({ id, name, label, hint, options }: {
  id: string; name: string; label: string; hint?: string; options: string[];
}) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label} <span className="req">*</span>
      </label>
      {hint ? <span className="small hint">{hint}</span> : null}
      <select className="select" id={id} name={name} required defaultValue="">
        <option value="">Please select</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export function FitAssessmentForm() {
  const [blocked, setBlocked] = useState(false);

  return (
    <div className="form">
      <form
        id="fit-assessment"
        noValidate
        onSubmit={(e) => {
          if (!FORM_APPROVED) {
            e.preventDefault();
            setBlocked(true);
          }
        }}
      >
        <div className="field">
          <label className="label" htmlFor="f-name">Founder name <span className="req">*</span></label>
          <input className="input" id="f-name" name="name" type="text" autoComplete="name" required />
        </div>

        <div className="field">
          <label className="label" htmlFor="f-email">Work email <span className="req">*</span></label>
          <input className="input" id="f-email" name="email" type="email" autoComplete="email" required />
        </div>

        <div className="field">
          <label className="label" htmlFor="f-company">Company or venture <span className="req">*</span></label>
          <input className="input" id="f-company" name="company" type="text" autoComplete="organization" required />
        </div>

        <div className="field">
          <label className="label" htmlFor="f-website">Website</label>
          <span className="small hint">Leave blank if the venture is not yet online.</span>
          <input className="input" id="f-website" name="website" type="url" inputMode="url" />
        </div>

        <div className="field">
          <label className="label" htmlFor="f-market">Country or principal market <span className="req">*</span></label>
          <input className="input" id="f-market" name="market" type="text" required />
        </div>

        <Select id="f-sector" name="sector" label="Sector" options={SECTORS} />
        <Select id="f-stage" name="stage" label="Current stage" options={STAGES} />
        <Select
          id="f-capital"
          name="capital"
          label="Capital currently available for professional execution"
          hint="A qualification range, not a price. HSE requires a funded execution pathway."
          options={CAPITAL}
        />

        <div className="field">
          <label className="label" htmlFor="f-description">Venture description <span className="req">*</span></label>
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
            I understand that submitting this form does not mean Pixelette has accepted the venture,
            will invest cash, will raise funding or will provide investor introductions.{' '}
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

        <div className="btn-row">
          <button className="btn" type="submit" disabled={!FORM_APPROVED}>
            Submit my HSE Fit Assessment <ArrowUpRightIcon />
          </button>
        </div>

        <p className="small form-note">
          Submission does not create an engagement, meeting entitlement or offer.
        </p>

        {blocked ? (
          <p className="small form-note" role="status">
            This form is not yet accepting submissions.
          </p>
        ) : null}
      </form>

      <p className="small form-note" style={{ marginTop: 22 }}>
        This assessment is being finalised. In the meantime, email us at{' '}
        <a href="mailto:info@pixeletteholdings.com">info@pixeletteholdings.com</a> and we will pick up
        your enquiry.
      </p>
    </div>
  );
}
