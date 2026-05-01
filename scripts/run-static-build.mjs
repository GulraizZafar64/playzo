import { spawnSync } from "node:child_process";

const env = { ...process.env, STATIC_EXPORT: "true" };
const result = spawnSync("npx", ["next", "build"], { stdio: "inherit", shell: true, env });
process.exit(result.status ?? 1);
