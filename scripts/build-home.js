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
      if (key === "name" || key === "tagline" || key === "footer" || key === "contact_note")
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
      href: "../learning/index.html",
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
        href: "../currently-reading/index.html",
      });
    }
  }

  if (status.knowledge_last_updated) {
    items.push({
      title: "Knowledge base",
      date: status.knowledge_last_updated,
      summary: "Identity inventory and system status refreshed.",
      href: "../learning/index.html",
    });
  }

  if (learningUpdated) {
    items.push({
      title: "Currently learning",
      date: learningUpdated,
      summary: "Active study and practice areas from public evidence.",
      href: "../learning/index.html",
    });
  }

  items.push({
    title: "GitHub ingest",
    date: "2026-07-23",
    summary: "Public repositories indexed for projects and latest work.",
    href: "../projects/index.html",
  });

  items.push({
    title: "Projects index",
    date: "2026-07-23",
    summary: "Canonical project entities under knowledge/projects.",
    href: "../projects/index.html",
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
    ? read(personSchemaPath).trim()
    : "";
  const schemaHtml = personSchema
    ? `  <script type="application/ld+json">\n${personSchema}\n  </script>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(home.name)}</title>
  <meta name="description" content="${escapeHtml(home.tagline)}">
  <meta name="author" content="${escapeHtml(home.name)}">
  <meta name="theme-color" content="#ffffff">
  <meta property="og:title" content="${escapeHtml(home.name)}">
  <meta property="og:description" content="${escapeHtml(home.tagline)}">
  <meta property="og:type" content="profile">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(home.name)}">
  <meta name="twitter:description" content="${escapeHtml(home.tagline)}">
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
  <link rel="stylesheet" href="../../styles/site.css?v=20260724c">
${schemaHtml}
</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <main id="content" class="page home">
    <div class="home-hero">
      <figure class="home-photo">
        <img
          src="../../assets/images/portraits/ayush-rai--workspace-2024.jpg"
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
  </main>
  <script src="/scripts/site-chrome.js" defer></script>
</body>
</html>
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
  console.log("Wrote data/home.json and sites/www/index.html");
}

main();
