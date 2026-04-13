'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface CategoryHeroProps {
  name: string;
  description: string;
  image: string;
  slug: string;
}

export default function CategoryHero({ name, description, image, slug }: CategoryHeroProps) {
  return (
    <section className="relative h-[350px] sm:h-[400px] flex items-center overflow-hidden">
      <Image
        src={image}
        alt={`${name} collection — Lush and Leaves premium artificial decor`}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/' },
                { label: name },
              ]}
            />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide mb-3">
            {name}
          </h1>
          <p className="font-body text-white/80 max-w-lg leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
