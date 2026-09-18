import { LEGAL, type LegalBlock, type LegalPage } from '@/lib/legal';
import { SITE } from '@/lib/content';
import Reveal from './Reveal';

/**
 * Renders one policy document. Measure-limited column, generous leading, and a
 * navy masthead so a policy page still reads as part of the site rather than a
 * bare text dump.
 *
 * `**bold**` inside a paragraph is the only markup supported — enough to stress
 * the one or two sentences in a policy that carry real weight.
 */
export default function LegalDocument({ page }: { page: LegalPage }) {
  return (
    <>
      <header className="relative overflow-hidden bg-navy-deep px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(120deg, #10132B 0%, #1B214A 58%, #262D5C 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(32rem 20rem at 88% 0%, rgba(38,171,226,0.20), transparent 68%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-3xl">
          <p className="flex items-center gap-3 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-sonic-bright sm:text-[0.6875rem]">
            <span aria-hidden="true" className="h-[2px] w-7 rounded-full bg-sonic" />
            Legal
          </p>
          <h1 className="mt-4 text-[2rem] font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-[2.375rem]">
            {page.title}
          </h1>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/80">
            {page.description}
          </p>
          <p className="mt-6 border-t border-white/12 pt-5 text-[0.8125rem] text-white/55">
            Effective {LEGAL.effectiveDate} · {SITE.disclosure}
          </p>
        </div>
      </header>

      <div className="bg-white px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <article className="mx-auto w-full max-w-3xl">
          {page.blocks.map((block, index) => (
            <Reveal key={block.heading} delay={Math.min(index, 4) * 50}>
              <section className={index === 0 ? '' : 'mt-11'}>
                <h2 className="text-[1.25rem] font-bold leading-snug tracking-[-0.02em] text-graphite-deep sm:text-[1.375rem]">
                  {block.heading}
                </h2>
                <BlockBody block={block} />
              </section>
            </Reveal>
          ))}
        </article>
      </div>
    </>
  );
}

function BlockBody({ block }: { block: LegalBlock }) {
  return (
    <>
      {block.paragraphs?.map((text) => (
        <p key={text} className="mt-4 text-[1rem] leading-[1.75] text-graphite">
          <RichText text={text} />
        </p>
      ))}

      {block.bullets ? (
        <ul className="mt-4 space-y-2.5">
          {block.bullets.map((text) => (
            <li key={text} className="flex gap-3 text-[1rem] leading-[1.7] text-graphite">
              <span
                aria-hidden="true"
                className="mt-[0.6em] h-[5px] w-[5px] shrink-0 rounded-full bg-sonic"
              />
              <span>
                <RichText text={text} />
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {block.footnote?.map((text) => (
        <p key={text} className="mt-4 text-[1rem] leading-[1.75] text-graphite">
          <RichText text={text} />
        </p>
      ))}
    </>
  );
}

/** Splits on `**…**` and renders those runs bold. No other markup is parsed. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-bold text-graphite-deep">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
