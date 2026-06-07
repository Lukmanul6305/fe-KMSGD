import cloudinary from "../config/cloudinary";

export async function uploadImage(buffer: Buffer, folder = "kegiatan"): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      })
      .end(buffer);
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
