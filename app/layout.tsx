import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lushandleaves.com'),
  title: {
    default: 'Lush & Leaves — Premium Artificial Flowers, Plants & Decor',
    template: '%s | Lush & Leaves — Premium Artificial Decor',
  },
  description:
    'Discover handcrafted artificial flowers, plants, vases, and luxury home decor at Lush & Leaves. Everlasting beauty, zero maintenance. Shop our premium collections now.',
  keywords: [
    'artificial flowers',
    'fake flowers',
    'artificial plants',
    'faux flowers',
    'premium decor',
    'luxury home decor',
    'artificial flower arrangement',
    'silk flowers India',
    'artificial plants online',
    'Lush and Leaves',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Lush & Leaves',
    title: 'Lush & Leaves — Premium Artificial Flowers, Plants & Decor',
    description:
      'Handcrafted artificial flowers, plants, and luxury home decor. Everlasting beauty, zero maintenance.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=630&q=80&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Lush & Leaves — Premium Artificial Flowers and Decor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lush & Leaves — Premium Artificial Flowers, Plants & Decor',
    description:
      'Handcrafted artificial flowers, plants, and luxury home decor. Everlasting beauty, zero maintenance.',
    images: [
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=630&q=80&auto=format&fit=crop',
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
