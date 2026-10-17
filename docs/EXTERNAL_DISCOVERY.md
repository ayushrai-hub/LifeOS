# External discovery checklist (Ora gaps)

Owner actions that cannot finish from this repository alone. Do not mark done without evidence.

## Wikipedia / Wikidata (Discovery −4)

- [ ] Confirm independent notability with reliable secondary sources. Do not create a promotional Wikipedia article.
- [ ] If justified, create a Wikidata item with official website `P856` = `https://life.ayushrai.site/`.
- [ ] Status: **blocked** on notability and editorial process. Not implementable in this repo.

## ChatGPT apps / connectors (Discovery −2)

- [ ] Confirm whether a personal knowledge site is eligible for ChatGPT apps/connectors.
- [ ] Submit with the owner OpenAI account using copy from `/developers/` and `/llms.txt` only.
- [ ] Status: **blocked** on owner submission.

## MCP registries (Discovery −1)

```bash
npx @smithery/cli auth login
npx @smithery/cli mcp publish https://life.ayushrai.site/mcp/product -n <your-org>/life-product
```

- [x] Official MCP Registry: `site.ayushrai.life/product` and `site.ayushrai.life/docs` published 2026-10-17 via HTTP domain verification (`/.well-known/mcp-registry-auth`; signing key kept outside the repo at `~/.config/mcp-registry/`). Linked from `/developers`, `/llms.txt`, and `/?mode=agent`.
- [ ] Smithery or mcp.so listing (the registries Ora checks): needs the owner to sign in (Smithery: `npx @smithery/cli auth login`; mcp.so: GitHub sign-in on the submit form).
- [ ] Status: Smithery/mcp.so **blocked** on owner sign-in.

## npm + PyPI SDK/CLI (Discovery −1, Usability −3/−3)

Packages are ready in-repo:

- `packages/life-ayushrai` (npm + CLI `life-ayushrai`)
- `packages/life_ayushrai` (PyPI + CLI `life-ayushrai`)

Workflow: `.github/workflows/publish-sdk.yml` (`workflow_dispatch` or GitHub Release).

Required repository secrets (missing as of 2026-10-16; publish failed with `ENEEDAUTH`):

- `NPM_TOKEN`: npm automation token with publish rights
- `PYPI_TOKEN`: PyPI API token

```bash
# After secrets exist:
gh workflow run "Publish SDK packages"
# Verify:
curl -sI https://registry.npmjs.org/life-ayushrai
curl -sI https://pypi.org/pypi/life-ayushrai/json
```

- [ ] Add `NPM_TOKEN` and `PYPI_TOKEN` secrets
- [ ] Run Publish SDK packages
- [ ] Confirm package pages resolve and homepage/repository point at life.ayushrai.site / LifeOS
- [ ] Status: **blocked** on registry secrets (local `npm whoami` and Actions publish both unauthenticated).

## Go module (Usability multi-language SDK)

- [x] `life.ayushrai.site/sdk/go` v0.1.0 published 2026-10-17 (tag `packages/life-go/v0.1.0`, vanity import served at `/sdk/go`). Verified on proxy.golang.org, sum.golang.org, and pkg.go.dev.

## skills.sh (Access −1/−2)

Skills live under `skills/` and install with:

```bash
npx skills add ayushrai-hub/LifeOS
```

Listing: https://skills.sh/ayushrai-hub/LifeOS (also linked from homepage, `/developers/`, `/llms.txt`, `/?mode=agent`).

- [x] Three official skills in-repo with SKILL.md
- [x] Bi-directional links from the site to skills.sh
- [ ] Confirm Ora marks `skills-sh-listed` / `skills-sh-quality` after a force rescan (indexing delay possible)

## Async jobs (Usability −2)

Implemented and live-verified:

- `GET /api/v1/jobs` → pattern map
- `POST /api/v1/jobs` → `202` + `Location` + `Retry-After` + `status: pending`
- `GET /api/v1/jobs/{id}` → `status: completed`
- Documented in `openapi.json` under tag `jobs`

Force-rescan after deploy; cached Ora results may still show fail until the daily force quota resets.

## Onboarding, errors, versioning (implemented 2026-10-17)

- Self-serve keys: `POST /oauth/register` (RFC 7591, public clients only) advertised as `registration_endpoint`; then `POST /oauth/token`.
- JSON errors: every API handler answers malformed JSON with a structured 400 (`invalid_json` with `hint`, OAuth `invalid_request`, or JSON-RPC `-32700` for MCP and A2A). Unknown API paths return JSON 404s.
- Deprecation: `/v1/*` short aliases send RFC 9745 `Deprecation` plus `Link` `rel="deprecation"` and `rel="successor-version"`. No `Sunset` is scheduled; adding one is a product decision.
- Brand and dev-resource discoverability: product name in developer page titles, slashless canonicals, `/developer`, `/api-docs`, `/docs/api`, `/sdk`, `/cli`, `/versioning`, `/mcp` routes, and 308 redirects from old `*.vercel.app` production aliases. Search rank itself depends on external indexing.

## Agent mode (Access warning)

`/?mode=agent` returns structured JSON including api, mcp, skills, skills_sh, cli, sdk, async_jobs, authentication, and endpoints. Redeploy and rescans should raise signal count.

## Ora rescan

```bash
curl -sS -X POST https://ora.ai/api/scan \
  -H 'content-type: application/json' \
  -d '{"url":"life.ayushrai.site","force":true}'
```

Force scans are capped (about 6/day). Without `force`, cache may serve the previous score.
