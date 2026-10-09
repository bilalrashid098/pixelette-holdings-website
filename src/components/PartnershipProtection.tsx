'use client';

import { useId, useState, type ComponentType } from 'react';
import {
  ArrowRightLeftIcon,
  ChartPieIcon,
  ClipboardListIcon,
  FileCheck2Icon,
  FlagIcon,
  ScaleIcon,
} from './Icons';

const TOPICS: {
  title: string;
  body: string;
  Icon: ComponentType<{ size?: number }>;
}[] = [
  {
    title: 'Delivery scope',
    body: 'Define what will be delivered, what is excluded and the responsibilities of each party.',
    Icon: ClipboardListIcon,
  },
  {
    title: 'Milestones',
    body: 'Agree how delivery milestones are measured, reviewed and accepted.',
    Icon: FlagIcon,
  },
  {
    title: 'Equity and ownership',
    body: 'Document the equity structure, ownership rights and relevant conditions.',
    Icon: ChartPieIcon,
  },
  {
    title: 'Governance',
    body: 'Agree decision-making responsibilities, voting rights and reserved matters.',
    Icon: ScaleIcon,
  },
  {
    title: 'Intellectual property',
    body: 'Establish ownership, licensing and transfer arrangements for the work produced.',
    Icon: FileCheck2Icon,
  },
  {
    title: 'Exit arrangements',
    body: 'Define how the partnership and associated rights are handled if circumstances change.',
    Icon: ArrowRightLeftIcon,
  },
];

/**
 * Interactive subject grid for /hse-model “Protecting the partnership”.
 * One topic selected at a time; first topic selected on load.
 */
export function PartnershipProtection() {
  const [selected, setSelected] = useState(0);
  const baseId = useId();
  const panelId = `${baseId}-detail`;
  const active = TOPICS[selected] ?? TOPICS[0]!;

  return (
    <div className="protect">
      <div className="protect-grid" role="list">
        {TOPICS.map((topic, index) => {
          const isSelected = selected === index;
          const triggerId = `${baseId}-trigger-${index}`;
          const { Icon } = topic;

          return (
            <div key={topic.title} className="protect-item" role="listitem">
              <button
                type="button"
                id={triggerId}
                className={`protect-card${isSelected ? ' is-selected' : ''}`}
                aria-pressed={isSelected}
                aria-controls={panelId}
                onClick={() => setSelected(index)}
              >
                <span className="protect-icon" aria-hidden="true">
                  <Icon size={24} />
                </span>
                <span className="protect-card-title">{topic.title}</span>
              </button>
            </div>
          );
        })}
      </div>

      <div
        id={panelId}
        className="protect-detail"
        role="region"
        aria-live="polite"
        aria-labelledby={`${baseId}-trigger-${selected}`}
      >
        <h3 className="h3">{active.title}</h3>
        <p className="body">{active.body}</p>
      </div>

      <p className="protect-note small">
        Specific rights and obligations are determined by the agreements entered into for each venture.
      </p>
    </div>
  );
}
