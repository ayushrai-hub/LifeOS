const ORIGIN = "https://life.ayushrai.site";

function base(options) {
  return String((options && options.origin) || ORIGIN).replace(/\/$/, "");
}

async function readJson(response, label) {
  if (!response.ok) {
    let detail = "";
    try {
      detail = await response.text();
    } catch (err) {
      detail = "";
    }
    throw new Error(`${label} failed: ${response.status}${detail ? ` ${detail.slice(0, 200)}` : ""}`);
  }
  return response.json();
}

async function ask(query, options) {
  const origin = base(options);
  const response = await fetch(`${origin}/ask/?query=${encodeURIComponent(query || "")}`);
  return readJson(response, "ask");
}

async function sandbox(options) {
  const origin = base(options);
  const response = await fetch(`${origin}/api/v1/sandbox/`);
  return readJson(response, "sandbox");
}

async function createJob(queries, options) {
  const origin = base(options);
  const response = await fetch(`${origin}/api/v1/jobs/`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ queries }),
  });
  return readJson(response, "createJob");
}

async function getJob(jobId, options) {
  const origin = base(options);
  const response = await fetch(`${origin}/api/v1/jobs/${encodeURIComponent(jobId)}/`);
  return readJson(response, "getJob");
}

module.exports = { ORIGIN, ask, sandbox, createJob, getJob };
