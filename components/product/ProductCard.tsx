'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/getProducts';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const isOnSale = product.originalPrice !== null && product.originalPrice > product.price;

  const categoryLabel = product.category
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative">
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={`${product.name} — Premium artificial decor by Lush and Leaves`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
          />

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="category">{categoryLabel}</Badge>
          </div>

          {/* New / Sale badge */}
          {(product.isNew || isOnSale) && (
            <div className="absolute top-3 right-3 z-10">
              {product.isNew && <Badge variant="new">New</Badge>}
              {isOnSale && !product.isNew && <Badge variant="sale">Sale</Badge>}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-heading text-lg tracking-wide text-text-primary line-clamp-2 mb-1 group-hover:text-brand-gold transition-colors duration-300">
            {product.name}
          </h3>

          <div className="mb-2">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size={14} />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-body text-lg font-semibold text-brand-green">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {isOnSale && product.originalPrice && (
              <span className="font-body text-sm text-warm-gray line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
