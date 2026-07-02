import sharp from "sharp";
import cloudinary from "../config/cloudinary";

/**
 * Konversi buffer gambar apapun (JPEG/PNG/WebP/dll) ke WebP
 * menggunakan sharp, lalu upload ke Cloudinary.
 *
 * @param buffer  - Buffer gambar asli dari multer memoryStorage
 * @param folder  - Folder tujuan di Cloudinary
 * @returns       - secure_url hasil upload
 */
export async function uploadImage(buffer: Buffer | Uint8Array, folder = "kegiatan"): Promise<string> {
  // Normalize ke Buffer (multer v2 bisa mengembalikan Uint8Array)
  const buf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);

  // Konversi ke WebP dengan kualitas 82 (keseimbangan kualitas & ukuran file)
  const webpBuffer = await sharp(buf).webp({ quality: 82 }).toBuffer();

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          format: "webp",
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(new Error(error.message ?? "Cloudinary upload gagal"));
          if (!result) return reject(new Error("Cloudinary tidak mengembalikan hasil upload"));
          resolve(result.secure_url);
        },
      )
      .end(webpBuffer);
  });
}

export async function deleteImage(imageUrl: string): Promise<void> {
  const publicId = imageUrl
    .split("/")
    .slice(-2)
    .join("/")
    .replace(/\.[^.]+$/, "");
  await cloudinary.uploader.destroy(publicId);
}
