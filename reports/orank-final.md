# orank final report for life.ayushrai.site

| Metric | Baseline | Final |
| --- | --- | --- |
| Overall score | 90/100 (A) | **91/100 (A)** |
| Scan time | 2026-10-17T14:52:56Z | 2026-10-17T15:09:44Z |
| Production commit | 0b8bec0 | e7a02fb (deployment life-3lypidq7t) |

Machine-readable results: `reports/orank-baseline.json`, `reports/orank-final.json`. Regenerate with `npm run orank -- --scan --force --out reports/orank-latest` (forced scans are rate limited to about 6 per day).

## Check changes

| Check | Baseline | Final | Cause |
| --- | --- | --- | --- |
| accessibility/agent-mode-view | warning 1/2 | **pass 2/2** | `/?mode=agent` now serves a generated HTML agent view with navigation links; JSON via `Accept: application/json` or `&format=json` |
| usability/rest-sdk-packages | fail 0/3 | **warning 1/3** | Go module `life.ayushrai.site/sdk/go` v0.1.0 published (proxy.golang.org, sum.golang.org, pkg.go.dev) |
| accessibility/schema-type-breadth | warning 1/2 | warning 1/2 | Ora counts only top-level JSON-LD types; nested `Product` not credited |
| discovery/mcp-registry-listed | fail 0/1 | fail 0/1 | Published to the official MCP Registry, but Ora checks Smithery and mcp.so |
| discovery/npm-sdk-package | fail 0/1 | fail 0/1 | npm/PyPI packages ready; no registry credentials |
| usability/cli-tool | warning 2/3 | warning 2/3 | CLI ready in `packages/life-ayushrai`; needs npm publish |
| discovery/agentic-search-specific | warning 1/3 | warning 1/3 | External search indexing |
| discovery/brand-search-accuracy | warning 1/3 | warning 1/3 | External search ranking |
| discovery/wikipedia-presence | fail 0/4 (bonus) | fail 0/4 | Requires independent notability |
| discovery/chatgpt-app-listed | fail 0/2 (bonus) | fail 0/2 | Requires owner submission and OpenAI curation |

Previously passing checks (JSON errors, onboarding, versioning policy, async jobs, skills.sh, markdown fallback, OpenAPI, MCP server) remained passing.

## External publications

| Artifact | URL | Status |
| --- | --- | --- |
| MCP Registry `site.ayushrai.life/product` | https://registry.modelcontextprotocol.io/v0/servers?search=site.ayushrai.life | Published, `active` (verified by API) |
| MCP Registry `site.ayushrai.life/docs` | same | Published, `active` (verified by API) |
| Go module `life.ayushrai.site/sdk/go` v0.1.0 | https://pkg.go.dev/life.ayushrai.site/sdk/go | Published (proxy + sumdb verified) |
| npm `life-ayushrai` 1.1.0 (SDK + CLI) | https://www.npmjs.com/package/life-ayushrai | Prepared, not published (no npm auth) |
| PyPI `life-ayushrai` | https://pypi.org/project/life-ayushrai/ | Prepared, not published (no PyPI token) |
| Smithery / mcp.so listing | n/a | Not submitted (owner sign-in required) |

## Remaining actions (owner)

1. Add GitHub secrets `NPM_TOKEN` and `PYPI_TOKEN`, then run the "Publish SDK packages" workflow. Expected to affect npm-sdk-package, cli-tool, and rest-sdk-packages.
2. Sign in to Smithery (`npx @smithery/cli auth login`) or mcp.so and list `https://life.ayushrai.site/mcp/product`; the listing link then goes on `/developers`.
3. Decide whether to publish a genuine visible FAQ or service offering on the homepage; only then add matching FAQPage/Service JSON-LD (schema-type-breadth needs three top-level types).
4. Wikipedia/Wikidata and the ChatGPT app directory depend on independent notability and OpenAI curation.
