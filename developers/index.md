# Developers

Read the public site from a script. Start with https://life.ayushrai.site/llms.txt and https://life.ayushrai.site/openapi.json.

The sandbox is `GET /api/v1/sandbox`. It needs no token and writes nothing. `POST /api/v1/jobs` returns HTTP 202 with a `Location` poll URL (`status: pending` until `GET /api/v1/jobs/{id}` returns `completed`). Protected paths return 401 until you follow https://life.ayushrai.site/auth.md. Pricing for these public reads is free: https://life.ayushrai.site/pricing.md.

Official skills: https://skills.sh/ayushrai-hub/LifeOS (`npx skills add ayushrai-hub/LifeOS`).

SDK and CLI source: https://github.com/ayushrai-hub/LifeOS/tree/main/packages/life-ayushrai (`life-ayushrai`). Python twin: https://github.com/ayushrai-hub/LifeOS/tree/main/packages/life_ayushrai. Publish needs repository secrets `NPM_TOKEN` and `PYPI_TOKEN`.
