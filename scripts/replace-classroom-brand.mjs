/**
 * One-time / maintenance: replace "Classroom 6x" branding in legacy *.html (game/, index, public/, etc.).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { normalizeLegacyBrand } from "./brand-normalize.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const EXCLUDE =
  /node_modules|\.next|[/\\]out[/\\]|[/\\]\.git[/\\]|[/\\]agent-transcripts[/\\]/;

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (EXCLUDE.test(p)) continue;
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.isFile() && ent.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function main() {
  const files = walk(root);
  let patched = 0;
  for (const f of files) {
    const raw = fs.readFileSync(f, "utf8");
    const next = normalizeLegacyBrand(raw);
    if (next !== raw) {
      fs.writeFileSync(f, next, "utf8");
      patched++;
    }
  }
  console.log(`[replace-classroom-brand] Updated ${patched} of ${files.length} HTML files (Playverse branding).`);
}

main();
