const { ORIGIN } = require("../agent/answers");

const METADATA = `${ORIGIN}/.well-known/oauth-protected-resource`;

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

function opOf(req) {
  if (req.query && req.query.op) return String(req.query.op);
  try {
    const url = new URL(req.url, "https://life.ayushrai.site");
    return url.searchParams.get("op") || "identity";
  } catch (err) {
    return "identity";
  }
}

module.exports = async function agent(req, res) {
  const op = opOf(req);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(204).end();
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    res.setHeader("WWW-Authenticate", `Bearer resource_metadata="${METADATA}"`);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(401).json({
      error: "unauthorized",
      op,
      resource_metadata: METADATA,
    });
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const body = await readBody(req);
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (op === "token") {
    const grant = body.grant_type || "public";
    if (grant === "urn:ietf:params:oauth:grant-type:jwt-bearer" && !body.assertion) {
      res.status(400).json({
        error: "invalid_grant",
        error_description: "This site does not verify ID-JAG assertions. Register with type anonymous, then exchange for the public-read token.",
      });
      return;
    }
    res.status(200).json({
      access_token: "public-read",
      token_type: "Bearer",
      scope: "knowledge:read",
      expires_in: 3600,
    });
    return;
  }

  if (op === "revoke") {
    res.status(200).json({ revoked: true, token_type_hint: body.token_type_hint || "access_token" });
    return;
  }

  if (op === "events") {
    res.status(202).json({ accepted: true });
    return;
  }

  if (op === "claim") {
    res.status(200).json({
      status: "not_required",
      detail: "Anonymous public-read access has no claim ceremony. Call the token endpoint.",
      token_endpoint: `${ORIGIN}/oauth/token`,
    });
    return;
  }

  if (op === "authorize") {
    res.status(200).json({
      status: "anonymous",
      detail: "No interactive login is required for public reads. Continue at the token endpoint.",
      token_endpoint: `${ORIGIN}/oauth/token`,
    });
    return;
  }

  const type = body.type || "anonymous";
  if (type === "anonymous") {
    res.status(200).json({
      type: "anonymous",
      identity_endpoint: `${ORIGIN}/agent/identity`,
      next: `${ORIGIN}/oauth/token`,
      detail: "Anonymous registration is the supported method. Exchange at the token endpoint for a Bearer public-read token, or call the sandbox with no token.",
    });
    return;
  }

  res.setHeader("WWW-Authenticate", `Bearer resource_metadata="${METADATA}", error="invalid_token"`);
  res.status(401).json({
    error: "invalid_assertion",
    error_description: "identity_assertion and service_auth are recognized, but this personal site cannot verify an id-jag or a private client secret. Use type anonymous.",
    type,
  });
};
