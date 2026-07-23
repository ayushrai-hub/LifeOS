# Future Ideas

Ideas only. None are commitments. Implement when content volume or need justifies them.

## Navigation & discovery

- Client-side search over curated index (`data/search-index.json`)
- Local full-text search with a tiny engine
- “On this page” TOC for long case studies (CSS/JS minimal)
- Backlinks section generated from a link graph file

## Content

- Decision log / ADR-style pages
- Public reading queue + finished books
- Spaced-repetition export from notes (private)
- Failure archive as a first-class portfolio
- Teaching curriculum pages
- Experiment log with status: running / concluded / abandoned

## Portfolios / sites

- `teaching.example.com`
- `speaking.example.com`
- `business.example.com`
- `opensource.example.com`
- `photos.example.com` (only if photography content exists)
- `travel.example.com` (optional; keep sparse)

## Technical

- Image pipeline (compress, AVIF/WebP with fallback)
- Automated link checker in CI
- Curated sitemap generator from `data/published.json`
- Subdomain local dev via Caddy/nginx reverse proxy
- Partial HTML includes via a tiny preprocessor **only if** duplication becomes painful; site must remain readable without it

## Collaboration

- Guest proofreading workflow
- Content review PRs with checklist template

## Explicitly low priority

- Dark mode (only if it does not fork the brand)
- Comments systems
- Newsletter popups
- Personalized feeds

## Related docs

- [Architecture.md](./Architecture.md)
- [Information-Architecture.md](./Information-Architecture.md)
