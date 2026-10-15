const { rateLimitHeaders, cors, errorBody } = require("../agent/http");
const { nlweb } = require("../agent/answers");

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

function wantsStream(req, body) {
  const query = req.query || {};
  if (String(query.streaming || "") === "true") return true;
  const preferHeader = String(req.headers.prefer || req.headers.Prefer || "");
  if (/streaming/i.test(preferHeader)) return true;
  if (body && body.streaming === true) return true;
  if (body && body.prefer && body.prefer.streaming === true) return true;
  return false;
}

function queryOf(req, body) {
  if (body && typeof body.query === "string") return body.query;
  if (req.query && typeof req.query.query === "string") return req.query.query;
  return "";
}

module.exports = async function ask(req, res) {
  cors(res, "GET, POST, OPTIONS", "Content-Type, Accept, Prefer, Idempotency-Key");
  rateLimitHeaders(res);

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(204).end();
    return;
  }
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(405).json(errorBody("method_not_allowed", "Use GET or POST.", 405));
    return;
  }

  const body = req.method === "POST" ? await readBody(req) : {};
  const idempotency = req.headers["idempotency-key"];
  if (idempotency) res.setHeader("Idempotency-Key", String(idempotency));

  const query = queryOf(req, body);
  if (!query.trim()) {
    res.status(400).json(errorBody("invalid_query", "Provide a non-empty query string.", 400));
    return;
  }

  const payload = nlweb(query);

  if (!wantsStream(req, body)) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json(payload);
    return;
  }

  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.status(200);
  res.write(`event: start\ndata: ${JSON.stringify({ _meta: payload._meta, query: payload.query })}\n\n`);
  for (const item of payload.results) {
    res.write(`event: result\ndata: ${JSON.stringify(item)}\n\n`);
  }
  res.write(`event: complete\ndata: ${JSON.stringify({ _meta: payload._meta })}\n\n`);
  res.end();
};
