# Evidence ledger; learning ingest

**Ingest date:** 2026-07-23  
**Subject:** Ayush Rai (`ayushrai-hub`)

## Sources consulted

| Source | Status | Used for learning inference? |
|--------|--------|------------------------------|
| GitHub profile API | Present | Yes |
| GitHub public repos (72) + READMEs (45) | Present (`knowledge/github/`, `data/imports/`) | Yes; primary |
| GitHub commit history (per-commit) | Not fully ingested (rate limits / scope) | Partial; used **last push timestamps** only |
| Personal knowledge narratives (`person/*`) | Placeholders | No factual content |
| Resume | Missing (`data/inventory.json`) | No |
| LinkedIn | Missing | No |
| Blog posts / technical articles (owned) | Missing in KB; Netlify URL on profile unaudited | No content analysis |
| Book notes | Missing | No |
| Research notes / papers authored | Missing | No |
| Public talks | Missing | No |
| Certificates / course completions | Linked ([Drive folder](https://drive.google.com/drive/folders/1rO4e2Ve77dDyb4Yr_iOR61NJvVcxpHi5?usp=sharing)); entities not yet written | No (folder only; not ingested as entities) |
| Saved links | Missing | No |

## What can be inferred

- Recurring **build themes** from repositories and READMEs.
- **Recency** of themes from `pushed_at`.
- Some **learning-by-building** and **documentation** habits from repo structure.

## What cannot be inferred

- Formal course history, grades, certificates.
- Books or papers actually read.
- Job responsibilities or years of production ownership.
- Teaching delivered to real students (curriculum repos alone are insufficient).
- Expert-level status in any domain.

## Update rule

When a new source arrives (resume, LinkedIn export, book note, course), append a row here and re-score affected domains; do not rewrite history silently. Prefer appending dated entries under `learning/history/`.
