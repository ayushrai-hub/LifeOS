# Changelog

## 2026-09-29

### Currently Reading

- Added `/sites/currently-reading/`: a public reading and learning log (Currently Reading, Finished, Learning, Built From Reading).
- Data lives in `knowledge/reading/currently-reading.json`; `scripts/build-reading.js` validates it and renders static HTML (no client JS). Schema and update workflow: `knowledge/reading/README.md`.
- Homepage: `currently reading` door and a Recently Updated line driven by the log's `updated` date.
- Linked from `/sites/reading/`, `/sites/learning/`, and the sitemap.
- `npm run build:reading` / `npm run check:reading`; GitHub Actions check keeps the generated page in sync with the data.

### QA and repo hygiene

- `npm run qa` now runs `scripts/qa-site.js` (Node, no PowerShell). The em dash check looks for U+2014 and its HTML entities; the old check searched for `"; "` and could not catch anything. `qa-site.ps1` is kept as a wrapper.
- Replaced the em dashes that check had been missing: mostly the separator between a link and its id in knowledge indexes, plus the contact and career pages. Replacements follow the site's `; ` convention, or a comma or colon where that reads better.
- `.gitignore` excludes the local Expert-O clone at `knowledge/github/repositories/expert-o/`.

## 2026-07-23

### Migration

- Crawled https://www.ayushrai.site/ (Vite SPA routes and bundle metadata).
- Added `sites/migrated/**` (~59 independent semantic HTML pages).
- Added `scripts/migrate-ayushrai-site.ps1` and crawl provenance under `data/imports/ayushrai-site-crawl/`.
- Migrated pages use `noindex` and are not linked from `sites/www`.

### Optimization

- Deleted unused modular CSS under `styles/base|components|layouts|themes`.
- Standardized templates on `styles/site.css`.
- Redirected nested `*/portfolio` stubs to `sites/portfolios/...`.
- Removed empty `content/`, empty doc/asset placeholder dirs.
- Moved root `ayush_rai_RLHF.pdf` and source portrait JPG into `knowledge/`.

### Documentation

- Added/replaced: `docs/README.md`, `ARCHITECTURE.md`, `FILE_STRUCTURE.md`, `PAGES.md`, `CONTENT_MAP.md`, `COMPONENTS.md`, `STYLES.md`, `SCRIPTS.md`, `KNOWLEDGE_GRAPH.md`, `OPTIMIZATION_REPORT.md`, `MIGRATION_REPORT.md`, `CHANGELOG.md`.

### Prior same-day work (knowledge site)

- Homepage knowledge-index design; catalog-generated portfolios/domains/resumes.
- Em dash purge; responsive `site.css`; certifications/media templates; QA script.

## Unreleased / planned

- Promote migrated facts into knowledge entities with evidence.
- Curate contextual links (homepage last).
- Wire or remove `live-clock.js`.
- Collapse remaining Title-Case doc duplicates.
