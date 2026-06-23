import { getUserSession, clearUserSession } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
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
        
      </div>
    </div>
  );
}
