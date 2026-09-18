import { SITE } from '@/lib/content';

type Variant = 'primary' | 'onDark' | 'outline' | 'ghost';

interface CallButtonProps {
  /** Visible button text. Body sections pass "Call to order" / "Call for pricing". */
  label: string;
  variant?: Variant;
  className?: string;
  /** Extra context for screen readers, e.g. the plan name. */
  srSuffix?: string;
  fullWidth?: boolean;
}

/**
 * Uppercase, letter-spaced button treatment matching Sonic's own CTA styling.
 */
const BASE =
  'inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 ' +
  'text-[0.8125rem] font-bold uppercase tracking-[0.08em] whitespace-nowrap ' +
  'transition-[background-color,border-color,box-shadow,transform] duration-200';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-[0_10px_26px_-12px_rgba(35,120,198,0.9)] hover:bg-brand-hover hover:shadow-[0_14px_32px_-12px_rgba(35,120,198,1)]',
  onDark:
    'bg-sonic text-navy-deep shadow-[0_10px_26px_-12px_rgba(38,171,226,0.8)] hover:bg-sonic-bright',
  outline:
    'border border-brand/35 bg-white text-brand hover:border-brand hover:bg-brand/[0.06]',
  ghost:
    'border border-white/25 bg-white/[0.06] text-white hover:border-white/50 hover:bg-white/12',
};

/**
 * Every telephone call-to-action on the site renders through this component,
 * which guarantees the tel: href and the data-call-cta tracking attribute stay
 * in sync with lib/content.ts.
 */
export default function CallButton({
  label,
  variant = 'primary',
  className = '',
  srSuffix,
  fullWidth = false,
}: CallButtonProps) {
  return (
    <a
      href={SITE.phoneHref}
      data-call-cta
      className={`${BASE} ${VARIANTS[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <PhoneIcon />
      <span>{label}</span>
      {srSuffix ? <span className="sr-only">{` — ${srSuffix}`}</span> : null}
    </a>
  );
}

export function PhoneIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
