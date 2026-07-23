# Future Features

Features the architecture anticipates. Build only when needed; do not pre-implement speculative complexity into the knowledge schema beyond reserved fields.

## Near-term consumers

| Feature | Depends on |
|---------|------------|
| Personal website (static) | `/knowledge` + `/sites` |
| Resume / CV export | experience, skills, projects, achievements |
| Portfolio views | projects + media |
| Blog rendering | `writing/blogs` |
| Live date/time chrome | client script; see below |
| Vercel static deploy | `vercel.json` |

## Live date/time (required UX for website consumer)

- Position: bottom-right of the viewport
- Behavior: updates continuously while the page is open (approx. every 1s)
- Source: visitor’s local timezone via browser APIs
- Independent of knowledge dates
- Must not block content load
- Implementation stub: `/scripts/live-clock.js`
- Last **content** update remains sourced from `/knowledge/_system/site-status.yaml`

## Search

- Build index from entity search fields into `/knowledge/metadata/search` or `/data`
- Full-text later (Pagefind, Typesense, etc.) without changing entity files

## Knowledge graph UI

- Visualize edges from `/knowledge/relationships`
- Filter by type/predicate

## AI agent

- Read-only tools over `/knowledge`
- Citation by entity `id`
- No write without human review workflow

## APIs / dashboards / mobile

- Serve normalized JSON generated from entities
- Same IDs across all clients

## Interactive timeline / project explorer

- Drive from `timeline/*` and `projects/*`
- No parallel date databases

## Analytics

- Prefer privacy-respecting analytics on consumers
- Do not store PII about visitors inside the PKB

## Validation CI

- Run `scripts/knowledge/validate.py` on PR
- Fail on broken refs and missing required metadata

## Multi-site / multi-brand outputs

Multiple websites may consume the same KB with different visibility filters.

## Out of scope for the KB itself

- Marketing popups
- Invented biography
- Embedding duplicate social lists in HTML

## Related docs

- [KNOWLEDGE_SYSTEM.md](./KNOWLEDGE_SYSTEM.md)
- [Future-Ideas.md](./Future-Ideas.md)
