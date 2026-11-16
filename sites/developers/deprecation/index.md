# life.ayushrai.site API versioning and deprecation policy

How the public read API on life.ayushrai.site changes over time.

The current surface lives under `/api/v1`, plus unversioned helpers `/ask`, `/oauth/*`, and the MCP paths. The OpenAPI document at https://life.ayushrai.site/openapi.json is the machine-readable contract.

## Versioning

The API is versioned in the URL path (`/api/v1`). Additive changes may ship without bumping the version. Removing or renaming a field, changing an auth challenge shape, or changing a required request field is a breaking change and ships under a new path version.

## How deprecation is signalled

Responses on a deprecated path carry a `Deprecation` header (RFC 9745, for example `Deprecation: @1792195200`) and a `Link` header with `rel="deprecation"` pointing at this page and `rel="successor-version"` pointing at the replacement. Before a deprecated path is removed, it also carries a `Sunset` header (RFC 8594) with an HTTP date at least 30 days out. After the Sunset date the old path may return `410 Gone` with a link to the replacement.

## Current notice

| Path | Status | Successor | Sunset |
| --- | --- | --- | --- |
| `/v1/sandbox`, `/v1/batch`, `/v1/jobs` (short aliases) | Deprecated since 2026-10-17 | `/api/v1/sandbox`, `/api/v1/batch`, `/api/v1/jobs` | Not scheduled; aliases keep working |
| `/api/v1/*` | Current | n/a | n/a |
| `/mcp/knowledge` | Supported alias of `/mcp/product` | n/a | n/a |

- [Developers](https://life.ayushrai.site/developers/)
- [OpenAPI](https://life.ayushrai.site/openapi.json)
- [llms.txt](https://life.ayushrai.site/llms.txt)
