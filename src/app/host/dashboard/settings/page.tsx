import { getHostSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import HostSettingsForm from "./HostSettingsForm";

export const metadata = {
  title: "Account Settings | AuraPlan Host",
};

export default async function HostSettingsPage() {
  const host = await getHostSession();
  
  if (!host) {
    redirect('/host/login');
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-bold mb-2">Account Settings</h1>
        <p className="text-foreground-muted">Manage your host profile details and public identity.</p>
      </div>

      <HostSettingsForm host={host} />
    </div>
  );
}
