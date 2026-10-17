const LIMIT = 120;
const WINDOW = "60s";

function rateLimitHeaders(res, remaining = LIMIT - 1) {
  res.setHeader("RateLimit-Limit", String(LIMIT));
  res.setHeader("RateLimit-Remaining", String(Math.max(0, remaining)));
  res.setHeader("RateLimit-Reset", WINDOW);
  res.setHeader("X-RateLimit-Limit", String(LIMIT));
  res.setHeader("X-RateLimit-Remaining", String(Math.max(0, remaining)));
  res.setHeader("X-RateLimit-Reset", WINDOW);
}

function cors(res, methods, extraHeaders) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", methods);
  if (extraHeaders) {
    res.setHeader("Access-Control-Allow-Headers", extraHeaders);
  }
}

const HINTS = {
  not_found: "Check the path against https://life.ayushrai.site/openapi.json. API routes live under /api/v1.",
  method_not_allowed: "Retry with a method listed in the Allow response header.",
  unauthorized: "Get a public-read token: POST /oauth/register, then POST /oauth/token. Or use /api/v1/sandbox with no token.",
  invalid_batch: "Send JSON like {\"queries\":[\"Who is Ayush Rai?\"]} with 1 to 10 non-empty strings.",
  batch_too_large: "Split the queries into requests of at most 10.",
  invalid_query: "Send a non-empty query string.",
  missing_job_id: "POST /api/v1/jobs first, then poll the Location URL it returns.",
  job_not_found: "Use the job_id or Location URL returned by POST /api/v1/jobs.",
  invalid_json: "Send a valid JSON body with Content-Type: application/json.",
};

const INVALID_JSON = Symbol("invalid_json");

function parseText(raw) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (err) {
    return INVALID_JSON;
  }
}

/**
 * Read a JSON request body. Resolves to the parsed value, {} when empty, or INVALID_JSON.
 * Vercel's req.body getter throws on malformed JSON, so the access itself is guarded.
 */
function readJson(req) {
  let body;
  try {
    body = req.body;
  } catch (err) {
    return Promise.resolve(INVALID_JSON);
  }
  if (body && typeof body === "object" && !Buffer.isBuffer(body)) return Promise.resolve(body);
  if (typeof body === "string") return Promise.resolve(parseText(body));
  if (Buffer.isBuffer(body)) return Promise.resolve(parseText(body.toString("utf8")));
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(parseText(Buffer.concat(chunks).toString("utf8"))));
    req.on("error", () => resolve(INVALID_JSON));
  });
}

function errorBody(code, message, status, hint) {
  return {
    error: {
      code,
      message,
      status,
      hint: hint || HINTS[code] || "See the developer docs for valid requests.",
      docs: "https://life.ayushrai.site/developers/",
      auth: "https://life.ayushrai.site/auth.md",
    },
  };
}

module.exports = {
  LIMIT,
  WINDOW,
  rateLimitHeaders,
  cors,
  errorBody,
  readJson,
  INVALID_JSON,
};
