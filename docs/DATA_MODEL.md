# Data Model

## Overview

The PKB is a **typed entity graph** stored as files.

- **Nodes** = entity files (person, skill, project, …)
- **Edges** = relationship fields on entities and/or entries in `/knowledge/relationships`
- **Properties** = YAML frontmatter (or standalone YAML)
- **Narrative** = Markdown body (optional)

## Storage formats

| Format | Use |
|--------|-----|
| `*.md` with YAML frontmatter | Narrative + structure (biography, articles, case studies) |
| `*.yaml` / `*.yml` | Pure structured records (social links, indexes, schemas) |
| Binary under `/knowledge/media` and `/knowledge/assets` | Photos, PDFs, exports; referenced by path, never duplicated into Markdown |

## Canonical record shape

```yaml
id: string              # required, stable
type: string            # required, entity type
title: string           # required
slug: string            # required, kebab-case
aliases: [string]       # search / alternate names
keywords: [string]
tags: [string]
description: string     # short, 1–2 sentences
summary: string         # optional longer blurb
status: draft|review|published|archived
visibility: private|unlisted|public
priority: 0-100         # optional ranking hint
search_weight: 0.0-1.0  # optional search boost
created: YYYY-MM-DD
updated: YYYY-MM-DD
last_reviewed: YYYY-MM-DD
author: string          # usually person.owner
version: semver|integer
seo:
  title: string
  description: string
  canonical_path: string
relationships:          # see RELATIONSHIP_MODEL.md
  related_projects: [id]
  related_skills: [id]
  related_technologies: [id]
  related_companies: [id]
  related_articles: [id]
  related_books: [id]
  related_people: [id]
  related_events: [id]
evidence:               # optional shared block
  - kind: metric|link|artifact|quote
    value: string
    source: string
    date: YYYY-MM-DD
```

Type-specific fields extend this base. Unknown custom fields are allowed only under `extensions:` to keep the core schema stable.

```yaml
extensions:
  custom_key: value
```

## Identity inventory records

Social, contact, and business profiles share:

```yaml
id: social.linkedin
type: social_profile   # or contact_channel | business_profile
platform: LinkedIn
username: string
url: string
category: professional|developer|writing|video|design|freelance|payment|research|business|other
purpose: string
visibility: public|unlisted|private
priority: integer
status: active|inactive|unknown|needs-review|duplicate-candidate
notes: string
source: string         # e.g. identity-spreadsheet-2026
last_verified: YYYY-MM-DD
```

## Indexes (derived)

Under `/knowledge/metadata/indexes` and `/data`:

- Entity catalog by type
- Search stub (`title`, `slug`, `aliases`, `keywords`, `tags`, `description`, `search_weight`)
- Timeline ordered events
- Identity inventory (normalized social/contact/business)

Derived indexes may be regenerated. **Source entities remain authoritative.**

## Referential integrity

- Relationship targets must be entity `id`s that exist, or explicitly listed in `/knowledge/review` as pending.
- Broken references are validation errors, not silent omissions.
- Soft-delete = `status: archived` + move optional copy to `/knowledge/archive`.

## Time model

| Field | Meaning |
|-------|---------|
| `created` | Record created in the KB |
| `updated` | Record last materially changed |
| `last_reviewed` | Human verified still accurate |
| `start` / `end` | Real-world duration (roles, projects, events) |
| `published_at` | Public publication date (articles, talks) |
| `occurred_at` | Point-in-time event date |

All dates use ISO-8601 (`YYYY-MM-DD` or full datetime with timezone when needed).

## Validation summary

See [QUALITY_CHECKLIST.md](./QUALITY_CHECKLIST.md) and `/docs/schemas`.

Minimum publish gate:

- Required base fields present
- No invented metrics
- Relationships resolve or are marked pending
- `visibility` and `status` coherent (`published` + `private` is invalid)

## Related docs

- [ENTITY_MODEL.md](./ENTITY_MODEL.md)
- [METADATA_GUIDELINES.md](./METADATA_GUIDELINES.md)
- [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md)
