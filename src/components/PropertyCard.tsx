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
    <div className="group rounded-3xl bg-surface/80 overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 relative flex flex-col h-full">
      
      {/* Wishlist Button Overlay */}
      <button 
        onClick={handleWishlistClick}
        className="absolute top-5 right-5 z-20 p-3 bg-black/30 backdrop-blur-md border border-white/20 hover:bg-black/60 hover:border-white/40 shadow-lg shadow-black/20 rounded-full transition-all duration-300 hover:scale-110"
        title={wishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
      >
        <Heart 
          size={20} 
          className={`transition-colors duration-300 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} 
        />
      </button>

      <div className="relative h-72 sm:h-80 w-full overflow-hidden shrink-0">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90" />
      </div>
      
      <div className="p-8 relative z-10 flex flex-col flex-1 bg-surface">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs text-primary font-medium bg-primary/10 w-fit px-4 py-1.5 rounded-full border border-primary/20">
            <MapPin size={14} />
            {location}
          </div>
          <div className="text-xs text-foreground-muted font-medium bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            {type}
          </div>
        </div>
        
        <h3 className="font-heading text-2xl font-bold text-foreground mb-8 flex-1 leading-snug">
          {title}
        </h3>
        
        <span className="w-full block text-center bg-primary/10 group-hover:bg-primary text-foreground py-4 rounded-xl text-base font-bold transition-all duration-300 border border-primary/20 group-hover:border-primary shadow-sm group-hover:shadow-[0_4px_20px_rgba(var(--primary),0.3)]">
          View Details
        </span>
      </div>
    </div>
  );
}
