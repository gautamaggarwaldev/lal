import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Lush & Leaves. Reach us via WhatsApp, phone, or email for enquiries about our premium artificial flowers, plants, and decor collections.',
  openGraph: {
    title: 'Contact Us | Lush & Leaves',
    description: 'Get in touch with Lush & Leaves for enquiries about premium artificial decor.',
  },
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="font-body text-sm tracking-[0.25em] uppercase text-brand-gold mb-3 block">
            Get in Touch
          </span>
          <h1 className="font-heading text-5xl sm:text-6xl tracking-wide text-text-primary mb-4">
            We&apos;d Love to <span className="text-brand-gold italic">Hear from You</span>
          </h1>
          <p className="font-body text-warm-gray max-w-xl mx-auto leading-relaxed">
            Have a question about our products? Need help choosing the perfect arrangement?
            We&apos;re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-sm p-8 shadow-sm border border-border-linen">
            <h2 className="font-heading text-2xl tracking-wide text-text-primary mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="font-body text-sm font-medium text-text-primary mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-cream border border-border-linen rounded-sm font-body text-sm focus:outline-none focus:border-brand-gold transition-colors placeholder:text-warm-gray/60"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-phone" className="font-body text-sm font-medium text-text-primary mb-2 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    placeholder="+91 xxxxx xxxxx"
                    className="w-full px-4 py-3 bg-cream border border-border-linen rounded-sm font-body text-sm focus:outline-none focus:border-brand-gold transition-colors placeholder:text-warm-gray/60"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="font-body text-sm font-medium text-text-primary mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-cream border border-border-linen rounded-sm font-body text-sm focus:outline-none focus:border-brand-gold transition-colors placeholder:text-warm-gray/60"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="font-body text-sm font-medium text-text-primary mb-2 block">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 bg-cream border border-border-linen rounded-sm font-body text-sm focus:outline-none focus:border-brand-gold transition-colors placeholder:text-warm-gray/60 resize-none"
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth>
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* WhatsApp */}
            <a
              href="https://wa.me/8130078740?text=Hello!%20I%20visited%20lushandleaves.com%20and%20would%20love%20to%20know%20more%20about%20your%20artificial%20flowers%20and%20decor%20collection.%20Can%20you%20help%20me?"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-whatsapp-green/10 border border-whatsapp-green/30 rounded-sm hover:bg-whatsapp-green/20 transition-colors group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-whatsapp-green text-white">
                <MessageCircle size={22} fill="white" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-text-primary group-hover:text-whatsapp-green transition-colors">
                  Chat on WhatsApp
                </h3>
                <p className="font-body text-sm text-warm-gray">
                  Quick responses, typically within minutes
                </p>
              </div>
            </a>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-sm border border-border-linen">
                <Phone size={20} className="text-brand-gold mb-3" />
                <h3 className="font-body font-semibold text-text-primary mb-1">Phone</h3>
                <p className="font-body text-sm text-warm-gray">+91 8130078740</p>
              </div>
              <div className="p-6 bg-white rounded-sm border border-border-linen">
                <Mail size={20} className="text-brand-gold mb-3" />
                <h3 className="font-body font-semibold text-text-primary mb-1">Email</h3>
                <p className="font-body text-sm text-warm-gray">hello@lushandleaves.com</p>
              </div>
              <div className="p-6 bg-white rounded-sm border border-border-linen">
                <MapPin size={20} className="text-brand-gold mb-3" />
                <h3 className="font-body font-semibold text-text-primary mb-1">Address</h3>
                <p className="font-body text-sm text-warm-gray">
                  123 Botanical Lane, Jubilee Hills<br />
                  Hyderabad, Telangana 500033
                </p>
              </div>
              <div className="p-6 bg-white rounded-sm border border-border-linen">
                <Clock size={20} className="text-brand-gold mb-3" />
                <h3 className="font-body font-semibold text-text-primary mb-1">Business Hours</h3>
                <p className="font-body text-sm text-warm-gray">
                  Mon – Sat: 10AM – 7PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-sm overflow-hidden border border-border-linen h-[250px] bg-linen flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-warm-gray mx-auto mb-2" />
                <p className="font-body text-sm text-warm-gray">
                  Google Maps embed placeholder
                </p>
                <p className="font-body text-xs text-warm-gray/60 mt-1">
                  Jubilee Hills, Hyderabad
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
