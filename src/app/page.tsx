import Image from "next/image";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { getAllProperties } from "@/lib/db";
import { ArrowRight, Eye, Layers, Compass } from "lucide-react";

export default async function Home() {
  const dbProperties = await getAllProperties();
  let featuredProperties = dbProperties.slice(0, 3).map(p => ({
    id: p.id,
    name: p.name,
    location: `${p.city}, ${p.country}`,
    imageUrl: p.coverImageUrl || (p.rooms.length > 0 ? p.rooms[0].front : "/uploads/rooms/placeholder.jpg")
  }));

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/hero.png"
            alt="Luxury Villa Virtual Tour"
            fill
            className="object-cover"
            priority
          />
          {/* Dark gradient overlay with rich brown tint to ensure text readability and add depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A120B]/80 via-[#1A120B]/60 to-background" />
          {/* Subtle radial glow to break up flat darkness */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-white/10 backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-medium text-foreground-muted tracking-wider uppercase">Next-Generation Real Estate</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-heading font-bold text-foreground mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
            Experience Spaces <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] to-[#FFE0A3]">Before You Arrive</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#E8E4DF] mb-12 max-w-3xl mx-auto leading-loose font-light">
            AuraPlan transforms static listings into immersive virtual environments. Walk through homes, apartments, and commercial spaces exactly as if you were there.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/properties" 
              className="flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-[#FFF8E7] px-12 py-5 rounded-full text-lg font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
            >
              Start Exploring <ArrowRight size={20} />
            </Link>
            <Link 
              href="#about" 
              className="flex items-center justify-center gap-2 bg-surface/50 hover:bg-surface border border-white/10 text-[#FFF8E7] px-10 py-5 rounded-full text-lg font-medium transition-all backdrop-blur-md"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 md:py-40 bg-background relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              A New Dimension in Property Browsing
            </h2>
            <p className="text-foreground-muted text-lg">
              Stop guessing room sizes from 2D photos. Our platform gives you the true feeling of space, layout, and atmosphere from the comfort of your screen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Compass className="text-[#FFF8E7] mb-4" size={32} />,
                title: "Navigate Freely",
                description: "Move naturally from room to room. Understand the flow and connections of the entire property."
              },
              {
                icon: <Eye className="text-[#FFF8E7] mb-4" size={32} />,
                title: "True Spatial Feel",
                description: "Experience realistic proportions and lighting. See exactly how a space looks and feels."
              },
              {
                icon: <Layers className="text-[#FFF8E7] mb-4" size={32} />,
                title: "Detailed Property Information",
                description: "Access comprehensive data about every property, from amenities and dimensions to neighborhood highlights."
              }
            ].map((feature, index) => (
              <div key={index} className="p-10 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-colors shadow-lg">
                {feature.icon}
                <h3 className="text-2xl font-heading font-semibold text-[#FFF8E7] mb-4">{feature.title}</h3>
                <p className="text-[#E8E4DF] text-lg leading-loose">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-32 md:py-40 bg-surface/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Featured Spaces
              </h2>
              <p className="text-foreground-muted max-w-2xl">
                Discover a curated selection of some of our most stunning virtual properties. 
                Step inside and see the future of real estate visualization.
              </p>
            </div>
            <Link 
              href="/properties" 
              className="text-[#FFF8E7] hover:text-primary font-semibold flex items-center gap-2 transition-colors whitespace-nowrap text-lg tracking-wide"
            >
              View All Properties <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Link href={`/properties/${property.id}`} key={property.id} className="block group">
                <PropertyCard 
                  id={property.id}
                  title={property.name}
                  type="Virtual Tour"
                  location={property.location}
                  imageUrl={property.imageUrl}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-[#FFF8E7] mb-10 drop-shadow-lg">
            Ready to step inside?
          </h2>
          <Link 
            href="/properties" 
            className="inline-flex items-center gap-3 bg-[#FFF8E7] text-[#1A120B] px-14 py-6 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_80px_-10px_rgba(255,255,255,0.6)]"
          >
            Start Exploring Properties <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}
