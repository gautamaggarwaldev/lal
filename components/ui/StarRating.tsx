import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showCount?: boolean;
}

export default function StarRating({ rating, reviewCount, size = 16, showCount = true }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={size} className="fill-brand-gold text-brand-gold" />
        ))}
        {hasHalfStar && (
          <div className="relative" style={{ width: size, height: size }}>
            <Star size={size} className="text-border-linen absolute" />
            <div className="overflow-hidden absolute" style={{ width: size / 2 }}>
              <Star size={size} className="fill-brand-gold text-brand-gold" />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-border-linen" />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-sm text-warm-gray font-body ml-1">({reviewCount})</span>
      )}
    </div>
  );
}
