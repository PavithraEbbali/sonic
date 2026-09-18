import Faq from '@/components/Faq';
import FinePrintGrid from '@/components/FinePrintGrid';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ServiceSections from '@/components/ServiceSections';
import WhyUs from '@/components/WhyUs';

/**
 * Single-page composition, in canonical order:
 *   Top chrome (disclosure bar + sticky header)
 *   Hero (ZIP checker + call button + price anchor)
 *   Service lines, ordered fiber -> cable -> bundle -> tv -> mobile -> phone
 *     (lines Sonic does not offer natively are omitted automatically)
 *   Fine-print grid
 *   How it works / Why Sonic
 *   FAQ
 *   Footer
 */
export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ServiceSections />
        <FinePrintGrid />
        <WhyUs />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
