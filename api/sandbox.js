const { catalog, profileText, ORIGIN } = require("../agent/answers");
const { rateLimitHeaders, cors, errorBody } = require("../agent/http");

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

module.exports = function sandbox(req, res) {
  cors(res, "GET, OPTIONS");
  rateLimitHeaders(res);

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(204).end();
    return;
  }
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(405).json(errorBody("method_not_allowed", "Use GET.", 405));
    return;
  }

  const sliced = pageSlice(catalog.pages, req);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("X-Sandbox", "true");
  res.status(200).json({
    sandbox: true,
    mode: "sandbox",
    notice: "Sandbox responses are the same public facts as production. There is no private dataset and nothing here writes data.",
    resource: `${ORIGIN}/api/v1/sandbox`,
    summary: profileText(),
    pages: sliced.items,
    pagination: sliced.pagination,
  });
};
