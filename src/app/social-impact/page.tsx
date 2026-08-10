import type { Metadata } from 'next';
import { Section, SectionHead, PageHero, CardGrid } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Social Impact | Technology applied where the need is real',
  description:
    'Pixelette applies AI, blockchain and skills programmes to real-world development, clean water in Pakistan, innovation and youth skills, mapped to the UN Sustainable Development Goals.',
  alternates: { canonical: '/social-impact' },
};

const PROGRAMMES = [
  {
    tag: 'Water & skills · Pakistan',
    tagClass: 'rel-project-in-development',
    title: 'Water scarcity and youth empowerment, Pakistan',
    body:
      "In collaboration with Aquaback Technologies and Pakistan's Ministry of Planning, Development & Special Initiatives, we launched a pilot water-purification project in drought-affected areas, providing clean water while addressing long-term sustainability. Alongside it, we deliver programmes training young people from those communities in AI and blockchain, equipping them with the skills to take part in the digital economy.",
  },
  {
    tag: 'Innovation · Cyprus',
    tagClass: 'rel-capital-relationship',
    title: 'Innovation and economic growth, Cyprus',
    body:
      'We are engaged with the Office of the President of Cyprus on innovation and sustainable development through strategic technology initiatives. As part of our commitment to inclusive growth, we are preparing to launch an academy giving young people access to in-demand skills in artificial intelligence, blockchain and cybersecurity.',
  },
  {
    tag: 'Skills development',
    tagClass: 'rel-direct-hse-venture',
    title: 'Skills and youth development',
    body:
      "Training pathways in artificial intelligence, blockchain and cybersecurity, delivered through the group's technology and assurance capabilities, so the next generation can build and work in emerging technology.",
  },
  {
    tag: 'UN Sustainable Development Goals',
    tagClass: 'rel-project-in-development',
    title: 'Aligned to the global goals',
    body:
      'Our programmes are mapped to the UN Sustainable Development Goals, principally clean water and sanitation, quality education, decent work and economic growth, and partnerships for the goals.',
  },
];

export default function SocialImpactPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Social Impact' },
        ]}
        eyebrow="Social impact"
        title="Technology applied where the need is real."
        lead="We use digital innovation as an instrument to advance several UN Sustainable Development Goals, from clean water and skills training to inclusive economic growth."
      />

      <Section>
        <SectionHead
          eyebrow="Programmes"
          title="Where the group is engaged."
          lead="Real-world programmes combining our technology, assurance and skills capabilities with partners who share the goal of inclusive, sustainable growth."
        />
        <CardGrid>
          {PROGRAMMES.map((p) => (
            <article key={p.title} className="p-card">
              <span className={`rel-label ${p.tagClass}`}>{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </CardGrid>
      </Section>
    </>
  );
}
