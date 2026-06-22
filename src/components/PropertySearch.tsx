'use client'

import { Search, Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PropertySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentType = searchParams?.get('type') || 'All';
  const qParam = searchParams?.get('q') || '';

  const [query, setQuery] = useState(qParam);
  const [lastQParam, setLastQParam] = useState(qParam);
  const [showFilters, setShowFilters] = useState(false);

  // Sync state if URL changes externally (without useEffect cascade)
  if (qParam !== lastQParam) {
    setLastQParam(qParam);
    setQuery(qParam);
  }

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (query) params.set('q', query);
    else params.delete('q');
    
    if (currentType && currentType !== 'All') params.set('type', currentType);
    else params.delete('type');
    
    router.push(`/properties?${params.toString()}`);
  };

  const propertyTypes = ['All', 'Residential', 'Commercial', 'Villa', 'Apartment', 'Studio'];

  return (
    <div className="mt-8 flex flex-col gap-4 max-w-3xl">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground">
            <Search size={20} />
          </button>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by location, property type, or name..." 
            className="w-full bg-background border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <button 
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2 border px-6 py-3.5 rounded-xl font-medium transition-colors ${showFilters ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-white/5 hover:bg-white/10 border-white/10 text-foreground'}`}
        >
          <Filter size={20} /> Filters
        </button>
      </form>

      {showFilters && (
        <div className="p-6 bg-surface/80 border border-white/10 rounded-xl animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">Property Type</h3>
            <button onClick={() => setShowFilters(false)} className="text-foreground-muted hover:text-foreground">
              <X size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  const params = new URLSearchParams(searchParams?.toString() || '');
                  if (t !== 'All') params.set('type', t);
                  else params.delete('type');
                  
                  if (query) params.set('q', query);
                  else params.delete('q');
                  
                  router.push(`/properties?${params.toString()}`);
                  setShowFilters(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${currentType === t ? 'bg-primary text-foreground border-primary' : 'bg-background border-white/10 text-foreground-muted hover:text-foreground hover:border-white/20'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
