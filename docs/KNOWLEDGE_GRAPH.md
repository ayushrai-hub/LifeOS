# Knowledge graph

## Principle

Everything of lasting interest is an **entity** with an `id`, `type`, and relationships. HTML pages are projections of entities (or staging migrations waiting to become entities).

## Core types

See [ENTITY_MODEL.md](./ENTITY_MODEL.md) for the full table. High-traffic types:

| Type | Typical path |
|------|--------------|
| `person` | `knowledge/person/` |
| `project` | `knowledge/projects/` |
| `experience` | `knowledge/career/experience/` |
| `education` | `knowledge/career/education/` |
| `certification` | `knowledge/certifications/` |
| `article` / `blog_post` | `knowledge/writing/` |
| `research_paper` / `experiment` | `knowledge/research/` |
| `photo` / `video` / `diagram` | `knowledge/media/` |
| `social_profile` / `contact_channel` | `knowledge/social/`, `contact/` |
| `learning_domain` | `knowledge/learning/domains/` |

IDs use `<type-prefix>.<slug>` (example: `person.owner`, `project.adaptive-rag`).

## Edges

Stored conceptually in entity `relationships:` blocks and `knowledge/relationships/edges.yaml`.

Recommended public link patterns:

| From | To |
|------|----|
| Project | Technologies, writing, research, experience, failures |
| Certification | Skills, domains, projects that used the skill |
| Experience | Projects shipped in that role |
| Domain / portfolio pages | Projects, learning notes, certifications |
| Photo | Projects, events, person |

## Website projections

| Projection | Graph role |
|------------|------------|
| Homepage | Curated entry edges only |
| Portfolio page | Filter entities by craft facet |
| Domain page | Filter entities by topic |
| Migrated page | Provisional node until promoted into `/knowledge` |

## Discovery UX

Visitors follow **inline blue links** inside prose. Menus that list everything are rejected ([Linking-Strategy.md](./Linking-Strategy.md)).

## Extension

1. Add template under `knowledge/templates/`.
2. Update `ENTITY_MODEL.md`.
3. Create entity file with evidence.
4. Optionally surface via catalog tags or a contextual HTML link.

## Related

- [RELATIONSHIP_MODEL.md](./RELATIONSHIP_MODEL.md)
- [DATA_MODEL.md](./DATA_MODEL.md)
- [CONTENT_MAP.md](./CONTENT_MAP.md)
