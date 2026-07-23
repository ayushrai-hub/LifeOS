# Folder Structure

## Repository layout

> Knowledge-first map: see [FILE_STRUCTURE.md](./FILE_STRUCTURE.md). `/knowledge` is the source of truth; `/sites` is a consumer.

```
/
├── knowledge/                 # SINGLE SOURCE OF TRUTH (entities, identity, graph)
├── docs/                      # Operating manuals (read these first)
│   └── checklists/            # Printable/review checklists
├── sites/                     # Published static sites (one folder per host)
│   ├── www/                   # example.com
│   ├── engineering/
│   ├── ai/
│   ├── ml/
│   ├── projects/
│   ├── writing/
│   ├── blog/
│   ├── notes/
│   ├── research/
│   ├── career/
│   ├── leadership/
│   ├── management/
│   └── books/
├── templates/                 # Starter HTML for new pages
│   ├── pages/
│   └── partials/
├── components/                # Reusable HTML snippets (copy or include)
├── includes/                  # Shared head/footer fragments
├── styles/                    # CSS architecture
│   ├── base/
│   ├── components/
│   ├── layouts/
│   └── themes/
├── scripts/                   # Minimal JS + local tooling
├── assets/
│   ├── images/
│   ├── fonts/                 # Self-hosted only if needed
│   └── icons/                 # Prefer none; text first
├── content/                   # Source drafts / markdown-like notes (optional)
│   ├── pages/
│   ├── portfolios/
│   ├── projects/
│   ├── writing/
│   ├── notes/
│   ├── research/
│   ├── career/
│   └── timeline/
├── data/                      # Structured JSON for indexes, search stub, site map curated
├── config/                    # Site config (domains, feature flags)
└── README.md
```

## Why this shape

- **`sites/`** scales to many hosts without mixing drafts and production HTML.
- **`docs/`** keeps institutional memory for years of contributors (including future-you).
- **`templates/`** prevents structural drift across hundreds of pages.
- **`content/`** holds pre-publish material; not all of it must ship.
- **`data/`** enables future search and indexes without a framework.

## Site folder conventions

```
sites/<name>/
├── index.html                 # site homepage
├── portfolio/                 # optional portfolio homepage + pages
├── case-studies/              # optional
├── notes/                     # optional
├── css -> ../../styles        # relative links to shared CSS (no symlink required)
└── …pages
```

Because static hosting may not support symlinks everywhere, pages reference shared CSS with relative paths such as `../../styles/main.css` depending on depth. Prefer a consistent depth or a documented path helper.

## Growth rules

1. New subdomain → new folder under `sites/`.
2. New page type → new file under `templates/pages/`.
3. New recurring UI pattern → document in CSS components; avoid one-off styles.
4. Do not create `utils/` dumping grounds.

## What not to add casually

- `node_modules/` for the core site
- CSS frameworks
- Compiled bundles as the only source

## Related docs

- [Architecture.md](./Architecture.md)
- [Naming-Conventions.md](./Naming-Conventions.md)
