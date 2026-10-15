/**
 * Site chrome: black/white theme toggle (top right).
 * Injects a fixed control if the page does not already include it.
 *
 * Head FOUC guard (recommended before CSS):
 *   <script>
 *   (function(){try{if(localStorage.getItem("theme")==="dark")document.documentElement.setAttribute("data-theme","dark");}catch(e){}})();
 *   </script>
 *
 * Usage:
 *   <script src="/scripts/site-chrome.js" defer></script>
 */
(function () {
  "use strict";

  var STORAGE_KEY = "theme";

  function getTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
    } catch (e) {
      return document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    }
  }

  function applyTheme(theme) {
    var dark = theme === "dark";
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
    } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#111111" : "#ffffff");
    var btn = document.querySelector("[data-theme-toggle]");
    if (btn) {
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        dark ? "Switch to light theme" : "Switch to dark theme"
      );
      btn.textContent = dark ? "Light" : "Dark";
    }
  }

  function ensureChrome() {
    var existing = document.querySelector(".site-chrome");
    if (existing) {
      var clocks = existing.querySelectorAll(
        "[data-live-clock], .site-chrome__clock, #live-clock"
      );
      for (var i = 0; i < clocks.length; i++) {
        clocks[i].remove();
      }
      return existing;
    }

    var chrome = document.createElement("div");
    chrome.className = "site-chrome";
    chrome.setAttribute("role", "group");
    chrome.setAttribute("aria-label", "Site controls");

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "site-chrome__toggle";
    toggle.setAttribute("data-theme-toggle", "");
    toggle.textContent = "Dark";

    chrome.appendChild(toggle);
    document.body.appendChild(chrome);
    return chrome;
  }

  function bindToggle() {
    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn || btn.getAttribute("data-bound") === "1") return;
    btn.setAttribute("data-bound", "1");
    btn.addEventListener("click", function () {
      applyTheme(getTheme() === "dark" ? "light" : "dark");
    });
  }

  function registerModelTools() {
    var tools = [
      {
        name: "ask_ayush_rai",
        description:
          "Ask a question about Ayush Rai's public profile, projects, writing, and contact details.",
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
        execute: async function (input) {
          var query = input && input.query ? input.query : "";
          var response = await fetch("/ask?query=" + encodeURIComponent(query));
          return response.json();
        },
      },
      {
        name: "get_public_contact",
        description:
          "Return Ayush Rai's published email, phone, and booking links.",
        inputSchema: { type: "object", properties: {} },
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
  }

  function start() {
    ensureChrome();
    applyTheme(getTheme());
    bindToggle();
    registerModelTools();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
