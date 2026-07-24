# Content map

Maps topics to repository paths and provenance. Prefer knowledge entities when both exist.

## Person

| Topic | HTML | Knowledge / data |
|-------|------|------------------|
| Profile | `sites/www/`, `sites/migrated/about/` | `knowledge/person/profile.yaml` |
| Contact | `sites/contact/`, `sites/migrated/contact/` | `knowledge/contact/`, `knowledge/social/` |
| Portrait | `sites/gallery/` | `knowledge/media/photos/ayush-rai-workspace-2024.md` |
| Skills (tags) | `sites/migrated/skills/` | future `knowledge/skills/` |

## Career

| Topic | HTML | Notes |
|-------|------|-------|
| Experience roles | `sites/migrated/experience/*` | FoCDoT, Outlier, RaSoR, UiPath, Salesforce, Kanha House |
| Education | `sites/migrated/education/*` | LNCTS B.Tech, IITM BS, Higher Secondary |
| Resumes | `sites/career/resumes/*` | Multiple lenses; body TBD from knowledge |
| Timeline | `sites/migrated/timeline/`, `sites/timeline/` | Migrated chronology vs hub stub |

## Projects and products

| Topic | HTML |
|-------|------|
| Featured projects | `sites/migrated/projects/*` |
| Showcase repos | `sites/projects/` (GitHub ingest) |
| Products | `sites/migrated/products/*` (Open Framework, AyushMushrooms) |

## Research, awards, certifications

| Topic | HTML |
|-------|------|
| Research projects | `sites/migrated/research/*` |
| Awards | `sites/migrated/awards/` |
| Certifications | `sites/migrated/certifications/*` + Drive verify links |

## Community

| Topic | HTML |
|-------|------|
| Leadership roles | `sites/migrated/leadership/*` |
| Extra-curriculars | `sites/migrated/extracurriculars/*` |
| Services | `sites/migrated/services/` |

## Domains and portfolios

Catalog-driven doorways (`sites/domains/*`, `sites/portfolios/*`) are scaffolds for evidence. They do not yet auto-ingest migrated facts.

## Source precedence

1. Verified knowledge entities with evidence
2. GitHub ingest under `knowledge/github/`
3. Migrated pages from ayushrai.site (staging; claims marked as source-published)
4. Marketing aggregates on the live SPA (dropped during migration)

## Related

- [MIGRATION_REPORT.md](./MIGRATION_REPORT.md)
- [KNOWLEDGE_GRAPH.md](./KNOWLEDGE_GRAPH.md)
