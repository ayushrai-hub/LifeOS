# Migration report: ayushrai.site → repository

Date: 2026-07-23  
Source: https://www.ayushrai.site/  
Destination: `sites/migrated/**` (not linked from `sites/www`)

## Crawl summary

| Fact | Detail |
|------|--------|
| App type | Vite SPA; all probed paths return the same shell HTML |
| Routes in JS bundle | `/`, `/certifications`, `/extracurriculars`, `/leadership`, `/research`, `/services` |
| robots.txt | Allows `/`; sitemap URL pointed at missing Netlify sitemap |
| Analytics | Google Tag Manager / gtag present on live site (not copied here) |
| Provenance note | `data/imports/ayushrai-site-crawl/PROVENANCE.md` |

Content was extracted from rendered route documents and the main JS bundle (emails, phones, Drive verification URLs, social links).

## Extraction rules

Kept:

- Roles, orgs, date ranges, locations
- Education programs, scores, coursework lists as published
- Project and product descriptions stripped of hype adjectives
- Certification titles, providers, dates, skill tags, Drive links
- Leadership roles and extracurricular entries
- Service names, durations, starting prices as published
- Contact channels published on the site

Removed or refused:

- Empty marketing metrics (for example “100% Success”, “24/7 Support”, “100% Commitment”)
- Buzzword-heavy slogans and polymath branding copy
- Inferred facts not present on the source
- Homepage / nav wiring into this knowledge homepage

Quantitative research/leadership claims (accuracy percentages, participant counts) were retained only as **source-attributed** statements, not as verified repository facts.

## Output inventory

About 60 HTML pages under `sites/migrated/`:

- Person: about, contact, skills, timeline
- Career: 6 experience pages, 3 education pages
- Work: 6 projects, 2 products, services, 7 certifications, 3 research, awards
- Community: 6 leadership roles, 9 extracurriculars
- Index: `sites/migrated/index.html`

Generator: `scripts/migrate-ayushrai-site.ps1`.

## Conflicts with knowledge base

| Topic | Live site | Knowledge base |
|-------|-----------|----------------|
| Email | `ayushrai0211@gmail.com` | Gmail primary (`contact.email-gmail`); Proton archived (secondary email: none) |
| Tone | Portfolio marketing SPA | Evidence-first knowledge system |
| Stack | Next/React/Tailwind SPA | Static HTML/CSS consumer |

Both emails are documented; do not silently drop either without owner confirmation.

## Next steps (not done)

1. Promote high-confidence migrated pages into `/knowledge` entities.
2. Add contextual inline links from public hubs (still **not** from homepage until curated).
3. Verify research metrics and award claims with primary evidence.
4. Replace Drive-only certificates with local media entities when files are archived.

## Related

- [CONTENT_MAP.md](./CONTENT_MAP.md)
- [PAGES.md](./PAGES.md)
- [CHANGELOG.md](./CHANGELOG.md)
