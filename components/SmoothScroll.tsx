'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scrolling, plus anchor-link interception so the header nav
 * eases to each section instead of jumping. Disabled entirely when the visitor
 * has asked for reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch scrolling stays native. Hijacking it costs momentum, rubber-band
      // and the browser-chrome hide/show that phone users expect; anchor links
      // still ease, because those go through lenis.scrollTo() below.
      syncTouch: false,
    });

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href*="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== '_self') return;

      // Navigation links are root-relative ("/#plans") so they also work from a
      // policy page. Only ease the scroll when the link points at THIS page —
      // otherwise let the browser navigate and land on the hash normally.
      const isSamePage =
        anchor.origin === window.location.origin &&
        anchor.pathname === window.location.pathname;
      if (!isSamePage) return;

      const hash = anchor.hash;
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -96 });
      window.history.pushState(null, '', hash);
    };

    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
