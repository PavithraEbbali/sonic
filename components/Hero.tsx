import Image from 'next/image';
import {
  MEDIA,
  SITE,
  TRUST_CHIPS,
  formatSpeedLong,
  heroHighlights,
  leadPlan,
} from '@/lib/content';
import PriceLockup from './PriceLockup';
import ZipChecker from './ZipChecker';

/**
 * Hero. Full-bleed photograph under a light, left-weighted navy wash, with the
 * price carried inline in the copy rather than inside a bordered pricing card,
 * and three glass highlight chips alongside.
 *
 * The overlay is deliberately light on the right so the photograph reads; the
 * chips are translucent for the same reason. Nothing here should grow into an
 * opaque panel — that buries the image.
 *
 * The hero carries BOTH required entry points: the ZIP checker and a call
 * button. Keep a call action in this section.
 */
export default function Hero() {
  const plan = leadPlan();
  const headlineSpeed = formatSpeedLong(plan.speedDown);
  const highlights = heroHighlights();

  return (
    <section id="hero" className="relative overflow-hidden bg-navy-deep">
      {/* Photographic base. `priority` because this is the LCP element. */}
      <Image
        src={MEDIA.hero.src}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover"
        style={{ objectPosition: MEDIA.hero.position }}
      />

      {/* Single left-weighted wash. Heavy enough behind the headline to hold
          contrast, light on the right so the room, lamp and window read. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(11,16,32,0.90) 0%, rgba(13,20,42,0.72) 34%, rgba(16,24,50,0.40) 62%, rgba(16,24,50,0.26) 100%)',
        }}
      />
      {/* Restrained cyan bloom — enough to tint the arcs, not to fog the photo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(34rem 24rem at 88% 4%, rgba(38,171,226,0.18), transparent 66%)',
        }}
      />
      <ArcMotif />

      {/* Narrow screens put the copy over the whole frame, so they need a
          vertical wash the desktop layout does not. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,16,32,0.62) 0%, rgba(11,16,32,0.84) 55%, rgba(11,16,32,0.9) 100%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-14 pb-6 sm:px-6 lg:px-8 lg:pt-24 lg:pb-10">
        <div className="lg:grid lg:grid-cols-[1.28fr_0.72fr] lg:items-center lg:gap-14">
          {/* ------------------------------ Copy ------------------------------ */}
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-sonic/40 bg-sonic/12 px-4 py-1.5 text-[0.75rem] sm:text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-sonic-bright backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-sonic" />
              {SITE.retailerLabel}
            </p>

            <h1 className="mt-6 text-[2.125rem] font-bold leading-[1.1] tracking-[-0.035em] text-white sm:text-[2.5rem] lg:text-[2.875rem]">
              <span className="block text-balance">Symmetrical fiber internet</span>
              {headlineSpeed ? (
                <span className="block whitespace-nowrap">
                  up to <span className="text-sonic">{headlineSpeed}</span>.
                </span>
              ) : null}
            </h1>

            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/80">
              Sonic designs, builds and operates its own fiber-to-the-home network.
              Upload capacity matches download on every tier, data is uncapped, and
              professional installation is included at no charge.
            </p>

            {/* Price carried inline in the copy — no bordered pricing card. */}
            <div className="mt-8">
              <p className="text-[0.75rem] sm:text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white/55">
                Fiber plans start at
              </p>
              <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
                <PriceLockup plan={plan} size="hero" tone="dark" showQualifier={false} />
                {plan.promoQualifier ? (
                  <p className="pb-1.5 text-[0.8125rem] leading-snug text-white/65">
                    {plan.promoQualifier}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-8">
              <ZipChecker />
            </div>
          </div>

          {/* --------------------------- Highlights --------------------------- */}
          <ul className="mt-12 space-y-3 lg:mt-0">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="flex gap-3.5 rounded-2xl border border-white/14 bg-white/[0.09] p-4 backdrop-blur-md transition-colors duration-300 hover:border-sonic/40 hover:bg-white/[0.13]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sonic/20 text-sonic-bright">
                  <CheckIcon className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.9375rem] font-bold leading-snug text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-white/65">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* --------------------------- Trust strip --------------------------- */}
        <ul className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/12 py-5 lg:mt-14">
          {TRUST_CHIPS.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center gap-2.5 text-[0.875rem] font-semibold text-white/85"
            >
              <CheckIcon className="h-4 w-4 shrink-0 text-sonic" />
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Sonic's signature concentric arcs, sweeping in from the top-right corner.
 * Static strokes rendered once — the radii and opacities are computed at build
 * time, so nothing animates and nothing runs on the client. Kept faint so they
 * read as a brand motif over the photograph rather than competing with it.
 */
function ArcMotif() {
  const rings = Array.from({ length: 19 }, (_, i) => ({
    r: 74 + i * 37,
    opacity: Math.max(0.04, 0.34 - i * 0.017),
    width: i % 4 === 0 ? 1.6 : 1,
  }));

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 660 780"
      preserveAspectRatio="xMaxYMin slice"
      className="pointer-events-none absolute right-0 top-0 h-full w-[min(78%,660px)]"
      fill="none"
    >
      {rings.map((ring) => (
        <circle
          key={ring.r}
          cx="648"
          cy="34"
          r={ring.r}
          stroke="#26ABE2"
          strokeWidth={ring.width}
          opacity={ring.opacity}
        />
      ))}
    </svg>
  );
}

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}
