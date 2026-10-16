#!/usr/bin/env node
/**
 * Local SEO checks: unique titles, canonicals, sitemap coverage,
 * robots, structured data sanity, and research body integrity.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const assert = require("assert");

const ROOT = path.resolve(__dirname, "../..");
const CONFIG = JSON.parse(
  fs.readFileSync(path.join(ROOT, "config/seo-pages.json"), "utf8")
);
const INTEGRITY = path.join(ROOT, "data/seo/research-integrity.json");

let failed = 0;

function check(name, fn) {
  try {
    fn();
    console.log(`OK: ${name}`);
  } catch (err) {
    failed += 1;
    console.log(`FAIL: ${name}`);
    console.log(String(err && err.stack ? err.stack : err));
  }
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function mainBodyHash(html) {
  const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const body = match ? match[1] : html;
  return crypto.createHash("sha256").update(body).digest("hex");
}

function extract(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}

function main() {
  const titles = new Map();
  const origin = CONFIG.origin.replace(/\/$/, "");

  check("homepage has descriptive title and canonical /", () => {
    const html = read("sites/www/index.html");
    const title = extract(html, /<title>([^<]*)<\/title>/i);
    const canonical = extract(html, /rel="canonical"\s+href="([^"]+)"/i);
    const desc = extract(html, /name="description"\s+content="([^"]*)"/i);
    assert.ok(title && title.length >= 20, `title too short: ${title}`);
    assert.ok(!/^Home$/i.test(title), "title must not be bare Home");
    assert.strictEqual(canonical, `${origin}/`);
    assert.ok(desc && desc.length >= 50, "homepage description too short");
    assert.ok(!html.includes("FAQPage"), "homepage must not emit FAQPage JSON-LD");
    assert.ok(html.includes('"@type": "Person"'), "Person JSON-LD required");
    assert.ok(html.includes('"@type": "WebSite"'), "WebSite JSON-LD required");
    assert.ok(
      html.includes('href="/sites/projects"') || html.includes('href="/sites/projects/"'),
      "homepage must use root-absolute /sites/ links"
    );
    assert.ok(!html.includes('href="../projects/'), "homepage must not use ../projects relative links");
  });

  check("currently-reading canonical uses life.ayushrai.site", () => {
    const html = read("sites/currently-reading/index.html");
    const canonical = extract(html, /rel="canonical"\s+href="([^"]+)"/i);
    assert.ok(canonical, "canonical missing");
    assert.ok(
      canonical.startsWith("https://life.ayushrai.site/"),
      `wrong host: ${canonical}`
    );
    assert.ok(
      !canonical.includes("thelifeofayush.vercel.app"),
      "stale vercel.app canonical"
    );
  });

  for (const page of CONFIG.pages) {
    check(`${page.file} meta`, () => {
      const html = read(page.file);
      const title = extract(html, /<title>([^<]*)<\/title>/i);
      const desc = extract(html, /name="description"\s+content="([^"]*)"/i);
      const canonical = extract(html, /rel="canonical"\s+href="([^"]+)"/i);
      const ogUrl = extract(html, /property="og:url"\s+content="([^"]+)"/i);
      assert.strictEqual(title, page.title);
      assert.strictEqual(desc, page.description);
      assert.strictEqual(canonical, `${origin}${page.path}`);
      assert.strictEqual(ogUrl, `${origin}${page.path}`);
      assert.ok(!/noindex/i.test(html), `${page.file} must be indexable`);
      if (titles.has(title)) {
        throw new Error(`duplicate title with ${titles.get(title)}`);
      }
      titles.set(title, page.file);
    });
  }

  check("sitemap lists configured public URLs", () => {
    const xml = read("sitemap.xml");
    assert.ok(xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
    const expected = new Set([
      `${origin}/`,
      ...CONFIG.pages.map((p) => `${origin}${p.path}`),
      ...CONFIG.sitemap_extra.map((p) =>
        p.path === "/" ? `${origin}/` : `${origin}${p.path}`
      ),
    ]);
    for (const loc of expected) {
      assert.ok(xml.includes(`<loc>${loc}</loc>`), `sitemap missing ${loc}`);
    }
    assert.ok(!xml.includes("/sites/www"), "sitemap must not list /sites/www duplicate");
    assert.ok(
      !xml.includes("thelifeofayush.vercel.app"),
      "sitemap must not use old host"
    );
  });

  check("robots.txt references sitemap", () => {
    const robots = read("robots.txt");
    assert.ok(robots.includes("Sitemap: https://life.ayushrai.site/sitemap.xml"));
    assert.ok(/Allow:\s*\//.test(robots));
  });

  check("research body integrity", () => {
    assert.ok(fs.existsSync(INTEGRITY), "run build:seo once to create integrity baseline");
    const baseline = JSON.parse(read("data/seo/research-integrity.json"));
    for (const rel of CONFIG.research_integrity) {
      const hash = mainBodyHash(read(rel));
      assert.strictEqual(
        hash,
        baseline[rel],
        `research body changed for ${rel}`
      );
    }
  });

  check("redirect portfolio stubs are noindex", () => {
    for (const rel of [
      "sites/research/portfolio/index.html",
      "sites/writing/portfolio/index.html",
    ]) {
      const html = read(rel);
      assert.ok(/noindex/i.test(html), `${rel} should be noindex`);
      const canonical = extract(html, /rel="canonical"\s+href="([^"]+)"/i);
      assert.ok(
        canonical && canonical.startsWith("https://life.ayushrai.site/"),
        `${rel} needs absolute canonical`
      );
    }
  });

  check("schema-person.jsonld has no FAQPage", () => {
    const schema = read("knowledge/person/schema-person.jsonld");
    assert.ok(!schema.includes("FAQPage"));
    JSON.parse(schema);
  });

  if (failed) {
    console.error(`\n${failed} SEO check(s) failed`);
    process.exit(1);
  }
  console.log("\nAll SEO checks passed");
}

main();
