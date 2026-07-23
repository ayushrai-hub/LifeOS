"""
Local static server for the Personal Knowledge Website.

Serves the repository root so paths like /sites/www/index.html and
/styles/main.css resolve correctly.

Usage:
  python scripts/serve.py
  python scripts/serve.py --port 8080

Then open:
  http://127.0.0.1:8080/
  http://127.0.0.1:8080/sites/www/
"""

from __future__ import annotations

import argparse
import functools
import http.server
import os
import socketserver
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **getattr(http.server.SimpleHTTPRequestHandler, "extensions_map", {}),
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".svg": "image/svg+xml",
        "": "application/octet-stream",
    }

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


def main() -> int:
    parser = argparse.ArgumentParser(description="Serve the knowledge website locally.")
    parser.add_argument("--port", type=int, default=8080)
    parser.add_argument("--host", default="127.0.0.1")
    args = parser.parse_args()

    os.chdir(ROOT)
    handler = functools.partial(Handler, directory=str(ROOT))

    try:
        with socketserver.TCPServer((args.host, args.port), handler) as httpd:
            httpd.allow_reuse_address = True
            url = f"http://{args.host}:{args.port}/"
            print(f"Serving {ROOT}")
            print(f"Open {url}")
            print(f"Home  {url}sites/www/")
            print("Ctrl+C to stop")
            httpd.serve_forever()
    except OSError as exc:
        print(f"Failed to bind {args.host}:{args.port}: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
