#!/usr/bin/env node
/**
 * Build the www homepage from knowledge.
 *
 * Reads:
 *   knowledge/_system/homepage.yaml   (editorial)
 *   knowledge/person/profile.yaml
 *   knowledge/learning/currently-learning.md
 *   knowledge/_system/site-status.yaml
 *   knowledge/reading/currently-reading.json
 *   data/imports/github-knowledge-index.json
 *   knowledge/contact/*.yaml, knowledge/social/*.yaml
 *
 * Writes:
 *   data/home.json
 *   sites/www/index.html
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const KNOWLEDGE = path.join(ROOT, "knowledge");

function read(p) {
  return fs.readFileSync(p, "utf8");
}

function write(p, text) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text, "utf8");
}

/** Parse knowledge/_system/homepage.yaml (fixed editorial shape). */
function loadHomepageYaml(filePath) {
  const text = read(filePath);
  const data = {
    name: "",
    tagline: "",
    intro: [],
    doors: {},
    doors_nav: [],
    contact: [],
    footer: "",
    contact_note: "",
    limits: { current_focus: 5, latest_work: 6, recently_updated: 5 },
    latest_work_pins: [],
    focus_blurbs: [],
  };

  let section = null;
  for (const rawLine of text.replace(/\r\n/g, "\n").split("\n")) {
    const line = rawLine.replace(/\s+#.*$/, "");
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const indent = line.match(/^ */)[0].length;
    const trimmed = line.trim();

    if (indent === 0 && trimmed.endsWith(":") && !trimmed.includes(" ")) {
      section = trimmed.slice(0, -1);
      continue;
    }

    if (indent === 0 && trimmed.includes(":")) {
      section = null;
      const i = trimmed.indexOf(":");
      const key = trimmed.slice(0, i).trim();
      let val = trimmed.slice(i + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (
        key === "name" ||
        key === "tagline" ||
        key === "seo_title" ||
        key === "seo_description" ||
        key === "footer" ||
        key === "contact_note"
      )
        data[key] = val;
      continue;
    }

    if (section === "intro" && trimmed.startsWith("- ")) {
      let val = trimmed.slice(2).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      data.intro.push(val);
      continue;
    }

    if (section === "doors_nav" && trimmed.startsWith("- ")) {
      let val = trimmed.slice(2).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      data.doors_nav.push(val);
      continue;
    }

    if (section === "doors" && trimmed.includes(":")) {
      const i = trimmed.indexOf(":");
      const key = trimmed.slice(0, i).trim();
      let val = trimmed.slice(i + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      data.doors[key] = val;
      continue;
    }

    if (section === "contact" && trimmed.startsWith("- ")) {
      let val = trimmed.slice(2).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      data.contact.push(val);
      continue;
    }

    if (section === "limits" && trimmed.includes(":")) {
      const i = trimmed.indexOf(":");
      const key = trimmed.slice(0, i).trim();
      const val = Number(trimmed.slice(i + 1).trim());
      data.limits[key] = val;
      continue;
    }

    if (section === "latest_work_pins") {
      if (trimmed.startsWith("- title:")) {
        let val = trimmed.replace(/^- title:\s*/, "").trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        data.latest_work_pins.push({
          title: val,
          date: "",
          summary: "",
          href: "",
          external: true,
          kind: "pin",
        });
        continue;
      }
      const last = data.latest_work_pins[data.latest_work_pins.length - 1];
      if (!last) continue;
      const field = trimmed.match(
        /^(date|summary|href|external|kind):\s*(.*)$/
      );
      if (!field) continue;
      let val = field[2].trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (field[1] === "external") {
        last.external = val !== "false";
      } else {
        last[field[1]] = val;
      }
      continue;
    }

    if (section === "focus_blurbs") {
      if (trimmed.startsWith("- match:")) {
        let val = trimmed.replace(/^- match:\s*/, "").trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        data.focus_blurbs.push({ match: val, short_title: null, blurb: null });
        continue;
      }
      const last = data.focus_blurbs[data.focus_blurbs.length - 1];
      if (!last) continue;
      if (trimmed.startsWith("short_title:")) {
        let val = trimmed.replace(/^short_title:\s*/, "").trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        last.short_title = val;
      } else if (trimmed.startsWith("blurb:")) {
        let val = trimmed.replace(/^blurb:\s*/, "").trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        last.blurb = val;
      }
      continue;
    }
  }

  return data;
}

function loadEntityYaml(filePath) {
  const text = read(filePath);
  const out = {};
  for (const raw of text.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith(" ") || line.startsWith("-")) continue;
    const i = line.indexOf(":");
    if (i === -1) continue;
    let v = line.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[line.slice(0, i).trim()] = v;
  }
  return out;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mdLinksToHtml(text, doors) {
  return escapeHtml(text).replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, label, key) => {
      const href = doors[key];
      if (!href) {
        console.warn(`Unknown door key: ${key}`);
        return escapeHtml(label);
      }
      return `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
    }
  );
}

function parseCurrentlyLearning(md) {
  const items = [];
  const blocks = md.split(/\n### /).slice(1);
  for (const block of blocks) {
    const lines = block.split("\n");
    const titleLine = lines[0] || "";
    const title = titleLine.replace(/^\d+\.\s*/, "").trim();
    if (!title || title.toLowerCase().includes("not currently")) continue;

    let stage = "";
    let why = "";
    let domain = "";
    for (const line of lines) {
      if (/\|\s*\*\*Stage\*\*/i.test(line)) {
        stage = line.split("|").map((c) => c.trim()).filter(Boolean)[1] || "";
        stage = stage.replace(/\*\*/g, "");
      }
      if (/\|\s*\*\*Why interested\*\*/i.test(line)) {
        why = line.split("|").map((c) => c.trim()).filter(Boolean)[1] || "";
        why = why.replace(/\*\*/g, "");
      }
      const domainMatch = line.match(/\`\[?domains\/([^\]]+\.md)\]?/);
      if (domainMatch) domain = domainMatch[1];
      const linkMatch = line.match(/\[`?domains\/([^\]`]+)`?\]/);
      if (linkMatch) domain = linkMatch[1];
    }

    // Skip the "Active building habit" style sections without tables
    if (!stage && !why) continue;

    const shortTitle = title.split(/[; –]/)[0].trim();
    const blurb = why
      ? why
          .replace(/^Multiple repos dedicated to /i, "")
          .replace(/\.$/, "")
      : stage || null;

    items.push({
      title,
      short_title: shortTitle,
      stage: stage || null,
      summary: why || null,
      blurb,
      href: "/sites/learning",
      source: "knowledge/learning/currently-learning.md",
    });
  }
  return items;
}

const SHORT_BLURBS = {
  "RLHF-tasks": "coding-agent evaluation toolchain (Harbor / Terminus)",
  "security-audit": "read-only cross-platform host audit toolkit",
  amex: "deterministic P&L scoring for 500k cardmembers",
  "OpenAI-RLHF": "coding-eval task archive (not an RLHF trainer)",
  "IAS-system": "OCR → SOP → score audit pipeline",
  SoPia: "deterministic FIR compliance auditor",
  "adaptive-rag": "adaptive RAG with LangGraph and Qdrant",
  FileU: "safety-first file organizer (dry-run default)",
  chatbot: "appointment chatbot without LLM calls",
};

function loadLatestWork(limit) {
  const indexPath = path.join(ROOT, "data/imports/github-knowledge-index.json");
  if (!fs.existsSync(indexPath)) return [];
  const repos = JSON.parse(read(indexPath));
  const skipNames = new Set([
    "ayushrai-hub",
    "daily-commit-work",
    "gitutorialdemo",
  ]);

  function eligible(r) {
    return (
      !r.fork &&
      r.readme === "ok" &&
      (r.readme_chars || 0) > 400 &&
      !skipNames.has(String(r.name || "").toLowerCase()) &&
      r.status !== "stub"
    );
  }

  const showcase = repos
    .filter(eligible)
    .filter((r) => r.portfolio === "showcase")
    .sort((a, b) => String(b.pushed).localeCompare(String(a.pushed)));

  const review = repos
    .filter(eligible)
    .filter((r) => r.portfolio === "review")
    .sort((a, b) => String(b.pushed).localeCompare(String(a.pushed)));

  const ranked = [...showcase, ...review].slice(0, limit);

  return ranked.map((r) => ({
    title: r.name,
    date: (r.pushed || "").slice(0, 10),
    summary: SHORT_BLURBS[r.name] || r.short || "",
    href: r.url,
    kind: "repository",
    external: true,
  }));
}

function loadRecentlyUpdated(limit, learningUpdated) {
  const status = loadEntityYaml(path.join(KNOWLEDGE, "_system/site-status.yaml"));
  const items = [];

  const readingPath = path.join(KNOWLEDGE, "reading/currently-reading.json");
  if (fs.existsSync(readingPath)) {
    const reading = JSON.parse(read(readingPath));
    if (reading.updated) {
      items.push({
        title: "Currently Reading",
        date: reading.updated,
        summary: "What I'm reading, learning, and building from.",
        href: "/sites/currently-reading",
      });
    }
  }

  if (status.knowledge_last_updated) {
    items.push({
      title: "Knowledge base",
      date: status.knowledge_last_updated,
      summary: "Identity inventory and system status refreshed.",
      href: "/sites/learning",
    });
  }

  if (learningUpdated) {
    items.push({
      title: "Currently learning",
      date: learningUpdated,
      summary: "Active study and practice areas from public evidence.",
      href: "/sites/learning",
    });
  }

  items.push({
    title: "GitHub ingest",
    date: "2026-07-23",
    summary: "Public repositories indexed for projects and latest work.",
    href: "/sites/projects",
  });

  items.push({
    title: "Projects index",
    date: "2026-07-23",
    summary: "Canonical project entities under knowledge/projects.",
    href: "/sites/projects",
  });

  return items.slice(0, limit);
}

function resolveContact(ids) {
  const out = [];
  for (const id of ids) {
    const slug = id.split(".")[1];
    const candidates = [
      path.join(KNOWLEDGE, "contact", `${slug}.yaml`),
      path.join(KNOWLEDGE, "social", `${slug}.yaml`),
      path.join(KNOWLEDGE, "business", `${slug}.yaml`),
    ];
    const file = candidates.find((p) => fs.existsSync(p));
    if (!file) {
      console.warn(`Contact entity missing: ${id}`);
      continue;
    }
    const ent = loadEntityYaml(file);
    const label =
      ent.platform ||
      ent.title ||
      (ent.url && ent.url.startsWith("mailto:") ? "Email" : slug);
    let href = ent.url || "";
    let text = label;
    if (href.startsWith("mailto:")) {
      text = ent.username || href.replace(/^mailto:/, "");
    } else if (href.startsWith("tel:")) {
      text = ent.username || href.replace(/^tel:/, "");
    } else if (ent.username && /github|linkedin|x\.com|twitter/i.test(href)) {
      text = label;
    }
    out.push({
      id,
      label,
      text,
      href,
    });
  }
  return out;
}

function learningFrontmatterDate(md) {
  const m = md.match(/^---[\s\S]*?^updated:\s*([0-9-]+)/m);
  return m ? m[1] : null;
}

const DOOR_LABELS = {
  ai: "AI",
  "open-source": "open source",
};

function renderHtml(home) {
  const introHtml = (home.intro || [])
    .map((p) => `        <p class="home-intro">${mdLinksToHtml(p, home.doors)}</p>`)
    .join("\n");

  const doorKeys =
    home.doors_nav && home.doors_nav.length
      ? home.doors_nav
      : Object.keys(home.doors || {});
  const doorsHtml = doorKeys
    .filter((key) => home.doors[key])
    .map((key) => {
      const label = DOOR_LABELS[key] || key.replace(/-/g, " ");
      return `          <a href="${escapeHtml(home.doors[key])}">${escapeHtml(
        label
      )}</a>`;
    })
    .join("\n");

  const focusHtml = home.current_focus
    .map((item) => {
      const label = item.short_title || item.title;
      const meta = item.blurb || item.summary || item.stage || "";
      return `          <li><a href="${escapeHtml(item.href)}">${escapeHtml(
        label
      )}</a>${
        meta ? ` <span class="muted">; ${escapeHtml(meta)}</span>` : ""
      }</li>`;
    })
    .join("\n");

  const latestHtml = home.latest_work
    .map((item) => {
      const rel = item.external ? ' rel="noopener noreferrer"' : "";
      const date = item.date
        ? `<time datetime="${escapeHtml(item.date)}">${escapeHtml(
            item.date
          )}</time> `
        : "";
      return `          <li>${date}<a href="${escapeHtml(item.href)}"${rel}>${escapeHtml(
        item.title
      )}</a>${
        item.summary
          ? ` <span class="muted">; ${escapeHtml(item.summary)}</span>`
          : ""
      }</li>`;
    })
    .join("\n");

  const recentHtml = home.recently_updated
    .map((item) => {
      const date = item.date
        ? `<time datetime="${escapeHtml(item.date)}">${escapeHtml(
            item.date
          )}</time> `
        : "";
      return `          <li>${date}<a href="${escapeHtml(item.href)}">${escapeHtml(
        item.title
      )}</a>${
        item.summary
          ? ` <span class="muted">; ${escapeHtml(item.summary)}</span>`
          : ""
      }</li>`;
    })
    .join("\n");

  const contactHtml = home.contact
    .map((c) => {
      const rel = c.href.startsWith("http") ? ' rel="noopener noreferrer"' : "";
      const note =
        home.contact_note && c.href.startsWith("mailto:")
          ? ` <span class="muted">(${escapeHtml(home.contact_note)})</span>`
          : "";
      return `<a href="${escapeHtml(c.href)}"${rel}>${escapeHtml(
        c.text
      )}</a>${note}`;
    })
    .join("\n          ·\n          ");

  const personSchemaPath = path.join(KNOWLEDGE, "person/schema-person.jsonld");
  const personSchema = fs.existsSync(personSchemaPath)
    ? JSON.parse(read(personSchemaPath))
    : null;
  if (personSchema && home.latest_work.length) {
    // Mirrors the visible Latest Work panel; keep it derived from the same list.
    const products = [];
    const itemListElement = home.latest_work.map((item, index) => {
      const isRepo = /^https:\/\/github\.com\//.test(item.href);
      const node = {
        // Non-repository Latest Work entries are Ayush's live products (e.g. RevenueRoles).
        "@type": isRepo ? "SoftwareSourceCode" : "Product",
        name: item.title,
        description: item.summary || undefined,
        url: item.href,
        ...(isRepo ? { codeRepository: item.href } : { category: "Software" }),
        ...(item.date ? { dateModified: item.date } : {}),
        creator: { "@id": "https://life.ayushrai.site/#person" },
      };
      if (!isRepo) {
        node["@id"] = `https://life.ayushrai.site/#product-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        products.push(node);
      }
      return { "@type": "ListItem", position: index + 1, item: isRepo ? node : { "@id": node["@id"] } };
    });
    personSchema["@graph"].push(...products, {
      "@type": "ItemList",
      "@id": "https://life.ayushrai.site/#latest-work",
      name: "Latest Work",
      itemListElement,
    });
  }
  const schemaHtml = personSchema
    ? `  <script type="application/ld+json">\n${JSON.stringify(personSchema, null, 2)}\n  </script>`
    : "";

  const pageTitle = home.seo_title || `${home.name}; AI Engineer in Bhopal`;
  const pageDescription = home.seo_description || home.tagline;
  const ogImage =
    "https://life.ayushrai.site/assets/images/portraits/ayush-rai--workspace-2024.jpg";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(pageDescription)}">
  <meta name="author" content="${escapeHtml(home.name)}">
  <meta name="theme-color" content="#ffffff">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(pageDescription)}">
  <meta property="og:type" content="profile">
  <meta property="og:site_name" content="life.ayushrai.site">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}">
  <meta name="twitter:description" content="${escapeHtml(pageDescription)}">
  <link rel="canonical" href="https://life.ayushrai.site/">
  <link rel="alternate" type="text/markdown" href="https://life.ayushrai.site/index.md">
  <meta property="og:url" content="https://life.ayushrai.site/">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1600">
  <meta property="og:image:height" content="1067">
  <meta property="og:image:alt" content="Ayush Rai at a workspace">
  <meta name="twitter:image" content="${ogImage}">
  <script>
    (function () {
      try {
        if (localStorage.getItem("theme") === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      } catch (e) {}
    })();
  </script>
  <link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles/site.css?v=20260724c">
${schemaHtml}
</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <main id="content" class="page home">
    <div class="home-hero">
      <figure class="home-photo">
        <img
          src="/assets/images/portraits/ayush-rai--workspace-2024.jpg"
          width="1600"
          height="1067"
          alt="Ayush Rai working on a laptop in a workspace, with a whiteboard of notes behind him."
          decoding="async"
          fetchpriority="high"
        >
      </figure>

      <div class="home-lede">
        <header>
          <h1>${escapeHtml(home.name)}</h1>
          <p class="tagline">${escapeHtml(home.tagline)}</p>
        </header>

${introHtml}

        <nav class="home-doors" aria-label="Browse">
${doorsHtml}
        </nav>

        <p class="home-contact">
          ${contactHtml}
        </p>
      </div>
    </div>

    <div class="home-panels">
      <section aria-labelledby="current-focus">
        <h2 id="current-focus">Current Focus</h2>
        <ul class="home-list">
${focusHtml || '          <li class="muted">Nothing published yet.</li>'}
        </ul>
      </section>

      <section aria-labelledby="latest-work">
        <h2 id="latest-work">Latest Work</h2>
        <ul class="home-list">
${latestHtml || '          <li class="muted">Nothing published yet.</li>'}
        </ul>
      </section>

      <section aria-labelledby="recently-updated">
        <h2 id="recently-updated">Recently Updated</h2>
        <ul class="home-list">
${recentHtml || '          <li class="muted">Nothing published yet.</li>'}
        </ul>
      </section>
    </div>

    ${
      home.footer
        ? `<footer class="site-footer">
      <p>${escapeHtml(home.footer)}</p>
    </footer>`
        : ""
    }
    <form class="home-ask" action="/ask" method="get" toolname="ask_ayush_rai" tooldescription="Ask a question about Ayush Rai's public profile, projects, writing, and contact details.">
      <label for="agent-query">Ask this site</label>
      <input id="agent-query" name="query" type="search" toolparamdescription="Natural-language question about Ayush Rai.">
      <button type="submit">Ask</button>
    </form>
    <p class="home-contact">
      <a href="/developers/">Developers</a>
      ·
      <a href="/llms.txt">llms.txt</a>
      ·
      <a href="/api/v1/jobs">Jobs API</a>
      ·
      <a href="https://skills.sh/ayushrai-hub/LifeOS" rel="noopener noreferrer">skills.sh</a>
      ·
      <a href="https://github.com/ayushrai-hub/LifeOS" rel="noopener noreferrer">Site source</a>
    </p>
  </main>
  <script src="/scripts/site-chrome.js" defer></script>
</body>
</html>
`;
}

function renderMarkdown(home) {
  const focus = (home.current_focus || [])
    .map((item) => `- ${item.short_title || item.title}`)
    .join("\n");
  const latest = (home.latest_work || [])
    .map((item) => `- ${item.title}${item.summary ? `: ${item.summary}` : ""}`)
    .join("\n");
  const contact = (home.contact || [])
    .map((item) => `- [${item.text}](${item.href})`)
    .join("\n");
  return `---
title: ${home.name}
description: ${home.tagline}
canonical: https://life.ayushrai.site/index.md
last-updated: ${home.generated_at}
---

# ${home.name}

${home.tagline}

Personal knowledge site for Ayush Rai, an AI Engineer in Bhopal, Madhya Pradesh, India.

## When to use this site

Use this page when you need public facts about Ayush Rai: his roles, projects, products, writing, or how to contact him. Do not use it for private data, credentials, or invented metrics.

## Start here

- [Homepage](https://life.ayushrai.site/)
- [llms.txt](https://life.ayushrai.site/llms.txt)
- [Sitemap](https://life.ayushrai.site/sitemap.xml)
- [About](https://life.ayushrai.site/about/)
- [Contact](https://life.ayushrai.site/sites/contact/)
- [Privacy](https://life.ayushrai.site/privacy/)
- [Projects](https://life.ayushrai.site/sites/projects/)
- [Products](https://life.ayushrai.site/sites/products/)
- [GitHub](https://github.com/ayushrai-hub)
- [LinkedIn](https://www.linkedin.com/in/ayushrai02)
- [Source repository](https://github.com/ayushrai-hub/LifeOS)

## Current focus

${focus || "- Nothing published yet."}

## Latest work

${latest || "- Nothing published yet."}

## Contact

${contact || "- See the contact page."}
`;
}

function main() {
  const editorial = loadHomepageYaml(
    path.join(KNOWLEDGE, "_system/homepage.yaml")
  );

  const profilePath = path.join(KNOWLEDGE, "person/profile.yaml");
  const profile = fs.existsSync(profilePath) ? loadEntityYaml(profilePath) : {};
  const name =
    (profile.title && !profile.title.includes("PLACEHOLDER")
      ? profile.title
      : null) || editorial.name;
  const tagline =
    (profile.description && !profile.description.includes("PLACEHOLDER")
      ? profile.description
      : null) || editorial.tagline;

  const learningPath = path.join(KNOWLEDGE, "learning/currently-learning.md");
  const learningMd = fs.existsSync(learningPath) ? read(learningPath) : "";
  const learningDate = learningMd ? learningFrontmatterDate(learningMd) : null;
  const focus = parseCurrentlyLearning(learningMd)
    .slice(0, editorial.limits.current_focus)
    .map((item) => {
      const hit = (editorial.focus_blurbs || []).find((b) =>
        item.title.toLowerCase().includes(String(b.match || "").toLowerCase())
      );
      if (!hit) return item;
      return {
        ...item,
        short_title: hit.short_title || item.short_title,
        blurb: hit.blurb || item.blurb,
      };
    });

  const pinned = (editorial.latest_work_pins || [])
    .filter((p) => p && p.title && p.href)
    .map((p) => ({
      title: p.title,
      date: p.date || "",
      summary: p.summary || "",
      href: p.href,
      kind: p.kind || "pin",
      external: p.external !== false,
    }));
  const fromGithub = loadLatestWork(editorial.limits.latest_work);
  const seen = new Set(pinned.map((p) => p.title.toLowerCase()));
  const latest = [
    ...pinned,
    ...fromGithub.filter((item) => !seen.has(item.title.toLowerCase())),
  ].slice(0, editorial.limits.latest_work);
  const recent = loadRecentlyUpdated(
    editorial.limits.recently_updated,
    learningDate
  );
  const contact = resolveContact(editorial.contact);

  const home = {
    generated_at: new Date().toISOString().slice(0, 10),
    name,
    tagline,
    seo_title: editorial.seo_title || "",
    seo_description: editorial.seo_description || "",
    intro: editorial.intro,
    doors: editorial.doors,
    doors_nav: editorial.doors_nav,
    current_focus: focus,
    latest_work: latest,
    recently_updated: recent,
    contact,
    contact_note: editorial.contact_note || "",
    footer: editorial.footer || "",
    sources: [
      "knowledge/_system/homepage.yaml",
      "knowledge/person/profile.yaml",
      "knowledge/learning/currently-learning.md",
      "knowledge/_system/site-status.yaml",
      "knowledge/reading/currently-reading.json",
      "data/imports/github-knowledge-index.json",
    ],
  };

  write(path.join(ROOT, "data/home.json"), JSON.stringify(home, null, 2) + "\n");
  write(path.join(ROOT, "sites/www/index.html"), renderHtml(home));
  const markdown = renderMarkdown(home);
  write(path.join(ROOT, "sites/www/index.md"), markdown);
  console.log("Wrote data/home.json, sites/www/index.html, and sites/www/index.md");
}

main();
