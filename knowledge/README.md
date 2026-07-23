# Knowledge Base

Single source of truth for personal digital presence.

- Do not duplicate facts across files; reference entity `id`s
- Create new records from `templates/`
- Put uncertain identity data in `review/`
- System status: `_system/site-status.yaml`

## GitHub layer (ingested)

- Entry: [`github/index.md`](./github/index.md)
- Profile: [`github/profile.md`](./github/profile.md)
- Per-repo entities: `github/repositories/<slug>/summary.md` + `README-extract.md`
- Reports: `github/reports/`
- Raw API cache: `data/imports/github-*.json` and `data/imports/github-readmes/`
- Website must consume this layer later; do not scrape GitHub again from the site.

## Learning layer (evidence-based)

- Entry: [`learning/README.md`](./learning/README.md)
- Active topics: [`learning/currently-learning.md`](./learning/currently-learning.md)
- Domains: `learning/domains/`
- Stages / honesty rules: [`learning/stages.md`](./learning/stages.md)
- Evolution rules: [`learning/_schema/evolution.yaml`](./learning/_schema/evolution.yaml)
- Derived primarily from GitHub until resume/LinkedIn/books/courses are ingested.

Read `/docs/KNOWLEDGE_SYSTEM.md` before editing.
