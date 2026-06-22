import { getUserSession } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import PropertyCard from "@/components/PropertyCard";
import { Heart, Home } from "lucide-react";
import Link from "next/link";

export default async function WishlistPage() {
  const user = await getUserSession();
  
  if (!user) {
    redirect('/login?redirect=/wishlist');
  }

  // Fetch wishlisted properties
  const wishlists = await prisma.wishlist.findMany({
    where: { userId: user.id },
    include: {
      property: {
        include: {
          rooms: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const properties = wishlists.map((w: any) => w.property);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold mb-4 flex items-center gap-3">
            <Heart className="text-red-500 fill-red-500" size={36} /> My Wishlist
          </h1>
          <p className="text-foreground-muted text-lg">
            Your personal collection of saved virtual properties.
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="bg-surface border border-white/5 rounded-3xl p-16 text-center max-w-2xl mx-auto shadow-2xl">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-foreground-muted">
              <Home size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-foreground-muted mb-8 text-lg">
              Start exploring properties and click the heart icon to save your favorites here.
            </p>
            <Link href="/properties" className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-foreground font-medium rounded-xl transition-colors shadow-lg shadow-primary/20">
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {properties.map(property => (
              <Link href={`/properties/${property.id}`} key={property.id} className="block group">
                <PropertyCard 
                  id={property.id}
                  title={property.name}
                  type={property.type}
                  location={`${property.city}, ${property.country}`}
                  imageUrl={property.coverImageUrl || (property.rooms.length > 0 ? property.rooms[0].front : '/placeholder.jpg')}
                  isWishlisted={true} // It's in their wishlist
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
