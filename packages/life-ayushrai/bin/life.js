#!/usr/bin/env node
const { ask, sandbox, createJob, getJob } = require("../index.js");

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  if (command === "ask") {
    const payload = await ask(rest.join(" "));
    process.stdout.write(JSON.stringify(payload, null, 2) + "\n");
    return;
  }
  if (command === "sandbox") {
    const payload = await sandbox();
    process.stdout.write(JSON.stringify(payload, null, 2) + "\n");
    return;
  }
  if (command === "job") {
    if (rest[0] === "get" && rest[1]) {
      const payload = await getJob(rest[1]);
      process.stdout.write(JSON.stringify(payload, null, 2) + "\n");
      return;
    }
    const queries = rest.length ? rest : ["Who is Ayush Rai?"];
    const accepted = await createJob(queries);
    const completed = await getJob(accepted.job_id);
    process.stdout.write(JSON.stringify({ accepted, completed }, null, 2) + "\n");
    return;
  }
  process.stderr.write(
    "Usage: life-ayushrai ask <question> | life-ayushrai sandbox | life-ayushrai job [q1 q2...] | life-ayushrai job get <id>\n"
  );
  process.exitCode = 1;
}

main().catch((err) => {
  process.stderr.write(String(err && err.message ? err.message : err) + "\n");
  process.exitCode = 1;
});
