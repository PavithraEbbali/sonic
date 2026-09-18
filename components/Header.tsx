import { NAV_LINKS, SITE } from '@/lib/content';
import SonicWordmark from './SonicWordmark';
import { PhoneIcon } from './CallButton';

/**
 * Global top chrome: the persistent, non-dismissable retailer disclosure bar
 * stacked above the sticky header. Both travel together so the disclosure stays
 * visible for the entire scroll.
 */
export default function Header() {
  return (
    <div className="sticky top-0 z-50">
      <div className="bg-navy-deep px-4 py-2 text-center">
        <p className="text-[0.8125rem] sm:text-[0.75rem] font-medium leading-snug tracking-[0.01em] text-white/85">
          {SITE.disclosure}
        </p>
      </div>

      <header className="border-b border-mist-line bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/88">
        <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between gap-3 px-5 sm:px-6 lg:px-8">
          <a href="#hero" aria-label={`${SITE.brandName} — ${SITE.retailerLabel}`}>
            <SonicWordmark />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[0.9375rem] font-semibold text-graphite-deep transition-colors duration-200 hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={SITE.phoneHref}
            data-call-cta
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand px-4 py-3 text-[0.8125rem] font-bold uppercase tracking-[0.07em] text-white transition-colors duration-200 hover:bg-brand-hover sm:px-5"
          >
            <PhoneIcon />
            <span className="hidden sm:inline">{SITE.phoneDisplay}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>
    </div>
  );
}
