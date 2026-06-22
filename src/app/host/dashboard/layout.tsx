import Sidebar from "@/components/host/Sidebar";
import { getHostSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Host Workspace | AuraPlan",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const host = await getHostSession();
  
  if (!host) {
    redirect('/host/login');
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground font-sans z-50 relative">
      <Sidebar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
