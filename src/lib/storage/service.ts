import { deleteImage, uploadImage } from "./cloudinary";

export async function uploadProductImage(file: File): Promise<string> {
  return uploadImage(file);
}

export async function removeStoredImage(url: string): Promise<void> {
  const { extractPublicId } = await import("./cloudinary");
  const publicId = extractPublicId(url);
  if (publicId) {
    await deleteImage(publicId);
  }
}
