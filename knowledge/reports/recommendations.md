# Recommendations

Generated: 2026-07-23

## Immediate

1. Resolve LNCT vs LNCTS education duplicate — keep one canonical, archive or supersede the other.
2. Choose primary public location (Pune vs Bhopal) and update `person.owner`.
3. Add certification issuers/dates from certificate PDFs into `knowledge/inbox/` then normalize.
4. Confirm Vercel portfolio trio + Topmate + LinkedIn services URLs with a live check; record `last_verified`.
5. Attach evidence media for “Best Work” recognitions.

## Process (future imports)

Use existing workflow without architecture changes:

1. Drop raw files in `knowledge/inbox/` and copy immutable provenance to `data/imports/YYYY-MM-DD-<source>.*`
2. Map to entity types per `docs/ENTITY_MODEL.md`
3. Identity spreadsheets → `scripts/knowledge/import_identity.py`
4. Resume/CV/LinkedIn → `scripts/knowledge/import_linkedin_resume.py` (or extend this pattern)
5. GitHub exports → `knowledge/github/` (already established)
6. Regenerate indexes under `knowledge/**/index.md` and `knowledge/metadata/indexes/`
7. Log gaps in `knowledge/reports/`

## Enrichment opportunities

- Link experience → GitHub repos that evidence the work
- Promote high-confidence skills from `review` → `published` with project evidence
- Expand edges for partner-program orgs (OpenAI, Scale, Snorkel, Turing) with careful non-employment wording
