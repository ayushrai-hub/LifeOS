import { next, rewrite } from "@vercel/functions";
import { aliasRedirect, decide, deprecationHeaders } from "./agent/negotiate.mjs";

const LINK = [
  '</sitemap.xml>; rel="sitemap"',
  '</index.md>; rel="alternate"; type="text/markdown"',
  '</llms.txt>; rel="describedby"',
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</.well-known/ard.json>; rel="describedby"',
].join(", ");

const STATIC_FILE = /\.(md|txt|json|xml|css|js|svg|png|jpe?g|webp|gif|ico|woff2?)$/i;

export const config = {
  runtime: "edge",
  matcher: ["/((?!assets/|styles/|scripts/|_vercel/).*)"],
};

function varyLink(extraLink) {
  return {
    vary: "Accept, User-Agent",
    link: extraLink || LINK,
  };
}

function handle(request) {
  const canonical = aliasRedirect(request.url);
  if (canonical) return Response.redirect(canonical, 308);

  const url = new URL(request.url);

  const deprecated = deprecationHeaders(url.pathname);
  if (deprecated) return next({ headers: deprecated });

  const barePath = url.pathname.replace(/\/+$/, "") || "/";
  if (barePath === "/sites/www" || barePath === "/sites/www/index.html") {
    const dest = new URL("/", request.url);
    dest.search = url.search;
    return Response.redirect(dest, 308);
  }

  if (url.pathname !== "/" && url.pathname.endsWith("/") && !STATIC_FILE.test(url.pathname)) {
    const dest = new URL(request.url);
    dest.pathname = url.pathname.replace(/\/+$/, "") || "/";
    return rewrite(dest);
  }

  const action = decide({
    pathname: url.pathname,
    accept: request.headers.get("accept") || "",
    userAgent: request.headers.get("user-agent") || "",
    mode: url.searchParams.get("mode") || "",
    format: url.searchParams.get("format") || "",
  }).action;

  if (action === "agent-view") {
    return rewrite(new URL("/agent/mode.html", request.url), {
      headers: varyLink(`${LINK}, </agent/mode.json>; rel="alternate"; type="application/json"`),
    });
  }

  if (action === "json") {
    return rewrite(new URL("/agent/mode.json", request.url), { headers: varyLink() });
  }

  if (action === "markdown") {
    return rewrite(new URL("/sites/www/index.md", request.url), { headers: varyLink() });
  }

  if (action === "home") {
    return rewrite(new URL("/sites/www", request.url), { headers: varyLink() });
  }

  return next();
}

export default function middleware(request) {
  try {
    return handle(request);
  } catch {
    return next();
  }
}
