# README extract; hiring_intellgence

## Source
Pulled from repository README.md via GitHub API during knowledge ingest.
Do not treat this file as a verbatim copy of the full README.

## Project self-description (condensed)
Opening of README (truncated for orientation; not a full quote dump):

```
# Hiring Intelligence

A **file-based** Python project for organizing AI/ML hiring research: contacts, companies, agencies, platforms, communities, outreach tracking, job boards, and outreach templates. It compiles everything into a single **Excel workbook**, with optional **CSV export** and **Google Sheets** upload.

## Features

- **Eight structured sheets** in one workbook (decision-makers, companies, agencies, freelance platforms, communities, outreach tracker, job boards, templates).
- **Unified CLI** (`main.py`) for build, export, upload, stats, and a local HTML viewer.
```

## Stated purpose (normalized)
Organize AI/ML hiring research into a reproducible spreadsheet workflow.

## Features / capabilities mentioned
- Eight structured sheets in one workbook (decision-makers, companies, agencies, freelance platforms, communities, outreach tracker, job boards, templates).
- Unified CLI (`main.py`) for build, export, upload, stats, and a local HTML viewer.
- Reproducible builds: source rows live in `data/*.py`; the `.xlsx` file is generated.
- Tests for path resolution and data accessors (`pytest`).

## Architecture / structure notes
Stack mentioned or implied: Python, openpyxl, pandas, Google API client

## Setup / usage (only if useful)
Recorded in summary.md when the README provides a clear run path. Details omitted here to avoid dumping install scripts.

## Demos / screenshots
No clear screenshot/demo section detected in README text scan.

## Unique engineering decisions (README-backed only)
Practical tooling with tests; shows process thinking.

## Claims to treat carefully
Typo in repo name; not a public product; value is personal/ops.
