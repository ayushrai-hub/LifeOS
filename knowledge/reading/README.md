# Reading

What is being read, finished, or parked. Book entities live in `books/`; this layer tracks reading posture and lists.

## How to add

Add list entries under `lists/`; deep notes under `notes/` or `books/notes/`.

- Template: `knowledge/templates/reading-list.md`
- Entity type: `reading_list`
- One entity per file; kebab-case slug
- Link related projects, skills, people, events, media by `id`
- Prefer evidence over claims

## Longevity

Add new files; do not rename folders. Archive superseded entities with `status: archived` and `supersedes` edges instead of deleting history.
