'use client';

import { useEffect, useMemo, useState } from 'react';
import type { FacetState } from '@/lib/types';
import { recommend } from '@/lib/recommender';
import { Header } from './Header';
import { ProgressBar } from './ProgressBar';
import { FacetEditor } from './FacetEditor';

interface ResultProps {
  /** Drives the displayed recommendation. Only changes when user hits Apply. */
  committedState: FacetState;
  /** What the editor is mutating. Changes don't affect the card until Apply. */
  draftState: FacetState;
  /** Minted once per session at quiz completion. Does NOT regenerate when
   *  archetype changes — prevents users gaming codes to poison redemption-
   *  accuracy analytics. */
  sessionCode: string;
  onDraftChange: (partial: Partial<FacetState>) => void;
  onApply: () => void;
  onRestart: () => void;
}

export function Result({
  committedState,
  draftState,
  sessionCode,
  onDraftChange,
  onApply,
  onRestart,
}: ResultProps) {
  const { drink, archetype, enrichment } = recommend(committedState);

  // Scroll to top whenever the committed state changes — this is reliable
  // even when committedState updates happen in the same frame as the click
  // handler. Runs on initial mount too, which is a harmless no-op since
  // page.tsx already scrolls to top on quiz completion.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [committedState]);

  // Has the draft diverged from the committed state? Drives the Apply CTA.
  const hasChanges = useMemo(
    () => JSON.stringify(draftState) !== JSON.stringify(committedState),
    [draftState, committedState],
  );

  const [copied, setCopied] = useState(false);
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(sessionCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* silent — clipboard may be unavailable in some browsers/contexts */
    }
  }

  return (
    <>
      <Header meta="Your Ritual" />
      <ProgressBar fraction={1} />

      {/* ── Hero ──────────────────────────── */}
      <section className="mx-auto max-w-[560px] px-7 pt-9 pb-4 md:max-w-[880px] md:px-10 md:pt-12 md:pb-7 lg:max-w-[1024px]">
        <div className="md:grid md:grid-cols-2 md:gap-4 md:items-end md:mb-7">
          <h1 className="m-0 mb-3.5 md:mb-0 font-medium text-[54px] md:text-[72px] lg:text-[84px] leading-none tracking-[-0.035em] text-[var(--cream)]">
            {archetype.name}
          </h1>
          <p
            className="m-0 mb-[18px] md:mb-2 max-w-[480px] text-[19px] leading-[1.4] tracking-[-0.005em] text-[var(--cream-muted)]"
            style={{ fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic' }}
          >
            {archetype.descriptor}
          </p>
        </div>

        {/* ── Cards grid (drink + gift) ──────────────── */}
        <div className="md:grid md:grid-cols-2 md:gap-4 md:mb-4">
        {/* ── Drink card ──────────────── */}
        <div className="glass mb-3 md:mb-0">
          <p
            className="m-0 mb-1.5 text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            Today&apos;s Pour
          </p>
          <h2 className="m-0 mb-3.5 font-semibold text-[32px] leading-[1.05] tracking-[-0.02em] text-[var(--cream)]">
            {drink.name}
          </h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 m-0">
            <DataRow label={drink.family === 'tea-based' ? 'Leaf' : 'Bean'} value={enrichment.bean} />
            {drink.family !== 'tea-based' && (
              <DataRow label="Roast" value={cap(enrichment.roast)} />
            )}
            <DataRow label="Temp" value={cap(committedState.temperature)} />
            <DataRow
              label="Milk"
              value={
                committedState.milk === 'black'
                  ? 'None — served black'
                  : labelMilk(committedState.milk)
              }
            />
            <DataRow
              label="Sweet"
              value={committedState.sweetness === 'none' ? 'None' : cap(committedState.sweetness)}
            />
            <DataRow label="Notes" value={enrichment.notes} />
          </dl>
        </div>

        {/* ── Gift card ───────────────── */}
        <div className="glass gift-card mb-3.5 md:mb-0">
          <p
            className="m-0 mb-1.5 text-[11px] uppercase tracking-[0.22em] text-[var(--matcha-bright)]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            Redeem Your Gift
          </p>
          <div className="flex items-center gap-3 m-0 mb-2.5">
            <span
              className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] tracking-[0.04em] text-[var(--cream)] font-medium"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              {sessionCode || '…'}
            </span>
            <button
              type="button"
              onClick={copyCode}
              className="flex-shrink-0 bg-[rgba(245,230,208,0.06)] border border-[rgba(245,230,208,0.15)] text-[var(--cream)] uppercase tracking-[0.16em] text-[10px] py-[7px] px-[11px] rounded-[10px] cursor-pointer hover:bg-[rgba(245,230,208,0.12)] hover:border-[var(--gold)] transition-colors"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p
            className="m-0 text-[16px] leading-[1.4] text-[var(--cream)]"
            style={{ fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic' }}
          >
            20% off your first drink &mdash; any drink, any Basecamp.
            <span
              className="block mt-1.5 text-[11px] tracking-[0.04em] text-[var(--cream-dim)] not-italic"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              One-time use. Expires in 14 days.
            </span>
          </p>
        </div>
        </div>

        {/* ── Share row ───────────────── */}
        <div className="flex gap-2.5 md:max-w-[640px] md:mx-auto">
          <ShareButton primary onClick={() => shareResult(archetype.name, drink.name)}>
            Share your ritual
          </ShareButton>
          <ShareButton onClick={() => shareQuizLink()}>Share quiz link</ShareButton>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── Facet editor (reusable module) ── */}
      <FacetEditor
        state={draftState}
        onChange={onDraftChange}
        introSlot={
          <div className="mb-4">
            <h2
              className="m-0 mb-2 font-medium text-[28px] leading-[1.05] tracking-[-0.01em] text-[var(--cream)]"
              style={{ fontFamily: 'var(--font-fraunces), serif' }}
            >
              Not quite right?
            </h2>
            <p className="m-0 max-w-[440px] text-[14px] leading-[1.5] text-[var(--cream-muted)]">
              Adjust your taste preferences below — then find your new ritual.
            </p>
            <button
              type="button"
              onClick={onRestart}
              className="mt-1.5 p-0 underline text-[13px] text-[var(--cream-muted)] hover:text-[var(--cream)] cursor-pointer bg-transparent border-0"
              style={{ fontFamily: 'inherit' }}
            >
              Or re-take the quiz.
            </button>
          </div>
        }
        footerSlot={
          <div className="mt-4">
            <button
              type="button"
              onClick={onApply}
              disabled={!hasChanges}
              className={[
                'w-full rounded-[14px] px-4 py-4 text-[14px] font-semibold tracking-[0.04em] cursor-pointer border transition-all',
                hasChanges
                  ? 'bg-[rgba(212,165,116,0.22)] border-[rgba(212,165,116,0.55)] text-[var(--cream)] hover:bg-[rgba(212,165,116,0.32)] hover:border-[var(--gold)] shadow-[0_0_32px_-12px_rgba(212,165,116,0.4)]'
                  : 'bg-[rgba(255,255,255,0.03)] border-[rgba(245,230,208,0.10)] text-[var(--cream-dim)] cursor-not-allowed',
              ].join(' ')}
            >
              {hasChanges ? 'Find my new ritual' : 'No changes yet'}
            </button>
          </div>
        }
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt
        className="m-0 text-[10px] tracking-[0.18em] uppercase text-[var(--cream-dim)]"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        {label}
      </dt>
      <dd className="m-0 text-[15px] font-medium text-[var(--cream)]">{value}</dd>
    </>
  );
}

interface ShareButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  onClick: () => void;
}
function ShareButton({ children, primary, onClick }: ShareButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex-1 flex items-center justify-center gap-2 rounded-[14px] px-4 py-3.5 text-[13px] font-semibold tracking-[0.04em] cursor-pointer backdrop-blur-md border transition-colors',
        primary
          ? 'bg-[rgba(212,165,116,0.18)] border-[rgba(212,165,116,0.45)] text-[var(--cream)] hover:bg-[rgba(212,165,116,0.25)]'
          : 'bg-[rgba(255,255,255,0.035)] border-[rgba(245,230,208,0.12)] text-[var(--cream)] hover:border-[var(--gold)] hover:bg-[rgba(255,255,255,0.06)]',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

async function shareResult(archetypeName: string, drinkName: string) {
  const text = `I just found my coffee ritual at Basecamp — I'm ${archetypeName}, and today's pour is a ${drinkName}.`;
  const url = typeof window !== 'undefined' ? window.location.href : '';
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title: 'My Basecamp Ritual', text, url });
      return;
    } catch {
      /* user cancelled */
    }
  }
  try {
    await navigator.clipboard.writeText(`${text} ${url}`.trim());
  } catch {
    /* silent */
  }
}

async function shareQuizLink() {
  const url = typeof window !== 'undefined' ? window.location.origin : '';
  const text = 'Take the Basecamp Coffee ritual quiz — find the drink that fits you.';
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title: 'Basecamp Coffee Quiz', text, url });
      return;
    } catch {
      /* user cancelled */
    }
  }
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    /* silent */
  }
}

// ── Label helpers ─────────────────────────────────────────
function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function labelMilk(m: string) {
  if (m === '2%') return '2%';
  return cap(m);
}
