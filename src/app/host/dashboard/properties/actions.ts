'use server'

import { redirect } from 'next/navigation';
import { createProperty, updateProperty, deleteProperty } from '@/lib/db';
import { getHostSession } from '@/lib/auth';

export async function addProperty(formData: FormData) {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  const name = formData.get('name') as string;
  const type = formData.get('type') as string;
  const description = formData.get('description') as string;
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const state = formData.get('state') as string;
  const country = formData.get('country') as string;
  
  const coverImageUrl = formData.get('coverImageUrl') as string | null;

  const newProperty = await createProperty({
    hostId: host.id,
    name,
    type,
    description,
    address,
    city,
    state,
    country,
    ...(coverImageUrl && { coverImageUrl })
  });

  redirect(`/host/dashboard/properties/${newProperty.id}/edit`);
}

export async function removeProperty(id: string) {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  await deleteProperty(id, host.id);
  // Need to revalidate path or simply redirect
  redirect('/host/dashboard/properties');
}

export async function editProperty(id: string, formData: FormData) {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  const name = formData.get('name') as string;
  const type = formData.get('type') as string;
  const description = formData.get('description') as string;
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const state = formData.get('state') as string;
  const country = formData.get('country') as string;

  const coverImageUrl = formData.get('coverImageUrl') as string | null;

  const updateData = {
    name,
    type,
    description,
    address,
    city,
    state,
    country,
    ...(coverImageUrl && { coverImageUrl })
  };

  await updateProperty(id, host.id, updateData);

  redirect(`/host/dashboard/properties/${id}/edit`);
}

export async function togglePublish(id: string, isPublished: boolean) {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  await updateProperty(id, host.id, { isPublished });
  // no redirect needed, handled by form or client
}

export async function uploadCoverImage(id: string, formData: FormData) {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  const coverImageUrl = formData.get('coverImageUrl') as string | null;

  if (coverImageUrl) {
    await updateProperty(id, host.id, { coverImageUrl });
  }
  
  redirect(`/host/dashboard/properties/${id}/edit`);
}
