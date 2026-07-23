# Gallery

Curated photo collections. Photos are entities in `media/photos/` with metadata; galleries assemble them.

## How to add

Create a collection with `templates/gallery.md`. Reference `media.photo.*` ids.

- Template: `knowledge/templates/gallery.md`
- Entity type: `gallery`
- One entity per file; kebab-case slug
- Link related projects, skills, people, events, media by `id`
- Prefer evidence over claims

## Longevity

Add new files; do not rename folders. Archive superseded entities with `status: archived` and `supersedes` edges instead of deleting history.
