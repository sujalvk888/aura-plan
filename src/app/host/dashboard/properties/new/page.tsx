import { addProperty } from "../actions";
import { ArrowLeft, Box } from "lucide-react";
import Link from "next/link";

import { getHostSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AddPropertyPage() {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <Link href="/host/dashboard/properties" className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Properties
      </Link>
      
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-bold mb-2">Add New Property</h1>
        <p className="text-foreground-muted">Enter the details of your property to create a new virtual experience.</p>
      </div>

      <div className="max-w-3xl">
        <div className="space-y-8">
          <form action={addProperty}>
            {/* Cover Image Section */}
            <div className="bg-surface border-2 border-dashed border-white/15 rounded-2xl p-8 mb-8 flex flex-col items-center justify-center text-center">
              <h2 className="text-xl font-heading font-semibold mb-4">Cover Image</h2>
              <div className="space-y-4">
                <input 
                  type="file" 
                  name="coverImage" 
                  accept="image/*" 
                  required 
                  className="block w-full text-sm text-[#FFF8E7]/60 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border file:border-primary file:text-sm file:font-semibold file:bg-primary file:text-[#FFF8E7] hover:file:bg-primary-hover file:cursor-pointer transition-colors" 
                />
                <p className="text-xs text-[#E8E4DF]">Upload a high-quality thumbnail for this property.</p>
              </div>
            </div>

            {/* Basic Information Form */}
            <div className="bg-surface border border-white/5 rounded-2xl p-8">
              <h2 className="text-xl font-heading font-semibold mb-6">Basic Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Property Name</label>
                    <input type="text" name="name" required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors" placeholder="e.g. Modern Villa" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Property Type</label>
                    <select name="type" required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors appearance-none">
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea name="description" rows={4} required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Describe the property..."></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                    <input type="text" name="address" required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors" placeholder="Street Address" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">City</label>
                    <input type="text" name="city" required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors" placeholder="City" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">State / Region</label>
                    <input type="text" name="state" required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors" placeholder="State" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                    <input type="text" name="country" required className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#FFF8E7] focus:outline-none focus:border-primary transition-colors" placeholder="Country" />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 mt-8 flex justify-end">
                  <button type="submit" className="flex items-center gap-2 bg-primary text-[#FFF8E7] px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-primary/20">
                    Next: Add 3D Rooms
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
