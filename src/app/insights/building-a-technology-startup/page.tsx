import type { Metadata } from 'next';
import Link from 'next/link';
import { InsightArticle } from '@/components/InsightArticle';

export const metadata: Metadata = {
  title: 'Building a technology startup: what founders should validate before development begins',
  description:
    'What a technology startup should test before engineering starts: the problem, the customer, the commercial assumption, MVP scope and the resources the work will actually take.',
  alternates: { canonical: '/insights/building-a-technology-startup' },
};

export default function ArticlePage() {
  return (
    <InsightArticle
      category="Venture formation"
      title="Building a technology startup: what founders should validate before development begins"
      prepared="8 October 2026"
    >
      <p>
        Most early technology ventures do not fail because the team cannot write software. They fail
        because the software is built against a problem that was never pinned down, for a customer who
        was never asked, at a scope that was never costed. Validation is the work of making those
        three things specific enough that a build can be accepted or refused.
      </p>
      <h2>Start with the problem, not the product</h2>
      <p>
        A problem worth building for is one a defined person already spends time or money trying to
        solve. &ldquo;The market is large&rdquo; is not that. Write the problem in one sentence that
        names the person, the situation and the cost of leaving it unsolved. If the sentence still
        works after you remove the technology, you have a problem. If it only works when the product
        is in the sentence, you have a feature looking for a reason.
      </p>
      <p>
        Talk to people who have the problem now, not to people who like the idea. Ten conversations
        that contradict each other are more useful than a survey that flatters the plan. The point is
        to find out what they do today, what they have already tried, and what would make them change.
      </p>
      <h2>Separate the commercial assumption from the demo</h2>
      <p>
        A prototype can prove that a workflow is possible. It cannot prove that anyone will pay, or
        that the same buyer will pay twice. Before development begins, write down the commercial
        assumption in words a sceptical operator would accept: who pays, for what outcome, on what
        cycle, and what has to be true for that payment to be rational.
      </p>
      <p>
        If the assumption depends on a later round of investment, say so. That is a financing plan,
        not evidence that the product has a customer. The two should not be blended in the same
        sentence.
      </p>
      <h2>Define the MVP as a boundary</h2>
      <p>
        A minimum viable product is a boundary, not a smaller version of the full catalogue. List
        what the first release will do, and write a second list of what it will not do. The second
        list is the one that protects the schedule and the budget. Scope that is &ldquo;the platform,
        but just the core&rdquo; is not a boundary. It is an invitation to build the platform.
      </p>
      <p>
        Feasibility belongs in the same conversation. Some products are expensive because of data,
        integrations, regulation or operational load, not because of the screens. A founder who has
        not asked what is hard will approve a scope that cannot be delivered on the resources they
        have.
      </p>
      <h2>Resource planning is part of validation</h2>
      <p>
        Engineering time is one cost. Decisions, access to users, content, third-party services and
        the founder&rsquo;s own hours are others. A plan that assumes instant answers from the founder
        will stall, and the stall will be described later as a delivery problem. Agree, before anyone
        starts, who can accept a milestone and how quickly that person can be reached.
      </p>
      <p>
        This is also the moment to decide whether the work is a cash engagement, a{' '}
        <Link href="/insights/services-for-equity-properly-structured">services-for-equity partnership</Link>,
        or something that should not start yet. Those are commercial choices. They are not a substitute
        for a validated problem. Hybrid Sweat Equity, as{' '}
        <Link href="/hse-model">Pixelette describes it</Link>, still depends on an agreed scope.
      </p>
      <h2>Common early mistakes</h2>
      <ul>
        <li>Building to a pitch deck instead of to a customer workflow.</li>
        <li>Treating a letter of intent as evidence of repeatable demand.</li>
        <li>Adding compliance, marketplace and mobile scope to a first release that has no users.</li>
        <li>Hiring a team before the founder can explain what &ldquo;done&rdquo; means.</li>
        <li>Using a funding story to avoid a pricing conversation.</li>
      </ul>
      <p>
        None of this guarantees a successful company. It reduces the chance of paying for a product
        that answers a question nobody is asking. Founders who want a structured view of fit can use
        the <Link href="/startups#partnership-assessment">startup partnership assessment</Link> and
        then <Link href="/apply">explore a partnership</Link>. That enquiry is a conversation, not a
        commitment.
      </p>
    </InsightArticle>
  );
}
