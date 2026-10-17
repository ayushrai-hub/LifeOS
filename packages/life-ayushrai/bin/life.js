#!/usr/bin/env node
const { LifeAyushRaiClient, LifeApiError, VERSION } = require("../index.js");

const HELP = `life-ayushrai ${VERSION}: official CLI for https://life.ayushrai.site (free, read-only, no API key)

Usage:
  life-ayushrai ask <question>        Answer a public question (GET /ask)
  life-ayushrai sandbox               Print the zero-auth public catalog
  life-ayushrai batch <q1> [q2 ...]   Answer up to 10 questions at once
  life-ayushrai job <q1> [q2 ...]     Start an async job (202) and poll it
  life-ayushrai job get <job_id>      Poll an existing job
  life-ayushrai docs                  Print developer resource URLs

Options:
  -h, --help       Show this help
  -v, --version    Print the version
  --origin <url>   API origin (default: LIFE_API_BASE_URL or https://life.ayushrai.site)

Output is JSON on stdout. Errors go to stderr with a nonzero exit code.`;

const DOCS = {
  developers: "https://life.ayushrai.site/developers",
  openapi: "https://life.ayushrai.site/openapi.json",
  llms_txt: "https://life.ayushrai.site/llms.txt",
  auth: "https://life.ayushrai.site/auth.md",
  mcp: "https://life.ayushrai.site/mcp",
  versioning: "https://life.ayushrai.site/developers/deprecation",
};

function parse(argv) {
  const args = [];
  let origin;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--origin") origin = argv[(i += 1)];
    else if (arg.startsWith("--origin=")) origin = arg.slice("--origin=".length);
    else args.push(arg);
  }
  return { args, origin };
}

function print(payload) {
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
}

async function run(argv) {
  const { args, origin } = parse(argv);
  const [command, ...rest] = args;
  if (!command || command === "-h" || command === "--help" || command === "help") {
    process.stdout.write(`${HELP}\n`);
    return command ? 0 : 1;
  }
  if (command === "-v" || command === "--version") {
    process.stdout.write(`${VERSION}\n`);
    return 0;
  }

  const client = new LifeAyushRaiClient({ origin });
  if (command === "ask") {
    if (!rest.length) throw new UsageError("ask needs a question");
    print(await client.ask(rest.join(" ")));
  } else if (command === "sandbox") {
    print(await client.sandbox());
  } else if (command === "batch") {
    if (!rest.length) throw new UsageError("batch needs at least one question");
    print(await client.batch(rest));
  } else if (command === "job" && rest[0] === "get") {
    if (!rest[1]) throw new UsageError("job get needs a job_id");
    print(await client.getJob(rest[1]));
  } else if (command === "job") {
    const accepted = await client.createJob(rest.length ? rest : ["Who is Ayush Rai?"]);
    print({ accepted, completed: await client.getJob(accepted.job_id) });
  } else if (command === "docs") {
    print(DOCS);
  } else {
    throw new UsageError(`unknown command: ${command}`);
  }
  return 0;
}

class UsageError extends Error {}

if (require.main === module) {
  run(process.argv.slice(2))
    .then((code) => {
      process.exitCode = code;
    })
    .catch((err) => {
      if (err instanceof UsageError) {
        process.stderr.write(`life-ayushrai: ${err.message}\nRun life-ayushrai --help for usage.\n`);
        process.exitCode = 2;
      } else if (err instanceof LifeApiError) {
        process.stderr.write(`life-ayushrai: HTTP ${err.status} ${err.code}: ${err.message}${err.hint ? `\nhint: ${err.hint}` : ""}\n`);
        process.exitCode = 1;
      } else {
        process.stderr.write(`life-ayushrai: ${err && err.message ? err.message : err}\n`);
        process.exitCode = 1;
      }
    });
}

module.exports = { run, HELP };
