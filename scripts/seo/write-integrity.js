#!/usr/bin/env node
/**
 * Snapshot SHA-256 hashes of <main> bodies for research-related HTML pages.
 * Used by scripts/seo/check.js to prove research text was not rewritten.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "../..");
const CONFIG = JSON.parse(
  fs.readFileSync(path.join(ROOT, "config/seo-pages.json"), "utf8")
);
const OUT = path.join(ROOT, "data/seo/research-integrity.json");

function mainBodyHash(html) {
  const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const body = match ? match[1] : html;
  return crypto.createHash("sha256").update(body).digest("hex");
}

function main() {
  const out = {
    generated_at: new Date().toISOString(),
    note: "Hashes cover <main> only. Head metadata may change without failing integrity.",
  };
  for (const rel of CONFIG.research_integrity) {
    const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
    out[rel] = mainBodyHash(html);
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(out, null, 2)}\n`, "utf8");
  console.log(`Wrote ${OUT}`);
}

main();
