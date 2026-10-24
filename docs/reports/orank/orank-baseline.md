# orank baseline for life.ayushrai.site

- Scanned at: 2026-10-17T14:52:56.811Z
- Score: 90/100 (A)
- Source: `POST https://ora.ai/api/scan` (force) saved as `reports/orank-baseline.json`

## Layer totals (sum of check points, includes bonus checks)

| Layer | Points |
| --- | --- |
| discovery | 15/27 |
| accessibility | 78/80 |
| usability | 133/137 |
| payments | 0/0 |

## Non-passing checks

| Layer | Check | Status | Points | Detail |
| --- | --- | --- | --- | --- |
| discovery | agentic-search-specific | warning | 1/3 | Name search surfaced no pages on life.ayushrai.site, although developer resources exist on the site (API docs, OpenAPI spec, auth docs, MCP  |
| discovery | brand-search-accuracy | warning | 1/3 | life.ayushrai.site ranks #6 for "ayushrai.site personal website" |
| discovery | wikipedia-presence | fail | 0/4 | No Wikipedia article or Wikidata entity found for "ayushrai.site" - creating a Wikipedia page and a Wikidata item with P856 = life.ayushrai. |
| discovery | mcp-registry-listed | fail | 0/1 | No bi-directionally verified MCP registry entry found. To pass, either publish the server from a package whose homepage, repository or maint |
| discovery | npm-sdk-package | fail | 0/1 | No NPM or PyPI SDK package found |
| discovery | chatgpt-app-listed | fail | 0/2 | Not found in ChatGPT app directory |
| accessibility | agent-mode-view | warning | 1/2 | Agent mode view found at ?mode=agent (7 signals: llms.txt, openapi, mcp, api, endpoint, agent, sdk) |
| accessibility | schema-type-breadth | warning | 1/2 | Some extended schema types found: ItemList - add 2 more types, such as FAQPage, Service, or AggregateRating, for full coverage |
| usability | cli-tool | warning | 2/3 | CLI tool mentioned in llms.txt |
| usability | rest-sdk-packages | fail | 0/3 | No SDK packages found across language ecosystems |

## Production baseline (2026-10-17, commit 0b8bec0)

- `/` 200 text/html, canonical `https://life.ayushrai.site/`; `/sites/www` 308 to `/`.
- `/?mode=agent` returned JSON only (no navigation links).
- `/api/v1/sandbox` 200 without credentials; JSON errors on all POST handlers; `/oauth/register` 201.
- Local suites: check:agent 51 OK, check:seo pass, qa fail=0.
