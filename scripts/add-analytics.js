#!/usr/bin/env node
/**
 * Insert the Vercel Web Analytics script into every served HTML page.
 * Touches <head> only. Idempotent.
 *
 * Usage:
 *   node scripts/add-analytics.js
 *   node scripts/add-analytics.js --check
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TAG = '<script defer src="/_vercel/insights/script.js"></script>';
const SKIP_DIRS = new Set(["node_modules", "templates", "data", "components", "includes", ".git", ".vercel"]);
const SKIP_FILES = new Set(["agent/mode.html"]);
const checkOnly = process.argv.includes("--check");

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(full, out);
    } else if (entry.name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

let changed = 0;
for (const file of walk(ROOT, [])) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  if (SKIP_FILES.has(rel)) continue;
  const html = fs.readFileSync(file, "utf8");
  if (!/<\/head>/i.test(html) || html.includes("/_vercel/insights/script.js")) continue;
  changed += 1;
  if (checkOnly) {
    console.log(`missing analytics: ${rel}`);
    continue;
  }
  fs.writeFileSync(file, html.replace(/<\/head>/i, `  ${TAG}\n</head>`), "utf8");
}

if (checkOnly && changed) {
  console.error(`${changed} page(s) missing Vercel Web Analytics. Run: npm run build:analytics`);
  process.exit(1);
}
console.log(checkOnly ? "Vercel Web Analytics present on all pages" : `Vercel Web Analytics added (${changed} files)`);
