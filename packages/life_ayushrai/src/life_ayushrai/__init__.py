from __future__ import annotations

import json
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

ORIGIN = "https://life.ayushrai.site"


def _get_json(url: str) -> Any:
    request = urllib.request.Request(url, headers={"Accept": "application/json"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def _post_json(url: str, payload: dict[str, Any]) -> Any:
    data = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=data,
        headers={"Accept": "application/json", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def ask(query: str, *, origin: str = ORIGIN) -> Any:
    base = origin.rstrip("/")
    url = f"{base}/ask?query={urllib.parse.quote(query or '')}"
    return _get_json(url)


def sandbox(*, origin: str = ORIGIN) -> Any:
    return _get_json(f"{origin.rstrip('/')}/api/v1/sandbox")


def create_job(queries: list[str], *, origin: str = ORIGIN) -> Any:
    return _post_json(f"{origin.rstrip('/')}/api/v1/jobs", {"queries": queries})


def get_job(job_id: str, *, origin: str = ORIGIN) -> Any:
    return _get_json(f"{origin.rstrip('/')}/api/v1/jobs/{urllib.parse.quote(job_id)}")
