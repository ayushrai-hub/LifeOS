# GitHub knowledge index

Normalized GitHub layer for **ayushrai-hub**. The website should consume these files later; it must not scrape GitHub again.

## Layout note

Requested shape included both `repositories/<slug>.md` and `repositories/<slug>/…`.  
On this filesystem a file and folder cannot share the same name, so each repo entity lives at:

```
knowledge/github/repositories/<slug>/summary.md      # entity (required fields)
knowledge/github/repositories/<slug>/README-extract.md
```

Treat `summary.md` as the repository entity file.

## Counts (ingest 2026-07-23)

| Metric | Count |
|--------|------:|
| Public repos | 72 |
| Forks | 2 |
| README present | 45 |
| README missing | 27 |
| Portfolio verdict showcase | 9 |
| Portfolio verdict conditional | ~8 (see reports) |

## All repositories

| Repo | Lang | Stars | README | Portfolio | Path |
|------|------|------:|--------|-----------|------|
| adaptive-rag | Python | 0 | ok | showcase | [summary](./repositories/adaptive-rag/summary.md) |
| RLHF-tasks | Python | 0 | ok | showcase | [summary](./repositories/rlhf-tasks/summary.md) |
| OpenAI-RLHF | Python | 0 | ok | showcase | [summary](./repositories/openai-rlhf/summary.md) |
| IAS-system | Python | 0 | ok | showcase | [summary](./repositories/ias-system/summary.md) |
| SoPia | Python | 0 | ok | showcase | [summary](./repositories/sopia/summary.md) |
| FileU | Python | 1 | ok | showcase | [summary](./repositories/fileu/summary.md) |
| amex | Python | 0 | ok | showcase | [summary](./repositories/amex/summary.md) |
| security-audit | Shell | 0 | ok | showcase | [summary](./repositories/security-audit/summary.md) |
| chatbot | JavaScript | 0 | ok | showcase | [summary](./repositories/chatbot/summary.md) |
| kyc-compliance-system | TypeScript | 0 | ok | conditional | [summary](./repositories/kyc-compliance-system/summary.md) |
| MailU | Python | 0 | ok | showcase | [summary](./repositories/mailu/summary.md) |
| hiring_intellgence | Python | 0 | ok | conditional | [summary](./repositories/hiring_intellgence/summary.md) |
| WeCare | TypeScript | 0 | ok | conditional | [summary](./repositories/wecare/summary.md) |
| Shiksha-Mitra | TypeScript | 0 | ok | conditional | [summary](./repositories/shiksha-mitra/summary.md) |
| my-learning | Python | 0 | ok | conditional | [summary](./repositories/my-learning/summary.md) |
| ayush-work | HTML | 0 | ok | conditional | [summary](./repositories/ayush-work/summary.md) |
| Expert-O | HTML | 0 | ok | low | [summary](./repositories/expert-o/summary.md) |
| ClubMe | JavaScript | 0 | ok | low | [summary](./repositories/clubme/summary.md) |
| DriveDoo | Python | 0 | ok | hide | [summary](./repositories/drivedoo/summary.md) |
| code2022 | Python | 0 | ok | hide | [summary](./repositories/code2022/summary.md) |
| Karm |; | 0 | ok | hide | [summary](./repositories/karm/summary.md) |
| system-prompts-and-models-of-ai-tools |; | 0 | ok | hide (fork) | [summary](./repositories/system-prompts-and-models-of-ai-tools/summary.md) |
| Python_Cheat_Sheet_Dr_AngShuMan_Ghosh |; | 0 | missing | hide (fork) | [summary](./repositories/python-cheat-sheet-dr-angshuman-ghosh/summary.md) |
| Emailify |; | 0 | missing | review | [summary](./repositories/emailify/summary.md) |
| gitutorialdemo |; | 1 | ok | low | [summary](./repositories/gitutorialdemo/summary.md) |

Remaining repos (thin / missing README / minor) each have a folder under `repositories/`. Full machine index: `data/imports/github-knowledge-index.json`.

## Reports

- [top-repos.md](./reports/top-repos.md)
- [portfolio-worthiness.md](./reports/portfolio-worthiness.md)
- [review-needed.md](./reports/review-needed.md)
- [missing-readmes.md](./reports/missing-readmes.md)
- [duplicate-or-near-duplicate-repos.md](./reports/duplicate-or-near-duplicate-repos.md)

## Profile

- [profile.md](./profile.md)
