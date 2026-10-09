import type { Metadata } from 'next';
import Link from 'next/link';
import { InsightArticle } from '@/components/InsightArticle';

export const metadata: Metadata = {
  title: 'Founder control and equity dilution: what to consider before signing',
  description:
    'Economic ownership and decision-making rights are different. What to read in voting, reserved matters, vesting and exit clauses before signing a shareholder arrangement.',
  alternates: { canonical: '/insights/founder-control-and-equity-dilution' },
};

export default function ArticlePage() {
  return (
    <InsightArticle
      category="Equity and governance"
      title="Founder control and equity dilution: what to consider before signing"
      prepared="8 October 2026"
    >
      <p>
        This is commercial commentary, not legal advice. The only control a founder has is the
        control the documents give them. A website cannot add to that.
      </p>
      <p>
        Founders often talk about control as if it were the same thing as owning most of the shares.
        It is not. You can hold a majority of the economic rights and still be unable to hire, borrow,
        issue shares or sell the company without someone else&rsquo;s consent. You can also hold a
        minority of the economics and keep day-to-day management, if that is what the agreements say.
        Before signing, separate the two questions and answer each from the draft in front of you.
      </p>
      <h2>Economic ownership</h2>
      <p>
        Economic ownership is the right to share in value: dividends, sale proceeds, and what is left
        if the company is wound up. Dilution is what happens to that share when new shares are issued.
        A founder who owns 80 per cent today does not own 80 per cent of every future outcome unless
        the documents restrict further issues, or give them a right to participate. Ask what happens
        on the next financing, on an option pool, and on the shares that have not vested yet.
      </p>
      <p>
        A services-for-equity partner&rsquo;s percentage should be read the same way. The number is
        meaningless until you know whether it is of the company today, of a fully diluted company, or
        of a class with different rights. Pixelette does not publish a standard equity percentage for{' '}
        <Link href="/hse-model">Hybrid Sweat Equity</Link> for this reason.
      </p>
      <h2>Decision-making rights</h2>
      <p>
        Day-to-day management usually sits with the directors. Shareholders decide the matters reserved
        to them by the Companies Act 2006 and by the articles and any shareholders&rsquo; agreement.
        Section 284 sets a general rule that, on a poll, voting rights follow the shares unless the
        articles say otherwise. The articles, and a shareholders&rsquo; agreement, often do say
        otherwise. Reserved matters are a contractual list: the decisions that cannot be taken alone.
        Read that list as carefully as the cap table. A long list of reserved matters is a real limit
        on control, even when the founder is still the largest shareholder.
      </p>
      <h2>Vesting, leavers and exits</h2>
      <p>
        Vesting is a timetable, usually contractual, for earning shares or the right to keep them. It
        is not an automatic feature of English company law. If equity is said to be &ldquo;earned
        against delivery&rdquo;, the draft should say what delivery means, who accepts it, and what
        happens to the unearned portion if the relationship ends. Leaver provisions decide whether
        someone who stops work keeps, sells or forfeits shares. Those clauses vary widely. Do not
        assume a fair outcome is implied.
      </p>
      <p>
        Exit clauses cover drag, tag, and who can force or block a sale. They matter more on the day
        a buyer appears than they do in the first workshop. If you cannot explain them in plain
        language, you are not ready to sign them.
      </p>
      <h2>What to take into a negotiation</h2>
      <ul>
        <li>A one-page description of who decides the product, the hiring and the spend.</li>
        <li>The cash and equity mix you can actually live with, not the mix that sounds lightest.</li>
        <li>A milestone you could accept or reject without an argument about taste.</li>
        <li>A question list for counsel on vesting, leavers, reserved matters and future issues.</li>
      </ul>
      <p>
        Nothing here guarantees that a founder will retain control, or that dilution will stay inside
        a stated band. Those are outcomes of the signed documents and of later financings. The
        companion article on{' '}
        <Link href="/insights/services-for-equity-properly-structured">how partnerships can be structured</Link>{' '}
        covers the commercial side. Founders who want to discuss a specific venture can{' '}
        <Link href="/apply">explore a partnership</Link>.
      </p>
      <h2>References</h2>
      <ul>
        <li>
          <a href="https://www.legislation.gov.uk/ukpga/2006/46/section/284">Companies Act 2006, section 284, votes on a poll</a>
        </li>
        <li>
          <a href="https://www.legislation.gov.uk/ukpga/2006/46/part/3">Companies Act 2006, Part 3, a company&rsquo;s constitution</a>
        </li>
        <li>
          <a href="https://www.legislation.gov.uk/ukpga/2006/46/part/13">Companies Act 2006, Part 13, resolutions and meetings</a>
        </li>
      </ul>
    </InsightArticle>
  );
}
