'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot, User } from 'lucide-react';
import { getProductRecommendations, getGreeting, quickPrompts } from '@/lib/productMatcher';
import { Product } from '@/lib/getProducts';

interface DecorAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  products?: Product[];
  isTyping?: boolean;
}

export default function DecorAdvisor({ isOpen, onClose }: DecorAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialized = useRef(false);

  // Initialize with greeting
  useEffect(() => {
    if (isOpen && !initialized.current) {
      initialized.current = true;
      setMessages([
        {
          id: 'greeting',
          role: 'bot',
          text: getGreeting(),
        },
      ]);
    }
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSend = useCallback((text: string) => {
    if (!text.trim() || isThinking) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    // Simulate thinking delay for natural feel
    setTimeout(() => {
      const result = getProductRecommendations(text);

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        text: result.message,
        products: result.products,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
    }, 800 + Math.random() * 700);
  }, [isThinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  // Simple markdown bold rendering
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-text-primary">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[520px] sm:h-[680px] sm:max-h-[85vh] bg-cream rounded-xl shadow-2xl z-[90] flex flex-col overflow-hidden border border-border-linen"
          >
            {/* Header */}
            <div className="bg-brand-green px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  <Sparkles size={20} className="text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-white tracking-wide">Décor Advisor</h3>
                  <p className="font-body text-[11px] text-white/60">AI-powered product recommendations</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Close advisor"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'bot' ? 'bg-brand-green/10' : 'bg-brand-gold/10'
                  }`}>
                    {msg.role === 'bot' ? (
                      <Bot size={14} className="text-brand-green" />
                    ) : (
                      <User size={14} className="text-brand-gold" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'ml-auto' : ''}`}>
                    <div
                      className={`rounded-xl px-3.5 py-2.5 font-body text-[13px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-brand-green text-white rounded-tr-sm'
                          : 'bg-white shadow-sm border border-border-linen rounded-tl-sm'
                      }`}
                    >
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i} className={`${i > 0 ? 'mt-1.5' : ''} ${msg.role === 'bot' ? 'text-warm-gray' : ''}`}>
                          {msg.role === 'bot' ? renderText(line) : line}
                        </p>
                      ))}
                    </div>

                    {/* Product cards */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.products.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-border-linen hover:border-brand-gold hover:shadow-md transition-all duration-200 group"
                          >
                            <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-body text-xs font-medium text-text-primary group-hover:text-brand-gold transition-colors truncate">
                                {product.name}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-body text-xs font-semibold text-brand-green">
                                  ₹{product.price.toLocaleString('en-IN')}
                                </span>
                                <span className="font-body text-[10px] text-brand-gold">
                                  ★ {product.rating}
                                </span>
                              </div>
                            </div>
                            <span className="font-body text-[10px] text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">
                              View →
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Quick prompts (only on greeting) */}
                    {msg.id === 'greeting' && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {quickPrompts.map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => handleSend(prompt)}
                            className="px-3 py-1.5 bg-white border border-border-linen rounded-full font-body text-[11px] text-warm-gray hover:border-brand-gold hover:text-brand-gold transition-all duration-200 cursor-pointer"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Thinking indicator */}
              {isThinking && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-brand-green" />
                  </div>
                  <div className="bg-white shadow-sm border border-border-linen rounded-xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-gold/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-brand-gold/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-brand-gold/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border-linen bg-white p-3 flex-shrink-0">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tell me what you're looking for..."
                  className="flex-1 px-4 py-2.5 bg-linen border border-border-linen rounded-full font-body text-sm text-text-primary focus:outline-none focus:border-brand-gold transition-colors placeholder:text-warm-gray/50"
                  disabled={isThinking}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-green text-white hover:bg-brand-gold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
              <p className="font-body text-[10px] text-warm-gray/60 text-center mt-2">
                AI recommendations based on our product catalog
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
