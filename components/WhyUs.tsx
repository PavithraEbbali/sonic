import Image from 'next/image';
import { CTA, HOW_IT_WORKS, MEDIA, WHY_US } from '@/lib/content';
import CallButton from './CallButton';
import Reveal from './Reveal';
import { MobileBanner } from './ServiceSections';
import SectionHeading from './SectionHeading';

/**
 * "How it works" on a navy stage, paired with the installation photograph, then
 * the reasons-to-choose grid on white beneath an editorial band image, closing
 * on the vibrant brand gradient band. All copy reads from lib/content.ts.
 */
export default function WhyUs() {
  return (
    <>
      {/* ------------------------- How it works ------------------------- */}
      <section
        id="how-it-works"
        className="relative overflow-hidden bg-navy px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(40rem 24rem at 82% 0%, rgba(38,171,226,0.20), transparent 68%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Getting started"
              title="Three steps to installation"
              tone="dark"
            />
          </Reveal>

          <div className="mt-11 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-12">
            <Reveal>
              {/* 4:3, matching the service-line photos. Stretching this to the
                  height of the step list would crop the 1.83:1 source to a
                  near-square and lose half the frame. */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] ring-1 ring-white/12">
                <Image
                  src={MEDIA.install.src}
                  alt={MEDIA.install.alt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: MEDIA.install.position }}
                />
                {/* Slight navy wash so the photograph sits in the palette
                    rather than punching a bright hole in the dark section. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(16,19,43,0.12) 0%, rgba(16,19,43,0.42) 100%)',
                  }}
                />
              </div>
            </Reveal>

            <ol className="grid gap-4">
              {HOW_IT_WORKS.map((item, index) => (
                <Reveal key={item.step} delay={index * 80}>
                  <li className="flex gap-5 rounded-[18px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-sonic/40 hover:bg-white/[0.08] sm:p-7">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sonic text-[0.9375rem] font-bold tabular-nums text-navy-deep">
                      {item.step}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[1.125rem] font-bold tracking-[-0.02em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/70">
                        {item.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* --------------------------- Why Sonic --------------------------- */}
      {/* Photograph full-bleed under a graded navy wash. Shadowed glyphs on the
          bare image read as a patch rather than a design — the wash gives the
          heading a consistent field and neutralises the lamp hotspot, while
          staying light enough on the right for the room to show. Below `lg` the
          photograph becomes a banner and the section falls back to solid navy,
          so a 1.83:1 source is never cropped to a sliver. */}
      <section
        id="why-sonic"
        className="relative overflow-hidden bg-navy px-5 py-14 sm:px-6 lg:bg-transparent lg:px-8 lg:py-24"
      >
        <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
          <Image
            src={MEDIA.household.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: MEDIA.household.position }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(115deg, rgba(16,19,43,0.88) 0%, rgba(16,19,43,0.76) 42%, rgba(16,19,43,0.60) 100%)',
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-6xl">
          <MobileBanner image={MEDIA.household} />
          <Reveal>
            <SectionHeading
              eyebrow="Why Sonic"
              title="A network built and operated end to end"
              description="Owning the infrastructure end to end is what allows Sonic to deliver symmetrical speeds, unlimited data and predictable monthly pricing at the same time."
              tone="dark"
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {WHY_US.map((feature, index) => (
              <Reveal key={feature.id} delay={index * 70} className="h-full">
                <div className="h-full rounded-[18px] bg-white p-6 ring-1 ring-mist-line transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_-30px_rgba(30,39,64,0.55)] sm:p-7">
                  <span
                    aria-hidden="true"
                    className="block h-[3px] w-10 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #26ABE2, #2378C6)' }}
                  />
                  <h3 className="mt-5 text-[1.1875rem] font-bold tracking-[-0.02em] text-graphite-deep">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-graphite">
                    {feature.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------- Gradient CTA ------------------------- */}
      <section className="px-5 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <Reveal>
          <div
            className="mx-auto w-full max-w-6xl overflow-hidden rounded-[22px] px-7 py-10 sm:px-9 sm:py-11"
            style={{
              background: 'linear-gradient(105deg, #2B3374 0%, #295B98 52%, #287FB9 100%)',
            }}
          >
            <div className="flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="min-w-0">
                <h2 className="text-[1.5rem] font-bold leading-tight tracking-[-0.025em] text-white sm:text-[1.75rem]">
                  Ready to confirm what your address can get?
                </h2>
                <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-white/80">
                  A retail specialist will verify the plans serviceable on your street
                  and the exact monthly rate before any order is placed.
                </p>
              </div>
              <CallButton label={CTA.order} variant="onDark" className="shrink-0" />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
