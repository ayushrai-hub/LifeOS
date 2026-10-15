const { toolResult, ORIGIN } = require("../agent/answers");
const { rateLimitHeaders, cors } = require("../agent/http");

const PRODUCT = {
  name: "site.ayushrai.life/product",
  version: "1.0.0",
  instructions:
    "Product MCP server. Take read-only actions against Ayush Rai's public profile, projects, and contact facts. Do not invent metrics.",
  tools: [
    {
      name: "get_profile",
      description: "Return Ayush Rai's public profile summary.",
      inputSchema: {
        type: "object",
        properties: {
          include_contact: {
            type: "boolean",
            description: "Include the published email and phone in the summary.",
          },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
    },
    {
      name: "get_contact",
      description: "Return public email, phone, and booking links.",
      inputSchema: {
        type: "object",
        properties: {
          channel: {
            type: "string",
            description: "Optional filter: email, phone, or booking.",
          },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
    },
    {
      name: "search_public_facts",
      description: "Search public site pages by a short query.",
      inputSchema: {
        type: "object",
        properties: { query: { type: "string", description: "Words to match against public pages." } },
        required: ["query"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
    },
    {
      name: "book_a_conversation",
      description: "Return Ayush Rai's public booking links so the caller can schedule time.",
      inputSchema: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description: "What the conversation is about.",
          },
        },
        required: ["topic"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false },
    },
  ],
};

const DOCS = {
  name: "site.ayushrai.life/docs",
  version: "1.0.0",
  instructions: "Answer from the public documentation index. Cite the page URL.",
  tools: [
    {
      name: "list_docs",
      description: "List public documentation and section pages.",
      inputSchema: {
        type: "object",
        properties: {
          section: {
            type: "string",
            description: "Optional section name, such as developers, auth, or projects.",
          },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
    },
    {
      name: "read_doc",
      description: "Find documentation pages that match a query.",
      inputSchema: {
        type: "object",
        properties: { query: { type: "string", description: "Documentation topic." } },
        required: ["query"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
    },
  ],
};

const SERVERS = {
  product: PRODUCT,
  knowledge: PRODUCT,
  docs: DOCS,
};

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

function rpcResult(id, result) {
  return { jsonrpc: "2.0", id, result };
}

function resolveSurface(name) {
  if (name === "docs") return "docs";
  return "product";
}

function handleMessage(surface, message) {
  const server = SERVERS[resolveSurface(surface)];
  const id = Object.prototype.hasOwnProperty.call(message, "id") ? message.id : null;
  const method = message.method;
  if (method === "initialize") {
    return rpcResult(id, {
      protocolVersion: "2025-06-18",
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: server.name, version: server.version },
      instructions: server.instructions,
    });
  }
  if (method === "ping") return rpcResult(id, {});
  if (method === "tools/list") return rpcResult(id, { tools: server.tools });
  if (method === "tools/call") {
    const params = message.params || {};
    const known = server.tools.some((tool) => tool.name === params.name);
    if (!known) {
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32602, message: `Unknown tool: ${params.name || "none"}` },
      };
    }
    const tool = server.tools.find((item) => item.name === params.name);
    const args = params.arguments || {};
    const missing = (tool.inputSchema.required || []).filter((key) => args[key] == null || args[key] === "");
    if (missing.length) {
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32602, message: `Missing required arguments: ${missing.join(", ")}` },
      };
    }
    const text = toolResult(surface, params.name, args);
    return rpcResult(id, { content: [{ type: "text", text }], isError: false });
  }
  if (id === null) return null;
  return {
    jsonrpc: "2.0",
    id,
    error: { code: -32601, message: `Unknown method: ${method || "none"}` },
  };
}

module.exports = async function mcp(req, res) {
  const fromQuery = req.query && req.query.surface;
  let fromUrl = "";
  try {
    fromUrl = new URL(req.url, "https://life.ayushrai.site").searchParams.get("surface") || "";
  } catch (err) {
    fromUrl = "";
  }
  const surface = resolveSurface(fromQuery || fromUrl || "product");
  const server = SERVERS[surface];
  cors(res, "GET, POST, OPTIONS", "Content-Type, Accept");
  rateLimitHeaders(res);

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(204).end();
    return;
  }

  if (req.method === "GET") {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json({
      name: server.name,
      version: server.version,
      role: surface === "docs" ? "documentation" : "product",
      serverCard: `${ORIGIN}/mcp/${surface}/server-card`,
    });
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const body = await readBody(req);
  const messages = Array.isArray(body) ? body : [body];
  const responses = messages.map((message) => handleMessage(surface, message)).filter(Boolean);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (!responses.length) {
    res.status(202).end();
    return;
  }
  res.status(200).json(Array.isArray(body) ? responses : responses[0]);
};
