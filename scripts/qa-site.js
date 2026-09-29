#!/usr/bin/env node
/**
 * Static QA checks for the knowledge website. Zero dependencies; runs on any
 * OS with Node.
 *
 * Checks:
 *   - no em dashes (U+2014, raw or as an HTML entity) in any tracked or
 *     untracked, non-ignored text file
 *   - every sites/**.html page has a viewport meta (warns on missing shared
 *     stylesheet or large fixed widths)
 *   - portrait asset exists and is under 800 KB
 *   - every portfolio, domain, and resume in data/site-catalog.json has a page
 *
 * Exits 1 if any check fails.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const TEXT_EXTENSIONS = new Set([
  ".html", ".css", ".js", ".md", ".yaml", ".yml", ".json", ".jsonld", ".xml", ".txt",
]);
const EXCLUDED_PREFIXES = ["data/imports/graahak-snapshot/"];
const WALK_SKIP_DIRS = new Set([".git", "node_modules", ".vercel", ".cursor"]);
const EM_DASH = /\u2014|&(?:mdash|#8212|#x2014);/gi;
const MAX_REPORTED = 50;

let fail = 0;
let warn = 0;
const failMsg = (msg) => { fail++; console.log(`FAIL: ${msg}`); };
const warnMsg = (msg) => { warn++; console.log(`WARN: ${msg}`); };
const okMsg = (msg) => console.log(`OK: ${msg}`);

// Tracked plus untracked files, minus anything .gitignore excludes. Falls back
// to a directory walk when git is unavailable (e.g. a source tarball).
function listFiles() {
  try {
    const out = execFileSync("git", ["ls-files", "-z", "-co", "--exclude-standard"], {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    });
    return [...new Set(out.split("\0").filter(Boolean))];
  } catch {
    const files = [];
    const walk = (dir) => {
      for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
        const rel = dir ? `${dir}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
          if (!WALK_SKIP_DIRS.has(entry.name) && rel !== "knowledge/github/repositories/expert-o") walk(rel);
        } else if (entry.isFile()) {
          files.push(rel);
        }
      }
    };
    walk("");
    return files;
  }
}

function readIfExists(rel) {
  const abs = path.join(ROOT, rel);
  return fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
}

function checkEmDashes(files) {
  const hits = [];
  let scanned = 0;
  for (const rel of files) {
    if (!TEXT_EXTENSIONS.has(path.extname(rel).toLowerCase())) continue;
    if (EXCLUDED_PREFIXES.some((p) => rel.startsWith(p))) continue;
    const text = readIfExists(rel);
    if (text === null) continue;
    scanned++;
    const lines = text.split("\n");
    lines.forEach((line, i) => {
      for (const m of line.matchAll(EM_DASH)) {
        hits.push({ rel, line: i + 1, col: m.index + 1, snippet: line.trim().slice(0, 100) });
      }
    });
  }
  for (const h of hits.slice(0, MAX_REPORTED)) {
    console.log(`  em dash at ${h.rel}:${h.line}:${h.col}  ${h.snippet}`);
  }
  if (hits.length > MAX_REPORTED) {
    console.log(`  ... ${hits.length - MAX_REPORTED} more not listed`);
  }
  if (hits.length) {
    const fileCount = new Set(hits.map((h) => h.rel)).size;
    failMsg(`em dash count=${hits.length} in ${fileCount} files (scanned ${scanned})`);
  } else {
    okMsg(`no em dashes (scanned ${scanned} files)`);
  }
}

function checkPages(files) {
  const pages = files.filter((f) => f.startsWith("sites/") && f.endsWith(".html"));
  let checked = 0;
  for (const rel of pages) {
    const text = readIfExists(rel);
    if (text === null) continue;
    checked++;
    if (!/name="viewport"/.test(text)) failMsg(`missing viewport: ${rel}`);
    if (!/styles\/site\.css|styles\/main\.css/.test(text)) warnMsg(`no shared stylesheet?: ${rel}`);
    if (/width:\s*\d{4,}px/.test(text)) warnMsg(`large fixed width?: ${rel}`);
  }
  okMsg(`viewport checked on ${checked} pages`);
}

function checkPortrait() {
  const portrait = path.join(ROOT, "assets/images/portraits/ayush-rai--workspace-2024.jpg");
  if (!fs.existsSync(portrait)) {
    failMsg("missing portrait asset");
    return;
  }
  const size = fs.statSync(portrait).size;
  if (size > 800 * 1024) warnMsg(`portrait still large: ${size} bytes`);
  else okMsg(`portrait size ok (${size})`);
}

function checkCatalog() {
  const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, "data/site-catalog.json"), "utf8"));
  const expect = (items, toPath, label) => {
    for (const item of items || []) {
      const rel = toPath(item.slug);
      if (!fs.existsSync(path.join(ROOT, rel))) failMsg(`missing ${label} ${rel}`);
    }
    return (items || []).length;
  };
  const portfolios = expect(catalog.portfolios, (s) => `sites/portfolios/${s}/index.html`, "portfolio");
  const domains = expect(catalog.domains, (s) => `sites/domains/${s}/index.html`, "domain");
  const resumes = expect(catalog.resumes, (s) => `sites/career/resumes/${s}.html`, "resume");
  okMsg(`portfolio count=${portfolios} domain count=${domains} resume count=${resumes}`);
}

const files = listFiles();
checkEmDashes(files);
checkPages(files);
checkPortrait();
checkCatalog();
console.log(`SUMMARY fail=${fail} warn=${warn}`);
process.exit(fail > 0 ? 1 : 0);
