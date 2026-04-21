'use client';

import { useEffect, useState } from 'react';
import { Header } from './Header';
import { ProgressBar } from './ProgressBar';

interface SiteChromeProps {
  /** Explicit progress fraction (0..1). Ignored when trackScroll is true. Defaults to 1 (full). */
  fraction?: number;
  /** When true, fraction is derived from page scroll position instead of the prop. */
  trackScroll?: boolean;
}

export function SiteChrome({ fraction = 1, trackScroll = false }: SiteChromeProps) {
  const [scrollFraction, setScrollFraction] = useState(0);

  useEffect(() => {
    if (!trackScroll) return;
    let rafId: number | null = null;

    function update() {
      rafId = null;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const f = total > 0 ? current / total : 1;
      setScrollFraction(Math.max(0, Math.min(1, f)));
    }
    function onScroll() {
      if (rafId === null) rafId = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [trackScroll]);

  const effective = trackScroll ? scrollFraction : fraction;

  return (
    <div className="sticky top-0 z-40 backdrop-blur-md bg-[rgba(18,10,6,0.85)]">
      <Header />
      <ProgressBar fraction={effective} />
    </div>
  );
}
