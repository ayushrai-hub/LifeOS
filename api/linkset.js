const body = require("../agent/linkset.json");

module.exports = function linkset(req, res) {
  res.status(200);
  res.setHeader(
    "Content-Type",
    'application/linkset+json;profile="https://www.rfc-editor.org/info/rfc9727"'
  );
  res.send(JSON.stringify(body));
};
