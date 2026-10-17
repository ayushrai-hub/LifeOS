from __future__ import annotations

import json
import sys

from . import ask, create_job, get_job, sandbox


def main(argv: list[str] | None = None) -> int:
    args = list(sys.argv[1:] if argv is None else argv)
    if not args:
        sys.stderr.write(
            "Usage: life-ayushrai ask <question> | life-ayushrai sandbox | "
            "life-ayushrai job [q1 q2...] | life-ayushrai job get <id>\n"
        )
        return 1
    command, rest = args[0], args[1:]
    try:
        if command == "ask":
            payload = ask(" ".join(rest))
        elif command == "sandbox":
            payload = sandbox()
        elif command == "job":
            if rest and rest[0] == "get" and len(rest) > 1:
                payload = get_job(rest[1])
            else:
                queries = rest or ["Who is Ayush Rai?"]
                accepted = create_job(queries)
                payload = {"accepted": accepted, "completed": get_job(accepted["job_id"])}
        else:
            sys.stderr.write(f"Unknown command: {command}\n")
            return 1
    except Exception as exc:  # noqa: BLE001 - CLI surface
        sys.stderr.write(f"{exc}\n")
        return 1
    sys.stdout.write(json.dumps(payload, indent=2) + "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
