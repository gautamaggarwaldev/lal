'use client';

import { useState, useMemo } from 'react';
import { MessageCircle, Check, Truck, ShieldCheck } from 'lucide-react';
import { Product } from '@/lib/getProducts';
import { generateWhatsAppURL } from '@/lib/whatsapp';
import StarRating from '@/components/ui/StarRating';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';

interface ProductDetailsProps {
  product: Product;
}

const colorOptions = [
  { name: 'Ivory White', hex: '#FFFFF0', priceModifier: 0 },
  { name: 'Blush Pink', hex: '#DE98AB', priceModifier: 200 },
  { name: 'Natural Green', hex: '#4A7C59', priceModifier: 0 },
  { name: 'Dusty Rose', hex: '#DCAE96', priceModifier: 300 },
  { name: 'Gold', hex: '#B8860B', priceModifier: 500 },
  { name: 'Lavender', hex: '#B57EDC', priceModifier: 200 },
  { name: 'Sage', hex: '#9CAF88', priceModifier: 100 },
];

const sizeOptions = [
  { name: 'Small', label: 'S', priceModifier: -300 },
  { name: 'Medium', label: 'M', priceModifier: 0 },
  { name: 'Large', label: 'L', priceModifier: 500 },
  { name: 'Extra Large', label: 'XL', priceModifier: 1000 },
];

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);

  // Calculate dynamic price based on color and size selection
  const dynamicPrice = useMemo(() => {
    const basePrice = product.price;
    const colorMod = colorOptions[selectedColor].priceModifier;
    const sizeMod = sizeOptions[selectedSize].priceModifier;
    return Math.max(0, basePrice + colorMod + sizeMod);
  }, [product.price, selectedColor, selectedSize]);

  const dynamicOriginalPrice = useMemo(() => {
    if (product.originalPrice === null) return null;
    const colorMod = colorOptions[selectedColor].priceModifier;
    const sizeMod = sizeOptions[selectedSize].priceModifier;
    return Math.max(0, product.originalPrice + colorMod + sizeMod);
  }, [product.originalPrice, selectedColor, selectedSize]);

  const isOnSale = dynamicOriginalPrice !== null && dynamicOriginalPrice > dynamicPrice;

  const whatsappUrl = generateWhatsAppURL({
    productName: `${product.name} (${colorOptions[selectedColor].name}, ${sizeOptions[selectedSize].name})`,
    price: dynamicPrice,
    imageUrl: product.images[0],
  });

  const accordionItems = [
    {
      title: 'Care Instructions',
      content: 'Gently dust with a soft cloth or feather duster every 2-3 weeks. For deeper cleaning, use a damp cloth with mild soap. Avoid prolonged direct sunlight exposure for best colour retention. Keep away from heat sources. Store in a cool, dry place when not in use.',
    },
    {
      title: 'Shipping Information',
      content: 'Free shipping on orders above ₹2,000 across India. Standard delivery takes 5-7 business days. Express delivery (2-3 business days) available at ₹199. All products are carefully packaged to ensure they arrive in perfect condition.',
    },
    {
      title: 'Return Policy',
      content: 'We offer a 15-day hassle-free return policy. Products must be in their original packaging and unused condition. Contact us via WhatsApp or email to initiate a return. Refund will be processed within 5-7 business days of receiving the returned item.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title and Rating */}
      <div>
        <h1 className="font-heading text-3xl sm:text-4xl tracking-wide text-text-primary mb-2">
          {product.name}
        </h1>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size={18} />
      </div>

      <hr className="gold-divider" />

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="font-body text-4xl font-bold text-brand-green">
          ₹{dynamicPrice.toLocaleString('en-IN')}
        </span>
        {isOnSale && dynamicOriginalPrice && (
          <>
            <span className="font-body text-xl text-warm-gray line-through">
              ₹{dynamicOriginalPrice.toLocaleString('en-IN')}
            </span>
            <span className="font-body text-sm font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
              {Math.round(((dynamicOriginalPrice - dynamicPrice) / dynamicOriginalPrice) * 100)}% OFF
            </span>
          </>
        )}
      </div>

      <p className="font-body text-sm text-warm-gray">Inclusive of all taxes</p>

      {/* Color Swatches — Visual */}
      <div>
        <h3 className="font-body text-sm font-semibold text-text-primary mb-3">
          Color: <span className="text-brand-gold font-normal">{colorOptions[selectedColor].name}</span>
          {colorOptions[selectedColor].priceModifier !== 0 && (
            <span className="text-warm-gray font-normal text-xs ml-2">
              ({colorOptions[selectedColor].priceModifier > 0 ? '+' : ''}₹{colorOptions[selectedColor].priceModifier.toLocaleString('en-IN')})
            </span>
          )}
        </h3>
        <div className="flex gap-3 flex-wrap">
          {colorOptions.map((color, i) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(i)}
              className={`relative flex flex-col items-center gap-1.5 group cursor-pointer`}
              aria-pressed={i === selectedColor}
              aria-label={`Select color: ${color.name}${color.priceModifier !== 0 ? ` (${color.priceModifier > 0 ? '+' : ''}₹${color.priceModifier})` : ''}`}
            >
              <div
                className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  i === selectedColor
                    ? 'border-brand-gold scale-110 shadow-md'
                    : 'border-border-linen group-hover:border-brand-gold/50 group-hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
              />
              {i === selectedColor && (
                <Check size={14} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+8px)]" style={{ color: ['#FFFFF0', '#DCAE96', '#9CAF88'].includes(color.hex) ? '#1C1C1C' : '#fff' }} />
              )}
              <span className={`font-body text-[10px] transition-colors ${i === selectedColor ? 'text-brand-gold font-medium' : 'text-warm-gray'}`}>
                {color.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Size Selector — Enhanced */}
      <div>
        <h3 className="font-body text-sm font-semibold text-text-primary mb-3">
          Size: <span className="text-brand-gold font-normal">{sizeOptions[selectedSize].name}</span>
          {sizeOptions[selectedSize].priceModifier !== 0 && (
            <span className="text-warm-gray font-normal text-xs ml-2">
              ({sizeOptions[selectedSize].priceModifier > 0 ? '+' : ''}₹{sizeOptions[selectedSize].priceModifier.toLocaleString('en-IN')})
            </span>
          )}
        </h3>
        <div className="flex gap-2">
          {sizeOptions.map((size, i) => (
            <button
              key={size.name}
              onClick={() => setSelectedSize(i)}
              className={`flex flex-col items-center px-5 py-3 text-sm font-body rounded-sm border transition-all duration-200 cursor-pointer ${
                i === selectedSize
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-gold font-medium shadow-sm'
                  : 'border-border-linen text-warm-gray hover:border-brand-gold hover:text-brand-gold'
              }`}
              aria-pressed={i === selectedSize}
              aria-label={`Select size: ${size.name}${size.priceModifier !== 0 ? ` (${size.priceModifier > 0 ? '+' : ''}₹${size.priceModifier})` : ''}`}
            >
              <span className="text-base font-semibold">{size.label}</span>
              <span className="text-[10px] mt-0.5 opacity-70">{size.name}</span>
            </button>
          ))}
        </div>
      </div>

      <hr className="gold-divider" />

      {/* Description */}
      <div>
        <h3 className="font-heading text-xl tracking-wide text-text-primary mb-3">About this Product</h3>
        <p className="font-body text-warm-gray leading-relaxed">{product.description}</p>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-heading text-xl tracking-wide text-text-primary mb-3">Features</h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check size={16} className="text-brand-green mt-1 flex-shrink-0" />
              <span className="font-body text-sm text-warm-gray">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Product details */}
      <div className="grid grid-cols-2 gap-4 bg-linen rounded-sm p-4">
        <div>
          <span className="font-body text-xs uppercase tracking-wider text-warm-gray">Dimensions</span>
          <p className="font-body text-sm text-text-primary mt-1">{product.dimensions}</p>
        </div>
        <div>
          <span className="font-body text-xs uppercase tracking-wider text-warm-gray">Material</span>
          <p className="font-body text-sm text-text-primary mt-1">{product.material}</p>
        </div>
        <div>
          <span className="font-body text-xs uppercase tracking-wider text-warm-gray">Color</span>
          <p className="font-body text-sm text-text-primary mt-1">{colorOptions[selectedColor].name}</p>
        </div>
        <div>
          <span className="font-body text-xs uppercase tracking-wider text-warm-gray">Availability</span>
          <p className={`font-body text-sm mt-1 ${product.inStock ? 'text-brand-green' : 'text-red-500'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
      </div>

      {/* Accordion */}
      <Accordion items={accordionItems} />

      {/* WhatsApp CTA */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
        <Button variant="whatsapp" size="lg" fullWidth>
          <MessageCircle size={20} fill="white" className="mr-2" />
          Enquire on WhatsApp
        </Button>
      </a>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <div className="flex items-center gap-2 text-warm-gray">
          <Truck size={16} />
          <span className="font-body text-xs">Free Shipping</span>
        </div>
        <div className="flex items-center gap-2 text-warm-gray">
          <ShieldCheck size={16} />
          <span className="font-body text-xs">15-Day Returns</span>
        </div>
      </div>

      {/* Mobile sticky WhatsApp bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-border-linen shadow-lg md:hidden z-40">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button variant="whatsapp" size="md" fullWidth>
            <MessageCircle size={18} fill="white" className="mr-2" />
            Enquire on WhatsApp — ₹{dynamicPrice.toLocaleString('en-IN')}
          </Button>
        </a>
      </div>
    </div>
  );
}
