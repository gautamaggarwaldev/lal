'use client';

import { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  onSortChange?: (sort: string) => void;
  productCount: number;
}

export default function FilterBar({ onSortChange, productCount }: FilterBarProps) {
  const [sort, setSort] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const handleSortChange = (value: string) => {
    setSort(value);
    onSortChange?.(value);
  };

  return (
    <div className="py-6">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <p className="font-body text-sm text-warm-gray">
          Showing <span className="font-semibold text-text-primary">{productCount}</span> products
        </p>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="font-body text-sm text-warm-gray">Sort by:</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 bg-white border border-border-linen rounded-sm font-body text-sm text-text-primary focus:outline-none focus:border-brand-gold cursor-pointer"
              >
                <option value="popular">Popular</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none" />
            </div>
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-border-linen rounded-sm font-body text-sm text-text-primary hover:border-brand-gold transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>
      </div>

      {/* Filter panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-sm border border-border-linen">
          {/* Price Range */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-wider text-warm-gray mb-3">Price Range</h4>
            <div className="space-y-2">
              {['Under ₹1,000', '₹1,000 - ₹2,500', '₹2,500 - ₹5,000', 'Above ₹5,000'].map((range) => (
                <label key={range} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border-linen text-brand-gold focus:ring-brand-gold" />
                  <span className="font-body text-sm text-text-secondary">{range}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-wider text-warm-gray mb-3">Color</h4>
            <div className="space-y-2">
              {['White', 'Pink', 'Green', 'Gold', 'Multi'].map((color) => (
                <label key={color} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border-linen text-brand-gold focus:ring-brand-gold" />
                  <span className="font-body text-sm text-text-secondary">{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-wider text-warm-gray mb-3">Size</h4>
            <div className="space-y-2">
              {['Small (< 30cm)', 'Medium (30-60cm)', 'Large (60-100cm)', 'XL (> 100cm)'].map((size) => (
                <label key={size} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border-linen text-brand-gold focus:ring-brand-gold" />
                  <span className="font-body text-sm text-text-secondary">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Material */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-wider text-warm-gray mb-3">Material</h4>
            <div className="space-y-2">
              {['Silk', 'Real-touch Latex', 'PE Plastic', 'Ceramic', 'Metal'].map((mat) => (
                <label key={mat} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border-linen text-brand-gold focus:ring-brand-gold" />
                  <span className="font-body text-sm text-text-secondary">{mat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
