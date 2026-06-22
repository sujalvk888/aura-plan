'use client'

import { useState, useEffect } from "react";
import { ArrowLeft, Box, MapPin, Share2, Heart, Check, User } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import VirtualTourModal, { RoomData } from "@/components/public/VirtualTourModal";
import { getPropertyDetails, toggleWishlist } from "./actions";

interface PropertyData {
  id: string;
  title: string;
  type: string;
  location: string;
  price: string;
  imageUrl: string;
  description: string;
  host: {
    name: string;
    bio: string | null;
    avatarUrl: string | null;
  } | null;
}

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const [propertyId, setPropertyId] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      const { id } = await params;
      setPropertyId(id);
      
      const dbData = await getPropertyDetails(id);
      
      if (dbData.property) {
        setProperty({
          id: dbData.property.id,
          title: dbData.property.name,
          type: dbData.property.type,
          location: `${dbData.property.city}, ${dbData.property.country}`,
          price: "Price upon request",
          imageUrl: dbData.property.coverImageUrl || (dbData.rooms.length > 0 ? dbData.rooms[0].front : "/placeholder.jpg"),
          description: dbData.property.description,
          host: dbData.host
        });
        setRooms(dbData.rooms);
        setIsWishlisted(dbData.isWishlisted || false);
      }
      setLoading(false);
    }
    loadData();
  }, [params]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleWishlist = async () => {
    const previousState = isWishlisted;
    setIsWishlisted(!isWishlisted); // Optimistic UI

    const result = await toggleWishlist(propertyId);
    
    if (result.error && result.redirect) {
      router.push(result.redirect);
    } else if (result.success && result.isWishlisted !== undefined) {
      setIsWishlisted(result.isWishlisted);
    } else {
      setIsWishlisted(previousState); // Revert on fail
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading property details...</div>;
  }

  if (!property) return notFound();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Image Section */}
      <div className="relative h-[60vh] w-full bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="absolute top-24 left-6 md:left-12">
          <Link href="/properties" className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-xl transition-colors">
            <ArrowLeft size={16} /> Back to Search
          </Link>
        </div>

        <div className="absolute top-24 right-6 md:right-12 flex gap-3">
          <button 
            onClick={handleShare}
            className={`p-3 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white transition-all flex items-center justify-center ${copied ? 'rounded-xl px-4 gap-2' : 'rounded-full'}`}
            title="Share Property"
          >
            {copied ? (
              <>
                <Check size={18} className="text-green-400" />
                <span className="text-sm font-medium text-green-400">Copied!</span>
              </>
            ) : (
              <Share2 size={18} />
            )}
          </button>
          <button 
            onClick={handleWishlist}
            className="p-3 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 rounded-full text-white transition-colors group"
            title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
          >
            <Heart 
              size={18} 
              className={`transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'group-hover:text-red-400'}`} 
            />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-surface border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
                {property.type}
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{property.title}</h1>
              <div className="flex items-center gap-2 text-foreground-muted mb-8 text-lg">
                <MapPin size={20} className="text-primary" /> {property.location}
              </div>

              <h2 className="text-2xl font-heading font-bold mb-4">About this property</h2>
              <p className="text-foreground-muted leading-relaxed text-lg">
                {property.description}
              </p>

              {/* Host Section */}
              {property.host && (
                <div className="mt-12 pt-12 border-t border-white/5">
                  <h2 className="text-2xl font-heading font-bold mb-6">Meet your Host</h2>
                  <div className="flex flex-col sm:flex-row items-start gap-6 bg-white/5 rounded-2xl p-6 border border-white/5">
                    <div className="w-20 h-20 rounded-full bg-background border border-white/10 overflow-hidden flex items-center justify-center flex-shrink-0">
                      {property.host.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={property.host.avatarUrl} alt={property.host.name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={32} className="text-foreground-muted" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">{property.host.name}</h3>
                      <p className="text-foreground-muted text-sm leading-relaxed mb-4">
                        {property.host.bio || "This host hasn't provided a bio yet."}
                      </p>
                      <button className="text-sm font-medium text-primary hover:text-primary-hover transition-colors px-4 py-2 border border-primary/30 rounded-lg hover:bg-primary/10">
                        Contact Host
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-surface border border-white/5 rounded-3xl p-8 shadow-2xl">
              <p className="text-sm text-foreground-muted mb-1">Listed Price</p>
              <h3 className="text-3xl font-heading font-bold mb-8">{property.price}</h3>

              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary mb-4">
                  <Box size={32} />
                </div>
                <h4 className="font-heading font-semibold text-lg mb-2">Immersive 3D Tour</h4>
                <p className="text-sm text-foreground-muted mb-6">
                  {rooms.length > 0 
                    ? `Explore ${rooms.length} room${rooms.length > 1 ? 's' : ''} in high definition virtual reality.` 
                    : `This property doesn't have a 3D tour available yet.`}
                </p>
                <button 
                  onClick={() => setIsTourOpen(true)}
                  disabled={rooms.length === 0}
                  className="w-full bg-primary hover:bg-primary-hover text-foreground py-4 rounded-xl font-medium transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {rooms.length > 0 ? 'Start Virtual Tour' : 'Tour Unavailable'}
                </button>
              </div>


            </div>
          </div>

        </div>
      </div>

      {/* The Full Screen Virtual Tour Modal */}
      {isTourOpen && (
        <VirtualTourModal rooms={rooms} onClose={() => setIsTourOpen(false)} />
      )}

    </div>
  );
}
