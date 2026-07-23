# Quality Checklist

Use before marking any entity `published`.

## Structural

- [ ] File lives in the correct `/knowledge` folder
- [ ] Filename matches `slug`
- [ ] `id` is unique and correctly prefixed
- [ ] `type` matches entity catalog
- [ ] Required base metadata present
- [ ] `version`, `created`, `updated`, `author` set
- [ ] Schema fields valid (enums, dates ISO)

## Integrity

- [ ] No duplicate entity for the same real-world thing
- [ ] Relationship IDs resolve or are in review queue
- [ ] Media paths exist
- [ ] No secrets or confidential third-party data

## Evidence

- [ ] Non-trivial claims cite metrics, artifacts, or dated experience
- [ ] No buzzwords without backing
- [ ] Role in team outcomes is specific

## Search / SEO readiness

- [ ] `title`, `description`, `aliases`, `keywords`, `tags` useful and honest
- [ ] `seo` block present for public entities

## Freshness

- [ ] `last_reviewed` current for public facts that change (roles, links)
- [ ] Social URLs verified if `status: active`

## Consumer safety

- [ ] `visibility` matches intent
- [ ] `noindex` / unlisted handled for non-public renderings

## Related

- [CONTENT_CHECKLIST.md](./CONTENT_CHECKLIST.md)
