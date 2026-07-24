# README extract; MailU

## Source
Pulled from repository README.md via GitHub API during knowledge ingest.
Do not treat this file as a verbatim copy of the full README.

## Project self-description (condensed)
Opening of README (truncated for orientation; not a full quote dump):

```
# MailU - AI-Powered Email Intelligence System


- Wait for explicit confirmation before proceeding

An intelligent email management system that extracts, categorizes, and provides AI-powered search and chat capabilities for your Gmail account.

## Features
```

## Stated purpose (normalized)
Search and chat over personal email privately on-machine.

## Features / capabilities mentioned
- 🔐 Gmail API Integration: Secure OAuth authentication and email extraction
- 🏷️ Smart Categorization: Automatic email categorization using zero-shot classification
- 💬 RAG-Powered Chat: Ask questions about your emails using natural language
- 🔍 Semantic Search: Find emails by meaning, not just keywords
- 📊 Analytics & Reports: Generate summaries and insights from your email data
- 🎯 Local-First: Runs entirely on your machine with Ollama for privacy

## Architecture / structure notes
Stack mentioned or implied: Python, FastAPI, Streamlit, ChromaDB, sentence-transformers, Ollama, Gmail API

## Setup / usage (only if useful)
Recorded in summary.md when the README provides a clear run path. Details omitted here to avoid dumping install scripts.

## Demos / screenshots
No clear screenshot/demo section detected in README text scan.

## Unique engineering decisions (README-backed only)
Solid applied RAG + privacy story; setup docs exist.

## Claims to treat carefully
README has an orphan line (“Wait for explicit confirmation…”); Python 3.14 claim may be aspirational/odd; scale claims (21k emails) are usage notes not verified here.
