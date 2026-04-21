import type { Question, Answer } from '@/lib/types';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: Answer) => void;
}

export function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  return (
    <section className="mx-auto max-w-[780px] px-7 pt-14 pb-20 md:px-10 md:pt-20 md:pb-24">
      {/* Chapter label deliberately not rendered — naming the facet being
          probed (e.g., "Strength") would oversteer users and flatten the
          intentional obliqueness of the prompts. The `chapter` field stays
          on the data model for analytics / internal use. */}

      {/* prompt — if the source text ends in …, stylize it in gold;
          otherwise render as-is so prompts that end in ? don't get a
          stray ellipsis appended. */}
      <h1 className="m-0 mb-12 font-medium text-[44px] md:text-[64px] leading-[1.02] tracking-[-0.03em] text-[var(--cream)]">
        {question.prompt.includes('…') ? (
          <>
            {question.prompt.replace('…', '')}
            <span className="text-[var(--gold)]">…</span>
          </>
        ) : (
          question.prompt
        )}
      </h1>

      {/* answers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.answers.map((answer, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onAnswer(answer)}
            className="glass answer-card"
          >
            <span
              className="text-[11px] tracking-[0.12em] text-[var(--gold)] relative z-[1]"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span
              className="text-[22px] md:text-[23px] leading-[1.32] tracking-[-0.005em] text-[var(--cream)] relative z-[1]"
              style={{ fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic' }}
            >
              {answer.text}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
