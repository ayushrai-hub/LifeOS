# Hiring Intelligence

A **file-based** Python project for organizing AI/ML hiring research: contacts, companies, agencies, platforms, communities, outreach tracking, job boards, and outreach templates. It compiles everything into a single **Excel workbook**, with optional **CSV export** and **Google Sheets** upload.

## Features

- **Eight structured sheets** in one workbook (decision-makers, companies, agencies, freelance platforms, communities, outreach tracker, job boards, templates).
- **Unified CLI** (`main.py`) for build, export, upload, stats, and a local HTML viewer.
- **Reproducible builds**: source rows live in `data/*.py`; the `.xlsx` file is generated.
- **Tests** for path resolution and data accessors (`pytest`).

## Tech stack

- Python 3.10+
- **openpyxl**; Excel generation  
- **pandas**; Excel read / CSV export  
- **Google API client + OAuth**; optional spreadsheet creation  

See `requirements.txt` for pinned minimum versions.

## Quick start

```bash
cd hiring_intellgence
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### Build the workbook

```bash
python main.py build-excel
```

Output: `data/AI_Hiring_DB_v2.xlsx`

### Export CSV (for manual Google import)

```bash
python main.py convert-csv
```

Output: `data/google_sheets_ready/*.csv`

### Statistics (from Python data modules)

```bash
python main.py stats
```

### Local HTML viewer

```bash
python main.py view-data
```

Opens `data/view_data.html` in your default browser.

## Google Sheets upload (optional)

1. In [Google Cloud Console](https://console.cloud.google.com/), enable **Google Sheets API** and **Google Drive API**.
2. Create **OAuth 2.0 Client ID** (Desktop app).
3. Download JSON → save as `config/credentials.json` (never commit this file).
4. Run:

```bash
python main.py upload-sheets
```

Complete the browser OAuth flow once; a `token.json` file is written at the project root (gitignored). See `docs/GOOGLE_SHEETS_SETUP.md` for more detail.

**Note:** The uploader creates a **new** spreadsheet and may set **anyone with the link** to reader on that file. Change `scripts/upload_to_google_sheets.py` if you need stricter sharing.

## Environment variables

The core Excel and CSV flows need **no** environment variables. Google auth is file-based (`config/credentials.json`, `token.json`).

## Project layout

```
hiring_intellgence/
├── main.py                 # CLI entry
├── config/                 # paths + package metadata
├── data/                   # source lists + generated xlsx/csv
├── scripts/                # build, convert, upload
├── src/claude_sheet/       # optional interview-prep workbook script
├── docs/                   # setup guides
├── tests/                  # pytest
├── ARCHITECTURE.md
├── CODEBASE_GUIDE.md
├── API_DOCS.md
├── CONTRIBUTING.md
└── CHANGELOG.md
```

## Customizing data

- **People**: `data/people_data.py`, `data/people_data1.py`
- **Companies**: `data/companies_data.py`
- **Templates / static tables**: `scripts/build.py` (sheets 3–8 inline lists)

After edits, run `python main.py build-excel` again.

## Optional: interview prep workbook

`src/claude_sheet/interview_prep_workbook.py` is a **separate**, large script for generating an interview-preparation Excel file. It is **not** wired into `main.py`; run it directly if you use it:

```bash
python src/claude_sheet/interview_prep_workbook.py
```

(Adjust any paths inside that script if you run it from another CWD.)

## Testing

```bash
pytest
```

## Deployment

This repo is a **local/offline tool**, not a web service. “Deployment” means distributing the repo and running the CLI on a machine with Python and (optionally) Google credentials.

## Documentation index

| Document | Contents |
|----------|----------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Design, data flow, decisions |
| [CODEBASE_GUIDE.md](CODEBASE_GUIDE.md) | Folder-by-folder map |
| [API_DOCS.md](API_DOCS.md) | CLI and Python entry points |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Workflow and standards |
| [CHANGELOG.md](CHANGELOG.md) | Recent changes |
| [docs/GOOGLE_SHEETS_SETUP.md](docs/GOOGLE_SHEETS_SETUP.md) | Google Cloud setup |

## License / use

Use for **professional networking and job search** only. Respect privacy, platform terms, and anti-spam norms when contacting people or companies listed in the dataset.

