/**
 * Legacy static HTML used "Classroom 6x" — normalize to Playverse for titles, meta, and catalog JSON.
 */
export function normalizeLegacyBrand(s) {
  if (typeof s !== "string" || !s) return s;
  return s
    .replace(/Classroom 6x Team/g, "Playverse Team")
    .replace(/\bClassroom 6x Unblocked Games\b/gi, "Playverse")
    .replace(/\bfree unblocked games 6x\b/gi, "free unblocked games")
    .replace(/\bClassroom\s*6x\b/g, "Playverse")
    .replace(/\bclassroom\s*6x\b/g, "playverse");
}
