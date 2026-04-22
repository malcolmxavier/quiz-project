'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Coffee Personality Quiz' },
  { href: '/about', label: 'About' },
  { href: '/case-study', label: 'Case Study' },
] as const;

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-[var(--line)]">
      <div className="flex items-start justify-between gap-6 px-7 py-5">
        <Link href="/" className="flex flex-col gap-1.5 no-underline">
          <span className="text-[20px] font-bold leading-none tracking-wide uppercase text-[var(--cream)]">
            Basecamp Coffee
          </span>
          <span
            className="text-[15px] tracking-[0.01em] text-[var(--cream-muted)]"
            style={{ fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic' }}
          >
            Find your ritual
          </span>
        </Link>

        {/* Desktop / tablet nav (md+) */}
        <nav className="hidden md:flex items-center gap-5 pt-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'text-[13px] font-medium px-1 py-2 transition-colors underline-offset-[6px] decoration-[2px]',
                  isActive
                    ? 'text-[var(--gold-bright)] underline decoration-[var(--gold)]'
                    : 'text-[var(--cream-muted)] no-underline hover:text-[var(--cream)] hover:underline hover:decoration-[rgba(212,165,116,0.55)]',
                ].join(' ')}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-center gap-[5px] h-[22px] w-[22px] bg-transparent border-0 cursor-pointer p-0 pt-[2px]"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-[2px] w-[22px] bg-[var(--cream)] transition-transform duration-200 ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-[22px] bg-[var(--cream)] transition-opacity duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-[22px] bg-[var(--cream)] transition-transform duration-200 ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu panel (below md) */}
      {menuOpen && (
        <nav className="md:hidden border-t border-[var(--line)] flex flex-col px-7 py-4 gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={[
                  'text-[15px] font-medium px-3 py-3 transition-colors no-underline',
                  isActive
                    ? 'text-[var(--gold-bright)]'
                    : 'text-[var(--cream-muted)] hover:text-[var(--cream)]',
                ].join(' ')}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
