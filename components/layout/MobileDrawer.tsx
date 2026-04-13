'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: { name: string; slug: string }[];
  onOpenAdvisor: () => void;
}

export default function MobileDrawer({ isOpen, onClose, categories, onOpenAdvisor }: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-cream z-[70] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-linen">
                <span className="font-heading text-xl tracking-wide text-text-primary">
                  Lush <span className="text-brand-gold">&</span> Leaves
                </span>
                <button
                  onClick={onClose}
                  className="p-2 text-text-primary hover:text-brand-gold transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center justify-between px-6 py-3.5 font-body text-base text-text-primary hover:bg-linen hover:text-brand-gold transition-all duration-200"
                >
                  Home
                  <ChevronRight size={16} className="text-warm-gray" />
                </Link>

                <div className="px-6 py-3">
                  <span className="font-body text-xs uppercase tracking-widest text-brand-gold font-semibold">
                    Shop by Category
                  </span>
                </div>

                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-6 py-3 font-body text-sm text-text-secondary hover:bg-linen hover:text-brand-gold transition-all duration-200"
                  >
                    {cat.name}
                    <ChevronRight size={14} className="text-warm-gray" />
                  </Link>
                ))}

                <hr className="gold-divider mx-6 my-3" />

                <Link
                  href="/about"
                  onClick={onClose}
                  className="flex items-center justify-between px-6 py-3.5 font-body text-base text-text-primary hover:bg-linen hover:text-brand-gold transition-all duration-200"
                >
                  About Us
                  <ChevronRight size={16} className="text-warm-gray" />
                </Link>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex items-center justify-between px-6 py-3.5 font-body text-base text-text-primary hover:bg-linen hover:text-brand-gold transition-all duration-200"
                >
                  Contact
                  <ChevronRight size={16} className="text-warm-gray" />
                </Link>

                <hr className="gold-divider mx-6 my-3" />

                <button
                  onClick={onOpenAdvisor}
                  className="flex items-center justify-between px-6 py-3.5 w-full font-body text-base text-text-primary hover:bg-linen hover:text-brand-gold transition-all duration-200 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={16} className="text-brand-gold" />
                    Décor Advisor
                  </span>
                  <ChevronRight size={16} className="text-warm-gray" />
                </button>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-border-linen bg-linen">
                <p className="font-body text-xs text-warm-gray text-center">
                  © 2024 Lush & Leaves. Premium Artificial Decor.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
