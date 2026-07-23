---
id: project.graahak
type: project
title: Graahak (TruthPrice UI)
slug: graahak
aliases:
  - TruthPrice
  - graahak
  - vite-react-typescript-starter
keywords:
  - coupon
  - screenshot upload
  - React
  - Vite
  - TypeScript
  - Tailwind
  - Bolt
  - frontend prototype
tags:
  - frontend
  - prototype
  - unfinished
  - consumer
description: Public GitHub repo with a React/Vite frontend prototype for uploading a coupon screenshot, verifying extracted fields, and showing a USE/SKIP verdict. Product UI label is TruthPrice. No working analysis backend in the repository.
summary: >
  Three-screen client-side flow (Upload → Verify → Results) with hardcoded coupon and
  analysis data. README is one word. package.json still uses the starter name.
  @supabase/supabase-js is listed but unused in source. Repo created via Bolt template.
status: draft
visibility: unlisted
priority: 25
search_weight: 0.3
created: 2026-07-23
updated: 2026-07-23
last_reviewed: 2026-07-23
author: person.owner
version: 0.1.0
seo:
  title: Graahak / TruthPrice; coupon analysis UI prototype
  description: Early React UI for coupon screenshot upload and verdict display. Unfinished; no live analysis pipeline in repo.
  canonical_path: /projects/graahak/
  noindex: true
timeline:
  start: 2026-01-01
  end: 2026-01-01
role: Sole author (only committer in public history)
repository: https://github.com/ayushrai-hub/graahak
live_demo: null
homepage: null
license: null
showcase_recommendation: do-not-feature-as-finished-product
relationships:
  related_projects: []
  related_skills:
    - skill.react
    - skill.typescript
    - skill.frontend
    - skill.tailwind-css
  related_articles: []
  related_books: []
  related_people:
    - person.owner
  related_companies: []
  related_technologies:
    - technology.react
    - technology.typescript
    - technology.vite
    - technology.tailwindcss
    - technology.supabase-js
    - technology.lucide-react
  related_events: []
evidence:
  - kind: link
    value: https://github.com/ayushrai-hub/graahak
    source: GitHub repository
    date: 2026-07-23
  - kind: artifact
    value: knowledge/projects/graahak/README-extract.md
    source: inspected README + source
    date: 2026-07-23
  - kind: artifact
    value: knowledge/projects/reports/graahak-assessment.md
    source: assessment
    date: 2026-07-23
provenance:
  source: github-repo-inspection
  source_file: https://github.com/ayushrai-hub/graahak
  imported_at: 2026-07-23
extensions:
  product_name_in_ui: TruthPrice
  package_name: vite-react-typescript-starter
  bolt_template: bolt-vite-react-ts
  github_description: null
  stars: 0
  forks: 0
  default_branch: main
  commits_inspected: 2
---

# Graahak

## Summary

Public repository [`ayushrai-hub/graahak`](https://github.com/ayushrai-hub/graahak). GitHub has no description. README content is exactly `graahak`.

The running UI brands the product as **TruthPrice** (`src/components/Header.tsx`). The npm package name remains `vite-react-typescript-starter`. The HTML document title is `Page Navigation Build`. Open Graph / Twitter image meta tags point at `bolt.new` defaults.

Observed behavior in code: a three-step **frontend prototype** for coupon screenshot upload, manual verification of fields, and display of a USE/SKIP-style recommendation. Analysis values are hardcoded in `src/App.tsx`. Selected image files are not parsed. There is no OCR, no API client, and no Supabase usage in source despite the dependency.

## Problem

**Stated in UI copy only** (not in README):

- Upload page: “Analyze validity and real value instantly.”
- Verify page: compare the deal “against 50+ competitors to find the true market price.”
- Results page: recommend USE vs SKIP with savings and confidence.

**Implemented in code:** navigation and forms around those claims. The competitive comparison and image extraction are not implemented.

## Target user / audience

Not documented in README or GitHub description.

Inferred only from UI copy: shoppers deciding whether a coupon is worth using. This inference is **not** owner-confirmed and must not be treated as a stated product requirement.

## Why I built it

Not documented in the repository. Commit messages are only `Start repository` and `Updated index.html`. Do not invent motivation.

## Role and contribution

- Owner: `ayushrai-hub` (Ayush Rai in commit metadata).
- Public history: **2 commits**, both on `2026-01-01` (~3 minutes apart).
- No other contributors in the inspected commit list.
- Role for knowledge purposes: sole author of the published tree.

## Tech stack

From `package.json` and config files:

| Layer | Evidence |
|-------|----------|
| React 18.3.1 | dependency |
| TypeScript 5.5.3 | dependency + `tsconfig*.json` |
| Vite 5.4.2 | dependency + `vite.config.ts` |
| Tailwind CSS 3.4.1 | dependency + `tailwind.config.js` + `src/index.css` |
| lucide-react | icons in pages/header |
| ESLint 9 | `eslint.config.js` |
| PostCSS / Autoprefixer | config present |
| `@supabase/supabase-js` ^2.57.4 | dependency only; **no imports under `src/`** |

Scaffolding: `.bolt/config.json` → `"template": "bolt-vite-react-ts"`. `index.html` uses Bolt OG image URLs.

## Architecture

Client-only SPA:

```
index.html
  → src/main.tsx
    → src/App.tsx  (page state + hardcoded CouponData / AnalysisResult)
         ├─ pages/UploadPage.tsx
         ├─ pages/VerifyPage.tsx
         └─ pages/ResultsPage.tsx
              └─ components/Header.tsx
```

- Routing: local React state (`Page = 'upload' | 'verify' | 'results'`), not React Router.
- Data: `useState` defaults in `App.tsx`; verify form can edit `couponData`; `analysisResult` is never recomputed from form or file.
- Types: `src/types.ts` (`CouponData`, `AnalysisResult`, `Page`).
- No backend folder, no `supabase/` client module, no serverless functions, no deployment config (`vercel.json` / Netlify / etc. absent from tree).

## Key features (as implemented)

1. **Upload screen**; drag/drop or file picker for JPG/PNG; enables “Analyze Coupon” when a file is selected; does not read file bytes.
2. **Verify screen**; editable merchant, location, discount, type, min spend, expiration, category; placeholder text where original image would appear; static “Low Confidence” UI on expiration.
3. **Results screen**; shows hardcoded `USE`, `$15.00`, `98%` confidence, reason list; copy button writes fixed string `SAVE20`; thumbs feedback is local state only; disclaimer names TruthPrice.

## Evidence from README and code

| Claim area | Evidence |
|------------|----------|
| README documents the project | **No**; file is 8 bytes: `graahak` |
| Working OCR / extraction | **No**; verify fields prefilled in `App.tsx`; upload ignores file content |
| AI / competitor comparison | **UI copy only**; VerifyPage sidebar text; no comparison code |
| Backend / Supabase | **Dependency unused** |
| Production deploy | **None** in repo; `homepage` null |
| Tests | **None** in tree |
| Screenshots / docs | **None** |

## Constraints / tradeoffs

- Prototype UX over working pipeline.
- Hardcoded demo data instead of end-to-end analysis.
- Naming split: repo `graahak`, UI `TruthPrice`, package `vite-react-typescript-starter`, HTML title `Page Navigation Build`.
- Bolt template leftovers (OG tags, `.bolt/`).

## What is strong

- Clear three-step information architecture in the UI.
- Typed `CouponData` / `AnalysisResult` models.
- Verify form covers merchant, deal, validity fields with basic confidence affordance on expiration.
- Results screen structure (verdict, reasons, conditions, unverified items, disclaimer) is coherent for a product mock.

## What is weak or incomplete

- README effectively empty.
- No real analysis, OCR, or market-price logic.
- Unused Supabase dependency.
- No live demo URL, license, or GitHub description.
- Only two commits; last push `2026-01-01`; unfinished.
- Upload → analyze does not use the selected image.
- Copy-code action uses a constant, not extracted data.
- User menu / notifications / reminder buttons are non-functional chrome.

## Related skills (candidate IDs; create skill entities later)

- `skill.react`
- `skill.typescript`
- `skill.frontend`
- `skill.tailwind-css`
- UI prototyping / product mockups (no dedicated skill file yet)

Does **not** currently demonstrate (no code evidence): OCR, ML, backend, Supabase, data pipelines, production ops.

## Related domains

- Consumer deal / coupon tooling (UI intent)
- Frontend engineering
- Product UI prototyping

## Related experiences

- `[PLACEHOLDER: link experience entity if this was built for a role, course, or freelance engagement]`

## Related pages (future website)

- Project page outline: see end of `reports/graahak-assessment.md`
- Assessment: `knowledge/projects/reports/graahak-assessment.md`
- Extract notes: `knowledge/projects/graahak/README-extract.md`
- Short summary: `knowledge/projects/graahak/summary.md`

## Status

`draft` / unfinished prototype. GitHub visibility is **public**; knowledge recommendation for the personal site is **`unlisted`** until README, real pipeline, and naming are resolved; or until the page explicitly frames it as an early UI mock.

## Visibility

- Repository: public
- Knowledge / website: **unlisted** (not homepage-featured)

## Source references

- https://github.com/ayushrai-hub/graahak
- https://raw.githubusercontent.com/ayushrai-hub/graahak/main/README.md
- https://raw.githubusercontent.com/ayushrai-hub/graahak/main/package.json
- https://raw.githubusercontent.com/ayushrai-hub/graahak/main/src/App.tsx
- https://raw.githubusercontent.com/ayushrai-hub/graahak/main/src/pages/UploadPage.tsx
- https://raw.githubusercontent.com/ayushrai-hub/graahak/main/src/pages/VerifyPage.tsx
- https://raw.githubusercontent.com/ayushrai-hub/graahak/main/src/pages/ResultsPage.tsx
- https://raw.githubusercontent.com/ayushrai-hub/graahak/main/src/components/Header.tsx
- https://raw.githubusercontent.com/ayushrai-hub/graahak/main/src/types.ts
- https://raw.githubusercontent.com/ayushrai-hub/graahak/main/index.html
- https://raw.githubusercontent.com/ayushrai-hub/graahak/main/.bolt/config.json
- Local snapshot: `data/imports/graahak-snapshot/` (fetched 2026-07-23)
