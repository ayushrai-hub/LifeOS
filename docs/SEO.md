# SEO

## Goals

- Accurate discovery of pages that are meant to be public
- Correct previews when links are shared
- No accidental indexing of drafts / unlisted material when avoidable

## Required on every published page

| Element | Rule |
|---------|------|
| `<title>` | Specific, human; ≤ ~60 characters when possible |
| `<meta name="description">` | One or two factual sentences; no hype |
| Canonical | `<link rel="canonical" href="https://…">` absolute HTTPS, no trailing slash (matches `trailingSlash: false`) |
| Open Graph | `og:title`, `og:description`, `og:type`, `og:url`, `og:image` |
| Twitter | `twitter:card`, `twitter:title`, `twitter:description` |

## Tooling

| Command | Purpose |
|---------|---------|
| `npm run build:seo` | Apply section meta, rebuild reading + home, regenerate sitemap + research integrity hashes |
| `npm run check:seo` | Unique titles, canonicals, sitemap coverage, robots, research `<main>` integrity |

Config: `config/seo-pages.json`. Integrity baseline: `data/seo/research-integrity.json` (hashes `<main>` only).

## Canonical URL policy

| Public URL | Notes |
|------------|--------|
| `https://life.ayushrai.site/` | Canonical homepage. Middleware rewrites file from `sites/www/`. |
| `https://life.ayushrai.site/sites/www` | **308 → /** (duplicate collapse). |
| `https://life.ayushrai.site/sites/{section}` | Section indexes; absolute canonicals; listed in `/sitemap.xml`. |

Homepage door and panel links use root-absolute `/sites/...` paths so they resolve when the page is served at `/`.

## Structured data

Homepage JSON-LD from `knowledge/person/schema-person.jsonld`:

- `Person`, `WebSite`, `ProfilePage` only (visible identity + site).
- Do **not** emit `FAQPage` unless a visible FAQ exists on the page.
- Do not fake ratings, reviews, or job postings.

## Sitemap

Root sitemap: `/sitemap.xml` (referenced from `robots.txt`). Curated from `config/seo-pages.json`. Excludes `/sites/www`, redirect stubs, and `noindex` pages. `lastmod` comes from git history when available.

## Research integrity

Existing research/writing page **prose** must not be rewritten for SEO. Allowed: head metadata, canonicals, Home footer href to `/`. `npm run check:seo` fails if `<main>` hashes drift from `data/seo/research-integrity.json`.

## 2026-10-16 metadata report (selected)

| Page | Before title | After title | Before description (len) | After description |
|------|--------------|-------------|--------------------------|-------------------|
| `/` (www) | Ayush Rai | Ayush Rai; AI Engineer in Bhopal | 102 (tagline) | Public knowledge site… career notes. |
| `/sites/research` | Research; Ayush Rai | Research; Ayush Rai | 44 | Research index: questions, experiments… |
| `/sites/writing` | Writing; Ayush Rai | Writing; Ayush Rai | 33 | Durable essays and careful notes… |
| `/sites/blog` | Blog; Ayush Rai | Blog; Ayush Rai | 12 | Dated posts from Ayush Rai… |
| `/sites/currently-reading` | Currently Reading; Ayush Rai | (unchanged) | 91 | Canonical host fixed from `thelifeofayush.vercel.app` → `life.ayushrai.site` |
| `/sites/projects` | Projects; Ayush Rai | Projects; Ayush Rai | 97 | + canonical + OG tags |
| Other section indexes | Often missing canonical | Unique title + description + OG + canonical | varied | See `config/seo-pages.json` |

## Indexing control

- Public-curated & public-reachable: allow indexing.
- Redirect stubs (`sites/*/portfolio` refresh pages): `noindex,follow` + absolute canonical to the real portfolio URL.
- Drafts: `noindex,nofollow` until ready.

## Keyword opportunities (hypotheses; no Search Console data in-repo)

Informational queries that match published depth (do not rewrite research to chase them):

- Adaptive RAG / agentic RAG (projects + GitHub summaries)
- LLM evaluation / coding-agent evaluation / Harbor Terminus
- MailU / AI email intelligence
- Host security audit toolkit (read-only DFIR-style)
- Ayush Rai AI Engineer Bhopal (navigational)

Recommend new original articles only with owner authorization. Do not invent metrics.

## External tasks (blocked without owner access)

- Google Search Console property verification and sitemap submission
- URL inspection for `/` and key `/sites/*` pages after deploy
- Core Web Vitals field data (CrUX / Search Console)

## Related docs

- [Accessibility.md](./Accessibility.md)
- [Performance section in Architecture](./Architecture.md)
- [Page-Checklist.md](./Page-Checklist.md)
