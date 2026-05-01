/**
 * Puts games.json in public/ so the static export can fetch it at /data/games.json
 * (avoids bundling a huge JSON into fragile webpack chunks on Vercel).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "data", "games.json");
const destDir = path.join(root, "public", "data");
const dest = path.join(destDir, "games.json");

if (!fs.existsSync(src)) {
  console.error("Missing data/games.json — run: npm run generate-games");
  process.exit(1);
}
fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log("Copied data/games.json → public/data/games.json");
