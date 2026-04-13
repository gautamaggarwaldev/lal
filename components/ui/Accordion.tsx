'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-border-linen border-t border-b border-border-linen">
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between py-4 text-left font-body font-medium text-text-primary hover:text-brand-gold transition-colors duration-200 cursor-pointer"
            aria-expanded={openIndex === index}
          >
            <span>{item.title}</span>
            <ChevronDown
              size={20}
              className={`text-warm-gray transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
            }`}
          >
            <p className="text-warm-gray font-body leading-relaxed text-sm">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
