import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LegalDocument from '@/components/LegalDocument';
import { LEGAL_PAGES, legalPageBySlug } from '@/lib/legal';

/**
 * One static route per policy, generated from LEGAL_PAGES. The route group
 * `(policies)` keeps the URLs at the root — /privacy-policy, /disclaimer and so
 * on — without a /legal prefix.
 *
 * `dynamicParams = false` means any slug not in LEGAL_PAGES 404s rather than
 * being rendered on demand, so this root-level dynamic segment cannot swallow
 * genuinely missing URLs.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPageBySlug(slug);
  if (!page) return {};

  return {
    title: `${page.title} | Sonic Authorized Retailer`,
    description: page.description,
  };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = legalPageBySlug(slug);
  if (!page) notFound();

  return (
    <>
      <Header />
      <main id="main">
        <LegalDocument page={page} />
      </main>
      <Footer />
    </>
  );
}
