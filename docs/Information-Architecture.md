# Information Architecture

## Core idea

Knowledge is explored, not dumped.

The public should not see every page. The homepage exposes carefully chosen entry points. Deeper pages appear only through contextual links.

## Root site (`example.com` / `sites/www`)

Purpose: **orientation only**.

Contains:

- Name
- One short factual line about current focus
- Narrative intro with inline blue links into the knowledge graph
- Current focus, latest work, recently updated, contact

Does **not** contain:

- Full sitemap
- Mega-menu
- Project grids
- Blog feeds

## Site map (logical)

```
www                 curated doors (homepage index)
├── portfolios/     faceted craft portfolios (34+)
├── domains/        knowledge domain pages (40+)
├── career/         resumes (multiple), timeline, experience
├── certifications/ credential entities with evidence
├── technologies/   tool and platform entities
├── media/          photos, slides, videos, diagrams
├── engineering     systems notes + eng portfolio
├── ai              AI practice, evals, product implications
├── ml              models, training, data, experiments
├── projects        case studies index
├── writing         durable essays
├── blog            dated posts
├── notes           evergreen + working notes
├── research        papers, experiments, lit notes
├── leadership      teams, mentoring evidence
├── management      operating cadence, delivery
├── books           reading list + book notes
├── learning        stages, evidence, active study
├── gallery         photographic index
└── contact         channels
```

## Page types

| Type | Role in IA |
|------|------------|
| Site homepage | Local entry; sparse links into that domain |
| Hub | Small index of related pages (still not a dump) |
| Leaf | Atomic page: project, note, talk, book note, etc. |
| Portfolio homepage | Evidence-first overview of one identity facet |
| Case study | Deep project narrative |
| Timeline event | Point-in-time career/life node |

## Portfolios (multiple, independent)

Each portfolio has its own homepage and does not list other portfolios unless contextually relevant.

- Engineering
- AI
- Research
- Leadership
- Business
- Writing
- Teaching
- Open Source
- Optional: Photography, Life Timeline, Reading, Learning, Travel, Speaking

Portfolios may live under a site (`/sites/engineering/portfolio/`) or as dedicated sites later. Prefer nesting first; promote to subdomain only when the corpus is large.

## Visibility tiers

| Tier | Meaning | Example |
|------|---------|---------|
| Public-curated | Linked from root or site home | Featured case studies |
| Public-reachable | Not on home; linked from other pages | Deep tech notes |
| Unlisted | Valid URL, no inbound public links yet | Draft-quality pages marked clearly |
| Private / local-only | Not deployed | `/content` drafts |

Never rely on “security through obscurity” for secrets. Unlisted ≠ confidential.

## Contextual connection (knowledge graph)

Example chain:

`Project case study` → `Technology page` → `Blog on architecture` → `Book that inspired it` → `Career milestone` → `Failure note` that changed the approach

Each link must be useful in context. Decorative link farms are banned.

## URL design

- Lowercase kebab-case: `/projects/search-latency-rewrite/`
- Stable slugs; redirects if rename is unavoidable
- Dates in blog paths optional: `/blog/2024/recipe-for-evals/`
- Avoid query params for content identity

## Local vs production IA

Locally, browse via paths:

`/sites/www/index.html`  
`/sites/projects/case-studies/example-project.html`

In production, same files map to hostnames. Internal links should eventually use absolute canonical hosts; during local preview, relative links within a site are preferred, with documented cross-site relative roots.

## Related docs

- [Linking-Strategy.md](./Linking-Strategy.md)
- [Architecture.md](./Architecture.md)
- [Folder-Structure.md](./Folder-Structure.md)
