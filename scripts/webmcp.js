/**
 * WebMCP tools for browser agents.
 * Registers on document.modelContext first, then navigator.modelContext.
 */
(function () {
  "use strict";

  if (window.__lifeWebmcp) return;
  window.__lifeWebmcp = true;

  var askTool = {
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
  };

  var contactTool = {
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
  };

  if (document.modelContext && typeof document.modelContext.registerTool === "function") {
    document.modelContext.registerTool(askTool);
    document.modelContext.registerTool(contactTool);
    return;
  }
  if (navigator.modelContext && typeof navigator.modelContext.registerTool === "function") {
    navigator.modelContext.registerTool(askTool);
    navigator.modelContext.registerTool(contactTool);
  }
})();
