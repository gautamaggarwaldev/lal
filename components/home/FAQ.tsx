'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqItems = [
  {
    question: 'Are your artificial flowers realistic?',
    answer: 'Absolutely! Our premium artificial flowers are crafted using real-touch latex, high-quality silk, and PE plastics with natural-looking textures, veining, and colour gradients. Many of our customers tell us their guests can\'t tell the difference from real flowers.',
  },
  {
    question: 'How do I care for and clean artificial flowers?',
    answer: 'Gently dust with a soft cloth or feather duster every 2-3 weeks. For deeper cleaning, lightly wipe with a damp cloth and mild soap. Avoid prolonged direct sunlight to maintain vibrant colours. Store in a cool, dry place when not on display.',
  },
  {
    question: 'Do you offer free shipping?',
    answer: 'Yes! We offer free standard shipping on all orders above ₹2,000 across India. Standard delivery takes 5-7 business days. Express delivery (2-3 business days) is available at ₹199 for orders that need to arrive sooner.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 15-day hassle-free return policy. Products must be in their original packaging and unused condition. Simply contact us via WhatsApp or email to initiate a return. Your refund will be processed within 5-7 business days of receiving the returned item.',
  },
  {
    question: 'Can I use artificial plants outdoors?',
    answer: 'Many of our products feature UV-resistant coatings and materials, making them suitable for covered outdoor areas like balconies, patios, and porches. Check the product description for "UV-resistant" or "outdoor suitable" mentions. We recommend avoiding prolonged exposure to rain and direct harsh sunlight.',
  },
  {
    question: 'Do the vases come included with flower arrangements?',
    answer: 'It varies by product. Some arrangements include a vase or planter as noted in the product description. For standalone flower stems, we offer a beautiful selection of vases and planters in our "Vases & Planters" category that pair perfectly with our blooms.',
  },
  {
    question: 'How do I choose the right size arrangement for my space?',
    answer: 'Each product page includes detailed dimensions. As a general guide: Small (S) arrangements work well for desks and side tables, Medium (M) for dining tables and shelves, Large (L) for console tables and mantels, and Extra Large (XL) for floor displays and entryways. Our Décor Advisor can also help with personalized recommendations!',
  },
  {
    question: 'Do you offer bulk or event orders?',
    answer: 'Yes! We love working on weddings, corporate events, and bulk orders. Our Wedding Rose Arch Kit and festival garlands are especially popular. Contact us via WhatsApp for custom quotes, volume discounts, and personalized arrangements tailored to your event theme.',
  },
  {
    question: 'Are your products safe for allergy sufferers?',
    answer: 'Absolutely! One of the biggest advantages of artificial flowers is that they\'re completely hypoallergenic. No pollen, no fragrance, no allergens — making them perfect for homes, offices, and hospitals where sensitivities are a concern.',
  },
  {
    question: 'Can I customise the colour of a product?',
    answer: 'Yes! Most of our products are available in multiple colour options. Simply select your preferred colour on the product page to see it reflected in real-time pricing. If you need a specific custom colour not listed, reach out to us via WhatsApp and we\'ll do our best to accommodate your request.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-body text-sm tracking-[0.25em] uppercase text-brand-gold mb-3 block">
            Have Questions?
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl tracking-wide text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-warm-gray max-w-xl mx-auto">
            Everything you need to know about our premium artificial flowers, plants, and decor.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="divide-y divide-border-linen border-t border-b border-border-linen"
        >
          {faqItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-start justify-between py-5 sm:py-6 text-left group cursor-pointer"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-start gap-3 sm:gap-4 pr-4">
                  <HelpCircle
                    size={20}
                    className={`flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                      openIndex === index ? 'text-brand-gold' : 'text-brand-bronze/40'
                    }`}
                  />
                  <span className={`font-body font-medium text-sm sm:text-base transition-colors duration-200 ${
                    openIndex === index ? 'text-brand-gold' : 'text-text-primary group-hover:text-brand-gold'
                  }`}>
                    {item.question}
                  </span>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-warm-gray flex-shrink-0 mt-0.5 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-brand-gold' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  openIndex === index ? 'max-h-96 pb-5 sm:pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-warm-gray font-body leading-relaxed text-sm pl-8 sm:pl-10 pr-4">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="font-body text-warm-gray text-sm">
            Still have questions?{' '}
            <a
              href="https://wa.me/8130078740?text=Hi!%20I%20have%20a%20question%20about%20Lush%20%26%20Leaves."
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:text-brand-bronze underline underline-offset-2 transition-colors"
            >
              Chat with us on WhatsApp
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
