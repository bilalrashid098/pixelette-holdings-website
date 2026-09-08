/**
 * Palette comparison page — Pixelette Holdings conversion, Phase B.
 *
 * Renders the pattern guide's palette and the live Holdings palette side by
 * side, using the SAME component classes under two token sets, so what you are
 * looking at is the real thing rather than hand-written swatches. Every
 * token-against-ground pairing carries its measured contrast ratio and the
 * threshold that applies to it.
 *
 * Failures are badged by provenance. A failure inherited from the guide is
 * amber and is NOT ours to fix — it belongs to the shared layer and goes to the
 * guide's author. A failure we would introduce is red and must be resolved
 * before the palette is signed off.
 *
 * ---------------------------------------------------------------------------
 * D0 MODE (current, inverted 2 September 2026). Both sides are now extracted
 * from source: the guide side from the pattern guide's own stylesheet, the
 * Holdings side from the live :root block in src/app/globals.css.
 *
 * SIGNED_OFF below is the frozen record of the palette the user approved by
 * eye on 2 September 2026. It is not the source the page renders from — it is
 * the thing the live tokens are checked AGAINST. If they diverge this script
 * exits non-zero and names every token that moved.
 *
 * IF YOU ARE HERE BECAUSE THE GATE FAILED: do not delete the check, and do not
 * edit SIGNED_OFF to make it green. A token that moved on purpose is a NEW
 * DECISION, and it needs the user's sign-off by eye on this page before
 * SIGNED_OFF is updated to match. A token that moved by accident is the bug
 * this gate exists to catch.
 *
 * Before D0 this file held the Holdings palette in a PROPOSED constant because
 * it had not landed in globals.css yet. It has now landed, and rendering both
 * columns from the same source would have made the page silently stop
 * comparing anything.
 * ---------------------------------------------------------------------------
 *
 * Run: npm run compare:palette
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

// On Windows import.meta.url yields /D:/... so strip the leading slash.
const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const GUIDE = join(ROOT, 'vault', 'Pixelette_Web_Patterns.html');
const OUT = join(ROOT, '.palette', 'palette-compare.html');

/* ------------------------------------------------------------------ colour */

const srgb = (h) => [0, 2, 4].map((i) => parseInt(h.slice(1 + i, 3 + i), 16) / 255);
const lin = (v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
const lum = (hex) => {
  const [r, g, b] = srgb(hex).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

// Threshold by the KIND of thing being checked, per WCAG. "large" is >=24px,
// or >=18.66px bold. A 15px semibold button label is NOT large.
const THRESHOLD = { text: 4.5, large: 3, nontext: 3, decorative: 0 };

/* ------------------------------------------------- the guide, extracted */

// Frozen fallback, used only when the vault is absent (it is gitignored, so a
// fresh clone will not have it). When the guide IS present these are verified
// against it and any drift is reported rather than silently accepted.
const GUIDE_FROZEN = {
  brand: '#056F62',
  brandHover: '#045A4F',
  ink: '#0A0A0A',
  body: '#414D5C',
  muted: '#5D6B7D',
  src: '#62707F',
  page: '#FFFFFF',
  band: '#F4F7FA',
  line: '#E2E8EF',
  lineCard: '#DFE6EE',
  linePill: '#DDE4EC',
  lineStrong: '#C3D1DE',
};

function extractGuide() {
  if (!existsSync(GUIDE)) {
    return { tokens: GUIDE_FROZEN, source: 'frozen fallback (vault not present)', drift: [] };
  }
  const css = readFileSync(GUIDE, 'utf8');
  const grab = (re, fallback) => {
    const m = css.match(re);
    return m ? m[1].toUpperCase() : fallback;
  };
  const tokens = {
    brand: grab(/\.eyebrow\{[^}]*color:(#[0-9A-Fa-f]{6})/, GUIDE_FROZEN.brand),
    brandHover: grab(/a:hover\{color:(#[0-9A-Fa-f]{6})\}/, GUIDE_FROZEN.brandHover),
    ink: grab(/body\{[^}]*color:(#[0-9A-Fa-f]{6})/, GUIDE_FROZEN.ink),
    body: grab(/\.lead\{[^}]*color:(#[0-9A-Fa-f]{6})/, GUIDE_FROZEN.body),
    muted: grab(/\.small\{[^}]*color:(#[0-9A-Fa-f]{6})/, GUIDE_FROZEN.muted),
    src: grab(/\.src\{[^}]*color:(#[0-9A-Fa-f]{6})/, GUIDE_FROZEN.src),
    page: GUIDE_FROZEN.page,
    band: GUIDE_FROZEN.band,
    line: grab(/\.rule\{[^}]*background:(#[0-9A-Fa-f]{6})/, GUIDE_FROZEN.line),
    lineCard: grab(/\.card\{[^}]*border:1px solid (#[0-9A-Fa-f]{6})/, GUIDE_FROZEN.lineCard),
    linePill: grab(/\.pill\{[^}]*border:1px solid (#[0-9A-Fa-f]{6})/, GUIDE_FROZEN.linePill),
    lineStrong: grab(/\.btn2\{[^}]*border:1px solid (#[0-9A-Fa-f]{6})/, GUIDE_FROZEN.lineStrong),
  };
  const drift = Object.entries(tokens)
    .filter(([k, v]) => v.toUpperCase() !== GUIDE_FROZEN[k].toUpperCase())
    .map(([k, v]) => `${k}: extracted ${v}, frozen ${GUIDE_FROZEN[k]}`);
  return { tokens, source: 'extracted from vault/Pixelette_Web_Patterns.html', drift };
}

/* ------------------------------------------- the Holdings proposal, Phase B */

/**
 * Structure C, three roles, built from colour the company already owns.
 *
 * Standing instruction from the user (2 September 2026): keep the current brand
 * colours. So every value here except brandHover is lifted unchanged from
 * src/app/globals.css, and the dark family stays as it is rather than being
 * rotated toward the wordmark — the navy is treated as intent, not drift.
 *
 * The neutral ramp and hairlines are the GUIDE'S, verbatim. Rotating them
 * toward the brand was measured at 8 degrees in OKLCH and is invisible; the
 * wordmark slate 3D4B64 sits at L 0.411 / C 0.046 / H 262 against the guide's
 * body neutral at L 0.416 / C 0.030 / H 254. The slate therefore does not
 * become a token. Its job was to prove the guide's ramp is already right for
 * Holdings, and it has done that.
 */
const SIGNED_OFF = {
  // brand layer — existing repo values, roles renamed to match the job
  brand: '#1F68B0',        // was --cobalt-ink. Reads: eyebrows, links, icons, button fill
  brandHover: '#17548F',   // THE ONE NEW VALUE. See INTRODUCED_FIX below
  signal: '#2C7CD1',       // was --cobalt, and the wordmark's own blue. Marks, never text on light
  signalDark: '#5AA5F4',   // was --cobalt-bright. Speaks as text on dark grounds only
  wash: '#DCEDFF',         // was --ice
  tint: '#EFF7FF',         // was --ice-soft

  // text ramp and grounds — the guide's, verbatim
  ink: '#0A0A0A',
  body: '#414D5C',
  muted: '#5D6B7D',
  src: '#62707F',
  page: '#FFFFFF',
  band: '#F4F7FA',
  line: '#E2E8EF',
  lineCard: '#DFE6EE',
  linePill: '#DDE4EC',
  lineStrong: '#C3D1DE',

  // dark family — existing repo values, kept
  footer: '#06111F',       // was --navy-950
  panel: '#0A192B',        // was --navy-900
  panelFg: '#B8C8DB',
  panelAccent: '#8FC4FF',
};

/* ------------------------------------------- the live palette, extracted */

const GLOBALS = join(ROOT, 'src', 'app', 'globals.css');

// Token name in globals.css -> key in SIGNED_OFF. The brand layer plus the
// four hairlines, which is every value the comparison measures.
const TOKEN_MAP = {
  '--color-brand': 'brand',
  '--color-brand-hover': 'brandHover',
  '--color-brand-signal': 'signal',
  '--color-brand-signal-dark': 'signalDark',
  '--color-brand-wash': 'wash',
  '--color-brand-tint': 'tint',
  '--color-ink': 'ink',
  '--color-body': 'body',
  '--color-muted': 'muted',
  '--color-src': 'src',
  '--color-page': 'page',
  '--color-band': 'band',
  '--color-line': 'line',
  '--color-line-card': 'lineCard',
  '--color-line-pill': 'linePill',
  '--color-line-strong': 'lineStrong',
  '--color-footer': 'footer',
  '--color-panel': 'panel',
  '--color-panel-fg': 'panelFg',
  '--color-panel-accent': 'panelAccent',
};

/**
 * Read the live tokens out of globals.css.
 *
 * Deliberately dumb: one regex per token name, first match wins, no comment
 * parsing. The stylesheet's provenance notes therefore write values bare —
 * `was cobalt-ink`, no hash — precisely so this matcher cannot trip on the
 * documentation it sits beside.
 */
function extractLive() {
  if (!existsSync(GLOBALS)) {
    return { tokens: null, missing: ['src/app/globals.css does not exist'] };
  }
  const css = readFileSync(GLOBALS, 'utf8');
  const tokens = {};
  const missing = [];
  for (const [name, key] of Object.entries(TOKEN_MAP)) {
    const m = css.match(new RegExp(`${name}\\s*:\\s*(#[0-9A-Fa-f]{6})\\s*;`));
    if (m) tokens[key] = m[1].toUpperCase();
    else missing.push(name);
  }
  return { tokens, missing };
}

const live = extractLive();

// The Holdings column renders from the LIVE stylesheet, not from the frozen
// record. If globals.css cannot be read the page would otherwise silently
// render the frozen values and look fine, which is the failure this inversion
// exists to prevent — so that case is fatal.
if (!live.tokens || live.missing.length) {
  console.error('PALETTE GATE FAILED — could not read the live palette from src/app/globals.css.');
  (live.missing || []).forEach((m) => console.error(`  missing: ${m}`));
  console.error('');
  console.error('  The Holdings column of this page renders from the live stylesheet. Without it');
  console.error('  the page would compare the frozen constant against itself and report nothing.');
  process.exit(1);
}

const HOLDINGS = live.tokens;

const paletteDrift = Object.entries(SIGNED_OFF)
  .filter(([k, v]) => HOLDINGS[k] !== v.toUpperCase())
  .map(([k, v]) => `${k}: globals.css has ${HOLDINGS[k]}, signed off ${v.toUpperCase()}`);

if (paletteDrift.length) {
  console.error('PALETTE REGRESSION — the live tokens no longer match the signed-off palette.');
  paletteDrift.forEach((d) => console.error(`  ${d}`));
  console.error('');
  console.error('  The palette was signed off by the user by eye on 2 September 2026. Moving a');
  console.error('  token is a NEW DECISION, not a correction.');
  console.error('');
  console.error('  If the change was INTENTIONAL: it needs the user\'s sign-off by eye on this');
  console.error('  page first, and then SIGNED_OFF in this script must be updated to match.');
  console.error('  Updating one without the other is how the record and the site drift apart.');
  console.error('');
  console.error('  Do NOT "fix" this by deleting the check. The check is the point.');
  process.exit(1);
}

// The current site's primary button lightens on hover, from cobalt-ink to
// cobalt. White on cobalt measures 4.28:1 and the label is ~15px semibold,
// which is not large text. That is a live AA failure on the site today, and it
// is the reason brandHover exists as a new value rather than reusing --cobalt.
const INTRODUCED_FIX = {
  what: 'Primary button hover',
  before: { fg: '#FFFFFF', bg: '#2C7CD1', note: 'current site: hover LIGHTENS to --cobalt' },
  after: { fg: '#FFFFFF', bg: '#17548F', note: 'proposed: hover DARKENS' },
};

/* ------------------------------------------------------------------ checks */

const guide = extractGuide();
const G = guide.tokens;

// provenance: 'inherited' means the guide has the same fault and it is not ours
// to fix; 'holdings' means we own it.
const CHECKS = [
  // --- the guide, for reference and for provenance
  { col: 'guide', label: 'Brand on page', fg: G.brand, bg: G.page, kind: 'text', prov: 'inherited' },
  { col: 'guide', label: 'Brand on band', fg: G.brand, bg: G.band, kind: 'text', prov: 'inherited' },
  { col: 'guide', label: 'Button label on brand', fg: '#FFFFFF', bg: G.brand, kind: 'text', prov: 'inherited' },
  { col: 'guide', label: 'Body on page', fg: G.body, bg: G.page, kind: 'text', prov: 'inherited' },
  { col: 'guide', label: 'Muted on page', fg: G.muted, bg: G.page, kind: 'text', prov: 'inherited' },
  { col: 'guide', label: 'Source line on page', fg: G.src, bg: G.page, kind: 'text', prov: 'inherited' },
  { col: 'guide', label: 'btn2 border on page', fg: G.lineStrong, bg: G.page, kind: 'nontext', prov: 'inherited' },
  { col: 'guide', label: 'Card hairline on page', fg: G.lineCard, bg: G.page, kind: 'decorative', prov: 'inherited' },

  // --- Holdings
  { col: 'holdings', label: 'Brand on page', fg: HOLDINGS.brand, bg: HOLDINGS.page, kind: 'text', prov: 'holdings' },
  { col: 'holdings', label: 'Brand on band', fg: HOLDINGS.brand, bg: HOLDINGS.band, kind: 'text', prov: 'holdings' },
  { col: 'holdings', label: 'Brand on tint', fg: HOLDINGS.brand, bg: HOLDINGS.tint, kind: 'text', prov: 'holdings' },
  { col: 'holdings', label: 'Button label on brand', fg: '#FFFFFF', bg: HOLDINGS.brand, kind: 'text', prov: 'holdings' },
  { col: 'holdings', label: 'Button label on brand hover', fg: '#FFFFFF', bg: HOLDINGS.brandHover, kind: 'text', prov: 'holdings' },
  { col: 'holdings', label: 'Body on page', fg: HOLDINGS.body, bg: HOLDINGS.page, kind: 'text', prov: 'inherited' },
  { col: 'holdings', label: 'Muted on page', fg: HOLDINGS.muted, bg: HOLDINGS.page, kind: 'text', prov: 'inherited' },
  { col: 'holdings', label: 'Source line on page', fg: HOLDINGS.src, bg: HOLDINGS.page, kind: 'text', prov: 'inherited' },
  { col: 'holdings', label: 'Signal as a MARK on page', fg: HOLDINGS.signal, bg: HOLDINGS.page, kind: 'nontext', prov: 'holdings' },
  { col: 'holdings', label: 'Signal as TEXT on page', fg: HOLDINGS.signal, bg: HOLDINGS.page, kind: 'text', prov: 'holdings', expectFail: true },
  { col: 'holdings', label: 'Signal as TEXT on footer', fg: HOLDINGS.signal, bg: HOLDINGS.footer, kind: 'text', prov: 'holdings', expectFail: true },
  { col: 'holdings', label: 'Signal-dark as text on footer', fg: HOLDINGS.signalDark, bg: HOLDINGS.footer, kind: 'text', prov: 'holdings' },
  { col: 'holdings', label: 'Signal-dark as text on panel', fg: HOLDINGS.signalDark, bg: HOLDINGS.panel, kind: 'text', prov: 'holdings' },
  { col: 'holdings', label: 'Panel body text on panel', fg: HOLDINGS.panelFg, bg: HOLDINGS.panel, kind: 'text', prov: 'holdings' },
  { col: 'holdings', label: 'Panel accent on panel', fg: HOLDINGS.panelAccent, bg: HOLDINGS.panel, kind: 'text', prov: 'holdings' },
  { col: 'holdings', label: 'btn2 border on page', fg: HOLDINGS.lineStrong, bg: HOLDINGS.page, kind: 'nontext', prov: 'inherited' },
  { col: 'holdings', label: 'Card hairline on page', fg: HOLDINGS.lineCard, bg: HOLDINGS.page, kind: 'decorative', prov: 'holdings' },
];

const evaluate = (c) => {
  const r = ratio(c.fg, c.bg);
  const need = THRESHOLD[c.kind];
  return { ...c, r, need, pass: r >= need };
};
const results = CHECKS.map(evaluate);

// A check marked expectFail is a demonstration of a restriction, not a defect —
// it exists to show WHY the signal tone is barred from text. It must not be
// counted as a blocker.
const blockers = results.filter((c) => !c.pass && !c.expectFail && c.prov === 'holdings');
const inherited = results.filter((c) => !c.pass && !c.expectFail && c.prov === 'inherited');

/* ------------------------------------------------------------------ render */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const n2 = (x) => x.toFixed(2);

function badge(c) {
  if (c.expectFail) return '<span class="b b-demo">restricted by design</span>';
  if (c.pass) return '<span class="b b-ok">pass</span>';
  if (c.prov === 'inherited') return '<span class="b b-inh">inherited fault</span>';
  return '<span class="b b-bad">introduced</span>';
}

function checkRows(col) {
  return results
    .filter((c) => c.col === col)
    .map(
      (c) => `<tr>
        <td>${esc(c.label)}</td>
        <td class="sw"><i style="background:${c.fg}"></i><code>${c.fg}</code></td>
        <td class="sw"><i style="background:${c.bg}"></i><code>${c.bg}</code></td>
        <td class="num">${n2(c.r)}</td>
        <td class="num">${c.need || '—'}</td>
        <td>${badge(c)}</td>
      </tr>`,
    )
    .join('\n');
}

function tokenRows(tokens, roles) {
  return roles
    .map(
      ([key, role]) => `<tr>
        <td class="sw"><i style="background:${tokens[key]}"></i><code>${tokens[key]}</code></td>
        <td>${esc(role)}</td>
      </tr>`,
    )
    .join('\n');
}

/**
 * One column of specimens. The SAME component classes are used in both columns;
 * only the token values on the wrapper differ. That is the whole point — the
 * specimens are the real thing, judged under two palettes.
 */
function specimens(id, t, opts = {}) {
  const btnHover = opts.hover || t.brandHover;
  return `
<div class="col" id="${id}" style="
  --brand:${t.brand}; --brand-hover:${btnHover};
  --signal:${t.signal || t.brand}; --signal-dark:${t.signalDark || t.brand};
  --ink:${t.ink}; --body:${t.body}; --muted:${t.muted}; --src:${t.src};
  --page:${t.page}; --band:${t.band}; --tint:${t.tint || t.band};
  --line:${t.line}; --line-card:${t.lineCard}; --line-pill:${t.linePill}; --line-strong:${t.lineStrong};
  --panel:${t.panel || '#0A0A0A'}; --panel-fg:${t.panelFg || '#FFFFFF'}; --panel-accent:${t.panelAccent || t.brand};
">

  <p class="colname">${esc(opts.name)}</p>

  <!-- specimen board: every class that carries a brand or neutral token -->
  <div class="board">
    <p class="eyebrow">Institutional standing</p>
    <h2 class="h2">More than a venture builder, a policy-credentialed institution.</h2>
    <p class="lead">Pixelette gives you the build team, the launch, and the enterprise-readiness
    work for a clear fee plus a capped, earned share of the upside.</p>
    <p class="body">You approve every stage, you keep control, and you can buy us out at fair
    value. An <a class="link" href="#">inline link</a> sits inside running text at the reading
    tone, and a <span class="small">small note</span> sits below it.</p>
    <p class="src">Target timeframes, not guarantees.</p>

    <div class="rule"></div>

    <div class="btns">
      <span class="btn">Check if you qualify</span>
      <span class="btn hover">Check if you qualify &middot; hover</span>
      <span class="btn2">Compare what you keep</span>
    </div>

    <div class="pills">
      <span class="pill">ISO 9001</span>
      <span class="pill">ISO 27001</span>
      <span class="pill">Cyber Essentials Plus</span>
    </div>

    <div class="tiles">
      <div class="tile"><b>6&ndash;10 wks</b><span>MVP built</span></div>
      <div class="tile"><b>90 days</b><span>Initial traction</span></div>
      <div class="tile"><b>6&ndash;9 months</b><span>Target to investor-readiness</span></div>
    </div>

    <div class="cards">
      <div class="card">
        <p class="eyebrow">01 &middot; Build</p>
        <h3 class="h3">Pixelette Technologies Ltd</h3>
        <p class="body">Product, AI, blockchain, architecture, engineering, infrastructure,
        security and launch-ready technology.</p>
      </div>
      <div class="card-feature">
        <p class="eyebrow">Flagship</p>
        <h3 class="h3">2Connect</h3>
        <p class="body">Intent-led AI for better introductions.</p>
      </div>
    </div>

    <table class="tbl">
      <thead><tr><th>Stage</th><th>Gate</th></tr></thead>
      <tbody>
        <tr><td>01</td><td>Validation sprint</td></tr>
        <tr><td>02</td><td>Build approval</td></tr>
      </tbody>
    </table>
  </div>

  <!-- page-shaped composition, real copy, because tokens judged in isolation
       read differently from tokens judged in context -->
  <div class="compose">
    <div class="wash">
      <p class="eyebrow">Pixelette Holdings &middot; Venture building &amp; equity partnerships</p>
      <h1 class="h1p">Build and launch your company, without giving away equity for promises.</h1>
      <p class="lead">Pixelette Holdings is the group-level venture partner behind Pixelette
      Technologies, Pixelette Marketing and Pixelette Certified. We partner with selected founders
      to turn ambitious ideas into investable, launch-ready companies.</p>
      <div class="btns">
        <span class="btn">Check if you qualify</span>
        <span class="btn2">Compare what you keep</span>
      </div>
      <p class="src">Selective entry. Clear fees. Capped upside. You keep control.</p>
    </div>

    <div class="panel">
      <p class="eyebrow accent">One system &middot; five decision gates</p>
      <h2 class="h2 onpanel">Progress is earned at every stage.</h2>
      <p class="body onpanel">Equity is earned through execution, never taken up front.</p>
      <span class="mark"></span>
    </div>
  </div>
</div>`;
}

const page = `<title>Palette Comparison &middot; Pixelette Holdings</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400&family=Outfit:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
  :root{
    --wrap:1400px;
    --serif:"Newsreader",Georgia,serif;
    --sans:"Outfit",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
    --mono:"IBM Plex Mono",ui-monospace,Consolas,monospace;
    --doc-bg:#EEF1F4; --doc-fg:#1B2430; --doc-line:#D3DAE2; --doc-card:#FFFFFF;
    --ok:#1F6B4E; --inh:#8A5A00; --bad:#B42318; --demo:#4A5568;
    --ok-bg:#E8F4ED; --inh-bg:#FBF3E4; --bad-bg:#FBEEEC; --demo-bg:#E9EDF2;
  }
  @media (prefers-color-scheme: dark){
    :root:not([data-theme="light"]){
      --doc-bg:#0E141B; --doc-fg:#E7ECF2; --doc-line:#26313D; --doc-card:#141C25;
      --ok:#6BD3A4; --inh:#E3B457; --bad:#F08C82; --demo:#9AA8B8;
      --ok-bg:#12241C; --inh-bg:#251E10; --bad-bg:#2A1715; --demo-bg:#1B242E;
    }
  }
  :root[data-theme="dark"]{
    --doc-bg:#0E141B; --doc-fg:#E7ECF2; --doc-line:#26313D; --doc-card:#141C25;
    --ok:#6BD3A4; --inh:#E3B457; --bad:#F08C82; --demo:#9AA8B8;
    --ok-bg:#12241C; --inh-bg:#251E10; --bad-bg:#2A1715; --demo-bg:#1B242E;
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--doc-bg);color:var(--doc-fg);font-family:var(--sans);font-size:15px;line-height:1.6}
  .wrap{width:min(var(--wrap),100% - 40px);margin-inline:auto}
  header.top{padding:48px 0 28px;border-bottom:1px solid var(--doc-line)}
  .kicker{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--demo);margin:0 0 14px}
  h1.doc{font-family:var(--serif);font-weight:400;font-size:clamp(2rem,1.5rem + 2vw,3rem);line-height:1.08;margin:0 0 16px;color:var(--doc-fg)}
  .standfirst{max-width:74ch;margin:0 0 10px}
  .provenance{font-family:var(--mono);font-size:11.5px;color:var(--demo);margin-top:18px}
  section.doc{padding:40px 0 8px;border-bottom:1px solid var(--doc-line)}
  h2.doc{font-family:var(--serif);font-weight:400;font-size:1.7rem;margin:0 0 8px;color:var(--doc-fg)}
  p.doc{max-width:78ch;margin:0 0 14px}

  .b{display:inline-block;font-family:var(--mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;padding:3px 8px;border-radius:3px;white-space:nowrap}
  .b-ok{background:var(--ok-bg);color:var(--ok)}
  .b-inh{background:var(--inh-bg);color:var(--inh)}
  .b-bad{background:var(--bad-bg);color:var(--bad)}
  .b-demo{background:var(--demo-bg);color:var(--demo)}

  .verdict{border:1px solid var(--doc-line);border-left:3px solid var(--ok);background:var(--doc-card);border-radius:0 8px 8px 0;padding:18px 22px;margin:0 0 22px}
  .verdict.bad{border-left-color:var(--bad)}
  .verdict.warn{border-left-color:var(--inh)}
  .verdict h3{margin:0 0 8px;font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:500;color:var(--demo)}
  .verdict p{margin:0 0 8px;max-width:78ch}
  .verdict p:last-child{margin-bottom:0}

  .scroll{overflow-x:auto}
  table.data{border-collapse:collapse;width:100%;min-width:560px;margin-bottom:22px;background:var(--doc-card);border:1px solid var(--doc-line);border-radius:6px}
  table.data th{font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--demo);font-weight:500;text-align:left;padding:10px 12px;border-bottom:1px solid var(--doc-line)}
  table.data td{padding:9px 12px;border-bottom:1px solid var(--doc-line);font-size:13.5px;vertical-align:middle}
  table.data tr:last-child td{border-bottom:0}
  table.data td.num{font-family:var(--mono);font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap}
  table.data td.sw{white-space:nowrap}
  table.data td.sw i{display:inline-block;width:13px;height:13px;border-radius:2px;border:1px solid rgba(128,128,128,.4);vertical-align:-2px;margin-right:7px}
  table.data code{font-family:var(--mono);font-size:11.5px}

  .cols{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-bottom:8px}
  @media(max-width:1000px){.cols{grid-template-columns:1fr}}
  .colname{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--demo);margin:0 0 10px}

  /* ============ the specimens. One set of classes, two token sets. ========= */
  .col .board,.col .compose{background:var(--page);border:1px solid var(--doc-line);border-radius:8px;overflow:hidden}
  .col .board{padding:28px;margin-bottom:16px}
  .col .eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--brand);margin:0 0 14px}
  .col .eyebrow.accent{color:var(--panel-accent)}
  .col .h1p{font-family:var(--serif);font-weight:400;font-size:34px;line-height:1.07;letter-spacing:-.015em;color:var(--ink);margin:0 0 18px}
  .col .h2{font-family:var(--serif);font-weight:400;font-size:27px;line-height:1.14;letter-spacing:-.014em;color:var(--ink);margin:0 0 14px}
  .col .h2.onpanel,.col .h3.onpanel{color:#FFFFFF}
  .col .h3{font-family:var(--serif);font-weight:400;font-size:22px;line-height:1.26;color:var(--ink);margin:0 0 9px}
  .col .lead{font-size:18px;line-height:1.55;color:var(--body);margin:0 0 14px;max-width:62ch}
  .col .body{font-size:15px;line-height:1.65;color:var(--body);margin:0 0 12px;max-width:66ch}
  .col .body.onpanel{color:var(--panel-fg)}
  .col .small{font-size:13px;color:var(--muted)}
  .col .src{font-family:var(--mono);font-size:11.5px;color:var(--src);letter-spacing:.02em;margin:0}
  .col .link{color:var(--brand);text-decoration:underline;text-underline-offset:3px}
  .col .rule{height:1px;background:var(--line);margin:22px 0}

  .col .btns{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px}
  .col .btn{display:inline-flex;align-items:center;background:var(--brand);color:#FFFFFF;font-weight:600;font-size:15px;padding:14px 22px;border-radius:4px;min-height:52px}
  .col .btn.hover{background:var(--brand-hover)}
  .col .btn2{display:inline-flex;align-items:center;background:transparent;color:var(--ink);border:1px solid var(--line-strong);font-weight:500;font-size:15px;padding:14px 22px;border-radius:4px;min-height:52px}
  .col .pills{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
  .col .pill{display:inline-flex;align-items:center;font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--line-pill);border-radius:999px;padding:6px 12px;color:var(--muted)}

  .col .tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px}
  .col .tile{background:var(--page);border:1px solid var(--line-card);border-radius:4px;padding:18px 18px;box-shadow:0 1px 2px rgba(10,20,19,.04)}
  .col .tile b{display:block;font-family:var(--mono);font-size:22px;font-weight:500;color:var(--brand);letter-spacing:-.02em;line-height:1}
  .col .tile span{display:block;font-size:12.5px;color:var(--muted);margin-top:8px;line-height:1.4}

  .col .cards{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px}
  .col .card{background:var(--page);border:1px solid var(--line-card);border-radius:12px;padding:24px;box-shadow:0 1px 2px rgba(10,20,19,.04),0 10px 28px -16px rgba(10,20,19,.16)}
  .col .card-feature{background:var(--page);border:1px solid var(--line-strong);border-top:3px solid var(--brand);border-radius:12px;padding:24px;box-shadow:0 2px 4px rgba(10,20,19,.04),0 16px 40px -22px rgba(10,20,19,.22)}

  .col table.tbl{border-collapse:collapse;width:100%}
  .col table.tbl th{font-family:var(--mono);font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);font-weight:500;text-align:left;padding:10px 12px;border-bottom:1px solid var(--line-pill)}
  .col table.tbl td{padding:11px 12px;border-bottom:1px solid var(--line);font-size:14px;color:var(--body)}

  .col .wash{padding:40px 28px;background:radial-gradient(900px 420px at 14% -20%, var(--tint) 0%, var(--page) 60%)}
  .col .panel{padding:36px 28px;background:var(--panel);position:relative}
  .col .mark{position:absolute;left:0;top:0;width:26px;height:7px;background:
    linear-gradient(var(--signal) 0 0) 0 4px/6px 6px no-repeat,
    linear-gradient(var(--signal) 0 0) 10px 2px/6px 6px no-repeat,
    linear-gradient(var(--signal) 0 0) 20px 0/6px 6px no-repeat}

  footer.doc{padding:26px 0 60px;font-family:var(--mono);font-size:11.5px;color:var(--demo)}
</style>

<header class="top">
  <div class="wrap">
    <p class="kicker">Pixelette Holdings &middot; palette regression gate</p>
    <h1 class="doc">Palette comparison</h1>
    <p class="standfirst">The pattern guide's palette and the live Holdings palette, rendered
    through the same component classes so the specimens are the real thing. Every pairing carries
    its measured ratio and the threshold that applies to it.</p>
    <p class="standfirst">Sign this off by eye. The arithmetic below only vetoes &mdash; it does not
    choose.</p>
    <p class="provenance">guide side: ${esc(guide.source)}${guide.drift.length ? ' &middot; DRIFT: ' + esc(guide.drift.join('; ')) : ''}<br>
    holdings side: extracted from src/app/globals.css &middot; checked against the palette signed off
    2 September 2026 &middot; ${paletteDrift.length ? 'DRIFT: ' + esc(paletteDrift.join('; ')) : 'no drift'}</p>
  </div>
</header>

<div class="wrap">

<section class="doc">
  <h2 class="doc">Verdict</h2>
  ${
    blockers.length === 0
      ? `<div class="verdict"><h3>Nothing introduced fails</h3>
         <p>Every pairing Holdings owns clears its threshold. The palette is shippable on the
         arithmetic; whether it is <em>right</em> is the judgement this page exists for.</p></div>`
      : `<div class="verdict bad"><h3>${blockers.length} introduced failure(s) &mdash; not shippable</h3>
         <ul>${blockers.map((b) => `<li>${esc(b.label)} at ${n2(b.r)}, needs ${b.need}</li>`).join('')}</ul></div>`
  }
  <div class="verdict warn">
    <h3>${inherited.length} inherited fault(s) &mdash; report, do not fix</h3>
    <p>${inherited.map((c) => `${esc(c.label)} at <strong>${n2(c.r)}</strong> against a ${c.need} requirement`).join('; ') || 'None.'}</p>
    <p>These come from the pattern guide and are therefore identical across every group site.
    Fixing one here forks the group design system. They are badged amber rather than red so they
    stay visible without being misattributed, and they go to the guide's author as a shared-layer
    change.</p>
  </div>
  <div class="verdict">
    <h3>The one new value</h3>
    <p><strong>${esc(INTRODUCED_FIX.what)}.</strong> The current site lightens the primary button on
    hover, from <code>${INTRODUCED_FIX.before.bg}</code> to <code>#2C7CD1</code>. White on that
    measures <strong>${n2(ratio('#FFFFFF', '#2C7CD1'))}</strong> and the label is roughly 15px
    semibold, which is not large text &mdash; so the hover state fails AA on the live site today.</p>
    <p>Every other value in the proposal is lifted unchanged from <code>globals.css</code>, per the
    standing instruction to keep the current brand colours. <code>${INTRODUCED_FIX.after.bg}</code>
    is the single exception, and it exists because the arithmetic vetoes the alternative. It darkens
    on hover instead of lightening, reaching <strong>${n2(ratio('#FFFFFF', INTRODUCED_FIX.after.bg))}</strong>.</p>
  </div>
</section>

<section class="doc">
  <h2 class="doc">Tokens</h2>
  <div class="cols">
    <div>
      <p class="colname">Pattern guide &mdash; Pixelette Technologies</p>
      <div class="scroll"><table class="data">
        <thead><tr><th style="width:42%">Value</th><th>Role</th></tr></thead>
        <tbody>${tokenRows(G, [
          ['brand', 'Brand — every job. One-tone structure.'],
          ['ink', 'Headings'],
          ['body', 'Body and lead'],
          ['muted', 'Small text'],
          ['src', 'Source lines'],
          ['band', 'Alternating band'],
          ['line', 'Section rules'],
          ['lineCard', 'Card hairline'],
          ['linePill', 'Pill hairline'],
          ['lineStrong', 'btn2 border, feature card'],
        ])}</tbody>
      </table></div>
    </div>
    <div>
      <p class="colname">Live &mdash; Pixelette Holdings &middot; structure C</p>
      <div class="scroll"><table class="data">
        <thead><tr><th style="width:42%">Value</th><th>Role</th></tr></thead>
        <tbody>${tokenRows(HOLDINGS, [
          ['brand', 'Reading tone — eyebrows, links, icons, button fill. was --cobalt-ink'],
          ['brandHover', 'Interaction state. NEW — required by the arithmetic'],
          ['signal', 'Marking tone — solid non-text only on light. was --cobalt, and the wordmark blue'],
          ['signalDark', 'Speaks as text on dark grounds. was --cobalt-bright'],
          ['wash', 'Hero ground inner stop. was --ice'],
          ['tint', 'Panel and highlight fill. was --ice-soft'],
          ['ink', 'Headings — guide verbatim'],
          ['body', 'Body and lead — guide verbatim'],
          ['muted', 'Small text — guide verbatim'],
          ['src', 'Source lines — guide verbatim'],
          ['band', 'Alternating band — guide verbatim'],
          ['lineStrong', 'btn2 border — guide verbatim, and carries the inherited fault'],
          ['footer', 'Footer ground. KEPT as-is. was --navy-950'],
          ['panel', 'Dark panel. KEPT as-is. was --navy-900'],
          ['panelFg', 'Body text on dark'],
          ['panelAccent', 'Accent on dark'],
        ])}</tbody>
      </table></div>
    </div>
  </div>
</section>

<section class="doc">
  <h2 class="doc">The arithmetic</h2>
  <p class="doc">Threshold selected by kind: text 4.5, large text and non-text elements that carry
  meaning 3, decorative fills none. Rows marked <span class="b b-demo">restricted by design</span>
  are demonstrations of a rule, not defects &mdash; they show why the signal tone is barred from
  text.</p>
  <div class="cols">
    <div>
      <p class="colname">Pattern guide</p>
      <div class="scroll"><table class="data">
        <thead><tr><th>Pairing</th><th>Fore</th><th>Ground</th><th class="num">Ratio</th><th class="num">Need</th><th>Verdict</th></tr></thead>
        <tbody>${checkRows('guide')}</tbody>
      </table></div>
    </div>
    <div>
      <p class="colname">Proposed Holdings</p>
      <div class="scroll"><table class="data">
        <thead><tr><th>Pairing</th><th>Fore</th><th>Ground</th><th class="num">Ratio</th><th class="num">Need</th><th>Verdict</th></tr></thead>
        <tbody>${checkRows('holdings')}</tbody>
      </table></div>
    </div>
  </div>
</section>

<section class="doc">
  <h2 class="doc">Specimens</h2>
  <p class="doc">The same component classes under both token sets, then the same page-shaped
  composition in real Holdings copy &mdash; because tokens judged in isolation read differently from
  tokens judged in context.</p>
  <div class="cols">
    ${specimens('guide', { ...G, tint: '#EAF5F1', signal: G.brand, signalDark: '#6FE3CB', panel: '#06222B', panelFg: '#9DB2BC', panelAccent: '#6FE3CB' }, { name: 'Pattern guide — Technologies green' })}
    ${specimens("holdings", HOLDINGS, { name: 'Proposed — Holdings cobalt' })}
  </div>
</section>

</div>

<footer class="doc">
  <div class="wrap">
    Generated by scripts/build-palette-compare.mjs &middot; ${new Date().toISOString().slice(0, 10)}
    &middot; ${results.length} pairings measured &middot; ${blockers.length} introduced failure(s)
    &middot; ${inherited.length} inherited fault(s).
    Both columns are extracted from source. Do not replace either with a constant.
  </div>
</footer>`;

/* ------------------------------------------------------------------- write */

mkdirSync(dirname(OUT), { recursive: true });
// Standalone file, openable directly in a browser.
writeFileSync(OUT, `<!doctype html>\n<html lang="en-GB">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n${page}\n</html>\n`, 'utf8');
// Fragment, for publishing where the host supplies its own document skeleton.
writeFileSync(OUT.replace(/\.html$/, '.fragment.html'), page, 'utf8');

console.log(`Palette comparison written to ${OUT}`);
console.log(`  ${results.length} pairings measured`);
console.log(`  ${blockers.length} introduced failure(s)`);
console.log(`  ${inherited.length} inherited fault(s): ${inherited.map((c) => `${c.label} [${c.col}]`).join(', ') || 'none'}`);
if (guide.drift.length) console.log(`  GUIDE DRIFT: ${guide.drift.join('; ')}`);
if (blockers.length) process.exitCode = 1;
