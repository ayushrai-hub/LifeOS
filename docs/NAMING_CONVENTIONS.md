# Naming Conventions

## Files and folders

- Lowercase **kebab-case**: `search-latency-rewrite.md`
- No spaces, no underscores in public slugs (underscores allowed only for `_index`, `_system`, `_review` meta folders)
- Dates in filenames only when the entity is inherently dated: `2024-03-talk-title.md` optional for talks/posts
- Prefer stable slugs; renames require redirects in consumers and ID migration notes

## Entity IDs

```
<prefix>.<slug>
```

| Type | Prefix examples |
|------|-----------------|
| person | `person` |
| skill | `skill` |
| technology | `technology` |
| project | `project` |
| experience | `experience` |
| education | `education` |
| company | `company` |
| organization | `organization` |
| client | `client` |
| community | `community` |
| domain | `domain` |
| book | `book` |
| article | `article` |
| blog_post | `blog` |
| research_paper | `paper` |
| experiment | `experiment` |
| thinking_note | `thinking` |
| principle | `principle` |
| note | `note` |
| idea | `idea` |
| product | `product` |
| startup | `startup` |
| event | `event` |
| timeline_event | `event.timeline` |
| travel | `travel` |
| gallery | `gallery` |
| fitness_log | `fitness` |
| impact | `impact` |
| teaching | `teaching` |
| mentoring | `mentoring` |
| leadership_note | `leadership` |
| management_note | `management` |
| goal | `goal` |
| reflection | `reflection` |
| course | `course` |
| certification | `cert` |
| award | `award` |
| achievement | `achievement` |
| conference | `conference` |
| talk | `talk` / `speaking` |
| presentation | `presentation` |
| photo / media | `media.photo` / `media` |
| social_profile | `social` |
| contact_channel | `contact` |
| business_profile | `business` |
| philosophy | `philosophy` |
| edge | `edge` |

Slug portion matches the filename without extension when practical: `skill.python` → `skills/python.yaml`.

## YAML keys

- `snake_case` for all keys
- Booleans: `true` / `false`
- Null: `null` or omit optional keys
- Lists: YAML arrays, never comma-separated strings

## Status & visibility enums

Use only documented enum values (see DATA_MODEL). Do not invent synonyms (`live` vs `published`).

## Branches / versions (git)

- `main`; stable published knowledge
- Feature work: `kb/<short-topic>`
- Never rewrite published entity IDs on `main` without a migration note in `/knowledge/_system/migrations/`

## Media files

```
knowledge/media/<kind>/<slug>--<optional-variant>.<ext>
```

Example: `knowledge/media/screenshots/project-alpha--dashboard.png`

## Import provenance

Original imports:

```
data/imports/<YYYY-MM-DD>-<source-name>.<ext>
```

Normalized outputs never overwrite imports.

## Related docs

- [FILE_STRUCTURE.md](./FILE_STRUCTURE.md)
- [VERSIONING.md](./VERSIONING.md)
