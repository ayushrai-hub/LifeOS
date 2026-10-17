const crypto = require("crypto");
const { ORIGIN } = require("../agent/answers");
const { readJson, INVALID_JSON } = require("../agent/http");

const METADATA = `${ORIGIN}/.well-known/oauth-protected-resource`;
const REGISTRABLE_GRANTS = ["public", "urn:ietf:params:oauth:grant-type:jwt-bearer"];

function isAbsoluteUrl(value) {
  try {
    return Boolean(new URL(value).protocol);
  } catch (err) {
    return false;
  }
}

/** RFC 7591 dynamic client registration for public (no-secret) clients. */
function register(body, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  const invalid = (error, description) =>
    res.status(400).json({ error, error_description: description });

  if (body === INVALID_JSON || !body || typeof body !== "object" || Array.isArray(body)) {
    return invalid("invalid_client_metadata", "Send client metadata as a JSON object.");
  }
  const authMethod = body.token_endpoint_auth_method || "none";
  if (authMethod !== "none") {
    return invalid("invalid_client_metadata", "Only token_endpoint_auth_method \"none\" is supported; no client secrets are issued.");
  }
  const grants = body.grant_types === undefined ? ["public"] : body.grant_types;
  if (!Array.isArray(grants) || !grants.length || grants.some((grant) => !REGISTRABLE_GRANTS.includes(grant))) {
    return invalid("invalid_client_metadata", `grant_types must be a subset of: ${REGISTRABLE_GRANTS.join(", ")}.`);
  }
  if (body.response_types !== undefined && (!Array.isArray(body.response_types) || body.response_types.length)) {
    return invalid("invalid_client_metadata", "response_types must be empty; this server has no interactive authorization flow.");
  }
  if (
    body.redirect_uris !== undefined &&
    (!Array.isArray(body.redirect_uris) || body.redirect_uris.some((uri) => typeof uri !== "string" || !isAbsoluteUrl(uri)))
  ) {
    return invalid("invalid_redirect_uri", "redirect_uris must be an array of absolute URLs.");
  }

  const registered = {
    client_id: `public-${crypto.randomUUID()}`,
    client_id_issued_at: Math.floor(Date.now() / 1000),
    token_endpoint_auth_method: "none",
    grant_types: grants,
    response_types: [],
    scope: "knowledge:read",
  };
  if (typeof body.client_name === "string" && body.client_name) registered.client_name = body.client_name;
  if (typeof body.client_uri === "string" && isAbsoluteUrl(body.client_uri)) registered.client_uri = body.client_uri;
  if (Array.isArray(body.redirect_uris)) registered.redirect_uris = body.redirect_uris;
  if (Array.isArray(body.contacts)) registered.contacts = body.contacts.filter((item) => typeof item === "string");
  registered.token_endpoint = `${ORIGIN}/oauth/token`;
  return res.status(201).json(registered);
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

  if (op === "register" && req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(405).json({
      error: "invalid_request",
      error_description: "POST JSON client metadata (RFC 7591) to register a public client.",
    });
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
    res.status(405).json({ error: "method_not_allowed", error_description: "Use POST." });
    return;
  }

  const parsed = await readJson(req);
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (op === "register") {
    register(parsed, res);
    return;
  }

  if (parsed === INVALID_JSON) {
    res.status(400).json({
      error: "invalid_request",
      error_description: "Request body is not valid JSON. Send application/json, for example {\"grant_type\":\"public\"}.",
    });
    return;
  }
  const body = parsed && typeof parsed === "object" ? parsed : {};

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
