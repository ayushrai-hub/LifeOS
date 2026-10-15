const ORIGIN = "https://life.ayushrai.site";

async function ask(query, options) {
  const base = (options && options.origin) || ORIGIN;
  const response = await fetch(`${base}/ask?query=${encodeURIComponent(query || "")}`);
  if (!response.ok) throw new Error(`ask failed: ${response.status}`);
  return response.json();
}

async function sandbox(options) {
  const base = (options && options.origin) || ORIGIN;
  const response = await fetch(`${base}/api/v1/sandbox`);
  if (!response.ok) throw new Error(`sandbox failed: ${response.status}`);
  return response.json();
}

module.exports = { ORIGIN, ask, sandbox };
