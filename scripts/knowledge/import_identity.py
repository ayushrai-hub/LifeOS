#!/usr/bin/env python3
"""
Import identity spreadsheet/CSV into knowledge/social|contact|business.

Usage:
  python scripts/knowledge/import_identity.py data/imports/YYYY-MM-DD-identity.csv

- Does not delete uncertain rows
- Writes duplicate-candidate / needs-review into knowledge/review/
- Safe to re-run: skips identical id+url unless --force
"""

from __future__ import annotations

import argparse
import csv
import re
import sys
from datetime import date
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parents[2]
SOCIAL = ROOT / "knowledge" / "social"
CONTACT = ROOT / "knowledge" / "contact"
BUSINESS = ROOT / "knowledge" / "business"
REVIEW = ROOT / "knowledge" / "review"
INDEX = ROOT / "knowledge" / "metadata" / "indexes" / "identity.yaml"

PLATFORM_CATEGORY = {
    "linkedin": "professional",
    "wellfound": "professional",
    "angellist": "professional",
    "github": "developer",
    "gitlab": "developer",
    "bitbucket": "developer",
    "stackoverflow": "developer",
    "stack overflow": "developer",
    "dev.to": "developer",
    "devto": "developer",
    "twitter": "professional",
    "x": "professional",
    "x.com": "professional",
    "youtube": "video",
    "vimeo": "video",
    "behance": "design",
    "dribbble": "design",
    "medium": "writing",
    "substack": "writing",
    "hashnode": "writing",
    "upwork": "freelance",
    "fiverr": "freelance",
    "toptal": "freelance",
    "paypal": "payment",
    "stripe": "payment",
    "buymeacoffee": "payment",
    "scholar": "research",
    "google scholar": "research",
    "orcid": "research",
    "researchgate": "research",
    "email": "contact",
    "phone": "contact",
}


def slugify(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-") or "unknown"


def normalize_url(url: str) -> str:
    url = (url or "").strip()
    if not url:
        return ""
    parts = urlsplit(url)
    query = [
        (k, v)
        for k, v in parse_qsl(parts.query, keep_blank_values=True)
        if not k.lower().startswith("utm_")
    ]
    path = parts.path.rstrip("/") or ""
    return urlunsplit((parts.scheme, parts.netloc.lower(), path, urlencode(query), ""))


def detect_bucket(category: str, platform: str) -> Path:
    if category == "contact" or platform.lower() in {"email", "phone", "whatsapp"}:
        return CONTACT
    if category in {"business", "freelance", "payment"}:
        return BUSINESS
    return SOCIAL


def detect_type(bucket: Path) -> str:
    if bucket == CONTACT:
        return "contact_channel"
    if bucket == BUSINESS:
        return "business_profile"
    return "social_profile"


def id_prefix(entity_type: str) -> str:
    return {
        "social_profile": "social",
        "contact_channel": "contact",
        "business_profile": "business",
    }[entity_type]


def read_rows(path: Path) -> list[dict[str, str]]:
    if path.suffix.lower() in {".xlsx", ".xls"}:
        try:
            import openpyxl  # type: ignore
        except ImportError:
            print("openpyxl required for Excel. Convert to CSV or: pip install openpyxl", file=sys.stderr)
            sys.exit(2)
        wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
        ws = wb.active
        rows_iter = ws.iter_rows(values_only=True)
        headers = [str(h).strip().lower() if h is not None else "" for h in next(rows_iter)]
        out = []
        for row in rows_iter:
            item = {headers[i]: ("" if row[i] is None else str(row[i]).strip()) for i in range(len(headers))}
            out.append(item)
        return out

    with path.open(newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        return [{(k or "").strip().lower(): (v or "").strip() for k, v in row.items()} for row in reader]


def pick(row: dict[str, str], *keys: str) -> str:
    for k in keys:
        if k in row and row[k]:
            return row[k]
    return ""


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    if not args.source.exists():
        print(f"Missing source: {args.source}", file=sys.stderr)
        return 2

    today = date.today().isoformat()
    rows = read_rows(args.source)
    seen_urls: dict[str, str] = {}
    duplicates: list[dict] = []
    uncertain: list[dict] = []
    written: list[dict] = []

    for i, row in enumerate(rows, start=1):
        platform = pick(row, "platform", "site", "network", "name")
        url = normalize_url(pick(row, "url", "link", "profile", "href"))
        username = pick(row, "username", "handle", "user")
        notes = pick(row, "notes", "note", "comments")
        category_in = pick(row, "category", "type", "group").lower()

        if not platform and not url:
            uncertain.append({"row": i, "reason": "empty platform and url", "raw": row})
            continue

        platform_key = slugify(platform or urlsplit(url).netloc or f"row-{i}")
        category = category_in or PLATFORM_CATEGORY.get(platform.lower(), PLATFORM_CATEGORY.get(platform_key, "other"))
        bucket = detect_bucket(category, platform or "")
        entity_type = detect_type(bucket)
        prefix = id_prefix(entity_type)
        entity_id = f"{prefix}.{platform_key}"
        status = "active"

        if not url:
            status = "needs-review"
            uncertain.append({"row": i, "reason": "missing url", "id": entity_id, "raw": row})

        if url and url in seen_urls:
            status = "duplicate-candidate"
            duplicates.append(
                {
                    "row": i,
                    "id": entity_id,
                    "url": url,
                    "duplicate_of": seen_urls[url],
                    "raw": row,
                }
            )
        elif url:
            seen_urls[url] = entity_id

        purpose = pick(row, "purpose", "description") or f"{platform} profile"
        yaml_body = f"""id: {entity_id}
type: {entity_type}
title: {platform or platform_key}
slug: {platform_key}
platform: {platform or platform_key}
username: {username or "null"}
url: {url or "null"}
category: {category}
purpose: {purpose}
visibility: public
priority: 50
status: {status}
notes: {notes!r}
created: {today}
updated: {today}
author: person.owner
version: 0.1.0
last_verified: null
provenance:
  source: identity-import
  source_file: {args.source.as_posix()}
  imported_at: {today}
"""
        if status == "duplicate-candidate" and url in seen_urls:
            yaml_body += f"superseded_by: {seen_urls[url]}\n"

        out_path = bucket / f"{platform_key}.yaml"
        if out_path.exists() and not args.force and status != "duplicate-candidate":
            # keep existing canonical unless force
            written.append({"id": entity_id, "path": str(out_path), "skipped": True})
            continue

        if status == "duplicate-candidate":
            out_path = REVIEW / f"dup-{platform_key}-{i}.yaml"

        out_path.write_text(yaml_body, encoding="utf-8")
        written.append({"id": entity_id, "path": str(out_path), "status": status})

    (REVIEW / "identity-duplicates.yaml").write_text(
        f"status: imported\ncreated: {today}\nupdated: {today}\nitems:\n"
        + "".join(f"  - {d}\n" for d in duplicates)
        + ("items: []\n" if not duplicates else ""),
        encoding="utf-8",
    )
    # simpler structured dump for uncertain
    import pprint

    (REVIEW / "identity-uncertain.yaml").write_text(
        "status: imported\n"
        f"created: {today}\nupdated: {today}\nitems:\n"
        + ("  []\n" if not uncertain else "".join(f"  - {pprint.pformat(u)}\n" for u in uncertain)),
        encoding="utf-8",
    )

    INDEX.write_text(
        f"generated_at: {today}\nstatus: imported\ncount: {len(written)}\nprofiles:\n"
        + "".join(f"  - id: {w['id']}\n    path: {w['path']}\n" for w in written),
        encoding="utf-8",
    )

    print(f"Wrote/skipped {len(written)} records. duplicates={len(duplicates)} uncertain={len(uncertain)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
