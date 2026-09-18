interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
}

/**
 * Shared section header: a cyan rule beside an uppercase eyebrow, then the
 * heading and optional supporting line. Used by every content section so
 * vertical rhythm and typographic scale stay identical throughout the page.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
}: SectionHeadingProps) {
  const eyebrowColor = tone === 'dark' ? 'text-sonic-bright' : 'text-brand';
  const titleColor = tone === 'dark' ? 'text-white' : 'text-graphite-deep';
  const bodyColor = tone === 'dark' ? 'text-white/85' : 'text-graphite';

  return (
    <div
      className={
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'
      }
    >
      <p
        className={`flex items-center gap-3 text-[0.75rem] sm:text-[0.6875rem] font-bold uppercase tracking-[0.18em] ${eyebrowColor} ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span aria-hidden="true" className="h-[2px] w-7 rounded-full bg-sonic" />
        {eyebrow}
      </p>

      <h2
        className={`mt-4 text-[1.875rem] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[2.25rem] ${titleColor}`}
      >
        {title}
      </h2>

      {description ? (
        <p className={`mt-4 text-[1.0625rem] leading-relaxed ${bodyColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
