# Graahak; README & repository extract

Inspection date: **2026-07-23**  
Source: https://github.com/ayushrai-hub/graahak (`main`)

## README.md (full text)

```
graahak
```

Size on GitHub API: **8 bytes**. No sections, install steps, screenshots, or architecture notes.

## GitHub repository metadata

| Field | Value |
|-------|--------|
| full_name | ayushrai-hub/graahak |
| private | false |
| description | `null` |
| homepage | `null` |
| language | TypeScript |
| languages (bytes) | TypeScript 26364, JavaScript 990, HTML 598, CSS 59 |
| license | `null` |
| topics | `[]` |
| stars / forks / open issues | 0 / 0 / 0 |
| default_branch | main |
| created_at | 2026-01-01T08:45:18Z |
| pushed_at | 2026-01-01T08:48:03Z |
| updated_at | 2026-07-23T10:21:22Z |
| size (KB, GitHub) | 54 |

## Commit history (complete public list at inspection)

| SHA (short) | Date | Author | Message |
|-------------|------|--------|---------|
| 465862a | 2026-01-01T08:45:24Z | Ayush Rai | Start repository |
| 4c43bf4 | 2026-01-01T08:48:03Z | Ayush Rai | Updated index.html |

## Root tree (complete)

```
.bolt/
  config.json          → { "template": "bolt-vite-react-ts" }
  prompt               → generic Bolt design prompt (Tailwind + lucide-react)
.gitignore
README.md              → "graahak"
eslint.config.js
index.html
package-lock.json
package.json
postcss.config.js
src/
  App.tsx
  components/Header.tsx
  index.css
  main.tsx
  pages/UploadPage.tsx
  pages/VerifyPage.tsx
  pages/ResultsPage.tsx
  types.ts
  vite-env.d.ts
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

**Absent from tree:** `vercel.json`, tests, `docs/`, screenshots, env samples, Supabase client module, CI workflows, license file.

## package.json (factual)

- `name`: `vite-react-typescript-starter`
- `version`: `0.0.0`
- `private`: true
- Scripts: `dev`, `build`, `lint`, `preview`, `typecheck`
- Dependencies: `@supabase/supabase-js`, `lucide-react`, `react`, `react-dom`
- DevDependencies: Vite React plugin, Tailwind, ESLint, TypeScript, etc.

## index.html (factual)

- `<title>Page Navigation Build</title>`
- `og:image` / `twitter:image` → `https://bolt.new/static/og_default.png`

## Product naming found in source

| Location | Name |
|----------|------|
| Repo | graahak |
| Header UI | TruthPrice |
| Results disclaimer | TruthPrice |
| package.json | vite-react-typescript-starter |
| Document title | Page Navigation Build |

## UI flow documented from source

1. **UploadPage**; “Upload Coupon Screenshot”; accept JPG/PNG; “Analyze Coupon” navigates if file selected.
2. **VerifyPage**; “Verify Extracted Data”; form fields for merchant/deal/validity; sidebar claims AI comparison vs “50+ competitors”.
3. **ResultsPage**; shows `recommendation`, `savings`, `confidence`, reasons; copy `SAVE20`; disclaimer about public data / no purchase guarantee.

## Hardcoded demo data (`src/App.tsx`)

CouponData defaults:

- merchantName: Target  
- location: San Francisco, CA  
- discountValue: 20  
- discountType: percentage  
- minSpend: 0.00  
- expirationDate: 2023-12-31  
- category: Home & Garden  

AnalysisResult defaults:

- recommendation: USE  
- savings: $15.00  
- confidence: 98  
- three fixed reason strings  

## Supabase

Listed in `package.json` dependencies. Grep of downloaded `src/**` snapshot: **no `supabase` import or client usage**.

## Local provenance snapshot

Raw files cached at `data/imports/graahak-snapshot/` for offline reference (not the canonical source; GitHub is).
