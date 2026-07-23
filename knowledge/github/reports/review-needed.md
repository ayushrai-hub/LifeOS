# Review needed

Items that need a human pass before website use or before trusting claims.

## High priority

| Item | Issue | Action |
|------|-------|--------|
| kyc-compliance-system | README KPIs look target-like, not measured | Confirm whether metrics were ever measured; rewrite claims |
| MailU | Orphan README line; Python 3.14 note; “21k emails” | Verify runtime + remove broken prose |
| Expert-O | Hype-heavy positioning | Either evidence the platform or demote permanently |
| RLHF-tasks ↔ Snorkel/Terminus | Platform relationship unclear | Document role (author/contributor/contractor) only if true |
| IAS-system ↔ SoPia | Domain overlap | Write a short differentiation note for the graph |
| WeCareNGO | No README; TypeScript sibling of WeCare | Inspect code or hide |
| Emailify | Description interesting; README missing | Restore README or mark abandoned |
| Auto-Latex-resume | No README | Inspect or hide |
| EdA / Code-repo-data / old-data-restore / all_proj_learning / stock-price-analysis / DSA-tracker / retailPriceOptiimization | Missing README | Triage keep vs archive |
| diya | forks_count=1, no README | Inspect why forked by others |

## Medium priority

| Item | Issue | Action |
|------|-------|--------|
| DriveDoo | Broken badge markdown; mega-dump | Split or stop linking |
| code2022 | Nested copies of other projects | Deduplicate references |
| my-learning vs Karm | Near-duplicate branding | Canonicalize to one curriculum entity |
| OpenAI-RLHF name | Misleading vs contents | Always pair with “not RLHF training” |
| hiring_intellgence | Typo in repo name | Note canonical spelling in knowledge only |
| ClubMe | Pre-launch vs “booking platform” wording | Keep status = pre-launch marketing |
| treeking-management-app | Recent push; modest README | Skim code quality before promote |
| security-audit | CI badge present | Confirm CI still green |
| adaptive-rag | Marketing tone in README | Tone down for site case study |

## Graph / metadata gaps

- Git **tree** API rate-limited (403) during ingest; code-structure evidence incomplete.
- GitHub **topics** mostly empty on repos; tags in knowledge are curator-assigned from README/stack.
- No link yet from repos → writings/talks (none found in repo metadata).

## Suggested review order

1. adaptive-rag, RLHF-tasks, IAS-system, SoPia (showcase polish)
2. kyc-compliance-system, MailU (claim hygiene)
3. Missing-README triage (archive vs restore)
4. Duplicate families (food blogs, portfolios, aggregates)
