#!/usr/bin/env python3
"""Validate knowledge entities for required metadata and basic integrity."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
KNOWLEDGE = ROOT / "knowledge"
SKIP_DIRS = {"templates", "inbox", "archive", "media", "assets"}

REQUIRED = [
    "id",
    "type",
    "title",
    "slug",
    "status",
    "visibility",
    "created",
    "updated",
    "author",
    "version",
]

STATUS = {"draft", "review", "published", "archived"}
VISIBILITY = {"private", "unlisted", "public"}
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}")


def parse_frontmatter(text: str) -> dict[str, str]:
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    block = text[3:end]
    data: dict[str, str] = {}
    for line in block.splitlines():
        if not line.strip() or line.strip().startswith("#") or line.startswith(" ") or line.startswith("-"):
            continue
        if ":" not in line:
            continue
        key, val = line.split(":", 1)
        data[key.strip()] = val.strip().strip('"').strip("'")
    return data


def parse_yaml_simple(text: str) -> dict[str, str]:
    data: dict[str, str] = {}
    for line in text.splitlines():
        if not line.strip() or line.strip().startswith("#") or line.startswith(" ") or line.startswith("-"):
            continue
        if ":" not in line:
            continue
        key, val = line.split(":", 1)
        data[key.strip()] = val.strip().strip('"').strip("'")
    return data


def iter_entities():
    for path in KNOWLEDGE.rglob("*"):
        if not path.is_file():
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.name in {"README.md", ".gitkeep"}:
            continue
        if path.suffix.lower() not in {".md", ".yaml", ".yml"}:
            continue
        # skip pure index notes without entity shape later
        yield path


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []
    ids: dict[str, Path] = {}

    for path in iter_entities():
        text = path.read_text(encoding="utf-8")
        meta = parse_frontmatter(text) if path.suffix.lower() == ".md" else parse_yaml_simple(text)
        if not meta.get("id"):
            # allow non-entity yaml like edges lists / indexes without id
            if path.name in {"edges.yaml", "identity.yaml", "search-index.yaml", "site-status.yaml", "redirects.yaml", "seo-policy.yaml"}:
                continue
            if path.parent.name in {"review", "indexes", "search", "schemas", "_system"}:
                continue
            if "items:" in text or "edges:" in text or "profiles:" in text or "documents:" in text:
                continue
            warnings.append(f"{path}: no id (skipped as non-entity)")
            continue

        for key in REQUIRED:
            if key not in meta or meta[key] in {"", "null", "None"}:
                errors.append(f"{path}: missing required field `{key}`")

        eid = meta.get("id", "")
        if eid in ids:
            errors.append(f"{path}: duplicate id `{eid}` (also {ids[eid]})")
        else:
            ids[eid] = path

        if meta.get("status") and meta["status"] not in STATUS and meta["status"] not in {
            "active",
            "inactive",
            "unknown",
            "needs-review",
            "duplicate-candidate",
        }:
            # identity statuses allowed on identity types
            if meta.get("type") not in {"social_profile", "contact_channel", "business_profile"}:
                errors.append(f"{path}: invalid status `{meta.get('status')}`")

        if meta.get("visibility") and meta["visibility"] not in VISIBILITY:
            errors.append(f"{path}: invalid visibility `{meta.get('visibility')}`")

        if meta.get("status") == "published" and meta.get("visibility") == "private":
            errors.append(f"{path}: published + private is invalid")

        for dk in ("created", "updated", "last_reviewed", "date", "start", "end"):
            val = meta.get(dk)
            if val and val not in {"null", "None", ""} and not DATE_RE.match(val):
                warnings.append(f"{path}: {dk} not ISO date (`{val}`)")

        slug = meta.get("slug")
        if slug and path.stem != slug and path.stem not in {"profile"}:
            warnings.append(f"{path}: slug `{slug}` != filename stem `{path.stem}`")

    for e in errors:
        print("ERROR:", e)
    for w in warnings:
        print("WARN:", w)

    print(f"Checked entities with ids: {len(ids)}; errors={len(errors)} warnings={len(warnings)}")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
