const { profileText, ORIGIN } = require("../agent/answers");

module.exports = async function a2a(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(204).end();
    return;
  }
  if (req.method === "GET") {
    res.status(302).setHeader("Location", `${ORIGIN}/.well-known/agent-card.json`);
    res.end();
    return;
  }
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json({
    jsonrpc: "2.0",
    id: (req.body && req.body.id) || null,
    result: {
      message: {
        role: "agent",
        parts: [{ kind: "text", text: profileText() }],
      },
    },
  });
};
