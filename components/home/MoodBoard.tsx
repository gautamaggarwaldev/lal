'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';



const moodImages = [
  { src: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=80&auto=format&fit=crop', alt: 'Elegant white flower arrangement in luxury interior' },
  { src: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80&auto=format&fit=crop', alt: 'Lush green plants in modern home setting' },
  { src: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80&auto=format&fit=crop', alt: 'Beautiful floral decoration on dining table' },
  { src: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&q=80&auto=format&fit=crop', alt: 'Romantic rose arrangement in vintage setting' },
  { src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80&auto=format&fit=crop', alt: 'Botanical wall art in minimalist living room' },
  { src: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80&auto=format&fit=crop', alt: 'Luxury table centerpiece with candles and flowers' },
];

export default function MoodBoard() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-body text-sm tracking-[0.25em] uppercase text-brand-gold mb-3 block">
            @lushandleaves
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl tracking-wide text-text-primary">
            Get Inspired
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {moodImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-75 group-hover:scale-100"
                ><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
