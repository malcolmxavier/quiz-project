'use client';

import { useState } from 'react';
import type { Answer, FacetState, Question } from '@/lib/types';
import { questions } from '@/lib/data/questions';
import { flavorProfiles } from '@/lib/data/mappings';
import { SiteChrome } from './SiteChrome';
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
  const [started, setStarted] = useState(false);
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
      <SiteChrome fraction={fraction} />
      {started ? (
        <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} />
      ) : (
        <QuizIntro onStart={() => setStarted(true)} />
      )}
    </>
  );
}

function QuizIntro({ onStart }: { onStart: () => void }) {
  return (
    <section className="mx-auto max-w-[780px] px-7 pt-10 pb-20 md:px-10 md:pt-14 md:pb-24">
      <p
        className="m-0 mb-3 text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        Basecamp Rewards
      </p>
      <h2
        className="m-0 mb-4 font-medium text-[28px] md:text-[34px] leading-[1.1] tracking-[-0.015em] text-[var(--cream)]"
        style={{ fontFamily: 'var(--font-fraunces), serif' }}
      >
        Find your Basecamp ritual.
      </h2>
      <p className="m-0 mb-6 text-[16px] md:text-[17px] leading-[1.5] text-[var(--cream-muted)] max-w-[620px]">
        Answer a few questions and we&apos;ll match you to a drink from the Basecamp menu.
        When you&apos;re done, you&apos;ll get a discount code to try it on us.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="inline-flex items-center justify-center rounded-[14px] px-6 py-3.5 text-[14px] font-semibold tracking-[0.04em] cursor-pointer border transition-all bg-[rgba(212,165,116,0.22)] border-[rgba(212,165,116,0.55)] text-[var(--cream)] hover:bg-[rgba(212,165,116,0.32)] hover:border-[var(--gold)] shadow-[0_0_32px_-12px_rgba(212,165,116,0.4)] w-full md:w-auto"
      >
        Take the quiz
      </button>
    </section>
  );
}
