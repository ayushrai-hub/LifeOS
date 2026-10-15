#!/usr/bin/env node
/**
 * Write a markdown twin next to each sites HTML page so agents can fetch
 * page.md. Skips the homepage, which build-home.js writes.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITES = path.join(ROOT, "sites");
const ORIGIN = "https://life.ayushrai.site";

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(abs, out);
    else if (entry.name.endsWith(".html")) out.push(abs);
  }
}

function field(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1].replace(/\s+/g, " ").trim() : "";
}

function publicUrl(relHtml) {
  const rel = relHtml.split(path.sep).join("/");
  if (rel.endsWith("/index.html")) return `${ORIGIN}/${rel.slice(0, -"index.html".length)}`;
  if (rel.endsWith(".html")) return `${ORIGIN}/${rel.slice(0, -".html".length)}`;
  return `${ORIGIN}/${rel}`;
}

function main() {
  const files = [];
  walk(SITES, files);
  let wrote = 0;
  for (const abs of files) {
    const rel = path.relative(ROOT, abs);
    if (rel === path.join("sites", "www", "index.html")) continue;
    const html = fs.readFileSync(abs, "utf8");
    const title = field(html, /<title>([^<]+)<\/title>/i) || "Ayush Rai";
    const description = field(html, /<meta name="description" content="([^"]+)"/i);
    const url = publicUrl(rel);
    const heading = title.split(";")[0].trim();
    const body = `# ${heading}\n\n${description ? `${description}\n\n` : ""}HTML page: ${url}\n\nThis markdown twin is for agents. The HTML page is the reading view.\n`;
    const mdPath = abs.replace(/\.html$/, ".md");
    fs.writeFileSync(mdPath, body);
    wrote += 1;
  }
  console.log(`Wrote ${wrote} markdown twins under sites/`);
}

main();
