import Link from 'next/link';
import { FOOTER_HOURS, FOOTER_LEARN, FOOTER_SHOP, SITE } from '@/lib/content';
import { LEGAL_PAGES } from '@/lib/legal';
import SonicWordmark from './SonicWordmark';
import { PhoneIcon } from './CallButton';

/**
 * Footer: four columns (Shop · Learn · Order by phone · retailer lockup), then
 * the policy index, the full fine-print disclosure, and a bottom bar carrying
 * the copyright.
 *
 * The policy links are generated from LEGAL_PAGES, so adding a document to
 * lib/legal.ts lists it here automatically.
 */
export default function Footer() {
  return (
    <footer className="bg-navy-deep">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* ---------- Shop ---------- */}
          <nav aria-labelledby="footer-shop">
            <h2
              id="footer-shop"
              className="text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-white sm:text-[0.75rem]"
            >
              Shop
            </h2>
            <ul className="mt-5 space-y-3">
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

          {/* ---------- Learn ---------- */}
          <nav aria-labelledby="footer-learn">
            <h2
              id="footer-learn"
              className="text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-white sm:text-[0.75rem]"
            >
              Learn
            </h2>
            <ul className="mt-5 space-y-3">
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

          {/* ---------- Order by phone ---------- */}
          <div>
            <h2 className="text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-white sm:text-[0.75rem]">
              Order by phone
            </h2>
            <a
              href={SITE.phoneHref}
              data-call-cta
              className="mt-5 inline-flex items-center gap-2 text-[1.125rem] font-bold tracking-[-0.01em] text-white transition-colors duration-200 hover:text-sonic-bright"
            >
              <PhoneIcon className="h-4 w-4 text-sonic-bright" />
              {SITE.phoneDisplay}
            </a>
            <ul className="mt-4 space-y-1.5">
              {FOOTER_HOURS.map((line) => (
                <li key={line} className="text-[0.875rem] text-white/60">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Retailer lockup ---------- */}
          <div>
            <SonicWordmark tone="dark" />
            <p className="mt-5 max-w-xs text-[0.875rem] leading-relaxed text-white/60">
              An independent authorized retailer of Sonic fiber internet and home phone
              service, handling plan selection and new order placement.
            </p>
          </div>
        </div>

        {/* ---------- Policies ---------- */}
        <nav aria-labelledby="footer-legal" className="mt-12 border-t border-white/10 pt-8">
          <h2
            id="footer-legal"
            className="text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-white sm:text-[0.75rem]"
          >
            Policies
          </h2>
          <ul className="mt-5 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-4">
            {LEGAL_PAGES.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/${page.slug}`}
                  className="inline-block py-1.5 text-[0.875rem] text-white/60 transition-colors duration-200 hover:text-sonic-bright"
                >
                  {page.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---------- Fine print ---------- */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="space-y-3.5 text-[0.8125rem] leading-relaxed text-white/45 sm:text-[0.75rem]">
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
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="mt-8 border-t border-white/10 pt-7">
          <p className="text-[0.8125rem] text-white/50">
            &copy; {SITE.disclosure}
          </p>
        </div>
      </div>
    </footer>
  );
}
