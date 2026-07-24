# Relationship Model

## Purpose

The knowledge base is a **graph**. Value compounds when entities point to each other with typed, meaningful edges.

Decorative link farms are forbidden. Every relationship should help a human or agent answer: *how are these connected in the real world?*

## Edge storage

Two complementary mechanisms:

1. **Inline** on an entity under `relationships:` (convenient, local)
2. **Edge files** in `/knowledge/relationships/` for cross-cutting or many-to-many graphs that should not bloat a single node

Both must use the same predicate vocabulary below.

## Core predicates

| Predicate | Meaning | Typical direction |
|-----------|---------|-------------------|
| `used_in` | Technology/skill applied in a project | tech → project |
| `uses` | Project uses technology/skill | project → tech/skill |
| `built_at` | Project created in context of company/org | project → company |
| `employed_by` | Person/role at company | experience → company |
| `demonstrates` | Project/work shows a skill | project → skill |
| `supports` | Skill/tech enables another domain | skill → skill |
| `discussed_in` | Topic covered in article/talk | entity → article |
| `inspired_by` | Work influenced by book/paper/person | project → book/paper |
| `authored` | Person wrote artifact | person → article |
| `awarded_for` | Award tied to work | award → project |
| `part_of` | Child of larger effort | project → project |
| `related_to` | Weak/generic link (use sparingly) | any → any |
| `supersedes` | Replaces older entity | new → old |
| `duplicate_of` | Same real-world thing (review queue) | candidate → canonical |
| `mentions` | Soft reference without strong coupling | article → entity |
| `member_of` | Person participates in community | person → community |
| `attended` | Person/event attendance | person → event |
| `presented_at` | Talk given at event | talk → event |
| `evidences` | Artifact proves impact/skill/domain | impact/project → claim target |
| `captured_at_event` | Media from an event | photo → event |
| `in_gallery` | Photo included in gallery | photo → gallery |
| `in_domain` | Work sits in a durable domain | project → domain |
| `stage_of` | Learning domain tracks practice stage of a domain | learning_domain → domain |
| `milestone_of` | Timeline spine points at rich entity | timeline_event → event/project/travel |

Prefer specific predicates over `related_to`.

## Standard relationship bags

Every rich entity should populate relevant arrays (IDs only):

```yaml
relationships:
  related_projects: []
  related_skills: []
  related_articles: []
  related_books: []
  related_people: []
  related_companies: []
  related_technologies: []
  related_events: []
  related_domains: []
  related_communities: []
  related_media: []
  related_timeline: []
  related_impact: []
```

These bags are **indexes of convenience**. Where direction matters, also record an explicit predicate in an edge file or typed field (`uses`, `built_at`, etc.).

## Example chain

```
technology.python
  └─ used_in → project.alpha
       └─ built_at → company.x
            └─ discussed_in → blog.scaling-alpha
                 └─ demonstrates → skill.backend-engineering
                      └─ supports → skill.machine-learning
```

Consumers (website, AI, search) may traverse this graph; they must not invent missing edges.

## Edge file format

`knowledge/relationships/edges.yaml` (append-only friendly):

```yaml
edges:
  - id: edge.python-used-in-alpha
    from: technology.python
    predicate: used_in
    to: project.alpha
    created: 2026-07-23
    notes: ""
```

## Cardinality & cycles

- Cycles are allowed when truthful (mutual `related_to`, skill graphs).
- Avoid contradictory pairs (`duplicate_of` both ways without a chosen canonical).
- Achievements should point to projects/skills; projects need not list every achievement if the achievement already links back; pick one primary direction and mirror only when useful for UX.

## Integrity rules

1. Targets must exist or be queued in `/knowledge/review`.
2. Renaming an `id` requires updating all inbound edges (validation script).
3. Archived entities may remain as targets; consumers filter by `status` / `visibility`.

## Related docs

- [ENTITY_MODEL.md](./ENTITY_MODEL.md)
- [DATA_MODEL.md](./DATA_MODEL.md)
- [KNOWLEDGE_SYSTEM.md](./KNOWLEDGE_SYSTEM.md)
