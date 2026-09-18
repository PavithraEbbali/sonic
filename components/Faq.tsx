import { CTA, FAQS } from '@/lib/content';
import CallButton from './CallButton';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

/**
 * FAQ accordion built on native <details>/<summary>: keyboard accessible and
 * fully functional without JavaScript, with a rotating chevron for affordance.
 */
export default function Faq() {
  return (
    <section
      id="faq"
      className="border-t border-mist-line bg-mist px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            align="center"
          />
        </Reveal>

        <div className="mt-11 space-y-3">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.id} delay={Math.min(index, 5) * 55}>
              <details className="group overflow-hidden rounded-[14px] bg-white ring-1 ring-mist-line transition-shadow duration-200 open:shadow-[0_16px_38px_-30px_rgba(30,39,64,0.6)] open:ring-brand/35 hover:ring-brand/35">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4.5 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1rem] font-bold leading-snug tracking-[-0.015em] text-graphite-deep">
                    {faq.question}
                  </h3>
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/[0.08] text-brand transition-[background-color,transform] duration-300 group-open:rotate-180 group-open:bg-brand group-open:text-white">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m5 8 5 5 5-5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <p className="border-t border-mist-line pt-4 text-[0.9375rem] leading-relaxed text-graphite">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-col items-start gap-5 rounded-[18px] bg-white p-6 ring-1 ring-mist-line sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <p className="min-w-0 text-[0.9375rem] leading-relaxed text-graphite">
              Still deciding? We will review the options serviceable at your address and
              place the order on the same call.
            </p>
            <CallButton label={CTA.order} className="shrink-0" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
