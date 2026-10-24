# Influences

`people.json` is the list behind `/sites/influences`: people across society, business, and leadership whose work I study. Build with `npm run build:collections`.

Each entry keeps facts and interpretation apart. The builder rejects an entry without sources for the factual part, and rejects a name with no ideas or lessons attached.

## Entry fields

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | kebab-case, unique |
| `name` | yes | |
| `field` | yes | e.g. "Business", "Public service", "Corporate leadership" |
| `contribution` | yes | What they did. Facts only, each one supportable by `sources`. |
| `sources` | yes | `[{ "label": "...", "href": "https://..." }]`, authoritative where possible |
| `ideas` | one of | Ideas, decisions, or principles I find useful |
| `lessons` | one of | What I have learned from studying their work |
| `influence` | no | How it shows up in my decisions and projects. Only what is true. |
| `related` | no | Links to my notes or projects: `[{ "label", "href" }]` |

## Rules

- No relationship is implied. If I have actually met or worked with someone, say so in `contribution` or `influence` explicitly.
- No invented quotations. Quote only with a source link.
- Not a biography. If a sentence would fit on their Wikipedia page and says nothing about why it matters to me, cut it.

## Example

```json
{
  "id": "example-person",
  "name": "Example Person",
  "field": "Business",
  "contribution": "Founded X in 1999 and led it through Y.",
  "sources": [{ "label": "Company history", "href": "https://example.com/history" }],
  "ideas": "The decision to ...",
  "lessons": "I learned to ...",
  "related": [{ "label": "RevenueRoles", "href": "/sites/work#work-revenueroles" }]
}
```
