import sharp from "sharp";
import cloudinary from "../config/cloudinary";

/**
 * Konversi buffer gambar apapun (webp/PNG/WebP/dll) ke WebP
 * menggunakan sharp, lalu upload ke Cloudinary.
 *
 * @param buffer  - Buffer gambar asli dari multer memoryStorage
 * @param folder  - Folder tujuan di Cloudinary
 * @returns       - secure_url hasil upload
 */
export async function uploadImage(buffer: Buffer, folder = "kegiatan"): Promise<string> {
  // Konversi ke WebP dengan kualitas 82 (keseimbangan kualitas & ukuran file)
  const webpBuffer = await sharp(buffer).webp({ quality: 82 }).toBuffer();

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          format: "webp",
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) return reject(error);
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
