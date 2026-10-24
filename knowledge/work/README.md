# Work index

`work.json` is the single list behind `/sites/work`. It points at evidence; it does not hold case studies. Build with `npm run build:collections` (validates, then writes `sites/work/index.html`). `npm run check:collections` fails if the page is stale.

## Entry fields

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | kebab-case, unique. Becomes the `#work-<id>` anchor. |
| `title` | yes | |
| `summary` | yes | One or two sentences. No metrics the linked page cannot back. `[label](href)` links allowed. |
| `category` | yes | One of the `categories[].id` values. Categories with no entries are hidden. |
| `status` | yes | A key of `statuses`: `live`, `public-code`, `synthetic-demo`, `completed`, `in-progress`. |
| `href` | yes | The canonical page. Root-absolute (`/sites/...`) for pages here, `https://` for external ones. External pages show "on <host>". |
| `date` | no | `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`. |
| `role` | no | Short, factual. |
| `links` | no | `[{ "label": "GitHub", "href": "https://..." }]` |
| `related` | no | Other entry ids. |
| `featured` | no | `true` lists it under "Start here". Keep this to four or five. |

## Deciding where a project lives

1. A complete page already exists (here or on ayushrai.site): add an entry whose `href` is that page. Do not copy it.
2. It needs a case study here: copy `templates/pages/project-case-study.html` into `sites/work/<slug>/index.html`, add it to `config/seo-pages.json`, and point `href` at it.
3. It is only a repository: link the repository and say so with `public-code`.

## Adding a new category

Append to `categories` with `id`, `label`, and a one-line `description`. Order in the array is the order on the page.
