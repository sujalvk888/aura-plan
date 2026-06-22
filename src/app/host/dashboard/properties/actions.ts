'use server'

import { redirect } from 'next/navigation';
import { createProperty, updateProperty, deleteProperty } from '@/lib/db';
import { getHostSession } from '@/lib/auth';
import { put } from '@vercel/blob';

async function processCoverImage(file: File | null): Promise<string | undefined> {
  if (!file || file.size === 0) return undefined;
  const fileName = `properties/${Date.now()}-property-${file.name.replace(/\s+/g, '-')}`;
  const blob = await put(fileName, file, { access: 'public' });
  return blob.url;
}

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
  
  const coverImageFile = formData.get('coverImage') as File | null;
  const coverImageUrl = await processCoverImage(coverImageFile);

  const newProperty = await createProperty({
    hostId: host.id,
    name,
    type,
    description,
    address,
    city,
    state,
    country,
    coverImageUrl
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

  const coverImageFile = formData.get('coverImage') as File | null;
  const coverImageUrl = await processCoverImage(coverImageFile);

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

  const file = formData.get('coverImage') as File | null;
  const coverImageUrl = await processCoverImage(file);

  if (coverImageUrl) {
    await updateProperty(id, host.id, { coverImageUrl });
  }
  
  redirect(`/host/dashboard/properties/${id}/edit`);
}
