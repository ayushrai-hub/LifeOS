# Optimization report

Date: 2026-07-23

## Goals

Reduce duplication, remove dead presentation code, keep one CSS system, clarify page ownership, improve maintainability without changing public homepage behavior.

## Actions completed

| Action | Detail |
|--------|--------|
| Canonical CSS | Kept `styles/site.css`; deleted unused modular CSS trees |
| Template links | Pointed `templates/pages/*.html` at `site.css` |
| Nested portfolios | Replaced short stubs with redirects to `sites/portfolios/...` |
| Empty trees | Removed empty `content/`, `docs/knowledge`, `docs/schemas`, `assets/fonts`, `assets/icons` |
| Root assets | Moved `ayush_rai_RLHF.pdf` → `knowledge/assets/documents/`; source JPG → `knowledge/media/photos/sources/` |
| Em dashes | Repository-wide removal (prior pass) |
| Documentation | Added architecture suite listed in `docs/README.md` |
| Migration quarantine | `sites/migrated/**` isolated with `noindex` |

## Performance notes

| Item | Status |
|------|--------|
| Homepage portrait | Resized web JPEG (~134KB) under `assets/images/portraits/` |
| CSS | Single small file; no webfonts on knowledge site |
| JS on public pages | None required for reading |
| Live site (ayushrai.site) | Separate Vite SPA; not this consumer |

## Remaining debt

| Item | Recommendation |
|------|----------------|
| `styles/main.css` | Keep as alias or delete after confirming no external refs |
| `includes/`, `components/` | Wire into generator or delete |
| `scripts/live-clock.js` | Ship on pages or remove from status docs |
| Topic / domain / portfolio triples | Consolidate URLs over time with redirects |
| Duplicate portrait bytes | `assets/` vs `knowledge/media/photos/` copy; accept or generate one from the other |
| Title-Case legacy docs | Fold into SCREAMING_SNAKE / new suite; leave stubs pointing here |
| `config/site.yaml` vs `site.json` | Prefer one config file |
| Auto-surface migrated facts into portfolios | Future tagging job |

## QA

`npm run qa` / `scripts/qa-site.ps1`: em dashes, viewport meta, catalog file presence, portrait size.

## Related

- [CHANGELOG.md](./CHANGELOG.md)
- [STYLES.md](./STYLES.md)
- [MIGRATION_REPORT.md](./MIGRATION_REPORT.md)
