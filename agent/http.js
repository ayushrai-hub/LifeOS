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

function errorBody(code, message, status) {
  return {
    error: {
      code,
      message,
      status,
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
};
