export default function MarqueeBanner() {
  const items = [
    'Handcrafted',
    'Premium Quality',
    'Everlasting Beauty',
    'Free Shipping on Orders Above ₹2000',
    'No Maintenance Required',
    'Allergy Free',
  ];

  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-4 mx-4">
      <span className="font-body text-sm tracking-widest uppercase text-text-primary">{item}</span>
      <span className="text-brand-gold" aria-hidden="true">·</span>
    </span>
  ));

  return (
    <div className="bg-linen border-y border-border-linen py-3 overflow-hidden" role="marquee" aria-label="Brand values ticker">
      <div className="flex animate-marquee whitespace-nowrap">
        <div className="flex">{content}</div>
        <div className="flex" aria-hidden="true">{content}</div>
        <div className="flex" aria-hidden="true">{content}</div>
      </div>
    </div>
  );
}
