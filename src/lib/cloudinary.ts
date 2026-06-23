import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a standard File object to Cloudinary securely via memory streams.
 * This completely avoids writing to the local disk, making it safe for Vercel.
 *
 * @param file The File object from FormData
 * @param folder The folder name in Cloudinary
 * @returns The secure URL string of the uploaded image
 */
export async function uploadImageToCloudinary(file: File | null, folder: string = 'aura-plan'): Promise<string | undefined> {
  if (!file || file.size === 0) return undefined;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder },
      (error, result: UploadApiResponse | undefined) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error("Unknown Cloudinary error"));
        }
      }
    );

    uploadStream.end(buffer);
  });
}
