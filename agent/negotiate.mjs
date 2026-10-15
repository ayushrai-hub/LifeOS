export const BOT_UA =
  /GPTBot|ClaudeBot|ChatGPT-User|PerplexityBot|Google-Extended|Applebot-Extended|ora-agent|DeepSeekBot/i;

function bare(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

/** Prefer text/markdown only when Accept ranks it at least as high as text/html. */
export function prefersMarkdown(acceptHeader) {
  const accept = String(acceptHeader || "").trim();
  if (!accept) return false;

  const parts = accept.split(",").map((raw) => {
    const segments = raw
      .trim()
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean);
    const type = (segments[0] || "").toLowerCase();
    let q = 1;
    for (const segment of segments.slice(1)) {
      const eq = segment.indexOf("=");
      if (eq === -1) continue;
      const key = segment.slice(0, eq).trim();
      const value = segment.slice(eq + 1).trim();
      if (key === "q") {
        const parsed = Number(value);
        q = Number.isFinite(parsed) ? parsed : 0;
      }
    }
    return { type, q };
  });

  let markdown = 0;
  let html = 0;
  for (const { type, q } of parts) {
    if (q <= 0 || !type) continue;
    if (type === "text/markdown") markdown = Math.max(markdown, q);
    if (type === "text/html" || type === "application/xhtml+xml") html = Math.max(html, q);
  }

  if (markdown <= 0) return false;
  if (html <= 0) return true;
  return markdown >= html;
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
  if (prefersMarkdown(accept)) return { action: "markdown" };
  if (BOT_UA.test(String(userAgent))) return { action: "markdown" };
  // Serve homepage HTML at / via rewrite so the public URL stays canonical.
  if (path === "/" || path === "/index.html") return { action: "home" };
  return { action: "html" };
}
