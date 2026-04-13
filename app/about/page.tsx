import { Metadata } from 'next';
import Image from 'next/image';
import { Leaf, Heart, Eye, Award } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn the story behind Lush & Leaves — a passion project born from a love for nature, design, and the belief that beautiful spaces deserve everlasting botanicals.',
  openGraph: {
    title: 'About Us | Lush & Leaves',
    description:
      'Learn the story behind Lush & Leaves — premium artificial flowers and decor.',
  },
};

const values = [
  {
    icon: Heart,
    title: 'Passion for Beauty',
    description: 'Every product is selected with an eye for elegance and a heart for quality.',
  },
  {
    icon: Eye,
    title: 'Attention to Detail',
    description: 'From petal texture to colour gradients — we obsess over the details that matter.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Luxury',
    description: 'Long-lasting products that reduce waste from fresh flower replacements.',
  },
  {
    icon: Award,
    title: 'Uncompromising Quality',
    description: 'We source only the finest materials — silk, real-touch latex, and premium ceramics.',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-body text-sm tracking-[0.25em] uppercase text-brand-gold mb-4 block">
              Our Story
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl tracking-wide text-text-primary mb-6">
              Born from a Love <br />
              <span className="text-brand-gold italic">of Nature</span>
            </h1>
            <div className="space-y-4 font-body text-warm-gray leading-relaxed">
              <p>
                Lush & Leaves began with a simple observation: everyone deserves a home that feels alive with 
                nature&apos;s beauty, but not everyone has the time, light, or ability to maintain living plants 
                and fresh flowers.
              </p>
              <p>
                We set out to bridge that gap — curating the world&apos;s most realistic artificial florals, 
                plants, and botanical decor that you can&apos;t help but touch to check if they&apos;re real. 
                Our products are handpicked and hand-finished by artisans who share our passion for beauty 
                and precision.
              </p>
              <p>
                Today, Lush & Leaves is trusted by interior designers, event planners, and homeowners 
                across India who refuse to compromise on aesthetics. Every piece in our collection is 
                chosen to bring warmth, elegance, and timeless charm to the spaces that matter most.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80&auto=format&fit=crop"
              alt="Elegant floral arrangement in a luxury setting — Lush and Leaves brand story"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      <hr className="gold-divider max-w-7xl mx-auto" />

      {/* Core Values */}
      <section className="py-20 bg-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-sm tracking-[0.25em] uppercase text-brand-gold mb-3 block">
              What Drives Us
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl tracking-wide text-text-primary">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-cream border border-border-linen">
                  <value.icon size={28} className="text-brand-green" />
                </div>
                <h3 className="font-heading text-xl tracking-wide text-text-primary mb-2">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-warm-gray leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="gold-divider max-w-7xl mx-auto" />

      {/* Founder */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-sm overflow-hidden max-w-[400px] mx-auto lg:mx-0">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop"
                alt="Founder of Lush and Leaves — premium artificial decor brand"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>

            <div>
              <span className="font-body text-sm tracking-[0.25em] uppercase text-brand-gold mb-4 block">
                Meet the Founder
              </span>
              <h2 className="font-heading text-4xl tracking-wide text-text-primary mb-4">
                Ananya Rao
              </h2>
              <div className="space-y-4 font-body text-warm-gray leading-relaxed">
                <p>
                  &ldquo;I started Lush & Leaves because I believe beautiful spaces shouldn&apos;t come with
                  a maintenance manual. After years of watching gorgeous floral arrangements wilt within days,
                  I knew there had to be a better way.&rdquo;
                </p>
                <p>
                  With a background in interior design and a deep appreciation for botanical art, Ananya 
                  has built Lush & Leaves into a destination for discerning homeowners who value both 
                  aesthetics and practicality.
                </p>
                <p className="italic text-brand-gold">
                  &ldquo;Every product we offer is one I&apos;d proudly display in my own home.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
