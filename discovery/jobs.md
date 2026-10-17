---
title: Jobs API
description: Async job pattern for public questions. POST returns 202 Accepted with a Location poll URL.
canonical: https://life.ayushrai.site/api/v1/jobs.md
last-updated: 2026-10-17
---

# Jobs API

`/api/v1/jobs` answers up to ten public questions as an async job. Nothing is written; the job id encodes the queries.

## Create

```bash
curl -i -X POST https://life.ayushrai.site/api/v1/jobs \
  -H 'content-type: application/json' \
  -d '{"queries":["Who is Ayush Rai?","projects"]}'
```

Response: `202 Accepted`, a `Location` header, `Retry-After: 1`, and a body with `job_id`, `status: "pending"`, `poll`, and `status_url`.

## Poll

```bash
curl https://life.ayushrai.site/api/v1/jobs/{job_id}
```

Response: `200` with `status: "completed"` and one result per query. Unknown ids return `404` with a JSON error.

## Reference

- `GET /api/v1/jobs` returns a JSON map of this pattern.
- Schemas: `createAskJob` and `getAskJob` in https://life.ayushrai.site/openapi.json
- No token required. Soft rate limit: 120 requests per 60 seconds.
- Versioning and deprecation: https://life.ayushrai.site/developers/deprecation/
