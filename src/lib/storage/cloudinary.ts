import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function uploadImage(file: File): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error("No se recibió ninguna imagen.");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      `Formato de imagen no soportado: ${file.type}. Usá JPEG, PNG, WebP o GIF.`
    );
  }

  const sizeInMb = file.size / (1024 * 1024);
  if (sizeInMb > MAX_FILE_SIZE_MB) {
    throw new Error(
      `La imagen es demasiado grande (${sizeInMb.toFixed(1)} MB). El máximo es ${MAX_FILE_SIZE_MB} MB.`
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "resto-menu-online" },
      (error, result) => {
        if (error) {
          reject(new Error(`Cloudinary: ${error.message}`));
        } else if (!result) {
          reject(new Error("Cloudinary no devolvió una URL."));
        } else {
          resolve(result.secure_url);
        }
      }
    );

    stream.on("error", (error) => {
      reject(new Error(`Cloudinary stream: ${error.message}`));
    });

    stream.end(buffer);
  });
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function extractPublicId(url: string): string | null {
  try {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    const [publicId] = fileName.split(".");
    return publicId ? `resto-menu-online/${publicId}` : null;
  } catch {
    return null;
  }
}
