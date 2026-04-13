const WHATSAPP_NUMBER = '8130078740';

interface WhatsAppOptions {
  phoneNumber?: string;
  productName?: string;
  price?: number;
  imageUrl?: string;
  productPageUrl?: string;
  category?: string;
  customMessage?: string;
}

export function generateWhatsAppURL(options: WhatsAppOptions = {}): string {
  const phone = options.phoneNumber || WHATSAPP_NUMBER;
  let message: string;

  if (options.productName) {
    message = `Hello! 👋 I'm interested in the following product from Lush & Leaves:

🪴 *Product:* ${options.productName}
💰 *Price:* ₹${options.price?.toLocaleString('en-IN') || 'N/A'}${options.category ? `\n📂 *Category:* ${options.category}` : ''}${options.productPageUrl ? `\n🔗 *Product Page:* ${options.productPageUrl}` : ''}

${options.customMessage ? `💬 *My Message:* ${options.customMessage}\n\n` : ''}Could you please provide more details and confirm availability?`;
  } else {
    message = `Hello! I visited lushandleaves.com and would love to know more about your artificial flowers and decor collection. Can you help me?`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
