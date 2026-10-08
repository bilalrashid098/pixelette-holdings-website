import type { Metadata } from 'next';
import Link from 'next/link';
import { InsightArticle } from '@/components/InsightArticle';

export const metadata: Metadata = {
  title: 'Services for equity: how startup partnerships can be structured',
  description:
    'How a services-for-equity partnership can combine cash and shares, and why ownership, milestones and governance have to be written down for that venture.',
  alternates: { canonical: '/insights/services-for-equity-properly-structured' },
};

export default function ArticlePage() {
  return (
    <InsightArticle
      category="Equity and governance"
      title="Services for equity: how startup partnerships can be structured"
      prepared="8 October 2026"
    >
      <p>
        This article is commercial commentary. It is not legal, tax or investment advice, and it does
        not describe a structure that is suitable for every startup.
      </p>
      <p>
        A services-for-equity arrangement is a way of paying for professional work with a mixture of
        cash and a right to shares. The commercial reason is straightforward. A young company may not
        be able to fund the whole fee in cash, and the firm doing the work may be willing to take part
        of its reward as ownership if it believes the venture can grow. That exchange only works when
        both sides can see what is being bought, what is being deferred, and what happens if the work
        stops.
      </p>
      <h2>Cash and equity are one agreement, not two moods</h2>
      <p>
        The cash portion pays for capacity that has a real cost: people, time and risk. The equity
        portion is not a discount sticker. It is consideration, and it has to be capable of being
        documented. Pixelette&rsquo;s public description of{' '}
        <Link href="/hse-model">Hybrid Sweat Equity</Link> is that professional services are
        contributed in exchange for a combination of cash fees and equity participation, with the
        allocation, milestones, founder rights and governance set out in the agreements. There is no
        standard percentage on this website, because a standard percentage would be false.
      </p>
      <p>
        A founder who wants less dilution pays more cash. A founder who wants to conserve cash may
        discuss a larger equity component. Whether that option is available depends on the venture,
        the scope and the risk. It is not a menu that every visitor can select.
      </p>
      <h2>Ownership is not the same thing as a headline percentage</h2>
      <p>
        A percentage only means something once you know the share class, the dilution that can still
        happen, and whether the shares are issued now or earned later. Economic ownership and the
        right to decide are different, which is the subject of the{' '}
        <Link href="/insights/founder-control-and-equity-dilution">article on founder control</Link>.
        Under the Companies Act 2006, a company&rsquo;s constitution and the agreements around it are
        what members and directors have to live with. A conversation that never reaches those
        documents has not agreed ownership.
      </p>
      <h2>Milestones and governance</h2>
      <p>
        If equity is linked to delivery, the milestone has to be describable by someone who was not in
        the room. &ldquo;When the product is ready&rdquo; is not a milestone. A build that can be
        demonstrated against a written acceptance note is closer. Governance should say who accepts
        the work, what information is shared, and which decisions need more than one party. Those
        clauses are how a partnership stays intelligible when the relationship is under pressure.
      </p>
      <p>
        Termination belongs in the same draft. What is paid, what is vested, and what intellectual
        property has transferred should not be left to goodwill. None of those outcomes is universal.
        They are negotiated.
      </p>
      <h2>What this is not</h2>
      <p>
        It is not a promise of customers, revenue or a later investment. It is not an invitation to
        the public to buy shares. Offering shares, or inducing someone to engage in investment
        activity, can be a financial promotion under section 21 of the Financial Services and Markets
        Act 2000, which is a reason to keep marketing language and the actual instrument apart. A
        page that explains a commercial model is not a term sheet.
      </p>
      <p>
        Founders who want to see whether a conversation is even relevant can start with the{' '}
        <Link href="/startups">startups page</Link> or read how{' '}
        <Link href="/portfolio">recorded venture relationships</Link> are classified. Classification
        is not a measure of success.
      </p>
      <h2>References</h2>
      <ul>
        <li>
          <a href="https://www.legislation.gov.uk/ukpga/2006/46/part/3">Companies Act 2006, Part 3, a company&rsquo;s constitution</a>
        </li>
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
