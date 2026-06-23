import { getHostSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import HostSettingsForm from "./HostSettingsForm";
import Link from "next/link";
import { logout } from "@/app/host/actions";
import { LogOut, Home } from "lucide-react";

export const metadata = {
  title: "Account Settings | AuraPlan Host",
};

export default async function HostSettingsPage() {
  const host = await getHostSession();
  
  if (!host) {
    redirect('/host/login');
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Account Settings</h1>
        <p className="text-foreground-muted">Manage your host profile details and public identity.</p>
      </div>

      <HostSettingsForm host={host} />

      <div className="mt-12 pt-10 border-t border-white/5 flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-surface hover:bg-white/5 border border-white/10 rounded-xl font-medium transition-colors"
        >
          <Home size={20} />
          Switch to User Interface
        </Link>
        
        <form action={logout} className="flex-1 flex">
          <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl font-medium transition-colors"
          >
            <LogOut size={20} />
            Logout from Host
          </button>
        </form>
      </div>
    </div>
  );
}
