import { editProperty, togglePublish, uploadCoverImage } from "../../actions";
import { Building, MapPin, AlignLeft, Image as ImageIcon, Save, ArrowLeft, Box, Upload, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { Property } from "@prisma/client";
import { getHostSession } from "@/lib/auth";
import { getPropertiesByHost } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  const { id } = await params;
  const properties = await getPropertiesByHost(host.id);
  const property = properties.find((p: Property) => p.id === id);

  if (!property) return notFound();

  // Create bound action to pass the id
  const updateAction = editProperty.bind(null, id);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <Link href="/host/dashboard/properties" className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Properties
      </Link>
      
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">Edit Property</h1>
          <p className="text-foreground-muted">Update the details of your property.</p>
        </div>
        
        <form action={async () => {
          'use server';
          await togglePublish(id, !property.isPublished);
          redirect(`/host/dashboard/properties/${id}/edit`);
        }}>
          <button 
            type="submit"
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${property.isPublished ? 'bg-green-500/30 text-[#FFF8E7] hover:bg-green-500/40' : 'bg-white/10 text-[#FFF8E7] hover:bg-white/20'}`}
          >
            {property.isPublished ? (
              <><CheckCircle2 size={18} /> Published</>
            ) : (
              <><XCircle size={18} /> Draft</>
            )}
          </button>
        </form>
      </div>

      <div className="max-w-3xl">
        <div className="space-y-8">
          
          {/* Cover Image Section */}
          <div className="bg-surface border border-white/5 rounded-2xl p-4 md:p-8">
            <h2 className="text-xl font-heading font-semibold mb-6">Cover Image</h2>
            <div className="flex flex-col md:flex-row gap-6 md:items-start">
              <div className="w-full h-48 md:w-48 md:h-32 bg-black rounded-lg overflow-hidden flex-shrink-0 border border-white/15 flex items-center justify-center relative">
                {property.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={property.coverImageUrl} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-white/30">No Image</span>
                )}
              </div>
              <form action={uploadCoverImage.bind(null, id)} className="flex-1 space-y-3 w-full flex flex-col md:items-start justify-center">
                <input 
                  type="file" 
                  name="coverImage" 
                  accept="image/jpeg, image/png, image/webp"
                  className="block w-full text-sm text-[#FFF8E7]/60 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border file:border-primary file:text-sm file:font-semibold file:bg-primary file:text-[#FFF8E7] hover:file:bg-primary-hover file:cursor-pointer transition-colors" 
                  required
                />
                <button type="submit" className="w-full md:w-auto justify-center bg-primary hover:bg-primary-hover text-[#FFF8E7] px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg">
                  <Upload size={16} /> Upload New Cover
                </button>
              </form>
            </div>
          </div>

          <div className="bg-surface border border-white/5 rounded-2xl p-4 md:p-8">
            <h2 className="text-xl font-heading font-semibold mb-6">Basic Information</h2>
            
            <form action={updateAction} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Property Name</label>
                  <input type="text" name="name" defaultValue={property.name} required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Property Type</label>
                  <select name="type" defaultValue={property.type} required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea name="description" defaultValue={property.description} rows={4} required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                  <input type="text" name="address" defaultValue={property.address} required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">City</label>
                  <input type="text" name="city" defaultValue={property.city} required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">State / Region</label>
                  <input type="text" name="state" defaultValue={property.state} required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                  <input type="text" name="country" defaultValue={property.country} required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-8 flex justify-end">
                <button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary-hover text-[#FFF8E7] px-8 py-3.5 rounded-full font-bold transition-colors shadow-lg shadow-primary/20">
                  Update Property Details
                </button>
              </div>
            </form>
          </div>

          <div className="bg-[#1C1610] border border-primary/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-6 relative overflow-hidden mt-10">
            <div className="absolute inset-0 bg-primary/5"></div>
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-16 h-16 bg-primary/30 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                <Box size={32} />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold mb-1 text-primary">3D Room Builder</h3>
                <p className="text-foreground-muted text-sm leading-relaxed max-w-md">
                  Create immersive 3D rooms, map surfaces, and build full virtual tours for this property.
                </p>
              </div>
            </div>
            <div className="relative z-10">
              <Link 
                href={`/host/dashboard/properties/${id}/rooms`}
                className="bg-primary hover:bg-primary-hover text-[#FFF8E7] px-6 py-3.5 rounded-full font-bold transition-colors shadow-lg shadow-primary/20 whitespace-nowrap"
              >
                Manage 3D Rooms
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
