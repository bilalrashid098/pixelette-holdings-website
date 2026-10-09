import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import { Section, SectionHead, PageHero, Buttons, Btn } from '@/components/ui';
import {
  CheckCircleIcon,
  HandSupportIcon,
  HeartHandIcon,
  SettingsIcon,
} from '@/components/Icons';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Pixelette Holdings brings together venture partnership capabilities and specialist businesses supporting technology development, market growth and organisational readiness.',
  alternates: { canonical: '/about' },
};

const GROUP_COMPANIES = [
  {
    name: 'Pixelette Holdings',
    role: 'Venture partnerships and group strategy',
    body:
      'Pixelette Holdings develops selected venture partnerships through its Hybrid Sweat Equity model, coordinating group strategy, commercial arrangements and governance.',
    mark: '/media/brand/pixelette-holdings.svg',
    href: null as string | null,
  },
  {
    name: 'Pixelette Technologies',
    role: 'Software engineering and emerging technologies',
    body:
      'Pixelette Technologies designs, builds and supports digital products, including custom software, SaaS platforms, AI automation, blockchain and ongoing engineering services.',
    mark: '/media/brand/pixelette-technologies.svg',
    href: 'https://pixelettetech.com/',
  },
  {
    name: 'Pixelette Marketing',
    role: 'Marketing and commercial growth',
    body:
      'Pixelette Marketing supports brand development, digital marketing, search visibility, content strategy and customer acquisition, helping organisations reach and engage their intended markets.',
    mark: '/media/brand/pixelette-marketing.svg',
    href: 'https://pixelettemarketing.com/',
  },
  {
    name: 'Pixelette Certified',
    role: 'Compliance and enterprise readiness',
    body:
      'Pixelette Certified supports organisations with compliance readiness, gap assessments, documentation and preparation for independent audits or certification.',
    mark: '/media/brand/pixelette-certified.svg',
    href: 'https://pixelettecertified.com/',
  },
] as const;

const PRINCIPLES: {
  title: string;
  body: string;
  Icon: ComponentType<{ size?: number }>;
}[] = [
  {
    title: 'Practical support',
    body: 'Hands-on expertise across engineering, commercial development and enterprise readiness.',
    Icon: HandSupportIcon,
  },
  {
    title: 'Aligned interests',
    body: 'Commercial arrangements designed to align contributions, responsibilities and longer-term interests.',
    Icon: CheckCircleIcon,
  },
  {
    title: 'Disciplined delivery',
    body: 'Clearly defined scope, agreed milestones and measurable delivery progress.',
    Icon: SettingsIcon,
  },
  {
    title: 'Real-world impact',
    body: 'Supporting ventures developing products and services with practical commercial applications.',
    Icon: HeartHandIcon,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        eyebrow="About"
        title="Who we are"
        lead="Pixelette Holdings brings together venture partnership capabilities and specialist businesses supporting technology development, market growth and organisational readiness. Through the Pixelette Group, we combine strategic coordination with practical delivery expertise to support selected technology ventures."
      />

      <Section surface="ice" id="the-group">
        <SectionHead
          eyebrow="The group"
          title="The Pixelette Group"
          lead="Four businesses with distinct responsibilities, working independently or together according to the needs of each venture or client."
        />
        <div className="about-group-grid">
          {GROUP_COMPANIES.map((company) => (
            <article key={company.name} className="card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="cap-mark about-group-mark" src={company.mark} alt="" />
              <h3 className="h3">{company.name}</h3>
              <p className="about-group-role">{company.role}</p>
              <p className="body">{company.body}</p>
              {company.href ? (
                <p>
                  <a
                    className="link"
                    href={company.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit {company.name}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      <Section id="how-we-work" tight>
        <SectionHead
          eyebrow="Coordination"
          title="How we work together"
          lead="Each business brings its own expertise to an engagement. Pixelette Holdings coordinates selected venture partnerships, with the relevant group businesses contributing services according to the agreed requirements."
        />
        <p className="body about-work-note">
          Selected venture partnerships are structured through{' '}
          <a className="link" href="/hse-model">Hybrid Sweat Equity</a>.
        </p>
      </Section>

      <Section id="quality" tight>
        <SectionHead
          eyebrow="Credentials"
          title="Quality and information security"
          lead="Pixelette Technologies holds ISO 9001 and ISO/IEC 27001 certifications for quality and information security management."
        />
        <ul className="cred-list about-cred-list">
          <li>
            <strong>ISO 9001</strong>
            <span>Quality management</span>
          </li>
          <li>
            <strong>ISO/IEC 27001</strong>
            <span>Information security management</span>
          </li>
        </ul>
      </Section>

      <Section surface="ice" id="our-approach">
        <div className="about-approach">
          <div className="about-approach-main">
            <p className="eyebrow">Our approach</p>
            <h2 className="h2">A long-term partner for ambitious ventures</h2>
            <p className="lead">
              We work with founders developing technology businesses with the potential to address
              meaningful problems and create lasting commercial value. Through our Hybrid Sweat
              Equity model and the capabilities of the Pixelette Group, we bring together practical
              expertise, agreed delivery responsibilities and a shared interest in the venture&rsquo;s
              progress.
            </p>
            <Buttons>
              <Btn href="/apply">Explore a partnership</Btn>
            </Buttons>
          </div>
          <ul className="about-principles">
            {PRINCIPLES.map(({ title, body, Icon }) => (
              <li key={title} className="about-principle">
                <span className="about-principle-icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <h3 className="about-principle-title">{title}</h3>
                <p className="body">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
