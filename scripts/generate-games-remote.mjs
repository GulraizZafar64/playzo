/**
 * Regenerate data/games.json with descriptions pulled from
 * https://playzo.space/game/{slug} (requires network).
 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const script = path.join(__dirname, "generate-games.mjs");

const r = spawnSync(process.execPath, [script], {
  env: { ...process.env, FETCH_REMOTE_DESCRIPTIONS: "true" },
  stdio: "inherit",
});
process.exit(r.status ?? 1);
