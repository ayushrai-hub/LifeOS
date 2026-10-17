const test = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const pkg = require("./index.js");

const CLI = path.join(__dirname, "bin/life.js");

function fakeFetch(routes) {
  return async (url, init = {}) => {
    const route = routes[`${init.method || "GET"} ${new URL(url).pathname}`];
    if (!route) return new Response(JSON.stringify({ error: { code: "not_found", message: "nope", hint: "check path" } }), { status: 404 });
    return new Response(JSON.stringify(route.body), { status: route.status || 200 });
  };
}

test("exports and origin", () => {
  assert.equal(pkg.ORIGIN, "https://life.ayushrai.site");
  for (const name of ["ask", "sandbox", "batch", "createJob", "getJob"]) assert.equal(typeof pkg[name], "function");
  assert.equal(typeof pkg.LifeAyushRaiClient, "function");
  assert.match(pkg.VERSION, /^\d+\.\d+\.\d+$/);
});

test("client parses jobs and honors custom origin", async () => {
  const client = new pkg.LifeAyushRaiClient({
    origin: "https://preview.example/",
    fetch: fakeFetch({
      "POST /api/v1/jobs": { status: 202, body: { job_id: "abc", status: "pending" } },
      "GET /api/v1/jobs/abc": { body: { job_id: "abc", status: "completed", count: 1, results: [] } },
    }),
  });
  assert.equal(client.origin, "https://preview.example");
  const accepted = await client.createJob(["projects"]);
  assert.equal(accepted.status, "pending");
  const done = await client.getJob(accepted.job_id);
  assert.equal(done.status, "completed");
});

test("structured API errors become LifeApiError", async () => {
  const client = new pkg.LifeAyushRaiClient({ fetch: fakeFetch({}) });
  await assert.rejects(client.sandbox(), (err) => {
    assert.ok(err instanceof pkg.LifeApiError);
    assert.equal(err.status, 404);
    assert.equal(err.code, "not_found");
    assert.equal(err.hint, "check path");
    return true;
  });
  await assert.rejects(client.getJob(""), TypeError);
});

test("CLI help, version, and usage errors", () => {
  const help = spawnSync(process.execPath, [CLI, "--help"], { encoding: "utf8" });
  assert.equal(help.status, 0);
  assert.match(help.stdout, /Usage:/);
  const version = spawnSync(process.execPath, [CLI, "--version"], { encoding: "utf8" });
  assert.equal(version.stdout.trim(), pkg.VERSION);
  const bad = spawnSync(process.execPath, [CLI, "frobnicate"], { encoding: "utf8" });
  assert.equal(bad.status, 2);
  assert.match(bad.stderr, /unknown command/);
  const docs = spawnSync(process.execPath, [CLI, "docs"], { encoding: "utf8" });
  assert.equal(JSON.parse(docs.stdout).openapi, "https://life.ayushrai.site/openapi.json");
});

const live = process.env.LIFE_AYUSHRAI_LIVE === "1";

test("live ask returns NLWeb meta", { skip: !live }, async () => {
  const payload = await pkg.ask("Ayush");
  assert.equal(payload._meta.response_type, "item_list");
  assert.ok(Array.isArray(payload.results));
});

test("live sandbox is marked", { skip: !live }, async () => {
  const payload = await pkg.sandbox();
  assert.equal(payload.sandbox, true);
});

test("live jobs accept then complete", { skip: !live }, async () => {
  const accepted = await pkg.createJob(["Ayush", "projects"]);
  assert.equal(accepted.status, "pending");
  assert.ok(accepted.job_id);
  const completed = await pkg.getJob(accepted.job_id);
  assert.equal(completed.status, "completed");
  assert.equal(completed.count, 2);
});
