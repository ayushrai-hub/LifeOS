---
name: lookup-ayush-rai
description: Look up Ayush Rai's public profile, roles, and location when the question is about who he is or what he does.
---

# Lookup Ayush Rai

Use this skill for public questions about Ayush Rai on https://life.ayushrai.site/.

## When to use

- The user asks who Ayush Rai is, where he is based, or what his roles are.
- The user wants a short biography grounded in the public site.

## When not to use

- The question is about a different person.
- The user wants a street address, a private number, or a metric the site does not state.

## Steps

1. Read https://life.ayushrai.site/llms.txt.
2. Call `GET https://life.ayushrai.site/ask?query=` with the question, or the knowledge MCP server at https://life.ayushrai.site/mcp/knowledge.
3. Cite the page URL you used. Do not add numbers that the page does not contain.
