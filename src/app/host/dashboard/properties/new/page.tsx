import NewPropertyForm from "./NewPropertyForm";
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
        <NewPropertyForm />
      </div>
    </div>
  );
}
