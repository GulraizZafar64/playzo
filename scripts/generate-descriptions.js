const fs = require('fs');
const path = require('path');

// Mocking the data loading for node environment
const gamesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/games.json'), 'utf8'));

// We need to extract the keys from the manual descriptions
// Since we can't easily import a TS file with complex types in a simple node script without ts-node
// we'll parse the file content as a string to find keys or we can just look for the list of manual descriptions.

const descriptionsFile = fs.readFileSync(path.join(__dirname, '../lib/game-descriptions.ts'), 'utf8');

// Simple regex to find slugs in MANUAL_DESCRIPTIONS
const manualSlugs = [];
const manualRegex = /"([^"]+)": \{/g;
let match;
while ((match = manualRegex.exec(descriptionsFile)) !== null) {
  manualSlugs.push(match[1]);
}

const totalGames = gamesData.length;
const manualCount = manualSlugs.length;
const coveragePct = ((manualCount / totalGames) * 100).toFixed(1);

const missing = gamesData
  .filter(g => !manualSlugs.includes(g.slug))
  .sort((a, b) => (a.category || '').localeCompare(b.category || ''));

let missingTxt = "=== SLUGS NEEDING MANUAL UPGRADE ===\n\n";
let currentCat = "";

missing.forEach(g => {
  const cat = g.category || "Uncategorized";
  if (cat !== currentCat) {
    currentCat = cat;
    missingTxt += `\n[ ${currentCat} ]\n`;
  }
  missingTxt += `${g.slug}\n`;
});

fs.writeFileSync(path.join(__dirname, '../missing-descriptions.txt'), missingTxt);

console.log("==========================================");
console.log(" CONTENT COVERAGE REPORT ");
console.log("==========================================");
console.log(`Manual descriptions: ${manualCount}/${totalGames} (${coveragePct}%)`);
console.log(`Fallback coverage:   ${totalGames}/${totalGames} (100.0%)`);
console.log("");
console.log(`Wrote list of ${missing.length} missing slugs to: missing-descriptions.txt`);
console.log("Recommended: Manually write top 200 by traffic next.");
console.log("==========================================");
