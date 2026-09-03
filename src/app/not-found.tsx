import { Section, SectionHead, PageHero, Buttons, Btn, CardGrid, Card } from '@/components/ui';

/**
 * 404.
 *
 * Also the destination for the Starbreeder 410 in `_redirects`. A removed brand
 * is Gone, not Moved, sending it to a live portfolio page would misrepresent
 * a relationship that no longer exists.
 */
export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="That page is not here."
        lead="The link may be out of date, or the page may have been retired during the site rebuild. These are the routes people usually want."
      >
        <Buttons>
          <Btn href="/">Return home</Btn>
          <Btn href="/hse-model" variant="secondary">Explore the HSE model</Btn>
        </Buttons>
      </PageHero>

      <Section>
        <SectionHead eyebrow="Where to go instead" title="The main routes." />
        <CardGrid>
          <Card title="The HSE model">
            <p>How cash funded delivery and capped, milestone-earned equity fit together.</p>
            <p style={{ marginTop: 14 }}><Btn href="/hse-model">HSE model</Btn></p>
          </Card>
          <Card title="Portfolio">
            <p>Equity investments, HSE ventures, delivered work and capital relationships.</p>
            <p style={{ marginTop: 14 }}><Btn href="/portfolio">Portfolio</Btn></p>
          </Card>
          <Card title="Apply for HSE">
            <p>The short fit assessment. No pitch deck, no automatic acceptance.</p>
            <p style={{ marginTop: 14 }}><Btn href="/apply">Apply</Btn></p>
          </Card>
          <Card title="Contact">
            <p>Route a general enquiry to the right person.</p>
            <p style={{ marginTop: 14 }}><Btn href="/contact">Contact</Btn></p>
          </Card>
        </CardGrid>
      </Section>
    </>
  );
}
