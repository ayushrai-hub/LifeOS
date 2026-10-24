#!/usr/bin/env node
/**
 * Build the collection pages that grow over time.
 *
 * Reads:
 *   knowledge/work/work.json            proof-of-work index
 *   knowledge/books/books.json          books and the ideas they changed
 *   knowledge/influences/people.json    people whose work I learn from
 *
 * Writes:
 *   sites/work/index.html
 *   sites/books/index.html
 *   sites/influences/index.html
 *
 * Flags:
 *   --check   exit 1 if any page on disk is stale (writes nothing)
 *
 * Schemas: the README.md next to each data file.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ORIGIN = "https://life.ayushrai.site";
const OG_IMAGE = `${ORIGIN}/assets/images/portraits/ayush-rai--workspace-2024.jpg`;
const STYLESHEET = "/styles/site.css?v=20261025";

const DATE_RE = /^(\d{4})(?:-(0[1-9]|1[0-2]))?(?:-(0[1-9]|[12]\d|3[01]))?$/;
const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EXTERNAL_RE = /^https?:\/\/\S+$/;
const INTERNAL_RE = /^(\/|#)\S*$/;
const MD_LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const BOOK_STATUSES = ["Reading", "Re-reading", "Finished", "Paused"];
const WORK_STATUS_LABELS = {
  live: "Live",
  "public-code": "Public code",
  "synthetic-demo": "Synthetic demo",
  completed: "Completed",
  "in-progress": "In progress",
};

function workStatusLabel(id) {
  return WORK_STATUS_LABELS[id] || id.replace(/-/g, " ");
}

function str(v) {
  return typeof v === "string" ? v.trim() : "";
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

function paragraphs(text, indent) {
  return str(text)
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean)
    .map((p) => `${indent}<p>${inline(p)}</p>`)
    .join("\n");
}

function anchor(href, label) {
  return `<a href="${escapeHtml(href)}"${relFor(href)}>${escapeHtml(label)}</a>`;
}

function displayDate(d) {
  const m = DATE_RE.exec(d);
  if (!m) return escapeHtml(d);
  if (m[3]) return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
  if (m[2]) return `${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
  return m[1];
}

function timeTag(d) {
  return `<time datetime="${escapeHtml(d)}">${displayDate(d)}</time>`;
}

function hostLabel(href) {
  try {
    return new URL(href).host.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------- validation

function makeValidator(label) {
  const errors = [];
  const err = (where, msg) => errors.push(`${label} ${where}: ${msg}`);
  const walkStrings = (value, where) => {
    if (typeof value === "string") {
      if (value.includes("\u2014")) err(where, "contains an em dash; use a comma, semicolon, or period");
      for (const m of value.matchAll(MD_LINK_RE)) checkHref(`${where} link`, m[2]);
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => walkStrings(v, `${where}[${i}]`));
    } else if (value && typeof value === "object") {
      for (const [k, v] of Object.entries(value)) walkStrings(v, `${where}.${k}`);
    }
  };
  const checkHref = (where, href, { externalOnly = false } = {}) => {
    if (EXTERNAL_RE.test(href)) return;
    if (!externalOnly && INTERNAL_RE.test(href)) return;
    err(where, `invalid URL "${href}"${externalOnly ? " (must be http:// or https://)" : " (use https:// or a root-absolute /path)"}`);
  };
  const checkLinks = (where, links, opts) => {
    if (links === undefined) return;
    if (!Array.isArray(links)) return err(where, "must be an array of { label, href }");
    links.forEach((l, i) => {
      if (!l || !str(l.label) || !str(l.href)) return err(`${where}[${i}]`, "needs label and href");
      checkHref(`${where}[${i}]`, str(l.href), opts);
    });
  };
  const checkDate = (where, d, required) => {
    if (!str(d)) {
      if (required) err(where, "is required (YYYY, YYYY-MM, or YYYY-MM-DD)");
      return;
    }
    if (!DATE_RE.test(str(d))) err(where, "must be YYYY, YYYY-MM, or YYYY-MM-DD");
  };
  const checkEntryBase = (data, ids) => {
    checkDate("updated", data.updated, true);
    if (!Array.isArray(data.entries)) {
      err("entries", "must be an array");
      return [];
    }
    walkStrings(data, "data");
    return data.entries.filter((e, i) => {
      const where = `entries[${i}]${e && e.id ? ` (${e.id})` : ""}`;
      if (!e || typeof e !== "object") {
        err(where, "must be an object");
        return false;
      }
      if (!ID_RE.test(str(e.id))) err(where, "id must be kebab-case");
      else if (ids.has(e.id)) err(where, "duplicate id");
      ids.add(e.id);
      return true;
    });
  };
  return { errors, err, checkHref, checkLinks, checkDate, checkEntryBase };
}

function validateWork(data) {
  const v = makeValidator("work.json");
  const ids = new Set();
  const statuses = data.statuses && typeof data.statuses === "object" ? data.statuses : {};
  if (!Object.keys(statuses).length) v.err("statuses", "must map status ids to a meaning");
  const categories = Array.isArray(data.categories) ? data.categories : [];
  if (!categories.length) v.err("categories", "must be a non-empty array");
  const categoryIds = new Set();
  categories.forEach((c, i) => {
    if (!c || !ID_RE.test(str(c.id))) return v.err(`categories[${i}]`, "id must be kebab-case");
    if (!str(c.label)) v.err(`categories[${i}]`, "label is required");
    categoryIds.add(c.id);
  });
  const entries = v.checkEntryBase(data, ids);
  entries.forEach((e, i) => {
    const where = `entries[${i}] (${e.id})`;
    for (const f of ["title", "summary", "href"]) if (!str(e[f])) v.err(where, `${f} is required`);
    if (!categoryIds.has(e.category)) v.err(where, `category must be one of: ${[...categoryIds].join(", ")}`);
    if (!statuses[e.status]) v.err(where, `status must be one of: ${Object.keys(statuses).join(", ")}`);
    v.checkDate(`${where}.date`, e.date, false);
    if (str(e.href)) v.checkHref(`${where}.href`, str(e.href));
    v.checkLinks(`${where}.links`, e.links);
  });
  entries.forEach((e, i) => {
    for (const id of e.related || []) {
      if (!ids.has(id)) v.err(`entries[${i}] (${e.id})`, `related id "${id}" does not match any entry`);
    }
  });
  return v.errors;
}

function validateBooks(data) {
  const v = makeValidator("books.json");
  const entries = v.checkEntryBase(data, new Set());
  entries.forEach((e, i) => {
    const where = `entries[${i}] (${e.id})`;
    for (const f of ["title", "author"]) if (!str(e[f])) v.err(where, `${f} is required`);
    if (!BOOK_STATUSES.includes(e.status)) v.err(where, `status must be one of: ${BOOK_STATUSES.join(", ")}`);
    v.checkDate(`${where}.finishedAt`, e.finishedAt, e.status === "Finished");
    if (e.ideas !== undefined && !(Array.isArray(e.ideas) && e.ideas.every((x) => typeof x === "string")))
      v.err(where, "ideas must be an array of strings");
    if (e.connections !== undefined && !(Array.isArray(e.connections) && e.connections.every((x) => typeof x === "string")))
      v.err(where, "connections must be an array of strings");
    if (str(e.changedApproach) && e.confirmedByOwner !== true)
      v.err(where, "changedApproach is only published with confirmedByOwner: true");
    if (str(e.sourceUrl)) v.checkHref(`${where}.sourceUrl`, str(e.sourceUrl), { externalOnly: true });
    v.checkLinks(`${where}.related`, e.related);
  });
  return v.errors;
}

function validatePeople(data) {
  const v = makeValidator("people.json");
  const entries = v.checkEntryBase(data, new Set());
  entries.forEach((e, i) => {
    const where = `entries[${i}] (${e.id})`;
    for (const f of ["name", "field", "contribution"]) if (!str(e[f])) v.err(where, `${f} is required`);
    if (!str(e.ideas) && !str(e.lessons)) v.err(where, "needs ideas or lessons; a name alone is not an entry");
    if (!Array.isArray(e.sources) || !e.sources.length) v.err(where, "sources are required for the factual contribution");
    v.checkLinks(`${where}.sources`, e.sources, { externalOnly: true });
    v.checkLinks(`${where}.related`, e.related);
  });
  return v.errors;
}

// ---------------------------------------------------------------- page shell

function breadcrumbLd(crumbs) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${ORIGIN}${c.href === "/" ? "/" : c.href}`,
    })),
  };
}

function shell({ title, description, urlPath, crumbs, graph, source, body }) {
  const url = `${ORIGIN}${urlPath}`;
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const ld = JSON.stringify(
    { "@context": "https://schema.org", "@graph": [breadcrumbLd(crumbs), ...graph] },
    null,
    2
  ).replace(/</g, "\\u003c");
  const crumbHtml = crumbs
    .map((c, i) => (i === crumbs.length - 1 ? escapeHtml(c.label) : anchor(c.href, c.label)))
    .join(" / ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${t}</title>
  <meta name="description" content="${d}">
  <meta name="author" content="Ayush Rai">
  <meta name="theme-color" content="#ffffff">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${t}">
  <meta property="og:description" content="${d}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${t}">
  <meta name="twitter:description" content="${d}">
  <meta name="twitter:image" content="${OG_IMAGE}">
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
  <script type="application/ld+json">
${ld}
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
</head>
<body>
  <!-- Generated by scripts/build-collections.js from ${source}. Edit the data file and rebuild; do not edit this HTML. -->
  <a class="skip-link" href="#content">Skip to content</a>
  <main id="content" class="page knowledge-page">
    <nav class="section-label" aria-label="Breadcrumb">${crumbHtml}</nav>
${body}
  </main>
  <script src="/scripts/site-chrome.js" defer></script>
</body>
</html>
`;
}

// ---------------------------------------------------------------- work

function renderWorkItem(e, byId) {
  const i = "          ";
  const external = EXTERNAL_RE.test(e.href);
  const meta = [escapeHtml(workStatusLabel(e.status))];
  if (str(e.date)) meta.push(timeTag(str(e.date)));
  if (external) meta.push(`on ${escapeHtml(hostLabel(e.href))}`);
  const extras = [];
  if (str(e.role)) extras.push(`Role: ${escapeHtml(e.role)}`);
  for (const l of e.links || []) extras.push(anchor(l.href, l.label));
  const related = (e.related || [])
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map((r) => `<a href="#work-${r.id}">${escapeHtml(r.title)}</a>`);
  if (related.length) extras.push(`Related: ${related.join(", ")}`);

  return `        <li class="work-item" id="work-${e.id}">
${i}<p class="work-item__title">${anchor(e.href, e.title)} <span class="muted">· ${meta.join(" · ")}</span></p>
${i}<p>${inline(e.summary)}</p>${extras.length ? `\n${i}<p class="meta">${extras.join(" · ")}</p>` : ""}
        </li>`;
}

function renderWork(data) {
  const entries = data.entries;
  const byId = new Map(entries.map((e) => [e.id, e]));
  const filled = data.categories.filter((c) => entries.some((e) => e.category === c.id));
  const featured = entries.filter((e) => e.featured);

  const toc = filled.map((c) => `<a href="#${c.id}">${escapeHtml(c.label)}</a>`).join("\n      ");
  const featuredHtml = featured.length
    ? `
    <section aria-labelledby="start-here">
      <h2 id="start-here">Start here</h2>
      <ul class="home-list">
${featured
  .map((e) => `        <li><a href="#work-${e.id}">${escapeHtml(e.title)}</a> <span class="muted">; ${escapeHtml(
    data.categories.find((c) => c.id === e.category).label
  )}</span></li>`)
  .join("\n")}
      </ul>
    </section>`
    : "";

  const sections = filled
    .map((c) => {
      const items = entries.filter((e) => e.category === c.id);
      return `
    <section aria-labelledby="${c.id}">
      <h2 id="${c.id}">${escapeHtml(c.label)}</h2>${str(c.description) ? `\n      <p class="muted">${inline(c.description)}</p>` : ""}
      <ul class="work-list">
${items.map((e) => renderWorkItem(e, byId)).join("\n")}
      </ul>
    </section>`;
    })
    .join("\n");

  const legend = Object.entries(data.statuses)
    .filter(([id]) => entries.some((e) => e.status === id))
    .map(([id, meaning]) => `        <div><dt>${escapeHtml(workStatusLabel(id))}</dt><dd>${inline(meaning)}</dd></div>`)
    .join("\n");

  const body = `    <h1>Work</h1>
    <p class="tagline">Proof of work: what I have built, shipped, researched, and contributed to.</p>
${paragraphs(data.intro, "    ")}
    <p class="meta">Last updated ${timeTag(str(data.updated))}.</p>
    <nav class="reading-toc" aria-label="On this page">
      ${toc}
    </nav>
${featuredHtml}
${sections}

    <section aria-labelledby="status-labels">
      <h2 id="status-labels">How to read the labels</h2>
      <dl class="work-legend">
${legend}
      </dl>
      <p>Metrics appear only where the linked page can back them. A public repository means the code is public, not that the product is finished.</p>
    </section>

    <p class="foot"><a href="/">Home</a> · <a href="/about">About</a> · <a href="/sites/projects">Projects</a> · <a href="/sites/products">Products</a> · <a href="/sites/career">Career</a></p>`;

  return shell({
    title: "Work; Ayush Rai",
    description:
      "Proof of work from Ayush Rai: products, AI systems, GTM engineering, audit tooling, research, and public policy, each linked to its evidence.",
    urlPath: "/sites/work",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Work", href: "/sites/work" },
    ],
    graph: [
      {
        "@type": "CollectionPage",
        "@id": `${ORIGIN}/sites/work#page`,
        url: `${ORIGIN}/sites/work`,
        name: "Work",
        isPartOf: { "@id": `${ORIGIN}/#website` },
        about: { "@id": `${ORIGIN}/#person` },
        dateModified: str(data.updated),
      },
    ],
    source: "knowledge/work/work.json",
    body,
  });
}

// ---------------------------------------------------------------- books

function renderBook(e) {
  const i = "        ";
  const facts = [`<div><dt>Status</dt><dd>${escapeHtml(e.status)}</dd></div>`];
  if (str(e.finishedAt)) facts.push(`<div><dt>Finished</dt><dd>${timeTag(str(e.finishedAt))}</dd></div>`);
  const block = (heading, html) => (html ? `\n${i}<h4>${heading}</h4>\n${html}` : "");
  const ideas = (e.ideas || []).filter(Boolean);
  const links = [];
  if (str(e.sourceUrl)) links.push(anchor(str(e.sourceUrl), "About the book"));
  for (const l of e.related || []) links.push(anchor(l.href, l.label));

  return `      <article class="reading-entry" id="${e.id}" aria-labelledby="${e.id}-title">
${i}<h3 id="${e.id}-title">${escapeHtml(e.title)}</h3>
${i}<p class="reading-author">${escapeHtml(e.author)}</p>
${i}<dl class="reading-facts">
${facts.map((f) => `${i}  ${f}`).join("\n")}
${i}</dl>${block(
    "Main ideas",
    ideas.length ? `${i}<ul>\n${ideas.map((x) => `${i}  <li>${inline(x)}</li>`).join("\n")}\n${i}</ul>` : ""
  )}${block("What I took from it", str(e.takeaways) ? paragraphs(e.takeaways, i) : "")}${block(
    "What changed in how I work",
    str(e.changedApproach) ? paragraphs(e.changedApproach, i) : ""
  )}${(e.connections || []).length ? `\n${i}<p class="meta reading-tags">Connects to: ${e.connections.map(escapeHtml).join(", ")}</p>` : ""}${
    links.length ? `\n${i}<p class="reading-links">${links.join(" · ")}</p>` : ""
  }
      </article>`;
}

function renderBooks(data) {
  const entries = data.entries;
  const listHtml = entries.length
    ? entries.map(renderBook).join("\n\n")
    : `      <div class="reading-empty">
        <p>No books are listed yet.</p>
        <p class="muted">A book is added once I can say what it changed, not only what it contains.</p>
      </div>`;

  const body = `    <h1>Books and ideas</h1>
    <p class="tagline">Books connected to the ideas and practices they changed.</p>
    <p>Books earn a place here when they change how I build or decide. Each note says what the book argues, what I took from it, and, where it is true, what I now do differently. This is not a review directory.</p>
    <p class="meta">What I am reading right now lives on <a href="/sites/currently-reading">Currently Reading</a>. Last updated ${timeTag(str(data.updated))}.</p>

    <section aria-labelledby="books">
      <h2 id="books">Books</h2>
${listHtml}
    </section>

    <p class="foot"><a href="/">Home</a> · <a href="/sites/reading">Reading</a> · <a href="/sites/influences">Influences</a> · <a href="/sites/writing">Writing</a></p>`;

  return shell({
    title: "Books; Ayush Rai",
    description: "Reading list and book notes curated by Ayush Rai.",
    urlPath: "/sites/books",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Reading", href: "/sites/reading" },
      { label: "Books", href: "/sites/books" },
    ],
    graph: [
      {
        "@type": "CollectionPage",
        "@id": `${ORIGIN}/sites/books#page`,
        url: `${ORIGIN}/sites/books`,
        name: "Books and ideas",
        isPartOf: { "@id": `${ORIGIN}/#website` },
        dateModified: str(data.updated),
      },
    ],
    source: "knowledge/books/books.json",
    body,
  });
}

// ---------------------------------------------------------------- people

function renderPerson(e) {
  const i = "        ";
  const block = (heading, text) => (str(text) ? `\n${i}<h4>${heading}</h4>\n${paragraphs(text, i)}` : "");
  const sources = (e.sources || []).map((s) => anchor(s.href, s.label));
  const related = (e.related || []).map((l) => anchor(l.href, l.label));

  return `      <article class="reading-entry" id="${e.id}" aria-labelledby="${e.id}-title">
${i}<h3 id="${e.id}-title">${escapeHtml(e.name)}</h3>
${i}<p class="reading-author">${escapeHtml(e.field)}</p>${block("What they did", e.contribution)}${
    sources.length ? `\n${i}<p class="meta">Sources: ${sources.join(" · ")}</p>` : ""
  }${block("Ideas I find useful", e.ideas)}${block("What I have learned", e.lessons)}${block(
    "How it shows up in my work",
    e.influence
  )}${related.length ? `\n${i}<p class="reading-links">Related: ${related.join(" · ")}</p>` : ""}
      </article>`;
}

function renderPeople(data) {
  const entries = data.entries;
  const listHtml = entries.length
    ? entries.map(renderPerson).join("\n\n")
    : `      <div class="reading-empty">
        <p>No one is listed yet.</p>
        <p class="muted">Entries are added once I can say what I learned from the person's work and point to sources for what they did.</p>
      </div>`;

  const body = `    <h1>People whose work I learn from</h1>
    <p class="tagline">People across society, business, and leadership, and what I take from their work.</p>
    <p>These are not biographies. Each entry keeps two things apart: what the person did, with sources, and my reading of why it matters. Listing someone here means I study their work. It does not mean I know them or have worked with them.</p>
    <p class="meta">Last updated ${timeTag(str(data.updated))}.</p>

    <section aria-labelledby="people">
      <h2 id="people">People</h2>
${listHtml}
    </section>

    <p class="foot"><a href="/">Home</a> · <a href="/about">About</a> · <a href="/about/story">Story</a> · <a href="/sites/books">Books</a></p>`;

  return shell({
    title: "Influences; Ayush Rai",
    description:
      "People whose work Ayush Rai studies across society, business, and leadership, with sources for what they did and notes on what he learned.",
    urlPath: "/sites/influences",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Influences", href: "/sites/influences" },
    ],
    graph: [
      {
        "@type": "CollectionPage",
        "@id": `${ORIGIN}/sites/influences#page`,
        url: `${ORIGIN}/sites/influences`,
        name: "People whose work I learn from",
        isPartOf: { "@id": `${ORIGIN}/#website` },
        dateModified: str(data.updated),
      },
    ],
    source: "knowledge/influences/people.json",
    body,
  });
}

// ---------------------------------------------------------------- main

const COLLECTIONS = [
  { data: "knowledge/work/work.json", out: "sites/work/index.html", validate: validateWork, render: renderWork },
  { data: "knowledge/books/books.json", out: "sites/books/index.html", validate: validateBooks, render: renderBooks },
  { data: "knowledge/influences/people.json", out: "sites/influences/index.html", validate: validatePeople, render: renderPeople },
];

function main() {
  const check = process.argv.includes("--check");
  let failed = false;

  for (const c of COLLECTIONS) {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(path.join(ROOT, c.data), "utf8"));
    } catch (e) {
      console.error(`Cannot read ${c.data}: ${e.message}`);
      failed = true;
      continue;
    }
    const errors = c.validate(data);
    if (errors.length) {
      console.error(`Invalid ${c.data}:`);
      for (const e of errors) console.error(`  - ${e}`);
      failed = true;
      continue;
    }
    const html = c.render(data);
    const outPath = path.join(ROOT, c.out);
    if (check) {
      const onDisk = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8") : "";
      if (onDisk !== html) {
        console.error(`${c.out} is out of date. Run: npm run build:collections`);
        failed = true;
      } else {
        console.log(`${c.out} is up to date.`);
      }
      continue;
    }
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, "utf8");
    console.log(`Wrote ${c.out}`);
  }

  if (failed) process.exit(1);
}

main();
