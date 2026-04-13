import { Product } from '@/lib/getProducts';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  priority?: boolean;
}

export default function ProductGrid({ products, priority = false }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={priority && index < 3}
        />
      ))}
    </div>
  );
}
