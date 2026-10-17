const { rateLimitHeaders, cors, errorBody, readJson, INVALID_JSON } = require("../agent/http");
const { nlweb } = require("../agent/answers");


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

  const body = req.method === "POST" ? await readJson(req) : {};
  if (body === INVALID_JSON) {
    res.status(400).json(errorBody("invalid_json", "Request body is not valid JSON.", 400));
    return;
  }
  const idempotency = req.headers["idempotency-key"];
  if (idempotency) res.setHeader("Idempotency-Key", String(idempotency));

  const query = queryOf(req, body);
  // Bare GET /ask must resolve for discovery probes. Empty query returns an empty result set
  // plus usage, not a hard error.
  const payload = query.trim()
    ? nlweb(query)
    : {
        _meta: { response_type: "item_list", version: "0.1" },
        query: "",
        results: [],
        usage: "Pass query as ?query= or JSON {\"query\":\"...\"}. See https://life.ayushrai.site/developers/",
      };

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
