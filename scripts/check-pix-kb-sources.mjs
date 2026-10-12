/**
 * Fails if archive/legacy material or unapproved routes reach the Holdings KB.
 * Holdings has no archive corpus today — the archive probe is skipped when
 * `src/content/archive` is absent, rather than failing vacuously.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const HERE = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const KB = path.join(ROOT, 'src', 'content', 'pix-kb.json');
const ARCHIVE = path.join(ROOT, 'src', 'content', 'archive');

const ALLOWED_ARCHIVE_PATHS = new Set(['/insights/archive']);
const FORBIDDEN_PREFIXES = ['/archive/', '/legacy/', '/old/', '/deprecated/', '/held/'];

const failures = [];

const kb = JSON.parse(fs.readFileSync(KB, 'utf8'));
const docs = kb.docs ?? [];
if (docs.length === 0) {
  failures.push('the knowledge base is empty, so this check would pass vacuously');
}

for (const d of docs) {
  const p = d.path ?? '';
  if (FORBIDDEN_PREFIXES.some(pre => p.startsWith(pre))) {
    failures.push(`forbidden route in the KB: ${p}`);
  }
  if (p.startsWith('/insights/archive/')) {
    failures.push(`an archive ARTICLE is in the KB: ${p}`);
  }
}

const kbText = docs.map(d => `${d.title ?? ''} ${d.text ?? ''}`).join('\n').toLowerCase();

let articles = [];
let sentencesChecked = 0;
if (fs.existsSync(ARCHIVE)) {
  articles = fs
    .readdirSync(ARCHIVE)
    .filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts');
  for (const file of articles) {
    const src = fs.readFileSync(path.join(ARCHIVE, file), 'utf8');
    const paras = [...src.matchAll(/\["p",\s*"((?:[^"\\]|\\.){80,})"\]/g)].map(m => m[1]);
    for (const para of paras.slice(0, 3)) {
      const probe = para
        .replace(/\\[nrt"']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .slice(0, 12)
        .join(' ')
        .toLowerCase();
      if (probe.split(' ').length < 10) continue;
      sentencesChecked += 1;
      if (kbText.includes(probe)) {
        failures.push(`archive prose is in the KB, from ${file}: "${probe.slice(0, 70)}…"`);
      }
    }
  }
}

/** Must stay in step with src/lib/pix/allowlist.ts */
const ALLOWED = [
  '/about',
  '/accessibility',
  '/apply',
  '/contact',
  '/cookies',
  '/disclaimer',
  '/hse-model',
  '/insights',
  '/portfolio',
  '/privacy',
  '/startups',
  '/terms',
];
const allowedSrc = fs.readFileSync(path.join(ROOT, 'src', 'lib', 'pix', 'allowlist.ts'), 'utf8');
for (const a of ALLOWED) {
  if (!allowedSrc.includes(`'${a}'`)) {
    failures.push(`this script allows ${a} but allowlist.ts does not; they have drifted`);
  }
}
for (const d of docs) {
  const p = d.path ?? '';
  const ok = p === '/' || ALLOWED.some(a => p === a || p.startsWith(`${a}/`));
  if (!ok) failures.push(`route not on the approved allowlist: ${p}`);
}

const archiveDocs = docs.filter(d => (d.path ?? '').includes('archive'));
for (const d of archiveDocs) {
  if (!ALLOWED_ARCHIVE_PATHS.has(d.path)) {
    failures.push(`unexpected archive-related doc: ${d.path}`);
  }
}

process.stdout.write(
  `pix-kb sources: ${docs.length} docs, ${articles.length} archive articles, ` +
    `${sentencesChecked} probe sentences\n`,
);

if (failures.length === 0) {
  process.stdout.write('pix-kb sources: no archive or legacy content in the grounding corpus\n');
  process.exit(0);
}

process.stdout.write(`\nPIX H SOURCE VIOLATIONS: ${failures.length}\n\n`);
for (const f of failures) process.stdout.write(`  ${f}\n`);
process.exit(1);
