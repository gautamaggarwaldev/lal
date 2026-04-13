interface BadgeProps {
  variant?: 'new' | 'sale' | 'category';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = 'category', children, className = '' }: BadgeProps) {
  const variants = {
    new: 'bg-brand-green text-white',
    sale: 'bg-red-600 text-white',
    category: 'bg-badge-bg text-badge-text',
  };

  return (
    <span
      className={`inline-block px-2.5 py-1 text-xs font-body font-semibold uppercase tracking-wider rounded-sm ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
