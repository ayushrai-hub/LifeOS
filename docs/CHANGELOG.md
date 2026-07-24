# Changelog

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
