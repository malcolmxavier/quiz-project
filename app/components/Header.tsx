interface HeaderProps {
  /** Optional right-aligned meta text. Omit to show the brand alone. */
  meta?: string;
}

export function Header({ meta }: HeaderProps) {
  return (
    <header className="flex items-start justify-between gap-6 px-7 py-5 border-b border-[var(--line)]">
      <div className="flex flex-col gap-1.5">
        <div className="text-[20px] font-bold leading-none tracking-wide uppercase text-[var(--cream)]">
          Basecamp
        </div>
        <div
          className="text-[15px] tracking-[0.01em] text-[var(--cream-muted)]"
          style={{ fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic' }}
        >
          Find your ritual
        </div>
      </div>
      {meta && (
        <div
          className="text-[11px] uppercase tracking-[0.16em] text-[var(--gold)] pt-[2px]"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          {meta}
        </div>
      )}
    </header>
  );
}
