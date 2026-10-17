#!/usr/bin/env node
/**
 * Fetch (and optionally rescan) the orank score for life.ayushrai.site,
 * compare it with a saved baseline, and write a report.
 *
 * Usage:
 *   node scripts/orank-check.js                 # cached score vs baseline
 *   node scripts/orank-check.js --scan          # POST /api/scan first (rate limited: ~6 forced scans/day)
 *   node scripts/orank-check.js --scan --force  # force a fresh scan
 *   node scripts/orank-check.js --baseline reports/orank-baseline.json --out reports/orank-latest
 *
 * Exit codes: 0 ok, 1 score regressed versus baseline, 2 API failure.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DOMAIN = "life.ayushrai.site";
const API = "https://ora.ai/api";

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

async function call(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: { accept: "application/json", ...(body ? { "content-type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(180000),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch (err) {
    json = null;
  }
  if (!res.ok || !json || !json.layers) {
    const reason = (json && (json.error || json.message)) || text.slice(0, 200);
    throw new Error(`${method} ${url} -> HTTP ${res.status}: ${reason}`);
  }
  return json;
}

function index(score) {
  const checks = {};
  for (const layer of score.layers || []) {
    for (const check of layer.checks || []) {
      checks[`${layer.id}/${check.id}`] = check;
    }
  }
  return checks;
}

function render(current, baseline) {
  const now = index(current);
  const before = baseline ? index(baseline) : {};
  const lines = [
    `# orank report for ${DOMAIN}`,
    "",
    `- Scanned at: ${current.scannedAt || "unknown"}`,
    `- Score: ${current.score}/${current.maxScore || 100} (${current.grade})${baseline ? `; baseline ${baseline.score} (${baseline.grade}) at ${baseline.scannedAt}` : ""}`,
    "",
    "| Check | Status | Points | Baseline |",
    "| --- | --- | --- | --- |",
  ];
  for (const [key, check] of Object.entries(now)) {
    if (check.status === "na") continue;
    const prior = before[key];
    const changed = prior && (prior.status !== check.status || prior.score !== check.score);
    if (check.status === "pass" && !changed) continue;
    lines.push(
      `| ${key} | ${check.status} | ${check.score}/${check.maxScore} | ${prior ? `${prior.status} ${prior.score}/${prior.maxScore}` : "n/a"} |`
    );
  }
  lines.push("", "Rows list every non-passing check plus any check whose result changed.");
  return `${lines.join("\n")}\n`;
}

async function main() {
  const baselinePath = path.resolve(ROOT, arg("--baseline", "reports/orank-baseline.json"));
  const outBase = path.resolve(ROOT, arg("--out", "reports/orank-latest"));
  const baseline = fs.existsSync(baselinePath) ? JSON.parse(fs.readFileSync(baselinePath, "utf8")) : null;

  let current;
  try {
    if (process.argv.includes("--scan")) {
      current = await call("POST", `${API}/scan`, { url: DOMAIN, ...(process.argv.includes("--force") ? { force: true } : {}) });
    } else {
      current = await call("GET", `${API}/score/${DOMAIN}`);
    }
  } catch (err) {
    console.error(String(err.message || err));
    process.exit(2);
  }

  fs.mkdirSync(path.dirname(outBase), { recursive: true });
  fs.writeFileSync(`${outBase}.json`, `${JSON.stringify(current, null, 2)}\n`);
  const report = render(current, baseline);
  fs.writeFileSync(`${outBase}.md`, report);
  process.stdout.write(report);

  if (baseline && current.score < baseline.score) {
    console.error(`Score regressed: ${baseline.score} -> ${current.score}`);
    process.exit(1);
  }
}

main();
