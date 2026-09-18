interface WordmarkProps {
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Wordmark lockup echoing Sonic's own: the name set in heavy uppercase with a
 * cyan period, and the retailer qualifier beneath in small neutral caps.
 */
export default function SonicWordmark({ tone = 'light', className = '' }: WordmarkProps) {
  const word = tone === 'dark' ? 'text-white' : 'text-graphite-deep';
  const qualifier = tone === 'dark' ? 'text-white/55' : 'text-graphite';

  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className={`text-[1.375rem] font-extrabold uppercase leading-none tracking-[-0.02em] ${word}`}
      >
        Sonic<span className="text-sonic">.</span>
      </span>
      <span
        className={`mt-[5px] text-[0.625rem] sm:text-[0.5625rem] font-bold uppercase leading-none tracking-[0.2em] ${qualifier}`}
      >
        Authorized Retailer
      </span>
    </span>
  );
}
