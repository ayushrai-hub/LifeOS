# File Structure

## Repository map (knowledge-first)

```
/
├── knowledge/                 # SINGLE SOURCE OF TRUTH
│   ├── person/
│   │   └── philosophy/
│   ├── career/
│   │   ├── education/
│   │   ├── experience/
│   │   └── roles/
│   ├── projects/
│   │   ├── _index/
│   │   └── case-studies/
│   ├── research/
│   │   ├── papers/
│   │   ├── experiments/
│   │   └── findings/
│   ├── writing/
│   │   ├── blogs/
│   │   ├── essays/
│   │   ├── newsletters/
│   │   └── notes/
│   ├── books/
│   │   ├── notes/
│   │   └── reading-list/
│   ├── learning/
│   │   ├── courses/
│   │   └── resources/
│   ├── skills/
│   ├── technologies/
│   ├── companies/
│   ├── organizations/
│   ├── clients/
│   ├── leadership/
│   ├── management/
│   ├── public-speaking/
│   │   ├── talks/
│   │   ├── conferences/
│   │   └── presentations/
│   ├── certifications/
│   ├── awards/
│   ├── achievements/
│   ├── timeline/
│   │   ├── life-events/
│   │   └── career-events/
│   ├── media/
│   │   ├── photos/
│   │   ├── videos/
│   │   ├── podcasts/
│   │   └── screenshots/
│   ├── contact/
│   ├── social/
│   ├── business/
│   ├── assets/
│   │   ├── documents/
│   │   └── exports/
│   ├── metadata/
│   │   ├── indexes/
│   │   ├── schemas/
│   │   └── search/
│   ├── relationships/
│   ├── templates/
│   ├── archive/
│   ├── inbox/                 # raw intake
│   ├── review/                # duplicates / uncertain
│   └── _system/               # KB status, clocks metadata, generators
│
├── docs/                      # operating manuals (this tree)
├── data/                      # derived/curated machine indexes
│   ├── identity/
│   └── imports/               # original spreadsheets, exports (read-only intake)
├── scripts/
│   └── knowledge/             # validate, import, index
├── config/                    # deployment & feature flags
│
├── sites/                     # OPTIONAL website consumer (not SoT)
├── styles/                    # presentation only
├── components/                # presentation only
├── includes/
├── templates/                 # HTML templates (consumer), distinct from knowledge/templates
├── assets/                    # site-static assets (fonts, icons); prefer knowledge/media for canonical media
├── content/                   # legacy/pre-PKB drafts; migrate into knowledge/
│
├── vercel.json
├── package.json
└── README.md
```

## Path rules

1. **Canonical facts live only under `/knowledge`.**
2. `/data/imports` may hold original CSVs/XLSX for provenance; normalized outputs live in `/knowledge/social|contact|business`.
3. `/content` is transitional. New work goes to `/knowledge`.
4. `/sites` may render knowledge but must not introduce new biographical facts.

## File naming

- Entity files: `<slug>.md` or `<slug>.yaml`
- One primary entity per file
- Indexes: `_index.yaml` inside a folder when needed
- Templates: `knowledge/templates/<type>.md`

See [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md).

## Growth

Adding a domain (e.g. `teaching/`):

1. Create folder under `/knowledge`
2. Add entity type + template
3. Update ENTITY_MODEL + FILE_STRUCTURE
4. Do not invent a parallel tree under `/sites` until a consumer needs it

## Related docs

- [KNOWLEDGE_SYSTEM.md](./KNOWLEDGE_SYSTEM.md)
- [Folder-Structure.md](./Folder-Structure.md); website consumer layout (secondary)
