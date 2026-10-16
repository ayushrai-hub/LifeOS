#!/usr/bin/env node
/**
 * Apply title, description, canonical, and Open Graph tags to section pages.
 * Touches <head> only. Never modifies <main> / body content.
 *
 * Usage:
 *   node scripts/seo/apply-meta.js
 *   node scripts/seo/apply-meta.js --check
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "../..");
const CONFIG = path.join(ROOT, "config/seo-pages.json");
const checkOnly = process.argv.includes("--check");

function read(p) {
  return fs.readFileSync(p, "utf8");
}

function write(p, text) {
  fs.writeFileSync(p, text, "utf8");
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function mainBodyHash(html) {
  const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const body = match ? match[1] : html;
  return crypto.createHash("sha256").update(body).digest("hex");
}

function upsertMetaName(head, name, content) {
  const re = new RegExp(
    `<meta\\s+name="${name}"\\s+content="[^"]*"\\s*/?>`,
    "i"
  );
  const tag = `<meta name="${name}" content="${escapeAttr(content)}">`;
  if (re.test(head)) return head.replace(re, tag);
  return head.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function upsertMetaProperty(head, property, content) {
  const re = new RegExp(
    `<meta\\s+property="${property}"\\s+content="[^"]*"\\s*/?>`,
    "i"
  );
  const tag = `<meta property="${property}" content="${escapeAttr(content)}">`;
  if (re.test(head)) return head.replace(re, tag);
  return head.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function upsertTitle(head, title) {
  if (/<title>[\s\S]*?<\/title>/i.test(head)) {
    return head.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  }
  return head.replace(/<\/head>/i, `  <title>${title}</title>\n</head>`);
}

function upsertCanonical(head, href) {
  const re = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;
  const tag = `<link rel="canonical" href="${escapeAttr(href)}">`;
  if (re.test(head)) return head.replace(re, tag);
  return head.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function applyPage(html, page, origin, ogImage) {
  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) throw new Error(`No <head> in ${page.file}`);

  let head = headMatch[0];
  const canonical = `${origin}${page.path}`;

  head = upsertTitle(head, page.title);
  head = upsertMetaName(head, "description", page.description);
  head = upsertCanonical(head, canonical);
  head = upsertMetaProperty(head, "og:title", page.title);
  head = upsertMetaProperty(head, "og:description", page.description);
  head = upsertMetaProperty(head, "og:type", "website");
  head = upsertMetaProperty(head, "og:url", canonical);
  head = upsertMetaProperty(head, "og:image", ogImage);
  head = upsertMetaName(head, "twitter:card", "summary");
  head = upsertMetaName(head, "twitter:title", page.title);
  head = upsertMetaName(head, "twitter:description", page.description);
  head = upsertMetaName(head, "twitter:image", ogImage);

  return html.slice(0, headMatch.index) + head + html.slice(headMatch.index + headMatch[0].length);
}

function markRedirectNoindex(html, absoluteCanonical) {
  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return html;
  let head = headMatch[0];
  head = upsertMetaName(head, "robots", "noindex,follow");
  head = upsertCanonical(head, absoluteCanonical);
  head = upsertTitle(head, "Redirect; Ayush Rai");
  return html.slice(0, headMatch.index) + head + html.slice(headMatch.index + headMatch[0].length);
}

function main() {
  const config = JSON.parse(read(CONFIG));
  const { origin, default_og_image: ogImage, pages } = config;
  let changed = 0;
  let stale = 0;

  for (const page of pages) {
    const filePath = path.join(ROOT, page.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`skip missing ${page.file}`);
      continue;
    }
    const before = read(filePath);
    const beforeHash = mainBodyHash(before);
    const after = applyPage(before, page, origin, ogImage);
    const afterHash = mainBodyHash(after);
    if (beforeHash !== afterHash) {
      throw new Error(`Body content changed for ${page.file}; aborting`);
    }
    if (before !== after) {
      if (checkOnly) {
        stale += 1;
        console.log(`stale: ${page.file}`);
      } else {
        write(filePath, after);
        changed += 1;
        console.log(`updated: ${page.file}`);
      }
    }
  }

  // Redirect stubs: keep body, fix absolute canonical + noindex.
  const redirects = [
    {
      file: "sites/research/portfolio/index.html",
      canonical: `${origin}/sites/portfolios/research`,
    },
    {
      file: "sites/writing/portfolio/index.html",
      canonical: `${origin}/sites/portfolios/writing`,
    },
  ];
  for (const item of redirects) {
    const filePath = path.join(ROOT, item.file);
    if (!fs.existsSync(filePath)) continue;
    const before = read(filePath);
    const beforeHash = mainBodyHash(before);
    const after = markRedirectNoindex(before, item.canonical);
    const afterHash = mainBodyHash(after);
    if (beforeHash !== afterHash) {
      throw new Error(`Body content changed for ${item.file}; aborting`);
    }
    if (before !== after) {
      if (checkOnly) {
        stale += 1;
        console.log(`stale: ${item.file}`);
      } else {
        write(filePath, after);
        changed += 1;
        console.log(`updated: ${item.file}`);
      }
    }
  }

  if (checkOnly && stale) {
    console.error(`${stale} page(s) need SEO meta refresh`);
    process.exit(1);
  }
  console.log(checkOnly ? "SEO meta up to date" : `SEO meta applied (${changed} files)`);
}

main();
