# README extract; IAS-system

## Source
Pulled from repository README.md via GitHub API during knowledge ingest.
Do not treat this file as a verbatim copy of the full README.

## Project self-description (condensed)
Opening of README (truncated for orientation; not a full quote dump):

```
# Intelligent Audit System (IAS)

An AI-powered audit system for Indian court judgments and police case files, designed to identify compliance gaps and potential acquittal risks.

## Features

- **OCR Processing**: Extracts text from PDF documents using PyMuPDF and Sarvam Document Intelligence OCR
- **Judgment Analysis**: Analyzes court judgments for legal compliance and potential issues
```

## Stated purpose (normalized)
Identify compliance gaps and acquittal risks in legal/police case documents.

## Features / capabilities mentioned
- OCR Processing: Extracts text from PDF documents using PyMuPDF and Sarvam Document Intelligence OCR
- Judgment Analysis: Analyzes court judgments for legal compliance and potential issues
- SOP Compliance: Checks against Standard Operating Procedures for police investigations
- AI-Powered Insights: Uses NVIDIA NIM (OpenAI-compatible) for intelligent analysis and recommendations
- Bilingual Support: Hindi and English language support
- Audit Trail: Complete audit history with folder-based storage

## Architecture / structure notes
Stack mentioned or implied: Python, FastAPI, LangGraph, SQLite, PyMuPDF, NVIDIA NIM, Sarvam OCR

## Setup / usage (only if useful)
Recorded in summary.md when the README provides a clear run path. Details omitted here to avoid dumping install scripts.

## Demos / screenshots
No clear screenshot/demo section detected in README text scan.

## Unique engineering decisions (README-backed only)
Deep domain system with unusually thorough docs/ tree and clear package structure (ias/).

## Claims to treat carefully
Real-world deployment and accuracy metrics unverified; depends on paid OCR/LLM APIs.
