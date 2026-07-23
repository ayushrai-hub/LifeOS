# Validation Rules

## Automated checks (`scripts/knowledge/validate.py`)

1. Every `*.md` / `*.yaml` entity under `/knowledge` (excluding `templates/`, `inbox/`, `archive/` optional) parses.
2. Required keys: `id`, `type`, `title`, `slug`, `status`, `visibility`, `created`, `updated`, `author`, `version`.
3. `id` unique across the KB.
4. `slug` matches filename stem (warning if not).
5. Enum fields use allowed values only.
6. Dates match `YYYY-MM-DD` or ISO datetime.
7. Relationship IDs exist or appear in `knowledge/review/**`.
8. `published` + `visibility: private` → error.
9. Media paths referenced in entities exist.
10. Duplicate `url` among identity entities → error unless marked `duplicate-candidate` / `superseded_by`.

## Manual gates

See [QUALITY_CHECKLIST.md](../QUALITY_CHECKLIST.md) and [CONTENT_CHECKLIST.md](../CONTENT_CHECKLIST.md).

## Exit codes

- `0`; pass
- `1`; errors
- `2`; tool/IO failure
