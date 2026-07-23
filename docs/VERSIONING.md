# Versioning

## What is versioned

1. **Entity `version` field**; semantic or integer revision of that record
2. **Git history**; authoritative timeline of file changes
3. **Archive copies**; optional snapshots when a major rewrite occurs
4. **Schema versions**; `/knowledge/metadata/schemas` and docs

## Entity version rules

- Trivial typo → bump `updated`, keep `version` or +0.0.1
- Material fact change → bump `version`, set `updated`, consider note in body
- Structural rewrite → bump major; optionally copy prior file to `knowledge/archive/<id>/<version>/`

## Schema version

Schemas declare:

```yaml
schema: entity.base
schema_version: 1
```

Breaking schema changes require:

1. Doc update
2. Migration note in `knowledge/_system/migrations/YYYY-MM-DD-<name>.md`
3. Validation script update

## Knowledge base releases (optional)

Tag git releases when a large coherent batch is ready for consumers:

```
kb-2026.07.23
```

Consumers may pin to a tag for reproducible builds.

## Deprecation

- Prefer `status: archived` + `superseded_by: <id>`
- Do not delete public IDs that have been referenced externally without a redirect map in `_system/redirects.yaml`

## Website consumer versions

Website CSS/HTML versioning is independent of knowledge entity versions. Deploy markers live in `_system/site-status.yaml`.

## Related docs

- [CONTENT_WORKFLOW.md](./CONTENT_WORKFLOW.md)
- [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md)
