# External discovery checklist (Ora gaps)

Owner actions that cannot finish from this repository alone. Do not mark done without evidence.

## Wikipedia / Wikidata (Discovery −4)

- [ ] Confirm independent notability with reliable secondary sources. Do not create a promotional Wikipedia article.
- [ ] If justified, create a Wikidata item with official website `P856` = `https://life.ayushrai.site/`.
- [ ] Status: blocked on notability and editorial process. Not implementable in this repo.

## ChatGPT apps / connectors (Discovery −2)

- [ ] Confirm whether a personal knowledge site is eligible for ChatGPT apps/connectors.
- [ ] Submit with the owner OpenAI account using copy from `/developers/` and `/llms.txt` only.
- [ ] Status: pending owner submission.

## MCP registries (Discovery −1)

```bash
npx @smithery/cli auth login
npx @smithery/cli mcp publish https://life.ayushrai.site/mcp/product -n <your-org>/life-product
```

- [ ] Publish product MCP on Smithery (or mcp.so) with homepage/repo pointing at life.ayushrai.site.
- [ ] Paste the registry URL into `/developers/` MCP section for bi-directional verification.
- [ ] Status: blocked on Smithery API key in this environment.

## npm + PyPI SDK/CLI (Discovery −1, Usability −3/−3)

Packages are ready in-repo:

- `packages/life-ayushrai` (npm + CLI `life-ayushrai`)
- `packages/life_ayushrai` (PyPI + CLI `life-ayushrai`)

```bash
cd packages/life-ayushrai && npm login && npm publish --access public
cd packages/life_ayushrai && python3 -m build && twine upload dist/*
```

- [ ] `npm login` / publish `life-ayushrai`
- [ ] PyPI publish `life-ayushrai`
- [ ] Status: blocked on registry auth (`npm whoami` fails here).

## skills.sh (Access −1/−2)

Skills live under `skills/` and install with:

```bash
npx skills add ayushrai-hub/LifeOS
```

Listing appears via install telemetry (no separate submit form). An install was run from this machine; allow skills.sh time to index.

- [ ] Confirm https://skills.sh/ayushrai-hub/LifeOS (or skill pages) after indexing.
- [ ] Optional: share install command so others generate additional telemetry.

## Agent mode (Access warning)

`/?mode=agent` returns structured JSON with api, mcp, skills, authentication, sdk, endpoints, and developer_portal. Redeploy and rescans should raise signal count.

## Async jobs (Usability −2)

Implemented: `POST /api/v1/jobs` → `202` + `Location`, documented in OpenAPI. Force-rescan after deploy; cached Ora results may still show fail until the daily force quota resets.

## Ora rescan

```bash
curl -sS -X POST https://ora.ai/api/scan \
  -H 'content-type: application/json' \
  -d '{"url":"life.ayushrai.site","force":true}'
```

Force scans are capped (6/day). Without `force`, a fresh cache window may still serve the previous score.
