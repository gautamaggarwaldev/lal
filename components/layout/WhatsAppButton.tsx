'use client';

import { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { generateWhatsAppURL } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  productName?: string;
  price?: number;
  imageUrl?: string;
  productPageUrl?: string;
  category?: string;
}

export default function WhatsAppButton({
  productName,
  price,
  imageUrl,
  productPageUrl,
  category,
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const handleSend = () => {
    const url = generateWhatsAppURL({
      productName,
      price,
      imageUrl,
      productPageUrl,
      category,
      customMessage: customMessage.trim() || undefined,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setCustomMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat popup */}
      <div
        className={`bg-white rounded-xl shadow-2xl border border-border-linen overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen
            ? 'opacity-100 visible scale-100 translate-y-0'
            : 'opacity-0 invisible scale-90 translate-y-4'
        }`}
        style={{ width: '320px' }}
      >
        {/* Header */}
        <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle size={18} className="text-white" fill="white" />
            </div>
            <div>
              <p className="font-body text-sm font-medium text-white">Lush & Leaves</p>
              <p className="font-body text-[11px] text-white/70">Typically replies instantly</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat body */}
        <div className="p-4 bg-[#ECE5DD] min-h-[140px]">
          {/* Pre-written message preview */}
          <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[260px]">
            <p className="font-body text-[13px] text-text-primary leading-relaxed">
              👋 Hi! I&apos;m interested in:
            </p>
            <div className="mt-2 space-y-1">
              <p className="font-body text-[12px] text-text-primary">
                🪴 <span className="font-medium">{productName}</span>
              </p>
              <p className="font-body text-[12px] text-brand-green font-semibold">
                💰 ₹{price?.toLocaleString('en-IN')}
              </p>
              {category && (
                <p className="font-body text-[12px] text-warm-gray">
                  📂 {category}
                </p>
              )}
            </div>
            <p className="font-body text-[10px] text-warm-gray mt-2 text-right">Pre-filled ✓</p>
          </div>
        </div>

        {/* Input area */}
        <div className="p-3 bg-white border-t border-border-linen">
          <p className="font-body text-[11px] text-warm-gray mb-2">
            Add your message (optional):
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="e.g. Do you have this in blue?"
              className="flex-1 px-3 py-2.5 bg-cream border border-border-linen rounded-full font-body text-sm focus:outline-none focus:border-brand-gold transition-colors duration-200 placeholder:text-warm-gray/50"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-whatsapp-green text-white hover:scale-110 transition-all duration-200 cursor-pointer flex-shrink-0"
              aria-label="Send on WhatsApp"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 flex items-center justify-center rounded-full bg-whatsapp-green text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-pulse-ring cursor-pointer"
        aria-label="Chat with us on WhatsApp"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageCircle size={26} fill="white" />
        )}
      </button>
    </div>
  );
}
