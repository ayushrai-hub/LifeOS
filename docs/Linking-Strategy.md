# Linking Strategy

## Philosophy

Links are how knowledge is discovered. Menus that list everything destroy the sense of intentional exploration.

## Rules

1. **Curate at the edges.** Root and site homepages link to few things.
2. **Connect in the middle.** Case studies, notes, and essays should reference related pages.
3. **No orphan important pages.** If a page matters, something public should reach it; but not necessarily the homepage.
4. **No link dumps.** A “related” section should be short and justified.
5. **Prefer descriptive link text.** Avoid “click here.” Use the name of the artifact.
6. **Underline links.** Style them as quiet text links (see CSS). No buttonization.
7. **External links** may use clear text; optional `rel` attributes when appropriate (`noopener` for `target=_blank`, which itself is rarely needed).

## Homepage linking budget

Root homepage: typically **5–12** links total.

Site homepage: typically **3–15** links, grouped by tiny headings if needed.

If you need more, you probably need a hub page one level down; still curated.

## Cross-site links

When linking from `projects.` to `books.`:

- Make the relationship explicit in surrounding prose.
- Use absolute production URLs in published pages when domains exist.
- For local preview, relative paths across `/sites/...` are acceptable.

Example prose:

> The caching approach was influenced by notes on [*Designing Data-Intensive Applications*](../books/ddia.html).

## Knowledge graph patterns

Recommended edges:

| From | To |
|------|----|
| Project | Technologies, blog, research, career event, failure |
| Blog | Projects, books, notes |
| Talk | Slides, video, related project |
| Experience | Projects shipped in that role |
| Book note | Projects/ideas influenced |
| Failure | What changed afterward |

## Invisible ≠ abandoned

Unlisted pages can exist. Periodically review whether they should be linked, merged, or removed.

## Anti-patterns

- Footer sitemap of every page
- Sidebar of all categories
- Tag clouds
- Auto “you may also like” widgets with weak relevance

## Future search

Search will query titles, descriptions, headings, and tags; not replace curated linking. Linking remains the primary human navigation.

## Related docs

- [Information-Architecture.md](./Information-Architecture.md)
- [Design-Principles.md](./Design-Principles.md)
