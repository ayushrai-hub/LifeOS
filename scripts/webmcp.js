/**
 * WebMCP tools for browser agents (document.modelContext.registerTool).
 * Loaded from the homepage; other pages get the same tools via site-chrome.js.
 */
(function () {
  "use strict";

  if (window.__lifeWebmcp) return;
  window.__lifeWebmcp = true;

  var tools = [
    {
      name: "ask_ayush_rai",
      description:
        "Ask a question about Ayush Rai's public profile, projects, writing, and contact details. Returns the JSON answer from GET /ask.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Natural-language question about Ayush Rai.",
          },
        },
        required: ["query"],
      },
      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
        destructiveHint: false,
      },
      execute: async function (input) {
        var query = input && input.query ? input.query : "";
        var response = await fetch("/ask?query=" + encodeURIComponent(query));
        return response.json();
      },
    },
    {
      name: "get_public_contact",
      description:
        "Return Ayush Rai's published email, phone, and booking links from the public /ask catalog.",
      inputSchema: { type: "object", properties: {} },
      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
        destructiveHint: false,
      },
      execute: async function () {
        var response = await fetch(
          "/ask?query=" + encodeURIComponent("How do I contact Ayush Rai?")
        );
        return response.json();
      },
    },
  ];

  function register(ctx) {
    if (!ctx || typeof ctx.registerTool !== "function") return false;
    for (var i = 0; i < tools.length; i++) ctx.registerTool(tools[i]);
    return true;
  }

  if (!register(document.modelContext)) {
    register(navigator.modelContext);
  }
})();
