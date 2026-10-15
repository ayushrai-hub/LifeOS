import { next } from "@vercel/functions";
import { decide } from "./agent/negotiate.mjs";

const ORIGIN = "https://life.ayushrai.site";
const LINK = [
  '</sitemap.xml>; rel="sitemap"',
  '</index.md>; rel="alternate"; type="text/markdown"',
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</.well-known/ard.json>; rel="describedby"',
].join(", ");

const FALLBACK_MD = `# Ayush Rai

AI Engineer in Bhopal. Public knowledge site for projects, products, and contact.

- [llms.txt](${ORIGIN}/llms.txt)
- [Developers](${ORIGIN}/developers/)
- [Auth](${ORIGIN}/auth.md)
`;

const STATIC_FILE = /\.(md|txt|json|xml|css|js|svg|png|jpe?g|webp|gif|ico|woff2?)$/i;

export const config = {
  matcher: ["/((?!assets/|styles/|scripts/).*)"],
};

async function load(request, path, fallback) {
  try {
    const upstream = await fetch(new URL(path, request.url), {
      headers: { "x-agent-probe": "1" },
    });
    if (upstream.ok) return await upstream.text();
  } catch (err) {
    /* keep the fallback body if the static file cannot be fetched */
  }
  return fallback;
}

function markdown404(pathname) {
  return `# Not found

${pathname} is not a page on this site.

See the [sitemap](${ORIGIN}/sitemap.xml), the [agent index](${ORIGIN}/llms.txt), or the [developer portal](${ORIGIN}/developers/).
`;
}

export default async function middleware(request) {
  if (request.headers.get("x-agent-probe") === "1") return next();

  const url = new URL(request.url);
  const accept = request.headers.get("accept") || "";
  const action = decide({
    pathname: url.pathname,
    accept,
    userAgent: request.headers.get("user-agent") || "",
    mode: url.searchParams.get("mode") || "",
  }).action;

  if (action === "json") {
    const body = await load(request, "/agent/mode.json", '{"name":"Ayush Rai","mode":"agent"}');
    return new Response(body, {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        vary: "Accept, User-Agent",
        link: LINK,
      },
    });
  }

  if (action === "markdown") {
    const body = await load(request, "/index.md", FALLBACK_MD);
    return new Response(body, {
      status: 200,
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        vary: "Accept, User-Agent",
        link: LINK,
      },
    });
  }

  if (action === "redirect") {
    return Response.redirect(new URL("/sites/www/", request.url), 302);
  }

  if (action === "html") {
    return next({
      headers: {
        vary: "Accept, User-Agent",
        link: LINK,
      },
    });
  }

  if (!accept.includes("text/markdown") || STATIC_FILE.test(url.pathname)) {
    return next();
  }

  const probeHeaders = new Headers(request.headers);
  probeHeaders.set("x-agent-probe", "1");
  probeHeaders.set("accept", "text/html");
  let status = 200;
  try {
    const probed = await fetch(request.url, {
      method: "GET",
      headers: probeHeaders,
      redirect: "manual",
    });
    status = probed.status;
  } catch (err) {
    return next();
  }

  if (status !== 404) return next();

  return new Response(markdown404(url.pathname), {
    status: 404,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      vary: "Accept",
      link: LINK,
    },
  });
}
