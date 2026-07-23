---
id: project.graahak.assessment
type: assessment
title: Graahak showcase assessment
slug: graahak-assessment
status: draft
visibility: private
created: 2026-07-23
updated: 2026-07-23
author: person.owner
version: 0.1.0
relationships:
  related_projects:
    - project.graahak
---

# Graahak assessment

## Verdict

**Not ready to showcase as a finished project.**

It is an early **UI prototype** of a coupon-analysis product labeled TruthPrice inside a GitHub repo named graahak. The README is thin (one word). The analysis pipeline claimed in the UI is not in the repository. Treating this as evidence of production engineering, AI systems, or backend skill would be inaccurate.

## Strength (with evidence)

| Strength | Evidence |
|----------|----------|
| Coherent multi-step UX | `UploadPage` → `VerifyPage` → `ResultsPage` wired in `App.tsx` |
| Typed domain model | `CouponData`, `AnalysisResult` in `types.ts` |
| Verify UX includes confidence cue | Expiration field shows “Low Confidence” / confirm 2023 |
| Results layout thinks about trust | reasons, conditions, “couldn’t verify”, disclaimer |

These are **frontend / product-mock** strengths, not end-to-end system strengths.

## Weakness (with evidence)

| Weakness | Evidence |
|----------|----------|
| README empty of substance | Full text: `graahak` |
| No GitHub description / homepage / license | API metadata null |
| Unfinished | 2 commits, same day; no tests; no deploy config |
| Fake analysis | Hardcoded `analysisResult` in `App.tsx`; never derived from upload or form |
| Upload does not analyze | `handleAnalyze` only navigates if `selectedFile` is set |
| Image not shown after upload | Verify placeholder: “Original coupon image would be displayed here” |
| Unused dependency | `@supabase/supabase-js` in package.json; no src usage |
| Naming inconsistency | graahak / TruthPrice / vite-react-typescript-starter / “Page Navigation Build” |
| Marketing claims without implementation | “50+ competitors”, “AI will compare”, “Secure analysis…” |
| Bolt leftovers | `.bolt/`, bolt.new OG images |

## Is it useful for the website?

**As a featured case study: no.**

**As an honest “early prototype” note: maybe**, only if the page states:

1. This is a frontend mock of a coupon verdict flow.
2. No OCR/backend shipped in the public repo.
3. Data on screen is demo data.
4. Repo README was not written.

Without that framing, linking it from a portfolio would overclaim.

## What would make it showcase-worthy later

Minimum bar (observable in repo, not aspirational):

- Real README (problem, stack, how to run, limitations)
- Image → structured fields path that actually uses the file (even offline/heuristic)
- Analysis that changes when inputs change
- Either remove unused Supabase or implement storage/auth with it
- Align names (repo, package, UI, title)
- Live demo or recorded walkthrough
- Clear personal role and dates

## Website-ready project page outline

Use only if visibility is upgraded and framing stays honest.

### Title

Graahak; TruthPrice coupon UI prototype

### Intro paragraph

Graahak is a public React prototype for a coupon-screenshot flow. The interface is labeled TruthPrice. Users move through upload, verify-fields, and verdict screens. In the published repository, coupon fields and the USE recommendation are hardcoded demo data; there is no working extraction or market-comparison backend in the tree.

### Sections

1. **What exists in the repo**
   - Three-page client flow
   - TypeScript models for coupon + analysis result
   - Vite / React / Tailwind / lucide-react stack
2. **What the UI claims**
   - Instant validity / value analysis
   - Competitor price comparison (copy on Verify page)
3. **What the code actually does**
   - File select required to advance
   - Editable verify form
   - Static results object from `App.tsx`
4. **Limits**
   - README is one word
   - No deploy, tests, or OCR/API implementation
   - Unused Supabase dependency
5. **Stack**
   - React, TypeScript, Vite, Tailwind, lucide-react
6. **Repository**
   - Link: https://github.com/ayushrai-hub/graahak
   - Created: 2026-01-01

### Subsections (under “What the code actually does”)

- Upload: JPG/PNG picker; no byte parsing
- Verify: merchant, discount, min spend, expiration, category
- Results: hardcoded USE / $15 / 98%; copy writes `SAVE20`

### Blue-link references (related pages; create when entities exist)

- [React](/skills/react/); `skill.react`
- [TypeScript](/skills/typescript/); `skill.typescript`
- [Frontend](/skills/frontend/); `skill.frontend`
- [Projects index](/projects/); `knowledge/projects/index.md`
- [Assessment](/projects/graahak/assessment/); this file
- [GitHub: graahak](https://github.com/ayushrai-hub/graahak)

### Evidence-based talking points

- “Three-screen TruthPrice UI lives in `src/pages/*`.”
- “`AnalysisResult` is initialized once in `App.tsx` and never recomputed.”
- “README contains only the word graahak.”
- “Package name is still `vite-react-typescript-starter`; scaffold is Bolt `bolt-vite-react-ts`.”
- “`@supabase/supabase-js` is declared but not imported in `src/`.”
- “Public history is two commits on 2026-01-01.”

### Do not say on the website

- That it analyzes coupons with AI (no implementation)
- That it compares 50+ competitors (copy only)
- That Supabase is part of the running system
- That it is production-ready
