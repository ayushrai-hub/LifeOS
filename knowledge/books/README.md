# Books

Books read or in progress; notes in `notes/`; queue in `reading-list/`.

## How to add

Copy `templates/book.md` / `book-notes.md`.

- Template: `knowledge/templates/book.md`
- Entity type: `book`
- One entity per file; kebab-case slug
- Link related projects, skills, people, events, media by `id`
- Prefer evidence over claims

## books.json

`books.json` is the list behind `/sites/books` ("Books and ideas"). Build with `npm run build:collections`. What I am reading right now goes in `knowledge/reading/currently-reading.json` instead; a book moves here once I can say what it changed.

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | kebab-case, unique |
| `title`, `author` | yes | |
| `status` | yes | `Reading`, `Re-reading`, `Finished`, `Paused` |
| `finishedAt` | if Finished | `YYYY`, `YYYY-MM`, or `YYYY-MM-DD` |
| `ideas` | no | Array of the book's main ideas, in my words |
| `takeaways` | no | What I took from it |
| `changedApproach` | no | What I now do differently. Published only with `"confirmedByOwner": true` |
| `connections` | no | Array, e.g. `["Business", "Public policy"]` |
| `sourceUrl` | no | Publisher or author page |
| `related` | no | `[{ "label", "href" }]` to notes, essays, or projects |

Do not list books I have not read, and do not say a book changed a decision unless that is true.

## Longevity

Add new files; do not rename folders. Archive superseded entities with `status: archived` and `supersedes` edges instead of deleting history.
