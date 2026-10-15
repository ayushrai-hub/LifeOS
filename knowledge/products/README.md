# Products

Products shipped or in progress (distinct from raw project case studies when product framing helps).

## Active / building (public SaaS)

| Product | Live | Source |
|---------|------|--------|
| [Shiksha-Mitra](./shiksha-mitra.md) | [shiksha-mitra.vercel.app](https://shiksha-mitra.vercel.app/) | [GitHub](https://github.com/ayushrai-hub/Shiksha-Mitra) |
| [RevenueRoles](./revenueroles.md) | [revenueroles.in](https://revenueroles.in/) | [GitHub `apps/web`](https://github.com/ayushrai-hub/RevenueRoles/tree/main/apps/web) |

## AI systems (owner-canonical product framing)

Discoverability layer; engineering depth lives on linked projects / experience.

| Product | Linked evidence |
|---------|-----------------|
| [Agentic RAG platform](./agentic-rag-platform.md) | `project.adaptive-rag` |
| [AI email intelligence system](./ai-email-intelligence.md) | `project.mailu` |
| [LLM evaluation infrastructure](./llm-evaluation-infrastructure.md) | `project.openai-rlhf` |
| [AI-assisted decision platform](./ai-assisted-decision-platform.md) | `experience.focdot-software-developer` |
| [Prompt evaluation pipeline](./prompt-evaluation-pipeline.md) | expertise + OpenAI-RLHF |
| [Human feedback workflow](./human-feedback-workflow.md) | `expertise.rlhf-and-model-evaluation` |
| [AI readiness assessment framework](./ai-readiness-assessment-framework.md) | FoCDoT experience |

## How to add

Copy `templates/product.md`. Link `project.*` for engineering depth.

- Template: `knowledge/templates/product.md`
- Entity type: `product`
- One entity per file; kebab-case slug
- Link related projects, skills, people, events, media by `id`
- Prefer evidence over claims

## Longevity

Add new files; do not rename folders. Archive superseded entities with `status: archived` and `supersedes` edges instead of deleting history.
