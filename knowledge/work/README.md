# Work index

`work.json` is the single list behind `/sites/work`. It points at evidence; it does not hold case studies. Build with `npm run build:collections` (validates, then writes `sites/work/index.html`). `npm run check:collections` fails if the page is stale.

## Proof of work by role (`pow`)

`pow` is the only place the canonical role pages on www.ayushrai.site are listed. The builder renders them as "Proof of work by role" on `/sites/work` and rejects any `href` outside `https://www.ayushrai.site/`. Other pages link to `/sites/work#proof-of-work` rather than repeating these URLs.

| Field | Notes |
|-------|-------|
| `id` | kebab-case, referenced by entries' `pow` |
| `label` | Display name |
| `description` | One line, taken from what the destination page says about itself |
| `href` | Exact canonical URL. GTM is `https://www.ayushrai.site/gtm`, not `/pow/gtm` |

An entry's `pow` field names the role page that features it. Map a project only when that page actually shows it. An entry with `pow` and no `href` is itself the role page (the GTM engineering entry) and takes the role's URL.

## Entry fields

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | kebab-case, unique. Becomes the `#work-<id>` anchor. |
| `title` | yes | |
| `summary` | yes | One or two sentences. No metrics the linked page cannot back. `[label](href)` links allowed. |
| `category` | yes | One of the `categories[].id` values. Categories with no entries are hidden. |
| `status` | yes | A key of `statuses`: `live`, `public-code`, `synthetic-demo`, `completed`, `in-progress`. |
| `pow` | no | A `pow[].id` whose page features this project. Adds a "Proof of work" link. |
| `href` | yes, unless `pow` supplies it | The canonical page. Root-absolute (`/sites/...`) for pages here, `https://` for external ones. External pages show "on <host>". |
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
