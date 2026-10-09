'use client';

import { useState } from 'react';
import { Section, SectionHead } from '@/components/ui';
import { PartnershipAssessment, StartupsPathways } from '@/components/PartnershipAssessment';
import type { Audience } from '@/lib/assessment';

const SECTION_LEAD: Record<Audience, string> = {
  founder:
    'A short set of questions about stage, needs and partnership structure. About one to two minutes. Contact details are not asked before the result.',
  incubator:
    'A short set of questions about your programme, where support would help and how you would like to begin. About one to two minutes. Contact details are not asked before the result.',
  accelerator:
    'A short set of questions about your cohort, delivery needs and how you would like to begin. About one to two minutes. Contact details are not asked before the result.',
};

const DYNAMIC_TITLE: Record<Audience, string> = {
  founder: 'Explore a startup partnership',
  incubator: 'Explore an incubator partnership',
  accelerator: 'Explore an accelerator partnership',
};

function scrollToQuestionnaire() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('partnership-assessment')?.scrollIntoView({
    behavior: reduce ? 'auto' : 'smooth',
    block: 'start',
  });
}

export function StartupsBody() {
  const [audience, setAudience] = useState<Audience | null>(null);

  function selectPathway(next: Audience) {
    setAudience(next);
    requestAnimationFrame(() => scrollToQuestionnaire());
  }

  return (
    <>
      <Section>
        <SectionHead
          eyebrow="Pathways"
          title="Choose your pathway"
          lead="Select the description that fits. The questions below use that choice, and you can change it."
        />
        <StartupsPathways audience={audience} onSelect={selectPathway} />
      </Section>

      <Section surface="ice">
        <SectionHead
          eyebrow="Partnership"
          title="Explore a partnership"
          lead={
            audience
              ? SECTION_LEAD[audience]
              : 'Select a pathway above to see questions for your audience. About one to two minutes. Contact details are not asked before the result.'
          }
        />
        {audience ? (
          <h3 className="h3 startups-q-heading">{DYNAMIC_TITLE[audience]}</h3>
        ) : null}
        <PartnershipAssessment audience={audience} />
      </Section>

      <Section surface="deep" id="what-happens-next">
        <SectionHead
          eyebrow="Next"
          title="What happens next"
          lead="Pixelette will review the enquiry and consider whether a discussion about a potential partnership would be appropriate."
        />
        <p className="body measure">
          Where relevant, specialists across the group may be involved — product and engineering,
          go-to-market, enterprise readiness and venture governance — according to what the venture
          needs. A reply does not create a partnership or a commercial commitment.
        </p>
      </Section>
    </>
  );
}
