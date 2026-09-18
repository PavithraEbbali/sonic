import Image from 'next/image';
import { activeServiceLines, plansFor, type ImageAsset } from '@/lib/content';
import PlanCard from './PlanCard';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

/**
 * Renders every service line that actually has plans, in the canonical
 * merchandising order defined by SERVICE_LINE_ORDER:
 *   fiber -> cable -> bundle -> tv -> mobile -> phone
 *
 * Lines with no plans are skipped, so Sonic's non-native lines (cable,
 * television and mobile) never render as empty placeholders.
 *
 * `imagePlacement` decides how a line's photograph is used:
 *   'card'       — it becomes a banner across the top of the plan card
 *   'background' — full-bleed behind the section, tinted, content centred
 */
export default function ServiceSections() {
  const lines = activeServiceLines();

  return (
    <div id="plans">
      {lines.map((line, index) => {
        const plans = plansFor(line.id);
        const onCard = line.image && line.imagePlacement === 'card';
        const onBackground = line.image && line.imagePlacement === 'background';

        /* ---------------- Photograph behind the whole section --------------- */
        if (onBackground && line.image) {
          return (
            <section
              key={line.id}
              id={line.id}
              className="relative overflow-hidden border-t border-mist-line bg-navy px-5 py-14 sm:px-6 lg:px-8 lg:py-24"
            >
              <Image
                src={line.image.src}
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: line.image.position }}
              />
              {/* Light tint — enough to lift white type to ~7:1 over a mid-tone
                  interior without flattening the photograph. */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(16,19,43,0.60) 0%, rgba(16,19,43,0.68) 55%, rgba(16,19,43,0.74) 100%)',
                }}
              />

              <div className="relative mx-auto w-full max-w-6xl">
                <Reveal>
                  <SectionHeading
                    eyebrow={line.eyebrow}
                    title={line.title}
                    description={line.description}
                    tone="dark"
                    align="center"
                  />
                </Reveal>

                <div className="mx-auto mt-10 grid max-w-xl gap-6">
                  {plans.map((plan, cardIndex) => (
                    <Reveal key={plan.id} delay={cardIndex * 80} className="h-full">
                      <PlanCard plan={plan} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        /* --------- Plain section; photograph banners the card, if any -------- */
        return (
          <section
            key={line.id}
            id={line.id}
            className={[
              'px-5 py-16 sm:px-6 lg:px-8 lg:py-20',
              onCard ? 'bg-mist' : 'bg-white',
              index > 0 ? 'border-t border-mist-line' : '',
            ].join(' ')}
          >
            <div className="mx-auto w-full max-w-6xl">
              <Reveal>
                <SectionHeading
                  eyebrow={line.eyebrow}
                  title={line.title}
                  description={line.description}
                />
              </Reveal>

              <div
                className={[
                  'mt-10 grid gap-6',
                  onCard ? 'lg:max-w-2xl' : '',
                  !onCard && plans.length > 1 ? 'md:grid-cols-2' : '',
                  !onCard && plans.length === 1 ? 'sm:max-w-xl' : '',
                  !onCard && plans.length > 2 ? 'lg:grid-cols-3' : '',
                ].join(' ')}
              >
                {plans.map((plan, cardIndex) => (
                  <Reveal key={plan.id} delay={cardIndex * 80} className="h-full">
                    <PlanCard plan={plan} photo={onCard ? line.image : undefined} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

/** Framed 16:10 banner shown in place of a background photograph below `lg`. */
export function MobileBanner({ image }: { image: ImageAsset }) {
  return (
    <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden rounded-[20px] lg:hidden">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: image.position }}
      />
    </div>
  );
}
