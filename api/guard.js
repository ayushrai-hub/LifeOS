const { catalog, profileText, ORIGIN } = require("../agent/answers");
const { rateLimitHeaders, cors, errorBody } = require("../agent/http");

const METADATA = `${ORIGIN}/.well-known/oauth-protected-resource`;

function challenge() {
  return `Bearer resource_metadata="${METADATA}"`;
}

function pageSlice(pages, req) {
  const rawLimit = Number((req.query && req.query.limit) || 50);
  const rawPage = Number((req.query && req.query.page) || 1);
  const limit = Math.min(Math.max(Number.isFinite(rawLimit) ? rawLimit : 50, 1), 100);
  const page = Math.max(Number.isFinite(rawPage) ? rawPage : 1, 1);
  const start = (page - 1) * limit;
  const items = pages.slice(start, start + limit);
  return {
    items,
    pagination: {
      page,
      limit,
      total: pages.length,
      has_more: start + limit < pages.length,
      next_page: start + limit < pages.length ? page + 1 : null,
    },
  };
}

module.exports = function guard(req, res) {
  cors(res, "GET, HEAD, OPTIONS", "Authorization, Content-Type, Idempotency-Key");
  rateLimitHeaders(res);

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, HEAD, OPTIONS");
    res.status(204).end();
    return;
  }

  const auth = String(req.headers.authorization || "");
  if (auth === "Bearer public-read") {
    const sliced = pageSlice(catalog.pages, req);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json({
      resource: `${ORIGIN}/api/v1`,
      scope: "knowledge:read",
      summary: profileText(),
      pages: sliced.items,
      pagination: sliced.pagination,
    });
    return;
  }

  res.setHeader("WWW-Authenticate", challenge());
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const body = errorBody(
    "unauthorized",
    "Send Authorization: Bearer public-read after following auth.md.",
    401
  );
  body.resource_metadata = METADATA;
  res.status(401).json(body);
};
