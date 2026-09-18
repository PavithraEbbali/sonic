'use client';

import { useId, useState, type FormEvent } from 'react';
import { SITE } from '@/lib/content';
import { PhoneIcon } from './CallButton';

/**
 * Compact ZIP availability field for the hero. The label sits on the dark hero
 * stage and only the field itself is a white pill, which keeps the control slim.
 *
 * Frontend only — no network call and no availability claim is made. A valid ZIP
 * reveals the next step, because fiber serviceability is confirmed at the street
 * address rather than the ZIP.
 *
 * Note: the hero's call-to-action lives in the featured plan plate, so this
 * component intentionally carries no persistent call button.
 */
export default function ZipChecker() {
  const inputId = useId();
  const [zip, setZip] = useState('');
  const [checked, setChecked] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = zip.trim();

    if (!/^\d{5}$/.test(value)) {
      setError('Enter a 5-digit ZIP code.');
      setChecked(null);
      return;
    }

    setError(null);
    setChecked(value);
  }

  return (
    <div className="max-w-xl">
      <label
        htmlFor={inputId}
        className="block text-[0.75rem] sm:text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white/60"
      >
        Check availability at your address
      </label>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-3 flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.75)] ring-1 ring-black/5 sm:flex-row sm:items-center"
      >
        <input
          id={inputId}
          name="zip"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          placeholder="Enter your ZIP code"
          value={zip}
          onChange={(event) => {
            setZip(event.target.value.replace(/\D/g, '').slice(0, 5));
            if (error) setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="min-w-0 flex-1 rounded-xl bg-transparent px-3.5 py-3.5 text-[1rem] sm:py-2.5 sm:text-[0.9375rem] font-medium text-graphite-deep outline-none placeholder:font-normal placeholder:text-graphite/55"
        />

        <button
          type="submit"
          className="shrink-0 rounded-xl bg-indigo px-5 py-3.5 sm:py-2.5 text-[0.8125rem] sm:text-[0.75rem] font-bold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-indigo-hover"
        >
          Check availability
        </button>
      </form>

      {error ? (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-2.5 text-[0.8125rem] font-medium text-white/80"
        >
          {error}
        </p>
      ) : null}

      {/* Keeps a call path in the hero without a second large button. */}
      <p className="mt-3 text-[0.8125rem] text-white/60">
        Free to check &middot; No obligation &middot; Or call{' '}
        <a
          href={SITE.phoneHref}
          data-call-cta
          className="inline-block py-1.5 font-semibold whitespace-nowrap text-white underline-offset-4 transition-colors hover:text-sonic-bright hover:underline"
        >
          {SITE.phoneDisplay}
        </a>
      </p>

      {checked ? (
        <div
          role="status"
          className="mt-3 rounded-xl border border-white/12 border-l-[3px] border-l-sonic bg-white/[0.07] px-4 py-3.5 backdrop-blur-sm"
        >
          <p className="text-[0.875rem] font-bold text-white">
            Let&rsquo;s confirm what&rsquo;s available at {checked}.
          </p>
          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-white/70">
            Fiber is built street by street, so your exact address determines which
            plans you can order.
          </p>
          <a
            href={SITE.phoneHref}
            data-call-cta
            className="mt-2.5 inline-flex items-center gap-2 text-[0.875rem] font-bold text-sonic-bright transition-colors hover:text-sonic"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            <span>{SITE.phoneDisplay}</span>
          </a>
        </div>
      ) : null}
    </div>
  );
}
