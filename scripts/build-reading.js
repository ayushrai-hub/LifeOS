#!/usr/bin/env node
/**
 * Build the Currently Reading page from knowledge.
 *
 * Reads:
 *   knowledge/reading/currently-reading.json
 *
 * Writes:
 *   sites/currently-reading/index.html
 *
 * Flags:
 *   --check         exit 1 if the HTML on disk is stale (writes nothing)
 *   --data <path>   alternate data file (previews, fixtures)
 *   --out <path>    alternate output file
 *
 * Schema and update workflow: knowledge/reading/README.md
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DEFAULT_DATA = path.join(ROOT, "knowledge/reading/currently-reading.json");
const DEFAULT_OUT = path.join(ROOT, "sites/currently-reading/index.html");
const PAGE_URL = "https://thelifeofayush.vercel.app/sites/currently-reading/";
const STYLESHEET = "../../styles/site.css?v=20260929a";

const TYPES = [
  "Paper",
  "Book",
  "Documentation",
  "Technical Article",
  "Research Report",
  "Course",
  "Lecture",
  "GitHub Repository",
  "Specification",
  "Tutorial",
  "Other",
];
const CURRENT_STATUSES = ["Reading", "In Progress", "Re-reading", "Applying"];
const STATUSES = [...CURRENT_STATUSES, "Finished"];

const SOURCE_LINK_LABELS = {
  Paper: "Original paper",
  Book: "Book",
  Documentation: "Documentation",
  "Technical Article": "Article",
  "Research Report": "Report",
  Course: "Course",
  Lecture: "Lecture",
  "GitHub Repository": "Repository",
  Specification: "Specification",
  Tutorial: "Tutorial",
  Other: "Original resource",
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SECTION_IDS = new Set([
  "content",
  "currently-reading",
  "finished",
  "learning",
  "built-from-reading",
]);

const DATE_RE = /^(\d{4})-(0[1-9]|1[0-2])(?:-(0[1-9]|[12]\d|3[01]))?$/;
const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EXTERNAL_RE = /^https?:\/\/\S+$/;
const INTERNAL_RE = /^(\.\.\/|\/|#)\S*$/;
const MD_LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const TEXT_FIELDS = [
  "whyReading",
  "whatLearning",
  "changedUnderstanding",
  "whatApplying",
  "whatBuilt",
  "buildInfluence",
  "takeaway",
];

function parseArgs(argv) {
  const args = { check: false, data: DEFAULT_DATA, out: DEFAULT_OUT };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--check") args.check = true;
    else if (a === "--data") args.data = path.resolve(argv[++i]);
    else if (a === "--out") args.out = path.resolve(argv[++i]);
    else {
      console.error(`Unknown argument: ${a}`);
      process.exit(2);
    }
  }
  return args;
}

function str(v) {
  return typeof v === "string" ? v.trim() : "";
}

function validate(data) {
  const errors = [];
  const err = (where, msg) => errors.push(`${where}: ${msg}`);

  if (!data || typeof data !== "object") return ["root: not a JSON object"];
  if (!DATE_RE.test(str(data.updated))) err("updated", "must be YYYY-MM-DD or YYYY-MM");
  if (!Array.isArray(data.entries)) err("entries", "must be an array");
  if (data.learning !== undefined && !Array.isArray(data.learning))
    err("learning", "must be an array");

  const walkStrings = (value, where) => {
    if (typeof value === "string") {
      if (value.includes("\u2014")) err(where, "contains an em dash; use a comma, semicolon, or period");
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => walkStrings(v, `${where}[${i}]`));
    } else if (value && typeof value === "object") {
      for (const [k, v] of Object.entries(value)) walkStrings(v, `${where}.${k}`);
    }
  };
  walkStrings(data, "data");

  const checkHref = (where, href, allowInternal) => {
    if (!href) return;
    if (EXTERNAL_RE.test(href)) return;
    if (allowInternal && INTERNAL_RE.test(href)) return;
    err(where, `invalid URL "${href}"${allowInternal ? "" : " (must start with http:// or https://)"}`);
  };

  const ids = new Set();
  (Array.isArray(data.entries) ? data.entries : []).forEach((e, i) => {
    const where = `entries[${i}]${e && e.id ? ` (${e.id})` : ""}`;
    if (!e || typeof e !== "object") return err(where, "must be an object");

    if (!ID_RE.test(str(e.id))) err(where, "id must be kebab-case (a-z, 0-9, hyphens)");
    else if (ids.has(e.id)) err(where, "duplicate id");
    else if (SECTION_IDS.has(e.id)) err(where, `id "${e.id}" is reserved for a page section`);
    ids.add(e.id);

    for (const f of ["title", "author", "source"]) {
      if (!str(e[f])) err(where, `${f} is required`);
    }
    if (!TYPES.includes(e.type)) err(where, `type must be one of: ${TYPES.join(", ")}`);
    if (!STATUSES.includes(e.status)) err(where, `status must be one of: ${STATUSES.join(", ")}`);
    if (!DATE_RE.test(str(e.startedAt))) err(where, "startedAt must be YYYY-MM-DD or YYYY-MM");

    const completed = e.completedAt === null || e.completedAt === undefined ? "" : str(e.completedAt);
    if (completed && !DATE_RE.test(completed)) err(where, "completedAt must be YYYY-MM-DD, YYYY-MM, or null");
    if (e.status === "Finished" && !completed) err(where, "status Finished requires completedAt");
    if (completed && DATE_RE.test(str(e.startedAt)) && completed < str(e.startedAt))
      err(where, "completedAt is before startedAt");

    if (e.tags !== undefined && !(Array.isArray(e.tags) && e.tags.every((t) => typeof t === "string")))
      err(where, "tags must be an array of strings");

    checkHref(`${where}.sourceUrl`, str(e.sourceUrl), false);
    checkHref(`${where}.githubUrl`, str(e.githubUrl), false);
    checkHref(`${where}.projectUrl`, str(e.projectUrl), true);

    for (const f of TEXT_FIELDS) {
      if (e[f] !== undefined && e[f] !== null && typeof e[f] !== "string")
        err(where, `${f} must be a string`);
      for (const m of str(e[f]).matchAll(MD_LINK_RE)) checkHref(`${where}.${f}`, m[2], true);
    }
  });

  (Array.isArray(data.learning) ? data.learning : []).forEach((t, i) => {
    const where = `learning[${i}]`;
    if (!t || typeof t !== "object") return err(where, "must be an object");
    if (!str(t.topic)) err(where, "topic is required");
    if (!str(t.description)) err(where, "description is required");
    checkHref(`${where}.href`, str(t.href), true);
    if (t.related !== undefined && !Array.isArray(t.related)) err(where, "related must be an array of entry ids");
    for (const id of t.related || []) {
      if (!ids.has(id)) err(where, `related id "${id}" does not match any entry`);
    }
  });

  return errors;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function relFor(href) {
  return EXTERNAL_RE.test(href) ? ' rel="noopener noreferrer"' : "";
}

/** Escape text, then allow [label](href) links. */
function inline(text) {
  return escapeHtml(text).replace(MD_LINK_RE, (_, label, href) => {
    const raw = href.replace(/&amp;/g, "&");
    return `<a href="${href}"${relFor(raw)}>${label}</a>`;
  });
}

function splitParagraphs(text) {
  return str(text)
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
}

function paragraphs(text, indent) {
  return splitParagraphs(text)
    .map((p) => `${indent}<p>${inline(p)}</p>`)
    .join("\n");
}

function labeledParagraphs(label, text, indent) {
  return splitParagraphs(text)
    .map((p, i) =>
      i === 0
        ? `${indent}<p><strong>${escapeHtml(label)}</strong> ${inline(p)}</p>`
        : `${indent}<p>${inline(p)}</p>`
    )
    .join("\n");
}

function monthYear(d, short) {
  const m = DATE_RE.exec(d);
  const name = MONTHS[Number(m[2]) - 1];
  return `${short ? name.slice(0, 3) : name} ${m[1]}`;
}

function timeTag(d, short) {
  return `<time datetime="${escapeHtml(d)}">${monthYear(d, short)}</time>`;
}

function link(href, label) {
  return `<a href="${escapeHtml(href)}"${relFor(href)}>${escapeHtml(label)} →</a>`;
}

function sourceLinkLabel(e) {
  const base = SOURCE_LINK_LABELS[e.type] || "Original resource";
  return str(e.source) ? `${base} on ${str(e.source)}` : base;
}

function resourceLinks(e, { includeSource = true } = {}) {
  const out = [];
  if (includeSource && str(e.sourceUrl)) out.push(link(str(e.sourceUrl), sourceLinkLabel(e)));
  if (str(e.projectUrl)) out.push(link(str(e.projectUrl), "Project"));
  if (str(e.githubUrl)) out.push(link(str(e.githubUrl), "GitHub"));
  return out;
}

function byDateDesc(field) {
  return (a, b) =>
    str(b[field]).localeCompare(str(a[field])) || str(a.title).localeCompare(str(b.title));
}

function renderTable(current) {
  const rows = current
    .map(
      (e) => `            <tr>
              <th scope="row"><a href="#${e.id}">${escapeHtml(e.title)}</a></th>
              <td data-label="Author">${escapeHtml(e.author)}</td>
              <td data-label="Type">${escapeHtml(e.type)}</td>
              <td data-label="Source">${escapeHtml(e.source)}</td>
              <td data-label="Status">${escapeHtml(e.status)}</td>
              <td data-label="Started">${timeTag(e.startedAt, true)}</td>
            </tr>`
    )
    .join("\n");
  return `      <div class="reading-table-wrap" role="region" aria-label="Currently reading at a glance" tabindex="0">
        <table class="reading-table">
          <thead>
            <tr>
              <th scope="col">Resource</th>
              <th scope="col">Author</th>
              <th scope="col">Type</th>
              <th scope="col">Source</th>
              <th scope="col">Status</th>
              <th scope="col">Started</th>
            </tr>
          </thead>
          <tbody>
${rows}
          </tbody>
        </table>
      </div>`;
}

function renderCurrentEntry(e, index) {
  const i = "        ";
  const num = String(index + 1).padStart(2, "0");
  const links = resourceLinks(e);
  const notYet = `${i}<p class="placeholder">Not written yet.</p>`;
  const block = (heading, text, fallback) => {
    if (!str(text) && fallback === null) return "";
    return `\n${i}<h4>${heading}</h4>\n${str(text) ? paragraphs(text, i) : fallback}`;
  };
  const tags = (e.tags || []).filter(Boolean);

  return `      <article class="reading-entry" id="${e.id}" aria-labelledby="${e.id}-title">
${i}<h3 id="${e.id}-title"><span class="reading-num">${num}</span> ${escapeHtml(e.title)}</h3>
${i}<p class="reading-author">${escapeHtml(e.author)}</p>
${i}<dl class="reading-facts">
${i}  <div><dt>Type</dt><dd>${escapeHtml(e.type)}</dd></div>
${i}  <div><dt>Source</dt><dd>${escapeHtml(e.source)}</dd></div>
${i}  <div><dt>Status</dt><dd>${escapeHtml(e.status)}</dd></div>
${i}  <div><dt>Started</dt><dd>${timeTag(e.startedAt, false)}</dd></div>
${i}</dl>${links.length ? `\n${i}<p class="reading-links">${links.join(" · ")}</p>` : ""}${block(
    "Why I'm reading this",
    e.whyReading,
    notYet
  )}${block("What I'm learning", e.whatLearning, notYet)}${block(
    "What changed in my understanding",
    e.changedUnderstanding,
    notYet
  )}${block("What I'm applying", e.whatApplying, `${i}<p class="muted">Nothing applied yet.</p>`)}${block(
    "What I built from it",
    e.whatBuilt,
    null
  )}${tags.length ? `\n${i}<p class="meta reading-tags">Tags: ${tags.map(escapeHtml).join(", ")}</p>` : ""}
      </article>`;
}

function renderFinishedEntry(e) {
  const i = "        ";
  const links = resourceLinks(e);
  const facts = [e.author, e.type, e.source].map(escapeHtml).join(" · ");
  const parts = [
    labeledParagraphs("Takeaway:", str(e.takeaway) || str(e.whatLearning), i),
    labeledParagraphs("What changed:", e.changedUnderstanding, i),
    labeledParagraphs("Applied:", e.whatApplying, i),
    labeledParagraphs("Built:", e.whatBuilt, i),
  ].filter(Boolean);

  return `      <article class="reading-entry reading-entry--finished" id="${e.id}" aria-labelledby="${e.id}-title">
${i}<h3 id="${e.id}-title">${escapeHtml(e.title)}</h3>
${i}<p class="meta">${facts} · Finished ${timeTag(str(e.completedAt), false)}</p>${
    parts.length ? `\n${parts.join("\n")}` : ""
  }${links.length ? `\n${i}<p class="reading-links">${links.join(" · ")}</p>` : ""}
      </article>`;
}

function renderBuiltEntry(e) {
  const i = "        ";
  const heading = str(e.projectTitle) || `Built from ${str(e.title)}`;
  const change = str(e.buildInfluence) || str(e.changedUnderstanding);
  const links = resourceLinks(e, { includeSource: false });
  if (str(e.sourceUrl)) links.push(link(str(e.sourceUrl), "Source"));

  return `      <article class="reading-built" aria-labelledby="built-${e.id}">
${i}<h3 id="built-${e.id}">${escapeHtml(heading)}</h3>
${paragraphs(e.whatBuilt, i)}
${i}<p><strong>Influenced by:</strong> <a href="#${e.id}">${escapeHtml(e.title)}</a>, ${escapeHtml(e.author)}</p>${
    change ? `\n${labeledParagraphs("What changed:", change, i)}` : ""
  }${links.length ? `\n${i}<p class="reading-links">${links.join(" · ")}</p>` : ""}
      </article>`;
}

function renderLearning(topics, entriesById) {
  if (!topics.length) {
    return `      <p class="muted">No learning areas listed yet.</p>`;
  }
  const items = topics
    .map((t) => {
      const label = str(t.href)
        ? `<a href="${escapeHtml(str(t.href))}"${relFor(str(t.href))}>${escapeHtml(t.topic)}</a>`
        : escapeHtml(t.topic);
      const related = (t.related || [])
        .map((id) => entriesById.get(id))
        .filter(Boolean)
        .map((e) => `<a href="#${e.id}">${escapeHtml(e.title)}</a>`);
      return `        <li>${label} <span class="muted">; ${inline(str(t.description))}</span>${
        related.length ? ` <span class="muted">; related reading:</span> ${related.join(", ")}` : ""
      }</li>`;
    })
    .join("\n");
  return `      <ul class="home-list">\n${items}\n      </ul>`;
}

function renderHtml(data) {
  const entries = data.entries || [];
  const current = entries.filter((e) => CURRENT_STATUSES.includes(e.status)).sort(byDateDesc("startedAt"));
  const finished = entries.filter((e) => e.status === "Finished").sort(byDateDesc("completedAt"));
  const built = [...current, ...finished].filter((e) => str(e.whatBuilt));
  const entriesById = new Map(entries.map((e) => [e.id, e]));

  const updated = escapeHtml(str(data.updated));
  const title = "Currently Reading; Ayush Rai";
  const description =
    "What Ayush Rai is reading right now, with notes on what he's learning and building from it.";

  const currentHtml = current.length
    ? `${renderTable(current)}\n\n${current.map(renderCurrentEntry).join("\n\n")}`
    : `      <div class="reading-empty">
        <p>Nothing logged here yet.</p>
        <p class="muted">This page will document what I'm reading, learning, and building from.</p>
      </div>`;

  const finishedHtml = finished.length
    ? finished.map(renderFinishedEntry).join("\n\n")
    : `      <p class="muted">Nothing finished yet.</p>`;

  const builtHtml = built.length
    ? built.map(renderBuiltEntry).join("\n\n")
    : `      <p class="muted">Nothing yet. A project goes here once I can point to the resource behind a decision in it.</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="author" content="Ayush Rai">
  <meta name="theme-color" content="#ffffff">
  <link rel="canonical" href="${PAGE_URL}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${PAGE_URL}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml">
  <script>
    (function () {
      try {
        if (localStorage.getItem("theme") === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      } catch (e) {}
    })();
  </script>
  <link rel="stylesheet" href="${STYLESHEET}">
</head>
<body>
  <!-- Generated by scripts/build-reading.js from knowledge/reading/currently-reading.json. Edit the data file and rebuild; do not edit this HTML. -->
  <a class="skip-link" href="#content">Skip to content</a>
  <main id="content" class="page knowledge-page reading-log">
    <p class="section-label"><a href="../reading/index.html">Reading</a> / Currently Reading</p>
    <h1>What I'm reading, learning, and building from.</h1>
    <p class="tagline">A public log of the books, papers, documentation, research, systems, and ideas I'm spending time with, and what I take from them.</p>
    <p class="meta">Updated continuously. Last updated <time datetime="${updated}">${updated}</time>.</p>
    <nav class="reading-toc" aria-label="On this page">
      <a href="#currently-reading">Currently Reading</a>
      <a href="#finished">Finished</a>
      <a href="#learning">Learning</a>
      <a href="#built-from-reading">Built From Reading</a>
    </nav>

    <section aria-labelledby="currently-reading">
      <h2 id="currently-reading">Currently Reading</h2>
${currentHtml}
    </section>

    <section aria-labelledby="finished">
      <h2 id="finished">Finished</h2>
${finishedHtml}
    </section>

    <section aria-labelledby="learning">
      <h2 id="learning">Learning</h2>
      <p>Topics I'm working through right now, broader than any single book or paper.</p>
${renderLearning(data.learning || [], entriesById)}
    </section>

    <section aria-labelledby="built-from-reading">
      <h2 id="built-from-reading">Built From Reading</h2>
      <p>Projects where something I read changed a decision. Each one names the resource and what it changed.</p>
${builtHtml}
    </section>

    <p class="foot"><a href="../www/index.html">Home</a> · <a href="../reading/index.html">Reading</a> · <a href="../learning/index.html">Learning</a> · <a href="../projects/index.html">Projects</a></p>
  </main>
  <script src="/scripts/site-chrome.js" defer></script>
</body>
</html>
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const rel = (p) => path.relative(ROOT, p) || p;

  let data;
  try {
    data = JSON.parse(fs.readFileSync(args.data, "utf8"));
  } catch (e) {
    console.error(`Cannot read ${rel(args.data)}: ${e.message}`);
    process.exit(1);
  }

  const errors = validate(data);
  if (errors.length) {
    console.error(`Invalid ${rel(args.data)}:`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  const html = renderHtml(data);

  if (args.check) {
    const onDisk = fs.existsSync(args.out) ? fs.readFileSync(args.out, "utf8") : "";
    if (onDisk !== html) {
      console.error(`${rel(args.out)} is out of date. Run: npm run build:reading`);
      process.exit(1);
    }
    console.log(`${rel(args.out)} is up to date.`);
    return;
  }

  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  fs.writeFileSync(args.out, html, "utf8");
  console.log(`Wrote ${rel(args.out)}`);
}

main();
