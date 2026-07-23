#!/usr/bin/env node
/**
 * Lightweight knowledge validator (Node); use when Python is unavailable.
 * Mirrors scripts/knowledge/validate.py checks at a basic level.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const KNOWLEDGE = path.join(ROOT, "knowledge");
const SKIP = new Set(["templates", "inbox", "archive", "media", "assets"]);
const REQUIRED = [
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
];
const STATUS = new Set(["draft", "review", "published", "archived"]);
const ID_STATUS = new Set([
  "active",
  "inactive",
  "unknown",
  "needs-review",
  "duplicate-candidate",
  ...STATUS,
]);
const VISIBILITY = new Set(["private", "unlisted", "public"]);
const DATE_RE = /^\d{4}-\d{2}-\d{2}/;

const errors = [];
const warnings = [];
const ids = new Map();

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/\.(md|ya?ml)$/i.test(ent.name) && ent.name !== "README.md") out.push(p);
  }
  return out;
}

function parseMeta(text, isMd) {
  const data = {};
  let block = text;
  if (isMd) {
    if (!text.startsWith("---")) return data;
    const end = text.indexOf("\n---", 3);
    if (end === -1) return data;
    block = text.slice(3, end);
  }
  for (const line of block.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#") || line.startsWith(" ") || line.startsWith("-")) continue;
    const i = line.indexOf(":");
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return data;
}

for (const file of walk(KNOWLEDGE)) {
  const text = fs.readFileSync(file, "utf8");
  const meta = parseMeta(text, /\.md$/i.test(file));
  const base = path.basename(file);
  const parent = path.basename(path.dirname(file));

  if (!meta.id) {
    if (
      [
        "edges.yaml",
        "identity.yaml",
        "search-index.yaml",
        "site-status.yaml",
        "redirects.yaml",
        "seo-policy.yaml",
      ].includes(base) ||
      ["review", "indexes", "search", "schemas", "_system"].includes(parent) ||
      /^(items|edges|profiles|documents):/m.test(text)
    ) {
      continue;
    }
    warnings.push(`${file}: no id (skipped)`);
    continue;
  }

  for (const key of REQUIRED) {
    if (!meta[key] || meta[key] === "null") errors.push(`${file}: missing ${key}`);
  }
  if (ids.has(meta.id)) errors.push(`${file}: duplicate id ${meta.id}`);
  else ids.set(meta.id, file);

  const isIdentity = ["social_profile", "contact_channel", "business_profile"].includes(meta.type);
  if (meta.status && !(isIdentity ? ID_STATUS : STATUS).has(meta.status)) {
    errors.push(`${file}: invalid status ${meta.status}`);
  }
  if (meta.visibility && !VISIBILITY.has(meta.visibility)) {
    errors.push(`${file}: invalid visibility ${meta.visibility}`);
  }
  if (meta.status === "published" && meta.visibility === "private") {
    errors.push(`${file}: published + private invalid`);
  }
}

errors.forEach((e) => console.log("ERROR:", e));
warnings.forEach((w) => console.log("WARN:", w));
console.log(`Checked ${ids.size} entities; errors=${errors.length} warnings=${warnings.length}`);
process.exit(errors.length ? 1 : 0);
