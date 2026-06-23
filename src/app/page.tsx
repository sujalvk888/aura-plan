import Image from "next/image";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { getAllProperties } from "@/lib/db";
import { ArrowRight, Eye, Layers, Compass } from "lucide-react";

export default async function Home() {
  const dbProperties = await getAllProperties();
  const featuredProperties = dbProperties.slice(0, 3).map(p => ({
    id: p.id,
    name: p.name,
    location: `${p.city}, ${p.country}`,
    imageUrl: p.coverImageUrl || (p.rooms.length > 0 ? p.rooms[0].front : "/uploads/rooms/placeholder.jpg")
  }));

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/hero.png"
            alt="Luxury Villa Virtual Tour"
            fill
            className="object-cover"
            priority
          />
          {/* Stronger dark gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center mt-20">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-surface/80 border border-white/20 backdrop-blur-md mb-10 shadow-xl shadow-black/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            </span>
            <span className="text-xs font-medium text-foreground tracking-[0.2em] uppercase">Next-Generation Real Estate</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[88px] font-heading font-extrabold text-foreground mb-8 leading-[0.95] tracking-tight drop-shadow-2xl">
            Experience Spaces <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-primary brightness-125 drop-shadow-[0_0_30px_rgba(var(--primary),0.3)]">
              Before You Arrive
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground-muted mb-12 max-w-[700px] mx-auto leading-relaxed">
            AuraPlan transforms static listings into immersive virtual environments. Walk through homes, apartments, and commercial spaces exactly as if you were there.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/properties" 
              className="flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-foreground px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_30px_rgba(var(--primary),0.4)] w-full sm:w-auto"
            >
              Start Exploring <ArrowRight size={20} />
            </Link>
            <Link 
              href="#about" 
              className="flex items-center justify-center gap-3 bg-surface/50 hover:bg-surface border border-white/20 hover:border-white/40 text-foreground px-10 py-5 rounded-full text-lg font-medium transition-all duration-300 backdrop-blur-md hover:-translate-y-1 w-full sm:w-auto"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="pt-16 pb-24 bg-background relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground mb-6 tracking-tight">
              A New Dimension in Property Browsing
            </h2>
            <p className="text-foreground-muted text-xl leading-relaxed">
              Stop guessing room sizes from 2D photos. Our platform gives you the true feeling of space, layout, and atmosphere from the comfort of your screen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Compass className="text-primary" size={36} />,
                title: "Navigate Freely",
                description: "Move naturally from room to room. Understand the flow and connections of the entire property."
              },
              {
                icon: <Eye className="text-primary" size={36} />,
                title: "True Spatial Feel",
                description: "Experience realistic proportions and lighting. See exactly how a space looks and feels."
              },
              {
                icon: <Layers className="text-primary" size={36} />,
                title: "Interactive Layouts",
                description: "Jump instantly to any room using our intuitive floorplan and 3D layout maps."
              }
            ].map((feature, index) => (
              <div key={index} className="p-10 rounded-3xl bg-surface/80 border border-white/10 hover:border-primary/40 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 group">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-foreground-muted text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="pt-12 pb-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-6 tracking-tight">
                Featured Spaces
              </h2>
              <p className="text-foreground-muted text-xl max-w-2xl leading-relaxed">
                Discover a curated selection of some of our most stunning virtual properties. 
                Step inside and see the future of real estate visualization.
              </p>
            </div>
            <Link 
              href="/properties" 
              className="text-primary hover:text-primary-hover font-medium flex items-center gap-2 transition-all hover:translate-x-2 whitespace-nowrap text-lg"
            >
              View All Properties <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
      <section className="py-16 relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-[3rem] p-16 md:p-24 shadow-2xl shadow-black/40">
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground mb-8 tracking-tight">
              Ready to step inside?
            </h2>
            <Link 
              href="/properties" 
              className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-12 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 hover:bg-white shadow-[0_10px_40px_rgba(255,255,255,0.2)]"
            >
              Start Exploring Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
