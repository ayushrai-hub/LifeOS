# Personal Knowledge Base (PKB)

This repository is a **long-term personal knowledge system**. The website is one optional consumer; not the source of truth.

## Start here

1. [docs/KNOWLEDGE_SYSTEM.md](docs/KNOWLEDGE_SYSTEM.md)
2. [docs/FILE_STRUCTURE.md](docs/FILE_STRUCTURE.md)
3. [docs/ENTITY_MODEL.md](docs/ENTITY_MODEL.md)
4. [docs/RELATIONSHIP_MODEL.md](docs/RELATIONSHIP_MODEL.md)
5. [docs/CONTENT_WORKFLOW.md](docs/CONTENT_WORKFLOW.md)

## Layout

| Path | Role |
|------|------|
| `/knowledge` | Canonical facts, narratives, identity, media, graph |
| `/docs` | Operating manuals |
| `/data/imports` | Original spreadsheets/exports (provenance) |
| `/scripts/knowledge` | Validate + import |
| `/sites` | Website consumer (presentation only) |
| `/discovery` | Agent docs served at root URLs via `vercel.json` rewrites (`/auth.md`, `/openapi.json`, `/pricing.md`, ...) |
| `/api`, `/agent`, `middleware.js` | Serverless endpoints, negotiation, agent mode |

## Principles

- One fact, one place
- Reference by entity `id`; never duplicate
- Evidence over marketing language
- Uncertain identity data → `/knowledge/review`, never silent delete

## Commands

```bash
npm run validate       # knowledge validation (Node)
npm run build:site     # generate resumes, portfolios, domains from data/site-catalog.json
npm run qa             # static QA (em dashes, viewport, catalog coverage); exits 1 on failure
npm run check:agent    # agent surface checks (negotiation, discovery, jobs, trust pages)
npm run local            # full local site on http://localhost:3000 (vercel dev: middleware, rewrites, api/)
npm start              # static-only preview (Python http.server; no rewrites or api/)
node scripts/build-home.js   # regenerate homepage from knowledge/_system/homepage.yaml
```

Browse the homepage at `/` under `npm run local`. Public site: https://life.ayushrai.site/. Developer portal: https://life.ayushrai.site/developers/.

## Agent skills (skills.sh)

```bash
npx skills add ayushrai-hub/LifeOS
```

See [skills/README.md](skills/README.md).

## SDK / CLI packages

- JavaScript: [packages/life-ayushrai](packages/life-ayushrai) (`life-ayushrai` CLI)
- Python: [packages/life_ayushrai](packages/life_ayushrai)

Publish with owner registry auth (`npm publish` / `python -m build && twine upload`).

## Website consumer

The site is a knowledge graph in HTML: no mega-menu, inline blue links, multiple resumes and portfolios, domain pages, certifications, and media entities. Edit `data/site-catalog.json`, then run `npm run build:site`.

## Deploy (Vercel)

- `middleware.js` rewrites `/` → `sites/www/` and 308s `/sites/www` → `/`
- `vercel.json` maps root agent URLs to files in `discovery/`
- Content chronology lives in knowledge entities + `knowledge/_system/site-status.yaml`

```bash
npx vercel
```

## Identity spreadsheet

Drop the master online-presence file into `data/imports/` and run the import script.

## Filling personal data

Provide biography facts, work dates, certifications, and resume details. Until then, entity sections stay empty on purpose; nothing is invented.
