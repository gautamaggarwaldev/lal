'use client';

import { motion } from 'framer-motion';
import { Product, getRelatedProducts } from '@/lib/getProducts';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
  product: Product;
}

export default function RelatedProducts({ product }: RelatedProductsProps) {
  const related = getRelatedProducts(product, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-16">
      <hr className="gold-divider mb-16" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="font-heading text-3xl sm:text-4xl tracking-wide text-text-primary">
          You May Also Like
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((p, index) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
