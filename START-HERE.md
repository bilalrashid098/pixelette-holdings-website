# START HERE — handover for a vault-rooted interactive session

Mr Rana has approved this work. Approve the permission prompts when they appear —
that is the whole reason this session exists.

## The task

This Next.js app has **never been compiled**. Get it running and report honestly.

```
cd "C:\Users\Rana\Brain\CTO Vault\05_Projects\Pixelette_Holdings_WordPress_Rebuild_001\NEXTJS"
npm install
npm run build
npm run dev
```

You will hit a permission prompt on `npm install` — it is in the `ask` list in
`C:\Users\Rana\.claude\settings.json`. Mr Rana approves it. **Do not edit that
settings file to avoid the prompt.** The prompt is the correct mechanism.

## What to expect

**TypeScript errors are likely.** 26 routes were written without a compiler ever
running. Fix them, but report every one in full — do not fix silently. If an error
reveals a content or claim problem rather than a syntax problem, stop and surface
it; several claims on this site are legally gated.

## Known issues, already diagnosed — do not re-investigate

- `ECONNRESET` on npm was caused by a **trojanized global npm `cli.js`** (NpmSteal),
  repaired 2026-08-07 09:18 and hash-verified clean. It was never a network fault.
  If ECONNRESET returns, re-check that file's size (authentic = 419 bytes) before
  blaming the network.
- `C:\Users\Rana\.npmrc` holds retry settings. Harmless, leave them.
- `run-dev.cmd` in this folder does install + dev in one step if preferred.

## Hard constraints — these are not optional

- **Do not deploy, publish, or push to GitHub without Mr Rana's explicit word.**
  If asked to push: its own **new PRIVATE** repo, never the CTO Vault remote
  (which is `RanaKhangit/R-Core`). Verify `isPrivate: true` before AND after.
- **Do not delete any visible HELD / gate block to make a page look finished.**
  Every one marks an unclosed legal, consent or evidence gate.
- **Forms must stay inert.** `FORM_APPROVED = false` in `FitAssessmentForm.tsx`
  and `approved = false` in `GatedForm.tsx` stay until the data controller,
  lawful basis, retention period and CRM destination are approved.
- **Do not enable the `/for-investors` redirect** — it is commented out in
  `next.config.mjs` and `public/_redirects` pending counsel on s.21 FSMA.
- **Do not publish a BIC shareholding percentage.** Standing founder directive.

## When it runs

Take a screenshot of the homepage and show Mr Rana. He has not seen this site.
Then report: routes that render, anything broken, and what remains gated.

Full detail: `README.md` in this folder.
