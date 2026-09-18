import Link from 'next/link';
import {
  FOOTER_BLURB,
  FOOTER_HOURS,
  FOOTER_LEARN,
  FOOTER_SHOP,
  SITE,
} from '@/lib/content';
import { LEGAL, LEGAL_PAGES } from '@/lib/legal';
import SonicWordmark from './SonicWordmark';
import { PhoneIcon } from './CallButton';

/**
 * Footer laid out to match bestfiberinternet.us, measured from its rendered
 * DOM rather than eyeballed:
 *
 *   row 1  brand + blurb | Shop | Learn | Talk to a human
 *   row 2  "Offer details & required disclosures" heading + the fine print
 *   row 3  policy links in a horizontal bar, then the copyright
 *
 * Column headings there are ~12.8px, weight 800, uppercase, 0.12em tracking —
 * reproduced here, with this site's mobile type floor applied.
 *
 * Policy links are generated from LEGAL_PAGES, so adding a document lists it.
 */
const COLUMN_HEADING =
  'text-[0.8125rem] font-extrabold uppercase tracking-[0.12em] text-white';

export default function Footer() {
  return (
    <footer className="bg-navy-deep">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
        {/* ---------------------------- Row 1 ---------------------------- */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr] lg:gap-10">
          <div>
            <SonicWordmark tone="dark" />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-white/60">
              {FOOTER_BLURB}
            </p>
          </div>

          <nav aria-labelledby="footer-shop">
            <h2 id="footer-shop" className={COLUMN_HEADING}>
              Shop
            </h2>
            <ul className="mt-5 space-y-2">
              {FOOTER_SHOP.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-[0.9375rem] text-white/60 transition-colors duration-200 hover:text-sonic-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-learn">
            <h2 id="footer-learn" className={COLUMN_HEADING}>
              Learn
            </h2>
            <ul className="mt-5 space-y-2">
              {FOOTER_LEARN.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-[0.9375rem] text-white/60 transition-colors duration-200 hover:text-sonic-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={COLUMN_HEADING}>Talk to a human</h2>
            <a
              href={SITE.phoneHref}
              data-call-cta
              className="mt-5 inline-flex items-center gap-2.5 text-[1.375rem] font-bold tracking-[-0.02em] text-white transition-colors duration-200 hover:text-sonic-bright"
            >
              <PhoneIcon className="h-5 w-5 shrink-0 text-sonic-bright" />
              {SITE.phoneDisplay}
            </a>
            <p className="mt-4 text-[0.875rem] leading-relaxed text-white/60">
              {FOOTER_HOURS.join(' · ')}
            </p>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-white/60">
              {LEGAL.address}
            </p>
          </div>
        </div>

        {/* ---------------------------- Row 2 ---------------------------- */}
        <section
          aria-labelledby="footer-disclosures"
          className="mt-12 border-t border-white/10 pt-9"
        >
          <h2
            id="footer-disclosures"
            className="text-[0.8125rem] font-extrabold uppercase tracking-[0.12em] text-white/80"
          >
            Offer details &amp; required disclosures
          </h2>

          <div className="mt-5 space-y-3.5 text-[0.8125rem] leading-relaxed text-white/45 sm:text-[0.75rem]">
            <p>
              {SITE.disclosure} Sonic and the Sonic logo are trademarks of their
              respective owner. All other trademarks are the property of their respective
              owners.
            </p>
            <p>
              Pricing, speeds, promotional offers and plan inclusions shown on this site
              reflect Sonic residential offers and are subject to change. Advertised rates
              are introductory and apply to the first 12 months of service; standard
              monthly rates apply thereafter. Taxes and government fees are additional and
              vary by location.
            </p>
            <p>
              Speeds shown are maximums. Actual throughput varies with in-home wiring,
              device and router capability, wireless conditions and other network factors;
              reaching multi-gigabit speeds requires equipment rated for those speeds and
              a wired connection. Symmetrical speeds and unlimited data are included as
              listed on each plan.
            </p>
            <p>
              Service availability is determined by service address and is not guaranteed
              by ZIP code. Free professional installation applies to qualifying orders.
              Home phone service requires Sonic Fusion fiber service. Router rental is
              optional and is not required to take service.
            </p>
          </div>
        </section>

        {/* ---------------------------- Row 3 ---------------------------- */}
        <div className="mt-10 border-t border-white/10 pt-7">
          <nav aria-label="Policies">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-1">
              {LEGAL_PAGES.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="inline-block py-1.5 text-[0.8125rem] text-white/60 transition-colors duration-200 hover:text-sonic-bright"
                  >
                    {page.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-5 flex flex-col gap-2 text-[0.8125rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {SITE.disclosure}</p>
            <p>{LEGAL.email}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
