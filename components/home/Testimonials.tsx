'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Absolutely stunning quality! My guests always think these are real flowers. The peony arrangement is a showstopper in our living room. Worth every rupee.',
  },
  {
    name: 'Ananya Reddy',
    location: 'Hyderabad',
    rating: 5,
    text: 'I\'ve been searching for premium artificial plants for years. Lush & Leaves is in a league of its own — the monstera looks incredibly real and the ceramic pot is gorgeous.',
  },
  {
    name: 'Kavita Mehta',
    location: 'Delhi',
    rating: 5,
    text: 'Ordered the rose gold candelabra centerpiece for my daughter\'s engagement party. It was the talk of the evening! Beautiful craftsmanship and quick delivery.',
  },
  {
    name: 'Ritu Agarwal',
    location: 'Bangalore',
    rating: 4,
    text: 'The eucalyptus garland draped on our mantel has transformed the entire room. Such a simple addition with such a dramatic effect. Love this brand!',
  },
  {
    name: 'Sneha Patel',
    location: 'Ahmedabad',
    rating: 5,
    text: 'As an interior designer, I recommend Lush & Leaves to all my high-end clients. The quality is consistently excellent and the product range is impressive.',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-20 bg-linen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-body text-sm tracking-[0.25em] uppercase text-brand-gold mb-3 block">
            What Our Clients Say
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl tracking-wide text-text-primary">
            Testimonials
          </h2>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center px-8 sm:px-16"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={20} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-body text-lg sm:text-xl text-text-primary leading-relaxed mb-6 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </blockquote>

              {/* Author */}
              <div>
                <p className="font-heading text-lg text-text-primary tracking-wide">
                  {testimonials[current].name}
                </p>
                <p className="font-body text-sm text-warm-gray">
                  {testimonials[current].location}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-border-linen text-warm-gray hover:border-brand-gold hover:text-brand-gold transition-all duration-200 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-border-linen text-warm-gray hover:border-brand-gold hover:text-brand-gold transition-all duration-200 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === current ? 'bg-brand-gold w-8' : 'bg-border-linen'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
