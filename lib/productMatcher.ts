import { Product, getAllProducts } from '@/lib/getProducts';

interface MatchResult {
  products: Product[];
  message: string;
}

// Keyword → category slug mappings
const categoryKeywords: Record<string, string[]> = {
  'artificial-flowers': ['flower', 'flowers', 'rose', 'roses', 'peony', 'peonies', 'orchid', 'orchids', 'sunflower', 'tulip', 'dahlia', 'hydrangea', 'cherry blossom', 'bouquet', 'bloom', 'blooms', 'floral'],
  'artificial-plants-greens': ['plant', 'plants', 'green', 'greens', 'greenery', 'monstera', 'olive', 'fiddle', 'pothos', 'snake plant', 'bamboo', 'eucalyptus', 'fern', 'palm', 'tree', 'vine', 'garland'],
  'vases-planters': ['vase', 'vases', 'planter', 'planters', 'pot', 'pots', 'ceramic', 'glass', 'basket', 'urn', 'copper', 'marble'],
  'wall-decor': ['wall', 'wall decor', 'canvas', 'print', 'moss', 'wreath', 'sculpture', 'macrame', 'hanging', 'frame', 'metal art'],
  'table-centerpieces': ['centerpiece', 'centrepiece', 'table', 'dining', 'terrarium', 'candelabra', 'console', 'arrangement'],
  'festive-seasonal-decor': ['festive', 'festival', 'diwali', 'christmas', 'eid', 'holi', 'wedding', 'seasonal', 'marigold', 'rangoli', 'autumn', 'spring'],
};

// Color keyword mappings
const colorKeywords: Record<string, string[]> = {
  white: ['white', 'ivory', 'snow', 'cream'],
  pink: ['pink', 'blush', 'rose', 'dusty rose'],
  green: ['green', 'olive', 'sage', 'forest', 'tropical'],
  gold: ['gold', 'golden', 'brass', 'copper', 'bronze'],
  black: ['black', 'dark', 'matte black'],
  purple: ['purple', 'lavender'],
  red: ['red', 'saffron'],
  yellow: ['yellow', 'sunflower'],
  blue: ['blue'],
  multicolor: ['multi', 'mixed', 'colorful', 'colourful'],
};

// Room/use-case suggestions
const roomKeywords: Record<string, string> = {
  'living room': 'For living rooms, I recommend our statement floor plants like the Monstera or Bird of Paradise, paired with a striking vase. Wall decor like our botanical canvas prints or moss art frames also make beautiful focal points.',
  'bedroom': 'For bedrooms, soft and romantic arrangements work best. Consider our Cherry Blossom Branch, Blush Rose Arrangement, or our Boho Dried Grass Wall Hanging for a serene, calming atmosphere.',
  'bathroom': 'For bathrooms, low-maintenance options work perfectly. Our Snake Plant, Lucky Bamboo Stalks, or Floating Orchid Bowl add a spa-like tranquility.',
  'kitchen': 'For kitchens, herbs, and fresh-looking greens are ideal. Try our Lavender Wildflower Bundle or Eucalyptus Garland to add a Provençal-inspired freshness.',
  'office': 'For offices and desks, compact arrangements work best. Our Geometric Succulent Terrarium, Lucky Bamboo, or Mini Bud Vase Trio are perfect for adding life to workspaces.',
  'dining': 'For dining tables, our centrepiece collection is designed specifically for this! The Grand Peony Centerpiece and Floating Orchid Bowl are customer favourites.',
  'entryway': 'For entryways, make a strong first impression with our Potted Olive Tree, Fiddle Leaf Fig, or a beautiful wreath like our Eucalyptus & Lavender Wreath.',
  'balcony': 'For balconies and patios, choose UV-resistant options like our Potted Olive Tree, Bird of Paradise, or Hanging Pothos Vine.',
  'wedding': 'For weddings, our Wedding Rose Arch Kit is a bestseller! Pair it with Eucalyptus Garlands and our Grand Peony Centerpiece for a romantic, coordinated look.',
  'gift': 'Looking for a gift? Our Luxury Mixed Floral Basket, Mixed Dahlia Bouquet (gift-wrapped!), and Pressed Flower Glass Frame are thoughtful, lasting presents.',
  'pooja': 'For pooja rooms and festivals, our Diwali Marigold Garland Set and Pooja Lotus & Floating Candle Set are beautiful and reusable year after year.',
};

function extractPriceRange(text: string): [number, number] | null {
  const underMatch = text.match(/under\s*₹?\s*(\d[\d,]*)/i);
  if (underMatch) return [0, parseInt(underMatch[1].replace(/,/g, ''))];

  const aboveMatch = text.match(/(?:above|over)\s*₹?\s*(\d[\d,]*)/i);
  if (aboveMatch) return [parseInt(aboveMatch[1].replace(/,/g, '')), 999999];

  const rangeMatch = text.match(/₹?\s*(\d[\d,]*)\s*(?:to|-|–)\s*₹?\s*(\d[\d,]*)/i);
  if (rangeMatch) return [parseInt(rangeMatch[1].replace(/,/g, '')), parseInt(rangeMatch[2].replace(/,/g, ''))];

  const budgetMatch = text.match(/budget\s*(?:is|of)?\s*₹?\s*(\d[\d,]*)/i);
  if (budgetMatch) return [0, parseInt(budgetMatch[1].replace(/,/g, ''))];

  return null;
}

function findMatchingCategories(text: string): string[] {
  const lower = text.toLowerCase();
  const matched: string[] = [];

  for (const [slug, keywords] of Object.entries(categoryKeywords)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        if (!matched.includes(slug)) matched.push(slug);
        break;
      }
    }
  }

  return matched;
}

function findMatchingColors(text: string): string[] {
  const lower = text.toLowerCase();
  const matched: string[] = [];

  for (const [color, keywords] of Object.entries(colorKeywords)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        if (!matched.includes(color)) matched.push(color);
        break;
      }
    }
  }

  return matched;
}

function findRoomSuggestion(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [room, suggestion] of Object.entries(roomKeywords)) {
    if (lower.includes(room)) return suggestion;
  }
  return null;
}

function matchProductColors(product: Product, colors: string[]): boolean {
  const pColor = product.color.toLowerCase();
  return colors.some((c) => {
    const keywords = colorKeywords[c] || [c];
    return keywords.some((kw) => pColor.includes(kw));
  });
}

export function getProductRecommendations(userMessage: string): MatchResult {
  const all = getAllProducts();
  const priceRange = extractPriceRange(userMessage);
  const matchedCategories = findMatchingCategories(userMessage);
  const matchedColors = findMatchingColors(userMessage);
  const roomSuggestion = findRoomSuggestion(userMessage);

  let filtered = [...all];
  const parts: string[] = [];

  // Apply category filter
  if (matchedCategories.length > 0) {
    filtered = filtered.filter((p) => matchedCategories.includes(p.category));
    const catNames = matchedCategories.map((slug) => slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    parts.push(`in **${catNames.join(', ')}**`);
  }

  // Apply color filter
  if (matchedColors.length > 0) {
    filtered = filtered.filter((p) => matchProductColors(p, matchedColors));
    parts.push(`in **${matchedColors.join(', ')}** tones`);
  }

  // Apply price filter
  if (priceRange) {
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (priceRange[0] === 0) {
      parts.push(`under **₹${priceRange[1].toLocaleString('en-IN')}**`);
    } else {
      parts.push(`between **₹${priceRange[0].toLocaleString('en-IN')}** and **₹${priceRange[1].toLocaleString('en-IN')}**`);
    }
  }

  // Sort by rating, then featured
  filtered.sort((a, b) => {
    if (b.isFeatured !== a.isFeatured) return b.isFeatured ? 1 : -1;
    return b.rating - a.rating;
  });

  // Build response message
  let message = '';

  if (roomSuggestion) {
    message = roomSuggestion + '\n\n';
  }

  if (filtered.length === 0) {
    message += "I couldn't find exact matches for your criteria. Here are some of our top-rated products instead:";
    // Fallback to featured/top-rated
    filtered = all.filter((p) => p.isFeatured).slice(0, 6);
    if (filtered.length === 0) filtered = all.sort((a, b) => b.rating - a.rating).slice(0, 6);
  } else if (parts.length > 0) {
    const count = Math.min(filtered.length, 6);
    message += `Great choice! I found **${filtered.length} product${filtered.length > 1 ? 's' : ''}** ${parts.join(' ')}. Here are my top ${count} picks:`;
  } else if (roomSuggestion) {
    message += `Here are my top recommendations:`;
  } else {
    message += `Here are some products you might love based on your interests:`;
  }

  return {
    products: filtered.slice(0, 6),
    message,
  };
}

// Greeting messages
export function getGreeting(): string {
  return `🌿 **Welcome to the Décor Advisor!**

I can help you find the perfect artificial flowers, plants, and decor for your space. Try telling me:

• What **room** you're decorating (living room, bedroom, office…)
• What **type of product** you're looking for (flowers, plants, vases…)
• Your **preferred colours** (pink, green, gold…)
• Your **budget** (e.g., "under ₹2000")

Or try these quick prompts to get started! 👇`;
}

export const quickPrompts = [
  '🌸 Pink flowers under ₹2000',
  '🪴 Best plants for living room',
  '🏺 Gold vases and planters',
  '🎄 Festive Diwali decor',
  '🎁 Gift ideas under ₹3000',
  '🖼️ Wall decor for bedroom',
];
