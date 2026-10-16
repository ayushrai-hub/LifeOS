#!/usr/bin/env node
/**
 * Build root sitemap.xml from config/seo-pages.json + git lastmod when available.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "../..");
const CONFIG = path.join(ROOT, "config/seo-pages.json");
const OUT = path.join(ROOT, "sitemap.xml");

function gitLastmod(relPath) {
  try {
    const out = execSync("git log -1 --format=%cs --".split(" ").concat([relPath]), {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out;
  } catch (err) {
    /* fall through */
  }
  try {
    const st = fs.statSync(path.join(ROOT, relPath));
    return st.mtime.toISOString().slice(0, 10);
  } catch (err) {
    return null;
  }
}

function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG, "utf8"));
  const origin = config.origin.replace(/\/$/, "");
  const entries = new Map();

  for (const page of config.pages || []) {
    entries.set(page.path, page.file);
  }
  for (const extra of config.sitemap_extra || []) {
    entries.set(extra.path, extra.file);
  }

  const urls = [...entries.entries()]
    .filter(([, file]) => fs.existsSync(path.join(ROOT, file)))
    .sort((a, b) => a[0].localeCompare(b[0]));

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const [pagePath, file] of urls) {
    const loc = `${origin}${pagePath === "/" ? "/" : pagePath}`;
    const lastmod = gitLastmod(file);
    if (lastmod) {
      lines.push(
        `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
      );
    } else {
      lines.push(`  <url><loc>${loc}</loc></url>`);
    }
  }

  lines.push("</urlset>", "");
  fs.writeFileSync(OUT, lines.join("\n"), "utf8");
  console.log(`Wrote ${OUT} (${urls.length} URLs)`);
}

main();
