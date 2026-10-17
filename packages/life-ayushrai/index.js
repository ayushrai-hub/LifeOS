const ORIGIN = "https://life.ayushrai.site";
const VERSION = require("./package.json").version;
const DEFAULT_TIMEOUT_MS = 15000;

class LifeApiError extends Error {
  constructor(status, body, fallback) {
    const error = body && body.error && typeof body.error === "object" ? body.error : {};
    super(error.message || fallback || `Request failed with HTTP ${status}`);
    this.name = "LifeApiError";
    this.status = status;
    this.code = error.code || "unexpected_status";
    this.hint = error.hint || "";
    this.docs = error.docs || `${ORIGIN}/developers`;
  }
}

function resolveOrigin(options) {
  const configured = (options && options.origin) || process.env.LIFE_API_BASE_URL || ORIGIN;
  return String(configured).replace(/\/+$/, "");
}

class LifeAyushRaiClient {
  constructor(options = {}) {
    this.origin = resolveOrigin(options);
    this.timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS;
    this.fetch = options.fetch || globalThis.fetch;
  }

  async request(method, path, { body, expect = 200 } = {}) {
    const response = await this.fetch(`${this.origin}${path}`, {
      method,
      headers: {
        accept: "application/json",
        "user-agent": `life-ayushrai-js/${VERSION}`,
        ...(body ? { "content-type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      redirect: "follow",
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    const text = await response.text();
    let payload = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch (err) {
      payload = null;
    }
    if (response.status !== expect) {
      throw new LifeApiError(response.status, payload, `${method} ${path} returned HTTP ${response.status}`);
    }
    return payload;
  }

  /** GET /ask: answer one public question. */
  ask(query) {
    return this.request("GET", `/ask?query=${encodeURIComponent(query || "")}`);
  }

  /** GET /api/v1/sandbox: zero-auth public catalog. */
  sandbox() {
    return this.request("GET", "/api/v1/sandbox");
  }

  /** POST /api/v1/batch: answer 1 to 10 queries at once. */
  batch(queries) {
    return this.request("POST", "/api/v1/batch", { body: { queries } });
  }

  /** POST /api/v1/jobs: start an async job (HTTP 202). */
  createJob(queries) {
    return this.request("POST", "/api/v1/jobs", { body: { queries }, expect: 202 });
  }

  /** GET /api/v1/jobs/{id}: poll an async job. */
  getJob(jobId) {
    if (!jobId) return Promise.reject(new TypeError("jobId is required"));
    return this.request("GET", `/api/v1/jobs/${encodeURIComponent(jobId)}`);
  }
}

const client = (options) => new LifeAyushRaiClient(options);

module.exports = {
  ORIGIN,
  VERSION,
  LifeAyushRaiClient,
  LifeApiError,
  ask: (query, options) => client(options).ask(query),
  sandbox: (options) => client(options).sandbox(),
  batch: (queries, options) => client(options).batch(queries),
  createJob: (queries, options) => client(options).createJob(queries),
  getJob: (jobId, options) => client(options).getJob(jobId),
};
