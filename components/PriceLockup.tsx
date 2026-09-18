import { CTA, hasPrice, type PlanItem } from '@/lib/content';

interface PriceLockupProps {
  plan: PlanItem;
  /** `card` renders the 2.5rem integer, `hero` the 3.5rem integer. */
  size?: 'card' | 'hero';
  tone?: 'light' | 'dark';
  /** Hide the promotional qualifier line (the fine-print grid prints it separately). */
  showQualifier?: boolean;
}

/**
 * The single price presentation used everywhere on the site: hero anchor, plan
 * cards and bundle cards. Reads straight off a PlanItem, so a rate change in
 * lib/content.ts cascades to every lockup with no layout edits.
 *
 * Visual structure is a flex row: a small raised dollar sign, a dominant
 * integer, and muted cents — with the promotional qualifier beneath.
 */
export default function PriceLockup({
  plan,
  size = 'card',
  tone = 'light',
  showQualifier = true,
}: PriceLockupProps) {
  const integerClass =
    size === 'hero'
      ? 'text-[2.75rem] sm:text-[3.25rem] lg:text-[3.5rem]'
      : 'text-[2.5rem]';

  const priced = hasPrice(plan);

  const strongText = tone === 'dark' ? 'text-white' : 'text-graphite-deep';
  const mutedText = tone === 'dark' ? 'text-white/55' : 'text-graphite/75';
  const qualifierText = tone === 'dark' ? 'text-white/70' : 'text-graphite';

  if (!priced) {
    return (
      <div>
        <p
          className={`text-[1.625rem] font-bold leading-none tracking-[-0.025em] ${
            tone === 'dark' ? 'text-sonic-bright' : 'text-brand'
          }`}
        >
          {CTA.pricing}
        </p>
        {showQualifier && plan.promoQualifier ? (
          <p className={`mt-2 text-[0.8125rem] leading-snug ${qualifierText}`}>
            {plan.promoQualifier}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start gap-[0.15em]">
        <span
          className={`mt-[0.35em] text-[1.25rem] font-semibold leading-none ${mutedText}`}
          aria-hidden="true"
        >
          $
        </span>
        <span
          className={`font-bold leading-[0.85] tracking-[-0.03em] tabular-nums ${integerClass} ${strongText}`}
        >
          {plan.price}
        </span>
        <span
          className={`mt-[0.35em] text-[1.25rem] font-semibold leading-none tabular-nums ${mutedText}`}
        >
          {plan.cents ?? '00'}
        </span>
      </div>

      <span className="sr-only">
        {`$${plan.price}.${plan.cents ?? '00'} per month`}
      </span>

      {showQualifier && plan.promoQualifier ? (
        <p className={`mt-3 text-[0.8125rem] leading-snug ${qualifierText}`}>
          {plan.promoQualifier}
        </p>
      ) : null}
    </div>
  );
}
