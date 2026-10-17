---
title: Sandbox API
description: Zero-auth read-only sandbox returning the public catalog for life.ayushrai.site.
canonical: https://life.ayushrai.site/api/v1/sandbox.md
last-updated: 2026-10-17
---

# Sandbox API

`GET /api/v1/sandbox` returns the same public catalog as the rest of the site with the header `X-Sandbox: true`. It needs no API key or bearer token and writes nothing.

```bash
curl https://life.ayushrai.site/api/v1/sandbox
```

- Free, no signup. Pricing: https://life.ayushrai.site/pricing.md
- For a bearer token instead, follow https://life.ayushrai.site/auth.md (anonymous registration issues the non-secret `public-read` token).
- OpenAPI: https://life.ayushrai.site/openapi.json
