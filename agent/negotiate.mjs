export const CANONICAL_HOST = "life.ayushrai.site";

// Production aliases that serve the same site; preview and branch URLs stay reachable.
export const ALIAS_HOSTS = new Set([
  "thelifeofayush.vercel.app",
  "life-os-psi-lyart.vercel.app",
  "life-os-ayush-rais-work22.vercel.app",
]);

/** Absolute canonical URL for requests on a production alias host, else null. */
export function aliasRedirect(href) {
  const url = new URL(href);
  if (!ALIAS_HOSTS.has(url.hostname.toLowerCase())) return null;
  url.protocol = "https:";
  url.hostname = CANONICAL_HOST;
  url.port = "";
  return url.href;
}

// RFC 9745 structured date (2026-10-17T00:00:00Z) when the /v1 short aliases were deprecated.
export const V1_ALIAS_DEPRECATED_AT = "@1792195200";

/** RFC 9745 Deprecation + Link headers for the deprecated /v1/* short aliases, else null. */
export function deprecationHeaders(pathname) {
  if (!/^\/v1(\/|$)/.test(pathname)) return null;
  const successor = `/api${pathname.replace(/\/+$/, "") || "/v1"}`;
  return {
    deprecation: V1_ALIAS_DEPRECATED_AT,
    link: `<https://${CANONICAL_HOST}/developers/deprecation>; rel="deprecation"; type="text/html", <https://${CANONICAL_HOST}${successor}>; rel="successor-version"`,
  };
}

export const BOT_UA =
  /GPTBot|ClaudeBot|ChatGPT-User|PerplexityBot|Google-Extended|Applebot-Extended|ora-agent|DeepSeekBot/i;

function bare(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

/** Highest q-value Accept assigns to each of markdown, html, and json (explicit types only). */
function qualities(acceptHeader) {
  const accept = String(acceptHeader || "").trim();
  const ranks = { markdown: 0, html: 0, json: 0 };
  if (!accept) return ranks;

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

  for (const { type, q } of parts) {
    if (q <= 0 || !type) continue;
    if (type === "text/markdown") ranks.markdown = Math.max(ranks.markdown, q);
    if (type === "text/html" || type === "application/xhtml+xml") ranks.html = Math.max(ranks.html, q);
    if (type === "application/json") ranks.json = Math.max(ranks.json, q);
  }
  return ranks;
}

/** Prefer text/markdown only when Accept ranks it at least as high as text/html. */
export function prefersMarkdown(acceptHeader) {
  const { markdown, html } = qualities(acceptHeader);
  if (markdown <= 0) return false;
  if (html <= 0) return true;
  return markdown >= html;
}

/** Prefer JSON only when Accept names application/json at least as high as text/html. */
export function prefersJson(acceptHeader) {
  const { json, html } = qualities(acceptHeader);
  return json > 0 && json >= html;
}

export function decide({ pathname, accept = "", userAgent = "", mode = "", format = "" }) {
  const path = bare(pathname);
  const home = path === "/" || path === "/index.html";
  if (!home) return { action: "ignore" };
  if (mode === "agent") {
    return { action: format === "json" || prefersJson(accept) ? "json" : "agent-view" };
  }
  if (prefersMarkdown(accept)) return { action: "markdown" };
  if (BOT_UA.test(String(userAgent))) return { action: "markdown" };
  // Serve homepage HTML at / via rewrite so the public URL stays canonical.
  return { action: "home" };
}
