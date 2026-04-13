'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/getProducts';
import ProductCard from '@/components/product/ProductCard';

export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const products = getFeaturedProducts();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="font-body text-sm tracking-[0.25em] uppercase text-brand-gold mb-3 block">
              Customer Favourites
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl tracking-wide text-text-primary">
              Bestsellers
            </h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border-linen text-warm-gray hover:border-brand-gold hover:text-brand-gold transition-all duration-200 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border-linen text-warm-gray hover:border-brand-gold hover:text-brand-gold transition-all duration-200 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex-shrink-0 w-[280px] snap-start"
            >
              <ProductCard product={product} priority={index < 3} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
