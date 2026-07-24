# Writing Guidelines

## Absolute rule

Every sentence must earn its existence.

If removing a sentence does not reduce clarity or evidence, delete it.

## Show, never tell

| Do not write | Write instead |
|--------------|---------------|
| I am a leader | Led a team of N across M projects; mentored K people |
| I am good at AI | Built X; measured Y; published Z |
| I communicate well | Talks: [list]. Docs: [list]. Courses: [list] |
| Passionate about learning | Completed N courses; notes at [link]; taught [topic] |
| Results-driven engineer | Reduced latency from A to B; cut cost by C% |

## Forbidden voice patterns

Avoid unless literally quoting someone else or naming a product:

- passionate, enthusiastic, results-driven, hardworking, dynamic, innovative
- “world-class”, “cutting-edge”, “synergy”, “leverage”, “disrupt”
- Motivational quotes as decoration
- Corporate fluff and empty adjectives
- Fake confidence (“I uniquely…”, “I always…”)
- AI-sounding filler (“In today’s rapidly evolving landscape…”)

## Preferred sentence shape

1. Concrete subject
2. Specific action or decision
3. Constraint or context
4. Outcome with number or artifact when available

Example:

> We needed search latency under 100ms on a 12M document corpus. We replaced the naive scan with an inverted index and sharded by tenant. p95 dropped from 840ms to 72ms. Tradeoff: colder documents require a second-tier fetch.

## Structure for knowledge pages

Most substantive pages should answer:

1. What did I build / do?
2. What problem existed?
3. How was it solved?
4. What was learned?
5. What changed because of it?
6. What metrics moved?
7. What evidence exists (links, repos, talks, docs)?

## Length

- Prefer short paragraphs (1–4 sentences).
- Prefer lists when enumerating evidence.
- Prefer one idea per section.
- Do not pad to look “complete.” Incomplete with a placeholder is better than invented completeness.

## Placeholders

When facts are missing:

```
[PLACEHOLDER: role title at Company X, dates]
```

Never invent employment, metrics, or quotes.

## First person

Allowed and preferred for personal pages. Keep it calm and precise.

“I” is fine. “We” is fine when describing teams. Avoid false humility theater and avoid swagger.

## Editing checklist (quick)

- [ ] Any adjective without evidence?
- [ ] Any claim that could be a link/metric instead?
- [ ] Any sentence that only fills space?
- [ ] Would a skeptical reader believe this page?
- [ ] Does it sound like a human who did the work?

## Related docs

- [Voice-and-Tone.md](./Voice-and-Tone.md)
- [Content-Rules.md](./Content-Rules.md)
- [Page-Checklist.md](./Page-Checklist.md)
