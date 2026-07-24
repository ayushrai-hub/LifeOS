# Content Lifecycle

## States

```
idea → draft → review → published → updated → archived
```

| State | Location / signal |
|-------|-------------------|
| idea | Issue, note stub, or `content/` outline |
| draft | `content/` or `sites/` with `noindex` + clear draft banner |
| review | Pass [Content-Review-Checklist.md](./Content-Review-Checklist.md) |
| published | Live under `sites/`, linked appropriately, indexable if intended |
| updated | Change note or revised date in metadata |
| archived | Page remains for URLs; marked archived; remove from curated homes |

## Intake pipeline (future personal data)

When materials arrive (resume, LinkedIn export, GitHub, blogs, talks):

1. **Inventory**; list artifacts in `/data/inventory.json` (or a doc table)
2. **Classify**; map to page type / portfolio / site
3. **Template**; copy from `/templates/pages/`
4. **Fill**; replace placeholders only with real facts
5. **Interlink**; add contextual links
6. **Tier**; curated / reachable / unlisted
7. **Publish**; remove draft signals; add to curated sitemap if desired

## Editing cadence

- Notes: anytime
- Case studies: when metrics or architecture change materially
- Career: on role changes
- Root homepage links: rarely; intentionally

## Deletion policy

Prefer archive over delete for published URLs. If delete is required, leave a minimal tombstone or redirect.

## Ownership

The site owner is the editor-in-chief. Documentation exists so future edits stay coherent.

## Related docs

- [Content-Rules.md](./Content-Rules.md)
- [Content-Review-Checklist.md](./Content-Review-Checklist.md)
- [Metrics.md](./Metrics.md)
