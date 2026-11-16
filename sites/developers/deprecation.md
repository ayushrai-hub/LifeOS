# API versioning and deprecation

How the public read API on life.ayushrai.site changes over time.

The current surface lives under `/api/v1`, plus unversioned helpers `/ask` and the MCP paths. The OpenAPI document at https://life.ayushrai.site/openapi.json is the machine-readable contract.

## Stability

Additive changes may ship without bumping the URL version. Removing or renaming a field, changing an auth challenge shape, or changing a required request field is a breaking change.

## Deprecation

Before a breaking change ships, responses on the retiring path carry `Deprecation: true` and a `Sunset` HTTP date at least 30 days out. After the Sunset date the old path may return `410 Gone`.

## Current notice

No endpoints are deprecated today. `/mcp/knowledge` is an alias of the product MCP at `/mcp/product` and will remain available.

- [Developers](https://life.ayushrai.site/developers/)
- [OpenAPI](https://life.ayushrai.site/openapi.json)
- [llms.txt](https://life.ayushrai.site/llms.txt)
