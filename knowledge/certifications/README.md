# Certifications

Courses and certifications completed or in progress. Credentials need verification links when public.

## Source folder

Shared certificate files live here (until each credential is a knowledge entity):

- [Certificates (Google Drive)](https://drive.google.com/drive/folders/1rO4e2Ve77dDyb4Yr_iOR61NJvVcxpHi5?usp=sharing)

Also recorded in `data/inventory.json` and `_index.yaml`.

## How to add

Copy `templates/certification.md` or `course.md`. Store certificate files under `media/certificates/`.

- Template: `knowledge/templates/certification.md`
- Entity type: `certification`
- One entity per file; kebab-case slug
- Link related projects, skills, people, events, media by `id`
- Prefer evidence over claims

## Longevity

Add new files; do not rename folders. Archive superseded entities with `status: archived` and `supersedes` edges instead of deleting history.
