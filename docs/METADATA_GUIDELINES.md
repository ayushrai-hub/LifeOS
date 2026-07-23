# Metadata Guidelines

## Required metadata (all entities)

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | Stable |
| `type` | yes | Entity catalog |
| `title` | yes | Display |
| `slug` | yes | kebab-case |
| `status` | yes | draft/review/published/archived |
| `visibility` | yes | private/unlisted/public |
| `created` | yes | ISO date |
| `updated` | yes | ISO date |
| `author` | yes | usually `person.owner` |
| `version` | yes | start at `1` or `0.1.0` |

## Strongly recommended

| Field | Purpose |
|-------|---------|
| `description` | One–two sentence plain summary |
| `summary` | Slightly longer abstract |
| `aliases` | Former names, abbreviations |
| `keywords` | Search terms |
| `tags` | Controlled vocabulary preferred |
| `last_reviewed` | Freshness |
| `priority` | Curation ordering |
| `search_weight` | 0–1 boost |
| `seo` | title, description, canonical_path |
| `relationships` | Graph bags |

## SEO metadata block

```yaml
seo:
  title: string          # ≤ ~60 chars when possible
  description: string    # ≤ ~155 chars when possible
  canonical_path: string # consumer path, not full domain until domain known
  noindex: false         # true for private/unlisted when rendered
```

SEO fields describe **intent for public consumers**. Private entities still carry them for future use but must not be published.

## Search-oriented fields

Every entity should be searchable later via:

`title`, `slug`, `aliases`, `keywords`, `tags`, `description`, `summary`, `search_weight`

Keep these factual. Do not stuff buzzwords.

## Review metadata

```yaml
review:
  needs_review: true
  reason: "duplicate url with social.github"
  reviewers: []
  due: null
```

## Provenance

```yaml
provenance:
  source: identity-spreadsheet
  source_file: data/imports/2026-07-23-identity.csv
  imported_at: 2026-07-23
```

## System metadata

`/knowledge/_system/site-status.yaml` tracks:

- `knowledge_last_updated`; last material KB change
- `consumers.website.last_deployed`; when known
- `consumers.website.last_content_publish`; last intentional public content push

Presentation clocks (live local time) are **not** stored here; they are runtime UI only.

## Related docs

- [DATA_MODEL.md](./DATA_MODEL.md)
- [SEO_GUIDELINES.md](./SEO_GUIDELINES.md)
- [VERSIONING.md](./VERSIONING.md)
