import Link from 'next/link';
import Image from 'next/image';
import { Building2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Host on AuraPlan | Showcase Your Properties",
};

export default function HostLandingPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background relative">
      {/* Host Landing Navbar */}
      <header className="w-full h-20 flex items-center justify-between px-6 border-b border-white/5 bg-surface/30 backdrop-blur-md absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <Image src="/logo.png" alt="AuraPlan Logo" width={32} height={32} className="object-contain" />
          </div>
          <span className="text-xl font-heading font-semibold tracking-wide text-foreground">
            AuraPlan <span className="text-[#E8C39E] ml-1">Host</span>
          </span>
        </div>
        <Link href="/" className="text-sm font-medium px-4 py-2 leading-none bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-foreground transition-all flex items-center gap-2">
          ← Back to User App
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 pt-32 pb-24">
        <div className="max-w-3xl w-full text-center">
          <div className="inline-flex items-center justify-center px-8 py-4 rounded-[20px] bg-surface border border-white/10 shadow-2xl mb-8">
            <Building2 size={32} className="text-[#FFF8E7]" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
          Showcase Properties in a Whole New Way
        </h1>
        
        <p className="text-xl text-[#FFF8E7]/80 mb-12 max-w-[650px] mx-auto leading-[1.6]">
          Join AuraPlan as a Host and transform your static property listings into immersive 3D virtual experiences. Give your clients the power to truly explore.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/host/register" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-[#FFF8E7] px-8 py-4 rounded-[12px] font-medium transition-all shadow-lg shadow-primary/20"
          >
            Register as Host <ArrowRight size={18} />
          </Link>
          
          <Link 
            href="/host/login" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-primary/10 border border-primary text-foreground px-8 py-4 rounded-[12px] font-medium transition-all box-border"
          >
            Sign In to Workspace
          </Link>
        </div>
      </div>
      
      <div className="mt-32 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-left items-stretch">
        <div className="p-[36px] rounded-2xl bg-surface border border-white/5 flex flex-col h-full">
          <h3 className="text-[22px] font-heading font-semibold text-[#FFF8E7] mb-4">Complete Isolation</h3>
          <p className="text-[#E8E4DF] text-sm leading-[1.6]">Your properties are secure in your own private workspace. Manage your portfolio with complete privacy and control.</p>
        </div>
        <div className="p-[36px] rounded-2xl bg-surface border border-white/5 flex flex-col h-full">
          <h3 className="text-[22px] font-heading font-semibold text-[#FFF8E7] mb-4">Immersive 3D</h3>
          <p className="text-[#E8E4DF] text-sm leading-[1.6]">Soon you&apos;ll be able to create stunning 3D room layouts directly from your browser, offering true spatial feeling.</p>
        </div>
        <div className="p-[36px] rounded-2xl bg-surface border border-white/5 flex flex-col h-full">
          <h3 className="text-[22px] font-heading font-semibold text-[#FFF8E7] mb-4">Better Engagement</h3>
          <p className="text-[#E8E4DF] text-sm leading-[1.6]">Properties with virtual explorations receive significantly more engagement and higher quality leads than static photos alone.</p>
        </div>
      </div>
      </div>
    </div>
  );
}
