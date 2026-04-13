import HeroSection from '@/components/home/HeroSection';
import MarqueeBanner from '@/components/home/MarqueeBanner';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import BestSellers from '@/components/home/BestSellers';
import Testimonials from '@/components/home/Testimonials';
import MoodBoard from '@/components/home/MoodBoard';
import Newsletter from '@/components/home/Newsletter';
import ShopAllProducts from '@/components/home/ShopAllProducts';
import FAQ from '@/components/home/FAQ';

export default function HomePage() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lush & Leaves',
    url: 'https://lushandleaves.com',
    logo: 'https://lushandleaves.com/logo.png',
    description:
      'Premium artificial flowers, plants, and luxury home decor. Handcrafted with everlasting beauty.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-98765-43210',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://instagram.com/lushandleaves',
      'https://facebook.com/lushandleaves',
      'https://pinterest.com/lushandleaves',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HeroSection />
      <MarqueeBanner />
      <hr className="gold-divider max-w-7xl mx-auto" />
      <FeaturedCategories />
      <hr className="gold-divider max-w-7xl mx-auto" />
      <WhyChooseUs />
      <hr className="gold-divider max-w-7xl mx-auto" />
      <BestSellers />
      <hr className="gold-divider max-w-7xl mx-auto" />
      <ShopAllProducts />
      <hr className="gold-divider max-w-7xl mx-auto" />
      <Testimonials />
      <hr className="gold-divider max-w-7xl mx-auto" />
      <MoodBoard />
      <hr className="gold-divider max-w-7xl mx-auto" />
      <FAQ />
      <hr className="gold-divider max-w-7xl mx-auto" />
      <Newsletter />
    </>
  );
}
