/**
 * Token gate — Pixelette Holdings conversion.
 *
 * The playbook's fourth gate, adapted for a repo that has no utility CSS
 * framework. Run: npm run gate:tokens
 *
 * ---------------------------------------------------------------------------
 * WHY THIS IS NOT THE PLAYBOOK'S GATE VERBATIM
 *
 * The playbook's first matcher hunts retired Tailwind utilities. There are none
 * in this repo and none are being added, so that regex would be dead code — and
 * dead code in a gate is worse than no gate, because it looks like coverage.
 *
 * The equivalent silent failure in a hand-written-CSS repo is a class name left
 * on a className after its rule has been deleted from the stylesheet. Identical
 * symptom: renders unstyled, no build error, no warning, survives review. With
 * the whole design system rewritten under 26 routes of markup, that is the
 * single most likely way something breaks quietly here.
 * ---------------------------------------------------------------------------
 *
 * Four checks:
 *
 *   1  CLASS EXISTENCE   every class on a className in src/ has a rule in
 *                        globals.css. (The playbook's ADAPT 1, rewritten.)
 *   2  HEX CONTAINMENT   no raw hex anywhere in src/ except globals.css, which
 *                        is the single exemption. There are no email templates
 *                        and no constants file, so there is nothing else to
 *                        exempt. (ADAPT 3.)
 *   3  RETIRED PALETTE   no value from the pre-conversion stylesheet that the
 *                        signed-off palette did not keep may appear in src/ or
 *                        in the built CSS. (ADAPT 2.)
 *   4  BUILT CSS         the new tokens actually reach the built stylesheet
 *                        chunk, found by searching the build output rather than
 *                        by assuming its path.
 *
 * Checks 3 and 4 need build output. If there is none they SKIP LOUDLY and the
 * gate says so in its summary — a skipped check must never read as a pass.
 *
 * KEEP THE MATCHER DUMB. No comment parsing. globals.css writes its provenance
 * notes bare — `was cobalt-ink`, no hash — precisely so this gate cannot trip
 * on the documentation it is reading.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

// On Windows import.meta.url yields /D:/... so strip the leading slash.
const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SRC = join(ROOT, 'src');
const GLOBALS = join(SRC, 'app', 'globals.css');

/**
 * The pre-conversion palette: the 37 distinct values that were in
 * src/app/globals.css at commit d75cf72, across 63 occurrences.
 *
 * Frozen here rather than read from git so the gate works in a shallow clone.
 * Values that the signed-off palette KEPT are filtered out below by reading the
 * live stylesheet, so this list does not have to be maintained by hand when a
 * token is deliberately retained.
 */
const PRE_CONVERSION = [
  '#000', '#06111f', '#0a192b', '#0a1b31', '#0c2541', '#10243b', '#10456f',
  '#14512e', '#17212d', '#1c7a4a', '#1f68b0', '#2b3543', '#2c7cd1', '#362a6b',
  '#5aa5f4', '#5f6b7a', '#6b4a10', '#8a6d2f', '#8fc4ff', '#9a3232', '#a7efcc',
  '#b8c8db', '#c9d5e3', '#d8ecff', '#dce6f2', '#dcedff', '#dff3e6', '#e6e9ee',
  '#e7c98f', '#ece7ff', '#eff7ff', '#f0d3a0', '#f7f5ef', '#fff', '#fff1d6',
  '#fff8ec', '#ffffff',
];

/* ------------------------------------------------------------------ walk */

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const hits = [];
const fail = (kind, detail) => hits.push({ kind, detail });

if (!existsSync(GLOBALS)) {
  console.error('TOKEN GATE FAILED — src/app/globals.css does not exist.');
  process.exit(1);
}

const css = readFileSync(GLOBALS, 'utf8');
const srcFiles = walk(SRC);
const tsxFiles = srcFiles.filter((f) => ['.tsx', '.ts'].includes(extname(f)));

/* ------------------------------------------------- 1 · class existence */

// Every class selector the stylesheet defines. Deliberately crude: it also
// picks up class names inside comments, which errs toward permissive. A gate
// that cries wolf gets deleted; this one only fires on a real orphan.
const defined = new Set([...css.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1]));

let classesChecked = 0;

for (const file of tsxFiles) {
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  const source = readFileSync(file, 'utf8');

  const check = (raw) => {
    // Drop ${...} interpolations wholesale. A class assembled by interpolation
    // cannot be checked statically, so the conversion builds them from lookup
    // maps that return whole literal strings instead — see Section in ui.tsx.
    const literal = raw.replace(/\$\{[^}]*\}/g, ' ');
    for (const cls of literal.split(/\s+/).filter(Boolean)) {
      classesChecked += 1;
      if (!defined.has(cls)) fail('class not in stylesheet', `${rel}: ${cls}`);
    }
  };

  for (const m of source.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\}|\{'([^']*)'\})/g)) {
    check(m[1] ?? m[2] ?? m[3] ?? '');
  }

  // `className={SOMETHING[key]}` is invisible to the matcher above, and that
  // blind spot is exactly where a dead class would hide. The convention is
  // that any const whose name ends in _CLASS holds whole class strings, and
  // every string literal inside it is checked. Keep the convention or lose
  // the coverage.
  for (const m of source.matchAll(/const\s+\w*_CLASS(?:ES)?\b[^=]*=\s*\{([\s\S]*?)\n\}/g)) {
    // Values only. Keys are quoted too in a Record<...> map, and a key is not
    // a class name — matching on the colon is what separates them.
    for (const lit of (m[1] ?? '').matchAll(/:\s*(?:'([^']*)'|"([^"]*)")/g)) {
      const value = lit[1] ?? lit[2] ?? '';
      if (value) check(value);
    }
  }
}

/* ------------------------------------------------- 2 · hex containment */

for (const file of srcFiles) {
  if (file === GLOBALS) continue;
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  const found = readFileSync(file, 'utf8').match(/#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b/g);
  if (found) fail('raw hex outside globals.css', `${rel}: ${[...new Set(found)].join(', ')}`);
}

/* ------------------------------------------------- 3 · retired palette */

const liveHexes = new Set(
  (css.match(/#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b/g) ?? []).map((h) => h.toLowerCase()),
);
const retired = PRE_CONVERSION.filter((h) => !liveHexes.has(h));

// #fff and #ffffff are the same colour written two ways; do not report one as
// retired while the other is live.
const norm = (h) => (h.length === 4 ? `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}` : h);
const liveNorm = new Set([...liveHexes].map(norm));
const trulyRetired = retired.filter((h) => !liveNorm.has(norm(h)));

for (const file of srcFiles) {
  if (file === GLOBALS) continue;
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  const text = readFileSync(file, 'utf8').toLowerCase();
  for (const h of trulyRetired) {
    if (new RegExp(`${h}\\b`).test(text)) fail('retired palette value in src/', `${rel}: ${h}`);
  }
}

/* -------------------------------------------- 4 · the built CSS chunk */

// Find the built stylesheet rather than assuming its path — the filename is
// content-hashed and moves on every meaningful change.
function findBuiltCss() {
  for (const dir of [join(ROOT, '.next', 'static', 'css'), join(ROOT, 'out', '_next', 'static', 'css')]) {
    if (!existsSync(dir)) continue;
    const files = readdirSync(dir).filter((f) => f.endsWith('.css'));
    if (files.length) return files.map((f) => join(dir, f));
  }
  return null;
}

const built = findBuiltCss();
const skipped = [];

if (!built) {
  skipped.push('retired palette in built CSS', 'new tokens present in built CSS');
} else {
  const builtCss = built.map((f) => readFileSync(f, 'utf8')).join('\n').toLowerCase();
  const where = built.map((f) => relative(ROOT, f).replace(/\\/g, '/')).join(', ');

  for (const h of trulyRetired) {
    if (new RegExp(`${h}\\b`).test(builtCss)) fail('retired palette value in built CSS', `${where}: ${h}`);
  }

  // The new tokens must actually reach the browser. If the build served a
  // stale chunk this is what catches it.
  const MUST_APPEAR = [
    '--color-brand', '--color-brand-signal', '--color-brand-wash',
    '--color-panel', '--color-footer', '--container-wrap', '--fs-h1p', '--header-h',
  ];
  for (const token of MUST_APPEAR) {
    if (!builtCss.includes(token)) fail('new token missing from built CSS', `${where}: ${token}`);
  }
}

/* ---------------------------------------------------------------- report */

const byKind = hits.reduce((acc, h) => {
  (acc[h.kind] ??= []).push(h.detail);
  return acc;
}, {});

console.log('Token gate');
console.log(`  ${tsxFiles.length} source files, ${classesChecked} class usages checked against ${defined.size} defined selectors`);
console.log(`  ${trulyRetired.length} of ${PRE_CONVERSION.length} pre-conversion values are retired; the rest were kept by the signed-off palette`);
console.log(built ? `  built CSS: ${built.length} chunk(s) found and checked` : '  built CSS: NOT FOUND');

for (const name of skipped) {
  console.log(`  SKIPPED (no build output): ${name} — run npm run build first. A skipped check is not a pass.`);
}

if (!hits.length) {
  console.log(skipped.length ? '\nPASS, with skipped checks noted above.' : '\nPASS.');
  process.exit(0);
}

console.error('\nTOKEN GATE FAILED');
for (const [kind, details] of Object.entries(byKind)) {
  console.error(`\n  ${kind} (${details.length}):`);
  for (const d of [...new Set(details)]) console.error(`    ${d}`);
}
console.error('\n  A class with no rule renders unstyled with a clean build and no warning.');
console.error('  That is the failure this gate exists to catch. Fix the markup or the stylesheet;');
console.error('  do not relax the matcher.');
process.exit(1);
