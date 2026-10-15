const { catalog, profileText, ORIGIN } = require("../agent/answers");

module.exports = function sandbox(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(204).end();
    return;
  }
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("X-Sandbox", "true");
  res.status(200).json({
    sandbox: true,
    mode: "sandbox",
    notice: "Sandbox responses are the same public facts as production. There is no private dataset and nothing here writes data.",
    resource: `${ORIGIN}/api/v1/sandbox`,
    summary: profileText(),
    pages: catalog.pages,
  });
};
