const test = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("./index.js");

test("exports and origin", () => {
  assert.equal(pkg.ORIGIN, "https://life.ayushrai.site");
  assert.equal(typeof pkg.ask, "function");
  assert.equal(typeof pkg.sandbox, "function");
  assert.equal(typeof pkg.createJob, "function");
  assert.equal(typeof pkg.getJob, "function");
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
  assert.equal(accepted.status, "accepted");
  assert.ok(accepted.job_id);
  const completed = await pkg.getJob(accepted.job_id);
  assert.equal(completed.status, "completed");
  assert.equal(completed.count, 2);
});
