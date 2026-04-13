'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Leaf } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 bg-linen relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-brand-gold/10">
        <Leaf size={120} />
      </div>
      <div className="absolute bottom-10 right-10 text-brand-gold/10 rotate-180">
        <Leaf size={100} />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-body text-sm tracking-[0.25em] uppercase text-brand-gold mb-3 block">
            Stay Connected
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl tracking-wide text-text-primary mb-4">
            Join Our Newsletter
          </h2>
          <p className="font-body text-warm-gray leading-relaxed mb-8">
            Be the first to discover new collections, exclusive offers, and decorating inspiration 
            delivered straight to your inbox.
          </p>

          <hr className="gold-divider max-w-[60px] mx-auto mb-8" />

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 bg-white border border-border-linen rounded-sm font-body text-sm focus:outline-none focus:border-brand-gold transition-colors duration-200 placeholder:text-warm-gray/60"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-green text-white border border-brand-gold/40 rounded-sm font-body text-sm font-medium hover:bg-brand-gold hover:text-text-primary transition-all duration-300 cursor-pointer"
            >
              <Send size={16} />
              Subscribe
            </button>
          </form>

          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-body text-sm text-brand-green mt-4"
            >
              Thank you for subscribing! 🌿
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
