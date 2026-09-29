# Scripts

## npm scripts (`package.json`)

| Command | Script | Purpose |
|---------|--------|---------|
| `npm run validate` | `scripts/knowledge/validate.js` | Knowledge field checks |
| `npm run validate:py` | `scripts/knowledge/validate.py` | Same (Python) |
| `npm run import:identity` | `scripts/knowledge/import_identity.py` | Import identity links |
| `npm run build:home` | `scripts/build-home.js` | Homepage from knowledge (needs Node) |
| `npm run build:reading` | `scripts/build-reading.js` + `build-home.js` | Currently Reading page, then homepage Recently Updated |
| `npm run check:reading` | `scripts/build-reading.js --check` | Validate reading data; fail if the page is stale |
| `npm run build:site` / `build` | `scripts/build-site.ps1` | Portfolios, domains, resumes |
| `npm run qa` | `scripts/qa-site.ps1` | Em dash, viewport, catalog coverage |
| `npm start` | `npx serve` | Local static server |

## Other scripts

| File | Purpose | Notes |
|------|---------|-------|
| `scripts/migrate-ayushrai-site.ps1` | Generate `sites/migrated/**` | Re-run after crawl edits |
| `scripts/live-clock.js` | Visitor-local clock UI | Not linked in HTML yet |
| `scripts/serve.ps1` / `serve.py` | Alternate local servers | Optional |
| `scripts/knowledge/import_owner_links.ps1` | Owner link import helper | Sibling to Python import |

## Inputs and outputs

| Script | Reads | Writes |
|--------|-------|--------|
| `build-site.ps1` | `data/site-catalog.json` | `sites/portfolios/**`, `domains/**`, `career/**`, hubs |
| `build-home.js` | `knowledge/_system/homepage.yaml`, learning, reading log, GitHub index, contacts | `data/home.json`, `sites/www/index.html` |
| `build-reading.js` | `knowledge/reading/currently-reading.json` | `sites/currently-reading/index.html` |
| `migrate-ayushrai-site.ps1` | Embedded crawl facts | `sites/migrated/**` |
| `qa-site.ps1` | `sites/**`, catalog, portrait asset | Console report |

## Dependencies

- PowerShell 5.1+ for `.ps1` generators (Windows)
- Node ≥18 for `build-home.js` and `validate.js` when available
- Python optional for `validate:py` / identity import

## Related

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [OPTIMIZATION_REPORT.md](./OPTIMIZATION_REPORT.md)
