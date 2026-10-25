const { ORIGIN } = require("../agent/answers");
const { errorBody } = require("../agent/http");

const API_PATH = /^\/(api|v1|v2|mcp|oauth|agent|a2a)(\/|$)/;

module.exports = function notFound(req, res) {
  const extra = req.query && req.query.path ? String(req.query.path) : "";
  const missing = extra ? `/${extra}` : "/";
  const accept = String(req.headers.accept || "");
  res.setHeader("Vary", "Accept");
  res.setHeader(
    "Link",
    '</sitemap.xml>; rel="sitemap", </llms.txt>; rel="describedby", </index.md>; rel="alternate"; type="text/markdown"'
  );

  const wantsJson = /application\/(json|problem\+json)/i.test(accept) && !/text\/html/i.test(accept);
  if (API_PATH.test(missing) || wantsJson) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(404).json(errorBody("not_found", `No API resource at ${missing}.`, 404));
    return;
  }

  if (/\btext\/markdown\b/i.test(accept) || /\.md$/i.test(missing)) {
    res.setHeader("Content-Type", "text/markdown; charset=utf-8");
    res.status(404).send(
      `# Not found\n\nThe page \`${missing}\` could not be found on this site.\n\nTry the [homepage](${ORIGIN}/), the [agent index](${ORIGIN}/llms.txt), or the [sitemap](${ORIGIN}/sitemap.xml).\n`
    );
    return;
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(404).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Work in progress; Ayush Rai</title>
  <meta name="robots" content="noindex">
  <link rel="canonical" href="${ORIGIN}${missing.startsWith("/") ? missing : "/" + missing}">
  <link rel="stylesheet" href="/styles/site.css?v=20261025">
</head>
<body>
  <main class="page knowledge-page">
    <h1 class="wip-title">WORK IN PROGRESS</h1>
    <p>Nothing is published at <code>${missing}</code> yet. Parts of this site are still being written.</p>
    <p><a href="${ORIGIN}/">Home</a> · <a href="${ORIGIN}/sites/work">Work</a> · <a href="${ORIGIN}/about">About</a> · <a href="${ORIGIN}/sitemap.xml">Sitemap</a> · <a href="${ORIGIN}/llms.txt">llms.txt</a></p>
  </main>
</body>
</html>`);
};
