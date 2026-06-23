import { getHostSession } from "@/lib/auth";
import { getPropertiesByHost } from "@/lib/db";
import { removeProperty } from "./actions";
import { PlusCircle, Building, MapPin, Trash2, Edit2, Eye } from "lucide-react";
import Link from "next/link";
import { Property } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function PropertiesPage() {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  const properties = await getPropertiesByHost(host.id);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">My Properties</h1>
          <p className="text-foreground-muted">Manage your virtual property portfolio.</p>
        </div>
        <Link 
          href="/host/dashboard/properties/new" 
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-[#FFF8E7] px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-primary/20 mt-1"
        >
          <PlusCircle size={18} /> Add New Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-20 bg-surface border border-white/5 rounded-2xl">
          <Building className="mx-auto h-16 w-16 text-foreground-muted/30 mb-6" />
          <h3 className="text-2xl font-heading font-medium mb-3">No properties found</h3>
          <p className="text-foreground-muted max-w-md mx-auto mb-8">
            You don&apos;t have any properties in your workspace yet. Add your first property to start creating virtual 3D experiences.
          </p>
          <Link 
            href="/host/dashboard/properties/new" 
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-foreground px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <PlusCircle size={18} /> Create First Property
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop: Property) => (
            <div key={prop.id} className="bg-surface border border-white/5 rounded-2xl overflow-hidden group hover:border-white/20 transition-all">
              <div className="h-48 bg-background/50 flex items-center justify-center border-b border-white/5 relative overflow-hidden">
                {prop.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={prop.coverImageUrl} alt={prop.name} className="w-full h-full object-cover" />
                ) : (
                  <Building className="text-foreground-muted/20" size={64} />
                )}
                <div className="absolute top-4 right-4 bg-[#140F0A]/75 backdrop-blur-[4px] border border-white/10 px-3 py-1 rounded-full text-xs font-medium text-[#FFF8E7]">
                  {prop.type}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-heading text-xl font-semibold">{prop.name}</h3>
                    {prop.isPublished ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-green-500/30 text-white px-2 py-0.5 rounded-full border border-green-500/20">Published</span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/50 px-2 py-0.5 rounded-full border border-white/10">Draft</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#E8E4DF] bg-white/5 w-fit px-3 py-1.5 rounded-full mb-4">
                  <MapPin size={12} />
                  {prop.city}, {prop.country}
                </div>
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
                  {prop.isPublished && (
                    <Link href={`/properties/${prop.id}`} target="_blank" className="p-2 text-[#E8E4DF] hover:text-white hover:bg-white/10 rounded-lg transition-colors mr-auto flex items-center gap-2" title="View Public Page">
                      <Eye size={18} />
                      <span className="text-xs font-medium">View Live</span>
                    </Link>
                  )}
                  <Link href={`/host/dashboard/properties/${prop.id}/edit`} className="p-2 text-foreground-muted hover:text-foreground hover:bg-white/5 rounded-lg transition-colors" title="Edit Property">
                    <Edit2 size={18} />
                  </Link>
                  <form action={async () => {
                    'use server'
                    await removeProperty(prop.id)
                  }}>
                    <button type="submit" className="p-2 text-[#E07A5F] hover:text-[#E07A5F]/80 hover:bg-[#E07A5F]/10 rounded-lg transition-colors" title="Delete Property">
                      <Trash2 size={18} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
