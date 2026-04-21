/**
 * Recommender coverage audit.
 *
 * Enumerates every possible quiz answer path (4 answers × 6 questions = 4,096
 * paths) and runs the recommender on each. Reports:
 *   1. How many unique drinks win at least once
 *   2. Win count per drink (distribution)
 *   3. Drinks that are never reached via the quiz
 *
 * Portfolio note: this script is how you'd validate recommender coverage
 * before shipping. In production you'd also sample the editor's facet-space
 * (7 facets × 2–7 options each = ~8k combos) to confirm every SKU has at
 * least one winning path.
 *
 * Run: npx tsx scripts/analyze-coverage.ts
 */
import type { FacetState } from '../lib/types';
import { recommend } from '../lib/recommender';
import { menu } from '../lib/data/menu';
import { questions } from '../lib/data/questions';
import { flavorProfiles } from '../lib/data/mappings';

const allStates: FacetState[] = [];

function walk(qIdx: number, accumulated: Partial<FacetState>): void {
  if (qIdx >= questions.length) {
    // Derive default roast from flavor note (same logic as Quiz.tsx handoff).
    const flavorNote = accumulated.flavorNote!;
    const state: FacetState = {
      ...accumulated,
      roast: flavorProfiles[flavorNote].defaultRoast,
    } as FacetState;
    allStates.push(state);
    return;
  }
  for (const answer of questions[qIdx].answers) {
    const merged = { ...accumulated, ...answer.mutations };
    if (answer.followUp) {
      // Walk the follow-up's answers, then continue to the next main question.
      for (const fuAnswer of answer.followUp.answers) {
        walk(qIdx + 1, { ...merged, ...fuAnswer.mutations });
      }
    } else {
      walk(qIdx + 1, merged);
    }
  }
}

walk(0, {});

const winCounts = new Map<string, number>();
for (const state of allStates) {
  const { drink } = recommend(state);
  winCounts.set(drink.name, (winCounts.get(drink.name) ?? 0) + 1);
}

const total = allStates.length;
const unreached = menu.filter((d) => !winCounts.has(d.name));
const sorted = Array.from(winCounts.entries()).sort((a, b) => b[1] - a[1]);

const pad = (s: string, n: number) => s.padEnd(n);
const pct = (n: number) => ((n / total) * 100).toFixed(1) + '%';

console.log('');
console.log('Total quiz paths enumerated:  ' + total);
console.log('Unique winning drinks:        ' + winCounts.size + ' / ' + menu.length);
console.log('');
console.log(pad('Drink', 22) + pad('Win count', 12) + 'Share');
console.log('─'.repeat(50));
for (const [name, count] of sorted) {
  console.log(pad(name, 22) + pad(String(count), 12) + pct(count));
}

if (unreached.length > 0) {
  console.log('');
  console.log('⚠ Never reached via quiz:');
  for (const d of unreached) console.log('   • ' + d.name);
} else {
  console.log('');
  console.log('✓ All ' + menu.length + ' drinks are reachable via at least one quiz path.');
}
