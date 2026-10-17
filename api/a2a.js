const { profileText, ORIGIN } = require("../agent/answers");
const { readJson, INVALID_JSON } = require("../agent/http");

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
  const body = await readJson(req);
  if (body === INVALID_JSON) {
    res.status(400).json({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32700, message: "Parse error: request body is not valid JSON." },
    });
    return;
  }
  res.status(200).json({
    jsonrpc: "2.0",
    id: (body && body.id) || null,
    result: {
      message: {
        role: "agent",
        parts: [{ kind: "text", text: profileText() }],
      },
    },
  });
};
