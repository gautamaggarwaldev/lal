import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllCategories, getCategoryBySlug } from '@/lib/getCategories';
import { getProductsByCategory, getPaginatedProducts } from '@/lib/getProducts';
import CategoryHero from '@/components/category/CategoryHero';
import FilterBar from '@/components/category/FilterBar';
import ProductGrid from '@/components/product/ProductGrid';
import Pagination from '@/components/category/Pagination';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: `Shop premium ${category.name.toLowerCase()} at Lush & Leaves. ${category.description}`,
    openGraph: {
      title: `${category.name} | Lush & Leaves`,
      description: category.description,
      images: [
        {
          url: `${category.image}&w=1200&h=630`,
          width: 1200,
          height: 630,
          alt: `${category.name} — Lush & Leaves`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | Lush & Leaves`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allProducts = getProductsByCategory(slug);
  const page = parseInt(pageParam || '1', 10);
  const { products, totalPages, currentPage } = getPaginatedProducts(allProducts, page, 12);

  return (
    <>
      <CategoryHero
        name={category.name}
        description={category.description}
        image={category.image}
        slug={category.slug}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FilterBar productCount={allProducts.length} />
        <ProductGrid products={products} priority={currentPage === 1} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/category/${slug}`}
        />
      </div>
    </>
  );
}
