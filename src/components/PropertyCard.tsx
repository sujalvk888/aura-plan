'use client';

import Image from 'next/image';
import { MapPin, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toggleWishlist } from '@/app/properties/[id]/actions';
import { useState } from 'react';

interface PropertyCardProps {
  id: string;
  title: string;
  type?: string;
  location: string;
  imageUrl: string;
  isWishlisted?: boolean;
}

export default function PropertyCard({ 
  id, 
  title, 
  type = "Property", 
  location, 
  imageUrl, 
  isWishlisted = false 
}: PropertyCardProps) {
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the property page
    
    // Optimistic update
    const previousState = wishlisted;
    setWishlisted(!wishlisted);

    const result = await toggleWishlist(id);
    
    if (result.error && result.redirect) {
      router.push(result.redirect);
    } else if (result.success && result.isWishlisted !== undefined) {
      setWishlisted(result.isWishlisted);
    } else {
      // Revert if failed
      setWishlisted(previousState);
    }
  };

  return (
    <div className="group rounded-2xl bg-surface overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 relative">
      
      {/* Wishlist Button Overlay */}
      <button 
        onClick={handleWishlistClick}
        className="absolute top-4 right-4 z-20 p-2.5 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 rounded-full transition-colors"
        title={wishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
      >
        <Heart 
          size={18} 
          className={`transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} 
        />
      </button>

      <div className="relative h-64 w-full overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
      </div>
      
      <div className="p-6 relative z-10 -mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs text-primary font-medium bg-surface/80 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-white/5">
            <MapPin size={12} />
            {location}
          </div>
          <div className="text-xs text-foreground-muted font-medium bg-white/5 px-3 py-1 rounded-full">
            {type}
          </div>
        </div>
        
        <h3 className="font-heading text-xl font-medium text-foreground mb-4">
          {title}
        </h3>
        
        <span className="w-full block text-center bg-primary/20 group-hover:bg-primary text-foreground py-3 rounded-xl text-sm font-medium transition-all border border-primary/30 group-hover:border-primary">
          View Details
        </span>
      </div>
    </div>
  );
}
