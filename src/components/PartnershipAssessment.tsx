'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AUDIENCE_LABEL,
  questionsFor,
  writeAssessment,
  type Audience,
  type PartnershipAssessment,
} from '@/lib/assessment';

const PATHWAY_CLASS = {
  idle: 'pathway',
  on: 'pathway is-on',
} as const;

const PATHWAYS: { id: Audience; title: string; body: string }[] = [
  {
    id: 'founder',
    title: 'Startup founders',
    body: 'Product feasibility, defining the MVP, engineering execution, commercial priorities and a possible Hybrid Sweat Equity arrangement.',
  },
  {
    id: 'incubator',
    title: 'Incubators',
    body: 'Technical support for portfolio companies, a view of promising ventures and access to delivery capability.',
  },
  {
    id: 'accelerator',
    title: 'Accelerators',
    body: 'Support for programme cohorts, product roadmaps, MVP execution and launch preparation.',
  },
];

const STEP_LABELS = [
  'Who is visiting',
  'Stage',
  'Main need',
  'Partnership structure',
  'Context',
] as const;

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
          className={audience === item.id ? PATHWAY_CLASS.on : PATHWAY_CLASS.idle}
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

export function PartnershipAssessment({
  audience,
  onAudience,
}: {
  audience: Audience | null;
  onAudience: (audience: Audience) => void;
}) {
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

  const current = audience ?? 'founder';
  const q = questionsFor(current);
  const total = STEP_LABELS.length;

  function clearLater(nextAudience: Audience) {
    if (nextAudience !== audience) {
      setStage('');
      setNeed('');
      setStructure('');
      setContext('');
      setDone(null);
    }
    onAudience(nextAudience);
  }

  function canContinue() {
    if (step === 0) return audience !== null;
    if (step === 1) return stage !== '';
    if (step === 2) return need !== '';
    if (step === 3) return structure !== '';
    return context !== '';
  }

  function finish() {
    if (!audience) return;
    const result: PartnershipAssessment = { audience, stage, need, structure, context };
    writeAssessment(result);
    setDone(result);
  }

  function revise() {
    setDone(null);
    setStep(0);
  }

  if (done) {
    const founder = done.audience === 'founder';
    const href = founder ? '/apply' : '/contact#incubators-and-accelerators';
    return (
      <div className="assess" id="partnership-assessment">
        <p className="eyebrow">Startup partnership assessment</p>
        <h3 className="h3">A possible next step</h3>
        <p className="body">
          You described yourself as {AUDIENCE_LABEL[done.audience].toLowerCase()}, at the stage
          &ldquo;{done.stage}&rdquo;, with a main interest in {done.need.toLowerCase()}. A useful next
          step is {founder ? 'a founder partnership enquiry' : 'a programme partnership enquiry'}, where you
          can add contact details if you want a conversation.
        </p>
        <p className="small">
          This preliminary assessment is for guidance only. Whether a partnership is a fit depends on further
          commercial, technical and legal review.
        </p>
        <div className="btn-row">
          <Link className="btn" href={href}>
            {founder ? 'Explore a partnership' : 'Programme partnership enquiry'}
          </Link>
          <button type="button" className="btn2" onClick={revise}>
            Revise answers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="assess" id="partnership-assessment">
      <p className="eyebrow">Startup partnership assessment</p>
      <p className="assess-progress" aria-live="polite">
        Question {step + 1} of {total}: {STEP_LABELS[step]}
      </p>
      <div className="assess-track" aria-hidden="true">
        <span className="assess-fill" style={{ width: `${((step + 1) / total) * 100}%` }} />
      </div>

      {step === 0 ? (
        <fieldset className="assess-step">
          <legend id="audience-legend" className="h3">Who is visiting?</legend>
          <Choice
            name="audience"
            options={PATHWAYS.map((item) => item.title)}
            value={audience ? PATHWAYS.find((item) => item.id === audience)?.title ?? '' : ''}
            onChange={(label) => {
              const match = PATHWAYS.find((item) => item.title === label);
              if (match) clearLater(match.id);
            }}
          />
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset className="assess-step">
          <legend id="stage-legend" className="h3">What stage are you at?</legend>
          <Choice name="stage" options={q.stage} value={stage} onChange={setStage} />
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className="assess-step">
          <legend id="need-legend" className="h3">What is the main need?</legend>
          <Choice name="need" options={q.need} value={need} onChange={setNeed} />
        </fieldset>
      ) : null}

      {step === 3 ? (
        <fieldset className="assess-step">
          <legend id="structure-legend" className="h3">What kind of partnership are you considering?</legend>
          <Choice name="structure" options={q.structure} value={structure} onChange={setStructure} />
        </fieldset>
      ) : null}

      {step === 4 ? (
        <fieldset className="assess-step">
          <legend id="context-legend" className="h3">{q.contextLabel}</legend>
          <Choice name="context" options={q.context} value={context} onChange={setContext} />
        </fieldset>
      ) : null}

      <div className="btn-row">
        <button type="button" className="btn2" onClick={() => setStep((n) => Math.max(0, n - 1))} disabled={step === 0}>
          Back
        </button>
        {step < total - 1 ? (
          <button type="button" className="btn" onClick={() => setStep((n) => n + 1)} disabled={!canContinue()}>
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
