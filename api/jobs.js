const { nlweb, ORIGIN } = require("../agent/answers");
const { rateLimitHeaders, cors, errorBody } = require("../agent/http");

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  if (typeof req.body === "string" && req.body) {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch (err) {
      return Promise.resolve({});
    }
  }
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        resolve({});
      }
    });
    req.on("error", () => resolve({}));
  });
}

function encodeJob(queries) {
  return Buffer.from(JSON.stringify({ v: 1, queries }), "utf8").toString("base64url");
}

function decodeJob(id) {
  try {
    const parsed = JSON.parse(Buffer.from(String(id || ""), "base64url").toString("utf8"));
    if (!parsed || parsed.v !== 1 || !Array.isArray(parsed.queries)) return null;
    return parsed.queries;
  } catch (err) {
    return null;
  }
}

function runQueries(queries) {
  return queries.map((query, index) => {
    const text = typeof query === "string" ? query : "";
    if (!text.trim()) {
      return { index, error: errorBody("invalid_query", "Empty query.", 400).error };
    }
    return { index, query: text, answer: nlweb(text) };
  });
}

function jobUrl(id) {
  return `${ORIGIN}/api/v1/jobs/${id}`;
}

module.exports = async function jobs(req, res) {
  cors(res, "GET, POST, OPTIONS", "Content-Type, Accept, Idempotency-Key");
  rateLimitHeaders(res);

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(204).end();
    return;
  }

  const id = req.query && req.query.id ? String(req.query.id) : "";

  if (req.method === "GET") {
    if (!id) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.status(200).json({
        name: "ask jobs",
        pattern: "async",
        create: {
          method: "POST",
          url: `${ORIGIN}/api/v1/jobs`,
          accepts: "application/json",
          body: { queries: ["Who is Ayush Rai?"] },
          response: "202 Accepted with Location and job_id",
        },
        poll: {
          method: "GET",
          url_template: `${ORIGIN}/api/v1/jobs/{job_id}`,
          response: "200 with status completed and results",
        },
        openapi: `${ORIGIN}/openapi.json`,
        docs: `${ORIGIN}/developers/`,
      });
      return;
    }
    const queries = decodeJob(id);
    if (!queries) {
      res.status(404).json(errorBody("job_not_found", "Unknown or malformed job id.", 404));
      return;
    }
    if (queries.length > 10) {
      res.status(400).json(errorBody("batch_too_large", "Jobs accept at most 10 queries.", 400));
      return;
    }
    const results = runQueries(queries);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json({
      job_id: id,
      status: "completed",
      resource: jobUrl(id),
      count: results.length,
      results,
    });
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(405).json(errorBody("method_not_allowed", "Use POST to create a job or GET to poll one.", 405));
    return;
  }

  if (id) {
    res.status(405).json(errorBody("method_not_allowed", "Create jobs with POST /api/v1/jobs (no id in the path).", 405));
    return;
  }

  const idempotency = req.headers["idempotency-key"];
  if (idempotency) res.setHeader("Idempotency-Key", String(idempotency));

  const body = await readBody(req);
  const queries = Array.isArray(body.queries) ? body.queries : null;
  if (!queries || !queries.length) {
    res.status(400).json(errorBody("invalid_batch", "Provide queries as a non-empty string array.", 400));
    return;
  }
  if (queries.length > 10) {
    res.status(400).json(errorBody("batch_too_large", "Send at most 10 queries per job.", 400));
    return;
  }

  const jobId = encodeJob(queries.map((query) => String(query)));
  const location = jobUrl(jobId);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Location", location);
  res.setHeader("Retry-After", "1");
  res.status(202).json({
    job_id: jobId,
    id: jobId,
    status: "pending",
    resource: location,
    poll: location,
    status_url: location,
    message: "Poll the Location URL for completed results. Jobs are read-only public answers.",
  });
};
