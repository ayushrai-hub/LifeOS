# Adding work, books, people, and stories

How to add content to the sections added in October 2026. Every path below is in this repository. Anything committed under `knowledge/` is publicly fetchable on the deployed site, so keep private drafts and manuscripts out of the repository.

## Map

| Public URL | Source | How it is built |
|------------|--------|-----------------|
| `/about` | `about/index.html` (+ `about/index.md`) | Hand-written. The "Explore" section is the site map. |
| `/about/story` | `about/story/index.html` (+ `index.md`), facts in `knowledge/person/personal-story.md` | Hand-written |
| `/sites/work` | `knowledge/work/work.json` | `npm run build:collections` |
| `/sites/work/public-policy` | `sites/work/public-policy/index.html`, facts in `knowledge/events/gctp-2025.md` | Hand-written |
| `/sites/interests` | `sites/interests/index.html` | Hand-written |
| `/sites/books` | `knowledge/books/books.json` | `npm run build:collections` |
| `/sites/influences` | `knowledge/influences/people.json` | `npm run build:collections` |

GTM engineering stays canonical at https://www.ayushrai.site/gtm. The work index links to it; do not copy its content here.

## 1. A proof-of-work project

1. Add an entry to `knowledge/work/work.json` (fields in `knowledge/work/README.md`).
2. If the project needs a full case study on this site, copy `templates/pages/project-case-study.html` to `sites/work/<slug>/index.html`, fill only the sections you can support, and set the entry's `href` to `/sites/work/<slug>`.
3. Run `npm run build:collections`.

## 2. A book and its notes

1. Add an entry to `knowledge/books/books.json` (fields in `knowledge/books/README.md`).
2. If you are only reading it now, use `knowledge/reading/currently-reading.json` and `npm run build:reading` instead.
3. Run `npm run build:collections`.

## 3. A person you admire

1. Add an entry to `knowledge/influences/people.json` (fields and rules in `knowledge/influences/README.md`). Facts need `sources`.
2. Run `npm run build:collections`.

## 4. A public-policy case study

1. Record the facts in `knowledge/events/` (copy `knowledge/events/gctp-2025.md`).
2. For a single programme, extend `sites/work/public-policy/index.html`. When there are several, copy it to `sites/work/public-policy/<slug>/index.html` and link each one from the parent page.
3. Add or update the `public-policy` entry in `knowledge/work/work.json`.
4. Never write that a proposal was adopted or implemented without evidence.

## 5. An essay or travel reflection

1. Copy `templates/pages/blog-post.html` to `sites/writing/<slug>/index.html` (essays) or `sites/interests/travel/<slug>/index.html` (travel).
2. Use root-absolute links (`/sites/...`). Relative `../` links break on slashless URLs.
3. Link it from `/sites/writing` or the Travel section of `/sites/interests`. Essays that answer one of the "Questions I keep returning to" should be linked from that list on `/about/story`.

## 6. An ongoing project

Update the "Ongoing projects" section of `sites/interests/index.html` and the matching `ongoing` entry in `knowledge/work/work.json`. Keep "in progress" wording until there is something public. Do not announce dates before they are certain.

## After any hand-written page is added

1. Add it to `config/seo-pages.json` (`file`, `path`, unique `title`, `description`).
2. `npm run build:seo` (meta, collections, homepage, sitemap).
3. Add a markdown twin: `node scripts/build-markdown-twins.js` for pages under `sites/`, then discard twins for pages you did not touch; write `index.md` by hand for pages outside `sites/`.
4. Add the page to `llms.txt` if agents should find it.
5. `npm run qa && npm run check:seo && npm run check:collections`.
