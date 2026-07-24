---
id: learning.learning-methodology
type: learning_profile
title: Learning methodology
slug: learning-methodology
status: review
visibility: private
created: 2026-07-23
updated: 2026-07-23
author: person.owner
version: 0.1.0
---

# How I learn (evidence-inferred)

Not generic productivity advice. Only practices with artifacts.  
Missing practices stay as placeholders.

## Observed practices (with evidence)

### 1. Learn by building full repositories

- **Evidence:** 72 public repos spanning RAG systems, eval toolchains, compliance apps, React products, CLIs.
- **Pattern:** New interest → dedicated repo + README describing problem/stack.
- **Stage implication:** Building proves **Practicing/Applying**, not mastery.

### 2. Document architecture before or while shipping

- **Evidence:** `IAS-system` `docs/` (PRD, architecture, security, API, testing, phases); `OpenAI-RLHF` multi-doc set clarifying scope; `adaptive-rag` structured feature/architecture sections; `SoPia` ARCHITECTURE/SETUP/API_SPEC.
- **Pattern:** Prefer markdown system docs over undocumented dumps (when a project matters).

### 3. Prefer explicit constraints and safety defaults

- **Evidence:** FileU dry-run + hash verify; security-audit read-only model; SoPia/chatbot anti-hallucination designs; amex “no proxy-target ML” rule.
- **Pattern:** Learning shows up as **constraint design**, not only feature lists.

### 4. Encode workflows as CLIs and checklists

- **Evidence:** `RLHF-tasks` `scripts/terminus` (validate/audit/review/oracle/agent/zip); hiring workbook CLI; MailU verify scripts.
- **Pattern:** Turn repeated work into commands and checklists.

### 5. Use Docker / reproducible environments for serious eval work

- **Evidence:** Terminus Docker task environments; chatbot Docker + nginx path.
- **Pattern:** When correctness matters, containerize.

### 6. Write curricula / teaching-shaped materials

- **Evidence:** `my-learning` Tech-Arsenal/Karm curriculum; `gitutorialdemo`.
- **Caution:** Curriculum writing shows interest in **Teaching materials**, not proof that teaching occurred or that listed competencies were achieved personally.

### 7. Maintain commit cadence habit

- **Evidence:** `daily-commit-work` recent pushes.
- **Caution:** Cadence ≠ learning topic.

### 8. Full-stack loops (API + UI)

- **Evidence:** FastAPI+Streamlit/React patterns across adaptive-rag, IAS, SoPia, MailU, WeCare, chatbot.
- **Pattern:** Often ship a thin UI beside the backend.

## Practices with insufficient evidence (placeholders)

| Practice | Status |
|----------|--------|
| Reading and annotating papers | [PLACEHOLDER; no lit notes in KB] |
| Long-form technical blogging | [PLACEHOLDER; Netlify unaudited; no posts in KB] |
| Teaching live cohorts / mentoring logs | [PLACEHOLDER] |
| Spaced repetition / Anki | [PLACEHOLDER] |
| Reverse-engineering proprietary systems | [PLACEHOLDER; fork of prompt dump is not reverse engineering practice] |
| Benchmarking publicly with leaderboards | Partial via Harbor runs; publishable tables [PLACEHOLDER] |
| Comparing multiple implementations systematically | Hinted by IAS vs SoPia tension; write-up [PLACEHOLDER] |
| Breaking systems apart / chaos testing | Mentioned in curriculum text only; not evidenced in dedicated chaos repos |

## Anti-patterns visible in the corpus (for self-correction)

- Many thin/duplicate repos dilute signal (food blogs, portfolio twins, empty stubs).
- Occasional marketing tone and aspirational KPIs (`Expert-O`, KYC) conflict with evidence-based positioning.
- Misleading names (`OpenAI-RLHF`, “chatbot” without LLM) require constant disambiguation; good that some READMEs already correct this.

## Operating rule going forward

New learning → create/update:

1. Domain page under `learning/domains/`
2. Edge(s) in `relationships/edges.yaml`
3. Row in `currently-learning.md` or `history/YYYY-MM.md`
4. Link from related `github.repo.*` / project entities
