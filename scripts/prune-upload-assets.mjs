/**
 * Deletes files under public/assets/upload that are not referenced by data/games.json (thumb field).
 * Run: node scripts/prune-upload-assets.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const gamesPath = path.join(root, "data", "games.json");
const uploadRoot = path.join(root, "public", "assets", "upload");

const games = JSON.parse(fs.readFileSync(gamesPath, "utf8"));

const referenced = new Set();
for (const g of games) {
  if (!g.thumb || typeof g.thumb !== "string") continue;
  const rel = g.thumb.replace(/^\//, "");
  const abs = path.normalize(path.join(root, "public", rel));
  referenced.add(abs.toLowerCase());
}

if (!fs.existsSync(uploadRoot)) {
  console.log("No folder", path.relative(root, uploadRoot), "- nothing to do.");
  process.exit(0);
}

let removed = 0;

function walk(dir) {
  const names = fs.readdirSync(dir);
  for (const name of names) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      walk(full);
      try {
        if (fs.readdirSync(full).length === 0) fs.rmdirSync(full);
      } catch {
        /* ignore */
      }
    } else if (!referenced.has(full.toLowerCase())) {
      fs.unlinkSync(full);
      removed++;
    }
  }
}

walk(uploadRoot);

try {
  if (fs.readdirSync(uploadRoot).length === 0) fs.rmdirSync(uploadRoot);
} catch {
  /* ignore */
}

console.log("Referenced thumbs:", referenced.size);
console.log("Removed unreferenced files:", removed);
