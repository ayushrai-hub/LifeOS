# Reading

What is being read, finished, or parked. Book entities live in `books/`; this layer tracks reading posture and lists.

## How to add

Add list entries under `lists/`; deep notes under `notes/` or `books/notes/`.

- Template: `knowledge/templates/reading-list.md`
- Entity type: `reading_list`
- One entity per file; kebab-case slug
- Link related projects, skills, people, events, media by `id`
- Prefer evidence over claims

## Longevity

Add new files; do not rename folders. Archive superseded entities with `status: archived` and `supersedes` edges instead of deleting history.

## Currently Reading log

Public page: `/sites/currently-reading/` (linked from the homepage doors, Recently Updated, `/sites/reading/`, and `/sites/learning/`).

| Piece | Path | Edit? |
|-------|------|-------|
| Data (source of truth) | `knowledge/reading/currently-reading.json` | Yes |
| Entry template | `knowledge/templates/reading-log-entry.json` | Only if the schema changes |
| Renderer + validator | `scripts/build-reading.js` | Only if the schema changes |
| Generated page | `sites/currently-reading/index.html` | Never by hand |
| Styles | `styles/site.css` (`.reading-*`) | Only if the schema changes |

### Update workflow (for Instinct or by hand)

1. Add or edit an object in `entries` of `knowledge/reading/currently-reading.json`. Start from the template.
2. Set the top-level `updated` to today (`YYYY-MM-DD`).
3. Run `npm run build:reading`. It validates the data, regenerates `sites/currently-reading/index.html`, and refreshes the homepage Recently Updated line.
4. Commit the JSON and the regenerated HTML together (plus `sites/www/index.html` and `data/home.json` if they changed). Pushing to `main` deploys on Vercel.

`npm run check:reading` fails if the data is invalid or the committed HTML is stale. GitHub Actions (`.github/workflows/currently-reading.yml`) runs it whenever the data, renderer, or page changes.

### Entry fields

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | kebab-case, unique; becomes the page anchor (`#id`) |
| `title` | yes | |
| `author` | yes | Author, editor, or creator as credited by the source |
| `type` | yes | `Paper`, `Book`, `Documentation`, `Technical Article`, `Research Report`, `Course`, `Lecture`, `GitHub Repository`, `Specification`, `Tutorial`, `Other` |
| `source` | yes | Where it is read from (arXiv, O'Reilly, official docs) |
| `sourceUrl` | no | `https://` link to the original resource |
| `status` | yes | `Reading`, `In Progress`, `Re-reading`, `Applying`, `Finished` |
| `startedAt` | yes | `YYYY-MM-DD` or `YYYY-MM` (use month precision if the day is unknown) |
| `completedAt` | when Finished | Same format, or `null` |
| `tags` | no | Array of short lowercase strings |
| `whyReading` | no | 2 to 4 sentences |
| `whatLearning` | no | 2 to 5 sentences; concrete concepts, not praise |
| `changedUnderstanding` | no | The mental model or design assumption that shifted |
| `whatApplying` | no | Empty renders "Nothing applied yet." Never invent application |
| `whatBuilt` | no | Empty omits the section. A value also adds a Built From Reading card |
| `projectTitle` | no | Heading for the Built From Reading card |
| `projectUrl` | no | `https://` or in-site path relative to `sites/currently-reading/` (e.g. `../projects/index.html`) |
| `githubUrl` | no | `https://` link to the repository |
| `buildInfluence` | no | The specific technical or design influence on the build; falls back to `changedUnderstanding` |
| `takeaway` | no | One-paragraph summary shown in Finished; falls back to `whatLearning` |

Text fields accept plain text. A blank line starts a new paragraph. Inline links use `[label](https://...)`. Em dashes fail validation (site rule); use commas, semicolons, or periods.

Placement is automatic: `Finished` goes to the Finished archive (newest `completedAt` first); every other status goes to Currently Reading (newest `startedAt` first).

### Learning topics

`learning` holds the broader areas shown in the Learning section: `topic`, one-line `description`, optional `href` (relative to `sites/currently-reading/`), and `related` (entry `id`s that feed the topic).

### Rules

- Only log resources actually being read. No invented titles, dates, authors, conclusions, or builds.
- Keep each entry readable in under a minute. Depth belongs in linked notes and projects.
