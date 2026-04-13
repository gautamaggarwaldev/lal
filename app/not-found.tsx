import Link from 'next/link';
import { Leaf } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Botanical illustration */}
        <div className="mb-8 relative">
          <div className="text-brand-gold/20">
            <Leaf size={120} className="mx-auto" />
          </div>
          <span className="absolute inset-0 flex items-center justify-center font-heading text-7xl text-brand-gold">
            404
          </span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl tracking-wide text-text-primary mb-4">
          Page Not Found
        </h1>
        <p className="font-body text-warm-gray leading-relaxed mb-8">
          It seems this page has wilted away. But don&apos;t worry — our beautiful 
          collections are just a click away. Let us help you find what you&apos;re looking for.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="lg">
              Return Home
            </Button>
          </Link>
          <Link href="/category/artificial-flowers">
            <Button variant="secondary" size="lg">
              Browse Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
