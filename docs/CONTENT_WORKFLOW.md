# Content Workflow

## Lifecycle

```
inbox → normalize → draft entity → review → published → (optional) archive
```

### 1. Inbox

Drop raw materials in `/knowledge/inbox/`:

- Resume PDF/export
- LinkedIn export
- Spreadsheet of profiles
- Article drafts
- Certificates

Do not edit inbox files in place for canonical use; they are provenance.

### 2. Normalize

- Map each item to an entity type ([ENTITY_MODEL.md](./ENTITY_MODEL.md))
- Create/update files under the correct `/knowledge/...` path from templates
- Extract links into `social` / `contact` / `business`
- Record provenance metadata
- Move uncertain items to `/knowledge/review`

### 3. Draft

- Fill required fields
- Use `[PLACEHOLDER: …]` for unknowns
- Link relationships by `id`
- Keep `status: draft`, `visibility: private` until ready

### 4. Review

- Run quality + content checklists
- Resolve `needs-review` and duplicate candidates
- Set `last_reviewed`
- Promote `status: review` → `published` when accurate

### 5. Publish

- `status: published`
- Set appropriate `visibility`
- Update `_system/site-status.yaml` `knowledge_last_updated`
- Consumers rebuild/redeploy as needed

### 6. Archive

- Superseded narratives: archive, don’t erase
- Keep IDs resolvable

## Import workflow (identity spreadsheet)

1. Copy original file to `data/imports/YYYY-MM-DD-identity.<ext>`
2. Parse rows → candidate records
3. Deduplicate by normalized URL + platform + username
4. Write unique records to `knowledge/social|contact|business`
5. Write conflicts to `knowledge/review/identity-duplicates.yaml`
6. Never delete ambiguous rows automatically

See `/docs/workflows/IMPORT_IDENTITY.md` and `scripts/knowledge/import_identity.py`.

## Continuous intake

When new resumes, repos, papers, or talks arrive, repeat inbox → normalize. **Do not change folder architecture** to fit a one-off source; extend entities instead.

## Ownership

The owner is the authority for facts. Agents and editors may propose diffs; they must not invent achievements.

## Related docs

- [EDITOR_GUIDE.md](./EDITOR_GUIDE.md)
- [QUALITY_CHECKLIST.md](./QUALITY_CHECKLIST.md)
- [CONTENT_CHECKLIST.md](./CONTENT_CHECKLIST.md)
