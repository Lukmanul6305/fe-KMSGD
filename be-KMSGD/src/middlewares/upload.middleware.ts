import multer from "multer";

const allowedImageTypes = new Set(["image/webp", "image/png", "image/webp"]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter(_, file, cb) {
    if (!allowedImageTypes.has(file.mimetype)) {
      return cb(new Error("File harus berupa gambar JPG, PNG, atau WebP"));
    }
    cb(null, true);
  },
});

export default upload;
