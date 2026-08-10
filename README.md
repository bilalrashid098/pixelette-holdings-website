# Pixelette Holdings — Next.js build

The approved Pixelette Holdings site, rebuilt on Next.js 15 (App Router, TypeScript, static export).

This is the same content, design system and evidence discipline as the approved prototype and the
WordPress block theme in `../THEME/`. The three are alternative delivery routes for one approved
design, not three different websites.

---

## Why Next.js here

Pixelette Technologies already runs on Next.js, so this build shares the team's existing stack,
tooling and deployment habits. Three things it does better than the WordPress route:

| | Next.js build | WordPress route |
|---|---|---|
| Fonts | `next/font/google` fetches at **build** time and self-hosts. No third-party font request at runtime, so nothing to disclose in the cookie policy. | Fonts must be manually downloaded and enqueued, or they leak a request to a third-party CDN. |
| Classification | `relationship` is a required field on a non-optional union type. **A venture without a classification does not compile.** | Enforced by a `transition_post_status` guard that an admin can be talked past. |
| Claim consistency | Counts, labels and taxonomy all derive from one typed data layer. | Editors can retype a number in a block and it drifts. |

The trade-off is real and should be stated: content changes need a developer and a deploy. There is
no editor UI. If Mr Rana wants to change a venture description without a build, the WordPress route
in `../THEME/` is the one that does that.

---

## Structure

```
src/
  app/                      26 routes + not-found, robots.ts, sitemap.ts
  components/
    SiteHeader.tsx          client — mobile menu, Escape close, scroll lock
    SiteFooter.tsx          carries the s.21 FSMA notice on every page
    ScrollEffects.tsx       client — header condense + reveal-on-scroll
    ui.tsx                  Section, PageHero, Btn, EvidenceGate, VentureCard…
    FitAssessmentForm.tsx   client — INERT, see "Gates" below
    GatedForm.tsx           client — INERT, shared by contact and partner forms
  content/
    site.ts                 corporate identity, nav, noindex routes, disclaimer
    hse.ts                  economics, ceilings, five gates, charter, held terms
    ventures.ts             the portfolio, classification-enforced
public/
  _headers                  CSP + noindex + cache rules (Netlify / Cloudflare)
  _redirects                legacy 301s, the Starbreeder 410, fallback
```

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`output: 'export'` writes a plain static site to `out/`. Host it anywhere; no Node runtime is needed.

> **Compiled and build-verified 2026-08-07.** `npm install` ran through the sanctioned
> `safe_exec.py` env-scrubbed wrapper (305 packages). `tsc --noEmit` passed with zero errors.
> `npm run build` completed after one mechanical fix — `sitemap.ts` and `robots.ts` each needed
> `export const dynamic = 'force-static'` under `output: 'export'` — and generated all 31 static
> pages to `out/`. All 26 content routes verified 200 on the dev server; `/for-investors` 404s
> (redirect gate intact); forms render inert; the footer notice and every HELD block render.
> Earlier static verification (route graph, import resolution, 128 internal links, claim
> consistency, gate integrity, noindex parity) had passed with zero failures.

---

## Gates — do not remove these to make the site look finished

Every one of these is deliberate. Each is enforced in code, not left to a checklist.

| Gate | Where | Closes when |
|---|---|---|
| **Forms accept no submissions** | `FORM_APPROVED = false` in `FitAssessmentForm.tsx`; `approved = false` default in `GatedForm.tsx` | Data controller, lawful basis, retention period, CRM destination and triage owner are approved |
| **s.21 FSMA disclaimer** | `SiteFooter` on every page, plus in-page on `/partners/capital` and `/disclaimer` | Counsel approves the wording |
| **`/for-investors` does not redirect** | Commented out in `next.config.mjs` and `public/_redirects` | Counsel clears the s.21 position on the destination |
| **Capital routes are noindex** | Page metadata + `NOINDEX_ROUTES` + `_headers` | Counsel decision; this is containment, not SEO |
| **Investor classification wording absent** | `/partners/capital/qualification` | Counsel supplies the statutory wording |
| **No venture count published** | `publishableCount()` returns `null` while any HSE venture is undescribed | Every venture has an approved description and evidence |
| **Held venture descriptions** | `ventures.ts` — no `oneLine`, a `gateNote` instead | Approved copy plus evidence per venture |
| **Cyprus engagement undescribed** | `/social-impact` | Documented evidence and written authorisation |
| **BIC percentage wording** | `ventures.ts` gate note | Share instrument reconciled, investee entity confirmed, counsel approves |
| **Continuation equity not operable** | `CONTINUATION_EQUITY_HELD` in `hse.ts` | Rate, period, vesting basis and legal treatment defined |
| **No response-time promise** | `/apply`, `/apply/thank-you`, `/contact` | An operational service level is approved and staffed |
| **Leadership section held** | `/about` | Written consent per individual and confirmed titles |
| **No analytics or tag manager** | Nowhere in the build | The PECR consent mechanism ships with it |

Naming discipline lives in `content/site.ts`: `isRegisteredCompany` controls whether a company number
renders. Pixelette Marketing and Pixelette Certified must never carry "Ltd" or an active-company
claim until Companies House confirms otherwise.

---

## Before publication

1. `npm install && npm run build` in an interactive session — the compile this build has not had.
2. Counsel approval of the disclaimer, terms, privacy notice and investor-classification wording.
3. The data-controller decision, which unblocks every form at once.
4. Lighthouse and an axe pass against the built output; the WCAG 2.2 AA audit named in
   `/accessibility`.
5. Confirm hosting reads `public/_headers` and `public/_redirects` — on Vercel these become
   `vercel.json` instead, and the 410 must survive that translation.
6. Founder authorisation. Nothing here has been deployed, and the live site is untouched.
