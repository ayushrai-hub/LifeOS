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

module.exports = async function batch(req, res) {
  cors(res, "POST, OPTIONS", "Content-Type, Accept, Idempotency-Key");
  rateLimitHeaders(res);

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(405).json(errorBody("method_not_allowed", "Use POST with a queries array.", 405));
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
    res.status(400).json(errorBody("batch_too_large", "Send at most 10 queries per batch.", 400));
    return;
  }

  const results = queries.map((query, index) => {
    const text = typeof query === "string" ? query : "";
    if (!text.trim()) {
      return { index, error: errorBody("invalid_query", "Empty query.", 400).error };
    }
    return { index, query: text, answer: nlweb(text) };
  });

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json({
    resource: `${ORIGIN}/api/v1/batch`,
    count: results.length,
    results,
  });
};
