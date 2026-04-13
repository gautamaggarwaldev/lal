'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAllCategories } from '@/lib/getCategories';

export default function FeaturedCategories() {
  const categories = getAllCategories();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="font-body text-sm tracking-[0.25em] uppercase text-brand-gold mb-3 block">
          Curated Collections
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl tracking-wide text-text-primary">
          Shop by Category
        </h2>
      </motion.div>

      {/* Masonry-style grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category, index) => {
          // Asymmetric heights for masonry feel
          const isLarge = index === 0 || index === 3;
          return (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={isLarge ? 'md:row-span-2' : ''}
            >
              <Link
                href={`/category/${category.slug}`}
                className="group block relative overflow-hidden rounded-sm"
                style={{ height: isLarge ? '100%' : undefined }}
              >
                <div className={`relative overflow-hidden ${isLarge ? 'h-full min-h-[400px]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={category.image}
                    alt={`${category.name} — Browse our curated collection at Lush and Leaves`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/70" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-heading text-2xl text-white tracking-wide mb-1">
                      {category.name}
                    </h3>
                    <p className="font-body text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
