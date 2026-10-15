#!/usr/bin/env node
/**
 * Local checks for the agent surface. Does not hit the network.
 */
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const ROOT = path.resolve(__dirname, "..");
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

function json(rel) {
  return JSON.parse(read(rel));
}

function invoke(handler, { method = "GET", url = "/", headers = {}, body = "", query = {} } = {}) {
  return new Promise((resolve) => {
    const req = {
      method,
      url,
      headers,
      query,
      body: undefined,
      on(event, cb) {
        if (event === "data" && body) cb(Buffer.from(body));
        if (event === "end") cb();
      },
    };
    const res = {
      statusCode: 200,
      headers: {},
      body: "",
      setHeader(key, value) {
        this.headers[key.toLowerCase()] = value;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(obj) {
        this.body = JSON.stringify(obj);
        resolve(this);
      },
      send(value) {
        this.body = value;
        resolve(this);
      },
      end(value) {
        if (value) this.body += value;
        resolve(this);
      },
      write(value) {
        this.body += value;
      },
    };
    Promise.resolve(handler(req, res)).catch((err) => {
      failed += 1;
      console.log(err);
      resolve(res);
    });
  });
}

async function main() {
  const { decide } = await import("../agent/negotiate.mjs");

  check("homepage markdown negotiation", () => {
    assert.equal(decide({ pathname: "/", accept: "text/markdown" }).action, "markdown");
    assert.equal(decide({ pathname: "/sites/www/", accept: "text/html", userAgent: "ClaudeBot/1.0" }).action, "markdown");
    assert.equal(decide({ pathname: "/", mode: "agent", accept: "text/html" }).action, "json");
    assert.equal(decide({ pathname: "/", accept: "text/html", userAgent: "Mozilla/5.0" }).action, "redirect");
    assert.equal(decide({ pathname: "/sites/www/", accept: "text/html" }).action, "html");
  });

  check("llms.txt is a real index", () => {
    const text = read("llms.txt");
    assert.ok(text.startsWith("# "));
    assert.ok(text.length >= 100 && text.length < 30000);
    assert.match(text, /\[.+\]\(https?:\/\/.+\)/);
    assert.match(text, /When to use/i);
    assert.match(text, /\/docs\/llms\.txt/);
    assert.match(text, /\/api\/llms\.txt/);
    assert.match(text, /\/developers\/llms\.txt/);
  });

  check("auth.md structure", () => {
    const text = read("auth.md");
    assert.match(text, /^# Authentication$/m);
    assert.ok(text.length > 200);
    for (const heading of ["Discover", "Pick a method", "Register", "Claim", "Exchange", "Use the access_token", "Errors", "Revocation"]) {
      assert.match(text, new RegExp(`^## ${heading}$`, "m"));
    }
    for (const word of ["agent_auth", "identity_endpoint", "identity_assertion", "service_auth", "id-jag", "WWW-Authenticate"]) {
      assert.ok(text.includes(word), word);
    }
  });

  check("discovery documents", () => {
    const ard = json(".well-known/ard.json");
    assert.equal(ard.specVersion, "1.0");
    assert.ok(ard.entries.length >= 2);
    assert.ok(ard.entries.every((entry) => entry.identifier && entry.displayName && entry.type && entry.url));
    const card = json("mcp/knowledge/server-card");
    assert.equal(card.$schema, "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json");
    assert.ok(card.description.length <= 100);
    assert.ok(card.remotes[0].url.startsWith("https://life.ayushrai.site/mcp/"));
    assert.equal(card.tools, undefined);
    const skills = json(".well-known/agent-skills/index.json");
    assert.ok(skills.skills.every((skill) => skill.name && skill.description));
    assert.match(skills.when_to_use, /When to use this/);
    const aiCatalog = json(".well-known/ai-catalog.json");
    assert.ok(Array.isArray(aiCatalog.entries));
    const catalog = json("agent/linkset.json");
    assert.ok(Array.isArray(catalog.linkset));
    const prm = json(".well-known/oauth-protected-resource");
    assert.ok(prm.resource && prm.authorization_servers.length);
    const as = json(".well-known/oauth-authorization-server");
    assert.deepEqual(as.agent_auth.identity_types_supported, ["anonymous", "identity_assertion", "service_auth"]);
    assert.ok(as.agent_auth.identity_assertion.assertion_types_supported[0].includes("id-jag"));
    const bots = json(".well-known/http-message-signatures-directory");
    assert.equal(bots.keys[0].kty, "OKP");
    assert.equal(bots.keys[0].crv, "Ed25519");
    assert.ok(bots.keys[0].kid && bots.keys[0].nbf && bots.keys[0].exp);
    const plugin = json("plugin.json");
    assert.equal(plugin.$schema, "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json");
    assert.ok(plugin.name);
    assert.match(read("robots.txt"), /^schemamap:\s+https:\/\/life\.ayushrai\.site\/schemamap\.xml/m);
    assert.match(read("sitemap.xml"), /<lastmod>2026-10-16<\/lastmod>/);
    assert.match(read("index.md"), /^# /m);
    const home = read("sites/www/index.html");
    assert.match(home, /rel="canonical"/);
    assert.match(home, /property="og:image"/);
    assert.match(home, /type="text\/markdown"/);
    assert.match(home, /toolname="ask_ayush_rai"/);
    assert.match(home, /FAQPage/);
    assert.match(read("scripts/site-chrome.js"), /document\.modelContext/);
    assert.match(read("scripts/site-chrome.js"), /navigator\.modelContext/);
  });

  check("trust pages are long enough", () => {
    for (const rel of ["about/index.html", "privacy/index.html", "sites/contact/index.html"]) {
      const text = read(rel).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      assert.ok(text.length >= 500, `${rel} has ${text.length} characters`);
    }
  });

  const ask = require("../api/ask");
  const guard = require("../api/guard");
  const agent = require("../api/agent");
  const sandbox = require("../api/sandbox");
  const notFound = require("../api/not-found");

  const askGet = await invoke(ask, { url: "/api/ask?query=Ayush", query: { query: "Ayush" } });
  check("NLWeb ask JSON", () => {
    assert.equal(askGet.statusCode, 200);
    const payload = JSON.parse(askGet.body);
    assert.equal(payload._meta.response_type, "item_list");
    assert.ok(payload._meta.version);
    assert.ok(payload.results.length);
  });

  const askStream = await invoke(ask, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: "projects", prefer: { streaming: true } }),
  });
  check("NLWeb ask stream", () => {
    assert.equal(askStream.statusCode, 200);
    assert.match(askStream.headers["content-type"], /text\/event-stream/);
    assert.match(askStream.body, /event: start/);
    assert.match(askStream.body, /event: result/);
    assert.match(askStream.body, /event: complete/);
  });

  const denied = await invoke(guard, { url: "/api/v1" });
  check("API 401 challenge", () => {
    assert.equal(denied.statusCode, 401);
    assert.match(denied.headers["www-authenticate"], /resource_metadata="https:\/\/life\.ayushrai\.site\/\.well-known\/oauth-protected-resource"/);
  });

  const allowed = await invoke(guard, {
    url: "/api/v1",
    headers: { authorization: "Bearer public-read" },
  });
  check("public-read bearer", () => {
    assert.equal(allowed.statusCode, 200);
  });

  const preflight = await invoke(agent, { method: "OPTIONS", url: "/api/agent?op=identity", query: { op: "identity" } });
  check("agent identity OPTIONS", () => {
    assert.equal(preflight.statusCode, 204);
  });

  const anon = await invoke(agent, {
    method: "POST",
    url: "/api/agent?op=identity",
    query: { op: "identity" },
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ type: "anonymous" }),
  });
  check("anonymous register", () => {
    assert.equal(anon.statusCode, 200);
    assert.match(anon.body, /anonymous/);
  });

  const box = await invoke(sandbox, { url: "/api/sandbox" });
  check("sandbox", () => {
    assert.equal(box.statusCode, 200);
    assert.equal(box.headers["x-sandbox"], "true");
    assert.equal(JSON.parse(box.body).sandbox, true);
  });

  const missing = await invoke(notFound, {
    url: "/api/not-found?path=__missing",
    query: { path: "__missing" },
    headers: { accept: "text/markdown" },
  });
  check("markdown 404", () => {
    assert.equal(missing.statusCode, 404);
    assert.match(missing.headers["content-type"], /text\/markdown/);
    assert.match(missing.body, /^# Not found/);
    assert.ok(missing.body.length > 20);
    assert.match(missing.body, /llms\.txt/);
  });

  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
