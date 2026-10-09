'use client';

import { useId, useState } from 'react';
import { GATES } from '@/content/hse';

/**
 * Interactive delivery stages for /hse-model.
 * One stage open at a time; Validate open on first load.
 */
export function DeliveryStages() {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className="stage-cards" role="list">
      {GATES.map((stage, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${stage.n}`;
        const panelId = `${baseId}-panel-${stage.n}`;

        return (
          <article
            key={stage.n}
            className={`stage-card${isOpen ? ' is-open' : ''}`}
            role="listitem"
          >
            <h3 className="stage-card-heading">
              <button
                type="button"
                id={triggerId}
                className="stage-card-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span className="stage-card-num" aria-hidden="true">{stage.n}</span>
                <span className="stage-card-title">{stage.name}</span>
                <span className="stage-card-chevron" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              className="stage-card-panel"
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              inert={!isOpen ? true : undefined}
            >
              <div className="stage-card-panel-inner">
                <p className="body">{stage.body}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
