'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Product, getAllProducts } from '@/lib/getProducts';
import ProductCard from '@/components/product/ProductCard';

const categories = [
  { name: 'Artificial Flowers', slug: 'artificial-flowers' },
  { name: 'Artificial Plants & Greens', slug: 'artificial-plants-greens' },
  { name: 'Vases & Planters', slug: 'vases-planters' },
  { name: 'Wall Decor', slug: 'wall-decor' },
  { name: 'Table Centerpieces', slug: 'table-centerpieces' },
  { name: 'Festive & Seasonal Decor', slug: 'festive-seasonal-decor' },
];

const colorFilters = [
  { name: 'White / Ivory', hex: '#FFFFF0' },
  { name: 'Pink / Blush', hex: '#DE98AB' },
  { name: 'Green', hex: '#4A7C59' },
  { name: 'Gold', hex: '#B8860B' },
  { name: 'Black', hex: '#1C1C1C' },
  { name: 'Multi-color', hex: 'conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' },
];

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Newest First', value: 'newest' },
];

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

export default function ShopAllProducts() {
  const allProducts = getAllProducts();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCategory = useCallback((slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const toggleColor = useCallback((name: string) => {
    setSelectedColors((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  }, []);

  const clearAll = useCallback(() => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setSortBy('featured');
    setInStockOnly(false);
  }, []);

  const hasFilters = selectedCategories.length > 0 || selectedColors.length > 0 || priceRange[0] > MIN_PRICE || priceRange[1] < MAX_PRICE || inStockOnly;

  // Filter & sort products
  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) => {
        const pColor = p.color.toLowerCase();
        return selectedColors.some((c) => {
          const filterColor = c.toLowerCase();
          if (filterColor.includes('white') || filterColor.includes('ivory')) return pColor.includes('white') || pColor.includes('ivory') || pColor.includes('cream') || pColor.includes('snow');
          if (filterColor.includes('pink') || filterColor.includes('blush')) return pColor.includes('pink') || pColor.includes('blush') || pColor.includes('rose') || pColor.includes('dusty');
          if (filterColor.includes('green')) return pColor.includes('green') || pColor.includes('sage') || pColor.includes('olive');
          if (filterColor.includes('gold')) return pColor.includes('gold') || pColor.includes('brass') || pColor.includes('copper') || pColor.includes('bronze');
          if (filterColor.includes('black')) return pColor.includes('black') || pColor.includes('dark');
          if (filterColor.includes('multi')) return pColor.includes('mix') || pColor.includes('multi') || pColor.includes('mixed');
          return false;
        });
      });
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [allProducts, selectedCategories, selectedColors, priceRange, sortBy, inStockOnly]);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="font-body text-sm font-semibold text-text-primary mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="font-body text-[10px] uppercase tracking-wider text-warm-gray">Min</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])}
                min={MIN_PRICE}
                max={priceRange[1]}
                className="w-full px-3 py-2 border border-border-linen rounded-sm font-body text-sm text-text-primary focus:outline-none focus:border-brand-gold transition-colors bg-white"
              />
            </div>
            <span className="text-warm-gray mt-4">—</span>
            <div className="flex-1">
              <label className="font-body text-[10px] uppercase tracking-wider text-warm-gray">Max</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])}
                min={priceRange[0]}
                max={MAX_PRICE}
                className="w-full px-3 py-2 border border-border-linen rounded-sm font-body text-sm text-text-primary focus:outline-none focus:border-brand-gold transition-colors bg-white"
              />
            </div>
          </div>
          {/* Range slider */}
          <div className="relative h-2 bg-border-linen rounded-full">
            <div
              className="absolute h-full bg-brand-gold rounded-full"
              style={{
                left: `${((priceRange[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                right: `${100 - ((priceRange[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
              }}
            />
            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={100}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1] - 100), priceRange[1]])}
              className="absolute w-full h-full opacity-0 cursor-pointer"
              aria-label="Minimum price"
            />
            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={100}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 100)])}
              className="absolute w-full h-full opacity-0 cursor-pointer"
              aria-label="Maximum price"
            />
          </div>
          <div className="flex justify-between font-body text-[11px] text-warm-gray">
            <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
            <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <hr className="gold-divider" />

      {/* Categories */}
      <div>
        <h4 className="font-body text-sm font-semibold text-text-primary mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all duration-200 ${
                  selectedCategories.includes(cat.slug)
                    ? 'bg-brand-gold border-brand-gold'
                    : 'border-border-linen group-hover:border-brand-gold/50'
                }`}
              >
                {selectedCategories.includes(cat.slug) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="sr-only"
              />
              <span className="font-body text-sm text-warm-gray group-hover:text-text-primary transition-colors">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="gold-divider" />

      {/* Color Filter */}
      <div>
        <h4 className="font-body text-sm font-semibold text-text-primary mb-3">Color</h4>
        <div className="flex flex-wrap gap-3">
          {colorFilters.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
              aria-pressed={selectedColors.includes(color.name)}
              aria-label={`Filter by color: ${color.name}`}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  selectedColors.includes(color.name)
                    ? 'border-brand-gold scale-110 shadow-md'
                    : 'border-border-linen group-hover:border-brand-gold/50'
                }`}
                style={{
                  background: color.hex.includes('gradient') ? color.hex : color.hex,
                  backgroundColor: color.hex.includes('gradient') ? undefined : color.hex,
                }}
              />
              <span className={`font-body text-[9px] transition-colors ${selectedColors.includes(color.name) ? 'text-brand-gold font-medium' : 'text-warm-gray'}`}>
                {color.name.split(' / ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <hr className="gold-divider" />

      {/* In Stock Only */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <div
          className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
            inStockOnly ? 'bg-brand-gold' : 'bg-border-linen'
          }`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${
              inStockOnly ? 'left-[22px]' : 'left-0.5'
            }`}
          />
        </div>
        <span className="font-body text-sm text-warm-gray group-hover:text-text-primary transition-colors">In Stock Only</span>
      </label>

      {/* Clear All */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full py-2.5 border border-border-linen rounded-sm font-body text-sm text-warm-gray hover:border-red-300 hover:text-red-500 transition-all duration-200 cursor-pointer"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <section id="shop-all" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-body text-sm tracking-[0.25em] uppercase text-brand-gold mb-3 block">
            Browse Our Collection
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl tracking-wide text-text-primary">
            Shop All Products
          </h2>
        </motion.div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-linen">
          <div className="flex items-center gap-4">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border-linen rounded-sm font-body text-sm text-text-primary hover:border-brand-gold transition-colors cursor-pointer"
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasFilters && (
                <span className="w-5 h-5 rounded-full bg-brand-gold text-white text-[10px] flex items-center justify-center">
                  {selectedCategories.length + selectedColors.length + (priceRange[0] > MIN_PRICE || priceRange[1] < MAX_PRICE ? 1 : 0) + (inStockOnly ? 1 : 0)}
                </span>
              )}
            </button>

            <p className="font-body text-sm text-warm-gray">
              <span className="font-semibold text-text-primary">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-border-linen rounded-sm font-body text-sm text-text-primary hover:border-brand-gold transition-colors cursor-pointer"
            >
              Sort: {sortOptions.find((s) => s.value === sortBy)?.label}
              <ChevronDown size={14} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-sm shadow-xl border border-border-linen py-1 min-w-[200px] z-30">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setIsSortOpen(false); }}
                    className={`block w-full text-left px-4 py-2 font-body text-sm transition-colors cursor-pointer ${
                      sortBy === opt.value ? 'text-brand-gold bg-brand-gold/5' : 'text-text-primary hover:bg-linen hover:text-brand-gold'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <h3 className="font-heading text-lg tracking-wide text-text-primary mb-6 flex items-center gap-2">
                <SlidersHorizontal size={18} />
                Filters
              </h3>
              <FilterContent />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-heading text-2xl text-text-primary mb-3">No products found</p>
                <p className="font-body text-warm-gray mb-6">Try adjusting your filters to find what you&apos;re looking for.</p>
                <button
                  onClick={clearAll}
                  className="px-6 py-2.5 bg-brand-gold text-white font-body text-sm rounded-sm hover:bg-brand-bronze transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[320px] max-w-[85vw] bg-cream z-[70] shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl tracking-wide text-text-primary flex items-center gap-2">
                    <SlidersHorizontal size={18} />
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 text-text-primary hover:text-brand-gold transition-colors cursor-pointer"
                    aria-label="Close filters"
                  >
                    <X size={22} />
                  </button>
                </div>
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
