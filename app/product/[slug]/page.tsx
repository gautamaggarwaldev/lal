import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug } from '@/lib/getProducts';
import { getCategoryBySlug } from '@/lib/getCategories';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetails from '@/components/product/ProductDetails';
import RelatedProducts from '@/components/product/RelatedProducts';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: `${product.description.slice(0, 155)}...`,
    openGraph: {
      title: `${product.name} | Lush & Leaves`,
      description: product.description.slice(0, 155),
      images: [
        {
          url: `${product.images[0]}&w=1200&h=630`,
          width: 1200,
          height: 630,
          alt: `${product.name} — Lush & Leaves`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Lush & Leaves`,
      description: product.description.slice(0, 155),
      images: [`${product.images[0]}&w=1200&h=630`],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.category);
  const categoryName = category?.name || product.category;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Lush & Leaves',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Lush & Leaves',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: categoryName, href: `/category/${product.category}` },
                { label: product.name },
              ]}
            />
          </div>

          {/* Product layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ProductGallery images={product.images} productName={product.name} />
            <ProductDetails product={product} />
          </div>

          {/* Related products */}
          <RelatedProducts product={product} />
        </div>
      </div>

      {/* Floating WhatsApp button — product specific */}
      <WhatsAppButton
        productName={product.name}
        price={product.price}
        imageUrl={product.images[0]}
        productPageUrl={`https://lushandleaves.com/product/${product.slug}`}
        category={categoryName}
      />
    </>
  );
}
