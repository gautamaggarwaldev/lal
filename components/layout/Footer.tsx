'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
];

const categories = [
  { label: 'Artificial Flowers', href: '/category/artificial-flowers' },
  { label: 'Plants & Greens', href: '/category/artificial-plants-greens' },
  { label: 'Vases & Planters', href: '/category/vases-planters' },
  { label: 'Wall Decor', href: '/category/wall-decor' },
  { label: 'Table Centerpieces', href: '/category/table-centerpieces' },
  { label: 'Festive Decor', href: '/category/festive-seasonal-decor' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="bg-linen border-t border-border-linen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading text-2xl tracking-wide text-text-primary">
                Lush <span className="text-brand-gold">&</span> Leaves
              </span>
            </Link>
            <p className="font-body text-sm text-warm-gray leading-relaxed mb-6">
              Premium artificial flowers, plants, and decor for those who appreciate timeless elegance
              without the upkeep. Handcrafted with love.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream border border-border-linen text-warm-gray hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream border border-border-linen text-warm-gray hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-300"
                aria-label="Follow us on Pinterest"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.9s-.36-.72-.36-1.78c0-1.67.97-2.91 2.17-2.91 1.02 0 1.52.77 1.52 1.7 0 1.03-.66 2.58-1 4.01-.28 1.2.6 2.17 1.78 2.17 2.14 0 3.78-2.26 3.78-5.52 0-2.89-2.08-4.9-5.04-4.9-3.44 0-5.46 2.58-5.46 5.24 0 1.04.4 2.15.9 2.75a.36.36 0 0 1 .08.35l-.33 1.36c-.06.22-.18.27-.4.16-1.5-.7-2.43-2.88-2.43-4.64 0-3.78 2.74-7.25 7.92-7.25 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.6 7.46-6.22 7.46-1.22 0-2.36-.63-2.75-1.38l-.75 2.86c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream border border-border-linen text-warm-gray hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-300"
                aria-label="Follow us on Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a
                href="https://wa.me/8130078740"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream border border-border-linen text-warm-gray hover:bg-whatsapp-green hover:text-white hover:border-whatsapp-green transition-all duration-300"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg tracking-wide text-text-primary mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-warm-gray hover:text-brand-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading text-lg tracking-wide text-text-primary mb-5">Categories</h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={cat.href}
                    className="font-body text-sm text-warm-gray hover:text-brand-gold transition-colors duration-200"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-heading text-lg tracking-wide text-text-primary mb-5">Contact Us</h3>
            <div className="space-y-3 mb-6">
              <p className="font-body text-sm text-warm-gray">
                123 Botanical Lane, Jubilee Hills<br />
                Hyderabad, Telangana 500033
              </p>
              <p className="font-body text-sm text-warm-gray">
                Phone: +91 8130078740
              </p>
              <p className="font-body text-sm text-warm-gray">
                Email: hello@lushandleaves.com
              </p>
            </div>

            <h4 className="font-body text-sm font-semibold text-text-primary mb-3">Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm font-body bg-cream border border-border-linen rounded-sm focus:outline-none focus:border-brand-gold transition-colors"
                required
              />
              <button
                type="submit"
                className="p-2 bg-brand-green text-white rounded-sm hover:bg-brand-gold hover:text-text-primary transition-all duration-300 cursor-pointer"
                aria-label="Subscribe to newsletter"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border-linen flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-warm-gray">
            © 2024 Lush & Leaves. All rights reserved. Premium Artificial Decor.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="font-body text-xs text-warm-gray hover:text-brand-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="font-body text-xs text-warm-gray hover:text-brand-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
