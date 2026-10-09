'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRightIcon } from './Icons';
import { CONTACT } from '@/content/site';
import { openEnquiryMailto } from '@/lib/enquiry-mail';
import {
  AUDIENCE_LABEL,
  questionsFor,
  writeAssessment,
  type Audience,
  type PartnershipAssessment,
} from '@/lib/assessment';

const PATHWAYS: { id: Audience; title: string; body: string }[] = [
  {
    id: 'founder',
    title: 'Startup founder',
    body: 'Product feasibility, defining the MVP, engineering execution, commercial priorities and a possible Hybrid Sweat Equity arrangement.',
  },
  {
    id: 'incubator',
    title: 'Incubator',
    body: 'Technical support for portfolio companies, a view of promising ventures and access to delivery capability.',
  },
  {
    id: 'accelerator',
    title: 'Accelerator',
    body: 'Support for programme cohorts, product roadmaps, MVP execution and launch preparation.',
  },
];

const STEP_LABELS = [
  'Stage',
  'Main need',
  'Partnership structure',
  'Context',
] as const;

const RESULT_INTRO: Record<Audience, string> = {
  founder:
    'Based on what you shared, a useful next step is a founder partnership enquiry. Pixelette can review the details and consider whether a conversation would be appropriate.',
  incubator:
    'Based on what you shared, a useful next step is a programme partnership enquiry. Pixelette can review how support might fit selected companies or the wider programme.',
  accelerator:
    'Based on what you shared, a useful next step is a programme partnership enquiry. Pixelette can review how delivery support might fit a cohort or selected ventures.',
};

function Choice({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="choice-list" role="radiogroup" aria-labelledby={`${name}-legend`}>
      {options.map((option) => {
        const id = `${name}-${option}`;
        return (
          <label key={option} className="choice" htmlFor={id}>
            <input
              id={id}
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
}

export function StartupsPathways({
  audience,
  onSelect,
}: {
  audience: Audience | null;
  onSelect: (audience: Audience) => void;
}) {
  return (
    <div className="pathway-grid" id="pathways">
      {PATHWAYS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={audience === item.id ? 'pathway is-on' : 'pathway'}
          aria-pressed={audience === item.id}
          onClick={() => onSelect(item.id)}
        >
          <span className="h3">{item.title}</span>
          <span className="body">{item.body}</span>
        </button>
      ))}
    </div>
  );
}

export function PartnershipAssessment({ audience }: { audience: Audience | null }) {
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState('');
  const [need, setNeed] = useState('');
  const [structure, setStructure] = useState('');
  const [context, setContext] = useState('');
  const [done, setDone] = useState<PartnershipAssessment | null>(null);

  useEffect(() => {
    setStage('');
    setNeed('');
    setStructure('');
    setContext('');
    setDone(null);
    setStep(0);
  }, [audience]);

  if (!audience) {
    return (
      <div className="assess" id="partnership-assessment">
        <p className="body">
          Choose a pathway above to begin. Questions will match the audience you select.
        </p>
      </div>
    );
  }

  const q = questionsFor(audience);
  const total = STEP_LABELS.length;

  function canContinue() {
    if (step === 0) return stage !== '';
    if (step === 1) return need !== '';
    if (step === 2) return structure !== '';
    return context !== '';
  }

  function finish() {
    const result: PartnershipAssessment = { audience, stage, need, structure, context };
    writeAssessment(result);
    setDone(result);
  }

  function revise() {
    setDone(null);
    setStep(0);
  }

  function sendEnquiry(control: HTMLElement) {
    if (!done) return;
    const subject =
      done.audience === 'founder'
        ? 'Startup partnership enquiry'
        : done.audience === 'incubator'
          ? 'Incubator partnership enquiry'
          : 'Accelerator partnership enquiry';
    openEnquiryMailto(
      subject,
      [
        `Visitor type: ${AUDIENCE_LABEL[done.audience]}`,
        `Stage: ${done.stage}`,
        `Main need: ${done.need}`,
        `Partnership structure: ${done.structure}`,
        `Context: ${done.context}`,
        '',
        'Sending this email does not create a partnership, investment approval or an offer to enter into an HSE agreement.',
      ],
      control,
    );
  }

  if (done) {
    return (
      <div className="assess" id="partnership-assessment">
        <h3 className="h3">A possible next step</h3>
        <p className="body">{RESULT_INTRO[done.audience]}</p>
        <p className="body">
          You indicated stage &ldquo;{done.stage}&rdquo;, a main interest in{' '}
          {done.need.toLowerCase()}, and &ldquo;{done.structure}&rdquo; as the structure under
          consideration.
        </p>
        <p className="small">
          This guidance is preliminary only. It is not investment approval, confirmed eligibility or
          an offer to enter into an HSE agreement. Whether a partnership is a fit depends on further
          commercial, technical and legal review.
        </p>
        <div className="btn-row">
          <button
            type="button"
            className="btn"
            onClick={(event) => sendEnquiry(event.currentTarget)}
          >
            Send enquiry <ArrowUpRightIcon />
          </button>
          <button type="button" className="btn2" onClick={revise}>
            Revise answers
          </button>
        </div>
        <p className="small form-note">
          Send enquiry opens a message in your own email program, addressed to {CONTACT.email}.
          Pixelette receives it only if you send that message.
        </p>
      </div>
    );
  }

  return (
    <div className="assess" id="partnership-assessment">
      <p className="assess-progress" aria-live="polite">
        Question {step + 1} of {total}: {STEP_LABELS[step]}
      </p>
      <div className="assess-track" aria-hidden="true">
        <span className="assess-fill" style={{ width: `${((step + 1) / total) * 100}%` }} />
      </div>

      {step === 0 ? (
        <fieldset className="assess-step">
          <legend id="stage-legend" className="h3">What stage are you at?</legend>
          <Choice name="stage" options={q.stage} value={stage} onChange={setStage} />
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset className="assess-step">
          <legend id="need-legend" className="h3">What is the main need?</legend>
          <Choice name="need" options={q.need} value={need} onChange={setNeed} />
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className="assess-step">
          <legend id="structure-legend" className="h3">What kind of partnership are you considering?</legend>
          <Choice name="structure" options={q.structure} value={structure} onChange={setStructure} />
        </fieldset>
      ) : null}

      {step === 3 ? (
        <fieldset className="assess-step">
          <legend id="context-legend" className="h3">{q.contextLabel}</legend>
          <Choice name="context" options={q.context} value={context} onChange={setContext} />
        </fieldset>
      ) : null}

      <div className="btn-row">
        <button
          type="button"
          className="btn2"
          onClick={() => setStep((n) => Math.max(0, n - 1))}
          disabled={step === 0}
        >
          Back
        </button>
        {step < total - 1 ? (
          <button
            type="button"
            className="btn"
            onClick={() => setStep((n) => n + 1)}
            disabled={!canContinue()}
          >
            Continue
          </button>
        ) : (
          <button type="button" className="btn" onClick={finish} disabled={!canContinue()}>
            See the next step
          </button>
        )}
      </div>
    </div>
  );
}
