# Pricing

life.ayushrai.site is a personal knowledge site. Public agent and human reads are free. There are no paid API plans, seats, or metered usage on this domain.

## Surfaces

| Surface | Price | Notes |
| --- | --- | --- |
| Markdown pages, llms.txt, sitemap | Free | No token |
| GET/POST `/ask`, GET `/api/v1/sandbox` | Free | No token |
| POST `/api/v1/batch`, POST `/api/v1/jobs` | Free | No token; jobs return 202 then poll |
| Product MCP and docs MCP | Free | Read-only public facts |
| Bearer `public-read` for `/api/v1` | Free | Non-secret token from `/auth.md` |

## Limits

Soft rate-limit headers advertise 120 requests per 60 seconds per client. Batch and jobs accept at most 10 queries per request. Nothing here sells credits or private data access.
