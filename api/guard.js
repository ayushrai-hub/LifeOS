const { catalog, profileText, ORIGIN } = require("../agent/answers");

const METADATA = `${ORIGIN}/.well-known/oauth-protected-resource`;

function challenge() {
  return `Bearer resource_metadata="${METADATA}"`;
}

module.exports = function guard(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, HEAD, OPTIONS");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.status(204).end();
    return;
  }

  const auth = String(req.headers.authorization || "");
  if (auth === "Bearer public-read") {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json({
      resource: `${ORIGIN}/api/v1`,
      scope: "knowledge:read",
      summary: profileText(),
      pages: catalog.pages,
    });
    return;
  }

  res.setHeader("WWW-Authenticate", challenge());
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(401).json({
    error: "unauthorized",
    resource_metadata: METADATA,
  });
};
