import type { Metadata } from 'next';
import Link from 'next/link';
import { InsightArticle } from '@/components/InsightArticle';

export const metadata: Metadata = {
  title: 'From MVP to investment readiness: building evidence that matters',
  description:
    'Why a working product, user evidence, commercial validation and investment preparation are different stages, and why none of them guarantees external investment.',
  alternates: { canonical: '/insights/from-mvp-to-investment-readiness' },
};

export default function ArticlePage() {
  return (
    <InsightArticle
      category="Building and scaling"
      title="From MVP to investment readiness: building evidence that matters"
      prepared="8 October 2026"
    >
      <p>
        A working product is not the same thing as a business someone else can understand, and neither
        of those is a promise that outside capital will arrive. This article separates the kinds of
        evidence founders mix together. It does not suggest that completing them will produce an
        investment.
      </p>
      <h2>A working product</h2>
      <p>
        A working product does the job it was scoped to do, for a user who is not the founder, without
        a developer in the room. That is a delivery fact. It can be demonstrated. It says nothing yet
        about whether the job is valuable, or whether the same user will come back. Treat the first
        release as proof of construction. Keep the claims about the market in a different document.
      </p>
      <p>
        The earlier article on{' '}
        <Link href="/insights/building-a-technology-startup">what to validate before development</Link>{' '}
        is about drawing that boundary before the build. After the build, the useful question is
        whether real users can complete the workflow you said mattered.
      </p>
      <h2>User evidence</h2>
      <p>
        User evidence is observed behaviour: someone outside the team used the product, where they
        stopped, and whether they returned. A list of email addresses collected at a conference is
        not user evidence. A pilot with a named organisation can be, if you can say what they did and
        what they refused to do. Write it down at the time. Memory is a poor data room.
      </p>
      <h2>Commercial validation</h2>
      <p>
        Commercial validation is evidence that the way you charge can survive contact with a buyer.
        A price on a slide is a hypothesis. An invoice, a paid pilot with a defined end, or a renewal
        is evidence, and even then it is evidence about that buyer, not about a market. Repeatable
        demand means you can explain why the next buyer, who has not met you, would have a similar
        reason to pay. If you cannot, you have a relationship, which may be valuable, and you should
        not describe it as a funnel.
      </p>
      <h2>Investment preparation</h2>
      <p>
        Investment preparation is the work of making the company legible: cap table, material
        contracts, intellectual property, a credible use of funds, and a story that matches the
        evidence rather than replacing it. It is administrative and narrative work. It does not create
        demand, and it does not create an investor. Talking about a future round on a public website
        can also stray into financial promotion. Section 21 of the Financial Services and Markets Act
        2000 restricts invitations and inducements to engage in investment activity. Describing how a
        company gets its house in order is not an offer of shares in that company, and this article
        is not one.
      </p>
      <p>
        Pixelette&rsquo;s <Link href="/hse-model">delivery stages</Link> run from Validate to Grow.
        They are a way to organise work. They are not a timetable, and reaching the later stages is
        not a statement that external capital will follow. The{' '}
        <Link href="/portfolio">portfolio</Link> classifies relationships. It does not rank them as
        successes.
      </p>
      <h2>A practical order</h2>
      <ul>
        <li>Show that the scoped product works for someone who is not you.</li>
        <li>Record what those users actually did.</li>
        <li>Find out whether a buyer will pay, and on what terms.</li>
        <li>Only then spend serious time on the materials a later investor would ask to read.</li>
      </ul>
      <p>
        Skipping ahead produces a polished description of a company that cannot yet show the
        underlying facts. That is a weaker position, not a faster one. Founders who want to discuss
        delivery can <Link href="/apply">apply to partner</Link>. An application is not an investment
        commitment in either direction.
      </p>
      <h2>References</h2>
      <ul>
        <li>
          <a href="https://www.legislation.gov.uk/ukpga/2000/8/section/21">Financial Services and Markets Act 2000, section 21</a>
        </li>
        <li>
          <a href="https://www.fca.org.uk/firms/financial-promotions-and-adverts">FCA, financial promotions and adverts</a>
        </li>
      </ul>
    </InsightArticle>
  );
}
