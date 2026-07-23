# Identity Import Workflow

## Goal

Ingest a master spreadsheet (or CSV) of online presence into normalized entities under:

- `knowledge/social/`
- `knowledge/contact/`
- `knowledge/business/`

without deleting uncertain or duplicate rows.

## Preconditions

1. Place the original file in `data/imports/YYYY-MM-DD-identity.<csv|xlsx>`
2. Do not edit the import file after copy (provenance)

## Normalization rules

| Rule | Action |
|------|--------|
| Trim whitespace | always |
| Lowercase platform keys for IDs | `LinkedIn` → `social.linkedin` |
| Normalize URLs | strip tracking params when obvious (`utm_*`); keep path |
| Empty URL + empty username | send to review |
| Same URL twice | first wins as canonical; others `duplicate-candidate` |
| Same platform, different URLs | both kept; flag `needs-review` |
| Ambiguous category | `category: other` + review note |

## Category mapping (logical groups)

- **professional**; LinkedIn, Wellfound, etc.
- **developer**; GitHub, GitLab, Stack Overflow, Dev.to
- **writing**; Medium, Substack, Hashnode
- **video**; YouTube, Vimeo
- **design**; Behance, Dribbble
- **freelance**; Upwork, Fiverr, Toptal
- **payment**; PayPal.me, Stripe payment links, Buy Me a Coffee
- **research**; Google Scholar, ORCID, ResearchGate
- **business**; company sites, Crust/GST profiles, domain portfolios
- **contact**; email, phone, contact forms (prefer `knowledge/contact/`)
- **other**; everything else

## Status values

- `active`; known good
- `inactive`; confirmed dead/unused
- `unknown`; not verified
- `needs-review`; uncertain
- `duplicate-candidate`; likely duplicate

## Output

- One YAML file per profile
- Aggregate index: `knowledge/metadata/indexes/identity.yaml`
- Review file: `knowledge/review/identity-duplicates.yaml` and/or `identity-uncertain.yaml`

## Current repository status

As of 2026-07-23, **no identity spreadsheet was found** in the workspace. Place the file in `data/imports/` and run:

```bash
python scripts/knowledge/import_identity.py data/imports/<file>
```

## Related

- [CONTENT_WORKFLOW.md](../CONTENT_WORKFLOW.md)
- [ENTITY_MODEL.md](../ENTITY_MODEL.md)
