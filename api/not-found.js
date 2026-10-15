const { ORIGIN } = require("../agent/answers");

module.exports = function notFound(req, res) {
  const extra = req.query && req.query.path ? String(req.query.path) : "";
  const missing = extra ? `/${extra}` : "/";
  const accept = String(req.headers.accept || "");
  res.setHeader("Vary", "Accept");
  res.setHeader(
    "Link",
    '</sitemap.xml>; rel="sitemap", </llms.txt>; rel="describedby", </index.md>; rel="alternate"; type="text/markdown"'
  );

  if (accept.includes("text/markdown")) {
    res.setHeader("Content-Type", "text/markdown; charset=utf-8");
    res.status(404).send(
      `# Not found\n\n${missing} is not a page on this site.\n\nSee the [sitemap](${ORIGIN}/sitemap.xml), the [agent index](${ORIGIN}/llms.txt), or the [developer portal](${ORIGIN}/developers/).\n`
    );
    return;
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(404).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Not found</title>
  <link rel="canonical" href="${ORIGIN}/">
</head>
<body>
  <main>
    <h1>Not found</h1>
    <p>${missing} is not a page on this site.</p>
    <p><a href="${ORIGIN}/sites/www/">Home</a> · <a href="${ORIGIN}/sitemap.xml">Sitemap</a> · <a href="${ORIGIN}/llms.txt">llms.txt</a></p>
  </main>
</body>
</html>`);
};
