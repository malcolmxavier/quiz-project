export function Footer() {
  return (
    <footer className="px-7 pt-6 pb-6 md:px-10 md:pt-8 md:pb-8">
      <p
        className="m-0 text-[12px] leading-[1.6] text-[var(--cream-dim)]"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        Built as a portfolio piece for the{' '}
        <a
          href="https://ccforeveryone.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--cream-muted)] hover:text-[var(--cream)] underline decoration-[var(--line-bright)] underline-offset-[3px] hover:decoration-[var(--cream-muted)] transition-colors"
        >
          Claude Code for Everyone
        </a>{' '}
        course · Module 2
      </p>
    </footer>
  );
}
