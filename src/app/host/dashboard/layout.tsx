import DashboardClientLayout from "@/components/host/DashboardClientLayout";
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
    <DashboardClientLayout>
      {children}
    </DashboardClientLayout>
  );
}
