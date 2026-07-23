# Identity imports (provenance)

Place the master spreadsheet or CSV of online presence here:

```
data/imports/YYYY-MM-DD-identity.csv
data/imports/YYYY-MM-DD-identity.xlsx
```

Then run:

```bash
python scripts/knowledge/import_identity.py data/imports/YYYY-MM-DD-identity.csv
```

Normalized entities are written to `knowledge/social`, `knowledge/contact`, and `knowledge/business`.
Duplicates and uncertain rows go to `knowledge/review/`; they are not deleted.

**Status (2026-07-23):** No spreadsheet was found in the repository yet.
