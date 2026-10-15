#!/usr/bin/env node
const { ask, sandbox } = require("../index.js");

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
  process.stderr.write("Usage: life-ayushrai ask <question> | life-ayushrai sandbox\n");
  process.exitCode = 1;
}

main().catch((err) => {
  process.stderr.write(String(err && err.message ? err.message : err) + "\n");
  process.exitCode = 1;
});
