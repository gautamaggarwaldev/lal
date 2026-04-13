'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] max-h-[900px] flex items-center grain-overlay overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1920&q=85&auto=format&fit=crop"
        alt="Elegant artificial flower arrangement in a luxury home interior — Lush and Leaves"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-[2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="inline-block font-body text-sm tracking-[0.25em] uppercase text-brand-gold mb-4">
              Premium Artificial Decor
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide leading-tight mb-6"
          >
            Where Nature Meets{' '}
            <span className="text-brand-gold italic">Timeless Elegance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="font-body text-lg text-white/80 leading-relaxed mb-8 max-w-lg"
          >
            Discover handcrafted artificial flowers, plants, and decor that bring everlasting beauty 
            to your home — no watering, no wilting, just pure elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/category/artificial-flowers">
              <Button variant="primary" size="lg">
                Explore Collection
              </Button>
            </Link>
            <Link href="/category/table-centerpieces">
              <Button
                variant="ghost"
                size="lg"
                className="!text-white !border !border-white/40 hover:!bg-white/10"
              >
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
