import { next, rewrite } from "@vercel/functions";
import { decide, prefersMarkdown } from "./agent/negotiate.mjs";

const ORIGIN = "https://life.ayushrai.site";
const LINK = [
  '</sitemap.xml>; rel="sitemap"',
  '</index.md>; rel="alternate"; type="text/markdown"',
  '</llms.txt>; rel="describedby"',
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</.well-known/ard.json>; rel="describedby"',
].join(", ");

const FALLBACK_MD = `# Ayush Rai

AI Engineer in Bhopal. Public knowledge site for projects, products, and contact.

- [Home](${ORIGIN}/)
- [llms.txt](${ORIGIN}/llms.txt)
- [Sitemap](${ORIGIN}/sitemap.xml)
- [About](${ORIGIN}/about/)
- [Contact](${ORIGIN}/sites/contact/)
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

The page \`${pathname}\` could not be found on this site.

Try the [homepage](${ORIGIN}/), the [agent index](${ORIGIN}/llms.txt), or the [sitemap](${ORIGIN}/sitemap.xml).
`;
}

function html404(pathname) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Not found; Ayush Rai</title>
  <meta name="robots" content="noindex">
  <link rel="canonical" href="${ORIGIN}${pathname}">
  <link rel="stylesheet" href="/styles/site.css?v=20261016">
</head>
<body>
  <main class="page knowledge-page">
    <h1>Not found</h1>
    <p>The page <code>${pathname}</code> could not be found on this site.</p>
    <p><a href="${ORIGIN}/">Home</a> · <a href="${ORIGIN}/llms.txt">llms.txt</a> · <a href="${ORIGIN}/sitemap.xml">Sitemap</a></p>
  </main>
</body>
</html>`;
}

async function probeStatus(request) {
  const probeHeaders = new Headers(request.headers);
  probeHeaders.set("x-agent-probe", "1");
  probeHeaders.set("accept", "text/html");

  const url = new URL(request.url);
  const candidates = [];
  if (!url.pathname.endsWith("/") && !STATIC_FILE.test(url.pathname)) {
    const slashed = new URL(request.url);
    slashed.pathname = `${url.pathname}/`;
    candidates.push(slashed.href);
  }
  candidates.push(request.url);

  for (const start of candidates) {
    let current = start;
    for (let hop = 0; hop < 5; hop += 1) {
      let probed;
      try {
        probed = await fetch(current, {
          method: "GET",
          headers: probeHeaders,
          redirect: "manual",
        });
      } catch (err) {
        break;
      }
      if (probed.status >= 300 && probed.status < 400) {
        const location = probed.headers.get("location");
        if (!location) return probed.status;
        current = new URL(location, current).href;
        continue;
      }
      return probed.status;
    }
  }
  return 200;
}

export default async function middleware(request) {
  if (request.headers.get("x-agent-probe") === "1") return next();

  const url = new URL(request.url);

  // With trailingSlash:false, normalize directory URLs so probes and pages share one path.
  if (url.pathname !== "/" && url.pathname.endsWith("/") && !STATIC_FILE.test(url.pathname)) {
    const dest = new URL(request.url);
    dest.pathname = url.pathname.replace(/\/+$/, "") || "/";
    return rewrite(dest);
  }

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

  if (action === "home") {
    return rewrite(new URL("/sites/www/", request.url), {
      headers: {
        vary: "Accept, User-Agent",
        link: LINK,
      },
    });
  }

  if (action === "html") {
    return next({
      headers: {
        vary: "Accept, User-Agent",
        link: LINK,
      },
    });
  }

  if (STATIC_FILE.test(url.pathname)) {
    return next();
  }

  let status = 200;
  try {
    status = await probeStatus(request);
  } catch (err) {
    return next();
  }

  if (status !== 404) return next();

  const pathname = url.pathname.endsWith("/") || url.pathname === "/" ? url.pathname : `${url.pathname}/`;

  if (prefersMarkdown(accept)) {
    return new Response(markdown404(pathname), {
      status: 404,
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        vary: "Accept",
        link: LINK,
      },
    });
  }

  return new Response(html404(pathname), {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      vary: "Accept",
      link: LINK,
    },
  });
}
