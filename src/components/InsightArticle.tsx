import type { ReactNode } from 'react';
import { Section, PageHero, Buttons, Btn } from '@/components/ui';

export function InsightArticle({
  category,
  title,
  prepared,
  children,
}: {
  category: string;
  title: string;
  prepared: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Insights', href: '/insights' },
          { label: title },
        ]}
        eyebrow={category}
        title={title}
      >
        <p className="small">Prepared {prepared}. Not attributed to a named author.</p>
      </PageHero>
      <Section>
        <div className="measure prose">
          {children}
          <h2>Continue</h2>
          <p>If the questions in this article match a venture you are building, the next step is a conversation, not a commitment.</p>
        </div>
        <Buttons>
          <Btn href="/apply">Apply to partner</Btn>
          <Btn href="/hse-model" variant="secondary">Hybrid Sweat Equity</Btn>
        </Buttons>
      </Section>
    </>
  );
}
