# Developers

Read the public site from a script. Start with https://life.ayushrai.site/llms.txt and https://life.ayushrai.site/openapi.json.

The sandbox is `GET /api/v1/sandbox/`. It needs no token and writes nothing. `POST /api/v1/jobs/` returns HTTP 202 with a `Location` poll URL. Prefer trailing slashes on API paths. Protected paths return 401 until you follow https://life.ayushrai.site/auth.md. Pricing for these public reads is free: https://life.ayushrai.site/pricing.md.

Source and CLI package: https://github.com/ayushrai-hub/LifeOS/tree/main/packages/life-ayushrai
