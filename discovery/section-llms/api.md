---
title: API index
description: HTTP surface for life.ayushrai.site, including ask, the sandbox, and the public-read API.
canonical: https://life.ayushrai.site/api/llms.txt.md
last-updated: 2026-10-16
---

# API

HTTP surface for life.ayushrai.site. The OpenAPI document is https://life.ayushrai.site/openapi.json.

- `GET` or `POST` https://life.ayushrai.site/ask for a natural-language question. No token.
- `GET` https://life.ayushrai.site/api/v1/sandbox for the sandbox. No token. No writes.
- `GET` https://life.ayushrai.site/api/v1 returns 401 until you send `Authorization: Bearer public-read`. See https://life.ayushrai.site/auth.md.
- Knowledge MCP (product actions on public facts): https://life.ayushrai.site/mcp/knowledge
- Docs MCP (learn from the public pages): https://life.ayushrai.site/mcp/docs
