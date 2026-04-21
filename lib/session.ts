/**
 * Session-scoped discount code generator.
 *
 * Format: RITUAL-{ARCHETYPE-SLUG}-{4-char hash}
 * Example: RITUAL-SLOW-BURN-4K7P
 *
 * Per /_design/REQUIREMENTS.md: the verbose format is intentional —
 * in production the code would be shorter (POS-friendly), but for the
 * portfolio surface we want the data-mapping intent to be scannable:
 * code → archetype → drink recommendation, enabling downstream
 * redemption-vs-actual-purchase analytics.
 */

// No confusing chars (no 0/O, no 1/I/L)
const HASH_CHARS = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

export function generateSessionCode(archetypeSlug: string): string {
  let hash = '';
  for (let i = 0; i < 4; i++) {
    hash += HASH_CHARS[Math.floor(Math.random() * HASH_CHARS.length)];
  }
  return `RITUAL-${archetypeSlug}-${hash}`;
}
