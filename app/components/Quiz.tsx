'use client';

import { useState } from 'react';
import type { Answer, FacetState, Question } from '@/lib/types';
import { questions } from '@/lib/data/questions';
import { flavorProfiles } from '@/lib/data/mappings';
import { Header } from './Header';
import { ProgressBar } from './ProgressBar';
import { QuizQuestion } from './QuizQuestion';

interface QuizProps {
  onComplete: (state: FacetState) => void;
}

/**
 * Quiz flow controller.
 *
 * Supports branching: a main question's answer can carry a `followUp`
 * Question, which is injected before advancing to the next main question.
 * Used by Q3's two-flavor answers to disambiguate (e.g., citrus-vs-floral).
 *
 * Progress total is dynamic:
 *   - Start: 6 (main questions only)
 *   - If a follow-up ever triggers: 7 (main + the one injected follow-up)
 *
 * Header meta counter is deliberately omitted per REQUIREMENTS.md — the
 * progress bar alone carries the sense of progress, so a variable total
 * doesn't create a visible jump in "Question X / Y" numerals.
 */
export function Quiz({ onComplete }: QuizProps) {
  const [mainIndex, setMainIndex] = useState(0);
  const [followUp, setFollowUp] = useState<Question | null>(null);
  const [partial, setPartial] = useState<Partial<FacetState>>({});
  const [completed, setCompleted] = useState(0);
  const [followUpSeen, setFollowUpSeen] = useState(false);

  const currentQuestion: Question = followUp ?? questions[mainIndex];
  const total = 6 + (followUpSeen ? 1 : 0);
  const fraction = completed / total;

  function handleAnswer(answer: Answer) {
    const nextPartial: Partial<FacetState> = { ...partial, ...answer.mutations };
    const onFollowUp = followUp !== null;
    const triggersFollowUp = !!answer.followUp && !onFollowUp;

    // Compute next main index + follow-up state.
    const nextMainIndex = triggersFollowUp ? mainIndex : mainIndex + 1;
    const nextFollowUp: Question | null = triggersFollowUp ? answer.followUp! : null;
    const nextCompleted = completed + 1;
    const nextFollowUpSeen = followUpSeen || triggersFollowUp;

    // If we've consumed all main questions, derive roast from flavor and hand off.
    if (nextMainIndex >= questions.length) {
      const flavorNote = nextPartial.flavorNote!;
      const finalState: FacetState = {
        style: nextPartial.style!,
        temperature: nextPartial.temperature!,
        strength: nextPartial.strength!,
        milk: nextPartial.milk!,
        sweetness: nextPartial.sweetness!,
        flavorNote,
        roast: flavorProfiles[flavorNote].defaultRoast,
      };
      onComplete(finalState);
      return;
    }

    setPartial(nextPartial);
    setMainIndex(nextMainIndex);
    setFollowUp(nextFollowUp);
    setCompleted(nextCompleted);
    setFollowUpSeen(nextFollowUpSeen);
  }

  return (
    <>
      <Header />
      <ProgressBar fraction={fraction} />
      <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} />
    </>
  );
}
