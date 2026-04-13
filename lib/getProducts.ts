import productsData from '@/data/products.json';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  currency: string;
  images: string[];
  description: string;
  features: string[];
  dimensions: string;
  material: string;
  color: string;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
}

const products: Product[] = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.color.toLowerCase().includes(q)
  );
}

export function getPaginatedProducts(
  categoryProducts: Product[],
  page: number,
  perPage: number = 12
): { products: Product[]; totalPages: number; currentPage: number } {
  const totalPages = Math.ceil(categoryProducts.length / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * perPage;
  return {
    products: categoryProducts.slice(start, start + perPage),
    totalPages,
    currentPage,
  };
}

export function getRelatedProducts(product: Product, count: number = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}
