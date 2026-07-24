# Knowledge Base

Single source of truth for Ayush Rai’s life, work, learning, and long-term growth.

This is **not** only a portfolio. The website is one consumer of this graph.

- Do not duplicate facts across files; reference entity `id`s
- Create new records from `templates/`
- Put uncertain identity data in `review/`
- System status: `_system/site-status.yaml`
- Operating rules: `/docs/KNOWLEDGE_SYSTEM.md`

## Domain map (add for decades; do not restructure)

| Area | Path | Purpose |
|------|------|---------|
| Person & philosophy | `person/` | Who I am; How-I pages |
| Domains | `domains/` | Fields I work/study (AI, geopolitics, speaking…) |
| Learning stages | `learning/` | Evidence-based stage tracking |
| Courses & certs | `learning/courses/`, `certifications/` | Credentials with proof |
| Communities | `communities/` | Groups I join and contribute to |
| Projects / products | `projects/`, `products/` | Case studies and shipped surfaces |
| Writing / reading / books | `writing/`, `reading/`, `books/` | Publish & consume |
| Thinking / principles | `thinking/`, `principles/` | Provisional → durable beliefs |
| Research / experiments / ideas | `research/`, `experiments/`, `ideas/` | Investigation & bets |
| Speaking | `speaking/` | Talks, engagements, storytelling craft |
| Teaching / mentoring | `teaching/`, `mentoring/` | Knowledge transfer |
| Leadership / management | `leadership/`, `management/` | Practice notes |
| Impact | `impact/` | Evidence of outcomes (not titles) |
| Events / timeline / travel | `events/`, `timeline/`, `travel/` | Chronology |
| Fitness | `fitness/` | Long-term body & training timeline |
| Gallery / media | `gallery/`, `media/` | Photos with metadata; binaries |
| Goals / reflections | `goals/`, `reflections/` | Direction and retrospectives |
| Startups / companies | `startups/`, `companies/` | Org context |
| GitHub ingest | `github/` | Public repo evidence layer |

## Start here to add something new

1. Find the folder in the table (or create type + template + ENTITY_MODEL update).
2. Copy the matching file from `templates/`.
3. Fill evidence; leave placeholders rather than inventing.
4. Link related `id`s (project, domain, event, media, timeline).
5. Optionally add a `timeline_event` so chronology stays complete.

**Decades map:** [`_system/longevity-guide.md`](./_system/longevity-guide.md) · [`_system/domain-map.yaml`](./_system/domain-map.yaml)

## Seeded growth themes

- **Public speaking & storytelling** → `domains/public-speaking.md`, `domains/storytelling.md`, `speaking/storytelling/craft.md`
- **Market understanding** → `domains/market-understanding.md`, `thinking/market-lens.md`
- **Geopolitics** → `domains/geopolitics.md`, `thinking/geopolitics-lens.md`
- **Courses & certifications** → `certifications/inbox.md` then full entities

## GitHub layer (ingested)

- Entry: [`github/index.md`](./github/index.md)
- Per-repo: `github/repositories/<slug>/`

## Learning layer (evidence-based)

- Entry: [`learning/README.md`](./learning/README.md)
- Distinct from durable [`domains/`](./domains/) identities
