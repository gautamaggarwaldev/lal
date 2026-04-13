'use client';

import { motion } from 'framer-motion';
import { Leaf, Shield, Clock, Gem } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'No Maintenance',
    description: 'No watering, no sunlight, no pruning. Our pieces stay perfect forever with zero effort.',
  },
  {
    icon: Shield,
    title: 'Allergy Free',
    description: 'Enjoy the beauty of botanicals without any pollen, allergens, or seasonal irritants.',
  },
  {
    icon: Clock,
    title: 'Lasts Forever',
    description: 'Crafted with UV-resistant, fade-proof materials that maintain their beauty for years.',
  },
  {
    icon: Gem,
    title: 'Premium Craftsmanship',
    description: 'Each piece is hand-finished by artisans using the finest silk, latex, and real-touch materials.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-linen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-body text-sm tracking-[0.25em] uppercase text-brand-gold mb-3 block">
            The Lush & Leaves Difference
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl tracking-wide text-text-primary">
            Why Choose Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-cream border border-border-linen group-hover:border-brand-gold group-hover:bg-brand-gold/10 transition-all duration-300">
                <feature.icon size={28} className="text-brand-green group-hover:text-brand-gold transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-xl tracking-wide text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-warm-gray leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
