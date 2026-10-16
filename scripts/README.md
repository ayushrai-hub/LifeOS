# Scripts

## Layout

| Path | Role |
|------|------|
| `build-home.js` / `build-reading.js` | Generate homepage and currently-reading HTML |
| `seo/` | SEO meta apply, sitemap, integrity snapshot, `npm run check:seo` |
| `knowledge/` | Validate + import knowledge entities |
| `qa-site.js` | Static QA (`npm run qa`) |
| `site-chrome.js` | Client theme toggle (progressive enhancement) |
| `check-agent-surface.js` | Local agent-surface checks |

## Local server

```powershell
powershell -ExecutionPolicy Bypass -File scripts/serve.ps1
```

Python alternative: `python scripts/serve.py` (if Python is installed). Prefer `python3 -m http.server 3000` from the repo root.

## Optional JS

Core browsing requires **zero JavaScript**.

Add client scripts here only when a concrete need exists (e.g. future search). Prefer progressive enhancement.

## SEO

```bash
npm run build:seo   # scripts/seo/apply-meta → reading → home → sitemap → integrity
npm run check:seo   # scripts/seo/check.js
```

Config lives in `config/seo-pages.json`. Generated hashes live in `data/seo/`.
