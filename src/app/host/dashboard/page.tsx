import { getHostSession } from "@/lib/auth";
import { getPropertiesByHost } from "@/lib/db";
import { Building2, Eye, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Property } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function DashboardOverview() {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  const properties = await getPropertiesByHost(host.id);
  
  // Placeholder stats
  const totalProperties = properties.length;
  const publishedProperties = Math.max(0, totalProperties - 1); // dummy logic
  const draftProperties = totalProperties > 0 ? 1 : 0; // dummy logic

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-bold mb-2">Welcome back, {host?.name}</h1>
        <p className="text-foreground-muted">Here is an overview of your virtual property portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-surface border border-white/5 p-6 rounded-2xl flex items-center gap-6">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            <Building2 size={28} />
          </div>
          <div>
            <p className="text-foreground-muted text-sm font-medium mb-1">Total Properties</p>
            <p className="text-4xl font-heading font-bold text-[#FFF8E7]">{totalProperties}</p>
          </div>
        </div>

        <div className="bg-surface border border-white/5 p-6 rounded-2xl flex items-center gap-6">
          <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500">
            <Eye size={28} />
          </div>
          <div>
            <p className="text-foreground-muted text-sm font-medium mb-1">Published (Live)</p>
            <p className="text-4xl font-heading font-bold text-[#FFF8E7]">{publishedProperties}</p>
          </div>
        </div>

        <div className="bg-surface border border-white/5 p-6 rounded-2xl flex items-center gap-6">
          <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
            <PlusCircle size={28} />
          </div>
          <div>
            <p className="text-foreground-muted text-sm font-medium mb-1">Drafts</p>
            <p className="text-4xl font-heading font-bold text-[#FFF8E7]">{draftProperties}</p>
          </div>
        </div>
      </div>

      {/* Recent Properties Placeholder or List */}
      <div className="bg-[#0D0A08] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-heading font-semibold">Recent Properties</h2>
          <Link href="/host/dashboard/properties" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="p-6">
          {totalProperties === 0 ? (
            <div className="text-center py-12">
              <Building2 className="mx-auto h-12 w-12 text-foreground-muted/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No properties yet</h3>
              <p className="text-foreground-muted text-sm mb-6 max-w-sm mx-auto">
                You haven&apos;t added any properties to your workspace. Create your first property to start building virtual experiences.
              </p>
              <Link 
                href="/host/dashboard/properties/new" 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-foreground px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <PlusCircle size={18} /> Add Property
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {properties.slice(0, 3).map((prop: Property) => (
                <div key={prop.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors bg-surface">
                  <div>
                    <h4 className="font-medium text-[#FFF8E7]">{prop.name}</h4>
                    <p className="text-sm text-foreground-muted">{prop.address}, {prop.city}</p>
                  </div>
                  <Link href={`/host/dashboard/properties`} className="px-4 py-2 bg-transparent border border-[#FFF8E7] text-[#FFF8E7] hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
                    Manage
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
