# Entity Model

## Principle

Everything of lasting interest is an **entity**: a typed, identified, referenceable record.

## Core entity types

| Type | `type` value | Typical path |
|------|--------------|--------------|
| Person | `person` | `knowledge/person/` |
| Skill | `skill` | `knowledge/skills/` |
| Technology | `technology` | `knowledge/technologies/` |
| Project | `project` | `knowledge/projects/` |
| Experience / Role | `experience` | `knowledge/career/experience/` |
| Education | `education` | `knowledge/career/education/` |
| Company | `company` | `knowledge/companies/` |
| Organization | `organization` | `knowledge/organizations/` |
| Client | `client` | `knowledge/clients/` |
| Book | `book` | `knowledge/books/` |
| Book note | `book_note` | `knowledge/books/notes/` |
| Article / Essay | `article` | `knowledge/writing/` |
| Blog post | `blog_post` | `knowledge/writing/blogs/` |
| Research paper | `research_paper` | `knowledge/research/papers/` |
| Experiment | `experiment` | `knowledge/research/experiments/` |
| Certification | `certification` | `knowledge/certifications/` |
| Award | `award` | `knowledge/awards/` |
| Achievement | `achievement` | `knowledge/achievements/` |
| Conference | `conference` | `knowledge/public-speaking/conferences/` |
| Talk | `talk` | `knowledge/public-speaking/talks/` |
| Presentation | `presentation` | `knowledge/public-speaking/presentations/` |
| Video | `video` | `knowledge/media/videos/` |
| Podcast | `podcast` | `knowledge/media/podcasts/` |
| Photo | `photo` | `knowledge/media/photos/` |
| Diagram | `diagram` | `knowledge/media/diagrams/` |
| Slide deck | `presentation` (slides) | `knowledge/public-speaking/presentations/` or media |
| Course | `course` | `knowledge/learning/courses/` |
| Learning profile | `learning_profile` | `knowledge/learning/*.md` |
| Learning domain | `learning_domain` | `knowledge/learning/domains/` |
| Timeline event | `timeline_event` | `knowledge/timeline/` |
| Social profile | `social_profile` | `knowledge/social/` |
| Contact channel | `contact_channel` | `knowledge/contact/` |
| Business profile | `business_profile` | `knowledge/business/` |
| Philosophy note | `philosophy` | `knowledge/person/philosophy/` |

New types may be added only with an update to this document and a template under `/knowledge/templates`.

---

## Person (owner)

Primary file: `knowledge/person/profile.yaml` plus narrative Markdown files.

Dedicated narrative entities (separate files, linked from profile):

| File | Topic |
|------|--------|
| `biography.md` | Factual bio |
| `personal-story.md` | Longer origin / path narrative |
| `values.md` | Operating values |
| `mission.md` | Mission |
| `vision.md` | Vision |
| `goals.md` | Goals (dated, revisable) |
| `personality.md` | Traits as observed behaviors, not labels alone |
| `interests.md` | Interests |
| `hobbies.md` | Hobbies |
| `decision-making.md` | How decisions are made |
| Philosophy set | See below |

Philosophy files under `knowledge/person/philosophy/`:

- `leadership.md`
- `learning.md`
- `career.md`
- `writing.md`
- `engineering.md`
- `ai.md`

---

## Skill

Skills are rich entities, not bare names.

Required sections / fields:

- `description`
- `experience` (narrative + years / context)
- `current_level` (honest scale; define scale in file)
- `future_goals`
- `related_projects` / `related_technologies` / `related_skills`
- `evidence` (metrics, links, artifacts)
- `articles` / learning resources

Template: `knowledge/templates/skill.md`

---

## Project

Reusable case-study entity.

Required conceptual sections:

Name, Summary, Problem, Background, Timeline, Role, Responsibilities, Architecture, Tech Stack, Challenges, Tradeoffs, Solutions, Metrics, Results, Lessons Learned, Future Improvements, Repository, Live Demo, Screenshots, Documentation, Related Articles / Skills / Technologies.

Template: `knowledge/templates/project.md`

---

## Experience

Employment or equivalent engagement.

Fields: Company (ref), Position, Duration (`start`/`end`), Responsibilities, Achievements (refs preferred), Projects (refs), Technologies (refs), Leadership, Impact, Metrics, Lessons.

Template: `knowledge/templates/experience.md`

---

## Achievement

Not a bare bullet.

Fields: Description, Date, Category, Evidence, Metrics, Links, Related Projects, Related Skills.

Template: `knowledge/templates/achievement.md`

---

## Technology / Company / Book / Talk / …

See matching templates in `/knowledge/templates`. Each type lists required vs optional fields in its template header comment.

---

## Identity entities

`social_profile`, `contact_channel`, and `business_profile` normalize the digital identity inventory.

Rules:

- One platform account → one entity file
- Duplicates → `status: duplicate-candidate` + link to preferred `id` in `notes` / `superseded_by`
- Uncertain URLs → `status: needs-review` in `/knowledge/review` or on the record itself

---

## IDs

Pattern: `<type-prefix>.<slug>`

Examples:

- `person.owner`
- `skill.python`
- `project.knowledge-base`
- `company.acme`
- `social.github`
- `achievement.patent-2024`

See [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md).

## Related docs

- [DATA_MODEL.md](./DATA_MODEL.md)
- [RELATIONSHIP_MODEL.md](./RELATIONSHIP_MODEL.md)
- [FILE_STRUCTURE.md](./FILE_STRUCTURE.md)
