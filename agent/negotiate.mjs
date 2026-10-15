export const BOT_UA =
  /GPTBot|ClaudeBot|ChatGPT-User|PerplexityBot|Google-Extended|Applebot-Extended|ora-agent|DeepSeekBot/i;

function bare(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function decide({ pathname, accept = "", userAgent = "", mode = "" }) {
  const path = bare(pathname);
  const home =
    path === "/" ||
    path === "/index.html" ||
    path === "/sites/www" ||
    path === "/sites/www/index.html";
  if (!home) return { action: "ignore" };
  if (mode === "agent") return { action: "json" };
  if (String(accept).toLowerCase().includes("text/markdown")) return { action: "markdown" };
  if (BOT_UA.test(String(userAgent))) return { action: "markdown" };
  if (path === "/" || path === "/index.html") return { action: "redirect" };
  return { action: "html" };
}
