'use client';

import { useEffect, useState } from 'react';
import type {
  FacetState,
  FlavorNote,
  Milk,
  Roast,
  Strength,
  Style,
  Sweetness,
  Temperature,
} from '@/lib/types';
import { recommend } from '@/lib/recommender';
import { generateSessionCode } from '@/lib/session';
import { archetypeById } from '@/lib/data/archetypes';
import { Quiz } from './components/Quiz';
import { Result } from './components/Result';

export default function Home() {
  /**
   * Two-state pattern (locked in REQUIREMENTS.md lesson 2.3 feedback):
   *
   * - `committedState`: drives the *displayed* recommendation. Stable
   *   until the user explicitly re-matches.
   * - `draftState`: what the editor is mutating. Decoupled from the
   *   recommendation card so users can freely experiment before committing.
   *
   * Apply action commits draft → committed and recomputes the recommendation.
   *
   * `sessionCode` is minted on the *first* quiz completion within a pageview
   * and stays stable for the entire session — across Apply actions AND
   * Re-take Quiz actions. This mirrors production: session = browser session
   * (pageview), not "this specific quiz attempt." Re-takes are exploration,
   * not new redemption events. Prevents gaming the code to poison downstream
   * redemption-accuracy analytics. See _design/REQUIREMENTS.md.
   *
   * In a real production app, sessionCode would persist to sessionStorage
   * so page refreshes don't mint new codes — MVP scope keeps it in-memory.
   */
  const [committedState, setCommittedState] = useState<FacetState | null>(null);
  const [draftState, setDraftState] = useState<FacetState | null>(null);
  const [sessionCode, setSessionCode] = useState<string>('');

  function handleQuizComplete(finalState: FacetState) {
    const { archetype } = recommend(finalState);
    // Only mint on the *first* completion — re-takes inside the same session
    // must not regenerate the code.
    setSessionCode((prev) => prev || generateSessionCode(archetype.slug));
    setCommittedState(finalState);
    setDraftState(finalState);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function handleDraftChange(partial: Partial<FacetState>) {
    setDraftState((prev) => (prev ? { ...prev, ...partial } : prev));
  }

  function handleApply() {
    if (!draftState) return;
    setCommittedState(draftState);
    // Scroll is handled in Result via useEffect on committedState — more
    // reliable than calling scrollTo synchronously right after setState.
  }

  function handleRestart() {
    // Deliberately preserve sessionCode across re-takes — the code is
    // scoped to the pageview, not the quiz attempt.
    setCommittedState(null);
    setDraftState(null);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Dev preview: ?preview=<drink-id> jumps straight to the result page for
  // that drink. Brute-forces the facet space to find a winning state.
  useEffect(() => {
    if (committedState) return;
    const params = new URLSearchParams(window.location.search);
    const previewId = params.get('preview');
    if (!previewId) return;
    const state = findStateForDrink(previewId);
    const archetype = archetypeById(previewId);
    if (!state || !archetype) return;
    setCommittedState(state);
    setDraftState(state);
    setSessionCode((prev) => prev || generateSessionCode(archetype.slug));
  }, [committedState]);

  if (!committedState || !draftState) {
    return <Quiz onComplete={handleQuizComplete} />;
  }

  return (
    <Result
      committedState={committedState}
      draftState={draftState}
      sessionCode={sessionCode}
      onDraftChange={handleDraftChange}
      onApply={handleApply}
      onRestart={handleRestart}
    />
  );
}

// ── Dev preview helper ──────────────────────────────────────
const STYLES: Style[] = ['espresso-based', 'brewed', 'cold-brewed', 'tea-based'];
const TEMPS: Temperature[] = ['hot', 'iced'];
const STRENGTHS: Strength[] = ['light', 'medium', 'bold', 'extra-bold'];
const MILKS: Milk[] = ['black', 'whole', '2%', 'oat', 'almond', 'soy'];
const SWEETNESSES: Sweetness[] = ['none', 'touch', 'sweet', 'indulgent'];
const FLAVORS: FlavorNote[] = [
  'fruity', 'floral', 'chocolate', 'nutty', 'caramel', 'spicy', 'earthy',
];
const ROASTS: Roast[] = ['light', 'medium', 'dark'];

function findStateForDrink(drinkId: string): FacetState | null {
  for (const style of STYLES)
    for (const temperature of TEMPS)
      for (const strength of STRENGTHS)
        for (const milk of MILKS)
          for (const sweetness of SWEETNESSES)
            for (const flavorNote of FLAVORS)
              for (const roast of ROASTS) {
                const state: FacetState = {
                  style, temperature, strength, milk, sweetness, flavorNote, roast,
                };
                if (recommend(state).drink.id === drinkId) return state;
              }
  return null;
}
