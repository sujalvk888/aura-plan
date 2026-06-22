import PropertyCard from "@/components/PropertyCard";
import PropertySearch from "@/components/PropertySearch";
import { getAllProperties, prisma } from "@/lib/db";
import { getUserSession } from "@/lib/userAuth";
import Link from "next/link";

export const metadata = {
  title: "Explore Properties | AuraPlan",
};

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<{ q?: string; type?: string }> }) {
  const params = await searchParams;
  const dbProperties = await getAllProperties(params.q, params.type);
  const user = await getUserSession();
  
  // Get user's wishlisted property IDs
  let wishlistedIds = new Set<string>();
  if (user) {
    const wishlists = await prisma.wishlist.findMany({
      where: { userId: user.id },
      select: { propertyId: true }
    });
    wishlistedIds = new Set(wishlists.map((w: { propertyId: string }) => w.propertyId));
  }
  
  // Transform db properties
  const mappedDbProps = dbProperties.map(p => ({
    id: p.id,
    title: p.name,
    type: p.type,
    location: `${p.city}, ${p.country}`,
    imageUrl: p.coverImageUrl || (p.rooms.length > 0 ? p.rooms[0].front : "/placeholder.jpg"),
    isWishlisted: wishlistedIds.has(p.id)
  }));

  const allProperties = [...mappedDbProps];

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] w-full">
      {/* Header Section */}
      <div className="bg-surface border-b border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Explore Properties
          </h1>
          <p className="text-foreground-muted text-lg max-w-2xl">
            Discover incredible spaces from around the world through immersive 3D virtual explorations.
          </p>

          <PropertySearch />
        </div>
      </div>

      {/* Grid Section */}
      <div className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProperties.map((property) => (
            <Link href={`/properties/${property.id}`} key={property.id} className="block group">
              <PropertyCard 
                id={property.id}
                title={property.title}
                type={property.type}
                location={property.location}
                imageUrl={property.imageUrl}
                isWishlisted={property.isWishlisted}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
