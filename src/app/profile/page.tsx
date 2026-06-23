import { getUserSession, clearUserSession } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const user = await getUserSession();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background py-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2">My Profile</h1>
            <p className="text-foreground-muted">Update your account information and avatar.</p>
          </div>
          <form action={async () => {
            'use server';
            await clearUserSession();
            redirect('/login');
          }}>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-foreground-muted rounded-lg transition-colors text-sm font-medium border border-white/5">
              <LogOut size={16} /> Sign Out
            </button>
          </form>
        </div>

        {/* Edit Profile Form */}
        <ProfileForm user={user} />
        
        {/* Mobile Host Banner */}
        <div className="md:hidden mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-surface border border-primary/30 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-2xl rounded-full pointer-events-none"></div>
          <h3 className="text-xl font-heading font-semibold mb-2 relative z-10">Have space to share?</h3>
          <p className="text-sm text-foreground-muted mb-6 relative z-10">List your property and create immersive 3D experiences for potential buyers or renters.</p>
          <Link href="/host" className="w-full py-3 bg-primary text-background rounded-xl font-medium shadow-[0_4px_14px_0_rgb(0,0,0,0.39)] shadow-primary/50 hover:scale-105 transition-transform relative z-10">
            Switch to Host Workspace
          </Link>
        </div>
      </div>
    </div>
  );
}
