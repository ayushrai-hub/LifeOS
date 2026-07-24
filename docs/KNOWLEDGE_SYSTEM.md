# Knowledge System

## Purpose

This repository’s **Personal Knowledge Base (PKB)** under `/knowledge` is the single source of truth for the owner’s **life, work, learning, and long-term growth** - not only a portfolio.

Websites, resumes, portfolios, blogs, newsletters, presentations, APIs, dashboards, mobile apps, search indexes, and AI agents are **consumers**. They must not invent or hardcode facts that belong in the knowledge base.

The long-term goal is a **living knowledge graph** that powers every interface. Structure must accept decades of new experience **without restructuring** (add entities; archive; do not fashionably rename the tree). See `knowledge/_system/domain-map.yaml`.

```
┌──────────────────────────────────────────────────────────┐
│  CONSUMERS (many, replaceable)                           │
│  websites · resume · CV · blog · AI · search · APIs · …  │
└───────────────────────────┬──────────────────────────────┘
                            │ read / query / render
┌───────────────────────────▼──────────────────────────────┐
│  KNOWLEDGE BASE  (/knowledge)                            │
│  entities · relationships · media · metadata · archive   │
└───────────────────────────┬──────────────────────────────┘
                            │ governed by
┌───────────────────────────▼──────────────────────────────┐
│  DOCUMENTATION  (/docs)                                  │
│  models · workflows · style · validation · versioning    │
└──────────────────────────────────────────────────────────┘
```

## Non-negotiable principles

1. **One fact, one place.** Never duplicate biography, dates, metrics, or links. Reference entities by `id`.
2. **Evidence over assertion.** Claims require metrics, projects, dates, or artifacts.
3. **No invention.** Missing data uses placeholders or `status: draft` / `needs-review`. Do not fabricate.
4. **Graph-first.** Entities interconnect via typed relationships (see [RELATIONSHIP_MODEL.md](./RELATIONSHIP_MODEL.md)).
5. **Consumer independence.** The knowledge base must remain valid if every website is deleted.
6. **Human + machine readable.** Prefer Markdown with YAML frontmatter, or YAML for purely structured records.
7. **Longevity.** Structure must support 10+ years of growth without rewriting the model.
8. **Review before delete.** Uncertain or duplicate identity data goes to `/knowledge/review`, never silent deletion.

## Layers

| Layer | Path | Role |
|-------|------|------|
| System docs | `/docs` | Operating rules for humans and agents |
| Knowledge entities | `/knowledge/**` | Canonical facts and narratives |
| Schemas | `/knowledge/metadata/schemas`, `/docs/schemas` | Field contracts |
| Templates | `/knowledge/templates` | Blank entity shapes |
| Relationships | `/knowledge/relationships` | Cross-links and graph edges |
| Inbox | `/knowledge/inbox` | Raw intake before normalization |
| Review | `/knowledge/review` | Ambiguous / duplicate candidates |
| Archive | `/knowledge/archive` | Superseded but retained history |
| Structured indexes | `/data` | Generated or curated machine indexes |
| Website (optional consumer) | `/sites`, `/styles`, `/scripts` | Presentation only |

## Entity identity

Every entity has:

- `id`; stable, unique, namespaced (`person.owner`, `project.search-latency`, `skill.python`)
- `type`; from the entity catalog
- `slug`; URL-safe, stable
- `title`; human display name
- `status`; `draft` | `review` | `published` | `archived`
- `visibility`; `private` | `unlisted` | `public`
- `created` / `updated` / `last_reviewed`
- `version`

See [ENTITY_MODEL.md](./ENTITY_MODEL.md) and [METADATA_GUIDELINES.md](./METADATA_GUIDELINES.md).

## Update propagation rule

Editing one knowledge file must be sufficient for every consumer that depends on it to reflect the change on next build or read.

- Do **not** copy skills into project pages as free text lists when a `related_skills` reference exists.
- Do **not** paste social URLs into HTML footers; read `/knowledge/social`.
- Do **not** hardcode company names in multiple places; reference `/knowledge/companies/<slug>.yaml`.

## Chronology and live surfaces

The knowledge base stores **historical dates** (work periods, publication dates, last content review).

Presentation consumers may show:

- **Last knowledge update**; from `/knowledge/_system/site-status.yaml` (or generated index)
- **Live local date/time**; client-side clock in the UI chrome (bottom-right), independent of content dates; must run continuously while the page is open

Content dates and the live clock are different concerns. Never confuse “when this fact was true” with “what time it is now.”

## Relationship to existing website docs

Earlier docs under `/docs` (Architecture, Information-Architecture, Design-Principles, etc.) describe an optional **static website consumer**. Those rules still apply to presentation.

When rules conflict:

1. Knowledge System docs win for data and truth.
2. Website docs win for HTML/CSS presentation of that data.

## Related docs

- [FILE_STRUCTURE.md](./FILE_STRUCTURE.md)
- [DATA_MODEL.md](./DATA_MODEL.md)
- [ENTITY_MODEL.md](./ENTITY_MODEL.md)
- [RELATIONSHIP_MODEL.md](./RELATIONSHIP_MODEL.md)
- [CONTENT_WORKFLOW.md](./CONTENT_WORKFLOW.md)
- [FUTURE_FEATURES.md](./FUTURE_FEATURES.md)
