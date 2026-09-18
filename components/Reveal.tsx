'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger in milliseconds, for sibling cards. */
  delay?: number;
  className?: string;
}

/**
 * One-shot entrance reveal. The element fades and lifts into place the first
 * time it enters the viewport, then the observer releases it — no scroll-linked
 * animation, no repeat triggers.
 */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      element.dataset.revealed = 'true';
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal on entry, and also when a fast scroll or an anchor jump has
          // already carried the element above the viewport — otherwise it would
          // stay invisible until the visitor scrolled back up to it.
          const scrolledPast = entry.boundingClientRect.bottom < 0;
          if (!entry.isIntersecting && !scrolledPast) continue;
          (entry.target as HTMLElement).dataset.revealed = 'true';
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
