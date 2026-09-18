import Image from 'next/image';
import {
  ctaLabel,
  planTermRows,
  speedLabel,
  type ImageAsset,
  type PlanItem,
} from '@/lib/content';
import CallButton from './CallButton';
import PriceLockup from './PriceLockup';

interface PlanCardProps {
  plan: PlanItem;
  /**
   * Optional photograph rendered as a banner across the top of the card. The
   * card keeps its normal light treatment — type sits below the image, never on
   * it, so no scrim is needed and nothing has to fight the photograph for
   * contrast.
   */
  photo?: ImageAsset;
}

/**
 * One merchandising card. Everything visible here — name, speed, price, promo
 * terms, inclusions and the call-to-action wording — is derived from the
 * PlanItem, so lib/content.ts is the only file that ever needs editing.
 */
export default function PlanCard({ plan, photo }: PlanCardProps) {
  const speed = speedLabel(plan);
  const terms = planTermRows(plan);

  return (
    <article
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-[18px] bg-white',
        'transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5',
        plan.isPopular
          ? 'ring-2 ring-brand shadow-[0_20px_44px_-26px_rgba(35,120,198,0.65)] hover:shadow-[0_28px_56px_-24px_rgba(35,120,198,0.7)]'
          : 'ring-1 ring-mist-line shadow-[0_10px_30px_-24px_rgba(30,39,64,0.45)] hover:ring-brand/40 hover:shadow-[0_24px_48px_-28px_rgba(30,39,64,0.5)]',
      ].join(' ')}
    >
      {/* Gradient rail along the top edge */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-[3px]"
        style={{
          background: plan.isPopular
            ? 'linear-gradient(90deg, #2B3374, #295B98, #287FB9, #26ABE2)'
            : 'linear-gradient(90deg, #E2E9F2, #E2E9F2)',
        }}
      />

      {photo ? (
        <div className="relative aspect-[21/9] w-full shrink-0">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 42rem, 100vw"
            className="object-cover"
            style={{ objectPosition: photo.position }}
          />
          {/* Dissolves the photograph into the card surface instead of ending it
              on a hard rule, so the banner reads as part of the card. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-20"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.72) 58%, #FFFFFF 100%)',
            }}
          />
        </div>
      ) : null}

      <div className="flex h-full flex-col p-6 sm:p-7">
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[1.3125rem] font-bold leading-snug tracking-[-0.025em] text-graphite-deep">
              {plan.name}
            </h3>
            {plan.tagline ? (
              <p className="mt-2 text-[0.875rem] leading-relaxed text-graphite">
                {plan.tagline}
              </p>
            ) : null}
          </div>

          {plan.isPopular ? (
            <span className="shrink-0 rounded-full bg-sonic px-3 py-1.5 text-[0.6875rem] sm:text-[0.625rem] font-bold uppercase tracking-[0.12em] text-navy-deep">
              Popular
            </span>
          ) : null}
        </header>

        {speed ? (
          <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-brand/[0.08] px-3.5 py-2 text-[0.8125rem] font-bold text-brand">
            <BoltIcon />
            {speed}
          </p>
        ) : null}

        <div className="mt-6 border-t border-mist-line pt-6">
          <PriceLockup plan={plan} size="card" />
        </div>

        <ul className="mt-6 flex-1 space-y-3">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-3 text-[0.875rem] leading-relaxed text-graphite-deep"
            >
              <CheckIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <CallButton
            label={ctaLabel(plan)}
            variant={plan.isPopular ? 'primary' : 'outline'}
            srSuffix={plan.name}
            fullWidth
          />
        </div>

        {(terms.length > 0 || plan.equipmentFee) && (
          <div className="mt-5 border-t border-mist-line pt-4">
            {terms.length > 0 ? (
              <dl className="space-y-1.5">
                {terms.map((term) => (
                  <div key={term.label} className="flex items-baseline justify-between gap-3">
                    <dt className="text-[0.75rem] sm:text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-graphite/75">
                      {term.label}
                    </dt>
                    <dd className="text-right text-[0.8125rem] sm:text-[0.75rem] font-semibold text-graphite-deep">
                      {term.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {plan.equipmentFee ? (
              <p className="mt-3 text-[0.75rem] sm:text-[0.6875rem] leading-relaxed text-graphite">
                {plan.equipmentFee}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mt-[3px] h-4 w-4 shrink-0 text-brand"
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

function BoltIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.3 1.5 4 11.2h4.2l-.5 7.3 7.3-9.7h-4.2z" />
    </svg>
  );
}
