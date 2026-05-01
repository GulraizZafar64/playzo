/** Deterministic “heat” display for trending rows (e.g. 12.4K). */
export function heatScoreForSlug(slug: string): string {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const u = h >>> 0;
  const whole = 8 + (u % 42);
  const dec = (u >> 8) % 10;
  return `${whole}.${dec}K`;
}
