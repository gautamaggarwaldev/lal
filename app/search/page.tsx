import { Metadata } from 'next';
import { searchProducts } from '@/lib/getProducts';
import ProductGrid from '@/components/product/ProductGrid';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: "${q}"` : 'Search',
    description: `Search results for "${q || ''}" at Lush & Leaves. Browse premium artificial flowers, plants, and decor.`,
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';
  const results = searchProducts(query);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Search Results' }]} />
        </div>

        <div className="mb-10">
          <h1 className="font-heading text-4xl tracking-wide text-text-primary mb-2">
            {query ? (
              <>
                Results for &ldquo;<span className="text-brand-gold">{query}</span>&rdquo;
              </>
            ) : (
              'Search'
            )}
          </h1>
          {query && (
            <p className="font-body text-warm-gray">
              {results.length} product{results.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="text-center py-20">
            <Search size={48} className="text-border-linen mx-auto mb-4" />
            <h2 className="font-heading text-2xl tracking-wide text-text-primary mb-2">
              {query ? 'No products found' : 'Start searching'}
            </h2>
            <p className="font-body text-warm-gray mb-6 max-w-md mx-auto">
              {query
                ? `We couldn't find any products matching "${query}". Try a different search term or browse our categories.`
                : 'Use the search bar above to find your perfect artificial flowers, plants, and decor.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/category/artificial-flowers"
                className="px-4 py-2 border border-border-linen rounded-sm font-body text-sm text-warm-gray hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                Artificial Flowers
              </Link>
              <Link
                href="/category/artificial-plants-greens"
                className="px-4 py-2 border border-border-linen rounded-sm font-body text-sm text-warm-gray hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                Plants & Greens
              </Link>
              <Link
                href="/category/vases-planters"
                className="px-4 py-2 border border-border-linen rounded-sm font-body text-sm text-warm-gray hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                Vases & Planters
              </Link>
              <Link
                href="/category/table-centerpieces"
                className="px-4 py-2 border border-border-linen rounded-sm font-body text-sm text-warm-gray hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                Table Centerpieces
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
