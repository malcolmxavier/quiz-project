/**
 * Recommender coverage audit.
 *
 * Enumerates every possible quiz answer path and runs the recommender on
 * each. Reports:
 *   1. How many unique drinks win at least once
 *   2. Win count + share per drink (distribution)
 *   3. Drinks that are never reached via the quiz
 *
 * Core enumeration + scoring lives in `lib/coverage.ts` so the case-study
 * page can show the same distribution without duplicating logic.
 *
 * Run: npx tsx scripts/analyze-coverage.ts
 */
import { menu } from '../lib/data/menu';
import { computeCoverage } from '../lib/coverage';

const { totalPaths, perDrink } = computeCoverage();
const reachedIds = new Set(perDrink.map((d) => d.drinkId));
const unreached = menu.filter((d) => !reachedIds.has(d.id));

const pad = (s: string, n: number) => s.padEnd(n);
const pct = (share: number) => (share * 100).toFixed(1) + '%';

console.log('');
console.log('Total quiz paths enumerated:  ' + totalPaths);
console.log('Unique winning drinks:        ' + perDrink.length + ' / ' + menu.length);
console.log('');
console.log(pad('Drink', 22) + pad('Win count', 12) + 'Share');
console.log('─'.repeat(50));
for (const { drinkName, count, share } of perDrink) {
  console.log(pad(drinkName, 22) + pad(String(count), 12) + pct(share));
}

if (unreached.length > 0) {
  console.log('');
  console.log('⚠ Never reached via quiz:');
  for (const d of unreached) console.log('   • ' + d.name);
} else {
  console.log('');
  console.log('✓ All ' + menu.length + ' drinks are reachable via at least one quiz path.');
}
