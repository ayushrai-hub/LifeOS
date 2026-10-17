---
title: API
description: Public ask, sandbox, and bearer entry points for life.ayushrai.site.
canonical: https://life.ayushrai.site/api.md
last-updated: 2026-10-16
---

# API

`GET /ask?query=` answers a public question. `GET /api/v1/sandbox` returns the same public facts and writes nothing. `GET /api/v1` without a bearer returns 401 and `WWW-Authenticate: Bearer resource_metadata="https://life.ayushrai.site/.well-known/oauth-protected-resource"`.

The catalog of descriptions is https://life.ayushrai.site/.well-known/api-catalog. The spec is https://life.ayushrai.site/openapi.json.
