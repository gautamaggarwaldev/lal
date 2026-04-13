'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, ChevronDown, X, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MobileDrawer from './MobileDrawer';
import DecorAdvisor from './DecorAdvisor';

const categories = [
  { name: 'Artificial Flowers', slug: 'artificial-flowers' },
  { name: 'Artificial Plants & Greens', slug: 'artificial-plants-greens' },
  { name: 'Vases & Planters', slug: 'vases-planters' },
  { name: 'Wall Decor', slug: 'wall-decor' },
  { name: 'Table Centerpieces', slug: 'table-centerpieces' },
  { name: 'Festive & Seasonal Decor', slug: 'festive-seasonal-decor' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    // Set initial state
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Dynamic color classes: white text on transparent hero, dark text after scroll
  const textColor = isScrolled
    ? 'text-text-primary'
    : 'text-white';
  const textHover = 'hover:text-brand-gold';
  const logoColor = isScrolled
    ? 'text-text-primary'
    : 'text-white';
  const leafColor = isScrolled
    ? 'text-brand-green'
    : 'text-white';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-brand-gold/20'
            : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent'
        }`}
      >
        {/* Gold accent line at top */}
        <div className={`h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className={`${leafColor} transition-all duration-500 group-hover:rotate-12`}
              >
                <path
                  d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5 .3-.8.8-1.5 1.4-2.1C5.5 13.5 7.5 12 10 12c1.5 0 2.8.5 3.8 1.3.5-.8 1.2-1.5 2-2C14.3 10 12.3 9 10 9c-2 0-3.8.7-5.2 1.8C5.5 7.5 8.5 5 12 5c4 0 7.3 3 7.9 6.8.1.4.1.8.1 1.2 0 5.5-4.5 10-10 10-.5 0-1-.04-1.5-.1C10 23.6 11.5 24 13 24c5.5 0 10-4.5 10-10S17.5 2 12 2z"
                  fill="currentColor"
                />
              </svg>
              <span className={`font-heading text-2xl tracking-wide transition-colors duration-500 ${logoColor}`}>
                Lush <span className="text-brand-gold">&</span> Leaves
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main navigation">
              <Link
                href="/"
                className={`font-body text-sm tracking-wide ${textColor} ${textHover} transition-colors duration-300 relative group`}
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Shop dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                <button
                  className={`font-body text-sm tracking-wide ${textColor} ${textHover} transition-colors duration-300 flex items-center gap-1 relative group cursor-pointer`}
                  aria-expanded={isShopOpen}
                  aria-haspopup="true"
                >
                  Shop
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isShopOpen ? 'rotate-180' : ''}`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                </button>

                <div
                  className={`absolute top-full left-0 pt-2 transition-all duration-300 ${
                    isShopOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  <div className="bg-white rounded-sm shadow-xl border border-border-linen py-2 min-w-[240px]">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="block px-5 py-2.5 text-sm font-body text-text-primary hover:bg-linen hover:text-brand-gold transition-all duration-200"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className={`font-body text-sm tracking-wide ${textColor} ${textHover} transition-colors duration-300 relative group`}
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                href="/contact"
                className={`font-body text-sm tracking-wide ${textColor} ${textHover} transition-colors duration-300 relative group`}
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Décor Advisor */}
              <button
                onClick={() => setIsAdvisorOpen(true)}
                className={`font-body text-sm tracking-wide ${textColor} ${textHover} transition-colors duration-300 relative group flex items-center gap-1.5 cursor-pointer`}
              >
                <Sparkles size={14} className="text-brand-gold" />
                Décor Advisor
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </button>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Search toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 ${textColor} ${textHover} transition-colors duration-200 cursor-pointer`}
                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileOpen(true)}
                className={`lg:hidden p-2 ${textColor} ${textHover} transition-colors duration-200 cursor-pointer`}
                aria-label="Open mobile menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isSearchOpen ? 'max-h-20 pb-4' : 'max-h-0'
            }`}
          >
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for flowers, plants, vases..."
                className="flex-1 px-4 py-3 bg-white border border-border-linen rounded-sm font-body text-sm text-text-primary focus:outline-none focus:border-brand-gold transition-colors duration-200 placeholder:text-warm-gray/60"
                autoFocus={isSearchOpen}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-green text-white font-body text-sm rounded-sm hover:bg-brand-gold hover:text-text-primary transition-all duration-300 cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        categories={categories}
        onOpenAdvisor={() => { setIsMobileOpen(false); setIsAdvisorOpen(true); }}
      />

      <DecorAdvisor
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
      />
    </>
  );
}
