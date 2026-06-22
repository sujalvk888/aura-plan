import RoomBuilderWizard from "@/components/host/RoomBuilderWizard";
import { getHostSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  const { id } = await params;

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto h-[calc(100vh-60px)] flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <Link href={`/host/dashboard/properties/${id}/rooms`} className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Rooms
        </Link>
        <h1 className="text-3xl font-heading font-bold">Build Room Experience</h1>
        <p className="text-foreground-muted text-sm mt-1">Upload surfaces and define dimensions to generate an immersive interior view.</p>
      </div>

      <div className="flex-1 min-h-0">
        <RoomBuilderWizard propertyId={id} />
      </div>
    </div>
  );
}
